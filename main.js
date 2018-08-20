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
    checkAscendingSlant(columnNumber, columnNode.childElementCount - 1, tokenColor);
    checkDescendingSlant(columnNumber, columnNode.childElementCount - 1, tokenColor);
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

function checkAscendingSlant(columnNumber, rowNumber, colorString) {
    if ((checkUpRight(columnNumber, rowNumber, colorString) + checkDownLeft(columnNumber, rowNumber, colorString) - 1) >= 4) {
        console.log("WIN");
    } 
}

function checkUpRight(columnNumber, rowNumber, colorString) {
    if (!isFilledArrayPosition(columnNumber, rowNumber) || gameGridArray[columnNumber][rowNumber] != colorString) {
        return 0;
    } else {
        return 1 + checkUpRight(columnNumber + 1, rowNumber + 1, colorString);
    }
}

function checkDownLeft(columnNumber, rowNumber, colorString) {
    if (!isFilledArrayPosition(columnNumber, rowNumber) || gameGridArray[columnNumber][rowNumber] != colorString) {
        return 0;
    } else {
        return 1 + checkDownLeft(columnNumber - 1, rowNumber - 1, colorString);
    }
}

function checkDescendingSlant(columnNumber, rowNumber, colorString) {
    if ((checkDownRight(columnNumber, rowNumber, colorString) + checkUpLeft(columnNumber, rowNumber, colorString) - 1) >= 4) {
        console.log("WIN");
    } 
}

function checkDownRight(columnNumber, rowNumber, colorString) {
    if (!isFilledArrayPosition(columnNumber, rowNumber) || gameGridArray[columnNumber][rowNumber] != colorString) {
        return 0;
    } else {
        return 1 + checkDownRight(columnNumber + 1, rowNumber - 1, colorString);
    }
}

function checkUpLeft(columnNumber, rowNumber, colorString) {
    if (!isFilledArrayPosition(columnNumber, rowNumber) || gameGridArray[columnNumber][rowNumber] != colorString) {
        return 0;
    } else {
        return 1 + checkUpLeft(columnNumber - 1, rowNumber + 1, colorString);
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