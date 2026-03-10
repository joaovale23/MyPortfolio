// ── Internationalization (i18n) ──

let currentLang = 'pt';

const translations = {
  pt: {
    // help
    'help.title': '// comandos disponíveis',
    'help.install': 'instalar pacote (whoami, projects, skills, contact)',
    'help.clear': 'limpar terminal',
    'help.theme': 'alternar claro/escuro',
    'help.lang': 'alternar idioma (pt/en)',
    'help.open.whoami': 'abrir sobre-mim',
    'help.open.projects': 'abrir projetos',
    'help.open.skills': 'abrir habilidades',
    'help.open.contact': 'abrir contato',

    // install
    'install.available': '// pacotes disponíveis para instalação',
    'install.installing': 'instalando',
    'install.done': 'instalado com sucesso! execute',
    'install.already': 'já está instalado. execute',
    'install.notfound': 'pacote não encontrado. use <span class="c-bright">apt install</span> para ver os disponíveis',
    'install.pkg.whoami': 'informações pessoais e bio',
    'install.pkg.projects': 'lista de projetos',
    'install.pkg.skills': 'habilidades técnicas',
    'install.pkg.contact': 'formas de contato',

    // not installed
    'notinstalled': 'pacote não instalado. execute <span class="c-bright">apt install</span> para ver os disponíveis',

    // open
    'open.launching': 'abrindo',

    // whoami labels
    'whoami.label.name': 'nome',
    'whoami.label.role': 'cargo',
    'whoami.label.location': 'local',
    'whoami.label.status': 'status',
    'whoami.label.focus': 'foco',

    // whoami values
    'whoami.role': 'Estudante',
    'whoami.location': 'Brasil',
    'whoami.status': 'Pronto para novos desafios',
    'whoami.focus': 'web · mobile',
    'whoami.bio': 'Desenvolvedor apaixonado por criar experiências interativas e interfaces que combinam performance com design. Apps e ferramentas que importam para as pessoas.',

    // whoami tags
    'whoami.tag.webdev': 'web dev',
    'whoami.tag.mobiledev': 'mobile dev',
    'whoami.tag.creativesolutions': 'soluções criativas',
    'whoami.tag.datastructures': 'estrutura de dados',

    // whoami hobbies
    'whoami.hobbies.title': 'gostos & hobbies',
    'whoami.hobby.games': 'Jogos',
    'whoami.hobby.games.arthistory': 'Arte & História',
    'whoami.hobby.games.indie': 'Indie',
    'whoami.hobby.games.fps': 'FPS',
    'whoami.hobby.games.horror': 'Terror',
    'whoami.hobby.music': 'Músicas',
    'whoami.hobby.music.rnb': 'R&B',
    'whoami.hobby.music.hiphop': 'Hip-Hop',
    'whoami.hobby.music.mpb': 'MPB',
    'whoami.hobby.music.pagode': 'Pagode',
    'whoami.hobby.music.rock': 'Rock',
    'whoami.hobby.animanga': 'Animangas',
    'whoami.hobby.animanga.vinland': 'Vinland Saga',
    'whoami.hobby.animanga.onepiece': 'One Piece',
    'whoami.hobby.animanga.bebop': 'Cowboy Bebop',
    'whoami.hobby.movies': 'Filmes',
    'whoami.hobby.movies.arrival': 'A Chegada',
    'whoami.hobby.movies.secretagent': 'O Agente Secreto',
    'whoami.hobby.movies.soul': 'Soul',

    // projects
    'proj.etlans.desc': 'ETL completo desenvolvidos com dados públicos da API da ANS',
    'proj.pixel.desc': 'LocVac é uma aplicação mobile que visa substituir a carteira de vacinação tradicional sendo uma versão digital e mais eficiente da mesma.',
    'proj.btn.repo': 'Repositório',
    'proj.btn.deploy': 'Deploy',

    // contact
    'contact.footer': '# response time: ~24h · open to freelance & fulltime',
    'contact.copied': 'copiado!',

    // app titles
    'app.whoami.title': 'sobre-mim.app',
    'app.projects.title': 'projetos.app',
    'app.skills.title': 'skills.app',
    'app.contact.title': 'contato.app',
    'app.whoami.label': 'sobre-mim',
    'app.projects.label': 'projetos',
    'app.skills.label': 'skills',
    'app.contact.label': 'contato',

    // welcome
    'welcome.help': 'digite <span class="c-bright">help</span> para ver os comandos disponíveis',

    // nav
    'nav.label': 'navigate',

    // theme feedback
    'theme.switched_dark': 'tema alterado para <span class="c-bright">dark</span> ☾',
    'theme.switched_light': 'tema alterado para <span class="c-bright">light</span> ☀',

    // lang feedback
    'lang.switched': 'idioma alterado para',

    // input
    'input.placeholder': 'digite um comando.',
  },

  en: {
    // help
    'help.title': '// available commands',
    'help.install': 'install package (whoami, projects, skills, contact)',
    'help.clear': 'clear terminal',
    'help.theme': 'toggle light/dark',
    'help.lang': 'toggle language (pt/en)',
    'help.open.whoami': 'open about-me',
    'help.open.projects': 'open projects',
    'help.open.skills': 'open skills',
    'help.open.contact': 'open contact',

    // install
    'install.available': '// available packages',
    'install.installing': 'installing',
    'install.done': 'installed successfully! run',
    'install.already': 'already installed. run',
    'install.notfound': 'package not found. use <span class="c-bright">apt install</span> to see available packages',
    'install.pkg.whoami': 'personal info and bio',
    'install.pkg.projects': 'project list',
    'install.pkg.skills': 'technical skills',
    'install.pkg.contact': 'contact info',

    // not installed
    'notinstalled': 'package not installed. run <span class="c-bright">apt install</span> to see available packages',

    // open
    'open.launching': 'launching',

    // whoami labels
    'whoami.label.name': 'name',
    'whoami.label.role': 'role',
    'whoami.label.location': 'location',
    'whoami.label.status': 'status',
    'whoami.label.focus': 'focus',

    // whoami values
    'whoami.role': 'Full Stack Developer',
    'whoami.location': 'Brazil',
    'whoami.status': 'available',
    'whoami.focus': 'games · web · tools',
    'whoami.bio': 'Developer passionate about creating interactive experiences and interfaces that combine performance with design. Focus on games, apps and tools that matter to people.',

    // whoami tags
    'whoami.tag.webdev': 'web dev',
    'whoami.tag.mobiledev': 'mobile dev',
    'whoami.tag.creativesolutions': 'creative solutions',
    'whoami.tag.datastructures': 'data structures',

    // whoami hobbies
    'whoami.hobbies.title': 'hobbies & interests',
    'whoami.hobby.games': 'Games',
    'whoami.hobby.games.arthistory': 'Art & History',
    'whoami.hobby.games.indie': 'Indie',
    'whoami.hobby.games.fps': 'FPS',
    'whoami.hobby.games.horror': 'Horror',
    'whoami.hobby.music': 'Music',
    'whoami.hobby.music.rnb': 'R&B',
    'whoami.hobby.music.hiphop': 'Hip-Hop',
    'whoami.hobby.music.mpb': 'MPB',
    'whoami.hobby.music.pagode': 'Pagode',
    'whoami.hobby.music.rock': 'Rock',
    'whoami.hobby.animanga': 'Animanga',
    'whoami.hobby.animanga.vinland': 'Vinland Saga',
    'whoami.hobby.animanga.onepiece': 'One Piece',
    'whoami.hobby.animanga.bebop': 'Cowboy Bebop',
    'whoami.hobby.movies': 'Movies',
    'whoami.hobby.movies.arrival': 'Arrival',
    'whoami.hobby.movies.secretagent': 'The Secret Agent',
    'whoami.hobby.movies.soul': 'Soul',

    // projects
    'proj.etlans.desc': 'Complete ETL built with public data from the ANS API',
    'proj.pixel.desc': 'LocVac is a mobile application that aims to replace the traditional vaccination card with a digital and more efficient version.',
    'proj.btn.repo': 'Repository',
    'proj.btn.deploy': 'Deploy',

    // contact
    'contact.footer': '# response time: ~24h · open to freelance & fulltime',
    'contact.copied': 'copied!',

    // app titles
    'app.whoami.title': 'about-me.app',
    'app.projects.title': 'projects.app',
    'app.skills.title': 'skills.app',
    'app.contact.title': 'contact.app',
    'app.whoami.label': 'about-me',
    'app.projects.label': 'projects',
    'app.skills.label': 'skills',
    'app.contact.label': 'contact',

    // welcome
    'welcome.help': 'type <span class="c-bright">help</span> for available commands',

    // nav
    'nav.label': 'navigate',

    // theme feedback
    'theme.switched_dark': 'theme changed to <span class="c-bright">dark</span> ☾',
    'theme.switched_light': 'theme changed to <span class="c-bright">light</span> ☀',

    // lang feedback
    'lang.switched': 'language changed to',

    // input
    'input.placeholder': 'type a command...',
  }
};

function t(key) {
  return translations[currentLang][key] || key;
}

function setLang(lang) {
  if (lang !== 'pt' && lang !== 'en') return;
  currentLang = lang;
  localStorage.setItem('portfolio-lang', lang);
  updateUILang();
}

function toggleLang() {
  setLang(currentLang === 'pt' ? 'en' : 'pt');
}

function updateUILang() {
  document.getElementById('inp').placeholder = t('input.placeholder');
  const langBtn = document.getElementById('lang-btn');
  if (langBtn) langBtn.textContent = currentLang.toUpperCase();
  if (typeof refreshInstalledApps === 'function') refreshInstalledApps();
}

// Load saved language on script load
(function initLang() {
  const saved = localStorage.getItem('portfolio-lang');
  if (saved === 'pt' || saved === 'en') currentLang = saved;
})();
