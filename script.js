// Selecting necessary elements from the DOM
let board = document.querySelector(".board"); // Selecting the game board
let player = document.querySelector(".player"); // Selecting the element displaying the current player
let playAgain = document.querySelector(".playAgain"); // Selecting the "Play Again" button
let restart = document.querySelector(".restart"); // Selecting the restart section
let angrybird = document.querySelector(".angrybird"); // Selecting the angry bird image 1
let angrybird2 = document.querySelector(".angrybird2"); // Selecting the angry bird image 2
let box = 0; // Variable to keep track of filled boxes

// Array containing all possible winning combinations
let winningArray = [
    [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10], [34, 33, 32, 31], [14, 15, 16, 17],
    [27, 26, 25, 24], [21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 30, 31], [13, 12, 11, 10],
    [35, 36, 37, 38], [6, 5, 4, 3], [0, 7, 14, 21], [41, 34, 27, 20], [1, 8, 15, 22],
    [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], [3, 10, 17, 24], [38, 31, 24, 17],
    [4, 11, 28, 25], [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15],
    [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24],
    [41, 33, 25, 17], [7, 15, 23, 31], [34, 26, 18, 10],
    [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17],
    [6, 12, 18, 24], [28, 22, 16, 10], [13, 19, 25, 31],
    [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18],
    [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
    [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25],
    [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32],
    [11, 7, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4],
    [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9],
    [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25],
    [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30],
    [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],
    [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31],
    [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
];

// Variable to store the current player (initially set to player 1)
let currentPlayer = 1;

// Event listener for when the DOM content is loaded, calls the loadDOM function
document.addEventListener("DOMContentLoaded", loadDOM);

// Function to create the game board
function createBoard() {
    for (let i = 0; i < 49; i++) { // Loop to create 49 squares for the board
        let div = document.createElement("div"); // Create a new div element for each square
        div.setAttribute("data-id", i); // Set the data-id attribute for each square
        div.className = "square"; // Set the class name for each square as "square"
        if (i >= 42) { // Set class name to "taken" for squares in the top rows to prevent further moves
            div.className = "taken";
        }
        board.appendChild(div); // Append the square to the game board
    }
}

// Function to load the DOM content
function loadDOM() {
    createBoard(); // Create the game board
    player.innerHTML = currentPlayer; // Display the current player
    let squares = document.querySelectorAll(".board div"); // Select all squares on the board
    Array.from(squares).forEach(square => {
        square.addEventListener("click", clickBox); // Add click event listener to each square
    });
    playAgain.addEventListener("click", reset); // Add click event listener to the "Play Again" button
}

// Function to handle clicking on a square
function clickBox() {
    let squares = document.querySelectorAll(".board div"); // Select all squares on the board
    let click = parseInt(this.dataset.id); // Get the clicked square's index
    if (squares[click + 7].classList.contains("taken") && !squares[click].classList.contains("taken")) {
        // Check if the clicked square is playable
        if (currentPlayer === 1) { // If it's player 1's turn
            currentPlayer = 2; // Switch to player 2
            player.innerHTML = currentPlayer; // Update the displayed current player
            this.className = "player-one taken"; // Set class for the clicked square for player 1
            player.style.color = "green";
            player.text
            checkWon(); // Check if there's a winner
        } else if (currentPlayer === 2) { // If it's player 2's turn
            currentPlayer = 1; // Switch to player 1
            player.innerHTML = currentPlayer; // Update the displayed current player
            this.className = "player-two taken"; // Set class for the clicked square for player 2
            player.style.color = "red"; 
            checkWon(); // Check if there's a winner
        }
        if (box === 42) { // Check if all boxes are filled
            setTimeout(() => alert("boxes filled"), 300); // Show alert
            setTimeout(() => restart.style.display = "flex", 500); // Show restart button
        }
    } else {
        alert("You cannot build on an empty space or on a space that has been built on"); // Alert if square is not playable
    }
}

// Function to check if there's a winner
function checkWon() {
    let squares = document.querySelectorAll(".board div"); // Select all squares on the board
    for (let y = 0; y < winningArray.length; y++) { // Loop through each winning combination
        let square = winningArray[y]; // Get a winning combination
        if (square.every(q => squares[q].classList.contains("player-one"))) { // If player one wins
            setTimeout(() => alert("player one(red) wins "), 200); // Show alert
            setTimeout(() => restart.style.display = "flex", 500); // Show restart button
            setTimeout(() => angrybird2.style.display = "block", 200); // Display angry bird image 2
        } else if (square.every(q => squares[q].classList.contains("player-two"))) { // If player two wins
            setTimeout(() => alert("player two(yellow) wins"), 200); // Show alert
            setTimeout(() => restart.style.display = "flex", 500); // Show restart button
            setTimeout(() => angrybird.style.display = "block", 200); // Display angry bird image 1
        }
    }
}

// Function to reset the game
function reset() {
    board.innerHTML = ""; // Clear the game board
    loadDOM(); // Reload the DOM content
    restart.style.display = "none"; // Hide the restart button
    angrybird.style.display = "block"; // Display angry bird image 1
    angrybird.style.display = "none"; // Hide angry bird image 1
    angrybird2.style.display = "none"; // Hide angry bird image 2
}
