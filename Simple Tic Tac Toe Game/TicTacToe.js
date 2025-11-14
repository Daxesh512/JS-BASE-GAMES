let cell = document.querySelectorAll(".cell"); 
cell = Array.from(cell);

let wincombo = [
      [0,3,6], 
      [6,7,8], 
      [3,4,5], 
      [0,1,2], 
      [2,5,8], 
      [1,4,7], 
      [2,4,6], 
      [0,4,8]
]

let player = 'X';

cell.forEach(function(cells){
  cells.addEventListener('click',()=>{
if(cells.innerHTML.trim() != '') return         
cells.innerHTML = player;
winner();
player = player == 'X' ? 'O' : 'X';
  });  
});

function winner(){
wincombo.forEach(function(combo){
let check = combo.every(e => cell[e].innerHTML.trim() == player); 
if(check){
document.querySelector('.message').innerHTML = player + '  is the winner! Restart? '; 
removeAtt();
}
 });
}

function removeAtt(){
document.getElementById('b1').style.pointerEvents = 'none';
document.getElementById('b2').style.pointerEvents = 'none';
document.getElementById('b3').style.pointerEvents = 'none';
document.getElementById('b4').style.pointerEvents = 'none';
document.getElementById('b5').style.pointerEvents = 'none';
document.getElementById('b6').style.pointerEvents = 'none';
document.getElementById('b7').style.pointerEvents = 'none';
document.getElementById('b8').style.pointerEvents = 'none';
document.getElementById('b9').style.pointerEvents = 'none';
}