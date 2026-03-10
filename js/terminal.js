// ── Terminal engine ──

const out  = document.getElementById('out');
const inp  = document.getElementById('inp');
const curSection = document.getElementById('cur-section');
const appEl = document.getElementById('app');
const deskIcons = document.getElementById('desk-icons');
const tbarApps = document.getElementById('tbar-apps');
const tbarTerminal = document.getElementById('tbar-terminal');

let cmdHistory = [];
let histIdx = -1;

// ── Drag helper ──

function makeDraggable(win, handle) {
  let offsetX = 0, offsetY = 0, dragging = false;

  handle.style.cursor = 'grab';

  handle.addEventListener('mousedown', e => {
    if (e.target.classList.contains('dot')) return;
    dragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    handle.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    win.style.left = (e.clientX - offsetX) + 'px';
    win.style.top = (e.clientY - offsetY) + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    handle.style.cursor = 'grab';
  });
}

// ── Helper functions ──

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls)  e.className = cls;
  if (html) e.innerHTML = html;
  return e;
}

function line(html, cls = '') {
  out.appendChild(el('span', 'l ' + cls, html));
  scroll();
}

function sp(small) {
  out.appendChild(el('span', small ? 'sp-sm' : 'sp'));
}

function scroll() {
  out.scrollTop = out.scrollHeight;
}

function promptLine(cmd) {
  line(
    `<span class="prompt">` +
    `<span class="p-user">guest</span>` +
    `<span class="p-at">@</span>` +
    `<span class="p-host">port.os</span>` +
    `<span class="p-sep">:</span>` +
    `<span class="p-path">~</span>` +
    `<span class="p-sym">$</span>` +
    `</span> <span class="c-cmd">${cmd}</span>`,
    'fade-in'
  );
}

// ── Terminal window management ──

let terminalMinimized = false;
let terminalOpen = true;
let terminalMaximized = false;
const terminalOriginalStyle = {};

function minimizeTerminal() {
  terminalMinimized = true;
  appEl.classList.add('minimized');
  tbarTerminal.classList.remove('focused');
  // keep 'open' to show background dot
}

function restoreTerminal() {
  terminalMinimized = false;
  terminalOpen = true;
  appEl.classList.remove('minimized');
  tbarTerminal.classList.add('open');
  tbarTerminal.classList.add('focused');
  focusWindow('terminal');
  inp.focus();
}

function toggleTerminal() {
  if (!terminalOpen) {
    restoreTerminal();
  } else if (terminalMinimized) {
    restoreTerminal();
  } else if (focusedWindow === 'terminal') {
    minimizeTerminal();
  } else {
    focusWindow('terminal');
    inp.focus();
  }
}

function closeTerminal() {
  terminalOpen = false;
  terminalMinimized = false;
  appEl.classList.add('minimized');
  appEl.classList.remove('focused');
  tbarTerminal.classList.remove('focused', 'open');
  // clear terminal output and show welcome on reopen
  out.innerHTML = '';
  printWelcome();
  // focus another open window if any
  const openApp = Object.keys(appWindows).find(p => appWindows[p] && appWindows[p].open);
  if (openApp) focusWindow(openApp);
}

function maximizeTerminal() {
  if (terminalMaximized) {
    appEl.style.top = '50%';
    appEl.style.left = '50%';
    appEl.style.right = 'auto';
    appEl.style.bottom = 'auto';
    appEl.style.width = '55rem';
    appEl.style.height = '40rem';
    appEl.style.transform = 'translate(-50%, -50%)';
    terminalMaximized = false;
  } else {
    appEl.style.top = '0';
    appEl.style.left = '0';
    appEl.style.right = '0';
    appEl.style.bottom = '3.429rem';
    appEl.style.width = 'auto';
    appEl.style.height = 'auto';
    appEl.style.transform = 'none';
    terminalMaximized = true;
  }
}

// ── Window focus management ──

let focusedWindow = 'terminal';
let zCounter = 20;

