/* ============================================================
   ViberSpace 网站内容
   所有内容都在这个文件里，直接改文字即可，不用碰其它代码。
   来源：Craft「USYD Vibe Coding Club - ViberSpace」（2026-11 同步）
   标了【示例】的是还没有真实资料的占位内容。
   ============================================================ */

const CONFIG = {
  clubName: 'ViberSpace',
  slogan: 'USYD Vibe Coding Club · 让有想法的人，把想法做出来',
  email: '',        // 社团公开邮箱，填了会显示在「加入我们」页
  wechat: '',       // 公众号 / 小红书账号，填了会显示在「AI 早报」页
  // 接入表单服务（如 Formspree / Google Form 后端）后填这里，表单会 POST JSON 过去；留空则只存在浏览器本地
  joinFormEndpoint: '',
};

/* ---------- 1. AI 早报 ----------
   最新一期放最前面。写法：
   - sections 按分类分组；kind 决定标签颜色：vibe / models / security / products / industry / people
   - 正文里用 **这样** 包起来的文字会显示成黄色高亮；用 `这样` 包起来的是代码 */
const NEWS = [
  {
    date: '2026-11-06', weekday: '周五',
    headline: 'Meta 收购多 agent 编程工具 Conductor，云服务 11 月 20 日关闭；OpenAI 收购 Pierre Computer 增强 Codex；Kimi K3.1 Pro、混元 Hy4、文心 5.5 Flash 同日发布。',
    sections: [
      { tag: 'VIBE CODING', name: 'AI 编程', kind: 'vibe', items: [
        { title: 'Meta 收购 Conductor，云服务 11 月 20 日关闭',
          body: 'Conductor 是一款能同时跑多个编程 agent 的 Mac 应用，每个 agent 在独立的代码副本里工作。团队将加入 Meta 超级智能实验室，收购价格未披露。已停止新用户注册；Conductor Cloud 11 月 13 日变为只读，**11 月 20 日关闭并开始删除云端数据**。Mac 应用 2027 年初停止更新。' },
        { title: 'OpenAI 收购 Pierre Computer，增强 Codex',
          body: 'Pierre Computer 做的是代码分析和代码审查工具，会被整合进 Codex，交易金额未披露。Axios 认为这是 OpenAI **在向 GitHub 的地盘进攻**，而 GitHub 的母公司微软正是 OpenAI 最大的投资方。' },
        { title: '被裁工程师用 AI 重写 Auth0 和 Salesforce',
          body: '一个自称由被裁工程师组成的项目 OccupySaaS，借助 AI 照着公开文档，从零写出了 Auth0 的替代品 ZeroAuthy 和 Salesforce 的替代品 SalesCompel，均采用 Apache-2.0 开源协议。他们不满的是按席位收费和厂商锁定。项目能否真正替代原产品，**目前还没有独立验证**。' },
      ]},
      { tag: 'OPEN MODELS', name: '国产大模型', kind: 'models', items: [
        { title: '月之暗面开源 Kimi K3.1 Pro 权重',
          body: '2.8 万亿参数的混合专家模型，每次推理激活约 1040 亿参数，支持 **100 万 token 上下文**和图片输入，权重已在 Hugging Face 上发布。月之暗面公布的编程测试中，它领先其他开源模型，Terminal-Bench 4.0 成绩超过 GPT-6 Astra。' },
        { title: '腾讯发布混元 Hy4，新增视觉和电脑操作能力',
          body: '这是混元系列第一次支持图像理解和电脑操作，命令行和图形界面都能操作，还针对 Blender 和 CAD 做了专门训练。已在元宝、WorkBuddy、CodeBuddy 和 OpenRouter 等平台上线，**WorkBuddy 和 CodeBuddy 11 月 15 日前免费**，腾讯云 TokenHub 年底前五折。模型权重将在近日开源。' },
        { title: '百度开源文心 ERNIE 5.5 Flash Base',
          body: '2800 亿参数的混合专家基座模型，每次只激活 140 亿参数，用 33.5 万亿 token 预训练。这是一个**没有经过后训练的基座模型**，方便开发者按自己的需求微调，后训练版本之后推出。权重已在 Hugging Face 上提供 FP8 和 BF16 两个版本。' },
      ]},
      { tag: 'SECURITY', name: '安全', kind: 'security', items: [
        { title: 'OpenAI 的 agent 挖出 948 个 Linux 内核提权漏洞',
          body: 'OpenAI 用一个即将推出的网络安全模型，审计了约 7% 的 Linux 内核代码：12 小时内找到 2308 个疑似问题，复现了 1724 个，最终确认 **948 个不同的提权漏洞**。总花费约 121 万美元的 API 额度，平均每个漏洞约 1280 美元。补丁已提交给内核维护者，其中约 61 个已处理。' },
      ]},
      { tag: 'PRODUCTS', name: '产品', kind: 'products', items: [
        { title: 'Claude 推出个人理财功能测试版',
          body: '部分美国 Pro、Max 和 Ultra 用户可以通过 Plaid 连接银行和信用卡账户，让 Claude 分析消费、找出重复扣费，还能生成图表。权限是**只读的，不能转账或投资**，Claude 也看不到你的银行密码。Anthropic 称相关对话不会用于训练模型。' },
      ]},
      { tag: 'INDUSTRY', name: '产业动态', kind: 'industry', items: [
        { title: '苹果收紧员工 AI 预算',
          body: '据彭博社报道，苹果工程师每天的 AI 用量预算从 300 美元降到 200 美元，部分人可能再降到 100 美元，一些团队甚至只有每天 25 美元。员工被鼓励改用更便宜的模型或设备端 AI，确实需要更多额度的可以申请。也有员工说，其实很少有人用满 300 美元。' },
      ]},
    ],
    tip: '用 Conductor 云端工作区的同学，请在 11 月 20 日前导出数据：右键工作区选择 Transfer to local，或者进入 Settings → Account → Export data 导出全部数据。',
    sources: 'Axios · CellCog · TechBuzz · RuntimeWire · Hardware Busters · The Next Web · MacRumors · 腾讯 · The Decoder · Latent Space 等',
  },
  {
    date: '2026-11-05', weekday: '周四',
    headline: 'Claude Code 后台子 agent 更省额度；OpenAI 用 Codex 10 周写出新的 Git 后端；Siri AI 向所有开发者开放；Claude Code 产品负责人 Cat Wu 加入 OpenAI。',
    sections: [
      { tag: 'VIBE CODING', name: 'AI 编程', kind: 'vibe', items: [
        { title: 'Claude Code 后台子 agent 更省额度了',
          body: '后台子 agent 每 30 秒一次的状态更新，改由 Haiku 5.5 根据简要笔记来写，不再重读整段对话。Anthropic 称**每次更新成本降低约 99%**，用到后台子 agent 的会话能少消耗约 5% 的额度。子 agent 本身用的模型不变。需要升级到 v2.1.316 或更高版本，无需额外设置。' },
        { title: 'OpenAI 用 Codex 10 周写出新 Git 后端 Pando',
          body: 'OpenAI 主代码仓库的 Git 服务可靠性一度跌到 90% 以下。他们用 Rust 重写了后端，由一名工程师设计核心，**“成队的 Codex agent”负责实现**，10 周完成。上线后推送延迟降低近 5 倍，每天处理近 1 PB 的 Git 数据。Pando 暂不开源。' },
        { title: 'Cognition 发布编程模型 SWE-2 Flash',
          body: 'Devin 背后的公司 Cognition 推出 SWE-2 的轻量版，速度约为原版的 3 倍，**价格只有五分之一**，多项编程测试成绩略低于 SWE-2。已在 Devin 桌面版和 CLI 中上线，11 月 30 日前免费。考虑到网络安全风险，模型权重暂不公开。' },
        { title: 'Revolut：自部署开源模型，AI 编程成本降 90%',
          body: '据 Revolut 的 AI 运营负责人介绍，公司约 2000 名工程师的日常编程已默认改用自己部署的 GLM 开源模型，运行在 56 块 B200 GPU 上，**综合成本降到原来的约十分之一**。Claude Code 和 Codex 等前沿工具仍保留给特定场景使用。这些都是公司自己报告的数字，没有计入云服务和人力成本。' },
      ]},
      { tag: 'PRODUCTS', name: '模型与产品', kind: 'products', items: [
        { title: 'Siri AI 向所有开发者开放',
          body: '在 iOS 27.3 测试版中，开发者可以通过 App Intents 把自己 App 的内容和操作接入 Siri AI。用户直接用自然语言就能查快递、订位或下单，不用打开 App，Siri 还能把多个操作串起来完成。iOS 27.3 正式版 12 月推出，接入 Siri AI 的 App 预计 2027 年才会陆续面向用户上线。' },
        { title: '更多 Claude 模型的输出加上隐形水印',
          body: '从 11 月 3 日起，Mythos 5、Opus 4.7、Opus 4.6 和 Sonnet 4.6 生成的文字会带上看不见的水印（Opus 5.5 已有）。水印只体现在用词选择上，不加字符，也不影响质量。只有 Anthropic 授权的监管机构、媒体和研究者才能检测；文本经过大幅改写后水印就会消失。这一做法是为了满足欧盟《人工智能法》的要求。' },
      ]},
      { tag: 'PEOPLE', name: '人事动态', kind: 'people', items: [
        { title: 'Claude Code 产品负责人 Cat Wu 加入 OpenAI',
          body: 'Cat Wu 此前负责 Claude Code 和 Cowork 的产品，10 月底离开 Anthropic。她将在 OpenAI 负责 Core Products 的产品管理，这个部门覆盖 ChatGPT、Codex 和 API。' },
      ]},
    ],
    tip: '经常开后台子 agent 的同学，记得把 Claude Code 升级到 v2.1.316 以上，额度能多撑一点。用 `claude --version` 就能查看当前版本。',
    sources: 'AlphaSignal · The New Stack · Cognition · AI Chat Daily · Cult of Mac · Techweez · RuntimeWire 等',
  },
];

