let slideIndex = 0; //variavel slideIndex com 0. ela controla o slide

function mostrarSlides() { //informa que a função mostrarSlides será a responsável e inicia a declaração de tudo oq vai acontecer nela
  const slides = document.getElementsByClassName("slide_image"); //pega todos os elementos dessa classe
  const pontos = document.getElementsByClassName("ponto");  //pega todos os elementos dessa classe

  // Theme Switcher
  const themeButtons = document.querySelectorAll('.theme-btn');

  themeButtons.forEach(button => {
    button.addEventListener('click', function () {
      const theme = this.getAttribute('data-theme');
      document.documentElement.setAttribute('data-theme', theme);

      // Update active button
      themeButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Save theme preference
      localStorage.setItem('theme', theme);
    });
  });


  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";   //esconde todos os slides
  }


  for (let i = 0; i < pontos.length; i++) {
    pontos[i].classList.remove("ativo");    //remove o branco de todas as bolinhas
  }


  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1; //aumenta a variavel slideIndex para 1 para aparecer a imagem
  }

  // Exibe o slide atual
  slides[slideIndex - 1].style.display = "block";   //mostra o slide

  // Destaca a bolinha correspondente
  if (pontos.length >= slideIndex) {
    pontos[slideIndex - 1].classList.add("ativo");  //adiciona a classe ativo á bolinha, assim mostrando ela
  }


  setTimeout(mostrarSlides, 3000);  //chama essa função a cada 3s
}


mostrarSlides();    //faz a função funcionar


// Salvar a posição de rolagem antes da atualização
window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('scrollPosition', window.scrollY);
});

// Restaurar a posição ao recarregar
window.addEventListener('load', () => {
  const scrollPosition = sessionStorage.getItem('scrollPosition');
  if (scrollPosition) {
    window.scrollTo(0, parseInt(scrollPosition));
  }
});


// Código para o menu hamburguer
document.addEventListener('DOMContentLoaded', () => {
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slide_image');
  const pontos = document.querySelectorAll('.ponto');

  function showSlide(index) {
    slides.forEach(slide => slide.style.display = 'none');
    pontos.forEach(ponto => ponto.classList.remove('ativo'));
    slides[index].style.display = 'block';
    pontos[index].classList.add('ativo');
  }

  function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }

  // Inicia automaticamente
  let interval = setInterval(nextSlide, 3000);

  // Controles das bolinhas
  pontos.forEach((ponto, i) => {
    ponto.addEventListener('click', () => {
      clearInterval(interval);
      slideIndex = i;
      showSlide(slideIndex);
      interval = setInterval(nextSlide, 3000);
    });
  });
});

// hamburguer_script.js
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger-menu');
  const navList = document.getElementById('nav-list');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navList.classList.toggle('active');
  });

  // Fecha ao clicar em links
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
      }
    });
  });
});

//COMANDOS DO QUIZ

const question = document.querySelector(".question"); //pergunta
const answers = document.querySelector(".answers"); //botoes de respostas
const spnQtd = document.querySelector(".spnQtd"); //contador de perguntas
const textFinish = document.querySelector(".finish span");  //acertos
const content = document.querySelector(".content");   //container do quiz
const contentFinish = document.querySelector(".finish");    //quiz ja finalizado
const btnRestart = document.querySelector(".finish button");    //botao que recomeça o quiz

import questions from "./questoes.js"; //importa as perguntas de outro arquivo

let currentIndex = 0;   //em qual pergunta está
let questionsCorrect = 0;   //quantidade de questoes acertadas ate o momento

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;                     //da a opcao de reiniciar o quiz, reinicia os contadores e carrega a primeira pergunta
  loadQuestion();
};

function nextQuestion(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questionsCorrect++;                                     //verifica se a resposta escolhida é a correta, se há perguntasd, passa pra proxima
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {                                      //se era a ultima pergunta, finaliza
    finish();
  }
}

function finish() {
  textFinish.innerHTML = `você acertou ${questionsCorrect} de ${questions.length}`;
  content.style.display = "none";
  contentFinish.style.display = "flex";                   //finaliza o quiz e mostra a pontuação final
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answers.innerHTML = "";                             //atualiza o contador
  question.innerHTML = item.question;                   //carrega a pergunta atual

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}                  
    </button>                     
    `;

    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();





document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]'); // Select all sections with an ID
  const navLinks = document.querySelectorAll('.nav_list li a');

  function highlightNavLink() {
    let currentActive = null;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - nav.offsetHeight - 20; // Adjust for nav height and some offset
      const sectionBottom = sectionTop + section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentActive = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active-link'); // Remove active class from all links first
      if (link.getAttribute('href').includes(currentActive)) {
        link.classList.add('active-link'); // Add active class to the current section's link
      }
    });
  }

  // Call the function on scroll and on load
  window.addEventListener('scroll', highlightNavLink);
  highlightNavLink(); // Call it once on page load to set the initial active link
});


// Seleciona todos os links do menu
const menuLinks = document.querySelectorAll('nav ul li a');

// Para cada link, adiciona um listener de clique
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Remove a classe active-link de quem tiver
    const ativo = document.querySelector('.active-link');
    if (ativo) ativo.classList.remove('active-link');
    
    // Adiciona a classe no link clicado
    link.classList.add('active-link');
  });
});


// Seleciona todos os links do menu
const menuLinks2 = document.querySelectorAll('nav ul li a');

// Para cada link, adiciona um listener de clique
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Remove a classe active-link de quem tiver
    const ativo = document.querySelector('.active-link');
    if (ativo) ativo.classList.remove('active-link');
    
    // Adiciona a classe no link clicado
    link.classList.add('active-link');
  });
});

  // seleciona seções e links do menu
  const sections = document.querySelectorAll('section[id]');
  const menuLinks3 = document.querySelectorAll('nav ul li a');

  // função que atualiza a classe active-link com base no scroll
  function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const top = sec.offsetTop - 100;      // ajuste pro seu header
      const bottom = top + sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollY >= top && scrollY < bottom) {
        menuLinks.forEach(link => link.classList.remove('active-link'));
        const ativo = document.querySelector(`nav ul li a[href="#${id}"]`);
        if (ativo) ativo.classList.add('active-link');
      }
    });
  }

  // listener de clique (mantém destaque no clique, mas é sobrescrito no scroll)
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuLinks.forEach(l => l.classList.remove('active-link'));
      link.classList.add('active-link');
    });
  });

  // dispara no scroll
  window.addEventListener('scroll', updateActiveLink);

  // dispara no load pra já setar o link correto
  window.addEventListener('load', updateActiveLink);

