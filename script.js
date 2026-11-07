// Plain scripts also run when index.html is opened directly (file://).
const projects = window.portfolioProjects;
const korean = document.documentElement.lang === 'ko';
const dialog = document.querySelector('#project-dialog');
let opener;
const locale = korean ? 'ko' : 'en';
function projectImage(project, media, className) {
  const image = new Image();
  image.className = className;
  image.alt = media.alt?.[locale] || '';
  image.decoding = 'async';
  image.src = new URL(`../projects/${project.id}/${media.src}`, location.href).href;
  return image;
}
// One project file supplies both the static card's updated copy and its dialog.
document.querySelectorAll('.project[data-project]').forEach(card => {
  const project = projects.find(item => item.id === card.dataset.project);
  if (!project) return;
  const content = korean ? project.ko : project;
  card.querySelector('h3').textContent = content.title || project.title;
  card.querySelector('.project-info p').textContent = content.subtitle;
  card.querySelector('.project-info > span').firstChild.textContent = `${content.category} `;
  card.setAttribute('aria-label', korean ? `${content.title || project.title} 살펴보기` : `Explore ${project.title}`);
  if (project.cover) {
    const image = projectImage(project, project.cover, 'project-cover');
    image.addEventListener('load', () => card.querySelector('.art-object').replaceChildren(image));
  }
});
function renderGallery(project) {
  let gallery = dialog.querySelector('.project-gallery');
  if (!gallery) {
    gallery = document.createElement('div');
    gallery.className = 'project-gallery';
    document.querySelector('#project-description').after(gallery);
  }
  gallery.replaceChildren();
  for (const media of project.gallery || []) {
    const figure = document.createElement('figure');
    const image = projectImage(project, media, '');
    image.loading = 'lazy';
    image.addEventListener('error', () => figure.remove());
    figure.append(image);
    if (media.caption?.[locale]) {
      const caption = document.createElement('figcaption');
      caption.textContent = media.caption[locale];
      figure.append(caption);
    }
    gallery.append(figure);
  }
}
document.querySelectorAll('.filters button').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    document.querySelectorAll('.filters button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    document.querySelectorAll('.project[data-project]').forEach(card => {
      const project = projects.find(item => item.id === card.dataset.project);
      card.hidden = category !== 'All' && project.category !== category;
      if (!card.hidden) count++;
    });
    document.querySelector('.count').textContent = korean ? `프로젝트 ${count}개` : `${count} projects`;
  });
});
document.querySelectorAll('.project[data-project]').forEach(card => {
  card.addEventListener('click', () => {
    const project = projects.find(item => item.id === card.dataset.project);
    const content = korean ? project.ko : project;
    opener = card;
    document.querySelector('#project-category').textContent = korean ? `예시 콘셉트 / ${content.category}` : `CONCEPT STUDY / ${project.category}`;
    document.querySelector('#project-title').textContent = content.title || project.title;
    document.querySelector('#project-subtitle').textContent = content.subtitle;
    document.querySelector('#project-description').textContent = content.description;
    const art = document.querySelector('#project-art');
    art.className = `modal-art art ${project.theme}`;
    const fallback = document.createElement('span');
    fallback.textContent = content.title || project.title;
    art.replaceChildren(fallback);
    if (project.cover) {
      const image = projectImage(project, project.cover, '');
      image.addEventListener('load', () => { if (dialog.dataset.project === project.id) art.replaceChildren(image); });
    }
    dialog.dataset.project = project.id;
    renderGallery(project);
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  });
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.style.overflow = '';
  opener?.focus();
});
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let preference;
try { preference = localStorage.getItem('jay.motion'); } catch { /* File or private storage may be blocked. */ }
let motion = preference !== 'off' && !reducedMotion.matches;
const motionToggle = document.querySelector('#motion-toggle');
function updateMotion() {
  document.documentElement.dataset.motion = String(motion);
  motionToggle.setAttribute('aria-pressed', String(motion));
  motionToggle.textContent = korean ? `모션 ${motion ? '켜짐 ◉' : '꺼짐 ○'}` : `Motion ${motion ? 'on ◉' : 'off ○'}`;
  document.dispatchEvent(new Event('motionchange'));
}
motionToggle.addEventListener('click', () => {
  if (reducedMotion.matches) return;
  motion = !motion;
  preference = motion ? 'on' : 'off';
  try { localStorage.setItem('jay.motion', preference); } catch { /* Optional persistence. */ }
  updateMotion();
});
function syncSystemMotion() {
  motionToggle.disabled = reducedMotion.matches;
  motionToggle.title = reducedMotion.matches ? (korean ? '기기의 동작 줄이기 설정이 적용 중입니다.' : 'Your system reduced-motion setting is active.') : '';
  motion = preference !== 'off' && !reducedMotion.matches;
  updateMotion();
}
reducedMotion.addEventListener('change', syncSystemMotion);
syncSystemMotion();
updateMotion();
document.querySelector('#year').textContent = new Date().getFullYear();