/* ---------- 2. 作品展示 ---------- */
const WORKS = [
  { title: 'YYAI', author: 'Yummy · YYAI 团队', tags: ['AI', '学习'], color: '#CFE3F7', hours: null, source: '灵感公社 #01 分享',
    desc: 'Canvas 学习助手：把课程资料、作业要求、截止时间和公告收到一个地方，基于你自己的 Canvas 资料问答，并定位到对应 Week / Module。创始人零编程基础，1 天做出第一版，2 个月走到真实学生身边。', link: '' },
  { title: 'MeeMap', author: 'Selina', tags: ['App', '校园'], color: '#F7A6BC', hours: null, source: '灵感公社 #01 分享',
    desc: '校园活动和找搭子的地图 App：在地图上看看附近有什么活动、有谁想一起去。', link: '' },
  { title: 'PriceTicker', author: 'Selina', tags: ['工具', '生活'], color: '#FFE600', hours: null, source: '灵感公社 #01 分享',
    desc: '澳洲超市价格追踪工具：盯住常买商品的价格变化，打折时再出手。', link: '' },
  { title: '30 个个人网站', author: '首场 Workshop 学员', tags: ['Web', 'Workshop'], color: '#D6EE9C', hours: 3, source: '9.28 个人网站 Workshop', img: 'assets/photos/0928-website.jpg',
    desc: '一个下午，从和 AI 聊需求、在 Stitch 里画设计，到部署到 Vercel 拿到自己的网址。每个人的网站都长得不一样。', link: '' },
  { title: 'Bento Workshop Blog', author: 'Viper', tags: ['Web', 'Workshop', '开源'], color: '#E3D7FF', hours: null, source: 'Workshop 基础模板',
    desc: '首场 Workshop 使用的个人博客基础工程，六个可个性化的小组件，适合 fork 后改成自己的网站。', link: 'https://github.com/CatDisgust/bento-workshop-blog' },
];

