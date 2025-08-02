const btnModo = document.getElementById('modo-claro');
const body = document.body;
const menuLinks = document.querySelectorAll('nav ul li a');
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

// Detecta preferência de sistema
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const saved = localStorage.getItem('tema');

// Define tema inicial
if (saved === 'dark' || (!saved && prefersDark)) {
  body.classList.add('dark');
  btnModo.textContent = 'Modo Claro';
} else {
  btnModo.textContent = 'Modo Escuro';
}

// Alterna tema
btnModo.addEventListener('click', () => {
  body.classList.toggle('dark');
  if (body.classList.contains('dark')) {
    localStorage.setItem('tema', 'dark');
    btnModo.textContent = 'Modo Claro';
  } else {
    localStorage.setItem('tema', 'light');
    btnModo.textContent = 'Modo Escuro';
  }
});

// Scroll suave e destaque
menuLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href');
    const destino = document.querySelector(id);
    destino.scrollIntoView({ behavior: 'smooth' });

    // Remove destaque anterior
    menuLinks.forEach(l => l.classList.remove('ativo'));
    link.classList.add('ativo');

    // Fecha menu mobile
    menu.classList.remove('aberto');
  });
});

// Menu toggle (mobile)
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('aberto');
});
