/* 大六壬排三传
 *
 * 学校与次序（页面上也会写给读者）：
 * 月将加在占时上。四课用日干寄宫：
 *   甲寅、乙辰、丙戊巳、丁己未、庚申、辛戌、壬亥、癸丑。
 * 第一课的生克用日干本身，不用寄宫地支。
 * 取传次序：
 *   1. 伏吟、返吟先看
 *   2. 先下贼上，没有才上克下（贼克）
 *   3. 多课则比用：阳日取阳神，阴日取阴神
 *   4. 比用分不开则涉害：从所临之地顺数到本家，不计起点
 *      下贼上计沿途受克，上克下计沿途去克
 *      深浅相同再取孟、仲、季；仍同则阳日取干上、阴日取支上
 *   5. 四课无克：先神遥克日（蒿矢），没有才日遥克神（弹射）
 *   6. 四课全、无克无遥：昴星。阳日酉上神，阴日酉下神
 *   7. 只成三课、无克无遥：别责
 *   8. 干支同宫、无克：八专。有克仍按贼克
 * 伏吟：有克取克；无克阳日干上、阴日支上。中末用刑，自刑则干支互取，再自刑取冲。
 *   丁卯、己卯、辛卯无克伏吟，末传改取中传的冲，依《大六壬探原》。
 * 返吟有克：初传按克，中末按天盘（返吟盘上就是对冲）。
 * 返吟无克：丁丑、己丑、辛丑、辛未为井栏，初传驿马，中传支上，末传干上。
 *   丁未、己未无克返吟按八专，中末都是干上。
 * 以上以外的无克返吟，不硬给三传。
 *
 * 贵人：甲戊庚牛羊，乙己鼠猴乡，丙丁猪鸡位，壬癸蛇兔藏，六辛逢马虎。
 * 卯至申为昼，取每对的前一个；酉至寅为夜，取后一个。
 * 贵人落在地盘亥到辰，十二天将顺布；落在巳到戌，逆布。
 */
