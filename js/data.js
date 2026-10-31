// 五术典藏资源数据
const resources = [
  {
    id: 245,
    title: "中医古法养颜术",
    desc: "这套教程以中医“形神同调、气血养肤”的核心思路为基础，讲解面部穴位按摩、传统草本护肤、体质内调等古法实操技法，从改善气血循环、调理内在体质入手，帮助改善面色暗沉、肌肤松弛等常见损美问题，全程避开刺激性化学手段，零基础也能跟着分步操作，是中医美容爱好者的实用参考素材。",
    category: "yi",
    categoryName: "医",
    link: "https://pan.quark.cn/s/b322cb3e8de2"
  },
  {
    id: 243,
    title: "气功丹道系统入门教程",
    desc: "梳理正统气功丹道的基础理论与入门实操方法，讲解过程循序渐进，避开晦涩难懂的内容，帮助爱好者安全、系统地了解相关传统养生文化知识。",
    category: "shan",
    categoryName: "山",
    link: "https://pan.quark.cn/s/3cfac2ce4bc2"
  },
  {
    id: 242,
    title: "《80年代中医自学老医书》17册",
    desc: "全套17册80年代出版的经典中医入门老医书，内容通俗易懂，从基础中医理论到实用实操技法逐步讲解，是中医爱好者自学入门的优质稀缺素材。",
    category: "yi",
    categoryName: "医",
    link: "https://pan.quark.cn/s/653254eb57a1"
  },
  {
    id: 239,
    title: "太极拳学习系列",
    desc: "从基础桩功、步法到整套拳路动作分步演示，配套动作要领讲解，零基础也能跟着慢慢练习，起到强身健体、修身养性的效果，适配全年龄段的健身需求。",
    category: "shan",
    categoryName: "山",
    link: "https://pan.quark.cn/s/2ce4fbad86f2"
  },
  {
    id: 32,
    title: "《麻衣相术》",
    desc: "中国相面术第一传世经典，民间流传最广、体系最完整的相术蓝本，后世几乎所有相书均以此为根基。全书完整覆盖面相五官、骨骼气色、神态声相、手足身形，以及流年运势的对应法则，是相面术入门与深耕的必读核心。",
    category: "xiang",
    categoryName: "相",
    link: "https://pan.quark.cn/s/9c2ad845186d"
  },
  {
    id: 33,
    title: "《奇门遁甲秘笈大全》刘伯温·辑",
    desc: "《奇门遁甲秘笈大全》又名《金函奇门遁甲秘笈全书》《奇门大全》，是中国古代奇门遁甲术数体系的集大成传世典籍，是民间与学界公认的奇门遁甲标杆性版本。",
    category: "bu",
    categoryName: "卜",
    link: "https://pan.quark.cn/s/4716ea4249e8"
  },
  {
    id: 28,
    title: "《命理基本知识》20章",
    desc: "该资源是一套专为零基础爱好者打造的体系化八字命理入门教程，全书共20个循序渐进的独立章节，从最基础的阴阳五行概念起步，逐层拆解传统子平八字的完整理论框架。",
    category: "ming",
    categoryName: "命",
    link: "https://pan.quark.cn/s/3f930ab77e7f"
  },
  {
    id: 234,
    title: "玉米皮手编冷门生意教程",
    desc: "讲解用常见玉米皮编织各类实用家居、装饰物件的完整技法，配套销路运营方法，单人居家就能操作，属于竞争极小的冷门轻创业项目。",
    category: "chuangye",
    categoryName: "创业副业",
    link: "https://pan.quark.cn/s/b210eb9d4b05"
  },
  {
    id: 241,
    title: "云南罐罐米线正宗配方教学",
    desc: "拆解云南正宗罐罐米线的汤底熬制、秘制酱料调配、配菜处理全流程，步骤清晰可落地，新手也能做出地道风味。",
    category: "jiaocheng",
    categoryName: "技能教程",
    link: "https://pan.quark.cn/s/1244327e27a9"
  },
  {
    id: 244,
    title: "口腔医学全套专业教材",
    desc: "汇总口腔医学全学科的官方专业教材，覆盖口腔基础医学、临床诊疗技术等核心内容，不管是相关专业学生备考，还是口腔从业者进阶学习都能直接取用。",
    category: "xuexi",
    categoryName: "学习资料",
    link: "https://pan.quark.cn/s/6e2c61987f92"
  }
  // 后续我会把你提供的全部资源补充进来
];

// 九大分类定义
const categories = [
  { key: "shan", name: "山", desc: "收录气功、丹道、武术、符咒等山家相关传统典籍与教程。" },
  { key: "yi", name: "医", desc: "收录中医古籍、养生、针灸、本草、古法养颜等医学相关资源。" },
  { key: "ming", name: "命", desc: "收录八字命理、紫微斗数、易学命理等命学典籍与入门教程。" },
  { key: "xiang", name: "相", desc: "收录相面、风水、相术经典及家居布局相关资料。" },
  { key: "bu", name: "卜", desc: "收录奇门遁甲、六爻、占星、天文历法等卜筮相关典籍。" },
  { key: "qiyi", name: "奇异杂集", desc: "收录民间秘术、古籍杂集、地方志、谋略等综合传统文化资源。" },
  { key: "chuangye", name: "创业副业", desc: "收录适合个人操作的传统技艺、手工、养殖等轻创业项目教程。" },
  { key: "jiaocheng", name: "技能教程", desc: "收录各类实用技能、手艺、配方、维修等实操教程。" },
  { key: "xuexi", name: "学习资料", desc: "收录考试资料、专业教材、教辅等系统性学习资源。" }
];
