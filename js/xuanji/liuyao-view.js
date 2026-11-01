/* 六爻。可以自己选六次，也可以一爻一爻掷铜钱。卦由这六次决定，日期只用来取日干排六神。 */
(function () {
  var NAMES = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"];
  var picks = document.getElementById("picks");
  var tosses = [];
  picks.innerHTML = NAMES.map(function (name, i) {
    return '<label class="field">' + name + '<select id="yao-' + i + '"><option>少阳</option><option>少阴</option><option>老阳</option><option>老阴</option></select></label>';
  }).join("");

  function dayInfo() {
    var value = document.getElementById("day").value;
    var bits = value ? value.split("-") : [];
    var hour = parseInt(document.getElementById("day-hour").value, 10);
    if (bits.length !== 3 || !isFinite(hour)) return null;
    var ec = Solar.fromYmdHms(+bits[0], +bits[1], +bits[2], hour, 0, 0).getLunar().getEightChar();
    return { month: ec.getMonth(), day: ec.getDay(), stem: ec.getDayGan() };
  }

  function show(types, how) {
    var info = dayInfo();
    if (!info) {
      document.getElementById("ly-out").innerHTML = "<p class=\"result-miss\">请先选日期和钟点。六神要用这一天的日干。</p>";
      return;
    }
    var cast = Liuyao.cast(types, info.stem);
    var rows = cast.rows.slice().reverse().map(function (row) {
      return "<tr><td>" + row.label + (row.role ? "·" + row.role : "") + "</td><td>" + (row.yang ? "—" : "- -") + "</td><td>" + row.type + (row.moving ? " · 动" : "") + "</td><td>" + row.najia + "</td><td>" + row.liuqin + "</td><td>" + row.liushen + "</td></tr>";
    }).join("");
    document.getElementById("ly-out").innerHTML =
      "<p>" + how + "</p>" +
      "<p>月 " + info.month + " · 日 " + info.day + "。六神从日干" + info.stem + "起。卦本身只由下面六次决定，日期不参与成卦。</p>" +
      '<div class="split"><div>' + drawGua(cast.ben.lines, { width: 64, stroke: 3, gap: 6 }) + "<p>本卦 " + cast.ben.name + " · " + cast.palace + "宫" + cast.palaceElement + "</p></div><div>" +
      drawGua(cast.bian.lines, { width: 64, stroke: 3, gap: 6 }) + "<p>变卦 " + cast.bian.name + (cast.same ? "（没有动爻，变卦与本卦相同）" : "") + "</p></div></div>" +
      "<p>动爻：" + (cast.moving.length ? cast.moving.join("、") : "无") + "。老阳变阴，老阴变阳。</p>" +
      '<table class="data-table"><tr><th>爻</th><th>画</th><th>阴阳</th><th>纳甲</th><th>六亲</th><th>六神</th></tr>' + rows + "</table>" +
      "<p class=\"note\">世应、纳甲用京房八宫。六亲以卦宫五行为我：同我兄弟，我生子孙，生我父母，克我官鬼，我克妻财。</p>";
  }

  document.getElementById("manual").addEventListener("click", function () {
    var types = NAMES.map(function (_, i) { return document.getElementById("yao-" + i).value; });
    show(types, "这卦由手填的六次组成，从初爻到上爻是：" + types.join("、") + "。");
  });

  function paintToss() {
    document.getElementById("toss-list").innerHTML = tosses.map(function (item, i) {
      var coins = item.backs.map(function (back) { return '<span class="coin">' + (back ? "背" : "字") + "</span>"; }).join("");
      return "<p>" + NAMES[i] + " " + coins + " → " + item.type + "</p>";
    }).join("") + (tosses.length < 6 ? "<p>还差 " + (6 - tosses.length) + " 爻。</p>" : "");
  }

  document.getElementById("toss").addEventListener("click", function () {
    if (tosses.length >= 6) return;
    var backs = [0, 1, 2].map(function () {
      var buf = new Uint32Array(1);
      crypto.getRandomValues(buf);
      return buf[0] % 2 === 1;
    });
    tosses.push({ backs: backs, type: Liuyao.fromCoins(backs) });
    paintToss();
    if (tosses.length === 6) {
      show(tosses.map(function (item) { return item.type; }), "这卦由六次铜钱掷成。背为阳、字为阴：三背老阳，二背一字少阳，二字一背少阴，三字老阴。这是随机演示，不是仪式。");
    }
  });
  document.getElementById("reset-toss").addEventListener("click", function () {
    tosses = [];
    paintToss();
  });

  var now = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  document.getElementById("day").value = now;
  document.getElementById("day-hour").value = "12";
})();