function focusWindow(id) {
  focusedWindow = id;
  zCounter++;
  // Update terminal
  if (id === 'terminal') {
    appEl.classList.add('focused');
    tbarTerminal.classList.add('focused');
    appEl.style.zIndex = zCounter;
  } else {
    appEl.classList.remove('focused');
    tbarTerminal.classList.remove('focused');
    // keep 'open' class if terminal is not closed
  }
  // Update app windows
  document.querySelectorAll('.app-window').forEach(w => {
    if (w.id === 'appwin-' + id) {
      w.style.zIndex = zCounter;
      w.classList.add('focused');
    } else {
      w.classList.remove('focused');
    }
  });
  // Update taskbar
  document.querySelectorAll('#tbar-apps .tbar-app').forEach(tb => {
    tb.classList.toggle('focused', tb.dataset.app === id);
  });
}

// ── App window system ──

const appWindows = {};

const SVG_ICONS = {
  terminal: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>',
  whoami: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  projects: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
  skills: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  contact: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
};

const appMeta = {
  whoami:   { icon: SVG_ICONS.whoami,   titleKey: 'app.whoami.title',   labelKey: 'app.whoami.label',   color: 'var(--green)',  pos: { top: '4.286rem',  left: '8.571rem', w: '38.571rem', h: '31.429rem' } },
  projects: { icon: SVG_ICONS.projects, titleKey: 'app.projects.title', labelKey: 'app.projects.label', color: 'var(--blue)',   pos: { top: '3.571rem',  left: '14.286rem', w: '48.571rem', h: '40rem' } },
  skills:   { icon: SVG_ICONS.skills,   titleKey: 'app.skills.title',   labelKey: 'app.skills.label',   color: 'var(--amber)',  pos: { top: '5rem',  left: '20rem', w: '37.143rem', h: '32.857rem' } },
  contact:  { icon: SVG_ICONS.contact,  titleKey: 'app.contact.title',  labelKey: 'app.contact.label',  color: 'var(--red)',    pos: { top: '5.714rem',  left: '11.429rem', w: '34.286rem', h: '29.286rem' } },
};

function buildAppContent(pkg) {
  if (pkg === 'whoami') {
    return `
      <div class="section-head"><span class="sh-text">whoami</span><span class="sh-line"></span></div>
      <div class="info-grid">
        <span class="ig-key">${t('whoami.label.name')}</span><span class="ig-val c-bright">João Vitor Vale da Cruz</span>
        <span class="ig-key">${t('whoami.label.role')}</span><span class="ig-val">${t('whoami.role')}</span>
        <span class="ig-key">${t('whoami.label.location')}</span><span class="ig-val">${t('whoami.location')}</span>
        <span class="ig-key">${t('whoami.label.status')}</span><span class="ig-val c-green">${t('whoami.status')}</span>
        <span class="ig-key">${t('whoami.label.focus')}</span><span class="ig-val">${t('whoami.focus')}</span>
      </div>
      <p style="color:var(--mid);font-size:0.929rem;line-height:1.8;margin-bottom:0.929rem;max-width:40rem">${t('whoami.bio')}</p>
      <div class="tags">
        <span class="tag">${t('whoami.tag.datastructures')}</span>
        <span class="tag">${t('whoami.tag.webdev')}</span>
        <span class="tag">${t('whoami.tag.mobiledev')}</span>
        <span class="tag">${t('whoami.tag.creativesolutions')}</span>
      </div>
      <div class="section-head" style="margin-top:1.143rem">
        <span class="sh-text">${t('whoami.hobbies.title')}</span>
        <span class="sh-line"></span>
      </div>
      <div class="tags">
        <div class="tag-expand tag-green">
          <span class="tag tag-parent">${t('whoami.hobby.games')}</span>
          <div class="tag-children">
            <span class="tag">${t('whoami.hobby.games.arthistory')}</span>
            <span class="tag">${t('whoami.hobby.games.indie')}</span>
            <span class="tag">${t('whoami.hobby.games.fps')}</span>
            <span class="tag">${t('whoami.hobby.games.horror')}</span>
          </div>
        </div>
        <div class="tag-expand tag-blue">
          <span class="tag tag-parent">${t('whoami.hobby.music')}</span>
          <div class="tag-children">
            <span class="tag">${t('whoami.hobby.music.rnb')}</span>
            <span class="tag">${t('whoami.hobby.music.hiphop')}</span>
            <span class="tag">${t('whoami.hobby.music.mpb')}</span>
            <span class="tag">${t('whoami.hobby.music.pagode')}</span>
            <span class="tag">${t('whoami.hobby.music.rock')}</span>
          </div>
        </div>
        <div class="tag-expand tag-amber">
          <span class="tag tag-parent">${t('whoami.hobby.animanga')}</span>
          <div class="tag-children">
            <span class="tag">${t('whoami.hobby.animanga.vinland')}</span>
            <span class="tag">${t('whoami.hobby.animanga.onepiece')}</span>
            <span class="tag">${t('whoami.hobby.animanga.bebop')}</span>
          </div>
        </div>
        <div class="tag-expand tag-red">
          <span class="tag tag-parent">${t('whoami.hobby.movies')}</span>
          <div class="tag-children">
            <span class="tag">${t('whoami.hobby.movies.arrival')}</span>
            <span class="tag">${t('whoami.hobby.movies.secretagent')}</span>
            <span class="tag">${t('whoami.hobby.movies.soul')}</span>
          </div>
        </div>
      </div>`;
  }
  if (pkg === 'projects') {
    const projects = getProjectsData();
    return `
      <div class="section-head"><span class="sh-text">projects</span><span class="sh-line"></span></div>
      <div class="proj-list">${projects.map(p => buildProjectCard(p)).join('')}
      </div>`;
  }
  if (pkg === 'skills') {
    const groups = getSkillsData();
    return `
      <div class="section-head"><span class="sh-text">skills</span><span class="sh-line"></span></div>
      ${groups.map(g => `<div class="skill-group"><div class="sg-title">${g.title}</div>
        <div class="skill-badges">${g.skills.map(s => `<div class="sk-badge"><img src="${getSkillBadge(s)}" alt="${s}" loading="lazy"/><span>${s}</span></div>`).join('')}</div>
      </div>`).join('')}`;
  }
  if (pkg === 'contact') {
    const items = getContactData();
    return `
      <div class="section-head"><span class="sh-text">contact</span><span class="sh-line"></span></div>
      <div class="contact-list">${items.map(i => {
        if (i.key === 'email') {
          return `<div class="contact-row contact-clickable" data-copy="${i.val}">
            <span class="cr-icon">${contactIcon(i.key)}</span>
            <span class="cr-key">${i.key}</span>
            <span class="cr-val">${i.val}</span>
            <span class="cr-copied">${t('contact.copied') || 'copiado!'}</span>
          </div>`;
        }
        return `<a href="${i.val}" target="_blank" rel="noopener noreferrer" class="contact-row contact-clickable">
          <span class="cr-icon">${contactIcon(i.key)}</span>
          <span class="cr-key">${i.key}</span>
          <span class="cr-val">${i.val}</span>
        </a>`;
      }).join('')}
      </div>`;
  }
  return '';
}

