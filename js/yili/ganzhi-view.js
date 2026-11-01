/* 十干在内圈，十二支在外圈。一步一对，凑成六十甲子。点地支看五行、生肖、方位、月份。 */
(function () {
  var T = YiliTables;
  var wrap = document.getElementById("gz-wheel");
  var detail = document.getElementById("gz-detail");
  if (!wrap || !detail) return;

  /* 生肖、月建是通行配法：子鼠配十一月，寅为正月。方位用对照表里的原字。 */
  var ZODIAC = { "子": "鼠", "丑": "牛", "寅": "虎", "卯": "兔", "辰": "龙", "巳": "蛇", "午": "马", "未": "羊", "申": "猴", "酉": "鸡", "戌": "狗", "亥": "猪" };
  var MONTH = { "寅": "正月", "卯": "二月", "辰": "三月", "巳": "四月", "午": "五月", "未": "六月", "申": "七月", "酉": "八月", "戌": "九月", "亥": "十月", "子": "十一月", "丑": "十二月" };

  var index = 0;
  var selected = null;
  var moved = false;

  function button(kind, name, i) {
    return '<button type="button" class="stem-btn ' + kind + '" data-kind="' + kind + '" data-name="' + name + '" data-i="' + i + '"><span>' + name + "</span></button>";
  }

  wrap.innerHTML =
    '<svg class="gz-lines" id="gz-lines" viewBox="0 0 100 100" preserveAspectRatio="none"></svg>' +
    '<div class="stem-row" id="branches">' + T.BRANCHES.map(function (b, i) { return button("branch", b.name, i); }).join("") + "</div>" +
    '<div class="stem-row" id="stems">' + T.STEMS.map(function (s, i) { return button("stem", s.name, i); }).join("") + "</div>" +
    '<div class="gz-hub" id="gz-hub">甲子</div>' +
    '<span class="gz-pointer" aria-hidden="true"></span>';

  var lineBox = document.getElementById("gz-lines");
  var hub = document.getElementById("gz-hub");

  function place() {
    var branchAt = index % 12;
    var stemAt = index % 10;
    function move(kind, total, offset, radius) {
      wrap.querySelectorAll("." + kind).forEach(function (node) {
        var i = +node.getAttribute("data-i");
        var slot = (i - offset + total) % total;
        var ang = (slot / total) * Math.PI * 2 - Math.PI / 2;
        node.style.left = (50 + Math.cos(ang) * radius) + "%";
        node.style.top = (50 + Math.sin(ang) * radius) + "%";
        node.classList.toggle("on", !!(selected && selected.kind === kind && selected.name === node.getAttribute("data-name")));
      });
    }
    move("branch", 12, branchAt, 40);
    move("stem", 10, stemAt, 26);
    hub.textContent = T.jiazi()[index].name;
    drawLines();
    drawBuild();
    var prev = document.getElementById("gz-prev");
    var next = document.getElementById("gz-next");
    if (prev) prev.disabled = index === 0;
    if (next) next.disabled = index === 59;
  }

  function centerOf(kind, name) {
    var node = wrap.querySelector('.stem-btn[data-kind="' + kind + '"][data-name="' + name + '"]');
    if (!node) return null;
    return [parseFloat(node.style.left), parseFloat(node.style.top)];
  }

  function drawLines() {
    if (!selected || selected.kind !== "branch") {
      lineBox.innerHTML = "";
      return;
    }
    var rel = T.relationsOfBranch(selected.name);
    var from = centerOf("branch", selected.name);
    if (!from) return;
    var parts = [];
    function link(rows, cls) {
      rows.forEach(function (row) {
        row.forEach(function (item) {
          if (item.length !== 1 || item === selected.name) return;
          var to = centerOf("branch", item);
          if (!to) return;
          parts.push('<line class="rel-line ' + cls + '" x1="' + from[0] + '" y1="' + from[1] + '" x2="' + to[0] + '" y2="' + to[1] + '" stroke-width="0.7"/>');
        });
      });
    }
    link(rel.liuhe, "he");
    link(rel.chong, "chong");
    lineBox.innerHTML = parts.join("");
  }

  var lastBuilt = -1;
  function drawBuild() {
    var box = document.getElementById("pair-build");
    if (!box) return;
    var list = T.jiazi();
    var html = "";
    for (var i = 0; i <= index; i++) {
      var fresh = i === index && i !== lastBuilt && i !== 0 ? " fresh" : "";
      html += '<span class="pair-chip' + (i === index ? " now" : "") + fresh + '">' + list[i].name + "</span>";
    }
    box.innerHTML = html;
    var now = box.querySelector(".now");
    if (index > 0 && now && now.scrollIntoView) now.scrollIntoView({ inline: "end", block: "nearest" });
    lastBuilt = index;
  }

  function chips(pairs) {
    return '<div class="chip-row pop">' + pairs.map(function (pair) {
      return "<span><b>" + pair[0] + "</b><small>" + pair[1] + "</small></span>";
    }).join("") + "</div>";
  }

  function showBranch(name) {
    selected = { kind: "branch", name: name };
    var s = T.branchByName(name);
    var rel = T.relationsOfBranch(name);
    function label(rows, suffix) {
      if (!rows.length) return "";
      return rows.map(function (row) {
        var chars = row.filter(function (item) { return item.length === 1; }).join("");
        var extra = row.filter(function (item) { return item.length > 1; }).join("");
        return chars + (extra ? extra : "") + suffix;
      }).join("、");
    }
    detail.innerHTML =
      "<h2>" + name + "</h2>" +
      chips([
        ["五行", s.element],
        ["生肖", ZODIAC[name]],
        ["方位", s.direction],
        ["月份", MONTH[name]]
      ]) +
      "<p>" + (label(rel.liuhe, "合") || "无六合") + " · " + (label(rel.chong, "冲") || "无六冲") + "</p>" +
      '<details class="fold"><summary>说明</summary><p>' + s.yin + "支，" + s.season + "。藏干 " + s.hidden.join("、") +
      "。六合 " + (label(rel.liuhe, "") || "无") + "，三合 " + (label(rel.sanhe, "") || "无") +
      "，三会 " + (label(rel.sanhui, "") || "无") + "，六冲 " + (label(rel.chong, "") || "无") +
      "，六害 " + (label(rel.hai, "") || "无") + "，相破 " + (label(rel.po, "") || "无") +
      "，刑 " + (rel.xing[0] === name ? "自刑" : rel.xing.join("、")) + "。</p></details>";
    place();
  }

  function showStem(name) {
    selected = { kind: "stem", name: name };
    var s = T.stemByName(name);
    var rel = T.relationsOfStem(name);
    var he = rel.he.length ? rel.he.map(function (row) { return row[0] + row[1] + "合" + row[2]; }).join("、") : "无";
    var chong = rel.chong.length ? rel.chong.map(function (row) { return row.join("") + "冲"; }).join("、") : "戊己居中，没有相冲";
    lineBox.innerHTML = "";
    detail.innerHTML = "<h2>" + name + "</h2>" + chips([["阴阳", s.yin], ["五行", s.element], ["五合", he], ["相冲", chong]]);
    place();
  }

  function setIndex(next) {
    index = Math.max(0, Math.min(59, next));
    place();
  }

  var downBtn = null;
  wrap.addEventListener("click", function (event) {
    if (moved) { moved = false; return; }
    var node = event.target.closest(".stem-btn") || downBtn;
    downBtn = null;
    if (!node) return;
    if (node.getAttribute("data-kind") === "branch") showBranch(node.getAttribute("data-name"));
    else showStem(node.getAttribute("data-name"));
  });

  var drag = null;
  wrap.addEventListener("pointerdown", function (event) {
    if (event.button !== 0) return;
    var rect = wrap.getBoundingClientRect();
    downBtn = event.target.closest(".stem-btn");
    drag = {
      x: event.clientX,
      y: event.clientY,
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2,
      acc: 0,
      last: Math.atan2(event.clientY - (rect.top + rect.height / 2), event.clientX - (rect.left + rect.width / 2))
    };
    moved = false;
    wrap.setPointerCapture(event.pointerId);
  });
  wrap.addEventListener("pointermove", function (event) {
    if (!drag) return;
    var dx = event.clientX - drag.x;
    var dy = event.clientY - drag.y;
    if (dx * dx + dy * dy < 36) return;
    if (Math.abs(dy) > Math.abs(dx) * 1.4) return;
    var ang = Math.atan2(event.clientY - drag.cy, event.clientX - drag.cx);
    var delta = ang - drag.last;
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;
    drag.last = ang;
    drag.acc += delta;
    var step = Math.PI / 6;
    while (drag.acc > step) { drag.acc -= step; moved = true; setIndex(index - 1); }
    while (drag.acc < -step) { drag.acc += step; moved = true; setIndex(index + 1); }
  });
  wrap.addEventListener("pointerup", function () { drag = null; });
  wrap.addEventListener("pointercancel", function () { drag = null; });

  var prevBtn = document.getElementById("gz-prev");
  var nextBtn = document.getElementById("gz-next");
  if (prevBtn) prevBtn.addEventListener("click", function () { setIndex(index - 1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { setIndex(index + 1); });

  var list = T.jiazi();
  var jiaziBox = document.getElementById("jiazi");
  if (jiaziBox) {
    jiaziBox.innerHTML = list.map(function (item) {
      return "<div>" + item.name + "<i>" + item.nayin + "</i></div>";
    }).join("");
  }

  function readDate(value) {
    var bits = value.split("-");
    return { y: +bits[0], m: +bits[1], d: +bits[2] };
  }

  var form = document.getElementById("year-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var value = document.getElementById("year-date").value;
      if (!value || !window.Solar) return;
      var p = readDate(value);
      var solar = Solar.fromYmdHms(p.y, p.m, p.d, 12, 0, 0);
      var lunar = solar.getLunar();
      var year = lunar.getEightChar().getYear();
      var lc = lunar.getJieQiTable()["立春"];
      var before = solar.isBefore(lc);
      var nayin = "";
      T.jiazi().forEach(function (item) { if (item.name === year) nayin = item.nayin; });
      document.getElementById("year-out").innerHTML =
        '<p class="year-hero">年柱 <b>' + year + "</b> · " + nayin + "</p>" +
        '<details class="fold"><summary>说明</summary>' +
        "<p>这一年的立春是 " + lc.toYmdHms() + "。所选日期" + (before ? "还在立春之前，所以年柱仍是上一年。" : "已过立春，年柱用这一年。") + "</p>" +
        "<p>年柱在立春交换，不是农历正月初一。比较用的是当天中午 12 点；立春若在下午，这一天的上午仍属上一年。</p></details>";
    });
  }

  place();
  requestAnimationFrame(function () { wrap.classList.add("ready"); });
  showBranch("子");
})();
