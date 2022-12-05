var currentQuestionIndex = 0; 

var timer = document.querySelector('#time');
var timeLeft = timer.innerHTML;
var timerWrapper = document.querySelector('.timer');

var feedback = document.querySelector('#feedback');


var startButton = document.querySelector('#start');

var startScreen = document.querySelector('#start-screen');

var questionWrapper = document.querySelector('#questions');
var questionTitle = document.querySelector('#question-title');
var choicesList = document.querySelector('#choices');

var endScreen = document.querySelector('#end-screen');
var finalScore = document.querySelector('#final-score');

var intials = document.querySelector('#initials');
var submit = document.querySelector('#submit');
var highscores = [];
if (JSON.parse(localStorage.getItem('user_scores')) != null) {
    var highscores = JSON.parse(localStorage.getItem('user_scores'));
}


function startQuiz(){
    //start the counter
    countdown();
    //hide start screen
    startScreen.classList.add('hide');
    
    nextQuestion();

    //show questions wrapper when everything is ready
    questionWrapper.classList.remove('hide');
}

function countdown() {
    if (timeLeft == '0'){
        timeLeft = 60;
    }else{
        var slicer = (timeLeft*1)-10;
        timeLeft = slicer; 
        clearInterval (timeInterval);
    }
    var timeInterval = setInterval(function () {
      timeLeft--;
      timer.innerText = timeLeft;
      if (timeLeft === 0) {
        clearInterval (timeInterval);
        endQuiz();
    }
    
    }, 1000);
}


// function countdown() {
//     var timeLeft = 60;
//     timer.innerText = timeLeft;
//     var timeInterval = setInterval(function () {
    
//       timeLeft--;
//       timer.innerText = timeLeft;

//       if (timeLeft === 0) {
//         clearInterval (timeInterval);
//         endQuiz();
//     }
    
//     }, 1000);
// }

// function slicer(){
//     var slicer = (timeLeft*1)-10;
//     timeLeft = slicer; 
//     console.log(timeLeft);
// }


function checkAnswer(event){
        feedback.classList.remove('hide');
        if(event.target.dataset.correct == 'true'){
            var audioCorrect = new Audio('assets/sfx/correct.wav');
            audioCorrect.play();
            feedback.innerText = 'Correct answer';
        }else{
            countdown()
            var audioWrong = new Audio('assets/sfx/incorrect.wav');
            audioWrong.play();
            feedback.innerText = 'Wrong answer';
        }
        setTimeout(function(){
            feedback.classList.add('hide');
          }, 400);

        nextQuestion();
}

function nextQuestion(){
    if (currentQuestionIndex < questions.length){
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
        currentQuestionIndex++;
    }else{
        endQuiz();
    }

}

function endQuiz(){
    finalScore.innerText= (timer.innerText);
    timerWrapper.classList.add('hide');
    questionWrapper.classList.add('hide');
    endScreen.classList.remove('hide');
}

function createScores(){
    var userScore = finalScore.innerText;
    var user = intials.value;
    var scoreObj = {
        user: `${user}`,
        score: `${userScore}` 
    };
    highscores.push(scoreObj);
    localStorage.setItem('user_scores', JSON.stringify(highscores));
    window.location.href = "highscores.html";
}


    
startButton.addEventListener('click', startQuiz);
    
choicesList.addEventListener('click', checkAnswer);

submit.addEventListener('click', createScores);
