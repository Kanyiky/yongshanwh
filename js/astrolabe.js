/* 首页星盘。后天八卦，正北在上，顺时针。文字用反向旋转保持直立。 */
(function () {
  var svg = document.getElementById("compass");
  if (!svg) return;

  var INK = "#463529";
  var MUTED = "#8F7B65";
  var LINE = "#D5C8B6";
  var BRONZE = "#A98B62";
  var SEAL = "#A64B36";
  var PAPER = "#F5F0E6";
  var WOOD = "#6E7356";
  var FIRE = "#A64B36";
  var EARTH = "#A98B62";
  var METAL = "#8A7568";
  var WATER = "#4E4338";

  /* 爻自下而上：1 阳，0 阴。 */
  var HOU = [
    { name: "坎", bits: [0, 1, 0], angle: 0 },
    { name: "艮", bits: [0, 0, 1], angle: 45 },
    { name: "震", bits: [1, 0, 0], angle: 90 },
    { name: "巽", bits: [0, 1, 1], angle: 135 },
    { name: "离", bits: [1, 0, 1], angle: 180 },
    { name: "坤", bits: [0, 0, 0], angle: 225 },
    { name: "兑", bits: [1, 1, 0], angle: 270 },
    { name: "乾", bits: [1, 1, 1], angle: 315 }
  ];
  var ZHI = "子丑寅卯辰巳午未申酉戌亥".split("");
  var GAN = "甲乙丙丁戊己庚辛壬癸".split("");
  /* 相生顺时针。木放在正东，其后每步 72°。 */
  var WX = [
    { name: "木", color: WOOD, angle: 90 },
    { name: "火", color: FIRE, angle: 162 },
    { name: "土", color: EARTH, angle: 234 },
    { name: "金", color: METAL, angle: 306 },
    { name: "水", color: WATER, angle: 18 }
  ];
  var TERMS = ["立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至", "小寒", "大寒"];
  var MAJOR = { "立春": 1, "春分": 1, "立夏": 1, "夏至": 1, "立秋": 1, "秋分": 1, "立冬": 1, "冬至": 1 };

  function yao(bits) {
    var gap = 8;
    var half = 13;
    var html = "";
    for (var i = 0; i < bits.length; i++) {
      var y = (1 - i) * gap;
      if (bits[i]) {
        html += '<line x1="' + (-half) + '" x2="' + half + '" y1="' + y + '" y2="' + y + '" stroke-width="2.2"/>';
      } else {
        html += '<line x1="' + (-half) + '" x2="-3.2" y1="' + y + '" y2="' + y + '" stroke-width="2.2"/>';
        html += '<line x1="3.2" x2="' + half + '" y1="' + y + '" y2="' + y + '" stroke-width="2.2"/>';
      }
    }
    return html;
  }

  function upright(angle, radius, inner, motion) {
    var cancel = motion === "cw" ? "spin-ccw" : motion === "ccw" ? "spin-cw" : "";
    return '<g transform="rotate(' + angle + ') translate(0 ' + (-radius) + ')">' +
      '<g class="' + cancel + '">' +
      '<g transform="rotate(' + (-angle) + ')">' + inner + "</g></g></g>";
  }

  function text(value, size, color, extra) {
    return '<text class="glyph" data-ch="' + value + '" font-size="' + size + '" fill="' + color + '"' + (extra || "") + ">" + value + "</text>";
  }

  function polar(angle, radius) {
    var rad = (angle - 90) * Math.PI / 180;
    return [+(radius * Math.cos(rad)).toFixed(2), +(radius * Math.sin(rad)).toFixed(2)];
  }

  var parts = [];
  parts.push(
    '<defs>' +
    '<radialGradient id="disk" cx="50%" cy="46%" r="62%">' +
    '<stop offset="0" stop-color="#FBF6EC"/>' +
    '<stop offset="0.72" stop-color="#F3EBDD"/>' +
    '<stop offset="1" stop-color="#E7DCCB"/>' +
    "</radialGradient>" +
    '<pattern id="paper" width="8" height="8" patternUnits="userSpaceOnUse">' +
    '<rect width="8" height="8" fill="none"/>' +
    '<path d="M0 8L8 0" stroke="' + INK + '" stroke-opacity="0.035" stroke-width="0.6"/>' +
    "</pattern>" +
    "</defs>"
  );
  parts.push('<circle r="492" fill="url(#disk)"/>');
  parts.push('<circle r="492" fill="url(#paper)"/>');
  parts.push('<circle r="492" fill="none" stroke="' + BRONZE + '" stroke-width="1.2"/>');
  parts.push('<circle r="478" fill="none" stroke="' + LINE + '" stroke-width="0.8"/>');

  /* 二十四节气：立春在东北 45°，每气 15°，顺时针。只标四立与二分二至。 */
  var termTicks = "";
  for (var t = 0; t < TERMS.length; t++) {
    var ang = 45 + t * 15;
    var major = MAJOR[TERMS[t]];
    termTicks += '<g transform="rotate(' + ang + ')" data-term="' + TERMS[t] + '" data-angle="' + ang + '">' +
      '<line y1="-468" y2="' + (major ? -452 : -460) + '" stroke="' + (major ? BRONZE : LINE) + '" stroke-width="' + (major ? 1.3 : 0.7) + '"/>' +
      "</g>";
    if (major) {
      termTicks += upright(ang, 452, text(TERMS[t], 16, MUTED, ' data-term-label="' + TERMS[t] + '"'), "");
    }
  }
  parts.push('<g id="ring-terms" data-layer="terms">' + termTicks + "</g>");

  /* 外层机械环：120 秒顺时针。刻度、节点、分段轨道一起转。 */
  var mech = "";
  for (var i = 0; i < 120; i++) {
    var long = i % 10 === 0;
    var mid = i % 5 === 0;
    mech += '<g transform="rotate(' + (i * 3) + ')"><line y1="-424" y2="' + (long ? -404 : mid ? -412 : -418) + '" stroke="' + (long ? INK : BRONZE) + '" stroke-width="' + (long ? 1.15 : 0.6) + '"/></g>';
  }
  for (var n = 0; n < 12; n++) {
    var p = polar(n * 30, 438);
    mech += '<circle class="' + (n % 3 === 0 ? "bronze" : "") + '" cx="' + p[0] + '" cy="' + p[1] + '" r="' + (n % 3 === 0 ? 4.2 : 2.4) + '" stroke="' + BRONZE + '" stroke-width="1"/>';
  }
  mech += '<circle r="456" fill="none" stroke="' + BRONZE + '" stroke-width="0.8" stroke-dasharray="18 10"/>';
  mech += '<circle r="392" fill="none" stroke="' + LINE + '" stroke-width="0.7" stroke-dasharray="4 8"/>';
  parts.push('<g id="ring-mech" class="spin-cw dur-120" data-layer="mech">' + mech + "</g>");

  /* 固定方位与度数，作为仪器的读数，不跟着转。 */
  var scale = "";
  for (var d = 0; d < 12; d++) {
    scale += upright(d * 30, 356, text(String(d * 30), 13, MUTED, ' data-deg="' + (d * 30) + '"'), "");
  }
  var dirs = [["北", 0], ["东", 90], ["南", 180], ["西", 270]];
  for (var di = 0; di < dirs.length; di++) {
    scale += upright(dirs[di][1], 332, text(dirs[di][0], 15, SEAL, ' data-dir="' + dirs[di][0] + '"'), "");
  }
  scale += '<circle r="372" fill="none" stroke="' + LINE + '" stroke-width="0.8"/>';
  parts.push('<g id="ring-scale" data-layer="scale">' + scale + "</g>");

  /* 五行：相生走五边形，相克走五角星。 */
  var wx = '<g id="ring-wuxing" data-layer="wuxing">';
  wx += '<circle r="292" fill="none" stroke="' + LINE + '" stroke-width="0.7"/>';
  function link(a, b, klass) {
    var pa = polar(WX[a].angle, 270);
    var pb = polar(WX[b].angle, 270);
    return '<line data-from="' + WX[a].name + '" data-to="' + WX[b].name + '" class="' + klass + '" x1="' + pa[0] + '" y1="' + pa[1] + '" x2="' + pb[0] + '" y2="' + pb[1] + '"/>';
  }
  for (var w = 0; w < 5; w++) wx += link(w, (w + 1) % 5, "sheng");
  for (var k = 0; k < 5; k++) wx += link(k, (k + 2) % 5, "ke");
  for (var e = 0; e < 5; e++) {
    var c = polar(WX[e].angle, 270);
    wx += '<circle class="paper" cx="' + c[0] + '" cy="' + c[1] + '" r="13" stroke="' + WX[e].color + '" stroke-width="1.4"/>';
    wx += upright(WX[e].angle, 270, text(WX[e].name, 18, WX[e].color, ' data-wx="' + WX[e].name + '"'), "");
  }
  wx += "</g>";
  parts.push(wx);

  /* 十天干：从正北起顺时针均分，独立于地支。 */
  var gan = '<circle r="228" fill="none" stroke="' + LINE + '" stroke-width="0.7"/>';
  for (var g = 0; g < GAN.length; g++) {
    gan += upright(g * 36, 228, text(GAN[g], 18, INK, ' data-gan="' + GAN[g] + '" data-index="' + g + '"'), "");
  }
  parts.push('<g id="ring-gan" data-layer="gan">' + gan + "</g>");

  /* 十二地支：子在正北，顺时针。整环 180 秒逆时针，字反向转保持直立。 */
  var zhi = "";
  for (var z = 0; z < ZHI.length; z++) {
    zhi += '<g transform="rotate(' + (z * 30) + ')"><line y1="-198" y2="-186" stroke="' + BRONZE + '" stroke-width="1"/></g>';
    zhi += upright(z * 30, 176, text(ZHI[z], 22, INK, ' data-zhi="' + ZHI[z] + '" data-index="' + z + '"'), "ccw");
  }
  zhi += '<circle r="198" fill="none" stroke="' + BRONZE + '" stroke-width="0.8"/>';
  /* 原罗盘只有一根指针，固定指东，地支环转到当前时辰底下。
     这里指针跟着地支环，并按同一公式 hour/2 格指向该时辰。 */
  zhi += '<g id="time-hand" data-layer="hand">' +
    '<line y1="-78" y2="-164" stroke="' + BRONZE + '" stroke-width="3" stroke-linecap="round"/>' +
    '<line y1="-78" y2="-160" stroke="' + INK + '" stroke-width="1" stroke-linecap="round"/>' +
    '<polygon class="seal" points="0,-176 -5.2,-160 5.2,-160"/>' +
    "</g>";
  parts.push('<g id="ring-zhi" class="spin-ccw dur-180" data-layer="zhi">' + zhi + "</g>");

  /* 八卦外围装饰环，240 秒顺时针。卦名本身不转。 */
  var deco = '<circle r="148" fill="none" stroke="' + BRONZE + '" stroke-width="0.7" stroke-dasharray="2 6"/>';
  for (var q = 0; q < 8; q++) {
    var node = polar(q * 45 + 22.5, 148);
    deco += '<rect x="' + (node[0] - 2.2) + '" y="' + (node[1] - 2.2) + '" width="4.4" height="4.4" fill="' + BRONZE + '" transform="rotate(' + (q * 45) + " " + node[0] + " " + node[1] + ')"/>';
  }
  parts.push('<g id="ring-gua-deco" class="spin-cw dur-240" data-layer="gua-deco">' + deco + "</g>");

  /* 后天八卦。爻在内，名在外。 */
  var gua = '<circle r="132" fill="none" stroke="' + LINE + '" stroke-width="0.8"/>';
  for (var b = 0; b < HOU.length; b++) {
    var item = HOU[b];
    gua += '<g data-gua="' + item.name + '" data-angle="' + item.angle + '" data-bits="' + item.bits.join("") + '" transform="rotate(' + item.angle + ') translate(0 -92)">' + yao(item.bits) + "</g>";
    gua += upright(item.angle, 112, text(item.name, 20, INK, ' data-gua-name="' + item.name + '"'), "");
  }
  parts.push('<g id="ring-gua" data-layer="gua">' + gua + "</g>");

  /* 中心太极，静止。深褐与暖白，不用纯黑白。 */
  parts.push(
    '<g id="ring-taiji" data-layer="taiji">' +
    '<circle r="64" fill="none" stroke="' + BRONZE + '" stroke-width="0.8"/>' +
    '<g stroke="' + BRONZE + '" stroke-width="0.7">' +
    '<line y1="-62" y2="-54"/><line y1="54" y2="62"/><line x1="-62" x2="-54"/><line x1="54" x2="62"/>' +
    "</g>" +
    '<circle class="paper" r="46" stroke="' + INK + '" stroke-width="1"/>' +
    '<path class="ink" d="M0-46A46 46 0 0 1 0 46A23 23 0 0 1 0 0A23 23 0 0 0 0-46Z"/>' +
    '<circle class="ink" cy="-23" r="5.6"/>' +
    '<circle class="paper" cy="23" r="5.6" stroke="' + INK + '" stroke-width="0.6"/>' +
    "</g>"
  );

  svg.setAttribute("viewBox", "-500 -500 1000 1000");
  svg.innerHTML = parts.join("");

  var hand = document.getElementById("time-hand");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function pointHand() {
    var now = new Date();
    var hour = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600 + now.getMilliseconds() / 3600000;
    var index = hour / 2;
    hand.setAttribute("transform", "rotate(" + (index * 30) + ")");
    hand.setAttribute("data-hour", hour.toFixed(4));
    hand.setAttribute("data-shichen", ZHI[Math.floor(index) % 12]);
  }
  pointHand();
  if (reduceMotion) setInterval(pointHand, 1000);
  else requestAnimationFrame(function frame() { pointHand(); requestAnimationFrame(frame); });
})();
