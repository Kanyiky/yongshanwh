// 五术典藏资源数据
const resources = [
  // ========== 山 ==========
  {
    id: 243,
    title: "气功丹道系统入门教程",
    desc: "梳理正统气功丹道的基础理论与入门实操方法，讲解过程循序渐进，避开晦涩难懂的内容，帮助爱好者安全、系统地了解相关传统养生文化知识。",
    category: "shan",
    categoryName: "山",
    link: "https://pan.quark.cn/s/3cfac2ce4bc2"
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
    id: 27,
    title: "绝版道教符咒手抄本图",
    desc: "该资源是一套系统整理民间散藏珍稀道教符咒手抄本的高清影印合集，总页数超260页，汇集了不同地区、不同道坛流派的绝版手绘符图与配套口诀记录。",
    category: "shan",
    categoryName: "山",
    link: "https://pan.quark.cn/s/bc22b2cbad72"
  },
  {
    id: 5,
    title: "道教洞真部神符(符箓)古籍",
    desc: "该资源是一套源自道教上清派核心传承的珍稀符箓类文献合集，完整收录《正统道藏》洞真部体系下的历代神符秘典。",
    category: "shan",
    categoryName: "山",
    link: "https://pan.quark.cn/s/061e4fec4cda"
  },

  // ========== 医 ==========
  {
    id: 245,
    title: "中医古法养颜术",
    desc: "这套教程以中医“形神同调、气血养肤”的核心思路为基础，讲解面部穴位按摩、传统草本护肤、体质内调等古法实操技法，从改善气血循环、调理内在体质入手，帮助改善面色暗沉、肌肤松弛等常见损美问题。",
    category: "yi",
    categoryName: "医",
    link: "https://pan.quark.cn/s/b322cb3e8de2"
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
    id: 34,
    title: "《古法明目功：入门六式+分步演练+手型呼吸》",
    desc: "基于中医经络理论，融合手型导引与腹式呼吸，专为缓解屏幕用眼疲劳设计。无需器械、无需场地，每日5–10分钟，零基础可跟练。",
    category: "yi",
    categoryName: "医",
    link: "https://pan.quark.cn/s/7b7cb071c308"
  },
  {
    id: 24,
    title: "《洞天奥旨》中医古籍全书",
    desc: "该资源是清代名医陈士铎所著的经典中医外科专著，又名《外科秘录》，全书共16卷，是清代中医外科领域公认的上乘之作。",
    category: "yi",
    categoryName: "医",
    link: "https://pan.quark.cn/s/7bd30107cac8"
  },
  {
    id: 21,
    title: "中国地道药材鉴别使用手册（上下册）",
    desc: "系统收录国内主流道地药材的完整鉴别与使用规范，是基层中医药从业者、中药材经营者、资深中医爱好者的经典实用参考资料。",
    category: "yi",
    categoryName: "医",
    link: "https://pan.quark.cn/s/da6d9e3eb4d5"
  },
  {
    id: 20,
    title: "神农本草经七十六药集释",
    desc: "聚焦《神农本草经》76味核心常用药的深度集释工具书，为中医临床从业者、中医药爱好者提供了精准的古本草文献参考资料。",
    category: "yi",
    categoryName: "医",
    link: "https://pan.quark.cn/s/ac4c6abc3c0a"
  },
  {
    id: 14,
    title: "最全高清人体穴位图及穴位图解大全",
    desc: "系统收录全身400余个正经穴位的中医可视化实用工具书，以国家标准经络穴位定位为核心，搭配高清实拍解剖示意图。",
    category: "yi",
    categoryName: "医",
    link: "https://pan.quark.cn/s/d784bafdbfd7"
  },

  // ========== 命 ==========
  {
    id: 28,
    title: "《命理基本知识》20章",
    desc: "专为零基础爱好者打造的体系化八字命理入门教程，全书共20个循序渐进的独立章节，从最基础的阴阳五行概念起步，逐层拆解传统子平八字的完整理论框架。",
    category: "ming",
    categoryName: "命",
    link: "https://pan.quark.cn/s/3f930ab77e7f"
  },
  {
    id: 36,
    title: "《七经图》",
    desc: "明代万历年间由徽州学者吴继仕编纂的儒家经典珍稀图解古籍，在宋代《六经图》基础上增补《仪礼图》而成，以548幅古版画插图系统可视化儒家七部核心经典。",
    category: "ming",
    categoryName: "命",
    link: "https://pan.quark.cn/s/e5b4e3b3d35e"
  },
  {
    id: 31,
    title: "《周易图解》古籍",
    desc: "以“以图释易”为核心的珍稀传统易学图谱类文献，通过近千幅严谨考据的古版画图谱，把《周易》晦涩抽象的象数义理转化为直观可视的视觉体系。",
    category: "ming",
    categoryName: "命",
    link: "https://pan.quark.cn/s/24272309f6e0"
  },
  {
    id: 17,
    title: "易经图文解析版系列 共7部",
    desc: "体系完整、全图文化的《易经》入门到精通全系列教程，从零基础入门到深度研易全覆盖，彻底打破传统《易经》晦涩难懂的阅读门槛。",
    category: "ming",
    categoryName: "命",
    link: "https://pan.quark.cn/s/0d724b32dc30"
  },

  // ========== 相 ==========
  {
    id: 32,
    title: "《麻衣相术》",
    desc: "中国相面术第一传世经典，民间流传最广、体系最完整的相术蓝本，后世几乎所有相书均以此为根基。全书完整覆盖面相五官、骨骼气色、神态声相、手足身形。",
    category: "xiang",
    categoryName: "相",
    link: "https://pan.quark.cn/s/9c2ad845186d"
  },
  {
    id: 35,
    title: "家居布局智慧：极简风水入门",
    desc: "完全摒弃传统风水复杂晦涩理论的轻量化居家空间优化资源，以“少即是多”的极简理念重构传统风水智慧，把古人“藏风聚气”的环境哲学转化为普通人零门槛就能落地的家居调整方案。",
    category: "xiang",
    categoryName: "相",
    link: "https://pan.quark.cn/s/ee39765fa8c6"
  },
  {
    id: 23,
    title: "古籍相面术《相法十六篇》全集",
    desc: "中国现存最早的系统面相学经典著作，传为汉代第一女相师许负所撰，由明代文学家黄省曾整理传世，完整保留了汉代古相法的极简古奥风貌。",
    category: "xiang",
    categoryName: "相",
    link: "https://pan.quark.cn/s/f6d1f87ce28c"
  },
  {
    id: 22,
    title: "《图解葬书》风水经典版",
    desc: "以晋代郭璞原著为核心、以清代《四库全书》文渊阁本为权威底本整理的可视化传统风水经典合集，完整收录7部古代阴宅风水核心文献。",
    category: "xiang",
    categoryName: "相",
    link: "https://pan.quark.cn/s/220769429f84"
  },
  {
    id: 10,
    title: "《风水术》·风水自助手册",
    desc: "全书完全摒弃传统风水复杂晦涩的理气理论，以“自查、调整、化解”为核心逻辑，不用罗盘、不用记复杂口诀，普通人照着图文步骤就能独立完成家居、办公空间的风水优化调整。",
    category: "xiang",
    categoryName: "相",
    link: "https://pan.quark.cn/s/1f24aab4bf1e"
  },
  {
    id: 225,
    title: "微表情读心术实用教程",
    desc: "从日常社交场景切入，拆解不同微表情、肢体动作背后对应的真实心理活动，配套大量生活化的案例演示，普通人也能快速掌握基础读心技巧。",
    category: "xiang",
    categoryName: "相",
    link: "https://pan.quark.cn/s/78281078c995"
  },

  // ========== 卜 ==========
  {
    id: 33,
    title: "《奇门遁甲秘笈大全》刘伯温·辑",
    desc: "中国古代奇门遁甲术数体系的集大成传世典籍，旧题汉・诸葛武侯撰，由明代开国元勋刘基辑订、校勘并增补，是民间与学界公认的奇门遁甲标杆性版本。",
    category: "bu",
    categoryName: "卜",
    link: "https://pan.quark.cn/s/4716ea4249e8"
  },
  {
    id: 37,
    title: "全套占星教学课程合集",
    desc: "系统化、阶梯式的数字命理线上教程，从最基础的1-9核心数字特质讲起，逐步过渡到完整出生图谱解读、人际关系匹配，再到高阶的个人年运周期分析。",
    category: "bu",
    categoryName: "卜",
    link: "https://pan.quark.cn/s/dd3d2d7c08e4"
  },
  {
    id: 30,
    title: "钦天监必学《古经天象考》古籍",
    desc: "清代著名学者雷学淇耗费十余年心血编撰的中国古代天文历法经典专著，全书共十二卷，是中国古代经学与天文学交叉研究的标杆性著作。",
    category: "bu",
    categoryName: "卜",
    link: "https://pan.quark.cn/s/9114c8285771"
  },
  {
    id: 29,
    title: "易学简单入门资料",
    desc: "专为零基础人群打造的轻量化易学入门学习合集，整合了韩元茗《易学基础入门》、张延生《易学入门》等权威经典的核心精华内容。",
    category: "bu",
    categoryName: "卜",
    link: "https://pan.quark.cn/s/f1e26b56c8b2"
  },
  {
    id: 25,
    title: "钦天监必学《天文图说》",
    desc: "南宋著名天文学家黄裳于1190年编撰，作为苏州宋代《天文图》碑的下半部分文字说明，是世界上现存最早、最精准的古代星图配套文字典籍。",
    category: "bu",
    categoryName: "卜",
    link: "https://pan.quark.cn/s/0ab1247aa705"
  },

  // ========== 奇异杂集 ==========
  {
    id: 236,
    title: "《各省地人的习性及经商气质》合集",
    desc: "梳理国内不同地域人群的性格特质、处事习惯与经商风格，内容结合大量真实案例，帮你快速掌握不同地域的社交、合作沟通技巧。",
    category: "qiyi",
    categoryName: "奇异杂集",
    link: "https://pan.quark.cn/s/0a3c2e7badbe"
  },
  {
    id: 231,
    title: "421页明星八卦汇总PDF合集",
    desc: "整理汇总全网流传度极高的421页明星八卦内容，覆盖娱乐圈多位艺人的相关过往信息，内容完整无删减。",
    category: "qiyi",
    categoryName: "奇异杂集",
    link: "https://pan.quark.cn/s/9f4d37eea480"
  },
  {
    id: 223,
    title: "天涯神贴高阶合集",
    desc: "精选当年天涯论坛里流传度极高、含金量拉满的高阶神贴内容，覆盖古籍手抄版、社会规律、个人成长等多个方向。",
    category: "qiyi",
    categoryName: "奇异杂集",
    link: "https://pan.quark.cn/s/d40146fe76cc"
  },
  {
    id: 222,
    title: "《谋略全书》：历代谋士智慧集大成",
    desc: "汇总从先秦到明清历代知名谋士的核心处世谋略、决策智慧与实战案例，把复杂的谋略逻辑转化成现代人能直接用到职场、社交、商业决策里的实用思路。",
    category: "qiyi",
    categoryName: "奇异杂集",
    link: "https://pan.quark.cn/s/370a3c77f9a0"
  },
  {
    id: 19,
    title: "最全鲁班书古籍汇总",
    desc: "系统整理52部历代《鲁班书》相关珍稀版本的大型民俗古籍数字合集，完整覆盖从明代《鲁班经》古本到民间手抄秘本的全版本脉络。",
    category: "qiyi",
    categoryName: "奇异杂集",
    link: "https://pan.quark.cn/s/99211c64057c"
  },
  {
    id: 18,
    title: "聊斋故事图文全集",
    desc: "完整收录《聊斋志异》经典篇目、搭配海量珍稀古版画的可视化古典文学合集，原汁原味还原蒲松龄笔下的狐鬼花妖世界。",
    category: "qiyi",
    categoryName: "奇异杂集",
    link: "https://pan.quark.cn/s/5122534f2cd2"
  },
  {
    id: 15,
    title: "90年代《民间秘术》600种",
    desc: "基于90年代经典民间文化辑录本整理的珍稀民俗资料合集，完整收录600种散落在市井乡间、濒临失传的传统民间技艺与生活智慧。",
    category: "qiyi",
    categoryName: "奇异杂集",
    link: "https://pan.quark.cn/s/2c5c268d0a5d"
  },
  {
    id: 12,
    title: "1200份实用合同word模板（各行各业）",
    desc: "覆盖全场景商业与日常需求的标准化合同文档合集，全部为可直接编辑的Word格式，覆盖99%常见行业的签约场景。",
    category: "qiyi",
    categoryName: "奇异杂集",
    link: "https://pan.quark.cn/s/6df62b621aed"
  },
  {
    id: 11,
    title: "《孙子兵法》：千年智慧，跨界指南！",
    desc: "一本超越军事的智慧奇书！《孙子兵法》不仅是兵家经典，更藏着人生与成功的密码。",
    category: "qiyi",
    categoryName: "奇异杂集",
    link: "https://pan.quark.cn/s/1265e485e12a"
  },
  {
    id: 9,
    title: "《民间生活奇招秘术》：90年代民间智慧宝典",
    desc: "完整收录近千条90年代民间流传实用生活技巧的怀旧类生活百科合集，原汁原味还原改革开放初期民间生活的实用生存智慧。",
    category: "qiyi",
    categoryName: "奇异杂集",
    link: "https://pan.quark.cn/s/5d71eb21b8f8"
  },
  {
    id: 6,
    title: "阳明心学：传习录 古籍电子版",
    desc: "以明嘉靖三十七年国家图书馆藏珍稀刻本为底本高清数字化的阳明心学核心文献合集，完整还原这部“中国人必读典籍”的原始古籍样貌。",
    category: "qiyi",
    categoryName: "奇异杂集",
    link: "https://pan.quark.cn/s/4f4f157845c9"
  },
  {
    id: 4,
    title: "古籍：推背图手抄本（电子版）",
    desc: "以历代传抄的《推背图》古手抄本为底本高清扫描制作，完整保留了这部千年预言奇书的原始图文样貌。",
    category: "qiyi",
    categoryName: "奇异杂集",
    link: "https://pan.quark.cn/s/61bad5bead73"
  },
  {
    id: 3,
    title: "绝版古籍书电子版合集（13类）",
    desc: "民间系统整理的珍稀绝版古籍数字化典藏合集，完整收录13大门类市面罕见的孤本、珍本、失传文献。",
    category: "qiyi",
    categoryName: "奇异杂集",
    link: "https://pan.quark.cn/s/ca619a9ec3ac"
  },
  {
    id: 2,
    title: "各门各派武林秘籍大全（共309套）",
    desc: "系统收录中华传统武术各流派核心典籍的数字化典藏合集，完整覆盖拳法、器械、内功、轻功等全门类传统武学的心法口诀、招式图谱与练功秘要。",
    category: "qiyi",
    categoryName: "奇异杂集",
    link: "https://pan.quark.cn/s/793c5358aec7"
  },
  {
    id: 1,
    title: "各地方志（全国古今共4000+册）",
    desc: "覆盖全国各行政区域的珍稀地方文献合集，上起唐代图经古本，下迄当代新编省市县三级志书，完整收录4000余册不同历史时期的地方志文献。",
    category: "qiyi",
    categoryName: "奇异杂集",
    link: "https://pan.quark.cn/s/f4b7cef1a222"
  },

  // ========== 创业副业 ==========
  {
    id: 234,
    title: "玉米皮手编冷门生意教程",
    desc: "讲解用常见玉米皮编织各类实用家居、装饰物件的完整技法，配套销路运营方法，单人居家就能操作，属于竞争极小的冷门轻创业项目。",
    category: "chuangye",
    categoryName: "创业副业",
    link: "https://pan.quark.cn/s/b210eb9d4b05"
  },
  {
    id: 233,
    title: "干草艺术手作手艺教程",
    desc: "教你把田埂边常见的野草干草加工成创意艺术摆件，从材料处理、造型设计到成品定价、售卖渠道全流程覆盖。",
    category: "chuangye",
    categoryName: "创业副业",
    link: "https://pan.quark.cn/s/71e23ba22067"
  },
  {
    id: 232,
    title: "蚯蚓养殖全流程详细教程",
    desc: "主打零成本利用身边常见原料养殖蚯蚓，从场地搭建、饲料配比、日常养护到销路拓展逐一讲解，单人即可操作。",
    category: "chuangye",
    categoryName: "创业副业",
    link: "https://pan.quark.cn/s/6125da7277b1"
  },
  {
    id: 230,
    title: "普通人AI音乐副业入门全流程",
    desc: "完全跳过乐理基础门槛，讲解用AI工具生成音乐、剪辑优化、接单变现的完整路径，配套不同平台的接单渠道指南。",
    category: "chuangye",
    categoryName: "创业副业",
    link: "https://pan.quark.cn/s/943045b2c7c5"
  },
  {
    id: 229,
    title: "公众号贴图副业全流程教程",
    desc: "从公众号注册、贴图素材制作、流量主开通规则到变现结算全流程拆解，配套新手友好的实操步骤。",
    category: "chuangye",
    categoryName: "创业副业",
    link: "https://pan.quark.cn/s/371319427660"
  },

  // ========== 技能教程 ==========
  {
    id: 241,
    title: "云南罐罐米线正宗配方教学",
    desc: "拆解云南正宗罐罐米线的汤底熬制、秘制酱料调配、配菜处理全流程，步骤清晰可落地，新手也能做出地道风味。",
    category: "jiaocheng",
    categoryName: "技能教程",
    link: "https://pan.quark.cn/s/1244327e27a9"
  },
  {
    id: 240,
    title: "108套攻心催眠话术合集",
    desc: "汇总不同社交、销售场景下的实用攻心话术，拆解对方心理逻辑，帮你快速掌握沟通主动权。",
    category: "jiaocheng",
    categoryName: "技能教程",
    link: "https://pan.quark.cn/s/c1b7a9dd3837"
  },
  {
    id: 238,
    title: "卤水配方及全品类卤制工艺教程",
    desc: "公开多款经典商用卤水的核心配方，从香料配比、卤水熬制、不同食材卤制时间把控到卤水日常养护全流程讲解。",
    category: "jiaocheng",
    categoryName: "技能教程",
    link: "https://pan.quark.cn/s/b9eecb5817d9"
  },
  {
    id: 228,
    title: "特色凉菜之柠檬鸡爪制作教程",
    desc: "把网红爆款柠檬鸡爪的全套制作步骤拆解到极致，从鸡爪预处理、去腥技巧、核心调味配比到冷藏入味的时间把控全部讲透。",
    category: "jiaocheng",
    categoryName: "技能教程",
    link: "https://pan.quark.cn/s/ab2bfa320946"
  },
  {
    id: 227,
    title: "730份折纸教程打包合集",
    desc: "汇总730份不同难度的折纸教程，从入门级的小动物、千纸鹤，到进阶的复杂立体造型、实用折纸物件全覆盖。",
    category: "jiaocheng",
    categoryName: "技能教程",
    link: "https://pan.quark.cn/s/0c6c709bcb83"
  },
  {
    id: 226,
    title: "古风手工饰品制作教程",
    desc: "从基础的发簪、步摇材料认识，到缠花、绒花、串珠等各类古风首饰的制作技法分步讲解，配套高清实操演示。",
    category: "jiaocheng",
    categoryName: "技能教程",
    link: "https://pan.quark.cn/s/cd74f92fa1dc"
  },
  {
    id: 219,
    title: "外贸出口退税实操课程",
    desc: "针对外贸企业的退税全流程打造，从退税政策解读、单证整理、申报系统操作到常见退税风险规避逐一拆解。",
    category: "jiaocheng",
    categoryName: "技能教程",
    link: "https://pan.quark.cn/s/c0b172746ef5"
  },
  {
    id: 218,
    title: "零基础系统学习网络安全教程",
    desc: "从计算机基础、网络原理入门讲起，逐步延伸到渗透测试、漏洞防护、数据安全运维等核心技能，配套大量实操演示案例。",
    category: "jiaocheng",
    categoryName: "技能教程",
    link: "https://pan.quark.cn/s/b0a9ec9ef169"
  },
  {
    id: 208,
    title: "营养师全套系统教程",
    desc: "从基础营养学理论、各类人群膳食搭配、常见慢病营养调理，到食品卫生管理、配餐实操技能全阶段讲解。",
    category: "jiaocheng",
    categoryName: "技能教程",
    link: "https://pan.quark.cn/s/4fafd37a0c31"
  },
  {
    id: 206,
    title: "台式机笔记本电脑维修教程合集",
    desc: "从硬件基础识别、系统安装调试，到主板故障检测、显卡维修、笔记本清灰换硅脂、常见软硬件问题排查全流程讲解。",
    category: "jiaocheng",
    categoryName: "技能教程",
    link: "https://pan.quark.cn/s/a40b5f5edc85"
  },
  {
    id: 16,
    title: "超级自卫术+单招制敌完整高清版：零基础防",
    desc: "面向完全无武术基础普通人的轻量化实战防卫教程，不用长年累月练套路，普通人短时间就能掌握实用单招制敌技巧。",
    category: "jiaocheng",
    categoryName: "技能教程",
    link: "https://pan.quark.cn/s/92879db85264"
  },
  {
    id: 8,
    title: "禽畜养殖技术资料",
    desc: "覆盖20个主流养殖品类的全场景落地式技术合集，涵盖常规畜禽、特色水产、特种经济动物、昆虫养殖四大类。",
    category: "jiaocheng",
    categoryName: "技能教程",
    link: "https://pan.quark.cn/s/bfe10c8146f2"
  },
  {
    id: 7,
    title: "果树种植技术资料",
    desc: "覆盖草莓、葡萄、砂糖桔、桃、西瓜、樱桃六大主流经济果树的全流程落地式栽培技术合集。",
    category: "jiaocheng",
    categoryName: "技能教程",
    link: "https://pan.quark.cn/s/5290d320c098"
  },

  // ========== 学习资料 ==========
  {
    id: 244,
    title: "口腔医学全套专业教材",
    desc: "汇总口腔医学全学科的官方专业教材，覆盖口腔基础医学、临床诊疗技术等核心内容。",
    category: "xuexi",
    categoryName: "学习资料",
    link: "https://pan.quark.cn/s/6e2c61987f92"
  },
  {
    id: 237,
    title: "教师资格证笔试全套资料",
    desc: "汇总教资笔试全科目核心考点讲义、历年真题、高频易错题库与答题技巧，适配不同学段的备考需求。",
    category: "xuexi",
    categoryName: "学习资料",
    link: "https://pan.quark.cn/s/81a5301cee2f"
  },
  {
    id: 235,
    title: "高中全科人教版教师教学用书",
    desc: "覆盖高中全学段全学科的人教版官方教师用书，包含教材知识点深层解读、课堂教学设计、习题拓展讲解等内容。",
    category: "xuexi",
    categoryName: "学习资料",
    link: "https://pan.quark.cn/s/e08a0a1b4da0"
  },
  {
    id: 220,
    title: "高中教辅汇总全系列资料",
    desc: "覆盖高中全学段全学科的核心教辅内容，汇总同步知识点讲义、高频考点汇总、历年真题解析、专项刷题题库等多类素材。",
    category: "xuexi",
    categoryName: "学习资料",
    link: "https://pan.quark.cn/s/0591ec53c348"
  },
  {
    id: 216,
    title: "执业药师考试核心备考资料包",
    desc: "覆盖2026年最新考纲要求的全部核心考点，汇总药事管理与法规、四大核心药学科目的高频考点笔记、历年真题解析、考前押题密卷。",
    category: "xuexi",
    categoryName: "学习资料",
    link: "https://pan.quark.cn/s/803cc4fd68d6"
  },
  {
    id: 215,
    title: "主管护师考试系统学习资料",
    desc: "依托人卫版官方教材核心框架，梳理内科、外科、妇产科等9大护理专业模块的必背考点，配套章节同步练习题、历年真题精讲。",
    category: "xuexi",
    categoryName: "学习资料",
    link: "https://pan.quark.cn/s/46de8dd24fa7"
  },
  {
    id: 214,
    title: "护士资格考试全套备考资料",
    desc: "针对护考的两大考试科目量身打造，汇总历年高频考点速记手册、易错考点梳理、近5年真题带练、考前金题卷。",
    category: "xuexi",
    categoryName: "学习资料",
    link: "https://pan.quark.cn/s/f797cb743276"
  },
  {
    id: 213,
    title: "妇产科主治医师考试学习资料",
    desc: "贴合妇产科主治考试4个科目的考纲要求，整理基础知识、相关专业知识等模块的核心考点笔记，配套历年真题解析、案例分析专项训练。",
    category: "xuexi",
    categoryName: "学习资料",
    link: "https://pan.quark.cn/s/da2ff4f9107a"
  },
  {
    id: 212,
    title: "药学职称考试全层级备考资料",
    desc: "覆盖药士、药师、主管药师全层级考试内容，按考试科目分类整理核心考点总结、章节习题集、历年真题详解。",
    category: "xuexi",
    categoryName: "学习资料",
    link: "https://pan.quark.cn/s/937bda41dba1"
  },
  {
    id: 211,
    title: "全科主治医师考试核心资料包",
    desc: "围绕全科医学考纲梳理全部必背知识点，汇总常见病症诊疗、公共卫生服务、医学人文等模块的考点笔记。",
    category: "xuexi",
    categoryName: "学习资料",
    link: "https://pan.quark.cn/s/12b792ac4779"
  },
  {
    id: 210,
    title: "内科主治医师考试系统学习资料",
    desc: "贴合内科主治考试的官方大纲，梳理30+常见内科疾病的核心考点、诊疗要点、高频考题，配套思维导图、历年真题带练。",
    category: "xuexi",
    categoryName: "学习资料",
    link: "https://pan.quark.cn/s/274c692adcff"
  },
  {
    id: 209,
    title: "银行招聘考试全套备考资料",
    desc: "覆盖EPI、综合知识、英语、性格测试四大考试模块，汇总各大银行历年真题、高频考点速记、专项刷题集、面试真题解析。",
    category: "xuexi",
    categoryName: "学习资料",
    link: "https://pan.quark.cn/s/3a8d8c3e9bef"
  },
  {
    id: 207,
    title: "十年中考真题全科分类汇编",
    desc: "汇总近10年全国各省市中考全科真题，按学科知识点分类整理成word+pdf双格式，每道题配套详细答案解析和考点标注。",
    category: "xuexi",
    categoryName: "学习资料",
    link: "https://pan.quark.cn/s/4ca889fc534e"
  }
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
