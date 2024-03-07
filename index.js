let boxes = document.querySelectorAll('.box')
let box = 1;
let main = document.getElementById('main')
let winner = document.getElementById('winner')
let restart = document.getElementById('restart')
let playAgain = document.getElementById('play-again')
let mainH1 = document.getElementById('main-h1')
let playWith = document.getElementById('play-with')
let PlayTime = document.getElementById('play-time')
let gameEnd=false;
PlayTime.style.display = 'none'
let playerGame = true;
if (playerGame) {
    playWith.innerHTML = "Play with Computer"
} else {
    playWith.innerHTML = "Play with Friend"
}
let methodApply = false;
winner.innerHTML
let setTimeout1;
let setTimeout2;
let playTime = false;
let firstTurn;
let computerTurn = true;
let computerTurnComplete = false;
let restartFunc;
let oneClick = true;
let turn = true
let draw = 0;
let gameError;
let winningPatterens = [
    [0, 4, 8],
    [2, 4, 6],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]
//Game endind fuction
const gameFinish = () => {
    gameEnd=true;
    gameError()
    oneClick = true;
    boxes.forEach(box => {
        box.disabled = true;
        box.classList.add('blurBox')
    })
    restart.classList.add('blurBox')
    playWith.classList.add('blurBox')
    PlayTime.classList.add('blurBox')
    playAgain.style.display = "";
    restart.disabled = true;
    playWith.disabled = true;
    PlayTime.disabled = true;
    main.classList.add('blurBackground')
    mainH1.classList.add('blur-h1')
}
//                                Play with funciton
const playTimePlayer = () => {
    if (!playerGame) {
        let rn = Math.round(Math.random() * 8)
        if (boxes[rn].innerHTML === "") {
            boxes[rn].innerText = 'X'
            boxes[rn].disabled = true;
            draw += 1
            checkWinner()
            computerTurn = true
            setTimeout1 = setTimeout(() => {
                computerTurnFunction()
                computerTurn = false;
                oneClick = true;
            }, 2000)
            oneClick = false;
        } else {
            playTimePlayer()
        }
    }
}
PlayTime.addEventListener('click', () => {
        if (playTime === true) {
            playTime = false;
            PlayTime.innerHTML = "With Time"
        } else {
            playTime = true;
            PlayTime.innerHTML = "Without Time"
        }
        restartFunc()
})
let playTimeFunc = (cValue) => {
    console.log("Play Time funciton is calling")
    setTimeout2 = setTimeout(() => {
        console.log("Play auto is running")
        if (cValue !== draw) {
            if (!playerGame) {
                playTimePlayer()
            }
        }
    }, 2000)
}

let playWithFunc = () => {
        gameError()
        if (playerGame) {
            playerGame = false;
            playTime = false;
            computerTurn = false;
            playWith.innerHTML = "Play with Person"
            PlayTime.style.display = ""
            PlayTime.innerHTML = "With Time"
        } else {
            playTime = false;
            computerTurn = false;
            playerGame = true;
            playWith.innerHTML = "Play with Computer"
            PlayTime.style.display = 'none'
        }
        restartFunc()
}
playWith.addEventListener('click', playWithFunc)

///////////////////////////////////////////////////////////
// Checking game end or not
const checkWinner = () => {
    if (draw === 9) {
        winner.innerHTML = "Match is draw"
        gameError()
        gameFinish()
    }
    winningPatterens.forEach(patteren => {
        let val1 = boxes[patteren[0]].innerHTML
        let val2 = boxes[patteren[1]].innerHTML
        let val3 = boxes[patteren[2]].innerHTML
        if (val1 !== "" && val2 !== "" && val3 !== "") {
            if (val1 === val2 && val2 === val3) {
                if (!playerGame) {
                    if (val1 === "X") {
                        winner.innerHTML = 'You are Winner'
                    } else {
                        winner.innerHTML = 'Computer is Winner'
                    }
                } else {
                    winner.innerHTML = `Player ${val1} is Winner`
                }
                gameError()
                gameFinish()
            }
        }
    })
}
// Computer code
let computerCheckError = (draw1) => {
    let boxArr = []
    boxes.forEach(box => {
        if (box.innerHTML !== "") {
            boxArr.push(1)
        }
    })
    if (draw1 !== boxArr.length) {
        for (let i = 0; i < 9; i++) {
            if (boxes[i].innerHTML === "") {
                boxes[i].innerHTML = "O"
                boxes[i].disabled = true
                draw += 1
                boxArr.push(1)
                computerTurnComplete = true;
                checkWinner()
                break;
            }
        }
    }
}

