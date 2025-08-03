const btn = document.getElementById('btn-darkmode');
const btnMobile = document.getElementById('btn-mobile');
const navMenu = document.querySelector('#menu-fixo ul');
const menuLinks = document.querySelectorAll('#menu-fixo a');

// === DARK MODE ===

// Detecta a preferência do sistema na primeira visita
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('darkMode');

function applyTheme(darkEnabled) {
  if (darkEnabled) {
    document.body.classList.add('dark-mode');
    btn.textContent = 'Modo Claro';
  } else {
    document.body.classList.remove('dark-mode');
    btn.textContent = 'Modo Escuro';
  }
}

if (!savedTheme && prefersDark) {
  applyTheme(true);
  localStorage.setItem('darkMode', 'enabled');
} else if (savedTheme === 'enabled') {
  applyTheme(true);
} else {
  applyTheme(false);
}

btn.addEventListener('click', () => {
  const darkEnabled = !document.body.classList.contains('dark-mode');
  applyTheme(darkEnabled);
  localStorage.setItem('darkMode', darkEnabled ? 'enabled' : 'disabled');
});

// === SCROLL SUAVE E DESTAQUE DE LINK ===

menuLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    menuLinks.forEach(l => l.classList.remove('ativo'));
    link.classList.add('ativo');

    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Fecha menu mobile após clique
    if (window.innerWidth <= 768) {
      navMenu.classList.remove('aberto');
    }
  });
});

// Atualiza destaque ao rolar
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY || window.pageYOffset;

  menuLinks.forEach(link => {
    const id = link.getAttribute('href');
    const section = document.querySelector(id);
    if (!section) return;

    const offsetTop = section.offsetTop - 80;
    const sectionHeight = section.offsetHeight;

    if (scrollPos >= offsetTop && scrollPos < offsetTop + sectionHeight) {
      menuLinks.forEach(l => l.classList.remove('ativo'));
      link.classList.add('ativo');
    }
  });
});

// Abre/fecha menu hamburguer ao clicar no botão
btnMobile.addEventListener('click', () => {
  navMenu.classList.toggle('aberto');
});

// Fecha o menu quando clicar em algum link (mobile)
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navMenu.classList.remove('aberto');
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const elementos = document.querySelectorAll('main.animate__animated');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__fadeIn');
        observer.unobserve(entry.target); // ANIMA SÓ UMA VEZ
      }
    });
  }, {
    threshold: 0.2, // Ativa quando 20% do elemento estiver visível
  });

  elementos.forEach(el => {
    observer.observe(el);
  });
});


