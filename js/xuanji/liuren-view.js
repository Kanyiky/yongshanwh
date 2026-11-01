/* 六壬。时间先换成干支和月将，三传再按 liuren.js 里的九宗门。 */
(function () {
  var out = document.getElementById("lr-out");

  function partsOf(date) {
    var fmt = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Shanghai", hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    var bag = {};
    fmt.formatToParts(date).forEach(function (p) { if (p.type !== "literal") bag[p.type] = p.value; });
    return bag;
  }

  function fill(date) {
    var p = partsOf(date);
    document.getElementById("y").value = p.year;
    document.getElementById("m").value = p.month;
    document.getElementById("d").value = p.day;
    document.getElementById("h").value = p.hour;
    document.getElementById("min").value = p.minute;
  }

  function hourZhi(hour) {
    var names = "子丑寅卯辰巳午未申酉戌亥";
    var index = hour === 23 ? 0 : Math.floor((hour + 1) / 2) % 12;
    return names[index];
  }

  function render() {
    var y = +document.getElementById("y").value;
    var m = +document.getElementById("m").value;
    var d = +document.getElementById("d").value;
    var h = +document.getElementById("h").value;
    var mi = +document.getElementById("min").value;
    try {
      var lunar = Solar.fromYmdHms(y, m, d, h, mi, 0).getLunar();
      var ec = lunar.getEightChar();
      var jiang = Liuren.monthGeneral(lunar);
      var hour = hourZhi(h);
      var result = Liuren.resolve(ec.getDayGan(), ec.getDayZhi(), hour, jiang.jiang);
      var sky = result.sky.map(function (cell) {
        return "<div><div>" + cell.heaven + "</div><div>" + cell.earth + "</div><div>" + (cell.general || "") + "</div></div>";
      }).join("");
      var lessons = result.lessons.map(function (row) {
        var kind = row.kind === "zei" ? "下贼上" : (row.kind === "ke" ? "上克下" : "无克");
        return "<div><div>" + row.upper + "</div><div>" + row.lower + "</div><div>" + row.general + " · " + row.kin + "</div><div>" + kind + "</div></div>";
      }).join("");
      var chuan = result.error
        ? '<p class="result-miss">' + result.error + "</p>"
        : result.chuan.map(function (row) {
          return "<div><b>" + row.order + " " + row.branch + "</b><div>" + row.general + " · " + row.kin + " · " + row.element + "</div></div>";
        }).join("");
      out.innerHTML =
        "<p>" + ec.getYear() + "年 " + ec.getMonth() + "月 " + ec.getDay() + "日 " + ec.getTime() + "时。占时取" + hour + "（" + h + "时）。</p>" +
        "<p>月将 " + jiang.jiang + "，自中气「" + jiang.name + "」" + jiang.solar.toYmdHms() + " 换将。贵人用" + (result.noble.day ? "昼贵" : "夜贵") + result.noble.noble + "，加在地盘" + result.noble.seat + "，天将" + (result.noble.forward ? "顺" : "逆") + "布。</p>" +
        "<h3 class=\"block-title\">" + (result.method || "未能定课") + "</h3>" +
        (result.note ? "<p class=\"note\">" + result.note + "</p>" : "") +
        '<div class="chuan">' + chuan + "</div>" +
        "<h3 class=\"block-title\">四课</h3><div class=\"ke-grid\">" + lessons + "</div>" +
        "<h3 class=\"block-title\">天地盘</h3><p class=\"note\">上为天盘，中为地盘，下为天将。</p><div class=\"sky-grid\">" + sky + "</div>";
    } catch (error) {
      out.innerHTML = "<p class=\"result-miss\">排不出来：" + error.message + "</p>";
    }
  }

  document.getElementById("lr-form").addEventListener("submit", function (event) {
    event.preventDefault();
    render();
  });
  document.getElementById("sample-1").addEventListener("click", function () {
    document.getElementById("y").value = "2024";
    document.getElementById("m").value = "2";
    document.getElementById("d").value = "10";
    document.getElementById("h").value = "12";
    document.getElementById("min").value = "0";
    render();
  });
  fill(new Date());
})();
