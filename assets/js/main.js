/* ==================== LÓGICA DO SELETOR DE TEMA (CLARO/ESCURO) ==================== */

const themeToggle = document.getElementById('theme-toggle');
const body = document.body; 

function applyTheme(theme) {
  body.classList.remove('dark-theme', 'light-theme');
  body.classList.add(theme); 
  localStorage.setItem('theme', theme); 
}

let savedTheme = localStorage.getItem('theme'); 
if (!savedTheme) {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  savedTheme = prefersDark ? 'dark-theme' : 'light-theme'; 
}

applyTheme(savedTheme); 

themeToggle.addEventListener('click', () => {
  const currentTheme = body.classList.contains('light-theme') ? 'light-theme' : 'dark-theme'; 
  const newTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme'; 
  applyTheme(newTheme); 
}); 

/* ==================== LÓGICA PARA EFEITO TILT 3D NOS CARDS ==================== */

VanillaTilt.init(document.querySelectorAll(".project-card"), {
  max: 15, 
  speed: 400, 
  glare: true, 
  "max-glare": 0.5
});

/* ==================== LÓGICA PARA ANIMAÇÃO DE SCROLL - INÍCIO ==================== */

// 1. criar o observador 
// O IntersectionObserver é uma forma muito eficiente de saber quando um elemento entra ou sai da tela.
const observer = new IntersectionObserver((entries) => {
  // A função callback é chamada sempre que a visibilidade de um dos elementos vigiados muda. 

  entries.forEach(entry => {
    // 'entry' contém informação sobre a visibilidade de um elemento. 
    // 'isIntesecting' é 'true' se o elemento está na tela, e 'false' se não está. 
    if (entry.isIntersecting) {
      // Se o elemento entou na tela, adicionamos a classe 'show' para o tornar visível. 
      entry.target.classList.add('show'); 
    } else {
      // Se o elemento saiu da tela, removemos a classe 'show' para que animação possa acontecer novamente se o utilizador 
      // rolar para cima e para baixo 
      entry.target.classList.remove('show');
    }
  });
});

// 2. Selecionar todos os elementos a animar 
// Capturamos todos os elementos que tem a classe 'hidden' que queremos animar. 
const hiddenElements = document.querySelectorAll('.hidden'); 

// 3. Iniciar a Observação 
// dizemos ao nosso observador para começar a "vigiar" cada um dos elementos que selecionamos. 
hiddenElements.forEach((el) => observer.observe(el)); 

/* ==================== LÓGICA DO WHATSAPP POPUP ==================== */

// 1. Selecionar os elementos do pop-up
const fab = document.getElementById('whatsapp-fab');
const modal = document.getElementById('whatsapp-modal');
const closeModal = document.getElementById('whatsapp-modal-close'); 

// 2. Ouvir por clique no botão flutuante para abrir o modal 
fab.addEventListener('click', () => {
  modal.classList.add('modal--active'); 
});

//3. Ouvir por clique no botão 'X' para FECHAR o modal
closeModal.addEventListener('click', () => {
  modal.classList.remove('modal--active');
});

//Opcional: Fechar o modal se o utilizador clicar fora da caixa de Conteúdo 
modal.addEventListener('click', (event) => {
  // Se o clique foi no fundo escuro (o próprio modal) e não nos seus filhos
  if (event.target === modal) {
    modal.classList.remove('modal--active');
  }
});