/////////////////////////////////     Computer win code      ////////////////////////////////////////////////////
const computerWin = () => {
    for (let i = 0; i < winningPatterens.length; i++) {
        let pattern = winningPatterens[i]
        let pattern0 = boxes[pattern[0]].innerHTML
        let pattern1 = boxes[pattern[1]].innerHTML
        let pattern2 = boxes[pattern[2]].innerHTML
        if (pattern0 === pattern1 || pattern1 === pattern2 || pattern0 === pattern2) {
            if (pattern0 === pattern1 && pattern0 === "O" && pattern2 === "") {
                boxes[pattern[2]].innerHTML = "O"
                boxes[pattern[2]].disabled = "true"
                draw += 1
                computerTurnComplete = true;
                checkWinner()
                return true;
            } else if (pattern1 === pattern2 && pattern1 === "O" && pattern0 === "") {
                boxes[pattern[0]].innerHTML = "O"
                boxes[pattern[0]].disabled = "true"
                computerTurnComplete = true;
                draw += 1
                checkWinner()
                return true;
            } else if (pattern0 === pattern2 && pattern0 === "O" && pattern1 === "") {
                boxes[pattern[1]].innerHTML = "O"
                boxes[pattern[1]].disabled = "true"
                computerTurnComplete = true;
                draw += 1
                checkWinner()
                return true;
            }
        }
    }
    return false;
}
//////////////////////////////////////////////////////////////////////////////////////
const computerTurnFunction = () => {
    if (!playerGame) {
        computerTurnComplete = false;
        if (!computerWin()) {
            for (let i = 0; i < winningPatterens.length; i++) {
                let pattern = winningPatterens[i]
                let pattern0 = boxes[pattern[0]].innerHTML
                let pattern1 = boxes[pattern[1]].innerHTML
                let pattern2 = boxes[pattern[2]].innerHTML
                if (pattern0 === pattern1 || pattern1 === pattern2 || pattern0 === pattern2) {
                    if (pattern0 === pattern1 && pattern0 !== "" && pattern2 === "") {
                        boxes[pattern[2]].innerHTML = "O"
                        boxes[pattern[2]].disabled = "true"
                        draw += 1
                        computerTurnComplete = true;
                        checkWinner()
                        break;
                    } else if (pattern1 === pattern2 && pattern1 !== "" && pattern0 === "") {
                        boxes[pattern[0]].innerHTML = "O"
                        boxes[pattern[0]].disabled = "true"
                        computerTurnComplete = true;
                        draw += 1
                        checkWinner()
                        break;
                    } else if (pattern0 === pattern2 && pattern0 !== "" && pattern1 === "") {
                        boxes[pattern[1]].innerHTML = "O"
                        boxes[pattern[1]].disabled = "true"
                        computerTurnComplete = true;
                        draw += 1
                        checkWinner()
                        break;
                    }
                }
            }
        }
        if (!computerTurnComplete) {
            for (let i = 0; i < winningPatterens.length; i++) {
                let pattern = winningPatterens[i]
                let pattern0 = boxes[pattern[0]].innerHTML
                let pattern1 = boxes[pattern[1]].innerHTML
                let pattern2 = boxes[pattern[2]].innerHTML
                if (pattern0 !== "" && (pattern1 === "" || pattern2 === "")) {
                    if (pattern1 === "" && pattern2 === "") {
                        let rInt = Math.random()
                        if (rInt < 0.54) {
                            boxes[pattern[2]].innerHTML = "O"
                            boxes[pattern[2]].disabled = true
                        } else {
                            boxes[pattern[1]].innerHTML = "O"
                            boxes[pattern[1]].disabled = true
                        }
                    } else {
                        if (pattern2 === "") {
                            boxes[pattern[2]].innerHTML = "O"
                            boxes[pattern[2]].disabled = true
                        } else {
                            boxes[pattern[1]].innerHTML = "O"
                            boxes[pattern[1]].disabled = true
                        }
                    }
                    draw += 1
                    checkWinner()
                    break;
                } else if (pattern1 !== "" && (pattern2 === "" || pattern0 === "")) {
                    if (pattern0 === "" && pattern2 === "") {
                        let rInt = Math.random()
                        if (rInt < 0.54) {
                            boxes[pattern[0]].innerHTML = "O"
                            boxes[pattern[0]].disabled = true
                        } else {
                            boxes[pattern[2]].innerHTML = "O"
                            boxes[pattern[2]].disabled = true
                        }
                    } else {
                        if (pattern0 === "") {
                            boxes[pattern[0]].innerHTML = "O"
                            boxes[pattern[0]].disabled = true
                        } else {
                            boxes[pattern[2]].innerHTML = "O"
                            boxes[pattern[2]].disabled = true
                        }
                    }
                    draw += 1
                    checkWinner()
                    break;
                } else if (pattern2 !== "" && (pattern0 === "" || pattern1 === "")) {
                    if (pattern0 === "" && pattern1 === "") {
                        let rInt = Math.random()
                        if (rInt < 0.54) {
                            boxes[pattern[0]].innerHTML = "O"
                            boxes[pattern[0]].disabled = true
                        } else {
                            boxes[pattern[1]].innerHTML = "O"
                            boxes[pattern[1]].disabled = true
                        }
                    } else {
                        if (pattern0 === "") {
                            boxes[pattern[0]].innerHTML = "O"
                            boxes[pattern[0]].disabled = true
                        } else {
                            boxes[pattern[1]].innerHTML = "O"
                            boxes[pattern[1]].disabled = true
                        }
                    }
                    draw += 1
                    checkWinner()
                    break;
                }
            }
        }
        computerCheckError(draw)
        if (playTime && !gameEnd) {
            console.log("Error occur")
            playTimeFunc(draw + 1)
        }
    }
}