function addDesktopIcon(pkg) {
  const meta = appMeta[pkg];
  if (!meta) return;

  // Find next free grid cell (grid: 6.929rem x 6.929rem, padding: 0.929rem)
  const REM = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const GRID_W = 6.929 * REM, GRID_H = 6.929 * REM, GRID_PAD_X = 0.929 * REM, GRID_PAD_Y = 0.929 * REM;
  const occupied = new Set();
  deskIcons.querySelectorAll('.desk-icon').forEach(ic => {
    const col = Math.round((parseFloat(ic.style.left) - GRID_PAD_X) / GRID_W);
    const row = Math.round((parseFloat(ic.style.top) - GRID_PAD_Y) / GRID_H);
    occupied.add(col + ',' + row);
  });
  let col = 0, row = 0;
  while (occupied.has(col + ',' + row)) {
    row++;
    if (GRID_PAD_Y + row * GRID_H > window.innerHeight - 100) { row = 0; col++; }
  }

  // Desktop icon with absolute positioning
  const icon = document.createElement('div');
  icon.className = 'desk-icon';
  icon.dataset.app = pkg;
  icon.style.left = (GRID_PAD_X + col * GRID_W) + 'px';
  icon.style.top  = (GRID_PAD_Y + row * GRID_H) + 'px';
  icon.ondblclick = () => { if (!icon.dataset.justDragged) openAppWindow(pkg); };
  icon.innerHTML = `
    <div class="desk-icon-img" style="background:linear-gradient(135deg, ${meta.color}, var(--muted))">${meta.icon}</div>
    <span class="desk-icon-label">${t(meta.labelKey)}</span>`;
  deskIcons.appendChild(icon);

  // Taskbar entry
  const tba = document.createElement('div');
  tba.className = 'tbar-app';
  tba.dataset.app = pkg;
  tba.onclick = () => toggleAppWindow(pkg);
  tba.innerHTML = `
    <span class="tbar-emoji">${meta.icon}</span>
    <span class="tbar-name">${t(meta.labelKey)}</span>
    <span class="tbar-dot"></span>`;
  tbarApps.appendChild(tba);
}

