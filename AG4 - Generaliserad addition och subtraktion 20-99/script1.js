const questions = {
    questionTypes : [],
    isEven(value) {
        if (value%2 == 0)
            return true;
        else
            return false;
    },
    shuffleArray(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
    },
    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    generateNeighbors (firstAddendMin, firstAddendMax, secondAddend, numOfQuest) {
        let allPossibleQuestions = [];
        for (let i = firstAddendMin; i <= firstAddendMax; i++) {
            allPossibleQuestions.push([i]);
            allPossibleQuestions[i - firstAddendMin].push(secondAddend);
        }
        this.shuffleArray(allPossibleQuestions);
        let questions = allPossibleQuestions.splice(0, numOfQuest);
        return questions;
    },
    generateDistanceToNeighbors (firstAddendMin, firstAddendMax, diff, numOfQuest) {
        let allPossibleQuestions = [];
        for (let i = firstAddendMin; i <= firstAddendMax; i++) {
            allPossibleQuestions.push([i]);
            secondAddend = (i - diff) * (-1)
            allPossibleQuestions[i - firstAddendMin].push(secondAddend);
        }
        this.shuffleArray(allPossibleQuestions);
        let questions = allPossibleQuestions.splice(0, numOfQuest);
        return questions;
    },
    generateHalves(minMinuend, maxMinuend, diff, numOfQuest) {
        let allPossibleQuestions = [];
        let k = 0;
        for (let i = minMinuend; i <= maxMinuend; i++) {
            if (this.isEven(i + diff)) {
                allPossibleQuestions.push([i]);
                allPossibleQuestions[k].push((i + diff) / (2)*(-1) + diff);
                k++;
            }
        }
        this.shuffleArray(allPossibleQuestions);
        let questions = allPossibleQuestions.splice(0, numOfQuest);
        return questions;
    },
    generateDoubles (firstAddendMin, firstAddendMax, diff, numOfQuest) {
        let allPossibleQuestions = [];
        for (let i = firstAddendMin; i <= firstAddendMax; i++) {
            allPossibleQuestions.push([i]);
            secondAddend = (i + diff);
            allPossibleQuestions[i - firstAddendMin].push(secondAddend);
        }
        this.shuffleArray(allPossibleQuestions);
        let questions = allPossibleQuestions.splice(0, numOfQuest);
        return questions;
    },
    generateSplitSum (sumMin, sumMax) {
        let allPossibleQuestions = [];
        for (let j = sumMin; j <= sumMax; j++){
            for (let i = 1; i <= j/2; i++) {
            allPossibleQuestions.push([i, j - i]);
            }
        }
        this.shuffleArray(allPossibleQuestions);
        return allPossibleQuestions;
    },
    generateOneA (numTypeOne, numTypeTwo) {
        let questionObject = {
            type : 'OneA',
            answerInput : 'sum',
            orderDisplay : 'random', 
            questions : []
        };
        let selectedQuestions = this.generateNeighbors(5, 8, 1, numTypeOne);
        for (let i = 0; i < numTypeOne; i++) {
          questionObject.questions.push(selectedQuestions[i]);
        };
        selectedQuestions = this.generateNeighbors(4, 7, 2, numTypeTwo);
        for (let i = 0; i < numTypeTwo; i++) {
          questionObject.questions.push(selectedQuestions[i]);
        };
        this.shuffleArray(questionObject.questions);
        this.questionTypes.push(questionObject);
    },
    generateOneB (numTypeOne, numTypeTwo, numTypeThree, numTypeFour) {
        let questionObject = {
            type : 'OneB',
            answerInput : 'sum',
            orderDisplay : 'fixed', 
            questions : []
        };
        let selectedQuestions = this.generateNeighbors(5, 9, -1, numTypeOne);
        for (let i = 0; i < numTypeOne; i++) {
          questionObject.questions.push(selectedQuestions[i]);
        };
        selectedQuestions = this.generateNeighbors(6, 9, -2, numTypeTwo);
        for (let i = 0; i < numTypeTwo; i++) {
          questionObject.questions.push(selectedQuestions[i]);
        };
        selectedQuestions = this.generateDistanceToNeighbors(7, 9, 1, numTypeThree);
        for (let i = 0; i < numTypeThree; i++) {
            questionObject.questions.push(selectedQuestions[i]);
        };
        selectedQuestions = this.generateDistanceToNeighbors(7, 9, 2, numTypeFour);
        for (let i = 0; i < numTypeFour; i++) {
            questionObject.questions.push(selectedQuestions[i]);
        };
        this.shuffleArray(questionObject.questions);
        this.questionTypes.push(questionObject);
    },
    generateTwoA (numTypeOne, numTypeTwo, numTypeThree, numTypeFour) {
        let questionObject = {
            type : 'twoA',
            answerInput : 'sum',
            orderDisplay : 'fixed', 
            questions : []
        };
        let selectedQuestions = this.generateDoubles(3, 4, 0, numTypeOne);
        for (let i = 0; i < numTypeOne; i++) {
          questionObject.questions.push(selectedQuestions[i]);
        };
        selectedQuestions = this.generateDoubles(3, 4, 1, numTypeTwo);
        for (let i = 0; i < numTypeTwo; i++) {
          questionObject.questions.push(selectedQuestions[i]);
        };
        selectedQuestions = this.generateDoubles(3, 3, 2, numTypeThree);
        for (let i = 0; i < numTypeThree; i++) {
            questionObject.questions.push(selectedQuestions[i]);
        };
        selectedQuestions = this.generateDoubles(4, 5, -1, numTypeFour);
        for (let i = 0; i < numTypeFour; i++) {
            questionObject.questions.push(selectedQuestions[i]);
        };
        this.shuffleArray(questionObject.questions);
        this.questionTypes.push(questionObject);
    },
    generateTwoB (numTypeOne, numTypeTwo, numTypeThree) {
        let questionObject = {
            type : 'TwoB',
            questions : []
        };
        let selectedQuestions = this.generateHalves(6, 9, 0, numTypeOne);
        for (let i = 0; i < numTypeOne; i++) {
          questionObject.questions.push(selectedQuestions[i]);
        };
        selectedQuestions = this.generateHalves(6, 9, 1, numTypeTwo);
        for (let i = 0; i < numTypeTwo; i++) {
          questionObject.questions.push(selectedQuestions[i]);
        };
        selectedQuestions = this.generateHalves(6, 9, -1, numTypeThree);
        for (let i = 0; i < numTypeTwo; i++) {
          questionObject.questions.push(selectedQuestions[i]);
        };
        this.shuffleArray(questionObject.questions);
        this.questionTypes.push(questionObject);
    },
    generateThreeA (minSum, maxSum, numQuest) {
        let questionObjectA = {
            type : 'ThreeA',
            answerInput : 'sum',
            orderDisplay : 'random', 
            questions : []
        };
        let selectedQuestions = this.generateSplitSum(minSum, maxSum);
        for (let i = 0; i < numQuest; i++) {
            questionObjectA.questions.push(selectedQuestions[i]);
        }
        this.questionTypes.push(questionObjectA);
        
        let questionObjectB = {
            type : 'ThreeB',
            answerInput : 'sum',
            orderDisplay : 'random', 
            questions : []
        };
        for (let i = numQuest; i < (numQuest * 2); i++) {
            questionObjectB.questions.push(selectedQuestions[i]);
        }
        this.questionTypes.push(questionObjectB);
    }
};

questions.generateOneA(3, 3);
questions.generateOneB(2, 2, 1, 1);
questions.generateTwoA(2,2,1,1);
questions.generateTwoB(2, 2, 2);
questions.generateThreeA(6, 9, 6);
console.log(questions.questionTypes[0]);
console.log(questions.questionTypes[1]);
console.log(questions.questionTypes[2]);
console.log(questions.questionTypes[3]);
console.log(questions.questionTypes[4]);
console.log(questions.questionTypes[5]);