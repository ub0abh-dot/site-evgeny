// Мобильное меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  nav.classList.remove('open');
}));

// Анимация появления блоков при скролле (кроме первого экрана)
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Форма: валидация e-mail
const form = document.getElementById('lead-form');
const email = document.getElementById('f-email');
const emailErr = document.getElementById('email-err');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

email.addEventListener('input', () => {
  const bad = email.value.trim() !== '' && !EMAIL_RE.test(email.value.trim());
  email.classList.toggle('err', bad);
  emailErr.classList.toggle('show', bad);
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('f-name');
  const phone = document.getElementById('f-phone');
  let ok = true;
  [name, phone].forEach(f => {
    const bad = f.value.trim() === '';
    f.classList.toggle('err', bad);
    if (bad) ok = false;
  });
  if (email.value.trim() !== '' && !EMAIL_RE.test(email.value.trim())) {
    email.classList.add('err');
    emailErr.classList.add('show');
    ok = false;
  }
  if (!ok) return;
  document.getElementById('form-ok').classList.add('show');
  form.querySelector('button[type=submit]').disabled = true;
});
