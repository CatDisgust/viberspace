/* ============================================================
   首页地图：所有建筑都是手写 SVG，坐标系 1600 × 1200
   ============================================================ */

const COL = {
  blue: '#2F6DC2', blueD: '#1F4E96', pink: '#F7A6BC', pinkD: '#EE8AA7',
  yellow: '#FFE600', yellowD: '#EBCB00', glass: '#CFE3F7', glassD: '#A9CBEE',
  green: '#5CB87A', greenD: '#3F9A5E', park: '#D6EE9C', road: '#EBEDF0',
  ink: '#26303B', gray: '#9AA5B1', light: '#C9CFD6', red: '#E8463B', cream: '#FFF8E6',
};

function grid(x0, y0, cols, rows, w, h, gx, gy, fill, extra = '') {
  let s = '';
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      s += `<rect x="${x0 + c * (w + gx)}" y="${y0 + r * (h + gy)}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
  return s;
}
const bush = (x, y, r = 12) =>
  `<circle cx="${x}" cy="${y - r}" r="${r}" fill="${COL.green}"/><circle cx="${x + r * .45}" cy="${y - r * .7}" r="${r * .55}" fill="${COL.greenD}" opacity=".35"/>`;
const pot = (x, y) =>
  `<rect x="${x - 8}" y="${y - 12}" width="16" height="12" fill="${COL.ink}" opacity=".75"/>${bush(x, y - 12, 11)}`;

/* ---------- 建筑（原点 = 建筑顶部中心） ---------- */
const BUILDINGS = {
  news: () => `
    <rect x="-112" y="0" width="224" height="40" rx="4" fill="${COL.blue}"/>
    <text x="0" y="29" text-anchor="middle" class="sg" font-size="24" fill="#fff">AI DAILY</text>
    <rect x="-112" y="40" width="224" height="6" fill="${COL.ink}"/>
    <rect x="-104" y="46" width="208" height="96" fill="#F3F5F7"/>
    <rect x="-94" y="56" width="70" height="70" fill="${COL.glass}"/>
    <rect x="24" y="56" width="70" height="70" fill="${COL.glass}"/>
    <rect x="-20" y="56" width="40" height="86" fill="${COL.glass}" stroke="#fff" stroke-width="3"/>
    <line x1="0" y1="56" x2="0" y2="142" stroke="#fff" stroke-width="3"/>
    <rect x="-84" y="70" width="34" height="44" fill="#fff"/>
    <rect x="-80" y="76" width="26" height="5" fill="${COL.blue}"/>
    ${[86, 92, 98, 104].map(y => `<rect x="-80" y="${y}" width="${y % 12 ? 26 : 18}" height="2.5" fill="${COL.gray}"/>`).join('')}
    <text x="59" y="100" text-anchor="middle" class="sg" font-size="20" fill="${COL.blue}">24H</text>
    <path d="M30 120 L58 60 M44 124 L70 68" stroke="#fff" stroke-width="3" opacity=".6"/>
    <rect x="-116" y="142" width="232" height="7" rx="2" fill="${COL.gray}"/>`,

  showcase: () => `
    <line x1="-40" y1="40" x2="-40" y2="54" stroke="${COL.ink}" stroke-width="3"/>
    <line x1="40" y1="40" x2="40" y2="54" stroke="${COL.ink}" stroke-width="3"/>
    <rect x="-74" y="0" width="148" height="42" rx="3" fill="#fff" stroke="${COL.blue}" stroke-width="4"/>
    <text x="0" y="29" text-anchor="middle" class="sg" font-size="21" fill="${COL.blue}">SHOWCASE</text>
    <rect x="-84" y="54" width="114" height="178" fill="${COL.pink}"/>
    <rect x="30" y="94" width="56" height="138" fill="${COL.pinkD}"/>
    ${grid(-74, 66, 4, 7, 18, 12, 8, 8, '#FDE6EC')}
    ${grid(38, 106, 2, 6, 16, 12, 8, 8, '#FDE6EC')}
    <rect x="-40" y="204" width="30" height="28" fill="#fff"/>
    <line x1="-25" y1="204" x2="-25" y2="232" stroke="${COL.pink}" stroke-width="2"/>
    ${pot(-62, 232)}${pot(14, 232)}
    <rect x="-92" y="232" width="184" height="6" rx="2" fill="${COL.gray}"/>`,

  events: () => `
    <rect x="-80" y="0" width="80" height="22" fill="${COL.yellow}"/>
    <rect x="-80" y="22" width="130" height="170" fill="${COL.yellow}"/>
    <rect x="50" y="52" width="40" height="140" fill="${COL.yellowD}"/>
    ${grid(-68, 36, 3, 3, 26, 30, 12, 12, COL.ink)}
    ${grid(58, 64, 1, 3, 24, 18, 0, 14, '#6b5a00', 'opacity=".55"')}
    <rect x="-24" y="160" width="40" height="32" fill="${COL.ink}"/>
    <line x1="-4" y1="160" x2="-4" y2="192" stroke="${COL.yellow}" stroke-width="2"/>
    <rect x="96" y="40" width="4" height="70" fill="${COL.ink}"/>
    <path d="M100 42 L134 42 L134 100 L117 90 L100 100 Z" fill="${COL.red}"/>
    <text x="117" y="66" text-anchor="middle" class="hand" font-size="17" fill="#fff">活</text>
    <text x="117" y="85" text-anchor="middle" class="hand" font-size="17" fill="#fff">动</text>
    <line x1="-122" y1="160" x2="-122" y2="192" stroke="${COL.ink}" stroke-width="3"/>
    <line x1="-92" y1="160" x2="-92" y2="192" stroke="${COL.ink}" stroke-width="3"/>
    <rect x="-132" y="126" width="50" height="38" rx="3" fill="#fff" stroke="${COL.blue}" stroke-width="3"/>
    <rect x="-125" y="133" width="22" height="4" fill="${COL.red}"/>
    <rect x="-125" y="142" width="36" height="3" fill="${COL.gray}"/>
    <rect x="-125" y="150" width="30" height="3" fill="${COL.gray}"/>
    <rect x="-136" y="192" width="232" height="6" rx="2" fill="${COL.gray}"/>`,

  about: () => `
    <g transform="translate(0 -2) scale(1.3)">
      <path d="M0 52 C -36 32 -38 4 -18 4 C -8 4 -2 10 0 16 C 2 10 8 4 18 4 C 38 4 36 32 0 52Z" fill="${COL.pink}" stroke="#fff" stroke-width="2"/>
      <text x="0" y="32" text-anchor="middle" class="sg" font-size="13" fill="#fff">HELLO</text>
    </g>
    <line x1="0" y1="66" x2="0" y2="78" stroke="${COL.ink}" stroke-width="3"/>
    <rect x="-104" y="78" width="208" height="12" fill="${COL.light}"/>
    <rect x="-96" y="90" width="192" height="98" fill="#FFFDF6" stroke="#E6E2D6" stroke-width="2"/>
    ${[-82, -50, 26, 58].map(x => `<rect x="${x}" y="100" width="24" height="22" fill="${COL.blue}"/><path d="M${x + 12} 100 V122 M${x} 111 H${x + 24}" stroke="#fff" stroke-width="2"/>`).join('')}
    <rect x="-38" y="124" width="76" height="12" fill="${COL.pink}"/>
    ${[-31, -17, -3, 11, 25].map(x => `<path d="M${x - 7} 136 a7 7 0 0 0 14 0" fill="${COL.pink}"/>`).join('')}
    <rect x="-22" y="142" width="44" height="46" fill="${COL.blue}"/>
    <line x1="0" y1="142" x2="0" y2="188" stroke="#fff" stroke-width="2"/>
    ${pot(-56, 188)}${pot(56, 188)}
    <rect x="-100" y="188" width="200" height="6" rx="2" fill="${COL.gray}"/>`,

  tutorial: () => `
    <rect x="-102" y="0" width="204" height="46" rx="3" fill="${COL.blue}"/>
    <text x="-14" y="32" text-anchor="middle" class="sg" font-size="23" fill="${COL.yellow}">START HERE</text>
    <circle cx="80" cy="23" r="16" fill="${COL.ink}"/>
    <text x="80" y="29" text-anchor="middle" class="sg" font-size="13" fill="${COL.yellow}">&lt;/&gt;</text>
    <rect x="-104" y="46" width="208" height="10" fill="${COL.cream}" stroke="${COL.ink}" stroke-width="2"/>
    <rect x="-96" y="56" width="192" height="114" fill="${COL.cream}"/>
    ${grid(-86, 64, 4, 1, 38, 32, 8, 0, COL.glass, `stroke="${COL.ink}" stroke-width="2"`)}
    ${[-67, -21, 25, 71].map(x => `<line x1="${x}" y1="64" x2="${x}" y2="96" stroke="${COL.ink}" stroke-width="2"/>`).join('')}
    ${Array.from({ length: 8 }, (_, i) => `<rect x="${-96 + i * 24}" y="104" width="24" height="16" fill="${i % 2 ? '#fff' : COL.blue}"/>`).join('')}
    ${Array.from({ length: 8 }, (_, i) => `<path d="M${-96 + i * 24} 120 a12 6 0 0 0 24 0" fill="${i % 2 ? '#fff' : COL.blue}"/>`).join('')}
    <rect x="-86" y="132" width="50" height="38" fill="${COL.glass}" stroke="${COL.ink}" stroke-width="2"/>
    <rect x="36" y="132" width="50" height="38" fill="${COL.glass}" stroke="${COL.ink}" stroke-width="2"/>
    ${['#F7A6BC', '#FFE600', '#5CB87A', '#2F6DC2'].map((c, i) => `<rect x="${-80 + i * 10}" y="150" width="8" height="20" fill="${c}"/><rect x="${42 + i * 10}" y="${146 + (i % 2) * 4}" width="8" height="${24 - (i % 2) * 4}" fill="${c}"/>`).join('')}
    <rect x="-18" y="132" width="36" height="38" fill="${COL.blue}"/>
    <rect x="-102" y="170" width="204" height="6" rx="2" fill="${COL.gray}"/>`,

  wiki: () => `
    <polygon points="-108,42 0,0 108,42" fill="#DCE8F6" stroke="${COL.blue}" stroke-width="3" stroke-linejoin="round"/>
    <text x="0" y="36" text-anchor="middle" class="sg" font-size="17" fill="${COL.blue}">WIKI</text>
    <rect x="-104" y="42" width="208" height="12" fill="${COL.blue}"/>
    <rect x="-96" y="54" width="192" height="70" fill="#F4F7FB"/>
    ${[-90, -64, 50, 76].map(x => `<rect x="${x}" y="54" width="14" height="70" fill="#fff" stroke="${COL.light}" stroke-width="2"/>`).join('')}
    <path d="M-22 124 V86 a22 22 0 0 1 44 0 V124 Z" fill="${COL.blue}"/>
    <path d="M-12 96 L0 100 L12 96 V112 L0 116 L-12 112 Z" fill="#fff"/>
    <line x1="0" y1="100" x2="0" y2="116" stroke="${COL.blue}" stroke-width="1.5"/>
    <rect x="-104" y="124" width="208" height="8" fill="${COL.light}"/>
    <rect x="-112" y="132" width="224" height="8" rx="2" fill="${COL.gray}"/>`,

  join: () => `
    <line x1="-30" y1="34" x2="-30" y2="46" stroke="${COL.ink}" stroke-width="3"/>
    <line x1="30" y1="34" x2="30" y2="46" stroke="${COL.ink}" stroke-width="3"/>
    <rect x="-60" y="0" width="120" height="36" rx="18" fill="${COL.red}"/>
    <text x="0" y="25" text-anchor="middle" class="sg" font-size="19" fill="#fff">JOIN US</text>
    <rect x="-68" y="46" width="136" height="196" fill="${COL.glass}"/>
    <rect x="22" y="46" width="46" height="196" fill="${COL.glassD}"/>
    ${Array.from({ length: 13 }, (_, i) => `<line x1="-68" y1="${60 + i * 14}" x2="68" y2="${60 + i * 14}" stroke="#fff" stroke-width="2"/>`).join('')}
    ${[-38, -8, 22, 45].map(x => `<line x1="${x}" y1="46" x2="${x}" y2="206" stroke="#fff" stroke-width="2"/>`).join('')}
    <rect x="-22" y="210" width="44" height="32" fill="${COL.blue}"/>
    <line x1="0" y1="210" x2="0" y2="242" stroke="#fff" stroke-width="2"/>
    <rect x="-76" y="242" width="152" height="6" rx="2" fill="${COL.gray}"/>`,

  guestbook: () => `
    <rect x="-82" y="0" width="164" height="32" rx="3" fill="#fff" stroke="${COL.ink}" stroke-width="2"/>
    <text x="10" y="23" text-anchor="middle" class="sg" font-size="16" fill="${COL.blue}">MESSAGES</text>
    <rect x="-70" y="8" width="20" height="15" fill="${COL.red}"/><path d="M-70 8 L-60 16 L-50 8" stroke="#fff" stroke-width="2" fill="none"/>
    <rect x="-78" y="32" width="156" height="86" fill="#F3F5F7" stroke="#DDE2E7" stroke-width="2"/>
    <rect x="-78" y="32" width="156" height="8" fill="${COL.blue}"/>
    <rect x="-68" y="50" width="48" height="40" fill="${COL.glass}"/>
    <rect x="20" y="50" width="48" height="40" fill="${COL.glass}"/>
    <rect x="-12" y="62" width="32" height="56" fill="${COL.glass}" stroke="#fff" stroke-width="3"/>
    ${[['-62', '56', COL.yellow], ['-44', '64', COL.pink], ['28', '58', '#D6EE9C'], ['46', '66', '#fff']].map(([x, y, c]) => `<rect x="${x}" y="${y}" width="16" height="16" fill="${c}" transform="rotate(${x % 3 * 4 - 4} ${+x + 8} ${+y + 8})"/>`).join('')}
    <rect x="88" y="66" width="30" height="40" rx="12" fill="${COL.red}"/>
    <rect x="92" y="78" width="22" height="4" fill="${COL.ink}"/>
    <rect x="100" y="106" width="6" height="12" fill="${COL.ink}"/>
    <rect x="-84" y="118" width="210" height="6" rx="2" fill="${COL.gray}"/>`,
};

/* ---------- 站点：编号、位置、文案 ---------- */
const STOPS = [
  { id: 'news', door: { x: -20, y: 56,  w: 40, h: 86, c: '#CFE3F7', line: '#fff' },      n: 1, name: 'AI 早报',  en: 'AI Daily',  sub: '每天 8:00 · 三分钟看完 AI 圈',     x: 210,  y: 330, h: 149, accent: COL.blue,   tint: '#EAF2FC', desc: '每天早上 8 点，三分钟读完 AI 圈值得知道的事，外加一个 vibe coding 小技巧。' },
  { id: 'showcase', door: { x: -40, y: 204, w: 30, h: 28, c: '#fff', line: '#F7A6BC' },  n: 2, name: '作品展示', en: 'Showcase',  sub: '社员和分享者的真实项目',            x: 870,  y: 76,  h: 238, accent: COL.pinkD,  tint: '#FDEEF2', desc: '社员和灵感公社分享者用 AI 做出来的真实项目。每一个都从一个念头开始。' },
  { id: 'events', door: { x: -24, y: 160, w: 40, h: 32, c: '#26303B', line: '#FFE600' },    n: 3, name: '活动通知', en: 'Events',    sub: 'Workshop · 灵感公社 · 联合活动',      x: 1190, y: 320, h: 198, accent: '#C9A800',  tint: '#FFFBE0', desc: '个人网站 Workshop、Vibe Commons 灵感公社交流会、跨校联合活动……来现场，和大家一起做东西。' },
  { id: 'about', door: { x: -22, y: 142, w: 44, h: 46, c: '#2F6DC2', line: '#fff' },     n: 4, name: '社团介绍', en: 'About',     sub: '我们是谁 · 我们在做什么',            x: 650,  y: 392, h: 194, accent: COL.pinkD,  tint: '#FFF6F8', desc: '悉尼大学 Vibe Coding 社团：让每一个有想法的人，都能把想法变成自己的产品。' },
  { id: 'tutorial', door: { x: -18, y: 132, w: 36, h: 38, c: '#2F6DC2', line: '#fff' },  n: 5, name: '入门教程', en: 'Start Here',sub: '零基础 · 一个下午做出个人网站',          x: 210,  y: 856, h: 176, accent: COL.blue,   tint: '#FFF8E6', desc: '来自首场 Workshop 的完整流程：聊需求 → Stitch 设计 → 生成网站 → 部署上线。打勾记录进度。' },
  { id: 'wiki', door: { x: -22, y: 86,  w: 44, h: 38, c: '#2F6DC2', line: '#fff' },      n: 6, name: 'VibeWiki', en: 'Wiki',     sub: '概念 · 工具 · 踩坑指南',              x: 650,  y: 884, h: 140, accent: COL.blue,   tint: '#EEF4FB', desc: '社团共建的知识库：那些你不好意思问的名词，都在这里。' },
  { id: 'join', door: { x: -22, y: 210, w: 44, h: 32, c: '#2F6DC2', line: '#fff' },      n: 7, name: '加入我们', en: 'Join Us',   sub: '不会写代码？正好',                    x: 1090, y: 820, h: 248, accent: COL.red,    tint: '#FDEDEC', desc: '不管你学什么专业、会不会写代码，只要你想做点什么，就欢迎你。' },
  { id: 'guestbook', door: { x: -12, y: 62,  w: 32, h: 56, c: '#CFE3F7', line: '#fff' }, n: 8, name: '留言板',   en: 'Messages',  sub: '说点什么吧',                          x: 1430, y: 920, h: 124, accent: COL.red,    tint: '#F5F7FA', desc: '想法、建议、吐槽、求组队，都可以贴在这里。' },
];

/* ---------- 装饰 ---------- */
function tree(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-3" y="-18" width="6" height="18" fill="#8B6A4A"/>
    <circle cx="0" cy="-34" r="18" fill="${COL.green}"/>
    <circle cx="-9" cy="-26" r="11" fill="${COL.green}"/>
    <circle cx="9" cy="-26" r="11" fill="${COL.green}"/>
    <circle cx="6" cy="-26" r="10" fill="${COL.greenD}" opacity=".3"/>
  </g>`;
}
function bike(x, y, c, flip = false) {
  return `<g transform="translate(${x} ${y}) ${flip ? 'scale(-1 1)' : ''}" class="bike">
    <circle cx="-30" cy="-22" r="20" fill="none" stroke="${COL.ink}" stroke-width="4"/>
    <circle cx="30" cy="-22" r="20" fill="none" stroke="${COL.ink}" stroke-width="4"/>
    <path d="M-30 -22 L-6 -22 L16 -50 L-16 -50 Z M-6 -22 L-20 -60 M16 -50 L30 -22 M16 -50 L12 -64" stroke="${c}" stroke-width="5" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M-29 -62 L-12 -62 M5 -66 L20 -66" stroke="${COL.ink}" stroke-width="5" stroke-linecap="round"/>
    <path d="M24 -60 h18 l-3 14 h-14 z" fill="none" stroke="${c}" stroke-width="3"/>
  </g>`;
}
function landmark(x, y) {
  const stripes = Array.from({ length: 6 }, (_, i) => `<rect x="-5" y="${i * 10}" width="10" height="10" fill="${i % 2 ? '#fff' : COL.red}" stroke="${COL.red}" stroke-width="1"/>`).join('');
  return `<g transform="translate(${x} ${y}) scale(1.15)" class="landmark" tabindex="0" role="button" aria-label="Vibe 塔">
    ${stripes}
    <rect x="-18" y="60" width="36" height="14" fill="${COL.light}"/>
    <rect x="-28" y="74" width="56" height="24" rx="5" fill="#DCE1E6"/>
    ${grid(-22, 80, 5, 1, 7, 10, 3, 0, COL.glass)}
    <rect x="-32" y="98" width="64" height="8" fill="${COL.gray}"/>
    <polygon points="-11,106 11,106 16,236 -16,236" fill="#D3DAE2"/>
    <rect x="-3" y="112" width="6" height="110" fill="#fff" opacity=".6"/>
    <path d="M-110 270 C-110 224 -64 210 -40 228 C-26 200 20 198 34 222 C62 206 108 218 110 270 Z" fill="${COL.green}"/>
    <path d="M-70 270 C-60 246 -30 240 -12 252 C6 236 40 240 54 270 Z" fill="${COL.greenD}" opacity=".3"/>
    <text x="0" y="298" text-anchor="middle" class="lbl-s">Vibe 塔 · 信号满格</text>
  </g>`;
}
const pin = n => `<path d="M0 0 C-4 -6 -14 -14 -14 -24 A14 14 0 1 1 14 -24 C14 -14 4 -6 0 0Z" fill="${COL.blue}"/>
  <text x="0" y="-19" text-anchor="middle" class="sg" font-size="15" fill="#fff">${n}</text>`;

