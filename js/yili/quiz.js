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

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || { passed: {}, wrong: [] }; }
    catch (e) { return { passed: {}, wrong: [] }; }
  }
  function save(data) { localStorage.setItem(KEY, JSON.stringify(data)); }

  function unlocked(data, id) {
    if (id === 1) return true;
    return (data.passed[id - 1] || 0) >= 0.8;
  }

  function render() {
    var data = load();
    box.innerHTML = QuizData.map(function (stage) {
      var open = unlocked(data, stage.id);
      var best = data.passed[stage.id];
      var links = stage.links.map(function (item) {
        return '<a href="' + item[1] + '">' + item[0] + "</a>";
      }).join(" · ");
      var quote = "";
      if (stage.quote) {
        quote = "<p class=\"classic\"><b>乾卦辞</b>" + ZHOUYI[0].guaci + "</p><p class=\"classic\"><b>坤象传</b>" + ZHOUYI[1].xiang + "</p>";
      }
      var body = "<p>" + stage.text + "</p><p class=\"note\">阅读：" + links + "</p>" + quote;
      if (!open) {
        body += "<p>上一段达到 80% 之后，这一段才打开。</p>";
      } else {
        body += stage.questions.map(function (q, i) {
          var options = q[1].map(function (text, k) {
            return '<label><input type="radio" name="s' + stage.id + "q" + i + '" value="' + k + '"> ' + text + "</label>";
          }).join("");
          return '<div class="quiz-q"><p>' + (i + 1) + ". " + q[0] + "</p>" + options + "</div>";
        }).join("") + '<button type="button" class="btn" data-stage="' + stage.id + '">交卷</button>';
      }
      return '<section class="panel" id="stage-' + stage.id + '"><h2>' + stage.title + "</h2>" +
        "<p class=\"note\">最好成绩：" + (best ? Math.round(best * 100) + "%" : "还没有") + "</p>" + body +
        '<div id="result-' + stage.id + '"></div></section>';
    }).join("");

    var wrong = data.wrong.slice().reverse().slice(0, 30).map(function (item) {
      return "<li>" + item.stage + " · " + item.q + "。你选了「" + item.pick + "」，答案是「" + item.answer + "」。</li>";
    }).join("");
    document.getElementById("notebook").innerHTML = wrong || "<li>还没有错题。</li>";
  }

  box.addEventListener("click", function (event) {
    var btn = event.target.closest("button");
    if (!btn) return;
    var id = +btn.getAttribute("data-stage");
    var stage = QuizData.filter(function (item) { return item.id === id; })[0];
    var data = load();
    var right = 0;
    var fresh = [];
    stage.questions.forEach(function (q, i) {
      var picked = box.querySelector('input[name="s' + id + "q" + i + '"]:checked');
      var index = picked ? +picked.value : -1;
      if (index === q[2]) right += 1;
      else fresh.push({ stage: stage.title, q: q[0], pick: index < 0 ? "未选" : q[1][index], answer: q[1][q[2]] });
    });
    var score = right / stage.questions.length;
    data.passed[id] = Math.max(data.passed[id] || 0, score);
    fresh.forEach(function (item) { data.wrong.push(item); });
    save(data);
    var message = '<p class="score">' + right + " / " + stage.questions.length +
      (score >= 0.8 ? "，这一段通过。" : "，还不到 80%。可以再看一遍上面的页面。") + "</p>";
    render();
    var slot = document.getElementById("result-" + id);
    if (slot) slot.innerHTML = message;
  });

  document.getElementById("clear-progress").addEventListener("click", function () {
    localStorage.removeItem(KEY);
    render();
  });
  render();
})();
