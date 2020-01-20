let allQuestions = {
2 : ['2 * 7', '2 * 5', '2 * 8', '9 * 2', '6 * 2', '4 * 2'],
3 : ['3 * 5', '3 * 7', '3 * 4', '8 * 3', '6 * 3', '9 * 3'],
4 : ['4 * 5', '4 * 8', '4 * 4', '7 * 4', '9 * 4', '4 * 6'],
5 : ['5 * 4', '5 * 9', '5 * 3', '7 * 5', '8 * 5', '5 * 5'],
6 : ['6 * 5', '6 * 9', '6 * 4', '7 * 6', '6 * 6', '8 * 6'],
"7:an till 9" : ['7 * 8', '9 * 9', '8 * 8', '8 * 9', '7 * 7', '9 * 7']
};

let wrongGuesses = {};

let questionSetName = "";
let questionIndex = 0;
let question = "";
let input = document.querySelector('.guessField');
let startTime = Date.now();

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function countWrongAnswers(obj) {
    let numberOfWrongAnswers = 0;
    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            numberOfWrongAnswers += obj[key].length;
        }
    }
    return numberOfWrongAnswers;
}

function checkEndQuiz(_allQuestions, _wrongGuesses) {
    let gameIsDone = false;

    if (isEmpty(_allQuestions)) {
        gameIsDone = true;
        let textResponse = "";
        const numberOfWrongAnswers = countWrongAnswers(_wrongGuesses);
        if (numberOfWrongAnswers == 0) {
            textResponse = 'Färdig med diagnos! Du fick alla rätt, bra jobbat! Tid: '; 
        } else {
            textResponse = 'Färdig med diagnos! Du fick ' + numberOfWrongAnswers + ' fel. Tid: ';
        }
        let timeUsed = msToMinutes(Date.now() - startTime);
        document.querySelector('.guessCorrectionMessage').innerHTML = textResponse + timeUsed;
        document.getElementById("questionContainer").setAttribute("hidden", "true");
        document.getElementById("submitGuessButton").setAttribute("hidden", "true");
        document.getElementById("results").removeAttribute("hidden");
        document.getElementById("tableHeading").removeAttribute("hidden");
    }  
    
    return gameIsDone; 
}

function selectQuestion(obj) {
    let questionSetArray = Object.keys(obj);
    questionSetName = questionSetArray[Math.floor(Math.random() * questionSetArray.length)];
    let questionArray = allQuestions[questionSetName];
    questionIndex = Math.floor(Math.random() * questionArray.length); 
    question = allQuestions[questionSetName][questionIndex];
}

function deleteQuestion(_questionSetName, _questionIndex) {
    allQuestions[_questionSetName].splice(_questionIndex, 1);

    if (allQuestions[_questionSetName].length < 1) {
      delete allQuestions[_questionSetName];
    }
}

function displayQuestion(){
    document.querySelector('.questionField').innerHTML = question + ' = ';
    document.querySelector('.guessField').focus();
    document.querySelector('.guessField').value ='';
}

function checkGuess() {
    const guess = Number(document.querySelector('.guessField').value);
    const guessCorrectionMessageElement = document.querySelector('.guessCorrectionMessage');

    if (isCorrectAnswer(guess, question)) {
        guessCorrectionMessageElement.innerHTML = 'rätt!';
    } else {
        setWrongAnswer(questionSetName, question);
        guessCorrectionMessageElement.innerHTML = 'fel!';
    }
}

function isCorrectAnswer(_guess, _question) {
    const numberArray =  _question.match(/\d+/g);
    const correctAnswer= numberArray[0] * numberArray[1];
    return _guess === correctAnswer;
}

function setWrongAnswer (tableName, question) {
    if (wrongGuesses.hasOwnProperty(tableName)) {
        wrongGuesses[tableName].push(question);
    } else {
        //spread operator
        wrongGuesses = {...wrongGuesses, [tableName] : [question]}
    }
}

function msToMinutes(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}

input.addEventListener('keyup',function(e){
    if (e.keyCode === 13) {
    document.querySelector('.submitGuessButton').click();
  }
});

function startQuiz() {
    removeElement("startButton");
    document.getElementById("questionContainer").removeAttribute("hidden");
    document.getElementById("submitGuessButton").removeAttribute("hidden");
    selectQuestion(allQuestions);
    displayQuestion();
}

function continueQuiz() {
    checkGuess();
    deleteQuestion(questionSetName, questionIndex);
    const gameIsDone = checkEndQuiz(allQuestions, wrongGuesses);
    if (!gameIsDone) {
        selectQuestion(allQuestions);
        displayQuestion();
    }
}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function produceResults(questions) {
    //Function imputs results into an existing html-table. 
    //Function can be improved to also generate the html-table.
    let arrayOfQuestions = Object.keys(questions);
    let numberOfQuestionTypes = arrayOfQuestions.length
    let questionType = arrayOfQuestions[0]
}