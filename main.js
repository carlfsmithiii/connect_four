const gameGridNode = document.getElementById("game_grid");
const gameGridArray = [[]];

let currentColor = "red";

const gamePieceEnum = Object.freeze({
    "BLACK": {
        color: "black",
    },
    "RED": {
        color: "red",
    }
});

function initGameArray() {
    for (let column = 0; column < 7; column++) {
        gameGridArray.push([]);
    }
}

gameGridNode.addEventListener("click", function dropToken(event) {
    const token = getNewGameToken();
    const columnNode = event.target;
    const columnNumber = Number(columnNode.dataset.column);
    const tokenColor = token.dataset.color;
    gameGridArray[columnNumber].push([tokenColor]);
    columnNode.appendChild(token);
    checkVerticalWin(columnNumber, tokenColor);
    checkHorizontalWin(columnNumber, columnNode.childElementCount - 1, tokenColor);
});

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

function checkLeft(columnNumber, rowNumber, colorString) {
    if (!isFilledArrayPosition(columnNumber, rowNumber) || gameGridArray[columnNumber][rowNumber] != colorString) {
        return 0;
    } else {
        // console.log(gameGridArray[columnNumber][rowNumber]);
        return 1 + checkLeft(columnNumber - 1, rowNumber, colorString);
    }
}

function checkRight(columnNumber, rowNumber, colorString) {
    if (!isFilledArrayPosition(columnNumber, rowNumber) || gameGridArray[columnNumber][rowNumber] != colorString) {
        return 0;
    } else {
        return 1 + checkRight(columnNumber + 1, rowNumber, colorString);
    }
}

function checkUpRight(columnNumber, rowNumber, colorString) {
    if (!isFilledArrayPosition(columnNumber, rowNumber) || gameGridArray[columnNumber][rowNumber] != colorString) {
        return 0;
    } else {
        return 1 + checkRight(Number(columnNumber) + 1, rowNumber, colorString);
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