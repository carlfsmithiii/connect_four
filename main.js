const gameGridNode = document.getElementById("game_grid");
const screen = document.getElementById("screen");
const gameGridArray = [];

let isWon = false;
let lastClickTimeStamp = 0;

let currentColor = "black";

function initGameArray() {
    for (let column = 0; column < 7; column++) {
        gameGridArray.push([]);
    }
    for (let i = 0; i < 6 * 7; i++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("blue_border");
        screen.appendChild(gridItem);
    }
}

gameGridNode.addEventListener("click", function dropToken(event) {
    const columnNode = event.target;
    
    if (isConditionInvalid(columnNode)) {
        return;
    }

    const rowNumber = columnNode.childElementCount;
    const token = getNewGameToken(rowNumber);
    const columnNumber = Number(columnNode.dataset.column);
    const tokenColor = token.dataset.color;
    gameGridArray[columnNumber].push([tokenColor]);
    columnNode.appendChild(token);
    checkWin(columnNumber, rowNumber, tokenColor);
});

function isConditionInvalid(columnNode) {
    if (isWon) {
        return true;
    }
    if (!columnNode.classList.contains("column")) {
        return true;
    }
    if (columnNode.childElementCount >= 6) {
        return true;
    }
    if (lastClickTimeStamp > Date.now() - 1000) {
        return true;
    }
    lastClickTimeStamp = Date.now();
    return false;
}

function checkWin(columnNumber, rowNumber, color) {
    checkVerticalWin(columnNumber, color);
    checkHorizontalWin(columnNumber, rowNumber, color);
    checkAscendingSlant(columnNumber, rowNumber, color);
    checkDescendingSlant(columnNumber, rowNumber, color); 
}

function getNewGameToken(rowNumber) {
    const token = document.createElement("span");
    const color = getNextTokenColor();
    token.classList.add("token", color, "token" + rowNumber);
    token.dataset.color = color;
    return token;
}

function getNextTokenColor() {
    toggleCurrentColor();
    const color = currentColor;
    return color;
}

function toggleCurrentColor() {
    if (currentColor == "red") {
        currentColor = "black";
    } else {
        currentColor = "red";
    }
}

function checkVerticalWin(columnNumber, colorString) {
    if (gameGridArray[columnNumber].join('').includes(colorString.repeat(4))) {
        win();
    }
}

function checkHorizontalWin(columnNumber, rowNumber, colorString) {
    if ((checkLeft(columnNumber, rowNumber, colorString) + checkRight(columnNumber, rowNumber, colorString) - 1) >= 4) {
        win();
    } 
}


function checkDescendingSlant(columnNumber, rowNumber, colorString) {
    if ((checkDownRight(columnNumber, rowNumber, colorString) + checkUpLeft(columnNumber, rowNumber, colorString) - 1) >= 4) {
        win();
    } 
}

function checkAscendingSlant(columnNumber, rowNumber, colorString) {
    if ((checkUpRight(columnNumber, rowNumber, colorString) + checkDownLeft(columnNumber, rowNumber, colorString) - 1) >= 4) {
        win();
    } 
}

function checkLeft(columnNumber, rowNumber, colorString) {
    return checkNext(columnNumber, rowNumber, colorString, -1, 0);
}

function checkRight(columnNumber, rowNumber, colorString) {
    return checkNext(columnNumber, rowNumber, colorString, 1, 0);
}

function checkDownLeft(columnNumber, rowNumber, colorString) {
    return checkNext(columnNumber, rowNumber, colorString, -1, -1);
}


function checkUpRight(columnNumber, rowNumber, colorString) {
    return checkNext(columnNumber, rowNumber, colorString, 1, 1);
}


function checkDownRight(columnNumber, rowNumber, colorString) {
    return checkNext(columnNumber, rowNumber, colorString, 1, -1);
}

function checkUpLeft(columnNumber, rowNumber, colorString) {
    return checkNext(columnNumber, rowNumber, colorString, -1, 1);
}

function checkNext(columnNumber, rowNumber, colorString, columnShift, rowShift) {
    if (!isFilledArrayPosition(columnNumber, rowNumber) || gameGridArray[columnNumber][rowNumber] != colorString) {
        return 0;
    } else {
        return 1 + checkNext(columnNumber + columnShift, rowNumber + rowShift, colorString, columnShift, rowShift);
    }
}


function isFilledArrayPosition(columnNumber, rowNumber) {
    try {
        let accessed = gameGridArray[columnNumber][rowNumber];
        return true;
    } catch (error) {
        if (error instanceof TypeError) {
            return false;
        } else {
            throw error;
        }
    }
}

function win() {
    isWon = true;
    const winningText = document.createTextNode((currentColor + " wins!").toUpperCase());
    const winningDisplayHeader = document.createElement("h1");
    winningDisplayHeader.appendChild(winningText);
    winningDisplayHeader.style.fontSize = "5em";
    winningDisplayHeader.style.color = currentColor;
    document.body.appendChild(winningDisplayHeader);
}

initGameArray();