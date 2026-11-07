(() => {
  const supported = ['ko', 'en'];
  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  if (document.documentElement.dataset.entry === 'true') {
    const config = window.siteConfig || {};
    const saved = read('jay.language');
    const detected = config.detectBrowserLanguage ? (navigator.language.startsWith('ko') ? 'ko' : 'en') : null;
    const lang = supported.includes(saved) ? saved : detected || (supported.includes(config.defaultLanguage) ? config.defaultLanguage : 'ko');
    location.replace(new URL(`${lang}/index.html${location.search}${location.hash}`, location.href));
    return;
  }
  document.querySelectorAll('[data-language]').forEach(link => {
    link.addEventListener('click', () => {
      try { localStorage.setItem('jay.language', link.dataset.language); } catch { /* Storage may be blocked. */ }
      const destination = new URL(link.getAttribute('href'), location.href);
      destination.hash = location.hash;
      link.href = destination.href;
    });
  });
})();
