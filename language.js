(() => {
  const supported = ['ko', 'en'];
  const localFile = location.protocol === 'file:';
  // Keep direct-file preview working, while public URLs use directory paths.
  if (!localFile && /\/index\.html$/.test(location.pathname)) {
    history.replaceState(null, '', location.pathname.replace(/index\.html$/, '') + location.search + location.hash);
  }
  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  if (document.documentElement.dataset.entry === 'true') {
    const config = window.siteConfig || {};
    const saved = read('jay.language');
    const detected = config.detectBrowserLanguage ? (navigator.language.startsWith('ko') ? 'ko' : 'en') : null;
    const lang = supported.includes(saved) ? saved : detected || (supported.includes(config.defaultLanguage) ? config.defaultLanguage : 'ko');
    location.replace(new URL(`${lang}/${localFile ? 'index.html' : ''}${location.search}${location.hash}`, location.href));
    return;
  }
  document.querySelectorAll('[data-language]').forEach(link => {
    if (localFile) {
      const destination = new URL(link.getAttribute('href'), location.href);
      if (destination.pathname.endsWith('/')) destination.pathname += 'index.html';
      link.href = destination.href;
    }
    link.addEventListener('click', () => {
      try { localStorage.setItem('jay.language', link.dataset.language); } catch { /* Storage may be blocked. */ }
      const destination = new URL(link.getAttribute('href'), location.href);
      destination.hash = location.hash;
      link.href = destination.href;
    });
  });
})();