var Liuren = (function () {
  var ZHI = "子丑寅卯辰巳午未申酉戌亥".split("");
  var GAN = "甲乙丙丁戊己庚辛壬癸".split("");
  var GAN_WX = { "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土", "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水" };
  var ZHI_WX = { "子": "水", "丑": "土", "寅": "木", "卯": "木", "辰": "土", "巳": "火", "午": "火", "未": "土", "申": "金", "酉": "金", "戌": "土", "亥": "水" };
  var KE_NEXT = { "木": "土", "土": "水", "水": "火", "火": "金", "金": "木" };
  var SHENG_NEXT = { "木": "火", "火": "土", "土": "金", "金": "水", "水": "木" };
  var LODGE = { "甲": "寅", "乙": "辰", "丙": "巳", "丁": "未", "戊": "巳", "己": "未", "庚": "申", "辛": "戌", "壬": "亥", "癸": "丑" };
  var LODGED = { "寅": ["甲"], "辰": ["乙"], "巳": ["丙", "戊"], "未": ["丁", "己"], "申": ["庚"], "戌": ["辛"], "亥": ["壬"], "丑": ["癸"] };
  var HE = { "甲": "己", "己": "甲", "乙": "庚", "庚": "乙", "丙": "辛", "辛": "丙", "丁": "壬", "壬": "丁", "戊": "癸", "癸": "戊" };
  var XING = { "子": "卯", "丑": "戌", "寅": "巳", "卯": "子", "辰": "辰", "巳": "申", "午": "午", "未": "丑", "申": "寅", "酉": "酉", "戌": "未", "亥": "亥" };
  var SANHE_NEXT = { "申": "子", "子": "辰", "辰": "申", "巳": "酉", "酉": "丑", "丑": "巳", "寅": "午", "午": "戌", "戌": "寅", "亥": "卯", "卯": "未", "未": "亥" };
  var QI_JIANG = { "冬至": "丑", "大寒": "子", "雨水": "亥", "春分": "戌", "谷雨": "酉", "小满": "申", "夏至": "未", "大暑": "午", "处暑": "巳", "秋分": "辰", "霜降": "卯", "小雪": "寅" };
  var GENERALS = ["贵人", "腾蛇", "朱雀", "六合", "勾陈", "青龙", "天空", "白虎", "太常", "玄武", "太阴", "天后"];
  var GUI = {
    "甲": ["丑", "未"], "戊": ["丑", "未"], "庚": ["丑", "未"],
    "乙": ["子", "申"], "己": ["子", "申"],
    "丙": ["亥", "酉"], "丁": ["亥", "酉"],
    "壬": ["巳", "卯"], "癸": ["巳", "卯"],
    "辛": ["午", "寅"]
  };
  var DAY_ZHI = { "卯": 1, "辰": 1, "巳": 1, "午": 1, "未": 1, "申": 1 };

  function at(i) { return ZHI[((i % 12) + 12) % 12]; }
  function idx(z) { return ZHI.indexOf(z); }
  function next(z, step) { return at(idx(z) + step); }
  function yangGan(g) { return "甲丙戊庚壬".indexOf(g) >= 0; }
  function yangZhi(z) { return idx(z) % 2 === 0; }
  function ke(a, b) { return KE_NEXT[a] === b; }
  function rankMeng(z) {
    if ("寅申巳亥".indexOf(z) >= 0) return 3;
    if ("子午卯酉".indexOf(z) >= 0) return 2;
    return 1;
  }

  function plate(jiang, hour) {
    var shift = (idx(jiang) - idx(hour) + 12) % 12;
    var heaven = {};
    var earthOf = {};
    ZHI.forEach(function (z) {
      var up = at(idx(z) + shift);
      heaven[z] = up;
      earthOf[up] = z;
    });
    return { shift: shift, heaven: heaven, earthOf: earthOf };
  }

  function lessonsOf(dayGan, dayZhi, pan) {
    var lodge = LODGE[dayGan];
    var spots = [lodge, pan.heaven[lodge], dayZhi, pan.heaven[dayZhi]];
    var list = [];
    for (var i = 0; i < 4; i++) {
      var lowerZhi = spots[i];
      var upper = pan.heaven[lowerZhi];
      var lowerWx = i === 0 ? GAN_WX[dayGan] : ZHI_WX[lowerZhi];
      var upperWx = ZHI_WX[upper];
      var kind = "none";
      if (ke(lowerWx, upperWx)) kind = "zei";
      else if (ke(upperWx, lowerWx)) kind = "ke";
      list.push({
        n: i + 1,
        side: i < 2 ? "gan" : "zhi",
        lowerName: i === 0 ? dayGan : lowerZhi,
        lowerZhi: lowerZhi,
        upper: upper,
        kind: kind
      });
    }
    return list;
  }

  function uniqueCount(lessons) {
    var seen = {};
    lessons.forEach(function (row) { seen[row.lowerZhi + row.upper] = 1; });
    return Object.keys(seen).length;
  }

  function depth(upper, seat, mode) {
    if (seat === upper) return 0;
    var el = ZHI_WX[upper];
    var pos = next(seat, 1);
    var n = 0;
    for (var guard = 0; guard < 12; guard++) {
      if (mode === "zei" && ke(ZHI_WX[pos], el)) n += 1;
      if (mode === "ke" && ke(el, ZHI_WX[pos])) n += 1;
      (LODGED[pos] || []).forEach(function (g) {
        if (mode === "zei" && ke(GAN_WX[g], el)) n += 1;
        if (mode === "ke" && ke(el, GAN_WX[g])) n += 1;
      });
      if (pos === upper) break;
      pos = next(pos, 1);
    }
    return n;
  }

  function chooseKe(dayGan, lessons) {
    var zei = lessons.filter(function (row) { return row.kind === "zei"; });
    var pool = zei.length ? zei : lessons.filter(function (row) { return row.kind === "ke"; });
    if (!pool.length) return null;
    var mode = zei.length ? "zei" : "ke";
    var baseName = zei.length ? "重审" : "元首";
    var distinct = [];
    var seen = {};
    pool.forEach(function (row) {
      var key = row.upper + "@" + row.lowerZhi;
      if (!seen[key]) { seen[key] = 1; distinct.push(row); }
    });
    if (distinct.length === 1) return { row: distinct[0], mode: mode, name: baseName };
    var yang = yangGan(dayGan);
    var matched = distinct.filter(function (row) { return yangZhi(row.upper) === yang; });
    if (matched.length === 1) return { row: matched[0], mode: mode, name: "知一" };
    var harm = matched.length ? matched : distinct;
    harm.forEach(function (row) { row.depth = depth(row.upper, row.lowerZhi, mode); });
    harm.sort(function (a, b) {
      if (b.depth !== a.depth) return b.depth - a.depth;
      var ra = rankMeng(a.lowerZhi);
      var rb = rankMeng(b.lowerZhi);
      if (rb !== ra) return rb - ra;
      var prefer = yang ? "gan" : "zhi";
      return (a.side === prefer ? 0 : 1) - (b.side === prefer ? 0 : 1);
    });
    if (harm.length > 1 && harm[0].depth === harm[1].depth && rankMeng(harm[0].lowerZhi) === rankMeng(harm[1].lowerZhi) && harm[0].side === harm[1].side) {
      return { error: "涉害深浅、孟仲季和干支都分不开，本页不硬取初传。" };
    }
    return { row: harm[0], mode: mode, name: "涉害" };
  }

  function yaoke(dayGan, lessons) {
    var dayWx = GAN_WX[dayGan];
    var uppers = [];
    var seen = {};
    lessons.forEach(function (row) {
      if (seen[row.upper]) return;
      seen[row.upper] = 1;
      uppers.push(row);
    });
    var shen = uppers.filter(function (row) { return ke(ZHI_WX[row.upper], dayWx); });
    var ri = uppers.filter(function (row) { return ke(dayWx, ZHI_WX[row.upper]); });
    var pool = shen.length ? shen : ri;
    if (!pool.length) return null;
    var name = shen.length ? "蒿矢" : "弹射";
    var yang = yangGan(dayGan);
    var matched = pool.filter(function (row) { return yangZhi(row.upper) === yang; });
    var use = matched.length ? matched : pool;
    if (use.length > 1) {
      return { error: "遥克有两个以上同阴阳的上神，本页不硬取。" };
    }
    return { row: use[0], name: name };
  }

  function chain(pan, chu) {
    var zhong = pan.heaven[chu];
    return [chu, zhong, pan.heaven[zhong]];
  }

  function passThree(start, step) {
    return next(start, step * 2);
  }

  function bieze(dayGan, dayZhi, pan) {
    var up = pan.heaven[LODGE[dayGan]];
    var chu;
    if (yangGan(dayGan)) chu = pan.heaven[LODGE[HE[dayGan]]];
    else chu = SANHE_NEXT[dayZhi];
    return { name: "别责", chuan: [chu, up, up] };
  }

  function bazhuan(dayGan, lessons, pan) {
    var up = pan.heaven[LODGE[dayGan]];
    var chu = yangGan(dayGan) ? passThree(up, 1) : passThree(lessons[3].upper, -1);
    return { name: "八专", chuan: [chu, up, up] };
  }

  function fuyin(dayGan, dayZhi, lessons, pan) {
    var picked = chooseKe(dayGan, lessons);
    if (picked && picked.error) return picked;
    var ganUp = pan.heaven[LODGE[dayGan]];
    var zhiUp = pan.heaven[dayZhi];
    var chu, how;
    if (picked) {
      chu = picked.row.upper;
      how = "伏吟·" + picked.name;
    } else if (["丁卯", "己卯", "辛卯"].indexOf(dayGan + dayZhi) >= 0) {
      return { name: "伏吟", chuan: ["卯", "子", "午"], note: "丁卯、己卯、辛卯无克伏吟，末传取中传之冲（《大六壬探原》）。" };
    } else {
      chu = yangGan(dayGan) ? ganUp : zhiUp;
      how = "伏吟";
    }
    var zhong = XING[chu];
    if (XING[chu] === chu) zhong = (chu === ganUp ? zhiUp : ganUp);
    var mo = XING[zhong];
    if (XING[zhong] === zhong) mo = next(zhong, 6);
    return { name: how, chuan: [chu, zhong, mo] };
  }

  function fanyin(dayGan, dayZhi, lessons, pan) {
    var picked = chooseKe(dayGan, lessons);
    if (picked && picked.error) return picked;
    if (picked) {
      return { name: "返吟·" + picked.name, chuan: chain(pan, picked.row.upper) };
    }
    var key = dayGan + dayZhi;
    if (key === "丁未" || key === "己未") {
      var done = bazhuan(dayGan, lessons, pan);
      done.name = "返吟·八专";
      done.note = "丁未、己未无克返吟按八专，中末都用干上。";
      return done;
    }
    if (["丁丑", "己丑", "辛丑", "辛未"].indexOf(key) >= 0) {
      var chu = dayZhi === "丑" ? "亥" : "巳";
      return {
        name: "返吟·井栏射",
        chuan: [chu, pan.heaven[dayZhi], pan.heaven[LODGE[dayGan]]],
        note: "无克返吟取驿马为初，支上为中，干上为末。"
      };
    }
    return { error: "这一日的返吟没有克，又不是井栏或丁未、己未八专。本页不另造三传。" };
  }

  function resolve(dayGan, dayZhi, hour, jiang) {
    var pan = plate(jiang, hour);
    var lessons = lessonsOf(dayGan, dayZhi, pan);
    var count = uniqueCount(lessons);
    var fuyinPan = pan.shift === 0;
    var fanyinPan = pan.shift === 6;
    var result;
    if (fuyinPan) result = fuyin(dayGan, dayZhi, lessons, pan);
    else if (fanyinPan) result = fanyin(dayGan, dayZhi, lessons, pan);
    else if (count === 2 && !lessons.some(function (row) { return row.kind !== "none"; })) result = bazhuan(dayGan, lessons, pan);
    else {
      var picked = chooseKe(dayGan, lessons);
      if (picked && picked.error) result = picked;
      else if (picked) result = { name: picked.name, chuan: chain(pan, picked.row.upper) };
      else if (count === 2) result = bazhuan(dayGan, lessons, pan);
      else {
        var remote = yaoke(dayGan, lessons);
        if (remote && remote.error) result = remote;
        else if (remote) result = { name: remote.name, chuan: chain(pan, remote.row.upper) };
        else if (count === 3) result = bieze(dayGan, dayZhi, pan);
        else if (count === 4) {
          var upGan = pan.heaven[LODGE[dayGan]];
          var upZhi = pan.heaven[dayZhi];
          if (yangGan(dayGan)) result = { name: "昴星·虎视", chuan: [pan.heaven["酉"], upZhi, upGan] };
          else result = { name: "昴星·冬蛇掩目", chuan: [pan.earthOf["酉"], upGan, upZhi] };
        } else result = { error: "课数不是二、三、四，本页不排。" };
      }
    }
    return finish(dayGan, dayZhi, hour, jiang, pan, lessons, count, result);
  }

  function relative(dayGan, zhi) {
    var a = GAN_WX[dayGan];
    var b = ZHI_WX[zhi];
    if (a === b) return "兄弟";
    if (SHENG_NEXT[a] === b) return "子孙";
    if (SHENG_NEXT[b] === a) return "父母";
    if (KE_NEXT[b] === a) return "官鬼";
    if (KE_NEXT[a] === b) return "妻财";
    return "";
  }

  function generals(dayGan, hour, pan) {
    var pair = GUI[dayGan];
    var day = !!DAY_ZHI[hour];
    var noble = day ? pair[0] : pair[1];
    var seat = pan.earthOf[noble];
    var forward = "亥子丑寅卯辰".indexOf(seat) >= 0;
    var map = {};
    for (var i = 0; i < 12; i++) {
      var branch = forward ? next(noble, i) : next(noble, -i);
      map[branch] = GENERALS[i];
    }
    return { noble: noble, day: day, forward: forward, seat: seat, map: map };
  }

  function finish(dayGan, dayZhi, hour, jiang, pan, lessons, count, result) {
    var tian = generals(dayGan, hour, pan);
    var sky = ZHI.map(function (earth) {
      var heaven = pan.heaven[earth];
      return { earth: earth, heaven: heaven, general: tian.map[heaven] };
    });
    var out = {
      day: dayGan + dayZhi,
      hour: hour,
      jiang: jiang,
      shift: pan.shift,
      lessons: lessons.map(function (row) {
        return {
          n: row.n,
          lower: row.lowerName,
          upper: row.upper,
          kind: row.kind,
          general: tian.map[row.upper],
          kin: relative(dayGan, row.upper)
        };
      }),
      sky: sky,
      noble: tian,
      lessonCount: count
    };
    if (result.error) {
      out.error = result.error;
      return out;
    }
    out.method = result.name;
    out.note = result.note || "";
    out.chuan = result.chuan.map(function (z, i) {
      return {
        order: ["初传", "中传", "末传"][i],
        branch: z,
        general: tian.map[z],
        kin: relative(dayGan, z),
        element: ZHI_WX[z]
      };
    });
    return out;
  }

  /* 月将：取此刻之前最近的中气。lunar 是 lunar-javascript 的 Lunar 对象。 */
  function monthGeneral(lunar) {
    var prev = lunar.getPrevQi(false);
    var name = prev.getName();
    var jiang = QI_JIANG[name];
    if (!jiang) return { error: "认不出中气：" + name };
    return { name: name, jiang: jiang, solar: prev.getSolar() };
  }

  return {
    resolve: resolve,
    monthGeneral: monthGeneral,
    QI_JIANG: QI_JIANG,
    LODGE: LODGE,
    plate: plate
  };
})();