/* ---------- 3. 活动通知 ---------- */
const EVENTS = [
  { title: 'AI 复习分享会 × 求职经验分享', date: '2026-11-12', time: '14:15 – 16:15', place: 'Susan Wakil Health Building L4, Room 417（CreateSpace）', type: '联合活动',
    desc: 'ViberSpace × UNSW BuilderSpace 联合举办。嘉宾 Luka（两年大厂经验的软件工程师）聊秋招 / 春招怎么准备、怎么用好 AI、开发岗内推（CS / EE）并现场答疑；后半场是 AI 复习工作坊，现场演示用 AI 做期末 Cheatsheet，然后一起复习。免费，记得带电脑和复习资料。',
    link: 'https://events.humanitix.com/ai-study-session-and-career-talk', linkText: 'Humanitix 报名',
    cover: 'assets/photos/1112-poster.jpg', photos: [] },
  { title: 'Vibe Commons #01｜灵感公社第一期', date: '2026-10-15', time: '16:00 – 18:00', place: 'Badham Building, The Quarter event space', type: 'Meetup',
    desc: 'AI 编程真实项目与踩坑交流。用“小林的故事”Menti 互动热身，Selina（MeeMap / PriceTicker）和 Yummy（YYAI）分享真实项目，再分组聊话题、自由交流。当天下雨，11 位同学到场，5 位表示下次愿意来分享。',
    cover: 'assets/photos/1015-talk.jpg',
    photos: [
      { src: 'assets/photos/1015-poster.jpg', cap: '活动海报' },
      { src: 'assets/photos/1015-talk.jpg', cap: '真实项目分享' },
      { src: 'assets/photos/1015-share.jpg', cap: '分享者' },
      { src: 'assets/photos/1015-room.jpg', cap: 'The Quarter 现场' },
    ] },
  { title: 'Hello, Vibe!｜个人网站 Workshop', date: '2026-09-28', time: '14:00 – 17:00', place: 'Carslaw Learning Studio 353', type: 'Workshop',
    desc: 'ViberSpace 的第一场活动，SUPRA 赞助。30 位同学分六组、每组一位 Helper，从零用 AI 做出并部署了自己的个人网站，还有破冰海报和两轮银票抽奖（ChatGPT Plus 和 USYD 周边）。整体满意度 4.6 / 5。',
    link: 'https://github.com/CatDisgust/bento-workshop-blog', linkText: '查看 Workshop 模板',
    cover: 'assets/photos/0928-group.jpg',
    photos: [
      { src: 'assets/photos/0928-group.jpg', cap: '大合照' },
      { src: 'assets/photos/0928-poster.jpg', cap: '活动海报' },
      { src: 'assets/photos/0928-icebreaker.jpg', cap: '小组破冰海报' },
      { src: 'assets/photos/0928-poster-share.jpg', cap: '海报分享' },
      { src: 'assets/photos/0928-workshop.jpg', cap: '个人网站 Workshop' },
      { src: 'assets/photos/0928-room.jpg', cap: 'Carslaw 353 现场' },
      { src: 'assets/photos/0928-website.jpg', cap: '做出来的网站' },
      { src: 'assets/photos/0928-demo.jpg', cap: '作品展示' },
      { src: 'assets/photos/0928-prizes.jpg', cap: '抽奖奖品' },
    ] },
];

