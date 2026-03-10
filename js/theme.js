// ── Theme (light / dark) ──

let currentTheme = 'dark';

function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  updateThemeIcon();
}

function toggleTheme() {
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

function updateThemeIcon() {
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) themeIcon.textContent = currentTheme === 'dark' ? '☾' : '☀';
}

// Load saved theme on script load
(function initTheme() {
  const saved = localStorage.getItem('portfolio-theme');
  if (saved === 'dark' || saved === 'light') {
    currentTheme = saved;
    document.documentElement.setAttribute('data-theme', saved);
  }
})();
