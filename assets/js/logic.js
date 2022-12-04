
var currentQuestionIndex = 0; 

var timer = document.querySelector('#time');

function countdown() {
    var timeLeft = 60;
    timer.innerText = timeLeft;
    var timeInterval = setInterval(function () {
      timeLeft--;
      timer.innerText = timeLeft;

      if (timeLeft === 0) {
        clearInterval (timeInterval);
        endQuiz();
    }
    
    }, 1000);
  }




var startButton = document.querySelector('#start');

var startScreen = document.querySelector('#start-screen');

var questionWrapper = document.querySelector('#questions');
var questionTitle = document.querySelector('#question-title');
var choicesList = document.querySelector('#choices');

function startQuiz(){
    //start the counter
    countdown();
    //hide start screen
    startScreen.classList.add('hide');
    
    var currentQuestion = questions[currentQuestionIndex];
    var choices = currentQuestion.choices;
    
    questionTitle.innerText = currentQuestion.title;

    choicesList.innerHTML = '';
    
    for (i = 0; i < choices.length; i++ ){
        var choice = choices[i];
        var isCorrect = currentQuestion.answer === choice;

        choicesList.insertAdjacentHTML('beforeend', `
        <button data-correct=${isCorrect}>${choice}</button>
        `);
    }

    //show questions wrapper when everything is ready
    questionWrapper.classList.remove('hide');
}

// function checkAnswer(event){
//     console.log(event.target.dataset.correct);
//     if
// }



startButton.addEventListener('click', startQuiz);

// choicesList.addEventListener('click', checkAnswer);