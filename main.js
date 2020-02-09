"use strict";

const assert = require("assert");
const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let board = [];
let solution = "";
let letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

const printBoard = () => {
	for (let i = 0; i < board.length; i++) {
		console.log(board[i]);
	}
};

const generateSolution = (guess) => {
	for (let i = 0; i < 4; i++) {
		const randomIndex = getRandomInt(0, letters.length);
		solution += letters[randomIndex];
	}
};

const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};

//if (solutionArray[i] === guessArray[i]) is comparing the value in the same index for each array to see if they are equal.
//if if (guessArray.indexOf(solutionArray[i]) > -1) looks for same values in the array (but not matchin index)

const generateHint = (guess) => {
	let solutionArray = solution.split(""); //splits into an array
	let guessArray = guess.split("");
	let correctLetterLocations = 0; // sets letter locations to zero
	let correctLetter = 0; // sets correct letters to zero
	for (let i = 0; i < solutionArray.length; i++) {
		//loops over the solution array and checks the guess array for the correct letter in the correct index
		if (solutionArray[i] === guessArray[i]) {
			correctLetterLocations++; //counts the correct letters in the correct index
			solutionArray[i] = null; // after looping over each element it is set to null
		}
	}
	for (let i = 0; i < solutionArray.length; i++) {
		//with indexOf must have a comparison or method will not work
		if (guessArray.indexOf(solutionArray[i]) > -1) {
			let targetIndex = i;
			correctLetter++;
			solutionArray[targetIndex] = null;
		}
	}
	let hint = correctLetterLocations.toString() + "-" + correctLetter.toString();
	return hint;
};

// Spec 4 - End the game After 10 incorrect guesses, if the board length equals 10, return 'You ran out of turns! The solution was ' and the solution. Otherwise, return 'Guess again.'.

const mastermind = (guess) => {
	if (solution == null) {
		// indicates to NOT generate a new solution if one is already present
		generateSolution();
	}
	if (guess === solution) {
		// evaluates for a win.
		return "You're a MASTERMIND!";
	}
	let hint = generateHint(guess); //calls the generateHint function
	let presentGuess = guess + hint; //combines the guess and hint into a string
	board.push(presentGuess); //pushes the string into let board = [];
};

const getPrompt = () => {
	rl.question("guess: ", (guess) => {
		mastermind(guess);
		printBoard();
		getPrompt();
	});
};

// Tests

if (typeof describe === "function") {
	solution = "abcd";
	describe("#mastermind()", () => {
		it("should register a guess and generate hints", () => {
			mastermind("aabb");
			assert.equal(board.length, 1);
		});
		it("should be able to detect a win", () => {
			assert.equal(mastermind(solution), "You're a MASTERMIND!");
		});
	});

	describe("#generateHint()", () => {
		it("should generate hints", () => {
			assert.equal(generateHint("abdc"), "2-2");
		});
		it("should generate hints if solution has duplicates", () => {
			assert.equal(generateHint("aabb"), "1-1");
		});
	});
} else {
	generateSolution(guess);
	getPrompt();
}

//
