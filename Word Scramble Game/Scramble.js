//javascriptpro_
let guess_word = document.querySelector('.container .guess-word');
let userInput = document.querySelector('.container .userInput');
let check_btn = document.querySelector('.container .check-btn');
let refresh_btn = document.querySelector('.container .refresh-btn');
let container = document.querySelector('.container');
let gameOverBox = document.querySelector('.game-over');
let correctwordMsg = document.querySelector('.game-over h3');
let playAgainBtn = document.querySelector('.game-over .play-again-btn');

let words = ['html', 'css', 'javascript', 'python', 'kotlin', 'typescript', 'swift', 'fortran', 'haskell'];
let currentWord, timer;

let generateWords = () => {
        let randomWords = words[Math.floor(Math.random() * words.length)];
        let scrambleWord = randomWords.split('');
        for (let i = scrambleWord.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let temp = scrambleWord[i];
                scrambleWord[i] = scrambleWord[j]
                scrambleWord[j] = temp;
        }
        guess_word.innerHTML = scrambleWord.join('');
        userInput.value = '';
        userInput.setAttribute('maxlength', randomWords.length);
        currentWord = randomWords;
        startTimer(30)
}

let check = () => {
        let userGuess = userInput.value;
        if (userGuess != '') {
        if(userGuess.toLowerCase() === currentWord.toLowerCase()) {
        //alert('correct')  
        container.style.display = 'none';
        gameOverBox.style.display = 'block';
        correctwordMsg.innerHTML = `Congrats! <span style="color:#9370DB">${currentWord}</span> is a correct word.`;
        userInput.value = '';
        generateWords();
        }else{
           userInput.value = '';
           userInput.classList.add('shake');
           setTimeout(() => {
               userInput.classList.remove('shake');
           },400)
        }
        }
}

let startTimer = (maxTime) => {
   clearInterval(timer)
    timer = setInterval(() => {
                if (maxTime > 0) {
                        maxTime--;
        document.querySelector('.container .time-box span').innerHTML = `Time: ${maxTime}s`;
                        if (maxTime < 10) {
        document.querySelector('.container .time-box').style.background = '#ffdde0';
        document.querySelector('.container .time-box').style.color = '#d32f2f';
        document.querySelector('.container .time-box').style.border = '1px solid #d32f2f';
                        } else {
        document.querySelector('.container .time-box').style.background = '#e7f6d5';
        document.querySelector('.container .time-box').style.color = '#689f38';
        document.querySelector('.container .time-box').style.border = '1px solid #689f38';
                        }
                } else if (maxTime === 0) {
                        clearInterval(timer);
                        generateWords();
                        startTimer(30);
                }
     }, 1000)
}

playAgainBtn.addEventListener('click', () => {
        container.style.display = 'block';
        gameOverBox.style.display = 'none';
        generateWords();
});

generateWords();
check_btn.addEventListener('click', check);
refresh_btn.addEventListener('click', generateWords)
