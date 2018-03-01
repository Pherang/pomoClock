/*
* Session timer
* Should be able to increase and decrease by one minute.
* Default session time is 25 minutes.
*/
var sessionTime = ( function() {
    var counterDate = new Date(Date.UTC(1970,0,1,0,0));
    counter = counterDate;
    
    function changeCounter(val) {
        counter += val;
    } // Return an object with the key value pairs.
    return {
        increment: function() {
            changeCounter(1);
        },
        decrement: function() {
            changeCounter(-1);
        },
        value: function() {
            return counter;
        }
    };
})();   

/*
* Break timer
* Should be able to increase and decrease by one minute.
* Default break time is 5 minutes.
*/
var breakTime = ( function() {
    var counterDate = new Date(Date.UTC(1970,0,1,0,0));
    counter = counterDate;
    function changeCounter(val) {
        counter += val;
    } // Return an object with the key value pairs.
    return {
        increment: function() {
            changeCounter(1);
        },
        decrement: function() {
            changeCounter(-1);
        },
        value: function() {
            return counter;
        }
    };
})();   
/*
* Switches what is displayed on the timer. Either the break time or the session time depending on which one has run out.
* If the session time has reached zero, the break time is displayed and starts counting down.
* Once the break time is zero, then the session time is displayed.
*/
var breakOn = false;
function switchTimers() {
    if (breakOn == false) {
        sessionCounter = breakTime.value();
        breakOn = true;
    } else if (breakOn == true) {
        sessionCounter = sessionTime.value();
        breakOn = false;
    }
}

/*
* Animation controller. This should update the time that is displayed. It should run every second and shows the time decrementing
*
*/
var starttime;
var clockFace =  document.getElementById("clock");
var sessionCounter = sessionTime.value();

var myReq;

function countDown(timestamp,duration,counter) {
    
    var privateCount = counter; // Is a date object that is tracking the time.
    var nowTime = timestamp || new Date().getTime();
    var runTime = nowTime - startTime
    /*
    console.log("nowtime is " + nowTime);
    console.log("startTime is " + startTime);
    console.log("Runtime is " + runTime);
    console.log("Counter is " + privateCount); 
    */
  
    if (runTime < duration && privateCount.getTime() >=0 && myReq  ) {
        
        requestAnimationFrame ( function(timestamp) {
            countDown(timestamp,duration,privateCount)
        })
    } else if (runTime > duration && privateCount.getTime() >= 0 && myReq) {
        // Decrement clock and display time.
        privateCount.setSeconds((privateCount.getSeconds()-1));
        clockFace.textContent = privateCount.getHours() + ":" + privateCount.getMinutes() + ":" + privateCount.getSeconds();
        console.log(privateCount.getTime());
        requestAnimationFrame ( function(timestamp) {
            startTime = timestamp || new Date().getTime; //timestamp is relative to when it first called
            countDown(timestamp,1000,privateCount)
        });
     }
     
     if (privateCount.getTime() == 0 ) {
        // Must cancel the animation frame request. I didn't and it slows the browser down.
        cancelAnimationFrame(myReq);
        // Call this again but will need to be able to alternate between break and session timers.
        startPomo();
        
     }    
}

// Need a way to loop it and alternate between break and session timers
// 
function startPomo() {   
    
    myReq = window.requestAnimationFrame(function (timestamp) {
        console.log("Started");
        startTime = timestamp || new Date().getTime; //store the time that this was called
        countDown(timestamp, 1000, sessionCounter); // Time in milliseconds
        switchTimers(); // Check timers and switch it here.
    });
}

function stopPomo() {   
    window.cancelAnimationFrame(myReq);
    myReq = undefined;
    breakOn = false;
    sessionCounter = sessionTime.value();
}
    
/* 
* Build out some buttons to control the break timer and the session timer

var breakIncrease = document.getElementById("breakAdd");
var breakDecrease = document.getElementById("breakSubtract");

var sessionIncrease = document.getElementById("sessionAdd");
var sessionDecrease = document.getElementById("sessionSubtract");

breakIncrease.addEventListener("click", breakTime.increment());
breakDecrease.addEventListener("click", breakTime.decrement());

sessionIncrease.addEventListener("click", sessionTime.increment());
sessionDecrease.addEventListener("click", sessionTime.decrement());

/*
* Buttons to start and stop timer
*/

var startBtn = document.getElementById("clockStart");
var stopBtn = document.getElementById("clockStop");
startBtn.addEventListener("click", startPomo);
stopBtn.addEventListener("click", stopPomo);

/*
// Playing with timers
sessionTime.increment();
console.log(sessionTime.value());
console.log("test");

breakTime.decrement();
console.log(breakTime.value());*/

//Code for playing with time.

var data = new Date(Date.UTC(1970,0,1,0,0,0));
console.log(data);

var clock = data.toUTCString();
console.log(clock);
var doh = clock.indexOf(":");

var final = clock.substring(doh+1,doh+6);

console.log(final);

console.log(data.getTime());