function openAppWindow(pkg) {
  const meta = appMeta[pkg];
  if (!meta) return;

  let win = document.getElementById('appwin-' + pkg);

  if (!win) {
    // Create window
    win = document.createElement('div');
    win.className = 'app-window';
    win.id = 'appwin-' + pkg;
    win.style.top = meta.pos.top;
    win.style.left = meta.pos.left;
    win.style.width = meta.pos.w;
    win.style.height = meta.pos.h;
    win.onclick = () => focusWindow(pkg);

    win.innerHTML = `
      <div class="aw-titlebar">
        <div class="tb-dots">
          <div class="dot r" onclick="closeAppWindow('${pkg}');event.stopPropagation()"></div>
          <div class="dot a" onclick="minimizeAppWindow('${pkg}');event.stopPropagation()"></div>
          <div class="dot g"></div>
        </div>
        <span class="aw-title">${t(meta.titleKey)}</span>
      </div>
      <div class="aw-body">${buildAppContent(pkg)}</div>`;

    document.body.insertBefore(win, document.getElementById('taskbar'));
    appWindows[pkg] = { open: true, minimized: false };

    // Make window draggable by titlebar
    makeDraggable(win, win.querySelector('.aw-titlebar'));

    // Init project toggles if projects window
    if (pkg === 'projects') initProjectToggles(win);
    if (pkg === 'contact') initContactCopy(win);
    if (pkg === 'whoami') initTagExpanders(win);

  } else {
    win.classList.remove('hidden');
    appWindows[pkg].open = true;
    appWindows[pkg].minimized = false;
  }

  // Mark taskbar as open
  const tba = document.querySelector(`#tbar-apps .tbar-app[data-app="${pkg}"]`);
  if (tba) tba.classList.add('open');

  focusWindow(pkg);
}

function closeAppWindow(pkg) {
  const win = document.getElementById('appwin-' + pkg);
  if (win) {
    win.classList.add('hidden');
    appWindows[pkg].open = false;
    appWindows[pkg].minimized = false;
  }
  const tba = document.querySelector(`#tbar-apps .tbar-app[data-app="${pkg}"]`);
  if (tba) tba.classList.remove('open', 'focused');
}

function minimizeAppWindow(pkg) {
  const win = document.getElementById('appwin-' + pkg);
  if (win) {
    win.classList.add('hidden');
    appWindows[pkg].minimized = true;
  }
  const tba = document.querySelector(`#tbar-apps .tbar-app[data-app="${pkg}"]`);
  if (tba) tba.classList.remove('focused');
}

function toggleAppWindow(pkg) {
  if (!appWindows[pkg] || !appWindows[pkg].open) {
    openAppWindow(pkg);
  } else if (appWindows[pkg].minimized) {
    openAppWindow(pkg);
  } else if (focusedWindow === pkg) {
    minimizeAppWindow(pkg);
  } else {
    focusWindow(pkg);
  }
}

// ── Refresh installed apps on language change ──

function refreshInstalledApps() {
  Object.keys(installed).forEach(pkg => {
    if (!installed[pkg]) return;
    const meta = appMeta[pkg];
    if (!meta) return;

    // Update desktop icon label
    const icon = document.querySelector(`.desk-icon[data-app="${pkg}"] .desk-icon-label`);
    if (icon) icon.textContent = t(meta.labelKey);

    // Update taskbar label
    const tba = document.querySelector(`#tbar-apps .tbar-app[data-app="${pkg}"] .tbar-name`);
    if (tba) tba.textContent = t(meta.labelKey);

    // Update app window content & title if it exists
    const win = document.getElementById('appwin-' + pkg);
    if (win) {
      const titleSpan = win.querySelector('.aw-title');
      if (titleSpan) titleSpan.textContent = t(meta.titleKey);
      const body = win.querySelector('.aw-body');
      if (body) {
        body.innerHTML = buildAppContent(pkg);
        if (pkg === 'projects') initProjectToggles(win);
        if (pkg === 'contact') initContactCopy(win);
        if (pkg === 'whoami') initTagExpanders(win);
      }
    }
  });
}

// ── Welcome message ──

