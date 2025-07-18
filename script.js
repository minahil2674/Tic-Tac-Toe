let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-game");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turno = true; // true for O, false for X
let clickCount = 0; // To track clicks for draw detection

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6]
];

const resetgame = () => {
    turno = true;
    clickCount = 0; // Reset click count
    enableBoxes();
    msgcontainer.classList.add("hide");
    boxes.forEach(box => {
        box.classList.remove("winning-box"); // Remove winning highlight
    });
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turno) {
            box.innerText = "O";
            box.style.color = "#3498db"; // Blue for O
            turno = false;
        } else {
            box.innerText = "X";
            box.style.color = "#e74c3c"; // Red for X
            turno = true;
        }
        box.disabled = true;
        clickCount++; // Increment click count
        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.color = ""; // Reset color
    }
};

const showWinner = (winner, pattern = []) => {
    msg.innerText = `Congratulations, Winner is ${winner}!`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
    highlightWinningBoxes(pattern); // Highlight the winning line
    triggerConfetti(); // Trigger confetti effect
};

const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const highlightWinningBoxes = (pattern) => {
    pattern.forEach(index => {
        boxes[index].classList.add("winning-box");
    });
};

const triggerConfetti = () => {
    const confettiCount = 50;
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `${Math.random() * 100}vh`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        confetti.style.animationDuration = `${1 + Math.random() * 1}s`;
        document.body.appendChild(confetti);

        // Remove confetti element after animation
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
};

const checkWinner = () => {
    let winnerFound = false;
    for (let pattern of winpatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val, pattern);
                winnerFound = true;
                break; // Exit loop once winner is found
            }
        }
    }

    // Check for draw if no winner is found and all boxes are filled
    if (!winnerFound && clickCount === 9) {
        showDraw();
    }
};

newGamebtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);