/* ---------- 4. 社团介绍 ---------- */
const ABOUT = {
  intro: [
    'ViberSpace 是悉尼大学的 Vibe Coding 社团（USYD Vibe Coding Club）。我们的 Mission：让每一个有想法的人，都能把想法变成自己的产品。',
    '“Vibe coding”指用自然语言和 AI 一起写程序：你负责想清楚要什么、判断做得对不对，AI 负责敲大部分代码。无论你有没有编程基础，只要对用 AI 做产品、把想法真正做出来感兴趣，都欢迎来。',
  ],
  values: [
    { title: '先做出来', text: '作品可以简单、粗糙一点，先让它有你的想法。一个下午就能拿到自己的网址。', color: '#FFE600' },
    { title: '让 AI 可控', text: '我们更关注怎样想清楚自己要什么，以及怎样让 AI 按你的想法实现，而不是接受随机结果。', color: '#F7A6BC' },
    { title: '身边就有人可以问', text: '每组一位 Helper、灵感公社的真实踩坑分享：卡住的时候，屋子里就有可以问的人。', color: '#CFE3F7' },
  ],
  logo: 'assets/logo/horizontal-tagline.png',
  photo: { src: 'assets/photos/0928-group.jpg', cap: '9.28 首场 Workshop 大合照' },
  stats: [ { n: '40+', label: '社员' }, { n: '3', label: '场活动' }, { n: '4.6', label: '首场满意度 / 5' }, { n: '2', label: '所学校联合' } ],
  team: [
    { name: 'Hejia', role: '社长 · 活动统筹', color: '#2F6DC2' },
    { name: 'Viper', role: 'Workshop 主讲 · 灵感公社', color: '#F28FAB' },
    { name: 'Jerry', role: '主持 · 签到', color: '#EBCB00' },
    { name: 'Helpers', role: '小组辅助 · 设计 · 摄影', color: '#5CB87A' },
  ],
  timeline: [
    { when: '2026.09', what: '向 USU 申请成立 Vibe Coding Club' },
    { when: '2026.09.28', what: '首场活动「Hello, Vibe!」个人网站 Workshop，40 人到场，SUPRA 赞助' },
    { when: '2026.10.15', what: '交流会系列「Vibe Commons｜灵感公社」第一期，真实项目踩坑分享' },
    { when: '2026.11.12', what: '与 UNSW BuilderSpace 联合举办 AI 复习分享会 × 求职经验分享' },
  ],
};

