/*
* Need something to track the Break Length and the Session Length
* The session length counts down until it ends then the break length starts and counts down until it ends.
* This keeps switching back and forward until user stops using the clock.
* It looks like the Date object could be useful here as well as setTimeout()
* Upon further reading setTimeout may not be best. requestionAnimationFrame() might be though.
*/

/*
* Session timer
* Should be able to increase and decrease by one minute.
* Default session time is 25 minutes.
*/
var sessionTime = ( function() {
    var counter = 25;
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
    var counter = 5;
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
* Switcher
* Switches what is displayed on the timer. Either the break time or the session time depending on which one has run out.
* If the session time has reached zero, the break time is displayed and starts counting down.
* Once the break time is zero, then the session time is displayed.
*/

/*
* Animation controller. This should update the time that is displayed. It should run every second and shows the time decrementing
*
*/
var starttime;
var clockFace =  document.getElementById("clock");
var counter = sessionTime.value();

function countDown(timestamp,duration) {
    console.log("Timestamp is " + timestamp);
    var nowTime = timestamp || new Date().getTime();
    var runTime = nowTime - startTime
    
    console.log("Runtime is " + runTime);
    console.log("Duration is " + duration);
    console.log("Counter is " + counter);
    console.log("Nowtime is " + nowTime);
    if (runTime % 1000 == 0) {
        clockFace.textContent = counter--;
    }
    if (runTime < duration && counter >= 0 ) {
        requestAnimationFrame ( function(timestamp) {
            cSountDown(timestamp,duration)
        })
    } 
}


window.requestAnimationFrame(function (timestamp) {
    startTime = timestamp || new Date().getTime;
    countDown(timestamp,5000); // Time in milliseconds
});




// Playing with timers
sessionTime.increment();
console.log(sessionTime.value());
console.log("test");

breakTime.decrement();
console.log(breakTime.value());
