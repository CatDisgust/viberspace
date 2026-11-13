/* ============================================================
   子页面：每一页都是“走进了地图上的那栋楼”
   ============================================================ */

// 每页的主题色：hero 是顶部底色（取自建筑颜色），accent 是强调色
const THEME = {
  news:      { hero: '#DCEBFA', accent: '#2F6DC2', soft: '#EEF5FD' },
  showcase:  { hero: '#FCDCE5', accent: '#E0628A', soft: '#FEF0F4' },
  events:    { hero: '#FFF06A', accent: '#2F6DC2', soft: '#FFFAD1' },
  about:     { hero: '#FFE4EA', accent: '#E0628A', soft: '#FFF3F6' },
  tutorial:  { hero: '#FFEFC7', accent: '#2F6DC2', soft: '#FFF8E6' },
  wiki:      { hero: '#E1EBF7', accent: '#2F6DC2', soft: '#F1F6FC' },
  join:      { hero: '#FFDCD8', accent: '#E8463B', soft: '#FFF0EE' },
  guestbook: { hero: '#E6ECF2', accent: '#E8463B', soft: '#F4F7FA' },
};

const pinIcon = (n = '') => `<svg class="pin-ico" viewBox="-15 -40 30 41" aria-hidden="true"><path d="M0 0 C-4 -6 -14 -14 -14 -24 A14 14 0 1 1 14 -24 C14 -14 4 -6 0 0Z"/>${n !== '' ? `<text x="0" y="-19" text-anchor="middle">${n}</text>` : '<circle cx="0" cy="-24" r="5" fill="#fff"/>'}</svg>`;
const sh = (kicker, title, extra = '') => `
  <header class="sh"><div><span class="sh-k">${kicker}</span><h2>${title}</h2></div>${extra}</header>`;
