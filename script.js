const body = document.body;
const menuButton = document.querySelector('.menu-toggle');
const header = document.querySelector('[data-header]');
const form = document.querySelector('#quote-form');

menuButton?.addEventListener('click', () => {
  const open = body.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Menu openen');
  });
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 16);
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal:not(.is-visible)').forEach((item) => observer.observe(item));

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const values = Object.fromEntries(new FormData(form).entries());
  const subject = `Offerteaanvraag: ${values.werkzaamheden}`;
  const bodyText = [
    'Beste Biere Schilders,',
    '',
    'Graag ontvang ik meer informatie of een vrijblijvende offerte.',
    '',
    `Naam: ${values.naam}`,
    `E-mail: ${values.email}`,
    `Telefoon: ${values.telefoon || '-'}`,
    `Werkzaamheden: ${values.werkzaamheden}`,
    '',
    'Omschrijving:',
    values.omschrijving,
    '',
    'Met vriendelijke groet,',
    values.naam
  ].join('\n');

  window.location.href = `mailto:info@biereschilders.nl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
});

document.querySelector('#year').textContent = new Date().getFullYear();
