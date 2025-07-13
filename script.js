// Select all important elements
const startButton = document.getElementById("start-button");
const gameContainer = document.querySelector(".Game-container");
const difficultySelect = document.getElementById("difficulty");
const startMenu = document.querySelector(".start-menu");
const menuButton = document.getElementById("menu-button");
const cells = document.querySelectorAll(".cell");
const minesCount = document.getElementById("mines-count");
const scoreCount = document.getElementById("score-count");
const popup = document.querySelector('.popup');
const playAgainButton = document.getElementById("play-again-button");

let gameOver = false;

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        openCell(cell);
    });
});

function openCell(cell) {
    if (cell.textContent !== "" || gameOver) return;
    let randomGenerator = Math.floor(Math.random() * 10); // 0 to 9

    if (difficultySelect.value === "easy" && randomGenerator < 3) {
        cell.textContent = "💣";
        minesCount.textContent = parseInt(minesCount.textContent) - 1;
    } else if (difficultySelect.value === "medium" && randomGenerator < 5) {
        cell.textContent = "💣";
        minesCount.textContent = parseInt(minesCount.textContent) - 1;
    } else if (difficultySelect.value === "hard" && randomGenerator < 7) {
        cell.textContent = "💣";
        minesCount.textContent = parseInt(minesCount.textContent) - 1;
    } else {
        cell.textContent = "💎";
    }
    scoreUpdate(cell);
    checkAllCellsFilled();
}

function scoreUpdate(cell) {
    if (cell.textContent === "💎") {
        if (difficultySelect.value === "easy") {
            scoreCount.textContent = parseInt(scoreCount.textContent) + 10;
        } else if (difficultySelect.value === "medium") {
            scoreCount.textContent = parseInt(scoreCount.textContent) + 15;
        } else if (difficultySelect.value === "hard") {
            scoreCount.textContent = parseInt(scoreCount.textContent) + 20;
        }
    }
    winMsg();
}
function checkAllCellsFilled() {
    let allFilled = true;
    cells.forEach(cell => {
        if (cell.textContent === "") {
            allFilled = false;
        }
    });
    if (allFilled) {
        gameOver = true;
        popup.style.display = "block";
        document.getElementById("popup-text").textContent =
            "Wow! You cleared all cells safely! 🌟\nYour Score : " + scoreCount.textContent;
        gameContainer.classList.add("Blur")
    }
}

function winMsg() {
    if (minesCount.textContent === "0") {
        gameOver = true;
        popup.style.display = "block";
        document.getElementById("popup-text").textContent =
            "Your Score : " + scoreCount.textContent + " 😀";
        gameContainer.classList.add("Blur");
    }
}

startButton.addEventListener("click", () => {
    gameContainer.style.display = "block";
    startMenu.style.display = "none";
    gameOver = false;

    if (difficultySelect.value === "easy") {
        minesCount.textContent = "5";
    } else if (difficultySelect.value === "medium") {
        minesCount.textContent = "5";
    } else if (difficultySelect.value === "hard") {
        minesCount.textContent = "10";
    } else {
        alert("Please select a difficulty.");
        return;
    }

    // Reset score and all cells
    scoreCount.textContent = "0";
    cells.forEach(cell => {
        cell.textContent = "";
    });
});

// Menu button brings you back to start
menuButton.addEventListener("click", () => {
    startMenu.style.display = "block";
    gameContainer.style.display = "none";
    gameOver = false;

    scoreCount.textContent = "0";
    minesCount.textContent = "0";
    cells.forEach(cell => {
        cell.textContent = "";
    });
});

playAgainButton.addEventListener("click", () => {
    popup.style.display = "none";
    gameContainer.classList.remove("Blur");
    gameContainer.style.display = "none";
    startMenu.style.display = "block";
    scoreCount.textContent = "0";
    minesCount.textContent = "0";
    gameOver = false;

    cells.forEach(cell => {
        cell.textContent = "";
    });
});