const fmtDate = d => `${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
const after = fn => setTimeout(fn);  // 等 innerHTML 写入后再绑定事件

/* ---------- 各页面 ---------- */
const PAGES = {
  /* 1. AI 早报：一张报纸 + 右侧往期目录。#/news/2026-11-05 可直接打开某一期 */
  news(sub) {
    const n = NEWS.find(x => x.date === sub) || NEWS[0];
    const d = parseDate(n.date);
    // **高亮**、__加粗__、`代码`；代码先拆出来，里面的符号不再处理
    const rich = t => esc(t).split(/(`[^`]+`)/).map(part => part.startsWith('`') && part.endsWith('`') && part.length > 1
      ? `<code>${part.slice(1, -1)}</code>`
      : part.replace(/\*\*(.+?)\*\*/g, '<mark>$1</mark>').replace(/__(.+?)__/g, '<b>$1</b>')).join('');
    const paras = b => (Array.isArray(b) ? b : [b]).map(x => `<p>${rich(x)}</p>`).join('');
    let k = 0;
    return `
      <div class="brief">
        <article class="paper">
          <header class="paper-mast">
            <span>${d.getFullYear()} · ${esc(n.weekday)}</span>
            <h2 class="sg">AI DAILY</h2>
            <span class="paper-date sg">${fmtDate(d)}</span>
          </header>
          <div class="paper-sub"><span>AI DAILY BRIEF</span><span>USYD Vibe Coding Club</span></div>
          <p class="brief-lead"><b>${esc(n.leadLabel || '今日看点')}</b>${esc(n.headline)}</p>
          ${n.sections.map(sec => `
            <section class="brief-sec">
              <h3><span class="brief-tag k-${esc(sec.kind)}">${esc(sec.tag)}</span>${esc(sec.name)}</h3>
              <ol class="brief-items">${sec.items.map(it => { k++; return `
                <li><span class="n-no">${String(k).padStart(2, '0')}</span><div><h4>${esc(it.title)}</h4>${paras(it.body)}</div></li>`; }).join('')}
              </ol>
            </section>`).join('')}
          ${n.calendar ? `
            <section class="brief-sec">
              <h3><span class="brief-tag k-calendar">CALENDAR</span>${esc(n.calendar.name || '日程提醒')}</h3>
              <ul class="brief-cal">${n.calendar.items.map(([when, what]) => `<li><b>${esc(when)}</b><span>${rich(what)}</span></li>`).join('')}</ul>
            </section>` : ''}
          ${n.tip ? `<aside class="brief-tip"><b>编辑提醒</b><p>${rich(n.tip)}</p></aside>` : ''}
          <footer class="brief-src"><b>USYD Vibe Coding Club 出品</b><span>信息来源：${esc(n.sources || '')} ｜ 整理于 ${n.date.replace(/-/g, '.')}</span></footer>
        </article>

        <aside class="issues">
          <h3>往期早报 <small>${NEWS.length} 期</small></h3>
          ${NEWS.map(x => { const xd = parseDate(x.date); return `
            <a class="issue${x === n ? ' on' : ''}" href="#/news/${x.date}">
              <span class="issue-d sg">${fmtDate(xd)}</span><span class="issue-w">${esc(x.weekday)}</span>
              <small>${esc(x.headline)}</small>
            </a>`; }).join('')}
          <p class="issues-note">${pinIcon()}<span>想第一时间收到？${CONFIG.wechat ? `关注 <b>${esc(CONFIG.wechat)}</b>，或` : ''}<a href="#/join">加入我们</a>后进入社群。</span></p>
        </aside>
      </div>`;
  },

  /* 2. 作品展示：一排排亮着灯的窗户 */
  showcase() {
    const tags = ['全部', ...new Set(WORKS.flatMap(w => w.tags))];
    after(() => {
      const draw = tag => {
        $('#works').innerHTML = WORKS.filter(w => tag === '全部' || w.tags.includes(tag)).map(w => {
          const el = w.link ? 'a' : 'div';
          const attrs = w.link ? ` href="${esc(w.link)}" target="_blank" rel="noopener"` : '';
          return `
          <${el} class="work${w.link ? ' linked' : ''}"${attrs} style="--c:${w.color}">
            <div class="work-cover">
              ${w.img ? `<img src="${esc(w.img)}" alt="" loading="lazy">` : `<span class="work-initial sg">${esc([...w.title][0])}</span>`}
              <span class="work-src">${w.hours ? `${w.hours}h vibe · ` : ''}${esc(w.source || '')}</span>
            </div>
            <div class="work-body">
              <h3>${esc(w.title)}${w.link ? '<span class="arrow">↗</span>' : ''}</h3>
              <p>${esc(w.desc)}</p>
              <footer><span>${esc(w.author)}</span><span>${w.tags.map(t => `#${esc(t)}`).join(' ')}</span></footer>
            </div>
          </${el}>`;
        }).join('');
      };
      draw('全部');
      $('#workChips').addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        document.querySelectorAll('#workChips button').forEach(c => c.classList.toggle('on', c === b));
        draw(b.dataset.tag);
      });
    });
    return `
      ${sh('GALLERY', '真实项目', `<div class="filters" id="workChips">${tags.map((t, i) => `<button class="${i ? '' : 'on'}" data-tag="${esc(t)}">${esc(t)}</button>`).join('')}</div>`)}
      <div class="works" id="works"></div>
      <div class="note-strip">${pinIcon()}<p>做了好东西？在 <a href="#/guestbook">留言板</a> 贴出链接，我们会收录到这里。</p></div>`;
  },

  /* 3. 活动通知：即将开始的是一张票，往期是一本相册 */
  events() {
    const t = today();
    const sorted = [...EVENTS].sort((a, b) => parseDate(a.date) - parseDate(b.date));
    const up = sorted.filter(e => parseDate(e.date) >= t);
    const past = sorted.filter(e => parseDate(e.date) < t).reverse();
    const ticket = e => {
      const d = parseDate(e.date), days = Math.round((d - t) / 864e5);
      return `
      <article class="ticket">
        ${e.cover ? `<button class="ticket-poster" data-zoom="${esc(e.cover)}" data-cap="${esc(e.title)}" aria-label="查看海报大图"><img src="${esc(e.cover)}" alt="${esc(e.title)} 海报"></button>` : ''}
        <div class="ticket-main">
          <div class="ticket-top"><span class="pill">${esc(e.type)}</span><span class="count">${days === 0 ? '就是今天！' : `还有 ${days} 天`}</span></div>
          <h3>${esc(e.title)}</h3>
          <dl class="meta">
            <div><dt>日期</dt><dd>${d.getMonth() + 1} 月 ${d.getDate()} 日 ${WEEK[d.getDay()]}</dd></div>
            <div><dt>时间</dt><dd>${esc(e.time)}</dd></div>
            <div><dt>地点</dt><dd>${esc(e.place)}</dd></div>
          </dl>
          <p>${esc(e.desc)}</p>
          ${e.link ? `<a class="btn" href="${esc(e.link)}" target="_blank" rel="noopener">${esc(e.linkText || '查看详情')} ↗</a>` : ''}
        </div>
        <div class="ticket-stub" aria-hidden="true"><span class="sg">${fmtDate(d)}</span><small>FREE ENTRY</small></div>
      </article>`;
    };
    const recap = e => {
      const d = parseDate(e.date);
      const list = e.photos?.length ? e.photos : [];
      const coverPhoto = e.cover ? (list.find(p => p.src === e.cover) || { src: e.cover, cap: e.title }) : null;
      const photos = coverPhoto ? [coverPhoto, ...list.filter(p => p !== coverPhoto)] : list;
      return `
      <article class="recap">
        <div class="recap-photos">${photos.slice(0, 5).map((p, i) => `<button class="${i ? '' : 'big'}" data-zoom="${esc(p.src)}" data-cap="${esc(p.cap)}"><img src="${esc(p.src)}" alt="${esc(p.cap)}" loading="lazy"></button>`).join('')}
          ${photos.length > 5 ? `<span class="more">+${photos.length - 5}</span>` : ''}</div>
        <div class="recap-text">
          <span class="recap-date sg">${d.getFullYear()}.${fmtDate(d)}</span>
          <span class="pill ghost">${esc(e.type)}</span>
          <h3>${esc(e.title)}</h3>
          <p class="recap-meta">${esc(e.time)} · ${esc(e.place)}</p>
          <p>${esc(e.desc)}</p>
          ${e.link ? `<a class="link" href="${esc(e.link)}" target="_blank" rel="noopener">${esc(e.linkText || '查看详情')} ↗</a>` : ''}
          ${photos.length > 5 ? `<div class="recap-more">${photos.slice(5).map(p => `<button data-zoom="${esc(p.src)}" data-cap="${esc(p.cap)}"><img src="${esc(p.src)}" alt="${esc(p.cap)}" loading="lazy"></button>`).join('')}</div>` : ''}
        </div>
      </article>`;
    };
    return `
      ${sh('UPCOMING', '即将开始')}
      ${up.length ? up.map(ticket).join('') : '<p class="empty">下一场活动正在筹备中，敬请期待。</p>'}
      ${sh('RECAP', '往期回顾')}
      ${past.map(recap).join('')}`;
  },

  /* 4. 社团介绍 */
  about() {
    const heights = [78, 100, 62, 86];
    const colors = ['#CFE3F7', '#F7A6BC', '#FFE600', '#D6EE9C'];
    return `
      <section class="mission">
        <img class="mission-logo" src="${esc(ABOUT.logo)}" alt="ViberSpace — USYD Vibe Coding Club — Vibe Your Own Product!">
        <p class="mission-k">OUR MISSION</p>
        <blockquote>让每一个<mark>有想法</mark>的人，都能把想法变成<mark>自己的产品</mark>。</blockquote>
        <div class="mission-text">${ABOUT.intro.map(p => `<p>${esc(p)}</p>`).join('')}</div>
      </section>

      <figure class="hero-photo"><button data-zoom="${esc(ABOUT.photo.src)}" data-cap="${esc(ABOUT.photo.cap)}"><img src="${esc(ABOUT.photo.src)}" alt="${esc(ABOUT.photo.cap)}"></button><figcaption>${esc(ABOUT.photo.cap)}</figcaption></figure>

      ${sh('IN NUMBERS', '社团小天际线')}
      <div class="skyline">${ABOUT.stats.map((s, i) => `
        <div class="tower" style="--h:${heights[i]}%;--c:${colors[i]}"><b class="sg">${esc(s.n)}</b><span>${esc(s.label)}</span></div>`).join('')}
      </div>

      ${sh('WHAT WE BELIEVE', '我们相信')}
      <div class="values">${ABOUT.values.map((v, i) => `
        <div class="value" style="--c:${v.color}"><span class="sg">0${i + 1}</span><h3>${esc(v.title)}</h3><p>${esc(v.text)}</p></div>`).join('')}
      </div>

      ${sh('OUR ROUTE', '一路走来')}
      <ol class="route-line">${ABOUT.timeline.map((t, i) => `
        <li>${pinIcon(i + 1)}<b class="sg">${esc(t.when)}</b><span>${esc(t.what)}</span></li>`).join('')}
      </ol>

      ${sh('THE TEAM', '核心团队')}
      <div class="team">${ABOUT.team.map(m => `
        <div class="member"><div class="avatar" style="--c:${m.color}">${esc([...m.name][0])}</div><b>${esc(m.name)}</b><span>${esc(m.role)}</span></div>`).join('')}
      </div>`;
  },

  /* 5. 入门教程：一条从起点到上线的路线 */
  tutorial() {
    const done = store.get('vs-tutorial', {});
    const total = TUTORIALS.reduce((n, l) => n + l.steps.length, 0);
    after(() => {
      const upd = () => {
        const n = Object.values(done).filter(Boolean).length;
        $('#progText').textContent = n === total ? '全部完成！你已经是一个 vibe coder 了 🎉' : `已完成 ${n} / ${total} 步`;
        $('#progBike').style.left = `${(n / total) * 100}%`;
        $('#progFill').style.width = `${(n / total) * 100}%`;
        TUTORIALS.forEach(l => {
          const all = l.steps.every((_, i) => done[`${l.lv}-${i}`]);
          document.querySelector(`.lvl[data-lv="${l.lv}"]`).classList.toggle('done', all);
        });
      };
      upd();
      document.querySelectorAll('.lvl input').forEach(cb => cb.addEventListener('change', () => {
        done[cb.dataset.k] = cb.checked; store.set('vs-tutorial', done); upd();
      }));
    });
    return `
      <div class="ride">
        <div class="ride-top"><b id="progText"></b><span>进度保存在这台设备上</span></div>
        <div class="ride-road"><i id="progFill"></i><span id="progBike" class="ride-bike" aria-hidden="true">🚲</span><span class="ride-flag" aria-hidden="true">🏁</span></div>
      </div>
      <ol class="lvls">
      ${TUTORIALS.map(l => `
        <li class="lvl" data-lv="${l.lv}" style="--c:${l.color}">
          <div class="lvl-pin">${pinIcon(l.lv)}</div>
          <section class="lvl-card">
            <header><span class="sg">LV.${l.lv}</span><h3>${esc(l.title)}</h3><span class="lvl-time">${esc(l.time)}</span></header>
            <ul>${l.steps.map((s, i) => { const k = `${l.lv}-${i}`; return `
              <li><label><input type="checkbox" data-k="${k}" ${done[k] ? 'checked' : ''}><span class="box" aria-hidden="true"></span><span><b>${esc(s.t)}</b><small>${esc(s.d)}</small></span></label></li>`; }).join('')}</ul>
          </section>
        </li>`).join('')}
      </ol>
      <div class="note-strip">${pinIcon()}<p>卡住了？去 <a href="#/wiki">VibeWiki</a> 找找答案，或者来 <a href="#/events">活动现场</a> 问问身边做过的人。</p></div>`;
  },

  /* 6. VibeWiki：图书馆 */
  wiki(sub) {
    const cats = [...new Set(WIKI.map(w => w.cat))];
    const cur = WIKI.find(w => w.id === sub) || WIKI[0];
    after(() => {
      $('#wikiQ').addEventListener('input', e => {
        const q = e.target.value.trim().toLowerCase();
        document.querySelectorAll('#wikiNav a').forEach(a => { a.hidden = q && !a.dataset.s.includes(q); });
      });
    });
    return `
      <div class="wiki">
        <aside class="shelf">
          <label class="search"><span aria-hidden="true">⌕</span><input type="search" id="wikiQ" placeholder="搜索词条" aria-label="搜索词条"></label>
          <nav id="wikiNav">${cats.map(c => `<h4>${esc(c)}</h4>${WIKI.filter(w => w.cat === c).map(w => `<a href="#/wiki/${w.id}" class="${w.id === cur.id ? 'on' : ''}" data-s="${esc((w.title + w.summary).toLowerCase())}">${esc(w.title)}</a>`).join('')}`).join('')}</nav>
        </aside>
        <article class="entry">
          <span class="entry-k">${esc(cur.cat)}</span>
          <h2>${esc(cur.title)}</h2>
          <p class="entry-lead">${esc(cur.summary)}</p>
          <div class="entry-body">${cur.body.map(p => `<p>${p}</p>`).join('')}</div>
          ${cur.related?.length ? `<footer class="entry-rel"><span>相关词条</span>${cur.related.map(id => WIKI.find(w => w.id === id)).filter(Boolean).map(w => `<a href="#/wiki/${w.id}">${esc(w.title)} →</a>`).join('')}</footer>` : ''}
        </article>
      </div>
      <div class="note-strip">${pinIcon()}<p>想补充词条或纠错？去 <a href="#/guestbook">留言板</a> 告诉我们。</p></div>`;
  },

  /* 7. 加入我们 */
  join() {
    after(() => {
      $('#joinForm').addEventListener('submit', async e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        data.at = new Date().toISOString();
        if (CONFIG.joinFormEndpoint) {
          try {
            const r = await fetch(CONFIG.joinFormEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
            if (!r.ok) throw new Error(r.status);
          } catch { toast('提交失败了，稍后再试试？'); return; }
        } else {
          const all = store.get('vs-join', []); all.push(data); store.set('vs-join', all);
          console.warn('[ViberSpace] 未配置 CONFIG.joinFormEndpoint，报名只保存在本地 localStorage(vs-join)');
        }
        e.target.innerHTML = `<div class="done"><div class="done-big">🎉</div><h3>收到啦，${esc(data.name)}！</h3><p>我们会在 3 天内联系你。先去 <a href="#/tutorial">入门教程</a> 热热身吧。</p></div>`;
      });
    });
    return `
      ${sh('HOW TO JOIN', '三步加入')}
      <ol class="steps">${JOIN.steps.map((s, i) => `<li><span class="step-n sg">${i + 1}</span><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></li>`).join('')}</ol>
      <div class="join-grid">
        <form class="form" id="joinForm">
          <header><h3>报名表</h3><span>约 2 分钟</span></header>
          <label>怎么称呼你 <em>*</em><input name="name" required maxlength="40"></label>
          <label>学院 / 年级<input name="major" maxlength="60" placeholder="例如：设计学院 · 大二"></label>
          <label>联系方式 <em>*</em><input name="contact" required maxlength="80" placeholder="微信号或邮箱"></label>
          <fieldset><legend>写过代码吗？</legend>
            ${['完全没有', '写过一点', '比较熟练'].map((o, i) => `<label class="opt"><input type="radio" name="level" value="${o}" ${i ? '' : 'checked'}><span>${o}</span></label>`).join('')}
          </fieldset>
          <label>你最想做出来的东西是？<textarea name="idea" rows="3" maxlength="400" placeholder="一个念头就行，比如：帮我自动抢自习室的工具"></textarea></label>
          <button class="btn" type="submit">提交报名 →</button>
        </form>
        <div class="faq">
          <h3>常见问题</h3>
          ${JOIN.faq.map(f => `<details><summary>${esc(f.q)}<span class="arc-plus" aria-hidden="true"></span></summary><p>${esc(f.a)}</p></details>`).join('')}
          <p class="faq-more">${CONFIG.email ? `其他问题：<a href="mailto:${esc(CONFIG.email)}">${esc(CONFIG.email)}</a>` : '其他问题：在 <a href="#/guestbook">留言板</a> 问我们。'}</p>
        </div>
      </div>`;
  },

  /* 8. 留言板：一面贴满便利贴的墙 */
  guestbook() {
    const colors = ['#FFE600', '#F7A6BC', '#CFE3F7', '#D6EE9C', '#FFD9B8'];
    after(() => {
      const form = $('#noteForm');
      const draw = () => {
        const mine = store.get('vs-notes', []);
        const all = [...mine, ...[...SEED_MESSAGES].reverse()];
        $('#board').querySelectorAll('.note:not(.note-new)').forEach(n => n.remove());
        $('#board').insertAdjacentHTML('beforeend', all.map((m, i) => `
          <div class="note" style="--bg:${esc(m.color)};--r:${((i * 37) % 7) - 3}deg">
            <p>${esc(m.text)}</p><footer><b>${esc(m.name || '匿名')}</b><span>${esc(m.at)}</span></footer>
          </div>`).join(''));
      };
      draw();
      form.addEventListener('change', e => { if (e.target.name === 'color') form.style.setProperty('--bg', e.target.value); });
      form.addEventListener('submit', e => {
        e.preventDefault();
        const f = new FormData(form);
        const text = f.get('text').trim(); if (!text) return;
        const d = new Date();
        const mine = store.get('vs-notes', []);
        mine.unshift({ name: f.get('name').trim(), text, color: f.get('color'), at: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` });
        store.set('vs-notes', mine);
        form.reset(); form.style.setProperty('--bg', colors[0]); draw(); toast('贴好啦 📌');
      });
    });
    return `
      <div class="board" id="board">
        <form class="note note-new" id="noteForm" style="--bg:${colors[0]};--r:-1.5deg">
          <b class="note-new-t">写一张便利贴</b>
          <textarea name="text" rows="4" maxlength="200" required placeholder="想法、建议、吐槽、求组队…" aria-label="留言内容"></textarea>
          <input name="name" maxlength="20" placeholder="署名（可留空）" aria-label="署名">
          <div class="note-new-foot">
            <div class="swatches">${colors.map((c, i) => `<label><input type="radio" name="color" value="${c}" ${i ? '' : 'checked'}><span style="background:${c}"></span></label>`).join('')}</div>
            <button class="btn btn-ink" type="submit">贴上去</button>
          </div>
        </form>
      </div>`;
  },
};