function printWelcome() {
  line(`<span class="c-dim">─────────────────────────────────────────────</span>`);
  line(`  <span class="c-bright" style="font-size:1rem;letter-spacing:1px">port.OS</span>  <span class="c-dim">· terminal v1.0</span>`);
  line(`<span class="c-dim">─────────────────────────────────────────────</span>`);
  sp('sm');
  line(`<span class="c-mid">${t('welcome.help')}</span>`);
  sp();
}

// ── Run command ──

function runCmd(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;

  // Make sure terminal is visible when running commands
  if (terminalMinimized) restoreTerminal();

  curSection.textContent = cmd.split(' ')[0];
  promptLine(raw);

  // Handle "apt install <pkg>"
  if (cmd.startsWith('apt install')) {
    const arg = cmd.replace('apt install', '').trim();
    commands['apt install'](arg || null);
    return;
  }

  if (cmd === 'clear') {
    commands.clear();
    return;
  }

  if (commands[cmd]) {
    commands[cmd]();
  } else {
    sp('sm');
    line(`<span class="c-red">command not found:</span> <span class="c-text">${cmd}</span>`, 'fade-in');
    line(`<span class="c-dim">type <span class="c-mid">help</span> for available commands</span>`, 'fade-in');
    sp();
  }
}

// ── Input display sync ──

const inpText = document.querySelector('.inp-text');
const inpPlaceholder = document.querySelector('.inp-placeholder');

function syncInputDisplay() {
  const val = inp.value;
  inpText.textContent = val;
  inpPlaceholder.textContent = val ? '' : t('input.placeholder');
}

// ── Input handling ──

inp.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const v = inp.value.trim();
    if (v) { cmdHistory.unshift(v); histIdx = -1; runCmd(v); }
    inp.value = '';
    syncInputDisplay();
  }
  if (e.key === 'ArrowUp') {
    histIdx = Math.min(histIdx + 1, cmdHistory.length - 1);
    inp.value = cmdHistory[histIdx] || '';
    setTimeout(() => { inp.selectionStart = inp.selectionEnd = inp.value.length; syncInputDisplay(); }, 0);
    e.preventDefault();
  }
  if (e.key === 'ArrowDown') {
    histIdx = Math.max(histIdx - 1, -1);
    inp.value = histIdx < 0 ? '' : cmdHistory[histIdx];
    syncInputDisplay();
    e.preventDefault();
  }
  if (e.key === 'Tab') {
    e.preventDefault();
    const val = inp.value;
    const all = [
      'apt install .', 'apt install whoami', 'apt install projects', 'apt install skills', 'apt install contact',
      'whoami', 'ls projects', 'skills --list', 'contact',
      'theme', 'lang', 'help', 'clear',
    ];
    const m = all.find(c => c.startsWith(val));
    if (m) inp.value = m;
    syncInputDisplay();
  }
});

inp.addEventListener('input', syncInputDisplay);

// Focus terminal input when clicking on it
appEl.addEventListener('click', () => {
  if (!terminalOpen) return;
  focusWindow('terminal');
  inp.focus();
});

// ── Desktop clock ──

function updateDesktopClock() {
  const n = new Date();
  const hm = [n.getHours(), n.getMinutes()].map(v => String(v).padStart(2, '0')).join(':');
  const dcTime = document.getElementById('dc-time');
  const dcDate = document.getElementById('dc-date');
  const tbarClock = document.getElementById('tbar-clock');
  if (dcTime) dcTime.textContent = hm;
  if (tbarClock) tbarClock.textContent = hm;
  if (dcDate) {
    dcDate.textContent = n.toLocaleDateString(currentLang === 'pt' ? 'pt-BR' : 'en-US', {
      weekday: 'long', day: '2-digit', month: 'long'
    });
  }
}

// ── Boot sequence ──

setTimeout(() => {
  document.getElementById('welcome').classList.add('out');
  setTimeout(() => {
    document.getElementById('welcome').style.display = 'none';
    inp.focus();
  }, 600);
}, 2500);

// ── Init ──

updateUILang();
updateThemeIcon();
syncInputDisplay();
updateDesktopClock();
setInterval(updateDesktopClock, 10000);
restoreInstalledState();
printWelcome();
tbarTerminal.classList.add('focused', 'open');

// Make terminal draggable by its topbar
makeDraggable(appEl, document.getElementById('topbar'));
