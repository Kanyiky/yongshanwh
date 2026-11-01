/* 典籍进阶：四段阅读和自测。进度只存在这台浏览器。 */
var QuizData = [
  {
    id: 1,
    title: "入门",
    text: "先分清阴阳和五行的方向，再记住十天干、十二地支各属什么。这一段不排盘。",
    links: [
      ["五行生克", "../wuxing/"],
      ["天干地支", "../ganzhi/"]
    ],
    questions: [
      ["木生什么？", ["火", "水", "金", "土"], 0],
      ["金克什么？", ["木", "火", "土", "水"], 0],
      ["谁克火？", ["水", "木", "土", "金"], 0],
      ["甲是什么？", ["阳木", "阴木", "阳火", "阴水"], 0],
      ["子的五行是？", ["水", "木", "金", "土"], 0],
      ["午的方位，按十二支通行配法是？", ["南", "北", "东", "西"], 0],
      ["寅的藏干是？", ["甲、丙、戊", "乙", "丙、庚、戊", "壬、甲"], 0],
      ["春季当令、状态为旺的是？", ["木", "金", "水", "土"], 0],
      ["五行相生的一圈，土生什么？", ["金", "木", "火", "水"], 0],
      ["乙和庚的关系是？", ["五合", "相冲", "没有固定关系", "三合"], 0]
    ]
  },
  {
    id: 2,
    title: "基础",
    text: "卦有上下体，干支之间有合冲刑害。下面的题都能在六十四卦和天干地支两页里对出来。",
    links: [
      ["六十四卦", "../gua/"],
      ["天干地支", "../ganzhi/"]
    ],
    questions: [
      ["文王卦序第一卦是？", ["乾", "坤", "屯", "离"], 0],
      ["乾卦上下是？", ["乾下乾上", "坤下乾上", "坎下离上", "震下坎上"], 0],
      ["坤是第几卦？", ["2", "1", "8", "64"], 0],
      ["屯的上下卦是？", ["震下坎上", "坎下震上", "乾下坤上", "离下坎上"], 0],
      ["错卦是什么算法？", ["六爻阴阳全部对调", "上下颠倒", "只改初爻", "按八宫顺推一宫"], 0],
      ["子午是？", ["六冲", "六合", "三合水局里相邻的两支", "自刑"], 0],
      ["寅午戌合成什么？", ["火", "水", "金", "木"], 0],
      ["申子辰是？", ["三合水局", "三会金局", "六害", "相破"], 0],
      ["甲子的纳音是？", ["海中金", "炉中火", "剑锋金", "大海水"], 0],
      ["年柱在哪一天交换？", ["立春", "正月初一", "冬至", "清明"], 0]
    ]
  },
  {
    id: 3,
    title: "进阶",
    text: "对照卦辞里的原句。原句以本站六十四卦页所载维基文库文本为准，不靠记忆里的别本。",
    links: [["六十四卦", "../gua/"]],
    quote: true,
    questions: [
      ["乾卦辞里的那一组字是？", ["元亨利贞", "吉凶悔吝", "潜龙勿用", "飞龙在天"], 0],
      ["「见龙在田」是哪一爻？", ["九二", "初九", "九五", "上九"], 0],
      ["用九属于哪一卦？", ["乾", "坤", "既济", "未济"], 0],
      ["用六属于哪一卦？", ["坤", "乾", "坎", "离"], 0],
      ["坤卦象传的首句是？", ["地势坤，君子以厚德载物", "天行健，君子以自强不息", "云雷，屯", "山下出泉，蒙"], 0],
      ["坎的卦辞以哪两个字开头？", ["习坎", "元亨", "小亨", "女壮"], 0],
      ["既济的卦序是？", ["63", "64", "1", "30"], 0],
      ["未济的上下卦是？", ["坎下离上", "离下坎上", "乾下坤上", "震下艮上"], 0],
      ["「履虎尾，不咥人」是哪一卦的卦辞？", ["履", "革", "坤", "姤"], 0],
      ["革卦通行本写到哪一日才孚？", ["己日", "甲日", "子日", "立春"], 0]
    ]
  },
  {
    id: 4,
    title: "深入",
    text: "把生克、干支和卦象放在一起。仍然只问能核对的事实，不问吉凶。",
    links: [
      ["五行解析", "../wuxing/"],
      ["天干地支", "../ganzhi/"],
      ["六十四卦", "../gua/"]
    ],
    questions: [
      ["我生者为相。夏天火旺，相的是？", ["土", "水", "金", "木"], 0],
      ["克我者为囚。秋天金旺，囚的是？", ["火", "水", "木", "土"], 0],
      ["地支三会木局是？", ["寅卯辰", "亥卯未", "申子辰", "巳酉丑"], 0],
      ["子卯相刑之外，辰的刑是？", ["自刑", "刑酉", "刑午", "刑寅"], 0],
      ["离卦的五行象是？", ["火", "水", "木", "金"], 0],
      ["坎卦的五行象是？", ["水", "火", "土", "木"], 0],
      ["互卦取哪些爻做下卦？", ["二三四爻", "初二三爻", "四五上爻", "三四五爻"], 0],
      ["乾宫五行，按京房八宫是？", ["金", "木", "水", "土"], 0],
      ["六十甲子里，甲和子的奇偶相同才能相配。乙配的第一支是？", ["丑", "子", "寅", "卯"], 0],
      ["未济是第几卦？", ["64", "63", "1", "2"], 0]
    ]
  }
];

