/* 对照用例。浏览器和 Node 都能跑。
 * 不过的项会写明期望和实际，不把失败说成通过。
 */
function runSelfTest() {
  var out = [];
  function check(name, ok, detail) {
    out.push({ name: name, ok: !!ok, detail: detail || "" });
  }
  function eq(name, actual, expected) {
    var ok = actual === expected;
    check(name, ok, ok ? actual : ("期望 " + expected + "，实际 " + actual));
  }

  var qian = GuaLogic.byName("乾");
  var tun = GuaLogic.byName("屯");
  eq("屯的错卦是鼎", GuaLogic.byLines(GuaLogic.cuo(tun.lines)).name, "鼎");
  eq("屯的综卦是蒙", GuaLogic.byLines(GuaLogic.zong(tun.lines)).name, "蒙");
  eq("屯的互卦是剥", GuaLogic.byLines(GuaLogic.hu(tun.lines)).name, "剥");
  eq("屯初爻变是比", GuaLogic.byLines(GuaLogic.bian(tun.lines, 0)).name, "比");
  eq("乾的错卦是坤", GuaLogic.byLines(GuaLogic.cuo(qian.lines)).name, "坤");
  eq("经文是六十四卦", String(ZHOUYI.length), "64");
  eq("乾卦辞有元亨", ZHOUYI[0].guaci.indexOf("元亨") >= 0 ? "yes" : "no", "yes");
  eq("乾九二是见龙在田", ZHOUYI[0].yaos[1].text.indexOf("见龙在田") >= 0 ? "yes" : "no", "yes");
  eq("白话有六十四则或待补位", String(BAIHUA.length), "64");

  var tunTypes = ["少阳", "少阴", "少阴", "少阴", "少阳", "少阴"];
  var tunCast = Liuyao.cast(tunTypes, "甲");
  eq("六爻例一本卦屯", tunCast.ben.name, "屯");
  eq("六爻例一无动爻则变卦仍是屯", tunCast.bian.name, "屯");
  eq("屯在坎宫", tunCast.palace + tunCast.palaceElement, "坎水");
  eq("屯世在二爻", tunCast.rows[1].role, "世");
  eq("屯应在五爻", tunCast.rows[4].role, "应");
  eq("屯初爻纳甲庚子兄弟", tunCast.rows[0].najia + tunCast.rows[0].liuqin, "甲子兄弟".replace("甲", "庚"));
  eq("屯三爻官鬼庚辰", tunCast.rows[2].liuqin + tunCast.rows[2].najia, "官鬼庚辰");
  eq("甲日初爻青龙", tunCast.rows[0].liushen, "青龙");
  eq("甲日上爻玄武", tunCast.rows[5].liushen, "玄武");

  var qianCast = Liuyao.cast(["老阳", "老阳", "老阳", "老阳", "老阳", "老阳"], "甲");
  eq("六爻例二老阳为本卦乾", qianCast.ben.name, "乾");
  eq("六爻皆动变坤", qianCast.bian.name, "坤");
  eq("乾世在上爻", qianCast.rows[5].role, "世");
  eq("乾应在三爻", qianCast.rows[2].role, "应");
  eq("乾宫初爻子孙", qianCast.rows[0].liuqin, "子孙");
  eq("乾宫四爻官鬼", qianCast.rows[3].liuqin, "官鬼");
  eq("三背是老阳", Liuyao.fromCoins([true, true, true]), "老阳");
  eq("三字是老阴", Liuyao.fromCoins([false, false, false]), "老阴");
  eq("二背一字是少阳", Liuyao.fromCoins([true, true, false]), "少阳");
  eq("二字一背是少阴", Liuyao.fromCoins([true, false, false]), "少阴");

  function chuan(dayGan, dayZhi, hour, jiang) {
    var r = Liuren.resolve(dayGan, dayZhi, hour, jiang);
    if (r.error) return "ERR:" + r.error;
    return r.method + " " + r.chuan.map(function (x) { return x.branch; }).join("");
  }
  eq("贼克甲子日午将卯时", chuan("甲", "子", "卯", "午"), "重审 申亥寅");
  eq("涉害甲辰日亥将卯时", chuan("甲", "辰", "卯", "亥"), "涉害 子申辰");
  eq("蒿矢壬辰日巳将寅时", chuan("壬", "辰", "寅", "巳"), "蒿矢 戌丑辰");
  eq("弹射壬申日未将辰时", chuan("壬", "申", "辰", "未"), "弹射 巳申亥");
  eq("昴星阳戊寅日子将申时", chuan("戊", "寅", "申", "子"), "昴星·虎视 丑午酉");
  eq("昴星阴丁亥日卯将子时", chuan("丁", "亥", "子", "卯"), "昴星·冬蛇掩目 午戌寅");
  eq("别责阳丙辰日午将巳时", chuan("丙", "辰", "巳", "午"), "别责 亥午午");
  eq("别责阴辛酉日亥将子时", chuan("辛", "酉", "子", "亥"), "别责 丑酉酉");
  eq("八专阳甲寅日子将卯时", chuan("甲", "寅", "卯", "子"), "八专 丑亥亥");
  eq("八专阴丁未日丑将戌时", chuan("丁", "未", "戌", "丑"), "八专 亥戌戌");
  eq("伏吟甲子", chuan("甲", "子", "子", "子"), "伏吟 寅巳申");
  eq("返吟丁丑", chuan("丁", "丑", "丑", "未"), "返吟·井栏射 亥未丑");
  eq("返吟辛丑", chuan("辛", "丑", "丑", "未"), "返吟·井栏射 亥未辰");
  eq("返吟丁未按八专", chuan("丁", "未", "未", "丑"), "返吟·八专 巳丑丑");
  eq("丙戌日子将酉时重审", chuan("丙", "戌", "酉", "子"), "重审 申亥寅");

  var noble = Liuren.resolve("甲", "子", "卯", "午");
  eq("甲日昼贵在丑", noble.noble.noble, "丑");
  var onZi = noble.sky.filter(function (x) { return x.heaven === "子"; })[0];
  var onChou = noble.sky.filter(function (x) { return x.heaven === "丑"; })[0];
  eq("贵人加天盘丑", onChou.general, "贵人");
  eq("逆布则子为腾蛇", onZi.general, "腾蛇");

  var off = TrueSun.offsetMinutes(2024, 6, 1, 87.6);
  check("乌鲁木齐经度改正约 -127.4 分", Math.abs(off + 127.444) < 0.05, "实际 " + off.toFixed(3));
  var moved = TrueSun.adjust(2024, 6, 1, 10, 0, 87.6);
  eq("10时经改正后落到辰时", String(moved.hour), "7");

  var ec = Solar.fromYmdHms(2005, 12, 23, 8, 37, 0).getLunar().getEightChar();
  eq("八字例一2005-12-23 08:37", ec.toString(), "乙酉 戊子 辛巳 壬辰");
  eq("例一藏干", [ec.getYearHideGan(), ec.getMonthHideGan(), ec.getDayHideGan(), ec.getTimeHideGan()].join("|"), "辛|癸|丙,庚,戊|戊,乙,癸");
  eq("例一十神", [ec.getYearShiShenGan(), ec.getMonthShiShenGan(), ec.getDayShiShenGan(), ec.getTimeShiShenGan()].join(" "), "偏财 正印 日主 伤官");
  eq("例一纳音", [ec.getYearNaYin(), ec.getMonthNaYin(), ec.getDayNaYin(), ec.getTimeNaYin()].join(" "), "泉中水 霹雳火 白蜡金 长流水");
  var yun = ec.getYun(1);
  eq("例一男命起运", yun.getStartYear() + "年" + yun.getStartMonth() + "月" + yun.getStartDay() + "天 " + yun.getStartSolar().toYmd(), "5年4月0天 2011-04-23");

  var ec2 = Solar.fromYmdHms(1981, 1, 29, 23, 37, 0).getLunar().getEightChar();
  eq("八字例二1981-01-29 23:37 晚子时", ec2.toString(), "庚申 己丑 丁未 壬子");
  var yun2 = ec2.getYun(0);
  eq("例二女命起运", yun2.getStartYear() + "年" + yun2.getStartMonth() + "月" + yun2.getStartDay() + "天 " + yun2.getStartSolar().toYmd(), "8年0月20天 1989-02-18");

  var before = Solar.fromYmdHms(2024, 2, 4, 16, 0, 0).getLunar().getEightChar();
  var after = Solar.fromYmdHms(2024, 2, 4, 17, 0, 0).getLunar().getEightChar();
  eq("立春前一年月柱", before.getYear() + before.getMonth(), "癸卯乙丑");
  eq("立春后一年月柱", after.getYear() + after.getMonth(), "甲辰丙寅");

  function jiangOf(y, m, d, h) {
    var lunar = Solar.fromYmdHms(y, m, d, h, 0, 0).getLunar();
    return Liuren.monthGeneral(lunar).jiang;
  }
  eq("大寒后雨水前月将子", jiangOf(2024, 2, 10, 12), "子");
  eq("雨水后月将亥", jiangOf(2024, 2, 20, 12), "亥");
  eq("春分前仍是亥", jiangOf(2024, 3, 20, 10), "亥");
  eq("春分后月将戌", jiangOf(2024, 3, 20, 12), "戌");

  var zw = iztro.astro.bySolar("2000-8-16", 2, "女", true, "zh-CN");
  eq("紫微例一四柱", zw.chineseDate, "庚辰 甲申 丙午 庚寅");
  eq("紫微例一命宫身宫", zw.earthlyBranchOfSoulPalace + zw.earthlyBranchOfBodyPalace, "午戌");
  eq("紫微例一木三局", zw.fiveElementsClass, "木三局");
  var hua = [];
  zw.palaces.forEach(function (p) {
    p.majorStars.concat(p.minorStars).forEach(function (s) {
      if (s.mutagen) hua.push(s.name + s.mutagen);
    });
  });
  hua.sort();
  eq("庚干四化", hua.join(" "), "天同忌 太阳禄 太阴科 武曲权");
  var ming = zw.palaces.filter(function (p) { return p.name === "命宫"; })[0];
  eq("命宫主星紫微", ming.majorStars.map(function (s) { return s.name; }).join(""), "紫微");
  var zwLunar = iztro.astro.byLunar("2000-7-17", 2, "女", false, true, "zh-CN");
  eq("农历七月十七与阳历八月十六同一盘", zwLunar.chineseDate + zwLunar.earthlyBranchOfSoulPalace, zw.chineseDate + zw.earthlyBranchOfSoulPalace);

  var zw2 = iztro.astro.bySolar("1984-2-15", 6, "男", true, "zh-CN");
  eq("紫微例二四柱", zw2.chineseDate, "甲子 丙寅 己卯 庚午");
  eq("紫微例二命身宫", zw2.earthlyBranchOfSoulPalace + zw2.earthlyBranchOfBodyPalace, "申申");
  eq("紫微例二金四局", zw2.fiveElementsClass, "金四局");

  eq("甲子纳音", YiliTables.jiazi()[0].nayin, "海中金");
  eq("甲己合", YiliTables.relationsOfStem("甲").he[0].join(""), "甲己土");

  return out;
}