const tw = (s, size) => [...s].reduce((w, ch) => w + (/[\u0000-ÿ]/.test(ch) ? size * .55 : size), 0);

/* 可以打开的门：暖光 + 左右两扇门板（覆盖在原来画的门上） */
const DOOR_LIGHT = '#FFF3C4';
function doorway(d) {
  const hw = d.w / 2;
  return `<g class="doorway" transform="translate(${d.x} ${d.y})">
    <path class="door-glow" d="M0 ${d.h} L${d.w} ${d.h} L${d.w + d.w * .9} ${d.h + d.h * .5} L${-d.w * .9} ${d.h + d.h * .5} Z" fill="${DOOR_LIGHT}"/>
    <rect width="${d.w}" height="${d.h}" fill="${DOOR_LIGHT}"/>
    <rect class="leaf leaf-l" width="${hw}" height="${d.h}" fill="${d.c}" stroke="${d.line}" stroke-width="1.5"/>
    <rect class="leaf leaf-r" x="${hw}" width="${hw}" height="${d.h}" fill="${d.c}" stroke="${d.line}" stroke-width="1.5"/>
  </g>`;
}

function stopSVG(s) {
  const titleW = tw(s.name, 30) + 10 + tw(s.en, 17);
  const x0 = -(titleW + 36) / 2;
  const ly = s.h + 46;
  return `<g class="stop" data-id="${s.id}" transform="translate(${s.x} ${s.y})" tabindex="0" role="link" aria-label="${s.n}. ${s.name}">
    <rect x="-140" y="-14" width="280" height="${s.h + 96}" fill="transparent"/>
    <g class="bld">${BUILDINGS[s.id]()}${doorway(s.door)}</g>
    <g class="lbl">
      <g class="pin" transform="translate(${x0 + 14} ${ly + 6})">${pin(s.n)}</g>
      <text x="${x0 + 36}" y="${ly}" class="lbl-t">${s.name}<tspan class="lbl-en" dx="10">${s.en}</tspan></text>
      <text x="0" y="${ly + 26}" text-anchor="middle" class="lbl-s">${s.sub}</text>
    </g>
  </g>`;
}

