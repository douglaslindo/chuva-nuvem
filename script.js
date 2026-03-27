const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Letras
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const letrasArray = letras.split("");

// Nuvem
let centroX = canvas.width / 2;
const topoY = 100;
const larguraNuvem = 300;

// Chão
let chaoY = canvas.height - 60;

// Gotas
const gotas = [];

// Respingo
const respingos = [];

// Criar gota
function criarGota() {
  return {
    x: centroX + (Math.random() - 0.5) * larguraNuvem,
    y: topoY,
    velocidade: 4 + Math.random() * 6,
    letra: letrasArray[Math.floor(Math.random() * letrasArray.length)]
  };
}

// Desenhar nuvem
function desenharNuvem() {
  ctx.fillStyle = "#cccccc";

  ctx.beginPath();
  ctx.arc(centroX - 120, topoY, 50, 0, Math.PI * 2);
  ctx.arc(centroX - 60, topoY - 30, 60, 0, Math.PI * 2);
  ctx.arc(centroX, topoY, 50, 0, Math.PI * 2);
  ctx.arc(centroX + 60, topoY - 20, 55, 0, Math.PI * 2);
  ctx.arc(centroX + 120, topoY, 45, 0, Math.PI * 2);
  ctx.fill();
}

// Desenhar chão
function desenharChao() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, chaoY, canvas.width, canvas.height - chaoY);
}

// Loop principal
function desenhar() {
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  desenharNuvem();
  desenharChao();

  ctx.font = "16px monospace";

  // Criar gotas continuamente
  if (Math.random() < 0.7) {
    gotas.push(criarGota());
  }

  // Atualizar gotas
  for (let i = 0; i < gotas.length; i++) {
    const g = gotas[i];

    // LETRAS BRANCAS
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 8;

    ctx.fillText(g.letra, g.x, g.y);

    g.y += g.velocidade;

    // Ao bater no chão → respingo
    if (g.y >= chaoY) {
      for (let j = 0; j < 3; j++) {
        respingos.push({
          x: g.x,
          y: chaoY,
          vx: (Math.random() - 0.5) * 2,
          vy: -Math.random() * 3,
          vida: 20
        });
      }

      gotas.splice(i, 1);
      i--;
    }
  }

  // Atualizar respingos
  for (let i = 0; i < respingos.length; i++) {
    const r = respingos[i];

    ctx.fillStyle = "#ffffff";
    ctx.fillText(".", r.x, r.y);

    r.x += r.vx;
    r.y += r.vy;
    r.vy += 0.2;
    r.vida--;

    if (r.vida <= 0) {
      respingos.splice(i, 1);
      i--;
    }
  }

  // Resetar sombra (evita bug visual)
  ctx.shadowBlur = 0;
}

setInterval(desenhar, 33);

// Responsivo
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  centroX = canvas.width / 2;
  chaoY = canvas.height - 60;
});