(function () {
  var KEY = "yongshanwh-yili-progress";
  var box = document.getElementById("stages");
  if (!box) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var focusId = 1;
  var qIndex = 0;
  var picks = [];
  var flipped = false;
  var finished = false;

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || { passed: {}, wrong: [] }; }
    catch (e) { return { passed: {}, wrong: [] }; }
  }
  function save(data) { localStorage.setItem(KEY, JSON.stringify(data)); }
  function unlocked(data, id) {
    if (id === 1) return true;
    return (data.passed[id - 1] || 0) >= 0.8;
  }
  function stageById(id) {
    return QuizData.filter(function (item) { return item.id === id; })[0];
  }

  function resetRound() {
    qIndex = 0;
    picks = [];
    flipped = false;
    finished = false;
  }

  function render() {
    var data = load();
    var stage = stageById(focusId) || QuizData[0];
    var open = unlocked(data, stage.id);
    var litUntil = 0;
    QuizData.forEach(function (item, i) { if (unlocked(data, item.id)) litUntil = i; });
    var marks = ["", "壹", "贰", "叁", "肆"];
    var path = QuizData.map(function (item) {
      var best = data.passed[item.id];
      var cls = "path-node";
      if (!unlocked(data, item.id)) cls += " locked";
      else cls += " lit";
      if ((best || 0) >= 0.8) cls += " done";
      if (item.id === stage.id) cls += " current";
      return '<li class="path-item"><button type="button" class="' + cls + '" data-jump="' + item.id + '">' + marks[item.id] +
        "</button><small>" + item.title + (best ? " " + Math.round(best * 100) + "%" : "") + "</small></li>";
    }).join("");
    var fill = (litUntil / (QuizData.length - 1)) * 76;
    var card = open ? cardHtml(stage, data) : '<p class="locked-note">上一段对到八成，这一段才打开。</p>';
    var links = stage.links.map(function (item) {
      return '<a href="' + item[1] + '">' + item[0] + "</a>";
    }).join(" · ");
    var quote = "";
    if (stage.quote && window.ZHOUYI) {
      quote = '<details class="fold"><summary>经文</summary><p class="classic"><b>乾卦辞</b>' + ZHOUYI[0].guaci +
        '</p><p class="classic"><b>坤象传</b>' + ZHOUYI[1].xiang + "</p></details>";
    }
    box.innerHTML =
      '<ol class="learn-path"><span class="path-line"></span><span class="path-fill" style="width:' + fill + '%"></span>' + path + "</ol>" +
      quote + card +
      '<p class="stage-links">阅读：' + links + "</p>";

    var wrong = data.wrong.slice().reverse().slice(0, 30).map(function (item) {
      return "<li>" + item.stage + " · " + item.q + "。你选了「" + item.pick + "」，答案是「" + item.answer + "」。</li>";
    }).join("");
    document.getElementById("notebook").innerHTML = wrong || "<li>还没有错题。</li>";

    var face = box.querySelector(".qcard");
    if (face && flipped) {
      if (reduce) face.classList.add("flipped");
      else requestAnimationFrame(function () { face.classList.add("flipped"); });
    }
  }

  function cardHtml(stage) {
    if (finished) {
      var data = load();
      var best = data.passed[stage.id] || 0;
      var right = picks.filter(function (pick, i) { return pick === stage.questions[i][2]; }).length;
      return '<div class="qcard-result-wrap"><p class="qcard-result">' + right + " / " + stage.questions.length +
        "<small>" + (best >= 0.8 ? "这一段通过。" : "还不到八成，可以再来一次。") + "</small></p>" +
        '<div class="rel-actions" style="justify-content:center"><button type="button" class="btn" data-retry="1">再来一次</button></div></div>';
    }
    var q = stage.questions[qIndex];
    var options = q[1].map(function (text, k) {
      return '<button type="button" class="choice" data-pick="' + k + '">' + text + "</button>";
    }).join("");
    var answer = q[1][q[2]];
    var picked = picks[qIndex];
    var verdict = picked === q[2] ? "对" : "答案是" + answer;
    return '<div class="qcard"><div class="qcard-inner">' +
      '<div class="qcard-face qcard-front"><p class="qcard-kicker">' + stage.title + " · " + (qIndex + 1) + " / " + stage.questions.length +
      '</p><p class="qcard-q">' + q[0] + '</p><div class="qcard-opts">' + options + "</div></div>" +
      '<div class="qcard-face qcard-back"><p class="qcard-result">' + verdict +
      "<small>" + q[0] + "</small></p></div></div>" +
      '<div class="qcard-actions"><button type="button" class="btn" data-next="1">' +
      (qIndex + 1 >= stage.questions.length ? "看成绩" : "下一题") + "</button></div></div>";
  }

  function finish(stage) {
    var data = load();
    var right = 0;
    var fresh = [];
    stage.questions.forEach(function (q, i) {
      var index = typeof picks[i] === "number" ? picks[i] : -1;
      if (index === q[2]) right += 1;
      else fresh.push({ stage: stage.title, q: q[0], pick: index < 0 ? "未选" : q[1][index], answer: q[1][q[2]] });
    });
    var score = right / stage.questions.length;
    data.passed[stage.id] = Math.max(data.passed[stage.id] || 0, score);
    fresh.forEach(function (item) { data.wrong.push(item); });
    save(data);
    finished = true;
    flipped = false;
    render();
  }

  box.addEventListener("click", function (event) {
    var jump = event.target.closest("[data-jump]");
    if (jump) {
      focusId = +jump.getAttribute("data-jump");
      resetRound();
      render();
      return;
    }
    var retry = event.target.closest("[data-retry]");
    if (retry) {
      resetRound();
      render();
      return;
    }
    var next = event.target.closest("[data-next]");
    if (next) {
      var stage = stageById(focusId);
      if (qIndex + 1 >= stage.questions.length) finish(stage);
      else {
        qIndex += 1;
        flipped = false;
        render();
      }
      return;
    }
    var pick = event.target.closest("[data-pick]");
    if (!pick || flipped || finished) return;
    picks[qIndex] = +pick.getAttribute("data-pick");
    flipped = true;
    render();
  });

  document.getElementById("clear-progress").addEventListener("click", function () {
    localStorage.removeItem(KEY);
    focusId = 1;
    resetRound();
    render();
  });
  render();
})();