// first turn computer code
gameError = () => {
    if (setTimeout1 !== undefined) {
        clearTimeout(setTimeout1);
        computerTurn = false;
        oneClick = true;
    }
    if (setTimeout2 !== undefined) {
        clearTimeout(setTimeout2)
    }
}
const firstTurnFunction = () => {
    if (!playerGame) {
        firstTurn = !confirm('Do you want to start the game');
        if (firstTurn) {
            let rn = Math.random()
            if (rn < 0.35) {
                boxes[4].innerHTML = "O"
                boxes[4].disabled = true;
                draw += 1;
                firstTurn = false;
            } else {
                let rn = Math.round(Math.random() * 7) + 1
                boxes[rn].innerHTML = "O"
                boxes[rn].disabled = true;
                draw += 1;
                firstTurn = false;
            }
        }
        computerTurn = false;
        console.log(playTime)
        if (playTime) {
            gameEnd=false;
            playTimeFunc(draw + 1)
        }
    }
}
firstTurnFunction()
/////////////////////////////////////////////////////////////////////////////////////////////////
const computerFunction = (box) => {
    if (oneClick) {
        setTimeout1 = setTimeout(() => {
            computerTurnFunction()
            computerTurn = false;
            oneClick = true;
        }, 2000)
        oneClick = false;
    }
    if (!computerTurn) {
        if(setTimeout2!==undefined){
            clearTimeout(setTimeout2)
        }
        box.innerText = 'X'
        box.disabled = true;
        draw += 1
        checkWinner()
        computerTurn = true
    }
}

// box Event Listener
boxes.forEach((box) => {
    box.addEventListener(('click'), () => {
        if (playerGame) {
            if (turn) {
                box.innerHTML = 'O'
                turn = false
            } else {
                box.innerText = 'X'
                turn = true
            }
            draw += 1
            checkWinner()
            box.disabled = true;
        } else {
            computerFunction(box)
        }
    })
})
/////////////////////////////////////////////////////////////////////////
// Restart Button
restartFunc = (value) => {
        console.log("Restart function is running")
        gameError()
        computerTurnComplete = false;
        draw = 0;
        if(value===true){
            playTime=true
        }
        boxes.forEach((box) => {
            box.innerHTML = ""
            box.disabled = false;
        })
        firstTurnFunction()
}
restart.addEventListener('click', restartFunc)
// Play Button
playAgain.addEventListener('click', () => {
    gameEnd=false;
    computerTurnComplete = false;
    draw = 0
    boxes.forEach((box) => {
        box.innerHTML = ""
        box.disabled = false;
        box.classList.remove('blurBox')
    })
    restart.classList.remove('blurBox')
    playWith.classList.remove('blurBox')
    PlayTime.classList.remove('blurBox')
    winner.innerHTML = ""
    restart.disabled = false;
    playWith.disabled = false;
    playAgain.style.display = 'none'
    PlayTime.disabled = false;
    main.classList.remove('blurBackground')
    mainH1.classList.remove('blur-h1')
    firstTurnFunction()
})