/* ---------- 5. 入门教程（来自首场 Workshop README） ---------- */
const TUTORIALS = [
  { lv: 0, title: '开始前准备', time: '30 分钟', color: '#CFE3F7', steps: [
    { t: '一台电脑 + 一个能用的 AI 编程工具', d: 'Workshop 以 Codex 举例，Claude Code、Cursor 也可以；国内可以用 Trae、CodeBuddy。记得准备好账号额度。' },
    { t: '安装 Node.js（LTS 版）', d: '用于在自己电脑上运行网站项目，到 nodejs.org 下载 LTS（长期支持版）。' },
    { t: '登录 GitHub 和 Vercel', d: 'GitHub 保存网站代码，Vercel 发布网站，都用自己的账号。' },
    { t: '准备一个“个人素材”文件夹', d: '自我介绍、头像或照片、想展示的文章作品，再找一个喜欢的网站或几个描述风格的词。' },
  ]},
  { lv: 1, title: '建项目，聊需求', time: '30 分钟', color: '#FFE600', steps: [
    { t: '新建一个独立文件夹，在 AI 工具里打开', d: '例如 my-vibe-site，作为你的网站项目。' },
    { t: '放入 AGENTS.md 项目规则', d: '它是写给 AI 的协作说明，约定怎样沟通、怎样制作和维护网站。见 VibeWiki。' },
    { t: '和 AI 聊三件事', d: '网站用来做什么、准备放哪些内容、访客可以做什么。没想法也可以让它一轮一轮问你。' },
  ]},
  { lv: 2, title: '用 Stitch 做设计', time: '45 分钟', color: '#D6EE9C', steps: [
    { t: '把 AI 生成的设计指令贴进 Stitch，得到 Sketch', d: 'Sketch 是网站骨架：有哪些页面、每页放什么、怎样进入和返回。用大白话改到满意。' },
    { t: '去 Pinterest 找 1–3 张喜欢的图', d: '搜 minimal website、editorial design、retro website、scrapbook design，海报插画也可以。' },
    { t: '只描述感觉，让 AI 做“视觉表达卡”', d: '比如“温暖、松弛，像在和朋友分享生活”。确认后交给 Stitch 出视觉稿。' },
  ]},
  { lv: 3, title: '变成真的网站', time: '45 分钟', color: '#F7A6BC', steps: [
    { t: '把 Sketch 和视觉稿交给 AI 生成工程', d: '它会搭好项目、启动本地预览。打开预览，自己把主要功能点一遍。' },
    { t: '具体地描述问题', d: '例如“我在文章页点开第一篇，没有显示全文。希望点进去能读全文，再返回列表。”' },
    { t: '换成你的个人信息和素材', d: '把素材文件夹交给 AI，检查名字、照片、页脚和浏览器标题里还有没有示例内容。' },
  ]},
  { lv: 4, title: '上线，拿到网址', time: '20 分钟', color: '#E3D7FF', steps: [
    { t: '在 GitHub 新建一个空仓库', d: '不要勾选 README、.gitignore 或 License，复制仓库的 HTTPS 地址。' },
    { t: '让 AI 把项目推送到仓库', d: '它会检查构建和 .gitignore，需要登录时引导你在浏览器授权。' },
    { t: 'Vercel → Add New → Project → Import → Deploy', d: '部署完成后得到 .vercel.app 网址。localhost 开头的只是本地预览。' },
    { t: '把链接发给朋友 🎉', d: '再检查一遍：别人能打开、图片链接正常、网站里有你自己的选择。' },
  ]},
];

