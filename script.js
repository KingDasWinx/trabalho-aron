const output = document.querySelector('.output');
const input = document.querySelector('.input');

let countdownInterval;
let awaitingInput = false;
let esperandoValor = false;
let esperandoValor2 = false;
let esperandoLogin1 = false;
let esperandoLogin2 = false;
let esperandoToDo = false;

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const command = input.value.trim();
        input.value = '';

        if (command) {
            if (awaitingInput) {
                handleValueInput(command);
            } else if (esperandoValor) {
              handleValor1(command);
            } else if (esperandoValor2) {
              handleValor2(command);
            } else if (esperandoLogin1) {
              handleLogin1(command);
            } else if (esperandoLogin2) {
              handleLogin2(command);
            } else if (esperandoToDo) {
              handleToDoList(command);
            } else {
                output.innerHTML += '<span class="prompt">$</span> ' + command + '<br>';
                executeCommand(command);
            }
        }
    }
});

function promptForValue() {
    output.innerHTML += '<span class="prompt">$</span> Valor - Digite um valor de 1 a 10:<br>';
    awaitingInput = true;
}

function promptSoma() {
  output.innerHTML += '<span class="prompt">$</span> Soma - Digite o primeiro valor:<br>';
  esperandoValor = true;
}

function promptToDoList() {
    output.innerHTML += '<span class="prompt">$</span> To-Do List - Digite uma tarefa:<br>';
    esperandoValor = false;
    esperandoValor2 = false;
    esperandoLogin1 = false;
    esperandoLogin2 = false;
    esperandoToDo = true;
}

function promptLogin() {
  output.innerHTML += '<span class="prompt">$</span> Login - Digite seu nome:<br>';
  esperandoLogin1 = true;
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
            output.innerHTML += 'Comandos disponiveis: help, clear, ex1(valor), ex2(AnoNovo), ex3(Login), ex4(Soma), ex5(To-do List).<br>';
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
            promptLogin();
            break;
        case 'ex4':
            promptSoma();
            break;
        case 'ex5':
            promptToDoList();
            break;
        case 'lista':
            displayTasksFromLocalStorage();
            break;
        default:
            output.innerHTML += 'Comando invalido: ' + command + '<br>';
            break;
    }
}

function promptToDoList() {
    output.innerHTML += '<span class="prompt">$</span> To-Do List - Digite uma tarefa:<br>';
    esperandoValor = false;
    esperandoValor2 = false;
    esperandoLogin1 = false;
    esperandoLogin2 = false;
    esperandoToDo = true;
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

let primeiroValor;

function handleValor1(value) {
    
    console.log("Entrou");
    const num1 = value;
    console.log(num1);
    if(event.key === "Enter") {
      if(num1 === '13') {
        output.innerHTML += 'Escolha outro numero!<br>'
      } else {
        if (num1 === '') {
        console.log("Nadinha de nada");
        output.innerHTML += 'Bota uma valor<br>';
      }
      primeiroValor = parseFloat(num1);
      input.value = '';
      output.innerHTML += 'Primeiro número: ' + primeiroValor + '<br>';
      output.innerHTML += '<span class="prompt">$</span> Digite o segundo valor:<br>';
      esperandoValor = false;
      esperandoValor2 = true;
      }
    }
      
}


function handleValor2(value) {
    const num2 = value;
    console.log(num2);
    if (event.key === "Enter") {
      if(num2 === '13') {
        output.innerHTML += 'Escolha outro numero!<br>'
      } else {
        if (num2 === '') {
          output.innerHTML += 'Bota um valor</br>';
        }
        console.log(num2);
        const segundoValor = parseFloat(num2);
        input.value = '';
        const sum = primeiroValor + segundoValor;
        output.innerHTML += 'Segundo valor: ' + segundoValor + '<br>';
        if (sum === 13) {
          output.innerHTML += 'Error. Tente novamente mais tarde!<br>';
          esperandoValor2 = false;
        } else {
          output.innerHTML += 'A soma é: ' + sum + '<br>';
          esperandoValor2 = false;
        }
      }
    }
}

let usernameLogin;

function handleLogin1(value) {
  const username = value;
  if (event.key === "Enter") {
    if (username === '') {
      output.innerHTML += '<span class="prompt">$</span> Escolha um nome!<br>';
    }
    usernameLogin = username;
    input.value = '';
    output.innerHTML += '<span class="prompt">$</span> Olá ' + usernameLogin +' informe uma senha:<br>';
    esperandoLogin1 = false;
    esperandoLogin2 = true;
  }
}

function handleLogin2(value) {
  const pssw = value;
  if (event.key === "Enter") {
    if (pssw === usernameLogin) {
      output.innerHTML += 'Informe uma senha diferente do nome<br>';
    } else {
      output.innerHTML += 'Obrigado, login feito com sucesso.<br><br><strong>Usuario<strong> - ' + usernameLogin + '<br><strong>Senha<strong> - ' + pssw;
      esperandoLogin2 = false;
    }
    
  }
}

let tasks = [];

function handleToDoList(value) {
    const task = value;
    if (event.key === "Enter") {
        if (task === '') {
            output.innerHTML += 'Por favor, insira uma tarefa válida.<br>';
        } else if (task === "quit") {
          esperandoToDo = false;
        } else {
            tasks.push(task);
            saveTasksToLocalStorage();
            output.innerHTML += 'Tarefa adicionada: ' + task + '<br>';
            esperandoToDo = false;
        }
    }
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks && savedTasks.length > 0) {
        output.innerHTML += 'Tarefas salvas:<br>';
        savedTasks.forEach((task, index) => {
            output.innerHTML += (index + 1) + '. ' + task + '<br>';
        });
    } else {
        output.innerHTML += 'Nenhuma tarefa salva.<br>';
    }
}