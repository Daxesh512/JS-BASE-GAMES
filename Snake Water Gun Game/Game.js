//Javascriptpro_
//Dont forget to follow me on github,instagram and codepen
let computer_score = 0;
let my_score = 0;
let match_result = document.querySelector('.match-result');
let check =(input)=>{
  let choices_object = {
'snake' : {
 'snake':'draw', 
 'water':'win', 
 'gun':'lose'
}, 
'water' : {
 'snake':'lose', 
 'water':'draw', 
 'gun':'win'
}, 
'gun' : {
 'snake' : 'win', 
 'water' : 'lose', 
 'gun' : 'draw'
 }
  }  
  
let choices = ['snake', 'water', 'gun']
let randomChoice = Math.floor(Math.random() * 3);

document.querySelector('.computer_choice').innerHTML = `Computer choose <strong>${choices[randomChoice]}</strong>`;
document.querySelector('.your_choice').innerHTML = `You choose <strong>${input}</strong>`;

let computer_choice = choices[randomChoice];

switch(choices_object[input][computer_choice]){
case 'win':
 match_result.innerHTML = 'YOU WIN';
 match_result.style.cssText = `background:#32CD32;`;
 my_score++;
 break;
case 'lose':
 match_result.innerHTML = 'YOU LOSE';
 match_result.style.cssText = `background:red;`;
 computer_score++;
 break;
default:
 match_result.innerHTML = 'MATCH DRAW';
 match_result.style.cssText = `background:grey;`;
 break;
}
document.querySelector('.my_score').innerHTML = `You: <strong>${my_score}</strong>`;
document.querySelector('.computer_score').innerHTML = `Computer: <strong>${computer_score}</strong>`;
document.querySelector('.container').style.height = '300px';
document.querySelector('.your_choice').style.display = 'block';
document.querySelector('.computer_choice').style.display = 'block';
match_result.style.visibility = 'visible';
}