/* ---------- 6. VibeWiki ---------- */
const WIKI = [
  { id: 'vibe-coding', cat: '基础概念', title: 'Vibe Coding', summary: '用自然语言和 AI 协作写程序的方式。',
    body: [
      'Vibe coding 是一种编程方式：你用自然语言描述想要的功能，由 AI 生成大部分代码，你负责运行、观察、反馈和判断。',
      '它降低了“把想法做出来”的门槛，但不等于不用思考。好的 vibe coder 擅长<b>拆解问题</b>、<b>描述需求</b>和<b>验证结果</b>：AI 说“完成了”以后，仍然需要你亲手试一次。',
    ], related: ['prompt', 'agents-md'] },
  { id: 'prompt', cat: '基础概念', title: 'Prompt（提示词）', summary: '你给 AI 的指令和上下文。',
    body: [
      '写代码时，好的提示词更像一份迷你需求文档：目标是什么、约束是什么、怎么算完成。',
      '首场 Workshop 用了三段核心 Prompt：<b>聊需求</b> → <b>聊感觉与视觉设计</b> → <b>生成工程</b>。每段都要求 AI 一轮只问一个问题，用大白话和你确认。',
    ], related: ['context', 'sketch'] },
  { id: 'context', cat: '基础概念', title: '上下文（Context）', summary: 'AI 在回答时能“看到”的全部信息。',
    body: [
      '上下文包括对话历史、你贴进去的代码和文件。AI 只能根据上下文判断，缺信息时它会“猜”。',
      '不同工具之间不会自动共享对话，比如 Stitch 和 Codex：从一个工具换到另一个时，要把确认过的设计稿和素材重新交给它。',
    ], related: ['prompt', 'stitch'] },
  { id: 'agents-md', cat: '基础概念', title: 'AGENTS.md', summary: '放在项目根目录、写给 AI 的协作规则。',
    body: [
      'AGENTS.md 保存稳定的工作规则，例如：用中文和大白话沟通、先读现状再修改、保留已确认的设计、技术栈和部署方式是什么。',
      '具体需求、进度和结果则写在另一份项目记录里。这样下次打开项目，AI 能直接接着做。',
    ], related: ['vibe-coding'] },
  { id: 'sketch', cat: '设计', title: 'Sketch（网站骨架）', summary: '有哪些页面、每页放什么、页面之间怎样进入和返回。',
    body: [
      '在我们的课程里，Sketch 指网站的基本结构，而不是视觉风格。先用中性配色和简单边界把结构画清楚，再进入视觉设计。',
      '检查 Sketch 时看三件事：内容放得合不合理？主要入口找不找得到？从详情能不能回去？',
    ], related: ['stitch', 'visual-card'] },
  { id: 'visual-card', cat: '设计', title: '视觉表达卡', summary: '把“我想要的感觉”翻译成颜色、字体、细节的说明卡。',
    body: [
      '你只需要描述感受，例如“温暖，但不热闹”，由 AI 把它转化为颜色、字体、素材和细节建议，并生成一张风格板图片。',
      '确认这套卡片后，再交给 Stitch 做网页视觉稿。卡片只指导视觉，不改变已确认的页面结构。',
    ], related: ['sketch', 'stitch'] },
  { id: 'stitch', cat: '工具', title: 'Stitch', summary: 'Google 的 AI 界面设计工具。',
    body: [
      '把文字指令贴进 Stitch，它会生成网页设计稿，可以用大白话继续修改。在 Workshop 里我们用它做 Sketch 和视觉稿。',
      '其他可选的设计工具：Claude Design、Figma Design、Codex ImageGen。',
    ], related: ['sketch', 'tools'] },
  { id: 'tools', cat: '工具', title: 'AI 编程工具一览', summary: '社团活动里常用的工具。',
    body: [
      '<b>AI 编程</b>：Codex、Claude Code、Cursor，国内可用 Trae、CodeBuddy。',
      '<b>UI 设计</b>：Google Stitch、Claude Design、Figma Design、Codex ImageGen。',
      '<b>其他备选</b>：Lovable、Gemini、Grok。额度用完时，可以换一个工具接着做。',
    ], related: ['stitch', 'deploy'] },
  { id: 'git', cat: '工具', title: 'Git & GitHub', summary: '记录代码历史的工具，以及托管代码的网站。',
    body: [
      'Git 像是代码的“存档点”，每次提交（commit）都能回到那个状态。GitHub 是放 Git 仓库的网站，也是部署到 Vercel 的起点。',
      '和 AI 一起写代码时，<b>勤提交</b>非常重要：AI 改坏了，你可以回到上一个能用的版本。推送时不要上传 node_modules、密码或密钥。',
    ], related: ['deploy'] },
  { id: 'deploy', cat: '工具', title: '部署（Vercel）', summary: '把作品放到网上，让别人通过网址访问。',
    body: [
      'Vercel 可以直接导入 GitHub 仓库并一键部署，得到一个 .vercel.app 网址。之后每次更新内容，重新部署即可。',
      '<b>localhost</b> 或 <b>127.0.0.1</b> 开头的是本地预览，只有你自己能打开；分享给别人要用部署后的正式网址。',
    ], related: ['git'] },
  { id: 'hallucination', cat: '常见问题', title: '幻觉（Hallucination）', summary: 'AI 一本正经地编造不存在的东西。',
    body: [
      'AI 有时会使用不存在的函数、库或者 API。遇到报错“找不到 xxx”时，先怀疑是不是它编的。',
      '对策：让它给出文档链接，或者直接把官方文档贴给它。',
    ], related: ['context'] },
  { id: 'stuck', cat: '常见问题', title: '卡住了怎么办', summary: '灵感公社第一期的“小林的故事”。',
    body: [
      '做出来 → 没人用 → 加功能 → 登录坏了 → 被服务器和数据库搞晕……这是很多人的真实路径。',
      '报错时复制<b>完整的</b>报错信息，说明你刚做了什么、期望发生什么。来回改三次还不行，就退回上一个能用的版本换个思路，或者来活动现场问问身边做过的人。',
    ], related: ['git', 'hallucination'] },
];

