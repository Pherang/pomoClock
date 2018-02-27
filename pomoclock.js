/*
* Need something to track the Break Length and the Session Length
* The session length counts down until it ends then the break length starts and counts down until it ends.
* This keeps switching back and forward until user stops using the clock.
* It looks like the Date object could be useful here as well as setTimeout()
*/

/*
* Session timer
* Should be able to increase and decrease by one minute.
* Default session time is 25 minutes.
*/

/*
* Break timer
* Should be able to increase and decrease by one minute.
* Default break time is 5 minutes.
*/

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

