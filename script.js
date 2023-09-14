const output = document.querySelector('.output');
const input = document.querySelector('.input');
let countdownInterval;
let awaitingInput = false;


input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const command = input.value.trim();
        input.value = '';

        if (command) {
            if (awaitingInput) {
                handleValueInput(command);
            } else {
                output.innerHTML += '<span class="prompt">$</span> ' + command + '<br>';
                executeCommand(command);
            }
        }
    }
});

function promptForValue() {
    output.innerHTML += '<span class="prompt">$</span> Digite um valor de 1 a 10:<br>';
    awaitingInput = true;
}

function startCountdown() {
    let count = 10;
    output.innerHTML += '<span class="prompt">$</span> Ano novo - Contagem regressiva iniciada:<br>';
    output.innerHTML += '<span class="prompt">$</span> ' + count + '<br>';

    awaitingInput = false;

    countdownInterval = setInterval(() => {
        count--;
        if (count >= 1) {
            output.innerHTML += '<span class="prompt">$</span> ' + count + '<br>';
        } else {
            output.innerHTML += '<span class="prompt">$</span> Feliz Ano Novo!<br>';
            clearInterval(countdownInterval);
        }
    }, 1000);
}

function executeCommand(command) {
    switch (command) {
        case 'help':
            output.innerHTML += 'Comandos disponiveis: help, clear, ex1(valor), ex2(AnoNovo), ex3(Em breve), ex4(Em breve).<br>';
            break;
        case 'clear':
            // Limpa a saída
            output.innerHTML = '';
            break;
        case 'ex1':
            promptForValue();
            break;
        case 'ex2':
            startCountdown();
            break;
        case 'ex3':
            output.innerHTML += 'Infelizmente não consegui termina :( <br>';
            break;
        case 'ex4':
            output.innerHTML += 'tentei, mas ficou tudo bugado dai desisti :( <br>';
            break;
        default:
            output.innerHTML += 'Comando invalido: ' + command + '<br>';
            break;
    }
}

function handleValueInput(value) {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 10) {
        output.innerHTML += 'Valor invalido. Por favor informe um valor entre 1 e 10:<br>';
    } else {
        output.innerHTML += 'O valor informado foi: ' + parsedValue + '<br>';
        awaitingInput = false;
    }
}
