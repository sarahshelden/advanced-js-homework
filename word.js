let Letter = require("./letter.js");

// constructor


let Word = function (computerChoices) {

    this.computerChoices = computerChoices;

    this.selectedWord = computerChoices[Math.floor(Math.random()* computerChoices.length)];
    this.displayLetters = [];

    this.matches = 0;

    this.emptyDisplayWord = function(wordLength) {
        for( i = 0; i<wordLength; i++ ){
            letter = new Letter("_").value;
            this.displayLetters.push(letter);
        }

        return this.displayLetters;
    };

    this.CheckAnswer = function(UserGuess,computerArray){
        let guessLetter = new Letter(userGuess);
        console.log(guessLetter);

        let matchIndex = guessLetter.findMatches(guessLetter,computerArray);
        if (matchIndex.length) {
            for(i=0; i<matchIndex.length; i++){
            this.displayLetters[matchIndex[i]] = guessLetter.value;
            this.matches-=1;
            }
        }
            return this.matches;
    };
};

module.exports=Word;