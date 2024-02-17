const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 13;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

let battleLog = [];
let lastLoggedEntry;

function getMaxLifeValues() {
    const enterValue = prompt('Maximum life for you and th e monster', '');
    const parsedValue = parseInt(enterValue);
    if (isNaN(parsedValue) || parsedValue <= 0) {
        //chosenMaxLife = 100;
        throw {message: 'Invalid user input, not a number!'}
    }
    return parsedValue
}
let chosenMaxLife
try {
    chosenMaxLife = getMaxLifeValues();
} catch (error) { 
    console.log(error)
    chosenMaxLife = 100;
    alert('You entered something wrong value, default value was used.')
} 



let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
    let logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
    };
    switch (ev) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry.target = 'PLAYER';
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry.target = 'PLAYER';
            break;
        case LOG_EVENT_GAME_OVER:
            logEntry = {
                event: ev,
                value: val,
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth,
            };
            break;
        default:
            logEntry = {};
    }

    // if (ev === LOG_EVENT_PLAYER_ATTACK) {
    // } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    // } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    // } else if (ev === LOG_EVENT_PLAYER_HEAL) {
    // } else if (ev === LOG_EVENT_GAME_OVER) {
    // }
    battleLog.push(logEntry);
    // console.log(battleLog)
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = chosenMaxLife;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth,
    );

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('Tou would be dead but the bonus life saved you.');
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('YOU WON');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'Player WON',
            currentMonsterHealth,
            currentPlayerHealth,
        );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('YOU LOSE');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'Monster WON',
            currentMonsterHealth,
            currentPlayerHealth,
        );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('YOU HAVE A DRAW');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'DRAW',
            currentMonsterHealth,
            currentPlayerHealth,
        );
    }

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
}

function attackMonster(mode) {
    let maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    let logEvent =
        mode === MODE_ATTACK
            ? LOG_EVENT_PLAYER_ATTACK
            : LOG_EVENT_PLAYER_STRONG_ATTACK;
    // if (mode === MODE_ATTACK) {
    //     maxDamage = ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_ATTACK;
    // } else if (mode === MODE_STRONG_ATTACK) {
    //     maxDamage = STRONG_ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    // }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
    endRound();
}
function attackHandler() {
    attackMonster(MODE_ATTACK);
}
function strongAttackHandler() {
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("You can't heal to more than your max initial health.");
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += HEAL_VALUE;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth,
    );
    endRound();
}

function printLogHandler() {
    // for (let i = 0; i < battleLog.length; i++) {
    //     console.log(i, battleLog[i])
    // }

    // for (const el of battleLog) {  //index에는 접근할 수  없음 ~> 반복문 외에서 인덱스에 접근할 변수를 생성하여 반복문 내에서 수동으로 증가시켜 접근할 수 있읍(=보기2)
    //     console.log(el)
    // }
    /*보기2
    let index = 0;
    for (const el of battleLog) {
        console.log(el)
        console.log(index)
        index++;
    }*/
    let i = 0;
    for (const logEntry of battleLog) {
        if (!lastLoggedEntry || lastLoggedEntry < i) {
            console.log(`#${i}`);
            for (const key in logEntry) {
                /*객체의 키-값 쌍을 다루기 위한 for-in 반복문이 존재함. */
                // console.log(key)
                // console.log(logEntry[key]);
                console.log(`${key} => ${logEntry[key]}`);
            }
            lastLoggedEntry = i;
            // continue;
        }
        i++;
    }
    console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
