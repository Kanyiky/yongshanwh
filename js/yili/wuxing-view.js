/* 五行图：点一个五行，标出谁生它、它生谁、谁克它、它克谁。 */
(function () {
  var T = YiliTables;
  var pos = { "火": [200, 42], "土": [328, 132], "金": [278, 286], "水": [122, 286], "木": [72, 132] };
  var order = ["木", "火", "土", "金", "水"];
  var current = "木";

  function line(a, b, kind) {
    return '<line data-kind="' + kind + '" data-from="' + a + '" data-to="' + b + '" x1="' + pos[a][0] + '" y1="' + pos[a][1] + '" x2="' + pos[b][0] + '" y2="' + pos[b][1] + '" stroke="currentColor" stroke-width="1"/>';
  }

  function draw() {
    var sheng = order.map(function (el) { return line(el, T.SHENG[el], "sheng"); }).join("");
    var ke = order.map(function (el) { return line(el, T.KE[el], "ke"); }).join("");
    var nodes = order.map(function (el) {
      var p = pos[el];
      return '<g class="node" data-el="' + el + '"><circle cx="' + p[0] + '" cy="' + p[1] + '" r="26" fill="#F6F0E5" stroke="currentColor"/><text x="' + p[0] + '" y="' + p[1] + '" text-anchor="middle" dominant-baseline="central">' + el + "</text></g>";
    }).join("");
    document.getElementById("wx-svg").innerHTML =
      '<svg class="wx-svg" viewBox="0 0 400 340">' + ke + sheng + nodes + "</svg>";
    paint();
  }

  function paint() {
    var el = current;
    var bornBy = T.shengWo(el);
    var births = T.SHENG[el];
    var controlledBy = T.keWo(el);
    var controls = T.KE[el];
    document.querySelectorAll("#wx-svg line").forEach(function (node) {
      var from = node.getAttribute("data-from");
      var to = node.getAttribute("data-to");
      var kind = node.getAttribute("data-kind");
      var hot = (kind === "sheng" && ((from === bornBy && to === el) || (from === el && to === births))) ||
        (kind === "ke" && ((from === controlledBy && to === el) || (from === el && to === controls)));
      node.setAttribute("stroke-width", hot ? "2.4" : "1");
      node.setAttribute("opacity", hot ? "1" : "0.28");
      node.setAttribute("stroke-dasharray", kind === "ke" ? "4 3" : "");
    });
    document.querySelectorAll("#wx-svg .node").forEach(function (node) {
      node.querySelector("circle").setAttribute("stroke-width", node.getAttribute("data-el") === el ? "2.4" : "1");
    });
    var info = T.ELEMENT_INFO[el];
    document.getElementById("wx-text").innerHTML =
      "<h3>" + el + "</h3>" +
      "<p>" + bornBy + "生" + el + "，" + el + "生" + births + "。</p>" +
      "<p>" + controlledBy + "克" + el + "，" + el + "克" + controls + "。</p>" +
      "<p>色 " + info.color + "，方 " + info.direction + "，时 " + info.season + "。脏腑 " + info.organ +
      "，体 " + info.body + "。德 " + info.virtue + "，音 " + info.tone + "。天干 " + info.stem + "，地支 " + info.branch + "。</p>";
  }

  function renderWang() {
    var season = document.getElementById("season").value;
    var map = T.WANG[season];
    document.getElementById("wang").innerHTML = "<table class=\"data-table\"><tr><th>五行</th><th>状态</th></tr>" +
      T.ELEMENTS.map(function (el) { return "<tr><td>" + el + "</td><td>" + map[el] + "</td></tr>"; }).join("") +
      "</table><p class=\"note\">当令的为旺，我生的为相，生我的为休，克我的为囚，我克的为死。春指寅卯月，夏巳午月，秋申酉月，冬亥子月。四季指辰戌丑未月，土旺。</p>";
  }

  document.getElementById("wx-svg").addEventListener("click", function (event) {
    var node = event.target.closest(".node");
    if (!node) return;
    current = node.getAttribute("data-el");
    paint();
  });
  document.getElementById("season").addEventListener("change", renderWang);
  draw();
  renderWang();
})();
