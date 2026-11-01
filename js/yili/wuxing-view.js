/* 五行图：相生沿圈流动，相克是星形。点一个五行，标出相生相克。季节用滑杆。 */
(function () {
  var T = YiliTables;
  var order = ["木", "火", "土", "金", "水"];
  var pos = {};
  order.forEach(function (el, i) {
    var ang = (-90 + i * 72) * Math.PI / 180;
    pos[el] = [200 + Math.cos(ang) * 132, 200 + Math.sin(ang) * 132];
  });
  var current = "木";
  var SEASONS = ["春", "夏", "秋", "冬", "四季"];
  var quizAt = 0;
  var quizLock = false;
  var bank = [];
  order.forEach(function (el) {
    bank.push({ q: el + "生什么？", a: T.SHENG[el], focus: el });
    bank.push({ q: el + "克什么？", a: T.KE[el], focus: el });
    bank.push({ q: "什么生" + el + "？", a: T.shengWo(el), focus: el });
    bank.push({ q: "什么克" + el + "？", a: T.keWo(el), focus: el });
  });

  function shorten(a, b, gap) {
    var dx = b[0] - a[0];
    var dy = b[1] - a[1];
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    var ux = dx / len;
    var uy = dy / len;
    return [a[0] + ux * gap, a[1] + uy * gap, b[0] - ux * gap, b[1] - uy * gap];
  }

  function edge(from, to, kind) {
    var p = shorten(pos[from], pos[to], 34);
    return '<line class="' + kind + '" data-kind="' + kind + '" data-from="' + from + '" data-to="' + to +
      '" x1="' + p[0].toFixed(1) + '" y1="' + p[1].toFixed(1) + '" x2="' + p[2].toFixed(1) + '" y2="' + p[3].toFixed(1) +
      '" stroke="currentColor" stroke-width="1.4" marker-end="url(#wx-arrow)"/>';
  }

  function draw() {
    var sheng = order.map(function (el) { return edge(el, T.SHENG[el], "sheng"); }).join("");
    var ke = order.map(function (el) { return edge(el, T.KE[el], "ke"); }).join("");
    var nodes = order.map(function (el) {
      var p = pos[el];
      return '<g class="node" data-el="' + el + '" role="button" tabindex="0"><circle cx="' + p[0].toFixed(1) +
        '" cy="' + p[1].toFixed(1) + '" r="28" fill="#F6F0E5" stroke="currentColor"/><text x="' + p[0].toFixed(1) +
        '" y="' + p[1].toFixed(1) + '" text-anchor="middle" dominant-baseline="central">' + el + "</text></g>";
    }).join("");
    document.getElementById("wx-svg").innerHTML =
      '<svg class="wx-svg" viewBox="0 0 400 400">' +
      '<defs><marker id="wx-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">' +
      '<path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>' +
      ke + sheng + nodes + "</svg>";
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
      node.classList.toggle("hot", hot);
      node.classList.toggle("dim", !hot);
    });
    document.querySelectorAll("#wx-svg .node").forEach(function (node) {
      var name = node.getAttribute("data-el");
      node.classList.remove("self", "birth", "control", "born", "controlled");
      if (name === el) node.classList.add("self");
      else if (name === births) node.classList.add("birth");
      else if (name === controls) node.classList.add("control");
      else if (name === bornBy) node.classList.add("born");
      else if (name === controlledBy) node.classList.add("controlled");
    });
    var info = T.ELEMENT_INFO[el];
    var box = document.getElementById("wx-text");
    box.classList.remove("pop");
    void box.offsetWidth;
    box.classList.add("pop");
    box.innerHTML =
      "<h3>" + el + "</h3>" +
      "<p>" + bornBy + "生" + el + "，" + el + "生" + births + "。" + controlledBy + "克" + el + "，" + el + "克" + controls + "。</p>" +
      '<details class="fold"><summary>对应</summary><p>色 ' + info.color + "，方 " + info.direction + "，时 " + info.season +
      "。脏腑 " + info.organ + "，体 " + info.body + "。德 " + info.virtue + "，音 " + info.tone +
      "。天干 " + info.stem + "，地支 " + info.branch + "。</p></details>";
  }

  function renderWang() {
    var slider = document.getElementById("season");
    var index = slider ? +slider.value : 0;
    var season = SEASONS[index] || "春";
    var now = document.getElementById("season-now");
    if (now) now.textContent = season;
    var map = T.WANG[season];
    var cls = { "旺": "wang", "相": "xiang", "休": "xiu", "囚": "qiu", "死": "si" };
    document.getElementById("wang").innerHTML = '<div class="wang-row">' +
      T.ELEMENTS.map(function (el) {
        return '<div class="wang-cell ' + (cls[map[el]] || "") + '"><b>' + el + "</b><span>" + map[el] + "</span></div>";
      }).join("") + "</div>";
  }

  function renderQuiz() {
    var item = bank[quizAt % bank.length];
    document.getElementById("wx-q").textContent = item.q;
    document.getElementById("wx-choices").innerHTML = order.map(function (el) {
      return '<button type="button" class="choice" data-pick="' + el + '">' + el + "</button>";
    }).join("");
    document.getElementById("wx-feedback").textContent = "";
    quizLock = false;
  }

  document.getElementById("wx-svg").addEventListener("click", function (event) {
    var node = event.target.closest(".node");
    if (!node) return;
    current = node.getAttribute("data-el");
    paint();
  });
  document.getElementById("wx-svg").addEventListener("keydown", function (event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    var node = event.target.closest(".node");
    if (!node) return;
    event.preventDefault();
    current = node.getAttribute("data-el");
    paint();
  });

  var choices = document.getElementById("wx-choices");
  if (choices) {
    choices.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-pick]");
      if (!btn || quizLock) return;
      quizLock = true;
      var item = bank[quizAt % bank.length];
      var pick = btn.getAttribute("data-pick");
      current = item.focus;
      paint();
      choices.querySelectorAll(".choice").forEach(function (node) {
        var name = node.getAttribute("data-pick");
        if (name === item.a) node.classList.add("ok");
        else if (name === pick) node.classList.add("no");
      });
      var fact = item.q.indexOf("生什么") >= 0 ? item.focus + "生" + item.a
        : item.q.indexOf("克什么") >= 0 ? item.focus + "克" + item.a
        : item.q.indexOf("什么生") >= 0 ? item.a + "生" + item.focus
        : item.a + "克" + item.focus;
      document.getElementById("wx-feedback").textContent = (pick === item.a ? "对。" : "不对。") + fact + "。";
      var again = document.createElement("button");
      again.type = "button";
      again.className = "btn";
      again.textContent = "下一题";
      again.addEventListener("click", function () {
        quizAt += 1;
        renderQuiz();
      });
      document.getElementById("wx-feedback").appendChild(document.createTextNode(" "));
      document.getElementById("wx-feedback").appendChild(again);
    });
  }

  var season = document.getElementById("season");
  if (season) season.addEventListener("input", renderWang);
  draw();
  renderWang();
  if (document.getElementById("wx-q")) renderQuiz();
})();