function renderMap(svg) {
  const roads = [
    'M -20 262 C 300 242 520 332 800 302 S 1300 202 1620 272',
    'M -20 612 C 260 572 420 652 720 632 S 1200 572 1620 622',
    'M 380 -20 C 420 200 320 420 400 720',
    'M 990 -20 C 950 300 1050 560 1010 1220',
    'M 1310 -20 C 1270 300 1350 640 1290 1220',
    'M -20 1010 C 300 970 620 1090 1000 1030 S 1400 970 1620 1050',
    'M 110 720 C 90 900 150 1060 110 1220',
    'M 520 770 C 500 900 560 1100 520 1220',
    'M 1530 420 C 1480 640 1590 900 1530 1220',
  ];
  const thin = [
    'M -20 150 C 200 170 300 110 540 140',
    'M 620 450 C 760 410 880 490 1000 460',
    'M 1060 650 C 1250 700 1400 660 1620 710',
    'M 700 -20 C 690 100 730 200 710 380',
    'M 1100 1130 C 1250 1100 1400 1160 1620 1130',
    'M 240 560 C 300 600 330 680 300 760',
  ];
  const trees = [[50, 600], [455, 520], [1010, 450], [1410, 600], [1570, 520], [40, 830], [360, 900], [1220, 1060],
    [1575, 1160], [320, 1170], [1000, 640], [1360, 420], [470, 336], [1560, 260], [30, 1120], [870, 1150], [1160, 690]];
  const parkTrees = [[480, 900], [820, 900], [470, 1060], [560, 1140], [790, 1120], [860, 1010], [420, 980]];
  const route = [
    'M 330 400 C 480 380 640 300 770 240',
    'M 970 210 C 1080 200 1170 240 1190 300',
    'M 1060 520 C 970 545 860 545 765 520',
    'M 530 520 C 360 560 230 640 214 832',
    'M 330 990 C 400 1020 480 1020 530 984',
    'M 770 984 C 860 1015 940 1005 1000 962',
    'M 1170 920 C 1270 870 1380 860 1420 900',
  ];

  svg.innerHTML = `
  <defs>
    <marker id="arw" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="${COL.blue}"/>
    </marker>
  </defs>
  <rect width="1600" height="1200" fill="#fff"/>
  <g fill="none" stroke="${COL.road}" stroke-linecap="round">
    ${roads.map(d => `<path d="${d}" stroke-width="20"/>`).join('')}
    ${thin.map(d => `<path d="${d}" stroke-width="10"/>`).join('')}
  </g>
  <path d="M 450 860 C 560 800 820 810 900 870 C 960 940 930 1080 800 1130 C 640 1180 450 1150 410 1060 C 370 970 380 900 450 860 Z" fill="${COL.park}"/>
  <text x="845" y="1080" class="lbl-s" text-anchor="middle">灵感公园</text>
  <path class="river" d="M -40 700 C 200 680 330 820 600 800 S 950 740 1150 780 S 1420 860 1640 790" fill="none" stroke="${COL.blue}" stroke-width="56" stroke-linecap="round"/>
  <path d="M -40 700 C 200 680 330 820 600 800 S 950 740 1150 780 S 1420 860 1640 790" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="18 40" opacity=".35" class="ripple"/>
  <text x="900" y="738" class="lbl-s" text-anchor="middle">Vibe 河</text>

  ${trees.map(([x, y]) => tree(x, y)).join('')}
  ${parkTrees.map(([x, y]) => tree(x, y, .8)).join('')}
  ${bike(1250, 160, COL.blue)}
  ${bike(1460, 470, '#7FD1C4', true)}
  ${bike(300, 1180, COL.red)}
  ${bike(1300, 1180, '#F5C842', true)}
  ${landmark(1460, 50)}

  <g class="route" fill="none" stroke="${COL.blue}" stroke-width="4" stroke-dasharray="9 9" stroke-linecap="round">
    ${route.map(d => `<path d="${d}" marker-end="url(#arw)"/>`).join('')}
  </g>

  <g class="title">
    <text x="46" y="118" class="ttl" font-size="96">HELLO</text>
    <image href="assets/logo/icon.png" x="372" y="-6" width="150" height="150" class="mascot"/>
    <text x="46" y="210" class="ttl" font-size="96">VIBERSPACE</text>
    <text x="52" y="254" class="hand" font-size="26" fill="${COL.blue}">${CONFIG.slogan}</text>
  </g>
  <g transform="translate(1565 40)">
    <text x="0" y="0" text-anchor="middle" class="sg" font-size="20" fill="${COL.blue}">N</text>
    <path d="M0 8 L-10 34 L0 28 L10 34 Z" fill="${COL.blue}"/>
  </g>

  ${STOPS.map(stopSVG).join('')}
  `;
}

/* 页面头部用的独立建筑图 */
function buildingSVG(id) {
  const s = STOPS.find(s => s.id === id);
  return `<svg viewBox="-145 -12 290 ${s.h + 24}" aria-hidden="true">${BUILDINGS[id]()}</svg>`;
}
