/* 画卦。lines 自下而上，1 阳爻，0 阴爻。 */
function drawGua(lines, opt) {
  opt = opt || {};
  var n = lines.length;
  var w = opt.width || 48;
  var sw = opt.stroke || 2;
  var gap = opt.gap || 5;
  var h = sw * n + gap * (n - 1);
  var svg = '<svg class="gua-svg" viewBox="0 0 ' + w + " " + h + '" width="' + w + '" height="' + h + '" aria-hidden="true">';
  for (var i = 0; i < n; i++) {
    var y = h - sw / 2 - i * (sw + gap);
    if (lines[i]) {
      svg += '<line x1="1" x2="' + (w - 1) + '" y1="' + y + '" y2="' + y + '" stroke="currentColor" stroke-width="' + sw + '"/>';
    } else {
      var cut = w * 0.16;
      svg += '<line x1="1" x2="' + (w / 2 - cut) + '" y1="' + y + '" y2="' + y + '" stroke="currentColor" stroke-width="' + sw + '"/>';
      svg += '<line x1="' + (w / 2 + cut) + '" x2="' + (w - 1) + '" y1="' + y + '" y2="' + y + '" stroke="currentColor" stroke-width="' + sw + '"/>';
    }
  }
  return svg + "</svg>";
}
