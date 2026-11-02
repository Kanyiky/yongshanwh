#!/usr/bin/env python3
"""Rebuild the site webfonts from the user-supplied base64 sources.

FangSong (方正仿宋简体, FZFangSong-Z02S) is subset to every character that
appears in site HTML, CSS, and JS — including vendor libraries whose string
literals are rendered by the calculation tools — plus ASCII digits,
punctuation, and printable ASCII. Iansui is traditional-only, so it is
subset solely for the decorative label 探五術之理, and only after every
glyph is confirmed in its cmap.

Source files are not stored in the repo. The script looks for:

  uploads/FZFangSong*.b64*
  uploads/Iansui*.b64*

and the Cloud Agent uploads directory. Re-run from the repo root after
copy changes:

  python3 tools/subset-fonts.py
"""

from __future__ import annotations

import base64
import io
import re
import sys
from pathlib import Path

from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
FONTS = ROOT / "fonts"
DECORATIVE = "探五術之理"

SCAN_EXT = {".html", ".css", ".js"}
SKIP_DIRS = {"node_modules", ".git", "fonts"}

FORCED = (
    "0123456789"
    ".,;:!?\"'()[]{}+-*/=%<>@#&_|~`^$\\"
    "·—…、。，「」『』（）：；？！【】《》〈〉“”‘’　"
)

UPLOAD_DIRS = [
    ROOT / "uploads",
    Path("/home/ubuntu/.cursor/projects/workspace/uploads"),
    Path.home() / ".cursor/projects/workspace/uploads",
]

ESCAPE = re.compile(r"\\u([0-9a-fA-F]{4})")
ESCAPE_BRACE = re.compile(r"\\u\{([0-9a-fA-F]+)\}")
ENTITY = re.compile(r"&#(x[0-9a-fA-F]+|\d+);")


def find_b64(prefix: str) -> Path:
    matches: list[Path] = []
    for directory in UPLOAD_DIRS:
        if not directory.is_dir():
            continue
        matches.extend(directory.glob(prefix + "*.b64*"))
        matches.extend(directory.glob(prefix + "*.txt"))
    unique = sorted({path.resolve() for path in matches if path.is_file()})
    if not unique:
        searched = ", ".join(str(path) for path in UPLOAD_DIRS)
        raise SystemExit(f"Missing {prefix} base64 source. Looked in: {searched}")
    return unique[0]


def decode_font(path: Path) -> TTFont:
    raw = base64.b64decode(path.read_text(encoding="utf-8").strip())
    return TTFont(io.BytesIO(raw))


def cmap_of(font: TTFont) -> set[int]:
    points: set[int] = set()
    for table in font["cmap"].tables:
        points.update(table.cmap.keys())
    return points


def collect_codepoints() -> set[int]:
    points: set[int] = set(range(32, 127))
    points.update(ord(char) for char in FORCED)
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in SCAN_EXT:
            continue
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        points.update(ord(char) for char in text)
        for match in ESCAPE.findall(text):
            points.add(int(match, 16))
        for match in ESCAPE_BRACE.findall(text):
            points.add(int(match, 16))
        for match in ENTITY.findall(text):
            points.add(int(match[1:], 16) if match.lower().startswith("x") else int(match))
    return points


def subset_font(source: TTFont, unicodes: list[int], destination: Path) -> int:
    options = Options()
    options.flavor = "woff2"
    options.desubroutinize = True
    options.hinting = False
    options.layout_features = ["*"]
    options.glyph_names = False
    options.legacy_cmap = False
    options.symbol_cmap = False
    options.notdef_outline = True
    options.drop_tables = ["DSIG"]
    subsetter = Subsetter(options=options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(source)
    source.flavor = "woff2"
    destination.parent.mkdir(parents=True, exist_ok=True)
    source.save(str(destination))
    return destination.stat().st_size


def main() -> None:
    fang_path = find_b64("FZFangSong")
    iansui_path = find_b64("Iansui")
    print(f"FangSong source: {fang_path}")
    print(f"Iansui source:   {iansui_path}")

    fang = decode_font(fang_path)
    fang_cmap = cmap_of(fang)
    wanted = collect_codepoints()
    used = sorted(point for point in wanted if point in fang_cmap)
    missing = sorted(point for point in wanted if point >= 128 and point not in fang_cmap)
    fang_out = FONTS / "FZFangSong-Z02S.woff2"
    fang_size = subset_font(fang, used, fang_out)
    print(f"FangSong subset: {fang_out.relative_to(ROOT)}  {fang_size} bytes  {len(used)} glyphs")
    if missing:
        sample = "".join(chr(point) for point in missing[:40])
        print(f"Not in FangSong cmap ({len(missing)}), left to fallback: {sample}")

    iansui = decode_font(iansui_path)
    iansui_cmap = cmap_of(iansui)
    absent = [char for char in DECORATIVE if ord(char) not in iansui_cmap]
    if absent:
        raise SystemExit(
            "Iansui is missing decorative glyphs "
            + " ".join(f"{char}=U+{ord(char):04X}" for char in absent)
            + ". Not writing a webfont."
        )
    iansui_out = FONTS / "Iansui-label.woff2"
    iansui_size = subset_font(iansui, sorted({ord(char) for char in DECORATIVE}), iansui_out)
    print(f"Iansui subset:   {iansui_out.relative_to(ROOT)}  {iansui_size} bytes  label={DECORATIVE}")


if __name__ == "__main__":
    main()
