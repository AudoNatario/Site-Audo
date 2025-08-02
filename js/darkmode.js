// Botão Dark Mode
const btn = document.getElementById('btn-darkmode');

// Detecta preferência do sistema na primeira visita
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('darkMode');

if (!savedTheme && prefersDark) {
  document.body.classList.add('dark-mode');
  btn.textContent = 'Modo Claro';
}

if (savedTheme === 'enabled') {
  document.body.classList.add('dark-mode');
  btn.textContent = 'Modo Claro';
} else if (savedTheme === 'disabled') {
  document.body.classList.remove('dark-mode');
  btn.textContent = 'Modo Escuro';
}

btn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    btn.textContent = 'Modo Claro';
    localStorage.setItem('darkMode', 'enabled');
  } else {
    btn.textContent = 'Modo Escuro';
    localStorage.setItem('darkMode', 'disabled');
  }
});

// Scroll suave e destaque do link ativo
const menuLinks = document.querySelectorAll('#menu-fixo a');

menuLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const id = link.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

    // Remover destaque anterior
    menuLinks.forEach(l => l.classList.remove('ativo'));
    // Adicionar destaque ao clicado
    link.classList.add('ativo');

    // Fecha o menu no modo mobile
    document.getElementById('menu-fixo').classList.remove('aberto');
  });
});

// Botão menu responsivo
const btnMenu = document.getElementById('btn-menu');
btnMenu.addEventListener('click', () => {
  document.getElementById('menu-fixo').classList.toggle('aberto');
});
