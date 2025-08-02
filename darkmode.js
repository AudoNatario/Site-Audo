const btn = document.getElementById('btn-darkmode');
const menuLinks = document.querySelectorAll('#menu-fixo a');

// Detecta a preferência do sistema na primeira visita
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('darkMode');

// Função para aplicar tema e atualizar texto botão
function applyTheme(darkEnabled) {
  if (darkEnabled) {
    document.body.classList.add('dark-mode');
    btn.textContent = 'Modo Claro';
  } else {
    document.body.classList.remove('dark-mode');
    btn.textContent = 'Modo Escuro';
  }
}

// Inicializa tema conforme preferência ou salvo
if (!savedTheme && prefersDark) {
  applyTheme(true);
  localStorage.setItem('darkMode', 'enabled');
} else if (savedTheme === 'enabled') {
  applyTheme(true);
} else {
  applyTheme(false);
}

// Alterna entre claro/escuro ao clicar no botão
btn.addEventListener('click', () => {
  const darkEnabled = !document.body.classList.contains('dark-mode');
  applyTheme(darkEnabled);
  localStorage.setItem('darkMode', darkEnabled ? 'enabled' : 'disabled');
});

// Rolagem suave para os links do menu fixo e destaque do link ativo
menuLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    // Remove a classe 'ativo' de todos os links
    menuLinks.forEach(l => l.classList.remove('ativo'));

    // Adiciona 'ativo' no link clicado
    link.classList.add('ativo');

    const id = link.getAttribute('href');
    const targetSection = document.querySelector(id);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Opcional: ao rolar a página, atualiza o link ativo automaticamente (para navegacao via scroll)
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY || window.pageYOffset;

  menuLinks.forEach(link => {
    const id = link.getAttribute('href');
    const section = document.querySelector(id);
    if (!section) return;

    const sectionTop = section.offsetTop - 70; // ajuste para menu fixo
    const sectionHeight = section.offsetHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      menuLinks.forEach(l => l.classList.remove('ativo'));
      link.classList.add('ativo');
    }
  });
});
