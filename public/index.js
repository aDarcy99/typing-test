import {words} from "./words.js";
import {getRandomNumber} from "./helpers.js";
import {CustomTextInput} from "./CustomTextInput.js";

let customInput = new CustomTextInput(document.querySelector(".text-input"));

let testDefaults = {
    text: [],
    timer: {
        totalTime: 60,
        timeElapsed: 0,
        timer: "",
        testStarted: false
    },
    statistics: {
        wordsPerMinute: 0,
        adjustedWordsPerMinute: 0,
        incorrectWords: 0,
        correctWords: 0
    }
};

let inputText = "";
let test = testDefaults 
//{
//     text: [1,2,3],
//     timer: {
//         totalTime: 60,
//         timeElapsed: 0,
//         timer: "",
//         testStarted: false
//     },
//     statistics: {
//         wordsPerMinute: 0,
//         adjustedWordsPerMinute: 0,
//         incorrectWords: 0,
//         correctWords: 0
//     }
// };
test.text = [1,3,4]
console.log(test)
console.log(testDefaults)
updateTestTextDOM(document.querySelector(".test-text"), test.text);

document.querySelector(".test-start-button").addEventListener("click", (Event) => {
    if(!test.timer.testStarted){
        Event.target.textContent = "Cancel test";
        //Rest test to defaults
        test = resetTest();
        //set test.timer.testStarted to true
        test.timer.testStarted = !test.timer.testStarted;
        //get random word list
        test.text = getRandomWordArray(50);
        //set test variables back to 0
        inputText = "";
        test.timer.timer = testTimer();
        //update test text area with test.text
        updateTestTextDOM(document.querySelector(".test-text"), test.text);
    }else{
        test = resetTest(test.timer.timer);
    }
})

document.querySelector(".text-input").addEventListener("keyup", (Event) => {
    if(Event.key === " "){
        test.statistics.correctWords = 0; 
        test.statistics.incorrectWords = 0;
        inputText = customInput.text.split(" ");
        for (let wordIdx = 0; wordIdx < inputText.length; wordIdx++) {
            if(test.text[wordIdx] === inputText[wordIdx]){
                test.statistics.correctWords++
                updateCorrectOrIncorrectCountDOM(document.querySelector(".correct-words"), "Correct", test.statistics.correctWords);
            }else{
                test.statistics.incorrectWords++
                updateCorrectOrIncorrectCountDOM(document.querySelector(".incorrect-words"), "Incorrect", test.statistics.incorrectWords -1);
            }
        }
    }
})
function testTimer(){
    let testTimer = setInterval(() => {
        test.timer.timeElapsed++
        test.statistics.wordsPerMinute = (test.timer.totalTime/ test.timer.timeElapsed) * (test.statistics.correctWords + test.statistics.incorrectWords)
        updateTimeLeftDOM(document.querySelector(".time-left"), (test.timer.totalTime - test.timer.timeElapsed))
        updateWordsPerMinuteDOM(document.querySelector(".words-per-minute"), (test.statistics.wordsPerMinute).toFixed(2))

        if(test.timer.timeElapsed >= test.timer.totalTime){
            
            history.push(test);
            test.statistics.adjustedWordsPerMinute = test.statistics.wordsPerMinute - test.statistics.incorrectWords; 
            resetTest(testTimer);
            console.log(history);
        }
    },1000)
    return testTimer;
}
function updateTestTextDOM(element, testText){
    testText.forEach((word) => {
        let span = document.createElement("span");
        span.textContent = word;
        element.append(span);
        element.append(" ");
    });
}

function updateTimeLeftDOM(element, timeLeft){
    element.textContent = `${timeLeft} seconds`;
}

function updateWordsPerMinuteDOM(element, wordsPerMinute){
    element.textContent = `WPM: ${wordsPerMinute}`
}

function updateCorrectOrIncorrectCountDOM(element, name, value){
    element.textContent = `${name} words: ${value} `
}

function resetTest(timer = ""){
    clearInterval(timer);
    //
    return test = {
        text: [],
        timer: {
            totalTime: 60,
            timeElapsed: 0,
            timer: "",
            testStarted: false
        },
        statistics: {
            wordsPerMinute: 0,
            adjustedWordsPerMinute: 0,
            incorrectWords: 0,
            correctWords: 0
        }
    };
}

function getRandomWord(words){
    return words[Math.floor(getRandomNumber(0, words.length))];
}
function getRandomWordArray(amount){
    let wordArray = [];
    for (let count = 0; count < amount; count++) {
        wordArray.push(getRandomWord(words));
    }
    return wordArray;
}
