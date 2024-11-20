let cnum, attempt = 0, timer, timerInterval, range, timeLimit;
let bestScores = { easy: Infinity, medium: Infinity, difficult: Infinity };
let attemptData=document.getElementById("Attempts");
let userinp=document.getElementById("inp");
let subBtn=document.getElementById("submit");
let resBtn=document.getElementById("resBtn");
let message=document.getElementById("msg");
const levelSelection = document.getElementById("levelSelection");
const game = document.getElementById("game");
const timerDisplay = document.getElementById("timer");
function startGame(levelRange, time) {
    range=levelRange;
    timeLimit=time;
    cnum=Math.floor(Math.random()*range)+1;
    attempt=0;
    attemptData.innerHTML=attempt;
    timerDisplay.innerHTML=timeLimit;
    userinp.value="";
    rangeMessage.innerHTML=`Pick a number between 1 and ${range}!`;
    message.innerHTML="Game started! Start guessing.";
    message.style.color="black";
    subBtn.disabled=false;
    userinp.disabled=false;
    hintBtn.style.display="none";
    resBtn.style.display="none";
    levelSelection.style.display="none";
    game.style.display="block";
    startTimer();
}
function startTimer() {
    timer=timeLimit;
    timerInterval=setInterval(()=>{
        timer--;
        timerDisplay.innerHTML=timer;
        if (timer<=0){
            clearInterval(timerInterval);
            endGame(false);
        }
    },1000);
}
function check(){
    let usernum=parseInt(userinp.value);
    if (isNaN(usernum) || usernum<1 || usernum>range) {
        message.innerHTML = `Please enter a valid number between 1 and ${range}.`;
        message.style.color = "orange";
        return;
    }
    attempt++;
    attemptData.innerHTML=attempt;
    if(cnum==usernum){
        clearInterval(timerInterval);
        message.innerHTML="Congratulation you have guessed the number";
        message.style.color="green";
        playSound("correct");
        resBtn.style.display = "inline-block";
        subBtn.disabled = true;
        userinp.disabled = true;
    }
    else if(cnum<usernum){
        message.innerHTML="Too High! try again";
        message.style.color="red";
        playSound("incorrect");
    }
    else if(cnum>usernum){
        message.innerHTML="Too Low! try again";
        message.style.color="red";
        playSound("incorrect");
    }
    if(attempt===1)hintBtn.style.display="inline-block";
    setTimeout(()=>{
        userinp.value=0;
        massage.innerHTML="";
    },1000);
    function updateBestScore() {
        const level = range === 50 ? "easy" : range === 100 ? "medium" : "difficult";
        if (timer > 0 && timer < bestScores[level]) {
            bestScores[level] = timer;
            alert(`New best score for ${level} level: ${timer} seconds remaining!`);
        }
    }
}
function showHint() {
    let hint="";
    if(cnum%2===0){
        hint="The number is Even Number.";
    }
    else if(cnum%5===0){
        hint="The number is divisible by 5.";
    }
    if(attempt>=5){
        const rangeGroup = Math.ceil(cnum / 50) * 50;
        hint = `Number is between ${rangeGroup - 49} and ${rangeGroup}.`;
    }
    message.innerHTML=hint;
    message.style.color="blue";
    setTimeout(()=>{
        message.innerHTML="";
    },2000);
}
function restart() {
    clearInterval(timerInterval);
    levelSelection.style.display="block";
    game.style.display="none";
    rangeMessage.innerHTML="Pick a number based on your chosen level!";
    message.innerHTML="";
}
function endGame(won) {
    clearInterval(timerInterval);
    subBtn.disabled=true;
    userinp.disabled=true;
    hintBtn.style.display="none";
    resBtn.style.display="inline-block";
    message.innerHTML=won?"Congratulations! You guessed correctly." : "Better luck next time!";
    message.style.color=won?"green":"red";
    setTimeout(()=>{
        message.innerHTML="";
    },1000);
}
function playSound(type) {
    const sound = new Audio(type === "correct" ? "./correct.mp3" : "./incorrect.mp3");
    sound.play();
}
subBtn.addEventListener("click",check);
hintBtn.addEventListener("click",showHint);
resBtn.addEventListener("click",restart);
document.getElementById("easy").addEventListener("click",()=>startGame(50,10));
document.getElementById("medium").addEventListener("click",()=>startGame(100,30));
document.getElementById("difficult").addEventListener("click",()=>startGame(500,60));