// ── Portfolio data & command definitions ──

// ── Skill icons (Simple Icons via shields.io) ──
function getSkillBadge(name) {
  const badges = {
    'JavaScript':    'https://cdn.simpleicons.org/javascript/F7DF1E',
    'SQL':           'https://cdn.simpleicons.org/postgresql/4479A1',
    'C':             'https://cdn.simpleicons.org/c/A8B9CC',
    'HTML & CSS':    'https://cdn.simpleicons.org/html5/E34F26',
    'Java':          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    'C#':            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
    'Python':        'https://cdn.simpleicons.org/python/3776AB',
    'React':         'https://cdn.simpleicons.org/react/61DAFB',
    'React Native':  'https://cdn.simpleicons.org/react/61DAFB',
    'FastAPI':       'https://cdn.simpleicons.org/fastapi/009688',
    'Vue.js':        'https://cdn.simpleicons.org/vuedotjs/4FC08D',
    'API':           'https://cdn.simpleicons.org/postman/FF6F00',
    'Deploy':        'https://cdn.simpleicons.org/vercel/FFFFFF',
    'PostgreSQL':    'https://cdn.simpleicons.org/postgresql/4169E1',
    'Git':           'https://cdn.simpleicons.org/git/F05032',
    'Figma':         'https://cdn.simpleicons.org/figma/F24E1E',
    'Trello':        'https://cdn.simpleicons.org/trello/0052CC',
    'Linux':         'https://cdn.simpleicons.org/linux/FCC624',
    'VSCode':        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
    'Node.js':       'https://cdn.simpleicons.org/nodedotjs/339933',
    'Spring Boot':   'https://cdn.simpleicons.org/springboot/6DB33F',
    'Office':        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23D83B01'%3E%3Cpath d='M21.53 4.306v15.363q0 .807-.472 1.433-.472.627-1.253.85l-6.888 1.974q-.136.037-.29.055-.156.019-.293.019-.396 0-.72-.105-.321-.106-.656-.292l-4.505-2.544q-.248-.137-.391-.366-.143-.23-.143-.515 0-.434.304-.738.304-.305.739-.305h5.831V4.964l-4.38 1.563q-.533.187-.856.658-.322.472-.322 1.03v8.078q0 .496-.248.912-.25.416-.683.651l-2.072 1.13q-.286.148-.571.148-.497 0-.844-.347-.348-.347-.348-.844V6.563q0-.62.33-1.19.328-.571.874-.881L11.07.285q.248-.136.534-.21.285-.075.57-.075.211 0 .38.031.166.031.364.093l6.888 1.899q.384.11.7.329.317.217.547.52.23.305.353.67.125.367.125.764zm-1.588 15.363V4.306q0-.273-.16-.478-.163-.204-.423-.28l-3.388-.93q-.397-.111-.794-.23-.397-.117-.794-.216v19.68l4.976-1.427q.26-.074.422-.28.161-.204.161-.477z'/%3E%3C/svg%3E",
    'Redes':         'https://cdn.simpleicons.org/cisco/1BA0D7',
  };
  return badges[name] || `https://cdn.simpleicons.org/${encodeURIComponent(name.toLowerCase())}/888`;
}

// ── Project data & helpers ──

function getProjectsData() {
  return [
    {
      name: 'ETL-ANS',
      desc: t('proj.etlans.desc'),
      tags: ['Python', 'PSQL', 'Vue.js', 'ETL', 'API'],
      status: 'done',
      statusText: 'stable',
      image: 'img/projects/ans.webp',
      deploy: 'https://teste-intuitive-care-deploy.vercel.app/',
      repo: 'https://github.com/joaovale23/teste-intuitive-care',
    },
    {
      name: 'LocVac',
      desc: t('proj.pixel.desc'),
      tags: ['TypeScript', 'Java', 'ReactNative', 'Mobile'],
      status: 'wip',
      statusText: 'wip',
      image: 'img/projects/locvaclogoname.PNG',
      repo: 'https://github.com/claraneves23/LocVac',
    },
  ];
}

