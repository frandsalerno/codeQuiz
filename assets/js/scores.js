//Retrieve the scores from localStorage

var usersScores = JSON.parse(localStorage.getItem('user_scores'));

var scoresContainer = document.querySelector('#highscores');

if (usersScores){
    for (i = 0; i < usersScores.length; i++ ){
    
        scoresContainer.insertAdjacentHTML('beforeend', `
        <li>${usersScores[i].user}: ${usersScores[i].score} </li>
        `);
    }
}



//Clear localStorage

var clear = document.querySelector('#clear');

clear.addEventListener('click', function(){
    localStorage.clear();
    scoresContainer.innerHTML = '';
})
