/* 六十四卦页：文王卦序或八宫，点开一卦看经文和推出来的关系。 */
(function () {
  var board = document.getElementById("board");
  var detail = document.getElementById("detail");
  var mode = "wen";

  function cell(gua) {
    return '<button type="button" class="hex-btn" data-n="' + gua.n + '">' +
      drawGua(gua.lines, { width: 36, stroke: 2, gap: 3 }) +
      "<span>" + gua.name + "</span><small>" + gua.n + "</small></button>";
  }

  function renderBoard() {
    if (mode === "wen") {
      board.innerHTML = '<div class="hex-grid">' + ZHOUYI.map(cell).join("") + "</div>";
      return;
    }
    board.innerHTML = '<div class="palace-board">' + GuaLogic.PALACES.map(function (palace) {
      var cards = palace.names.map(function (name) { return cell(GuaLogic.byName(name)); }).join("");
      return '<section class="palace-col"><h3>' + palace.name + "宫 · " + palace.element + "</h3><div class=\"hex-grid\">" + cards + "</div></section>";
    }).join("") + "</div>";
  }

  function renderDetail(n) {
    var gua = ZHOUYI[n - 1];
    if (!gua) return;
    var lowerBits = gua.lines.slice(0, 3);
    var upperBits = gua.lines.slice(3);
    var bai = (BAIHUA[n - 1] || "").trim();
    var yaos = gua.yaos.map(function (yao) {
      return '<div class="yao-block"><p class="classic">' + yao.text + '</p><p class="xiao">小象：' + yao.xiao + "</p></div>";
    }).join("");
    var variants = gua.variants.length ? '<p class="variant">异文：' + gua.variants.join("；") + "</p>" : "";
    var changes = gua.lines.map(function (_, i) {
      var next = GuaLogic.byLines(GuaLogic.bian(gua.lines, i));
      var label = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"][i];
      return '<a href="#' + next.n + '">' + label + "变 " + next.name + "</a>";
    }).join("");
    var zong = GuaLogic.byLines(GuaLogic.zong(gua.lines));
    var zongNote = zong.n === gua.n ? "综卦即本卦" : "综卦 " + zong.name;
    detail.hidden = false;
    detail.innerHTML =
      '<div class="detail-head">' + drawGua(gua.lines, { width: 72, stroke: 3, gap: 6 }) +
      "<div><h2>" + gua.name + "</h2><p class=\"meta-line\">文王卦序 " + gua.n +
      " · 下" + gua.lower + "（" + GuaLogic.trigramName(lowerBits) + "）上" + gua.upper +
      "（" + GuaLogic.trigramName(upperBits) + "）</p></div></div>" +
      '<p class="classic"><b>卦辞</b>' + gua.guaci + "</p>" +
      '<p class="classic"><b>彖传</b>' + gua.tuan + "</p>" +
      '<p class="classic"><b>象传</b>' + gua.xiang + "</p>" +
      yaos + variants +
      '<p class="plain"><b>白话释义</b>' + (bai || "待补") + "</p>" +
      '<div class="rel-list">' +
      '<a href="#' + GuaLogic.byLines(GuaLogic.cuo(gua.lines)).n + '">错卦 ' + GuaLogic.byLines(GuaLogic.cuo(gua.lines)).name + "</a>" +
      '<a href="#' + zong.n + '">' + zongNote + "</a>" +
      '<a href="#' + GuaLogic.byLines(GuaLogic.hu(gua.lines)).n + '">互卦 ' + GuaLogic.byLines(GuaLogic.hu(gua.lines)).name + "</a>" +
      changes + "</div>" +
      '<p class="note">错卦是阴阳对调，综卦是上下颠倒，互卦取二三四爻为下卦、三四五爻为上卦。变卦每次只改一爻。这些都按爻象计算，不另编卦名。</p>';
    detail.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.getElementById("mode-wen").addEventListener("click", function () {
    mode = "wen";
    this.classList.add("active");
    document.getElementById("mode-gong").classList.remove("active");
    renderBoard();
  });
  document.getElementById("mode-gong").addEventListener("click", function () {
    mode = "gong";
    this.classList.add("active");
    document.getElementById("mode-wen").classList.remove("active");
    renderBoard();
  });
  board.addEventListener("click", function (event) {
    var btn = event.target.closest("button");
    if (!btn) return;
    location.hash = btn.getAttribute("data-n");
  });
  window.addEventListener("hashchange", function () {
    var n = parseInt(location.hash.slice(1), 10);
    if (n >= 1 && n <= 64) renderDetail(n);
  });
  renderBoard();
  var first = parseInt(location.hash.slice(1), 10);
  if (first >= 1 && first <= 64) renderDetail(first);
})();