/* ---------- 7. 加入我们 ---------- */
const JOIN = {
  steps: [
    { t: '填写报名表', d: '只需要 2 分钟，告诉我们你想做点什么。' },
    { t: '进入社群', d: '活动通知、报名链接和 AI 资讯都会发在微信社群里。' },
    { t: '来一场活动', d: '活动在 Humanitix 报名，带上电脑，做出你的第一个作品。' },
  ],
  faq: [
    { q: '完全不会编程可以加入吗？', a: '当然可以。无论有没有编程基础，只要对 Vibe Coding、用 AI 做产品感兴趣都欢迎。Workshop 每组都有一位 Helper，也可以先看看入门教程。' },
    { q: '活动收费吗？', a: '目前的活动都是免费的，有时还有零食饮料和抽奖。' },
    { q: '需要准备什么？', a: '电脑和电源，一个能用的 AI 编程工具和账号额度（以 Codex 为例，Claude、Cursor 也可以；国内有 Trae、CodeBuddy）。交流会类活动电脑自愿携带。' },
    { q: '不是 USYD 学生可以来吗？', a: '部分场地仅限 USYD 在读学生进入；联合活动（例如和 UNSW BuilderSpace 的复习分享会）会单独开放其他学校的票，以活动页说明为准。' },
    { q: '我做过项目，可以来分享吗？', a: '非常欢迎！灵感公社每期都有项目分享环节（每人约 10 分钟），成品、半成品、失败经历都可以讲，在报名表里勾选即可。' },
  ],
};

/* ---------- 8. 留言板（初始留言：整理自活动反馈，匿名） ---------- */
const SEED_MESSAGES = [
  { name: '首场 Workshop 学员', text: '操作教学很有趣，每组一位 helper 的机制很有效！', color: '#FFE600', at: '2026-09-29' },
  { name: '首场 Workshop 学员', text: '零基础能跟着做出来，但希望先讲讲几个软件和平台之间是怎么配合的。', color: '#CFE3F7', at: '2026-09-29' },
  { name: '灵感公社 #01 参与者', text: '建议整场围绕一个痛点做主题，小而精，聊得更深。', color: '#F7A6BC', at: '2026-10-16' },
  { name: '灵感公社 #01 参与者', text: '想听更多“怎么做出来的过程”，Menti 互动挺好玩的。', color: '#D6EE9C', at: '2026-10-16' },
];

/* ---------- 灵感扭蛋机（点地图右上角的 Vibe 塔） ----------
   每扭一次随机掉一个点子。level：1 一个下午 / 2 一个周末 / 3 要折腾一阵
   rare: true 的是金色稀有胶囊，掉率低一些；prompt 是“第一句话可以这样对 AI 说” */
