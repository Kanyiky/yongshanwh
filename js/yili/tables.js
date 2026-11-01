/* 五行、天干、地支的对照表。
 * 这些是通行的固定对应，不是推算出来的吉凶。
 */
var YiliTables = (function () {
  var ELEMENTS = ["木", "火", "土", "金", "水"];

  /* 谁生谁、谁克谁。生：木火土金水木。克：木土水火金木。 */
  var SHENG = { "木": "火", "火": "土", "土": "金", "金": "水", "水": "木" };
  var KE = { "木": "土", "土": "水", "水": "火", "火": "金", "金": "木" };

  function shengWo(el) {
    return Object.keys(SHENG).filter(function (k) { return SHENG[k] === el; })[0];
  }
  function keWo(el) {
    return Object.keys(KE).filter(function (k) { return KE[k] === el; })[0];
  }

  var ELEMENT_INFO = {
    "木": { color: "青", direction: "东", season: "春", organ: "肝、胆", body: "筋、目", virtue: "仁", tone: "角", stem: "甲、乙", branch: "寅、卯" },
    "火": { color: "赤", direction: "南", season: "夏", organ: "心、小肠", body: "脉、舌", virtue: "礼", tone: "徵", stem: "丙、丁", branch: "巳、午" },
    "土": { color: "黄", direction: "中", season: "长夏", organ: "脾、胃", body: "肉、口", virtue: "信", tone: "宫", stem: "戊、己", branch: "辰、戌、丑、未" },
    "金": { color: "白", direction: "西", season: "秋", organ: "肺、大肠", body: "皮毛、鼻", virtue: "义", tone: "商", stem: "庚、辛", branch: "申、酉" },
    "水": { color: "黑", direction: "北", season: "冬", organ: "肾、膀胱", body: "骨、耳", virtue: "智", tone: "羽", stem: "壬、癸", branch: "亥、子" }
  };

  /* 当令为旺，我生者为相，生我者为休，克我者为囚，我克者为死。 */
  var WANG = {
    "春": { "木": "旺", "火": "相", "水": "休", "金": "囚", "土": "死" },
    "夏": { "火": "旺", "土": "相", "木": "休", "水": "囚", "金": "死" },
    "秋": { "金": "旺", "水": "相", "土": "休", "火": "囚", "木": "死" },
    "冬": { "水": "旺", "木": "相", "金": "休", "土": "囚", "火": "死" },
    "四季": { "土": "旺", "金": "相", "火": "休", "木": "囚", "水": "死" }
  };

  var STEMS = [
    { name: "甲", yin: "阳", element: "木" },
    { name: "乙", yin: "阴", element: "木" },
    { name: "丙", yin: "阳", element: "火" },
    { name: "丁", yin: "阴", element: "火" },
    { name: "戊", yin: "阳", element: "土" },
    { name: "己", yin: "阴", element: "土" },
    { name: "庚", yin: "阳", element: "金" },
    { name: "辛", yin: "阴", element: "金" },
    { name: "壬", yin: "阳", element: "水" },
    { name: "癸", yin: "阴", element: "水" }
  ];

  var BRANCHES = [
    { name: "子", yin: "阳", element: "水", direction: "北", season: "仲冬", hidden: ["癸"] },
    { name: "丑", yin: "阴", element: "土", direction: "东北", season: "季冬", hidden: ["己", "癸", "辛"] },
    { name: "寅", yin: "阳", element: "木", direction: "东北", season: "孟春", hidden: ["甲", "丙", "戊"] },
    { name: "卯", yin: "阴", element: "木", direction: "东", season: "仲春", hidden: ["乙"] },
    { name: "辰", yin: "阳", element: "土", direction: "东南", season: "季春", hidden: ["戊", "乙", "癸"] },
    { name: "巳", yin: "阴", element: "火", direction: "东南", season: "孟夏", hidden: ["丙", "庚", "戊"] },
    { name: "午", yin: "阳", element: "火", direction: "南", season: "仲夏", hidden: ["丁", "己"] },
    { name: "未", yin: "阴", element: "土", direction: "西南", season: "季夏", hidden: ["己", "丁", "乙"] },
    { name: "申", yin: "阳", element: "金", direction: "西南", season: "孟秋", hidden: ["庚", "壬", "戊"] },
    { name: "酉", yin: "阴", element: "金", direction: "西", season: "仲秋", hidden: ["辛"] },
    { name: "戌", yin: "阳", element: "土", direction: "西北", season: "季秋", hidden: ["戊", "辛", "丁"] },
    { name: "亥", yin: "阴", element: "水", direction: "西北", season: "孟冬", hidden: ["壬", "甲"] }
  ];

  /* 天干五合、相冲。戊己居中，没有相冲。 */
  var STEM_HE = [
    ["甲", "己", "土"], ["乙", "庚", "金"], ["丙", "辛", "水"], ["丁", "壬", "木"], ["戊", "癸", "火"]
  ];
  var STEM_CHONG = [["甲", "庚"], ["乙", "辛"], ["丙", "壬"], ["丁", "癸"]];

  var BRANCH_LIUHE = [
    ["子", "丑", "土"], ["寅", "亥", "木"], ["卯", "戌", "火"], ["辰", "酉", "金"], ["巳", "申", "水"], ["午", "未", "土"]
  ];
  var BRANCH_SANHE = [
    ["申", "子", "辰", "水"], ["寅", "午", "戌", "火"], ["巳", "酉", "丑", "金"], ["亥", "卯", "未", "木"]
  ];
  var BRANCH_SANHUI = [
    ["寅", "卯", "辰", "木"], ["巳", "午", "未", "火"], ["申", "酉", "戌", "金"], ["亥", "子", "丑", "水"]
  ];
  var BRANCH_CHONG = [["子", "午"], ["丑", "未"], ["寅", "申"], ["卯", "酉"], ["辰", "戌"], ["巳", "亥"]];
  var BRANCH_HAI = [["子", "未"], ["丑", "午"], ["寅", "巳"], ["卯", "辰"], ["申", "亥"], ["酉", "戌"]];
  var BRANCH_PO = [["子", "酉"], ["卯", "午"], ["辰", "丑"], ["未", "戌"], ["寅", "亥"], ["巳", "申"]];
  /* 三刑：寅巳申、丑戌未、子卯，加上辰午酉亥自刑。 */
  var BRANCH_XING = {
    "寅": ["巳", "申"], "巳": ["申", "寅"], "申": ["寅", "巳"],
    "丑": ["戌", "未"], "戌": ["未", "丑"], "未": ["丑", "戌"],
    "子": ["卯"], "卯": ["子"],
    "辰": ["辰"], "午": ["午"], "酉": ["酉"], "亥": ["亥"]
  };

  /* 六十甲子纳音。两干支一对，共三十组。 */
  var NAYIN = [
    "海中金", "炉中火", "大林木", "路旁土", "剑锋金", "山头火",
    "涧下水", "城头土", "白蜡金", "杨柳木", "泉中水", "屋上土",
    "霹雳火", "松柏木", "长流水", "沙中金", "山下火", "平地木",
    "壁上土", "金箔金", "覆灯火", "天河水", "大驿土", "钗钏金",
    "桑柘木", "大溪水", "沙中土", "天上火", "石榴木", "大海水"
  ];

  function jiazi() {
    var gan = "甲乙丙丁戊己庚辛壬癸";
    var zhi = "子丑寅卯辰巳午未申酉戌亥";
    var list = [];
    for (var i = 0; i < 60; i++) {
      list.push({
        name: gan[i % 10] + zhi[i % 12],
        nayin: NAYIN[Math.floor(i / 2)]
      });
    }
    return list;
  }

  function stemByName(name) {
    return STEMS.filter(function (s) { return s.name === name; })[0];
  }
  function branchByName(name) {
    return BRANCHES.filter(function (s) { return s.name === name; })[0];
  }

  function relationsOfStem(name) {
    return {
      he: STEM_HE.filter(function (row) { return row[0] === name || row[1] === name; }),
      chong: STEM_CHONG.filter(function (row) { return row[0] === name || row[1] === name; })
    };
  }

  function pairHit(rows, name) {
    var found = [];
    rows.forEach(function (row) {
      if (row.indexOf(name) >= 0) found.push(row);
    });
    return found;
  }

  function relationsOfBranch(name) {
    return {
      liuhe: pairHit(BRANCH_LIUHE, name),
      sanhe: pairHit(BRANCH_SANHE, name),
      sanhui: pairHit(BRANCH_SANHUI, name),
      chong: pairHit(BRANCH_CHONG, name),
      hai: pairHit(BRANCH_HAI, name),
      po: pairHit(BRANCH_PO, name),
      xing: BRANCH_XING[name] || []
    };
  }

  return {
    ELEMENTS: ELEMENTS,
    SHENG: SHENG,
    KE: KE,
    shengWo: shengWo,
    keWo: keWo,
    ELEMENT_INFO: ELEMENT_INFO,
    WANG: WANG,
    STEMS: STEMS,
    BRANCHES: BRANCHES,
    stemByName: stemByName,
    branchByName: branchByName,
    relationsOfStem: relationsOfStem,
    relationsOfBranch: relationsOfBranch,
    jiazi: jiazi,
    NAYIN: NAYIN
  };
})();