function buildProjectCard(p) {
  const deployBtn = p.deploy
    ? `<a href="${p.deploy}" target="_blank" rel="noopener noreferrer" class="proj-btn proj-btn-deploy" onclick="event.stopPropagation()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        ${t('proj.btn.deploy') || 'Deploy'}
      </a>`
    : '';
  const repoBtn = `<a href="${p.repo}" target="_blank" rel="noopener noreferrer" class="proj-btn proj-btn-repo" onclick="event.stopPropagation()">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
      ${t('proj.btn.repo') || 'Repositório'}
    </a>`;

  return `
    <div class="proj proj-expandable">
      <div class="proj-top">
        <span class="proj-name">${p.name}</span>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="proj-status ${p.status}">${p.statusText}</span>
          <span class="proj-chevron">▸</span>
        </div>
      </div>
      <p class="proj-desc">${p.desc}</p>
      <div class="tags proj-tags">${p.tags.map(tg => `<span class="tag">${tg}</span>`).join('')}</div>
      <div class="proj-expand">
        <img class="proj-img" src="${p.image}" alt="${p.name}" loading="lazy"/>
        <div class="proj-links">${deployBtn}${repoBtn}</div>
      </div>
    </div>`;
}

function initProjectToggles(container) {
  container.querySelectorAll('.proj-expandable').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('expanded');
      if (card.classList.contains('expanded')) {
        const scrollable = card.closest('.aw-body') || out;
        setTimeout(() => {
          const cardBottom = card.offsetTop + card.offsetHeight + 40;
          const visibleHeight = scrollable.clientHeight;
          scrollable.scrollTo({ top: cardBottom - visibleHeight, behavior: 'smooth' });
        }, 350);
      }
    });
  });
}

function initContactCopy(container) {
  container.querySelectorAll('.contact-row[data-copy]').forEach(row => {
    row.addEventListener('click', () => {
      navigator.clipboard.writeText(row.dataset.copy);
      row.classList.add('copied');
      setTimeout(() => row.classList.remove('copied'), 2000);
    });
  });
}

function initTagExpanders(container) {
  container.querySelectorAll('.tag-parent').forEach(parent => {
    parent.addEventListener('click', () => {
      const expand = parent.closest('.tag-expand');
      expand.classList.toggle('open');
      const scrollable = expand.closest('.aw-body') || out;
      requestAnimationFrame(() => scrollable.scrollTop = scrollable.scrollHeight);
    });
  });
}

// ── Skills data ──

function getSkillsData() {
  return [
    { title: 'linguagens', skills: ['JavaScript', 'TypeScript', 'SQL', 'C', 'HTML & CSS', 'Java', 'C#', 'Python'] },
    { title: 'ferramentas & softwares', skills: ['React', 'React Native', 'FastAPI', 'Vue.js', 'API', 'Deploy', 'PostgreSQL', 'Git', 'Figma', 'Trello', 'Linux', 'VSCode', 'Node.js', 'Spring Boot', 'Office', 'Redes'] },
  ];
}

// ── Contact icons ──

function contactIcon(key) {
  const icons = {
    email: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    github: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>',
    linkedin: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  };
  return icons[key] || '';
}

// ── Contact data ──

function getContactData() {
  return [
    { key: 'email',    val: 'joaovitorvalec@gmail.com' },
    { key: 'github',   val: 'https://github.com/joaovale23' },
    { key: 'linkedin', val: 'https://www.linkedin.com/in/joao-vitor-vale-350b96321/' },
  ];
}

// Track installed packages
const installed = {
  whoami: false,
  projects: false,
  skills: false,
  contact: false,
};

function saveInstalledState() {
  const pkgs = Object.keys(installed).filter(k => installed[k]);
  localStorage.setItem('portfolio-installed', JSON.stringify(pkgs));
}

function restoreInstalledState() {
  try {
    const saved = JSON.parse(localStorage.getItem('portfolio-installed'));
    if (Array.isArray(saved)) {
      saved.forEach(pkg => {
        if (installed.hasOwnProperty(pkg)) {
          installed[pkg] = true;
          addDesktopIcon(pkg);
        }
      });
    }
  } catch (_) {}
}

// Package metadata
const packages = {
  whoami:   { cmd: 'whoami',        desc: 'install.pkg.whoami' },
  projects: { cmd: 'ls projects',   desc: 'install.pkg.projects' },
  skills:   { cmd: 'skills --list', desc: 'install.pkg.skills' },
  contact:  { cmd: 'contact',       desc: 'install.pkg.contact' },
};


