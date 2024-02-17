const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_USER_CHOICE = ROCK;
let gameIsRunning;

const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WIN = 'PLAYER_WIN';
const RESULT_PLAYER_LOSE = 'PLAYER_LOSE';

const getPlayerChoice = () => {
    const selection = prompt(
        `${ROCK}, ${PAPER} or ${SCISSORS}?`,
        '',
    ).toUpperCase();
    if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
        alert(`Invalid Choice!, We chose ${DEFAULT_USER_CHOICE} for you.`);
        return;
    }
    return selection;
};
const getComputerChoice = () => {
    const randomValue = Math.random();
    if (randomValue < 0.34) {
        return ROCK;
    } else if (randomValue < 0.67) {
        return PAPER;
    } else {
        return SCISSORS;
    }
};
//const add = (a, b) => a + b;
//함수내의 표현식이 한줄인 경우 return과 {}를 생략할 수 있다.
const getWinner = (computerChoice, playerSelection = DEFAULT_USER_CHOICE) =>
    playerSelection === computerChoice
        ? RESULT_DRAW
        : (playerSelection === ROCK && computerChoice === PAPER) ||
          (playerSelection === SCISSORS && computerChoice === ROCK) ||
          (playerSelection === PAPER && computerChoice === SCISSORS)
        ? RESULT_PLAYER_LOSE
        : RESULT_PLAYER_WIN;

// if (playerSelection === computerChoice) {
//     return RESULT_DRAW;
// } else if (
//     (playerSelection === ROCK && computerChoice === PAPER) ||
//     (playerSelection === SCISSORS && computerChoice === ROCK) ||
//     (playerSelection === PAPER && computerChoice === SCISSORS)
// ) {
//     return RESULT_PLAYER_LOSE;
// } else {
//     return RESULT_PLAYER_WIN;
// }

startGameBtn.addEventListener('click', () => {
    if (gameIsRunning) {
        return;
    }
    gameIsRunning = true;
    console.log('Game is starting...');
    const playerSelection = getPlayerChoice();
    const computerChoice = getComputerChoice();
    let winner;
    if (playerSelection) {
        winner = getWinner(computerChoice, playerSelection);
    } else {
        winner = getWinner(computerChoice);
    }
    let message = `You picked ${
        playerSelection || DEFAULT_USER_CHOICE
    }, computer picked ${computerChoice}, therefore you `;
    if (winner === RESULT_DRAW) {
        message += `had a draw.`;
    } else if (winner === RESULT_PLAYER_WIN) {
        message += `won.`;
    } else {
        message += `lost.`;
    }
    alert(message);
    gameIsRunning = false;
});

const combine = (resultHandler, operation, ...numbers) => {
    const validateNum = (number) => {
        return isNaN(number) ? 0 : number;
    };

    let result = numbers.reduce((acc, cur) => {
        if(operation === 'ADD')
            return acc + validateNum(cur);
        else if (operation === 'SUBTRACT')
            return acc - validateNum(cur);
    }, 0);
    resultHandler(result);
};

// const subtrackUp = function (...numbers) {
//     let sub = 0;
//     for (const el of numbers) {
//         sub -= el;
//     }
//     return console.log('subtrackUp: ', sub);
// };

const showResult = (messageText, result) => {
    alert(messageText+ ' ' + result);
};
combine(showResult.bind(this, 'the result after adding all numbers : '),'ADD', -2, -5, 10, -3, 6, 10);//16
combine(showResult.bind(this, 'the result after adding all numbers : '), 'ADD', 2, -5, 10, -3, 6, 10, 25, 88, 'aa'); //88 + 44=133
combine(showResult.bind(this, 'the result after subtracting all numbers : '), 'SUBTRACT', 1, 10, 15, 20);