/* ---------- 页面外壳：顶部 + 内容 + 路牌 ---------- */
function renderPage(id, sub) {
  const i = STOPS.findIndex(s => s.id === id);
  const s = STOPS[i], th = THEME[id];
  const prev = STOPS[i - 1], next = STOPS[i + 1];
  const view = $('#pageView');
  view.style.setProperty('--hero', th.hero);
  view.style.setProperty('--accent', th.accent);
  view.style.setProperty('--soft', th.soft);
  const sign = (t, dir) => t
    ? `<a class="sign ${dir}" href="#/${t.id}"><small>${dir === 'l' ? '← 上一站' : '下一站 →'}</small><span><i class="sg">${t.n}</i>${t.name}</span></a>`
    : `<a class="sign ${dir}" href="#/"><small>${dir === 'l' ? '← 起点' : '终点 →'}</small><span>回到地图</span></a>`;
  view.innerHTML = `
    <div class="page page--${id}">
      <section class="ph">
        <div class="wrap ph-in">
          <div class="ph-text">
            <nav class="crumb" aria-label="位置"><a href="#/">← 地图</a><span aria-hidden="true">/</span>${pinIcon(s.n)}<span>${s.name}</span></nav>
            <p class="ph-en sg" aria-hidden="true" style="--len:${Math.max(4, s.en.length)}">${esc(s.en.toUpperCase())}</p>
            <h1>${s.name}</h1>
            <p class="ph-desc">${esc(s.desc)}</p>
          </div>
          <div class="ph-art hero-bld">${buildingSVG(id)}</div>
        </div>
        <div class="street" aria-hidden="true"></div>
      </section>
      <div class="wrap page-body">${PAGES[id](sub)}</div>
      <nav class="wrap signs" aria-label="上一站 / 下一站">
        ${sign(prev, 'l')}
        <a class="signs-home" href="#/" aria-label="回到地图">${pinIcon()}<span>地图</span></a>
        ${sign(next, 'r')}
      </nav>
    </div>`;
}
