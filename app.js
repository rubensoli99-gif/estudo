
/* =====================================
   🔥 CHAMAS DA TRANSFORMAÇÃO 🔥
===================================== */

// 1. REVELAÇÃO DOS TÓPICOS

const secoes = document.querySelectorAll("main section");

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver((entradas, obs) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                obs.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.12 });

    secoes.forEach((secao) => {
        secao.classList.add("revelar");
        observador.observe(secao);
    });
} else {
    secoes.forEach((secao) => secao.classList.add("visivel"));
}


// 2. ANIMAÇÃO DA FRASE DO RENGOKU

const banner = document.querySelector(".rengoku-banner");

if (banner) {
    banner.classList.add("rengoku-animado");

    const frase = banner.querySelector(".rengoku-frase");

    if (frase) {
        frase.setAttribute("aria-label", "Incendeie seu coração");
    }
}


// 3. BRASAS FLUTUANTES 🔥

const canvas = document.createElement("canvas");
canvas.id = "chamas";
canvas.setAttribute("aria-hidden", "true");

document.body.prepend(canvas);

const ctx = canvas.getContext("2d");
const brasas = [];
const quantidade = 35;

let largura = window.innerWidth;
let altura = window.innerHeight;
let animacaoAtiva = !document.hidden;
let quadroPendente = false;

function redimensionar() {
    largura = window.innerWidth;
    altura = window.innerHeight;

    const escala = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = largura * escala;
    canvas.height = altura * escala;
    canvas.style.width = `${largura}px`;
    canvas.style.height = `${altura}px`;

    ctx.setTransform(escala, 0, 0, escala, 0, 0);
}

function novaBrasa(iniciarNaTela = false) {
    return {
        x: Math.random() * largura,
        y: iniciarNaTela ? Math.random() * altura : altura + 10,
        raio: Math.random() * 2.5 + 1,
        velocidade: Math.random() * 0.8 + 0.4,
        fase: Math.random() * Math.PI * 2,
        opacidade: Math.random() * 0.5 + 0.25
    };
}

for (let i = 0; i < quantidade; i++) {
    brasas.push(novaBrasa(true));
}

function animarBrasas() {
    quadroPendente = false;

    if (!animacaoAtiva) return;

    ctx.clearRect(0, 0, largura, altura);

    brasas.forEach((brasa) => {
        brasa.y -= brasa.velocidade;
        brasa.fase += 0.025;
        brasa.x += Math.sin(brasa.fase) * 0.5;

        if (brasa.y < -10) {
            Object.assign(brasa, novaBrasa());
        }

        ctx.beginPath();
        ctx.arc(brasa.x, brasa.y, brasa.raio, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(255, ${
            Math.floor(100 + Math.random() * 100)
        }, 35, ${brasa.opacidade})`;

        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ff5722";
        ctx.fill();
    });

    ctx.shadowBlur = 0;
    quadroPendente = true;
    requestAnimationFrame(animarBrasas);
}

function iniciarAnimacao() {
    if (!animacaoAtiva || quadroPendente) return;

    animacaoAtiva = true;
    animarBrasas();
}

function atualizarVisibilidade() {
    animacaoAtiva = !document.hidden;

    if (animacaoAtiva) {
        iniciarAnimacao();
    }
}

redimensionar();
iniciarAnimacao();

window.addEventListener("resize", redimensionar);
document.addEventListener("visibilitychange", atualizarVisibilidade);


// 4. VERSÍCULOS QUE PODEM SER DESTACADOS 📖

document.querySelectorAll("blockquote").forEach((versiculo) => {
    versiculo.classList.add("versiculo-interativo");
    versiculo.title = "Clique para destacar este versículo";

    function alternarDestaque() {
        versiculo.classList.toggle("destacado");
    }

    versiculo.addEventListener("click", alternarDestaque);

    versiculo.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            alternarDestaque();
        }
    });

    versiculo.tabIndex = 0;
});


// 5. BOTÃO VOLTAR AO TOPO ⬆️

const topo = document.createElement("button");

topo.id = "voltar-topo";
topo.type = "button";
topo.textContent = "↑";
topo.setAttribute("aria-label", "Voltar ao topo");

document.body.appendChild(topo);

function atualizarBotao() {
    topo.classList.toggle("aparecer", window.scrollY > 350);
}

window.addEventListener("scroll", atualizarBotao, {
    passive: true
});

atualizarBotao();

topo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// 6. MENSAGEM DE INICIALIZAÇÃO

console.log("🔥 Chamas da Transformação ativadas!");
console.log("📖 Incendeie seu coração!");
