/* 六十四卦演练：从下往上画爻，点爻翻转，分步看阴阳到六十四卦，再看错综互变。
 * 卦名和错综互变都走 GuaLogic，不另编。
 */
(function () {
  var stage = document.getElementById("gua-stage");
  if (!stage || !window.GuaLogic) return;

  var YAO = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"];
  var STEPS = [
    { title: "第1步 · 阴阳", caption: "阳是一条长横，阴在中间断开。点这一爻，阴阳互换。" },
    { title: "第2步 · 四象", caption: "在下面一爻之上再叠一爻。下阳上阳为太阳，下阳上阴为少阴，下阴上阳为少阳，下阴上阴为太阴。" },
    { title: "第3步 · 八卦", caption: "三爻成卦。同一四象再往上加一爻，就分成两卦。点一卦，从初爻画到三爻。" },
    { title: "第4步 · 六十四卦", caption: "下卦三爻在下，上卦三爻在上。先点下卦，再点上卦，六爻从初爻画到上爻。" },
    { title: "第5步 · 错综互变", caption: "错是六爻阴阳对调，综是上下颠倒，互取二三四为下、三四五为上，变只改一爻。" }
  ];
  var SIXIANG = [
    { name: "太阳", lines: [1, 1] },
    { name: "少阴", lines: [1, 0] },
    { name: "少阳", lines: [0, 1] },
    { name: "太阴", lines: [0, 0] }
  ];
  var BAGUA = [
    { name: "乾", xiang: "天", lines: [1, 1, 1] },
    { name: "兑", xiang: "泽", lines: [1, 1, 0] },
    { name: "离", xiang: "火", lines: [1, 0, 1] },
    { name: "震", xiang: "雷", lines: [1, 0, 0] },
    { name: "巽", xiang: "风", lines: [0, 1, 1] },
    { name: "坎", xiang: "水", lines: [0, 1, 0] },
    { name: "艮", xiang: "山", lines: [0, 0, 1] },
    { name: "坤", xiang: "地", lines: [0, 0, 0] }
  ];

  var step = 0;
  var lines = [1];
  var lower = null;
  var upper = null;
  var how = "draw";
  var flipAt = -1;

  function same(a, b) {
    if (!a || !b || a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }

  function sixiangName(bits) {
    for (var i = 0; i < SIXIANG.length; i++) if (same(SIXIANG[i].lines, bits)) return SIXIANG[i].name;
    return "";
  }

  function baguaOf(bits) {
    for (var i = 0; i < BAGUA.length; i++) if (same(BAGUA[i].lines, bits)) return BAGUA[i];
    return null;
  }

  function stackHtml(bits, clickable, animateFlip) {
    var rows = bits.map(function (bit, i) {
      var bars = bit
        ? '<span class="yao-bar yang' + (animateFlip === i ? " is-flip" : "") + '"><i></i></span>'
        : '<span class="yao-bar yin' + (animateFlip === i ? " is-flip" : "") + '"><i></i><i></i></span>';
      if (!clickable) return '<div class="yao-row">' + bars + "</div>";
      return '<button type="button" class="yao-row" data-yao="' + i + '"><em>' + (YAO[i] || "") + "</em>" + bars + "</button>";
    }).join("");
    return '<div class="yao-stack' + (how === "draw" ? " is-draw" : "") + '" id="yao-stack">' + rows + "</div>";
  }

  function titleOf() {
    if (lines.length === 1) return lines[0] ? "阳" : "阴";
    if (lines.length === 2) return sixiangName(lines) || "四象";
    if (lines.length === 3) {
      var g = baguaOf(lines);
      return g ? g.name : "";
    }
    var found = GuaLogic.byLines(lines);
    return found ? found.name : "";
  }

  function subOf() {
    if (lines.length === 3) {
      var g = baguaOf(lines);
      return g ? g.xiang : "";
    }
    if (lines.length === 6) {
      return "下" + GuaLogic.trigramName(lines.slice(0, 3)) + " · 上" + GuaLogic.trigramName(lines.slice(3));
    }
    return "";
  }

  function mini(bits) {
    return stackHtml(bits, false, -1).replace(' id="yao-stack"', "").replace(" is-draw", "");
  }

  function sideHtml() {
    if (step === 1) {
      return '<div class="pick-grid">' + SIXIANG.map(function (item) {
        var on = same(item.lines, lines) ? " on" : "";
        return '<button type="button" class="choice' + on + '" data-sixiang="' + item.name + '">' + item.name + "</button>";
      }).join("") + "</div>";
    }
    if (step === 2) {
      return '<div class="xiang-board">' + SIXIANG.map(function (sx) {
        var kids = BAGUA.filter(function (g) { return g.lines[0] === sx.lines[0] && g.lines[1] === sx.lines[1]; });
        return '<div class="xiang-col"><b>' + sx.name + "</b>" + kids.map(function (g) {
          var on = same(g.lines, lines) ? " on" : "";
          return '<button type="button" class="mini-gua' + on + '" data-bagua="' + g.name + '"><span>' + g.name + '</span><small>' + g.xiang + "</small></button>";
        }).join("") + "</div>";
      }).join("") + "</div>";
    }
    if (step === 3 || step === 4) {
      function row(role, current) {
        return '<p class="teach-caption" style="margin:8px 0 6px">' + role + "</p>" +
          '<div class="pick-grid">' + BAGUA.map(function (g) {
            var on = current === g.name ? " on" : "";
            return '<button type="button" class="mini-gua' + on + '" data-role="' + role + '" data-bagua="' + g.name + '"><span>' + g.name + '</span><small>' + g.xiang + "</small></button>";
          }).join("") + "</div>";
      }
      var extra = "";
      if (step === 4 && lines.length === 6) {
        extra = '<div class="rel-actions">' +
          '<button type="button" class="btn" data-rel="cuo">错卦</button>' +
          '<button type="button" class="btn" data-rel="zong">综卦</button>' +
          '<button type="button" class="btn" data-rel="hu">互卦</button>' +
          '<button type="button" class="btn" data-rel="redraw">重画</button></div>' +
          '<div class="change-row">' + YAO.map(function (name, i) {
            return '<button type="button" class="btn" data-bian="' + i + '">' + name + "变</button>";
          }).join("") + "</div>";
      }
      return extra + row("下卦", lower) + row("上卦", upper);
    }
    return '<button type="button" class="btn" data-rel="redraw">重画</button>';
  }

  function render() {
    var label = document.getElementById("gua-step");
    var prev = document.getElementById("gua-prev");
    var next = document.getElementById("gua-next");
    if (label) label.textContent = STEPS[step].title;
    if (prev) prev.disabled = step === 0;
    if (next) next.disabled = step === STEPS.length - 1;

    var split = "";
    if (lines.length === 6) {
      split = '<div class="mini-split"><figure><figcaption>下卦 ' +
        GuaLogic.trigramName(lines.slice(0, 3)) + "</figcaption>" + mini(lines.slice(0, 3)) +
        "</figure><figure><figcaption>上卦 " + GuaLogic.trigramName(lines.slice(3)) + "</figcaption>" +
        mini(lines.slice(3)) + "</figure></div>";
    }
    var flip = how === "flip" || how === "bian" ? flipAt : -1;
    if (how === "cuo") flip = -2;
    var stack = stackHtml(lines, true, flip === -2 ? 99 : flip);
    if (how === "cuo") stack = stack.replace(/yao-bar (yang|yin)/g, "yao-bar $1 is-flip");

    stage.innerHTML =
      '<div class="teach-layout"><div class="teach-visual">' + stack +
      '<p class="gua-now">' + (titleOf() || "　") + "<small>" + (subOf() || "点爻可改阴阳") + "</small></p>" +
      split + '</div><div class="teach-side">' + sideHtml() + "</div></div>" +
      '<p class="teach-caption">' + STEPS[step].caption + "</p>";

    if (how === "zong") runZong();
    how = "";
    flipAt = -1;
  }

  var zongFrom = null;
  function runZong() {
    if (!zongFrom) return;
    var bars = stage.querySelectorAll("#yao-stack .yao-bar");
    var n = bars.length;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    bars.forEach(function (bar, i) {
      var from = zongFrom[n - 1 - i];
      var last = bar.getBoundingClientRect();
      var dy = from.top - last.top;
      if (reduce || Math.abs(dy) < 1) return;
      bar.style.transform = "translateY(" + dy + "px)";
      bar.style.transition = "none";
      requestAnimationFrame(function () {
        bar.style.transition = "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)";
        bar.style.transform = "";
      });
    });
    zongFrom = null;
  }

  function goLines(next, mode, index) {
    if (mode === "zong") {
      var stack = document.getElementById("yao-stack");
      zongFrom = [];
      if (stack) stack.querySelectorAll(".yao-bar").forEach(function (bar) { zongFrom.push(bar.getBoundingClientRect()); });
    }
    lines = next.slice();
    if (lines.length === 6) {
      var low = baguaOf(lines.slice(0, 3));
      var up = baguaOf(lines.slice(3));
      lower = low ? low.name : lower;
      upper = up ? up.name : upper;
    }
    how = mode;
    flipAt = typeof index === "number" ? index : -1;
    render();
  }

  document.getElementById("gua-prev").addEventListener("click", function () {
    if (step === 0) return;
    step -= 1;
    enterStep(false);
  });
  document.getElementById("gua-next").addEventListener("click", function () {
    if (step >= STEPS.length - 1) return;
    step += 1;
    enterStep(true);
  });

  function enterStep(forward) {
    if (step === 0) lines = [lines[0] ? 1 : 0];
    if (step === 1 && lines.length < 2) lines = [1, 1];
    if (step === 1 && lines.length > 2) lines = lines.slice(0, 2);
    if (step === 2 && lines.length < 3) lines = [1, 1, 1];
    if (step === 2 && lines.length > 3) lines = lines.slice(0, 3);
    if (step >= 3 && lines.length < 6) {
      var lowBits = (lines.length >= 3 ? lines.slice(0, 3) : [1, 1, 1]);
      var upBits = [1, 1, 1];
      lines = lowBits.concat(upBits);
      lower = GuaLogic.trigramName(lowBits);
      upper = "乾";
    }
    how = forward ? "draw" : "";
    render();
  }

  stage.addEventListener("click", function (event) {
    var yao = event.target.closest("[data-yao]");
    if (yao) {
      var i = +yao.getAttribute("data-yao");
      var next = lines.slice();
      next[i] = next[i] ? 0 : 1;
      goLines(next, "bian", i);
      return;
    }
    var sx = event.target.closest("[data-sixiang]");
    if (sx) {
      var found = SIXIANG.filter(function (item) { return item.name === sx.getAttribute("data-sixiang"); })[0];
      goLines(found.lines, "draw");
      return;
    }
    var baguaBtn = event.target.closest("[data-bagua]");
    if (baguaBtn && !baguaBtn.getAttribute("data-role")) {
      var g = BAGUA.filter(function (item) { return item.name === baguaBtn.getAttribute("data-bagua"); })[0];
      goLines(g.lines, "draw");
      return;
    }
    if (baguaBtn && baguaBtn.getAttribute("data-role")) {
      var picked = BAGUA.filter(function (item) { return item.name === baguaBtn.getAttribute("data-bagua"); })[0];
      if (baguaBtn.getAttribute("data-role") === "下卦") lower = picked.name;
      else upper = picked.name;
      if (lower && upper) {
        var lowG = BAGUA.filter(function (item) { return item.name === lower; })[0];
        var upG = BAGUA.filter(function (item) { return item.name === upper; })[0];
        goLines(lowG.lines.concat(upG.lines), "draw");
      } else {
        how = "";
        render();
      }
      return;
    }
    var rel = event.target.closest("[data-rel]");
    if (rel && lines.length === 6) {
      var kind = rel.getAttribute("data-rel");
      if (kind === "cuo") goLines(GuaLogic.cuo(lines), "cuo");
      else if (kind === "zong") goLines(GuaLogic.zong(lines), "zong");
      else if (kind === "hu") goLines(GuaLogic.hu(lines), "draw");
      else if (kind === "redraw") goLines(lines.slice(), "draw");
      return;
    }
    if (rel && rel.getAttribute("data-rel") === "redraw") {
      goLines(lines.slice(), "draw");
      return;
    }
    var bian = event.target.closest("[data-bian]");
    if (bian && lines.length === 6) {
      var at = +bian.getAttribute("data-bian");
      goLines(GuaLogic.bian(lines, at), "bian", at);
    }
  });

  enterStep(true);
})();
