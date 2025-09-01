const readline = require('readline');

//Lista de palavras para o jogo
const palavras = ['amora', 'concreto', 'construtora', 'papibaquigrafo', 'paradigma'];

const palavra = palavras[Math.floor(Math.random() * palavras.length)];
let palavraOculta = '_'.repeat(palavra.length).split('');
let tentativas = 6;
let letrasTentadas = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Status do jogo
function mostrarStatus() {
  console.log('\n' + palavraOculta.join(' '));
  console.log('Tentativas restantes: ' + tentativas);
  console.log('Letras tentadas: ' + letrasTentadas.join(', '));
}

// Main
function jogar() {
  mostrarStatus();

  rl.question('Digite uma letra: ', (input) => {
    const letra = input.toLowerCase();

    if (letrasTentadas.includes(letra)) {
      console.log('Você já tentou essa letra!');
      return jogar();
    }

    letrasTentadas.push(letra);

    if (palavra.includes(letra)) {
      for (let i = 0; i < palavra.length; i++) {
        if (palavra[i] === letra) {
          palavraOculta[i] = letra;
        }
      }
      console.log('Acertou!');
    } else {
      tentativas--;
      console.log('Errou!');
    }

    if (!palavraOculta.includes('_')) {
      console.log('\nParabéns! Você acertou a palavra:', palavra);
      rl.close();
    } else if (tentativas === 0) {
      console.log('\nFim de jogo! A palavra era:', palavra);
      rl.close();
    } else {
      jogar();
    }
  });
}

console.log('Bem-vindo ao Jogo da Forca!');
jogar();
