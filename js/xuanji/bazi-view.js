/* 八字排盘。四柱、藏干、十神、纳音、大运都交给 lunar-javascript。 */
(function () {
  var GAN_W = { "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土", "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水" };
  var ZHI_W = { "子": "水", "丑": "土", "寅": "木", "卯": "木", "辰": "土", "巳": "火", "午": "火", "未": "土", "申": "金", "酉": "金", "戌": "土", "亥": "水" };
  var out = document.getElementById("bazi-out");

  function partsOf(date) {
    var fmt = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Shanghai", hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    var bag = {};
    fmt.formatToParts(date).forEach(function (p) { if (p.type !== "literal") bag[p.type] = p.value; });
    return { year: +bag.year, month: +bag.month, day: +bag.day, hour: +bag.hour, minute: +bag.minute };
  }

  function fill(p) {
    document.getElementById("y").value = p.year;
    document.getElementById("m").value = p.month;
    document.getElementById("d").value = p.day;
    document.getElementById("h").value = p.hour;
    document.getElementById("min").value = p.minute;
  }

  function num(id) { return parseInt(document.getElementById(id).value, 10); }

  function tally(chars) {
    var bag = { "木": 0, "火": 0, "土": 0, "金": 0, "水": 0 };
    chars.forEach(function (ch) {
      var el = GAN_W[ch] || ZHI_W[ch];
      if (el) bag[el] += 1;
    });
    return ["木", "火", "土", "金", "水"].map(function (el) { return el + bag[el]; }).join("  ");
  }

  function render() {
    var year = num("y"), month = num("m"), day = num("d"), hour = num("h"), minute = num("min");
    if ([year, month, day, hour, minute].some(function (n) { return !isFinite(n); })) {
      out.innerHTML = "<p class=\"result-miss\">请把年月日时分填完整。</p>";
      return;
    }
    var used = { year: year, month: month, day: day, hour: hour, minute: minute };
    var note = "";
    try {
      var solar;
      if (document.getElementById("cal").value === "lunar") {
        var lm = document.getElementById("leap").checked ? -Math.abs(month) : month;
        solar = Lunar.fromYmdHms(year, lm, day, hour, minute, 0).getSolar();
        note = "农历换成公历：" + solar.toYmdHms() + "。";
        used = { year: solar.getYear(), month: solar.getMonth(), day: solar.getDay(), hour: solar.getHour(), minute: solar.getMinute() };
      }
      if (document.getElementById("true-sun").checked) {
        var lon = parseFloat(document.getElementById("lon").value);
        if (!isFinite(lon) || lon < 70 || lon > 140) {
          out.innerHTML = "<p class=\"result-miss\">真太阳时需要出生地东经，中国内地大约在 73 到 135 之间。</p>";
          return;
        }
        var adj = TrueSun.adjust(used.year, used.month, used.day, used.hour, used.minute, lon);
        note += "真太阳时改正 " + adj.offsetMinutes.toFixed(1) + " 分钟，用 " + adj.year + "-" + adj.month + "-" + adj.day + " " + adj.hour + ":" + String(adj.minute).padStart(2, "0") + " 起四柱。";
        used = adj;
      }
      solar = Solar.fromYmdHms(used.year, used.month, used.day, used.hour, used.minute, 0);
      var lunar = solar.getLunar();
      var ec = lunar.getEightChar();
      if (document.getElementById("sect").checked) ec.setSect(1);
      var gender = document.getElementById("gender").value === "male" ? 1 : 0;
      var yun = ec.getYun(gender);
      var surface = tally([ec.getYearGan(), ec.getYearZhi(), ec.getMonthGan(), ec.getMonthZhi(), ec.getDayGan(), ec.getDayZhi(), ec.getTimeGan(), ec.getTimeZhi()]);
      var hidden = tally([].concat(ec.getYearHideGan(), ec.getMonthHideGan(), ec.getDayHideGan(), ec.getTimeHideGan()));
      var jie = lunar.getPrevJie(false);
      var table = "<div class=\"chart-scroll\"><table class=\"pillar-table\"><tr><th></th><th>年</th><th>月</th><th>日</th><th>时</th></tr>" +
        "<tr><th>干支</th>" + [ec.getYear(), ec.getMonth(), ec.getDay(), ec.getTime()].map(function (gz) { return '<td class="gz">' + gz + "</td>"; }).join("") + "</tr>" +
        "<tr><th>藏干</th>" + [ec.getYearHideGan(), ec.getMonthHideGan(), ec.getDayHideGan(), ec.getTimeHideGan()].map(function (g) { return "<td>" + [].concat(g).join(" ") + "</td>"; }).join("") + "</tr>" +
        "<tr><th>天干十神</th>" + [ec.getYearShiShenGan(), ec.getMonthShiShenGan(), ec.getDayShiShenGan(), ec.getTimeShiShenGan()].map(function (g) { return "<td>" + g + "</td>"; }).join("") + "</tr>" +
        "<tr><th>地支十神</th>" + [ec.getYearShiShenZhi(), ec.getMonthShiShenZhi(), ec.getDayShiShenZhi(), ec.getTimeShiShenZhi()].map(function (g) { return "<td>" + [].concat(g).join(" ") + "</td>"; }).join("") + "</tr>" +
        "<tr><th>纳音</th>" + [ec.getYearNaYin(), ec.getMonthNaYin(), ec.getDayNaYin(), ec.getTimeNaYin()].map(function (g) { return "<td>" + g + "</td>"; }).join("") + "</tr></table></div>";
      var dayun = yun.getDaYun().filter(function (dy) { return dy.getGanZhi(); }).map(function (dy) {
        return "<li>" + dy.getGanZhi() + " · " + dy.getStartYear() + "–" + dy.getEndYear() + " · " + dy.getStartAge() + "–" + dy.getEndAge() + "岁</li>";
      }).join("");
      out.innerHTML = "<p class=\"note\">" + (note || "按所填钟点直接起四柱。") + "</p>" + table +
        "<p>四柱八个字：" + surface + "</p><p>地支藏干另计：" + hidden + "</p>" +
        "<p>月柱所在的节：" + jie.getName() + " " + jie.getSolar().toYmdHms() + "。年柱、月柱都按节气，不按农历初一。</p>" +
        "<p>起运：" + yun.getStartYear() + "年" + yun.getStartMonth() + "月" + yun.getStartDay() + "天，交运公历 " + yun.getStartSolar().toYmd() + "。" +
        (document.getElementById("sect").checked ? " 23 点到 24 点仍算当天。" : " 23 点后日柱进一日。") + "</p>" +
        "<h3 class=\"block-title\">大运</h3><ol>" + dayun + "</ol>" +
        '<form id="flow-form" class="tool-form"><label class="field">流年<input id="flow-year" type="number" value="' + (year + 10) + '"></label><button class="btn" type="submit">看这一年</button></form><div id="flow-out"></div>';
      document.getElementById("flow-form").addEventListener("submit", function (event) {
        event.preventDefault();
        var want = parseInt(document.getElementById("flow-year").value, 10);
        var found = null;
        yun.getDaYun().forEach(function (dy) {
          dy.getLiuNian().forEach(function (ln) { if (ln.getYear() === want) found = { dy: dy, ln: ln }; });
        });
        document.getElementById("flow-out").innerHTML = found
          ? "<p>" + want + " 年流年 " + found.ln.getGanZhi() + "，落在大运 " + (found.dy.getGanZhi() || "起运前") + "。</p>"
          : "<p>这步大运列表里没有 " + want + " 年。</p>";
      });
    } catch (error) {
      out.innerHTML = "<p class=\"result-miss\">这个日期排不出来：" + error.message + "</p>";
    }
  }

  document.getElementById("bazi-form").addEventListener("submit", function (event) {
    event.preventDefault();
    render();
  });
  document.getElementById("sample-1").addEventListener("click", function () {
    document.getElementById("cal").value = "solar";
    document.getElementById("gender").value = "male";
    document.getElementById("true-sun").checked = false;
    document.getElementById("sect").checked = false;
    fill({ year: 2005, month: 12, day: 23, hour: 8, minute: 37 });
    render();
  });
  document.getElementById("sample-2").addEventListener("click", function () {
    document.getElementById("cal").value = "solar";
    document.getElementById("gender").value = "female";
    document.getElementById("true-sun").checked = false;
    document.getElementById("sect").checked = false;
    fill({ year: 1981, month: 1, day: 29, hour: 23, minute: 37 });
    render();
  });
  fill(partsOf(new Date()));
})();
