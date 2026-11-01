/* 紫微斗数。星盘用 iztro，宫位的短句只说明这一宫传统上管什么。 */
(function () {
  var MEANING = {
    "命宫": "本人的气质和一生的格局。",
    "兄弟": "兄弟手足和同辈。",
    "夫妻": "婚姻和配偶。",
    "子女": "子女、晚辈，也兼看创作。",
    "财帛": "钱从哪里来、怎么用。",
    "疾厄": "身体。",
    "迁移": "外出、交际，以及别人看到的自己。",
    "仆役": "朋友、下属和合作的人。",
    "官禄": "事业和职位。",
    "田宅": "家宅、产业和居住。",
    "福德": "精神上的享受和福分。",
    "父母": "父母、长辈和文书。"
  };
  var BRANCH_CELL = { "巳": 1, "午": 2, "未": 3, "申": 4, "辰": 5, "酉": 8, "卯": 9, "戌": 12, "寅": 13, "丑": 14, "子": 15, "亥": 16 };
  var out = document.getElementById("zw-out");

  function starText(list) {
    return list.map(function (star) {
      var extra = (star.brightness || "") + (star.mutagen || "");
      return star.name + (extra ? "·" + extra : "");
    }).join(" ");
  }

  function cell(palace) {
    var major = palace.majorStars.length ? starText(palace.majorStars) : "无主星";
    var minor = palace.minorStars.length ? starText(palace.minorStars) : "";
    var bad = palace.minorStars.filter(function (star) { return star.type === "tough"; });
    var range = palace.decadal ? palace.decadal.range[0] + "–" + palace.decadal.range[1] + "岁" : "";
    var body = palace.isBodyPalace ? " · 身宫" : "";
    return '<article class="palace-cell" style="grid-column:' + ((BRANCH_CELL[palace.earthlyBranch] - 1) % 4 + 1) + ';grid-row:' + Math.ceil(BRANCH_CELL[palace.earthlyBranch] / 4) + '">' +
      "<b>" + palace.name + body + "</b> " + palace.heavenlyStem + palace.earthlyBranch +
      '<div class="star">' + major + "</div>" +
      (minor ? '<div class="muted">' + minor + "</div>" : "") +
      '<div class="muted">大限 ' + range + (palace.decadal ? " · " + palace.decadal.heavenlyStem + palace.decadal.earthlyBranch : "") + "</div>" +
      "<div>" + (MEANING[palace.name] || "") + "</div></article>";
  }

  function mutagen(chart) {
    var list = [];
    chart.palaces.forEach(function (palace) {
      palace.majorStars.concat(palace.minorStars).forEach(function (star) {
        if (star.mutagen) list.push(star.name + "化" + star.mutagen);
      });
    });
    return list.join("、");
  }

  function render(chart, flow) {
    var center = '<div class="palace-cell center-cell"><div>' + chart.fiveElementsClass + "</div><div>命主 " + chart.soul + " · 身主 " + chart.body + "</div><div>命宫在" + chart.earthlyBranchOfSoulPalace + " · 身宫在" + chart.earthlyBranchOfBodyPalace + "</div><div>四化 " + mutagen(chart) + "</div>" + (flow || "") + "</div>";
    out.innerHTML = "<p class=\"note\">" + chart.solarDate + " · 农历" + chart.lunarDate + " · " + chart.time + " " + chart.timeRange + " · " + chart.chineseDate + "</p>" +
      '<div class="chart-scroll"><div class="palace-grid">' + chart.palaces.map(cell).join("") + center + "</div></div>";
  }

  function timeIndex() { return parseInt(document.getElementById("shi").value, 10); }

  function build() {
    var date = document.getElementById("date").value;
    if (!date) return;
    var text = date.replace(/^0/, "").replace(/-0/g, "-");
    var gender = document.getElementById("gender").value;
    try {
      var chart = iztro.astro.bySolar(text, timeIndex(), gender, true, "zh-CN");
      render(chart);
      window.__ziwei = chart;
    } catch (error) {
      out.innerHTML = "<p class=\"result-miss\">这个日期排不出来：" + error.message + "</p>";
    }
  }

  document.getElementById("zw-form").addEventListener("submit", function (event) {
    event.preventDefault();
    build();
  });
  document.getElementById("flow-form").addEventListener("submit", function (event) {
    event.preventDefault();
    if (!window.__ziwei) build();
    if (!window.__ziwei) return;
    var day = document.getElementById("flow-date").value;
    if (!day) return;
    var text = day.replace(/-0/g, "-").replace(/^0/, "");
    var hour = parseInt(document.getElementById("flow-shi").value, 10);
    var flow = window.__ziwei.horoscope(text, hour);
    var line = "<div>流年 " + flow.yearly.heavenlyStem + flow.yearly.earthlyBranch + " · 四化 " + flow.yearly.mutagen.join("、") + "</div>";
    render(window.__ziwei, line);
  });
  document.getElementById("sample-1").addEventListener("click", function () {
    document.getElementById("date").value = "2000-08-16";
    document.getElementById("shi").value = "2";
    document.getElementById("gender").value = "女";
    build();
  });
  document.getElementById("sample-2").addEventListener("click", function () {
    document.getElementById("date").value = "1984-02-15";
    document.getElementById("shi").value = "6";
    document.getElementById("gender").value = "男";
    build();
  });
})();
