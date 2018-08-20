const gameGridNode = document.getElementById("game_grid");
const gameGridArray = [[]];

let currentColor = "red";

function initGameArray() {
    for (let column = 0; column < 7; column++) {
        gameGridArray.push([]);
    }
}

gameGridNode.addEventListener("click", function dropToken(event) {
    const columnNode = event.target;

    console.log(columnNode);
    if (!columnNode.classList.contains("column")) {
        return;
    }

    const token = getNewGameToken();
    const columnNumber = Number(columnNode.dataset.column);
    const tokenColor = token.dataset.color;
    gameGridArray[columnNumber].push([tokenColor]);
    columnNode.appendChild(token);
    checkWin(columnNumber, columnNode.childElementCount - 1, tokenColor);
});

function checkWin(columnNumber, rowNumber, color) {
    checkVerticalWin(columnNumber, color);
    checkHorizontalWin(columnNumber, rowNumber, color);
    checkAscendingSlant(columnNumber, rowNumber, color);
    checkDescendingSlant(columnNumber, rowNumber, color); 
}

function getNewGameToken() {
    const token = document.createElement("span");
    const color = getNextTokenColor();
    token.classList.add("token", color);
    token.dataset.color = color;
    return token;
}

function getNextTokenColor() {
    const color = currentColor;
    toggleCurrentColor();
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
        console.log("WIN");
    }
}

function checkHorizontalWin(columnNumber, rowNumber, colorString) {
    if ((checkLeft(columnNumber, rowNumber, colorString) + checkRight(columnNumber, rowNumber, colorString) - 1) >= 4) {
        console.log("WIN");
    } 
}


function checkDescendingSlant(columnNumber, rowNumber, colorString) {
    if ((checkDownRight(columnNumber, rowNumber, colorString) + checkUpLeft(columnNumber, rowNumber, colorString) - 1) >= 4) {
        console.log("WIN");
    } 
}

function checkAscendingSlant(columnNumber, rowNumber, colorString) {
    if ((checkUpRight(columnNumber, rowNumber, colorString) + checkDownLeft(columnNumber, rowNumber, colorString) - 1) >= 4) {
        console.log("WIN");
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


initGameArray();