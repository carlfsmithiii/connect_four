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
    const columnNumber = columnNode.dataset.column;
    const tokenColor = token.dataset.color;
    gameGridArray[columnNumber].push([tokenColor]);
    columnNode.appendChild(token);
    checkVerticalWin(columnNumber, tokenColor);
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


initGameArray();