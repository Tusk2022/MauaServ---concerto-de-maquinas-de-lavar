// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target); } }); },
  { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
);
revealEls.forEach(el => observer.observe(el));

// Nav scroll
const navPill = document.getElementById('navPill');
window.addEventListener('scroll', () => { navPill.classList.toggle('scrolled', window.scrollY > 60); }, { passive: true });

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

function closeMenu() {
  menuOpen = false;
  menuBtn.classList.remove('open');
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  menuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  menuBtn.classList.toggle('open', menuOpen);
  mobileMenu.classList.toggle('open', menuOpen);
  mobileMenu.setAttribute('aria-hidden', String(!menuOpen));
  menuBtn.setAttribute('aria-expanded', String(menuOpen));
  document.body.style.overflow = menuOpen ? 'hidden' : '';
});

document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuOpen) closeMenu(); });

// Close menu on mobile link click
document.querySelectorAll('.mobile-menu-links a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Process steps hover
const steps = document.querySelectorAll('.process-step');
steps.forEach(step => {
  step.addEventListener('mouseenter', () => { steps.forEach(s => s.classList.remove('active')); step.classList.add('active'); });
});

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  const nome      = document.getElementById('fname').value.trim();
  const sobrenome = document.getElementById('lname').value.trim();

  if (!nome || !sobrenome) {
    alert('Por favor, preencha seu nome e sobrenome.');
    return;
  }

  const eletroEl = document.getElementById('project-type');
  const eletro   = eletroEl.options[eletroEl.selectedIndex].text;

  if (!eletroEl.value) {
    alert('Por favor, selecione o eletrodoméstico.');
    return;
  }

  const rua      = document.getElementById('rua').value.trim();
  const numero   = document.getElementById('numero').value.trim();
  const problema = document.getElementById('problema').value.trim();
  const mensagem = document.getElementById('message').value.trim();
  const endereco = rua ? `Endereço: ${rua}${numero ? ', ' + numero : ''}.` : '';
  const def      = problema ? `Problema: ${problema}.` : '';
  const texto    = `Olá! Meu nome é ${nome} ${sobrenome}. Preciso de assistência técnica para: ${eletro}. ${endereco} ${def} ${mensagem}`.trim();
  window.open(`https://wa.me/5511982765753?text=${encodeURIComponent(texto)}`, '_blank', 'noopener,noreferrer');
}

document.querySelector('.contact-form').addEventListener('submit', handleSubmit);
