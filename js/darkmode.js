const btn = document.getElementById('btn-darkmode');

// Detecta a preferência do sistema na primeira visita
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('darkMode');

// Aplica tema baseado na preferência do sistema, se o usuário ainda não escolheu manualmente
if (!savedTheme && prefersDark) {
  document.body.classList.add('dark-mode');
  btn.textContent = 'Modo Claro';
}

// Aplica o tema salvo pelo usuário
if (savedTheme === 'enabled') {
  document.body.classList.add('dark-mode');
  btn.textContent = 'Modo Claro';
} else if (savedTheme === 'disabled') {
  document.body.classList.remove('dark-mode');
  btn.textContent = 'Modo Escuro';
}

// Alterna entre claro/escuro ao clicar no botão
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

// Rolagem suave para os links do menu fixo e destaque do link ativo
const links = document.querySelectorAll('#menu-fixo a');

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    });

    // Remove 'active' de todos
    links.forEach(l => l.classList.remove('active'));
    // Adiciona no clicado
    link.classList.add('active');
  });
});

// Opcional: adicionar destaque do menu baseado na rolagem (mais avançado)
window.addEventListener('scroll', () => {
  let fromTop = window.scrollY + 70; // Ajuste para compensar menu fixo

  links.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});
