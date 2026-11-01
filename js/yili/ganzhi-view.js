/* 天干、地支可点开。年柱用 lunar-javascript，按立春交换，不按正月初一。 */
(function () {
  var T = YiliTables;
  var stemBox = document.getElementById("stems");
  var branchBox = document.getElementById("branches");
  var detail = document.getElementById("gz-detail");

  stemBox.innerHTML = T.STEMS.map(function (s) {
    return '<button type="button" class="stem-btn" data-kind="stem" data-name="' + s.name + '"><span>' + s.name + '</span><small>' + s.yin + s.element + "</small></button>";
  }).join("");
  branchBox.innerHTML = T.BRANCHES.map(function (s) {
    return '<button type="button" class="stem-btn" data-kind="branch" data-name="' + s.name + '"><span>' + s.name + '</span><small>' + s.element + "</small></button>";
  }).join("");

  function mark(kind, names) {
    document.querySelectorAll('.stem-btn[data-kind="' + kind + '"]').forEach(function (btn) {
      btn.classList.toggle("on", names.indexOf(btn.getAttribute("data-name")) >= 0);
    });
  }

  function showStem(name) {
    var s = T.stemByName(name);
    var rel = T.relationsOfStem(name);
    mark("stem", [name].concat(rel.he.map(function (row) { return row[0] === name ? row[1] : row[0]; }), rel.chong.map(function (row) { return row[0] === name ? row[1] : row[0]; })));
    mark("branch", []);
    var he = rel.he.length ? rel.he.map(function (row) { return row[0] + row[1] + "合" + row[2]; }).join("、") : "无";
    var chong = rel.chong.length ? rel.chong.map(function (row) { return row.join(""); }).join("、") + "相冲" : "戊己居中，没有相冲";
    detail.innerHTML = "<h2>" + name + "</h2><p>" + s.yin + " · " + s.element + "</p><p>五合：" + he + "</p><p>相冲：" + chong + "</p>";
  }

  function joinPair(rows, name) {
    if (!rows.length) return "无";
    return rows.map(function (row) {
      var others = row.filter(function (item) { return item !== name && item.length === 1; });
      var extra = row.filter(function (item) { return item.length > 1; }).join("");
      return others.join("") + (extra ? "（" + extra + "）" : "");
    }).join("、");
  }

  function showBranch(name) {
    var s = T.branchByName(name);
    var rel = T.relationsOfBranch(name);
    var related = [name];
    ["liuhe", "sanhe", "sanhui", "chong", "hai", "po"].forEach(function (key) {
      rel[key].forEach(function (row) {
        row.forEach(function (item) { if (item.length === 1 && related.indexOf(item) < 0) related.push(item); });
      });
    });
    rel.xing.forEach(function (item) { if (related.indexOf(item) < 0) related.push(item); });
    mark("branch", related);
    mark("stem", []);
    detail.innerHTML = "<h2>" + name + "</h2><p>" + s.yin + " · " + s.element + " · " + s.direction + " · " + s.season + "</p>" +
      "<p>藏干：" + s.hidden.join("、") + "</p>" +
      "<p>六合：" + joinPair(rel.liuhe, name) + "</p>" +
      "<p>三合：" + joinPair(rel.sanhe, name) + "</p>" +
      "<p>三会：" + joinPair(rel.sanhui, name) + "</p>" +
      "<p>六冲：" + joinPair(rel.chong, name) + "</p>" +
      "<p>六害：" + joinPair(rel.hai, name) + "</p>" +
      "<p>相破：" + joinPair(rel.po, name) + "</p>" +
      "<p>刑：" + (rel.xing[0] === name ? "自刑" : rel.xing.join("、")) + "</p>";
  }

  document.getElementById("picker").addEventListener("click", function (event) {
    var btn = event.target.closest("button");
    if (!btn) return;
    if (btn.getAttribute("data-kind") === "stem") showStem(btn.getAttribute("data-name"));
    else showBranch(btn.getAttribute("data-name"));
  });

  var list = T.jiazi();
  document.getElementById("jiazi").innerHTML = list.map(function (item) {
    return "<div>" + item.name + "<i>" + item.nayin + "</i></div>";
  }).join("");

  function readDate(value) {
    var bits = value.split("-");
    return { y: +bits[0], m: +bits[1], d: +bits[2] };
  }

  document.getElementById("year-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var value = document.getElementById("year-date").value;
    if (!value) return;
    var p = readDate(value);
    var solar = Solar.fromYmdHms(p.y, p.m, p.d, 12, 0, 0);
    var lunar = solar.getLunar();
    var year = lunar.getEightChar().getYear();
    var lc = lunar.getJieQiTable()["立春"];
    var before = solar.isBefore(lc);
    var nayin = "";
    T.jiazi().forEach(function (item) { if (item.name === year) nayin = item.nayin; });
    document.getElementById("year-out").innerHTML =
      "<p>年柱 <b>" + year + "</b> · " + nayin + "</p>" +
      "<p>这一年的立春是 " + lc.toYmdHms() + "。所选日期" + (before ? "还在立春之前，所以年柱仍是上一年。" : "已过立春，年柱用这一年。") + "</p>" +
      "<p>年柱在立春交换，不是农历正月初一。比较用的是当天中午 12 点；立春若在下午，这一天的上午仍属上一年。</p>";
  });

  showStem("甲");
})();
