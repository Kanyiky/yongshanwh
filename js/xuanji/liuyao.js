/* 六爻装卦
 * 爻从初爻到上爻。类型只有四种：老阳、少阳、少阴、老阴。
 * 老阳、老阴是动爻。本卦按阴阳画出，动爻变过后得到变卦。
 * 世应、纳甲用京房八宫。六亲看卦宫五行和爻支五行。
 * 六神看日干，从初爻起。
 */
var Liuyao = (function () {
  var YANG = { "老阳": true, "少阳": true, "老阴": false, "少阴": false };
  var MOVING = { "老阳": true, "老阴": true, "少阳": false, "少阴": false };

  /* 铜钱：背为阳，字为阴。三背老阳，二背一字少阳，二字一背少阴，三字老阴。 */
  /* 键是字面（阴面）的个数：0 老阳，1 少阳，2 少阴，3 老阴。 */
  var COIN_SUM = { 0: "老阳", 1: "少阳", 2: "少阴", 3: "老阴" };

  function fromCoins(backs) {
    var yangCount = 0;
    backs.forEach(function (isBack) { if (isBack) yangCount += 1; });
    var yinCount = 3 - yangCount;
    return COIN_SUM[yinCount];
  }

  var ZHI = "子丑寅卯辰巳午未申酉戌亥";
  var ZHI_WX = { "子": "水", "丑": "土", "寅": "木", "卯": "木", "辰": "土", "巳": "火", "午": "火", "未": "土", "申": "金", "酉": "金", "戌": "土", "亥": "水" };

  /* 纯卦自下而上的纳甲。杂卦取下卦的内三爻、上卦的外三爻。 */
  var NAJIA = {
    "乾": ["甲子", "甲寅", "甲辰", "壬午", "壬申", "壬戌"],
    "坤": ["乙未", "乙巳", "乙卯", "癸丑", "癸亥", "癸酉"],
    "震": ["庚子", "庚寅", "庚辰", "庚午", "庚申", "庚戌"],
    "巽": ["辛丑", "辛亥", "辛酉", "辛未", "辛巳", "辛卯"],
    "坎": ["戊寅", "戊辰", "戊午", "戊申", "戊戌", "戊子"],
    "离": ["己卯", "己丑", "己亥", "己酉", "己未", "己巳"],
    "艮": ["丙辰", "丙午", "丙申", "丙戌", "丙子", "丙寅"],
    "兑": ["丁巳", "丁卯", "丁丑", "丁亥", "丁酉", "丁未"]
  };

  /* 世爻下标。顺序：本宫、一世、二世、三世、四世、五世、游魂、归魂。应爻隔两位。 */
  var SHI = [5, 0, 1, 2, 3, 4, 3, 2];

  var LIUSHEN = {
    "甲": ["青龙", "朱雀", "勾陈", "腾蛇", "白虎", "玄武"],
    "乙": ["青龙", "朱雀", "勾陈", "腾蛇", "白虎", "玄武"],
    "丙": ["朱雀", "勾陈", "腾蛇", "白虎", "玄武", "青龙"],
    "丁": ["朱雀", "勾陈", "腾蛇", "白虎", "玄武", "青龙"],
    "戊": ["勾陈", "腾蛇", "白虎", "玄武", "青龙", "朱雀"],
    "己": ["腾蛇", "白虎", "玄武", "青龙", "朱雀", "勾陈"],
    "庚": ["白虎", "玄武", "青龙", "朱雀", "勾陈", "腾蛇"],
    "辛": ["白虎", "玄武", "青龙", "朱雀", "勾陈", "腾蛇"],
    "壬": ["玄武", "青龙", "朱雀", "勾陈", "腾蛇", "白虎"],
    "癸": ["玄武", "青龙", "朱雀", "勾陈", "腾蛇", "白虎"]
  };

  var SHENG = { "木": "火", "火": "土", "土": "金", "金": "水", "水": "木" };
  var KE = { "木": "土", "土": "水", "水": "火", "火": "金", "金": "木" };

  function relation(palaceElement, lineElement) {
    if (palaceElement === lineElement) return "兄弟";
    if (SHENG[palaceElement] === lineElement) return "子孙";
    if (SHENG[lineElement] === palaceElement) return "父母";
    if (KE[lineElement] === palaceElement) return "官鬼";
    if (KE[palaceElement] === lineElement) return "妻财";
    return "";
  }

  function linesOf(types) {
    return types.map(function (type) { return YANG[type] ? 1 : 0; });
  }

  function changedLines(types) {
    return linesOf(types).map(function (bit, i) {
      return MOVING[types[i]] ? (bit ? 0 : 1) : bit;
    });
  }

  function najiaOf(gua) {
    var lower = NAJIA[gua.lower].slice(0, 3);
    var upper = NAJIA[gua.upper].slice(3, 6);
    return lower.concat(upper);
  }

  /* types 长度 6，从初爻到上爻。dayStem 用来排六神，可以不传。 */
  function cast(types, dayStem) {
    if (!types || types.length !== 6) throw new Error("需要自初爻到上爻的六次结果");
    types.forEach(function (type) {
      if (!(type in YANG)) throw new Error("爻的类型无法识别：" + type);
    });
    var benLines = linesOf(types);
    var bianLines = changedLines(types);
    var ben = GuaLogic.byLines(benLines);
    var bian = GuaLogic.byLines(bianLines);
    var found = GuaLogic.palaceOf(ben.name);
    var shi = SHI[found.index];
    var ying = (shi + 3) % 6;
    var najia = najiaOf(ben);
    var spirits = dayStem ? LIUSHEN[dayStem] : null;
    var rows = types.map(function (type, i) {
      var gz = najia[i];
      var zhi = gz.charAt(1);
      return {
        index: i,
        label: ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"][i],
        type: type,
        yang: YANG[type],
        moving: MOVING[type],
        najia: gz,
        branch: zhi,
        element: ZHI_WX[zhi],
        liuqin: relation(found.palace.element, ZHI_WX[zhi]),
        liushen: spirits ? spirits[i] : "",
        role: i === shi ? "世" : (i === ying ? "应" : "")
      };
    });
    var moving = [];
    rows.forEach(function (row) { if (row.moving) moving.push(row.label); });
    return {
      types: types.slice(),
      ben: ben,
      bian: bian,
      same: ben.name === bian.name,
      palace: found.palace.name,
      palaceElement: found.palace.element,
      palaceIndex: found.index,
      shi: shi,
      ying: ying,
      moving: moving,
      rows: rows
    };
  }

  return {
    fromCoins: fromCoins,
    cast: cast,
    NAJIA: NAJIA,
    LIUSHEN: LIUSHEN
  };
})();
