function translateTime(timeinput) {
  var temp;
  var secs;
  var hrs;
  var mins;
  secs = timeinput % 60;// remainder gives us seconds
  timeinput -= secs; // subtract remainder to find full minutes
  temp = timeinput / 60; // divide to get minutes.
  mins = temp % 60; // if it's more than an hour, modulus gives us the minutes beyond one hour.
  hrs = (temp - mins) / 60; // gives us the hour.
  // variables to display the time.
  var minsD = mins;
  var hrsD = hrs;
  var secsD = secs;
  var total;

  // Add leading zeroes where time is less than 10.
  if (hrs < 10){
    hrsD = "0"+hrs;
  }
  if (mins < 10){
    minsD = "0"+mins;
  }
  if (secs < 10){
    secsD = "0"+secs;
  }
  if (hrs == 0){
    total = minsD + ":" + secsD;
  } else {
    total = hrsD + ":" + minsD + ":" + secsD;
  }

  return total;
}

// Blueprint to make other timers. Need to make a session timer and a break timer.
var makeTimer = function(minutes) {

  var counter = minutes * 60;

  function changeCounter(val) {
    counter += val;
  }
  // Return an object with the key value pairs.
  return {
    increment: function() {
      changeCounter(60);
    },
    decrement: function() {
      if (counter > 60) {
        changeCounter(-60);
      } else {
        changeCounter(0);
      }
    },
    value: function() {
      return counter;
    }
  };
}

var sessionTime = makeTimer(25); // 
var breakTime = makeTimer(5); 

/*
* Switches what is displayed on the timer. Either the break time or the session time depending on which one has run out.
* If the session time has reached zero, the break time is displayed and starts counting down.
* Once the break time is zero, then the session time is displayed.
*/
var statusFace = document.getElementById("statusArea");

var breakOn = false;
var statusLabel = "Work";

function switchTimers() {
  console.log("Called me");
  if (breakOn === false) {
    sessionCounter = breakTime.value();
    breakOn = true;
    statusLabel = 'Break';
    console.log('break is on!');
  } else if (breakOn === true) {
    sessionCounter = sessionTime.value();
    breakOn = false;
    statusLabel = 'Work';
    console.log('break is off');
  }
}

/*
* Animation controller. This should update the time that is displayed. It should run every second and shows the time decrementing
*/
var starttime;
var clockFace =  document.getElementById("clock");
var sessionCounter = sessionTime.value();
var myReq; // request ID for animation start and stop.

function countDown(timestamp,duration,counter) {

  var privateCount = counter; // counter is time in seconds.
  var nowTime = timestamp || new Date().getTime();
  var runTime = nowTime - startTime
  var displayTime;
  /*
  console.log("nowtime is " + nowTime);
  console.log("startTime is " + startTime);
  console.log("Runtime is " + runTime);
  console.log("Counter is " + privateCount); 
  */

  if (runTime < duration && privateCount >0 && myReq  ) {
    requestAnimationFrame ( function(timestamp) {
      countDown(timestamp,duration,privateCount)
    })
  } else if (runTime > duration && privateCount > 0 && myReq) {
    // Decrement clock and display time.
    privateCount -= 1;
    displayTime = translateTime(privateCount);
    clockFace.textContent = displayTime;
    console.log(privateCount);
    requestAnimationFrame ( function(timestamp) {
      startTime = timestamp || new Date().getTime; //timestamp is relative to when it first called
      countDown(timestamp,1000,privateCount)
    });
  }
  if (privateCount == 0 ) {
    // Must cancel the animation frame request. I didn't and it slows the browser down.
    stopPomo();
    // Call this again but will need to be able to alternate between break and session timers.
    startPomo();
  }    
} // end countDown

// Need a way to loop it and alternate between break and session timers
function startPomo() {   
  if (!myReq) {
    
    myReq = window.requestAnimationFrame(function (timestamp) {
      console.log("Started");
      startTime = timestamp || new Date().getTime; //store the time that this was called
      sessionCounter = (sessionTime.value()-1);
      countDown(timestamp, 1000, sessionCounter);
      clockFace.textContent = translateTime((sessionTime.value()-1));
      console.log(breakOn);
      statusFace.textContent = statusLabel;
      switchTimers(); // Check timers and switch it here.
      
    });
  }
}

function stopPomo() {   
  window.cancelAnimationFrame(myReq);
  myReq = undefined;
  sessionCounter = sessionTime.value();
}
 
// Setup break and work timers
var breakTimerDisplay = document.getElementById("breakTimer");
var sessionTimerDisplay = document.getElementById("sessionTimer");

sessionTimerDisplay.textContent = (sessionTime.value()/60);
breakTimerDisplay.textContent = (breakTime.value()/60);
clockFace.textContent = translateTime(sessionCounter);

/* Adjust the time on the break and work intervals*/
var breakIncrease = document.getElementById("breakPlus");
var breakDecrease = document.getElementById("breakMinus");
var sessionIncrease = document.getElementById("sessionPlus");
var sessionDecrease = document.getElementById("sessionMinus");

breakIncrease.addEventListener("click", function(){ breakTime.increment(); breakTimerDisplay.textContent = breakTime.value()/60; });
breakDecrease.addEventListener("click", function(){ breakTime.decrement(); breakTimerDisplay.textContent = breakTime.value()/60; });

sessionIncrease.addEventListener("click", function(){ 
  sessionTime.increment(); 
  sessionTimerDisplay.textContent = sessionTime.value()/60; 
  if (!myReq) {
    clockFace.textContent = translateTime(sessionTime.value());
  }
});

sessionDecrease.addEventListener("click", function(){ 
  sessionTime.decrement(); 
  sessionTimerDisplay.textContent = sessionTime.value()/60; 
  if (!myReq) {
    clockFace.textContent = translateTime(sessionTime.value());
  }
});

// Controller timer's start and stop.
var startBtn = document.getElementById("clockStart");
var stopBtn = document.getElementById("clockStop");
startBtn.addEventListener("click", startPomo);
stopBtn.addEventListener("click", function() { 
  breakOn = true; 
  stopPomo(); 
  statusFace = 'Work';
  clockFace.textContent = translateTime(sessionCounter) 
});