const IDEAS = [
  { emoji: '📅', title: '选课冲突检测器', level: 1, tools: ['Claude', 'Stitch'],
    pitch: '把 timetable 文字贴进去，自动画成一张周课表，撞课的格子标红。',
    prompt: '帮我做一个网页：我粘贴一段课程时间表文字，它画出周一到周五的课表，时间重叠的课标红。' },
  { emoji: '☕', title: '我的悉尼咖啡地图', level: 2, tools: ['Claude', 'Leaflet'],
    pitch: '把喝过的每家咖啡店钉在地图上，打分、写一句话，攒成你的私藏清单。',
    prompt: '帮我做一个网页地图，我可以点地图添加咖啡店，填名字、评分和一句评价，数据存在浏览器里。' },
  { emoji: '🧾', title: '合租记账小账本', level: 2, tools: ['Claude', 'Cursor'],
    pitch: '水电网房租谁付了多少、谁欠谁多少，一目了然，月底不再算到吵架。',
    prompt: '帮我做一个合租记账网页：添加室友，记录每笔支出和谁付的，自动算出每个人该给谁多少钱。' },
  { emoji: '🍅', title: '期末倒计时 + 番茄钟', level: 1, tools: ['Claude'],
    pitch: '离每门考试还有几天，再配一个 25 分钟专注计时，学累了看看就清醒了。',
    prompt: '帮我做一个网页：可以添加考试科目和日期，显示倒计时天数；下面有一个 25 分钟的番茄钟。' },
  { emoji: '🎡', title: '今天吃什么转盘', level: 1, tools: ['Claude'],
    pitch: '把学校附近的店填进去，转一下，命运替你决定午饭。',
    prompt: '帮我做一个“今天吃什么”转盘网页，可以自己增删选项，点按钮转盘转动后停在一个结果上。' },
  { emoji: '📚', title: '二手教材交换板', level: 3, tools: ['Claude Code', 'Supabase', 'Vercel'],
    pitch: '学长学姐用完的书挂上来，学弟学妹按课程代码搜，线下面交。',
    prompt: '我想做一个二手教材交换网站：用户可以发布书（书名、课程代码、价格、联系方式），其他人按课程代码搜索。先帮我规划需要哪些页面和数据表。' },
  { emoji: '🗣️', title: '雅思口语陪练', level: 3, tools: ['Claude API', 'Web Speech'],
    pitch: 'AI 当考官随机出题，你对着麦克风回答，它给你打分和改进建议。',
    prompt: '帮我做一个雅思口语练习网页：随机出一道 Part 2 题目，我用麦克风回答，转成文字后让 AI 给出评分和建议。' },
  { emoji: '🪴', title: '植物续命提醒', level: 2, tools: ['Claude', 'PWA'],
    pitch: '给宿舍里的每盆植物建个档案，到点提醒你浇水，别再养死第三盆。',
    prompt: '帮我做一个植物浇水提醒网页：添加植物和浇水间隔天数，首页按“该浇水了”排序，点一下记录今天浇过。' },
  { emoji: '🧩', title: '小组作业分工看板', level: 2, tools: ['Claude', 'Cursor'],
    pitch: '谁负责哪部分、做到哪了、谁在划水，拖一拖卡片就清楚。',
    prompt: '帮我做一个看板网页，有“待做 / 进行中 / 完成”三列，可以加任务卡片、写负责人，拖动卡片换列。' },
  { emoji: '🃏', title: '课件变闪卡', level: 3, tools: ['Claude API', 'PDF.js'],
    pitch: '上传一份课件 PDF，AI 自动出一叠问答闪卡，地铁上刷两轮。',
    prompt: '帮我做一个网页：上传 PDF 课件，提取文字后让 AI 生成 20 张问答闪卡，可以翻面、标记“会了”。' },
  { emoji: '🎂', title: '给朋友的生日网页', level: 1, tools: ['Claude', 'Vercel'],
    pitch: '一个只属于 TA 的网页：倒计时、照片墙、大家的祝福，生日当天发链接。',
    prompt: '帮我做一个生日惊喜网页：顶部是生日倒计时，中间是照片墙，下面是朋友们的祝福卡片，风格可爱一点。' },
  { emoji: '🌦️', title: '悉尼穿衣指南', level: 2, tools: ['Claude', '天气 API'],
    pitch: '悉尼一天四季，打开就告诉你今天要不要带外套和伞。',
    prompt: '帮我做一个网页：读取悉尼今天的天气预报，按早中晚气温和降雨概率，给出穿衣和带伞建议。' },
  { emoji: '🎟️', title: '活动签到抽奖机', level: 2, tools: ['Claude', 'Stitch'],
    pitch: '社团活动扫码签到，最后大屏幕滚动抽奖，气氛直接拉满。',
    prompt: '帮我做一个活动签到抽奖网页：参加者输入名字签到，主持人点“开始抽奖”后名字在大屏上滚动，停在中奖者。' },
  { emoji: '🕹️', title: '只有你会玩的小游戏', level: 2, tools: ['Claude', 'Canvas'],
    pitch: '规则你定、角色你画，做一个浏览器小游戏，发给朋友挑战你的最高分。',
    prompt: '帮我做一个浏览器小游戏，我先描述一下玩法：……（写下你的想法），请用 HTML Canvas 实现，并记录最高分。' },
  { emoji: '🔤', title: '每日一词', level: 1, tools: ['Claude'],
    pitch: '每天一个地道英文表达，带例句和发音，一年就是 365 个。',
    prompt: '帮我做一个“每日一词”网页，每天按日期显示一个英文表达、中文解释和例句，点按钮可以朗读发音。' },
  { emoji: '🎧', title: '心情歌单生成器', level: 3, tools: ['Claude API', 'Spotify API'], rare: true,
    pitch: '写一句你现在的心情，AI 帮你挑十首歌，一键存进你的歌单。',
    prompt: '我想做一个网页：输入一句心情描述，让 AI 推荐 10 首歌并解释理由。先帮我想清楚要用哪些接口、怎么登录。' },
  { emoji: '🗺️', title: '把你的城市做成地图网站', level: 2, tools: ['Claude', 'SVG'], rare: true,
    pitch: '就像 ViberSpace 首页这样：手绘一张你家乡的小地图，每栋楼都是一个故事。',
    prompt: '帮我做一个手绘风格的 SVG 小地图网页，上面有几栋代表我家乡的建筑，点每栋楼弹出一段介绍。' },
  { emoji: '🤖', title: '你的 AI 分身', level: 3, tools: ['Claude API', 'Vercel'], rare: true,
    pitch: '喂给它你的作品和经历，访客来你的主页可以直接跟“你”聊天。',
    prompt: '我想在个人主页上加一个聊天框，用我的简历和项目介绍作为资料，让 AI 以我的口吻回答访客问题。先帮我规划怎么做。' },
];