function installAndOpen(pkg) {
  sp();
  line(`<span class="c-dim">${t('install.installing')} <span class="c-bright">${pkg}</span>...</span>`, 'fade-in');
  const bar = el('div', 'fade-in');
  bar.innerHTML = `<span class="c-dim">[</span><span class="install-bar" style="color:var(--green)"></span><span class="c-dim">]</span>`;
  out.appendChild(bar);
  const barSpan = bar.querySelector('.install-bar');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 8;
    if (progress > 100) progress = 100;
    const filled = Math.floor(progress / 4);
    const empty = 25 - filled;
    barSpan.textContent = '█'.repeat(filled) + '▁'.repeat(empty) + ` ${progress}%`;
    scroll();
    if (progress >= 100) {
      clearInterval(interval);
      installed[pkg] = true;
      saveInstalledState();
      addDesktopIcon(pkg);
      sp('sm');
      line(`<span class="c-green">✓</span> <span class="c-bright">${pkg}</span> ${t('install.done')} <span class="c-green">${packages[pkg].cmd}</span>`, 'fade-in');
      sp();
      openAppWindow(pkg);
      scroll();
    }
  }, 150);
}

const commands = {

  help() {
    sp();
    const rows = [
      ['apt install <pkg>', t('help.install')],
      ['whoami',            t('help.open.whoami')],
      ['ls projects',       t('help.open.projects')],
      ['skills --list',     t('help.open.skills')],
      ['contact',           t('help.open.contact')],
      ['theme',             t('help.theme')],
      ['lang',              t('help.lang')],
      ['clear',             t('help.clear')],
    ];

    line(`<span class="c-dim">${t('help.title')}</span>`, 'fade-in');
    sp('sm');
    rows.forEach(([cmd, desc]) => {
      line(
        `  <span class="c-bright">${cmd.padEnd(22)}</span>` +
        `<span class="c-dim"># ${desc}</span>`,
        'fade-in'
      );
    });
    sp();
  },

  'apt install'(arg) {
    sp();

    // No argument: show available packages
    if (!arg) {
      line(`<span class="c-dim">${t('install.available')}</span>`, 'fade-in');
      sp('sm');
      Object.keys(packages).forEach(pkg => {
        const status = installed[pkg]
          ? '<span class="c-green">✓ installed</span>'
          : '<span class="c-dim">not installed</span>';
        line(
          `  <span class="c-bright">${pkg.padEnd(16)}</span>` +
          `<span class="c-dim">${t(packages[pkg].desc)}</span>  ${status}`,
          'fade-in'
        );
      });
      sp();
      line(`<span class="c-mid">usage: apt install &lt;package&gt;  |  apt install . (install all)</span>`, 'fade-in');
      sp();
      scroll();
      return;
    }

    const pkg = arg.trim().toLowerCase();

    // Install all uninstalled packages
    if (pkg === '.') {
      const pending = Object.keys(packages).filter(p => !installed[p]);
      if (pending.length === 0) {
        line(`<span class="c-green">✓</span> ${t('install.allinstalled') || 'all packages are already installed.'}`, 'fade-in');
        sp();
        scroll();
        return;
      }
      line(`<span class="c-dim">${t('install.installingall') || 'installing all packages'}... (${pending.length})</span>`, 'fade-in');
      sp('sm');
      let i = 0;
      function installNext() {
        if (i >= pending.length) {
          sp('sm');
          line(`<span class="c-green">✓</span> ${pending.length} ${t('install.alldone') || 'packages installed successfully.'}`, 'fade-in');
          sp();
          scroll();
          return;
        }
        const p = pending[i];
        line(`<span class="c-dim">${t('install.installing')} <span class="c-bright">${p}</span>...</span>`, 'fade-in');
        const bar = el('div', 'fade-in');
        bar.innerHTML = `<span class="c-dim">[</span><span class="install-bar" style="color:var(--green)"></span><span class="c-dim">]</span>`;
        out.appendChild(bar);
        const barSpan = bar.querySelector('.install-bar');
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.floor(Math.random() * 15) + 8;
          if (progress > 100) progress = 100;
          const filled = Math.floor(progress / 4);
          const empty = 25 - filled;
          barSpan.textContent = '█'.repeat(filled) + '▁'.repeat(empty) + ` ${progress}%`;
          scroll();
          if (progress >= 100) {
            clearInterval(interval);
            installed[p] = true;
            saveInstalledState();
            addDesktopIcon(p);
            sp('sm');
            line(`<span class="c-green">✓</span> <span class="c-bright">${p}</span> ${t('install.done')} <span class="c-green">${packages[p].cmd}</span>`, 'fade-in');
            sp('sm');
            scroll();
            i++;
            setTimeout(installNext, 200);
          }
        }, 150);
      }
      installNext();
      return;
    }

    if (!packages[pkg]) {
      line(`<span class="c-red">✗</span> ${t('install.notfound')}`, 'fade-in');
      sp();
      scroll();
      return;
    }

    if (installed[pkg]) {
      line(`<span class="c-amber">●</span> <span class="c-bright">${pkg}</span> ${t('install.already')} <span class="c-green">${packages[pkg].cmd}</span>`, 'fade-in');
      sp();
      scroll();
      return;
    }

    // Simulate installation with progress
    line(`<span class="c-dim">${t('install.installing')} <span class="c-bright">${pkg}</span>...</span>`, 'fade-in');

    const bar = el('div', 'fade-in');
    bar.innerHTML = `<span class="c-dim">[</span><span class="install-bar" style="color:var(--green)"></span><span class="c-dim">]</span>`;
    out.appendChild(bar);
    const barSpan = bar.querySelector('.install-bar');

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 8;
      if (progress > 100) progress = 100;
      const filled = Math.floor(progress / 4);
      const empty = 25 - filled;
      barSpan.textContent = '█'.repeat(filled) + '▁'.repeat(empty) + ` ${progress}%`;
      scroll();

      if (progress >= 100) {
        clearInterval(interval);
        installed[pkg] = true;
        saveInstalledState();
        addDesktopIcon(pkg);
        sp('sm');
        line(`<span class="c-green">✓</span> <span class="c-bright">${pkg}</span> ${t('install.done')} <span class="c-green">${packages[pkg].cmd}</span>`, 'fade-in');
        sp();
        scroll();
      }
    }, 150);
  },

  whoami() {
    if (!installed.whoami) { installAndOpen('whoami'); return; }
    sp();
    line(`<span class="c-green">✓</span> <span class="c-dim">${t('open.launching')}</span> <span class="c-bright">${t('app.whoami.title')}</span>`, 'fade-in');
    sp();
    openAppWindow('whoami');
    scroll();
  },

  'ls projects'() {
    if (!installed.projects) { installAndOpen('projects'); return; }
    sp();
    line(`<span class="c-green">✓</span> <span class="c-dim">${t('open.launching')}</span> <span class="c-bright">${t('app.projects.title')}</span>`, 'fade-in');
    sp();
    openAppWindow('projects');
    scroll();
  },

  'skills --list'() {
    if (!installed.skills) { installAndOpen('skills'); return; }
    sp();
    line(`<span class="c-green">✓</span> <span class="c-dim">${t('open.launching')}</span> <span class="c-bright">${t('app.skills.title')}</span>`, 'fade-in');
    sp();
    openAppWindow('skills');
    scroll();
  },

  contact() {
    if (!installed.contact) { installAndOpen('contact'); return; }
    sp();
    line(`<span class="c-green">✓</span> <span class="c-dim">${t('open.launching')}</span> <span class="c-bright">${t('app.contact.title')}</span>`, 'fade-in');
    sp();
    openAppWindow('contact');
    scroll();
  },

  theme() {
    toggleTheme();
    sp();
    const msg = currentTheme === 'light' ? t('theme.switched_light') : t('theme.switched_dark');
    line(`<span class="c-green">✓</span> ${msg}`, 'fade-in');
    sp();
    scroll();
  },

  lang() {
    toggleLang();
    sp();
    line(
      `<span class="c-green">✓</span> ${t('lang.switched')} <span class="c-bright">${currentLang.toUpperCase()}</span>`,
      'fade-in'
    );
    sp();
    scroll();
  },

  clear() {
    out.innerHTML = '';
    printWelcome();
  },
};
