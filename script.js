TweenLite.defaultEase = Expo.easeOut;

initTimer();

// var reloadBtn = document.querySelector('.reload');
var timerEl = document.querySelector('.timer');

// set the date we're counting down to
var target_date = new Date("Aug 27, 2017").getTime();

// variables for time units
var days, hours, minutes, seconds;

function initTimer () {

   var self = this,
       timerEl = document.querySelector('.timer'),
       daysGroupEl = timerEl.querySelector('.days-group'),
       hoursGroupEl = timerEl.querySelector('.hours-group'),
       minutesGroupEl = timerEl.querySelector('.minutes-group'),
       secondsGroupEl = timerEl.querySelector('.seconds-group'),

       daysGroup = {
          firstNum: daysGroupEl.querySelector('.first'),
          secondNum: daysGroupEl.querySelector('.second')
       },

       hoursGroup = {
          firstNum: hoursGroupEl.querySelector('.first'),
          secondNum: hoursGroupEl.querySelector('.second')
       },

       minutesGroup = {
          firstNum: minutesGroupEl.querySelector('.first'),
          secondNum: minutesGroupEl.querySelector('.second')
       },

       secondsGroup = {
          firstNum: secondsGroupEl.querySelector('.first'),
          secondNum: secondsGroupEl.querySelector('.second')
       };



    // update the tag with id "countdown" every 1 second
    function updateTimer() {

        // find the amount of "seconds" between now and target
        var current_date = new Date().getTime();
        var seconds_left = (target_date - current_date) / 1000;

        // do some time calculations
        days = parseInt(seconds_left / 86400);
        seconds_left = seconds_left % 86400;
        var daysArr = ("00" + days.toString()).substr(-2,2).split("");

        hours = parseInt(seconds_left / 3600);
        seconds_left = seconds_left % 3600;
        var hoursArr = ("00" + hours.toString()).substr(-2,2).split("");
        var timeArr = daysArr.concat(hoursArr);

        minutes = parseInt(seconds_left / 60);
        seconds = parseInt(seconds_left % 60);
        var minutesArr = ("00" + minutes.toString()).substr(-2,2).split("");
        timeArr = timeArr.concat(minutesArr);
        var secondsArr = ("00" + seconds.toString()).substr(-2,2).split("");
        timeArr = timeArr.concat(secondsArr);

        updateTimerDisplay(timeArr);

        if(isFinished(days, hours, minutes, seconds)) {
          countdownFinished();
        } else {
          setTimeout(updateTimer, 1000);
        }

    }

   function updateTimerDisplay(arr) {

      animateNum(daysGroup.firstNum, arr[0]);
      animateNum(daysGroup.secondNum, arr[1]);
      animateNum(hoursGroup.firstNum, arr[2]);
      animateNum(hoursGroup.secondNum, arr[3]);
      animateNum(minutesGroup.firstNum, arr[4]);
      animateNum(minutesGroup.secondNum, arr[5]);
      animateNum(secondsGroup.firstNum, arr[6]);
      animateNum(secondsGroup.secondNum, arr[7]);

   }

   function animateNum (group, arrayValue) {

      TweenMax.killTweensOf(group.querySelector('.number-grp-wrp'));
      TweenMax.to(group.querySelector('.number-grp-wrp'), 1, {
         y: - group.querySelector('.num-' + arrayValue).offsetTop
      });

   }

   setTimeout(updateTimer, 1000);

}

function isFinished(days, hours, minutes, seconds) {
  if(days !== 0) return false;
  if(hours !== 0) return false;
  if(minutes !== 0) return false;
  if(seconds !== 0) return false;
  return true;
}

function countdownFinished() {
   setTimeout(function () {
      // TweenMax.set(reloadBtn, { scale: 0.8, display: 'block' });
      TweenMax.to(timerEl, 1, { opacity: 0.2 });
      // TweenMax.to(reloadBtn, 0.5, { scale: 1, opacity: 1 });
   }, 1000);
}

// reloadBtn.addEventListener('click', function () {
//    TweenMax.to(this, 0.5, { opacity: 0, onComplete:
//       function () {
//          reloadBtn.style.display= "none";
//       }
//    });
//    TweenMax.to(timerEl, 1, { opacity: 1 });
//    initTimer("12:35");
// });