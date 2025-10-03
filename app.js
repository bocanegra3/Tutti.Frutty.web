// Genera un array con las 26 letras en minúscula
const ALPHABET = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)); // a..z

// Estado
let bag = [];        // bolsa barajada (sin reemplazo)
let index = 0;       // puntero (0 al iniciar)
const display = document.getElementById("display");
const counter = document.getElementById("counter");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");

// Fisher–Yates shuffle
function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function updateCounter() {
  const remaining = Math.max(0, bag.length - index);
  counter.textContent = `Quedan: ${remaining}`;
}

function setDisplay(text) {
  // micro anim si no hay reduced-motion
  display.style.opacity = 0.001;
  // usar rAF para forzar repintado
  requestAnimationFrame(() => {
    display.textContent = text;
    display.style.opacity = 1;
  });
}

// Inicializa estado a "0" y baraja letras
function init() {
  bag = shuffle(ALPHABET);
  index = 0;
  setDisplay("0");         // estado inicial visible
  updateCounter();
  nextBtn.disabled = false;
  nextBtn.setAttribute("aria-disabled", "false");
}

function nextLetter() {
  if (index >= bag.length) {
    setDisplay("—"); // sin más letras
    nextBtn.disabled = true;
    nextBtn.setAttribute("aria-disabled", "true");
    counter.textContent = "No quedan más letras";
    return;
  }
  const letter = bag[index];
  index += 1;
  setDisplay(letter);
  updateCounter();
}

function resetAll() {
  init();
}

// Eventos
nextBtn.addEventListener("click", nextLetter);
resetBtn.addEventListener("click", resetAll);

// Iniciar
init();
