function setTheme(theme) {
  document.body.className = `theme-${theme}`;
  localStorage.setItem('eaco-theme', theme);
}
document.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('eaco-theme') || 'default';
  setTheme(theme);
  document.querySelectorAll('.theme-option').forEach(el => {
    el.addEventListener('click', e => {
      setTheme(el.dataset.theme);
    });
  });
  document.getElementById('theme-toggle').onclick = () => {
    const current = document.body.className.includes('dark') ? 'default' : 'dark';
    setTheme(current);
  };
});
