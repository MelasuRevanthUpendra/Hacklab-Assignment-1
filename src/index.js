//selecting each light box/button
const box1 = document.querySelector('.box1');
const box2 = document.querySelector('.box2');
const box3 = document.querySelector('.box3');

//setting waiting time of each light 
const redTimer = 20;
const greenTimer = 15;
const yellowTimer = 5;

//clearing  previous timeouts if any before making next transitions
let timeouts = [];
function clearAllTimeouts(){
    for(let i=0;i<timeouts.length;i++){
        clearTimeout(timeouts[i]);
    }
}

//starting FSM, resetting everything and starting form a given color
function startFSM(box, color, timer, nextLight){
    box1.innerText = "RED";
    box2.innerText = "GREEN";
    box3.innerText = "YELLOW";
    
    clearAllTimeouts();
    counter(box, timer);
    const timeOutId = setTimeout(nextLight, timer*1000 );
    timeouts.push(timeOutId);
}


//counter to update the remaining time
function changeCounterValue(box, value){
    box.innerText = value;
}

function counter(box, time){
    changeCounterValue(box, time);
    for(let value = time-1, index = 1; value>=0; value--, index++){
        const timeOutId = setTimeout(changeCounterValue, index*1000, box, value);
        timeouts.push(timeOutId);
    }
}



//functions for turning on light
function turnOnRed(){
    box1.classList.add('red');
    box2.classList.remove('green' );
    box3.classList.remove('yellow');

    startFSM(box1, "RED", redTimer, turnOnGreen);
   
}

function turnOnGreen(){
    box2.classList.add('green' );
    box1.classList.remove('red');
    box3.classList.remove('yellow');

    startFSM(box2, "GREEN", greenTimer, turnOnYellow);
}


function turnOnYellow(){
    box3.classList.add('yellow');
    box2.classList.remove('green' );
    box1.classList.remove('red');
    
    startFSM(box3, "YELLOW", yellowTimer, turnOnRed);

}



//event listners for click events
box1.addEventListener('click', turnOnRed);
box2.addEventListener('click', turnOnGreen);
box3.addEventListener('click', turnOnYellow);


//turning redlight on page load
turnOnRed();