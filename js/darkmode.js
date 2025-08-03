const btnDark = document.getElementById('btn-darkmode');
const btnIdioma = document.getElementById('btn-idioma');
const btnMobile = document.getElementById('btn-mobile');
const navMenu = document.querySelector('#menu-fixo ul');
const menuLinks = document.querySelectorAll('#menu-fixo a');

const textos = {
  pt: {
    'btn-idioma': 'English',
    'btn-darkmode-light': 'Modo Claro',
    'btn-darkmode-dark': 'Modo Escuro',
    'titulo': 'Meu Universo Digital | Audo Natário',
    'curiosidades': 'Sobre Mim',
    'curiosidadesText0': 'Nasci em Maringá - Paraná em 2006. Há mais de 10 anos, me mudei para o estado do Mato Grosso do Sul, onde cresci e desenvolvi meu interesse por tecnologia.',
    'curiosidadesText1': 'Hoje sou estudante de Ciência da Computação na UCDB - Universidade Católica Dom Bosco. Este portfólio reúne minha história, meus interesses e meus projetos em desenvolvimento.',
    'aprendizado': 'O que estou aprendendo',
    'aprendizadoIntro': 'Atualmente estudando:',
    'aprendizadoList0': 'HTML, CSS e JavaScript',
    'aprendizadoList1': 'Python com o curso do Gustavo Guanabara',
    'aprendizadoList2': 'Java, PHP e SQL',
    'hobbies': 'Hobbies e Jogos',
    'hobbiesText': 'Amo jogar e tive curiosidades sobre como eles são desenvolvidos.',
    'projetos': 'Projetos',
    'projetosText': 'Alguns projetos que desenvolvi:',
    'projetosList0': 'Calculadora Simples: Python + lógica de programação',
    'projetosList1': 'Página de Cadastro: HTML + CSS + JavaScript',
    'cursos': 'Cursos',
    'cursosText': 'Confira os cursos que já concluí e minhas principais formações:',
    'curso0': '<strong>Python 3 – Mundo 1 e 2 (80h)</strong> – Curso em Vídeo / CEV',
    'curso1': '<strong>JavaScript (40h)</strong> – Curso em Vídeo / CEV',
    'curso2': '<strong>Git e GitHub (20h)</strong> – Curso em Vídeo / CEV',
    'curso3': '<strong>HTML5 e CSS3 (40h)</strong> – Curso em Vídeo / CEV',
    'curso4': '<strong>Conceitos Básicos de Web (HTML/CSS/JS)</strong> – Fundação Bradesco',
    'curso5': '<strong>Assistente Administrativo</strong> – SENAC',
    'curso6': '<strong>Excel</strong> – Fundação Bradesco',
    'curso7': '<strong>Lógica de Programação</strong> – Fundação Bradesco',
    'curso8': '<strong>Power BI</strong> – Curso pelo YouTube',
    'contato': 'Contato',
    'email': 'Me envie um e-mail'
  },
  en: {
    'btn-idioma': 'Português',
    'btn-darkmode-light': 'Light Mode',
    'btn-darkmode-dark': 'Dark Mode',
    'titulo': 'My Digital Universe | Audo Natário',
    'curiosidades': 'About Me',
    'curiosidadesText0': 'I was born in Maringá - Paraná in 2006. Over 10 years ago, I moved to the state of Mato Grosso do Sul, where I grew up and developed my interest in technology.',
    'curiosidadesText1': 'Today I am a Computer Science student at UCDB - Universidade Católica Dom Bosco. This portfolio gathers my story, interests and ongoing projects.',
    'aprendizado': "What I'm Learning",
    'aprendizadoIntro': 'Currently studying:',
    'aprendizadoList0': 'HTML, CSS and JavaScript',
    'aprendizadoList1': "Python with Gustavo Guanabara's course",
    'aprendizadoList2': 'Java, PHP and SQL',
    'hobbies': 'Hobbies and Games',
    'hobbiesText': "I love playing games and have been curious about how they're developed.",
    'projetos': 'Projects',
    'projetosText': "Some projects I've developed:",
    'projetosList0': 'Simple Calculator: Python + programming logic',
    'projetosList1': 'Registration Page: HTML + CSS + JavaScript',
    'cursos': 'Courses',
    'cursosText': 'Check out the courses I have completed and my main qualifications:',
    'curso0': '<strong>Python 3 – World 1 and 2 (80h)</strong> – Curso em Vídeo / CEV',
    'curso1': '<strong>JavaScript (40h)</strong> – Curso em Vídeo / CEV',
    'curso2': '<strong>Git and GitHub (20h)</strong> – Curso em Vídeo / CEV',
    'curso3': '<strong>HTML5 and CSS3 (40h)</strong> – Curso em Vídeo / CEV',
    'curso4': '<strong>Basic Web Concepts (HTML/CSS/JS)</strong> – Fundação Bradesco',
    'curso5': '<strong>Administrative Assistant</strong> – SENAC',
    'curso6': '<strong>Excel</strong> – Fundação Bradesco',
    'curso7': '<strong>Programming Logic</strong> – Fundação Bradesco',
    'curso8': '<strong>Power BI</strong> – Course on YouTube',
    'contato': 'Contact',
    'email': 'Send me an email'
  }
};

