//global variables

let Word = require("./word.js");

let Letter = require("./letter.js")

let inquirer = require("inquirer");

let computerChoices = ["hello", "goodbye", "love", "peace", "freedom", "strength"];

let count = 0;

let winCount = 0;

let guessCount = 15;

let guessSoFar = [];


Word.prototype.splitWord = function (selectedWord) {
    let selectedLetters = [];
    selectedLetters = selectedWord.split("");
    this.matches = selectedLetters.length
    return selectedLetters
};

Letter.prototype.findMatches = function (userGuess, computerArray) {
    // checking value

    let indexes = [],i;
    for (i = 0; i <computerArray.length; i++)
        if( computerArray[i]===userGuess.value) {
        indexes.push(i);
        }
    return indexes;
};


// create and store new word object

let computerWord = new Word(computerChoices);
let computerGuess = computerWord.selectedWord;

// console.log(computerGuess);

computerArray = computerWord.splitWord(computerGuess);
//
// console.log(computerArray);

displayArray = computerWord.emptyDisplayWord(computerArray.length);
console.log(displayArray.join(""));


function resetAll() {

    count = 0;
    guessCount=15;
    // console.log(`\n Guess count: + ${guessCount} + \n`);
    guessSoFar= [];
    // console.log(`\n Guesses so far + ${guessSoFar}`);
    // console.log(displayArray.join(""));

}

let askQuestion = function () {
    if (count <15) {


        inquirer.prompt([
            {
                name: "userGuess",
                message:"What letter do you choose? "
            }

            // promise
        ]).then(function (answers) {

            let newLetter = answers.userGuess;

            if(guessSoFar.indexOf(newLetter) < 0){
                guessSoFar.push(newLetter);
            }

            console.log("---Guesses so far --[" +guessSoFar.join(",") + "]-----");

            guessCount--;

            console.log("----Guess count:" + guessCount + "--------");
            console.log("");

            let matches = computerWord.CheckAnswer(newLetter,computerArray);
            // console.log("it works");
            // debugger;

            displayArray = computerWord.displayLetters;

            console.log(displayArray.join(""));
            console.log("");

            if (matches == 0) {
                console.log("You won!!! :)");

                resetAll()
            }
            else {
                count++;
                askQuestion();
            }
    });

    }
    else {
        inquirer.prompt([
        {
            type: "confirm",
            message:" would you like to end game",
            name: "end",
            default: true

        }
    ]).then(function(answer) {
        if (answer.confirm) {
            resetAll();

        }
        else {
            console.log("too bad! =/")
            resetAll();
        }

    });

    }

};

askQuestion();