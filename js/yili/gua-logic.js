/* 六十四卦的关系，全部由爻象算出来。
 * lines：自下而上，1 是阳爻，0 是阴爻。
 * 依赖 zhouyi-text.js 里的 ZHOUYI。
 */
var GuaLogic = (function () {
  var TRIGRAM = {
    "111": "乾", "110": "兑", "101": "离", "100": "震",
    "011": "巽", "010": "坎", "001": "艮", "000": "坤"
  };

  function keyOf(lines) {
    return lines.join("");
  }

  function byLines(lines) {
    var key = keyOf(lines);
    for (var i = 0; i < ZHOUYI.length; i++) {
      if (keyOf(ZHOUYI[i].lines) === key) return ZHOUYI[i];
    }
    return null;
  }

  function byName(name) {
    for (var i = 0; i < ZHOUYI.length; i++) {
      if (ZHOUYI[i].name === name) return ZHOUYI[i];
    }
    return null;
  }

  function trigramName(bits) {
    return TRIGRAM[bits.join("")] || "";
  }

  /* 错卦：阴阳全部对调。 */
  function cuo(lines) {
    return lines.map(function (bit) { return bit ? 0 : 1; });
  }

  /* 综卦：上下颠倒。乾、坤这类颠倒后仍是自己。 */
  function zong(lines) {
    return lines.slice().reverse();
  }

  /* 互卦：二三四爻为下卦，三四五爻为上卦。下标从 0 起。 */
  function hu(lines) {
    return [lines[1], lines[2], lines[3], lines[2], lines[3], lines[4]];
  }

  /* 变卦：只改动一爻。index 从 0（初爻）到 5（上爻）。 */
  function bian(lines, index) {
    var next = lines.slice();
    next[index] = next[index] ? 0 : 1;
    return next;
  }

  /* 京房八宫。每一宫 8 卦：本宫、一世到五世、游魂、归魂。 */
  var PALACES = [
    { name: "乾", element: "金", names: ["乾", "姤", "遁", "否", "观", "剥", "晋", "大有"] },
    { name: "坎", element: "水", names: ["坎", "节", "屯", "既济", "革", "丰", "明夷", "师"] },
    { name: "艮", element: "土", names: ["艮", "贲", "大畜", "损", "睽", "履", "中孚", "渐"] },
    { name: "震", element: "木", names: ["震", "豫", "解", "恒", "升", "井", "大过", "随"] },
    { name: "巽", element: "木", names: ["巽", "小畜", "家人", "益", "无妄", "噬嗑", "颐", "蛊"] },
    { name: "离", element: "火", names: ["离", "旅", "鼎", "未济", "蒙", "涣", "讼", "同人"] },
    { name: "坤", element: "土", names: ["坤", "复", "临", "泰", "大壮", "夬", "需", "比"] },
    { name: "兑", element: "金", names: ["兑", "困", "萃", "咸", "蹇", "谦", "小过", "归妹"] }
  ];

  function palaceOf(name) {
    for (var i = 0; i < PALACES.length; i++) {
      var at = PALACES[i].names.indexOf(name);
      if (at >= 0) return { palace: PALACES[i], index: at };
    }
    return null;
  }

  return {
    TRIGRAM: TRIGRAM,
    PALACES: PALACES,
    byLines: byLines,
    byName: byName,
    trigramName: trigramName,
    cuo: cuo,
    zong: zong,
    hu: hu,
    bian: bian,
    palaceOf: palaceOf
  };
})();
