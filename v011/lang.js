const i18n = {
  zh: { movies: "电影", music: "音乐", novels: "小说", explore: "开始探索", price: "价格", welcome: "连接地球与宇宙的一切" },
  en: { movies: "Movies", music: "Music", novels: "Novels", explore: "Explore", price: "Price", welcome: "Connecting Earth and Universe" },
  es: { movies: "Películas", music: "Música", novels: "Novelas", explore: "Explorar", price: "Precio", welcome: "Conectando Tierra y Universo" }
};
function setLang(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = i18n[lang][key] || el.textContent;
  });
  localStorage.setItem('eaco-lang', lang);
}
document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('eaco-lang') || 'zh';
  setLang(lang);
  document.querySelectorAll('.language-option').forEach(el => {
    el.addEventListener('click', e => {
      setLang(el.dataset.lang);
    });
  });
});