let idiomaAtual = 'pt';

function applyTheme(darkEnabled) {
  document.body.classList.toggle('dark-mode', darkEnabled);
  const textoBotao = darkEnabled ? textos[idiomaAtual]['btn-darkmode-light'] : textos[idiomaAtual]['btn-darkmode-dark'];
  btnDark.textContent = textoBotao;
}

const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('darkMode');

if (!savedTheme && prefersDark) {
  applyTheme(true);
  localStorage.setItem('darkMode', 'enabled');
} else {
  applyTheme(savedTheme === 'enabled');
}

btnDark.addEventListener('click', () => {
  const darkEnabled = !document.body.classList.contains('dark-mode');
  applyTheme(darkEnabled);
  localStorage.setItem('darkMode', darkEnabled ? 'enabled' : 'disabled');
});

function aplicarIdioma() {
  const t = textos[idiomaAtual];

  btnIdioma.textContent = t['btn-idioma'];

  const darkEnabled = document.body.classList.contains('dark-mode');
  btnDark.textContent = darkEnabled ? t['btn-darkmode-light'] : t['btn-darkmode-dark'];

  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (t[key]) {
      if (key === 'email') {
        el.innerHTML = `${t[key]}: <a href="mailto:audo7natario@gmail.com">audo7natario@gmail.com</a>`;
      } else {
        // Para tags que podem conter HTML (ex: lista de cursos)
        if (key.startsWith('curso')) {
          el.innerHTML = t[key];
        } else {
          el.textContent = t[key];
        }
      }
    }
  });
}

btnIdioma.addEventListener('click', () => {
  idiomaAtual = idiomaAtual === 'pt' ? 'en' : 'pt';
  aplicarIdioma();
});

menuLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    menuLinks.forEach(l => l.classList.remove('ativo'));
    link.classList.add('ativo');

    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (window.innerWidth <= 768) {
      navMenu.classList.remove('aberto');
    }
  });
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY || window.pageYOffset;
  menuLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (!section) return;
    const top = section.offsetTop - 110; // ajuste para header + menu
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      menuLinks.forEach(l => l.classList.remove('ativo'));
      link.classList.add('ativo');
    }
  });
});

btnMobile.addEventListener('click', () => {
  navMenu.classList.toggle('aberto');
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) navMenu.classList.remove('aberto');
  });
});

// Animação fade-in nos main
document.addEventListener('DOMContentLoaded', () => {
  const elementos = document.querySelectorAll('main.animate__animated');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__fadeIn');
          entry.target.classList.add('visivel');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    });
    elementos.forEach(el => observer.observe(el));
  } else {
    elementos.forEach(el => {
      el.classList.add('animate__fadeIn');
      el.classList.add('visivel');
    });
  }
});

// Aplica idioma ao carregar página
document.addEventListener('DOMContentLoaded', () => {
  aplicarIdioma();
});
