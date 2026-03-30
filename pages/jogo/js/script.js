const mario = document.querySelector('.mario');
const cano = document.querySelector('.cano');
const pontuacaoElemento = document.querySelector('.pontuacao');

let pontuacao = 0;
let jogoAtivo = true;

const pulo = () => {
    if (!jogoAtivo) return;
    
    mario.classList.add('pulo');
    mario.src = './images/pulando.png';

    setTimeout(() => {
        mario.classList.remove('pulo');
        if (jogoAtivo) {
            mario.src = './images/mario.gif';
        }
    }, 500);
}

const loop = setInterval(() => {
    if (!jogoAtivo) return;

    const canoPosicao = cano.offsetLeft;
    const marioPosicao = +window.getComputedStyle(mario).bottom.replace('px', '');

    // Lógica de Colisão (Mario deve estar acima do cano que está a 100px do fundo)
    if (canoPosicao <= 120 && canoPosicao > 0 && marioPosicao < 180) {
        cano.style.animation = 'none';
        cano.style.left = `${canoPosicao}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosicao}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        jogoAtivo = false;
        clearInterval(loop);
        clearInterval(intervaloPontuacao);
        
        // Exibir Menu de Game Over
        const menu = document.querySelector('.menu-game-over');
        const pontuacaoFinal = document.querySelector('#pontuacao-final');
        pontuacaoFinal.innerHTML = Math.floor(pontuacao);
        menu.classList.remove('escondido');
    }
}, 10);

const reiniciarJogo = () => {
    location.reload();
}

// Contador de Pontos
const intervaloPontuacao = setInterval(() => {
    if (jogoAtivo) {
        pontuacao += 1;
        pontuacaoElemento.innerHTML = Math.floor(pontuacao);
    }
}, 100);

document.addEventListener('keydown', pulo);
document.addEventListener('touchstart', pulo);