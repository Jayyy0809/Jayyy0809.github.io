// Plain scripts also run when index.html is opened directly (file://).
const projects = window.portfolioProjects;
const dialog = document.querySelector('#project-dialog');
let opener;
document.querySelectorAll('.filters button').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.childNodes[0].textContent.trim();
    document.querySelectorAll('.filters button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    document.querySelectorAll('[data-project]').forEach(card => {
      const project = projects.find(item => item.id === card.dataset.project);
      card.hidden = category !== 'All' && project.category !== category;
      if (!card.hidden) count++;
    });
    document.querySelector('.count').textContent = `${count} projects`;
  });
});
document.querySelectorAll('[data-project]').forEach(card => {
  card.addEventListener('click', () => {
    const project = projects.find(item => item.id === card.dataset.project);
    opener = card;
    document.querySelector('#project-category').textContent = `CONCEPT STUDY / ${project.category}`;
    document.querySelector('#project-title').textContent = project.title;
    document.querySelector('#project-subtitle').textContent = project.subtitle;
    document.querySelector('#project-description').textContent = project.description;
    const art = document.querySelector('#project-art');
    art.className = `modal-art art ${project.theme}`;
    art.querySelector('span').textContent = project.title;
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
let motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const motionToggle = document.querySelector('#motion-toggle');
function updateMotion() {
  document.documentElement.dataset.motion = String(motion);
  motionToggle.setAttribute('aria-pressed', String(motion));
  motionToggle.textContent = `Motion ${motion ? 'on ◉' : 'off ○'}`;
}
motionToggle.addEventListener('click', () => { motion = !motion; updateMotion(); });
updateMotion();
document.querySelector('#year').textContent = new Date().getFullYear();
