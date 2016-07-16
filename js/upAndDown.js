$("document").ready(function() {
  console.log("up and down here");

var sprints = 10;
var sprintNum = 0;
var sprintTime = 30;
var restTime = 60;
var sprinting = false;
var processOn = false;
var pause = false;
console.log(sprints + "  sprints " + sprintTime + "  sprint time " + restTime + " rest time");

var sprintTimer = new Timer();
var restTimer = new Timer();

var run = function(e){
  sprinting = true;
  sprintNum ++;
  sprintTimer.start({countdown: true, startValues: {seconds: sprintTime}});

$('#countdownExample .values').html(sprintTimer.getTimeValues().toString(['minutes', 'seconds']));

sprintTimer.addEventListener('secondsUpdated', function (e) {
$('#countdownExample .values').html(sprintTimer.getTimeValues().toString(['minutes', 'seconds']));
});

sprintTimer.addEventListener('targetAchieved', rest);

sprintTimer.addEventListener('started', function (e) {
    $('#countdownExample .values').html(sprintTimer.getTimeValues().toString(['minutes', 'seconds']));
});

};

///////////RESTING

var rest = function(e) {

    sprinting = false;
    restTimer.start({countdown: true, startValues: {seconds: restTime}});

    $('#countdownExample .values').html(restTimer.getTimeValues().toString(['minutes', 'seconds']));

    restTimer.addEventListener('secondsUpdated', function (e) {
    $('#countdownExample .values').html(restTimer.getTimeValues().toString(['minutes', 'seconds']));
    });

    restTimer.addEventListener('targetAchieved', runOrStop);

    restTimer.addEventListener('started', function (e) {
    $('#countdownExample .values').html(restTimer.getTimeValues().toString(['minutes', 'seconds']));
    });
};

////////

var runOrStop = function() {
  if(sprintNum==sprints)
  {
    $('#countdownExample .values').html('DONE!!!');
    sprintNum = 0;
    sprinting = false;
    processOn = false;
  }
  else
  {
    run();
  }
};

/////PROGRAMMING BUTTONS
$('.startButton').click(function () {
   if(processOn == false)
   {
    console.log("STARTING THE RUN");
    processOn = true;
    run();
   }

   else if (sprinting == false && pause == true)
   {
    console.log("UNPAUSING THE REST TIMER");
    pause = false;
    restTimer.start();
   }

   else if (sprinting == true && pause == true)
   {
    console.log("UNPAUSING THE SPRINT TIMER");
    pause = false;
    sprintTimer.start();
   }

   else
   {
    console.log("ISNT DOING ANYTHING");
   }

});

$('.pauseButton').click(function () {
    if (pause == false && processOn == true && sprinting == false)
    {
      pause = true;
      restTimer.pause();
      console.log("paused rest!");
   }

   else if (pause == false && processOn == true && sprinting == true)
   {
    pause = true;
    sprintTimer.pause();
    console.log("paused sprint!");
   }

   else
   {
    console.log("not pausing anything");
   }
});



$('.stopButton').click(function () {

  if (processOn == true)
  {
        processOn = false;
        sprinting = false;
        sprintNum = 0;
        sprintTimer.stop();
        restTimer.stop();
  }
});

////////////////////////////////
////////////////////////////////
//////CONTROLS!!!!!/////////////
////////////////////////////////
////////////////////////////////



var upSprintTime = document.getElementById("upSprintTime");
if(upSprintTime)
{
  console.log("HERE");
}
else
{
  console.log("NOT HERE");
};

if (upSprintTime){
upSprintTime.addEventListener("click", function() {
  sprintTime++;
  sprintMMSS = sprintTime.toString().toMMSS();
  console.log(sprintTime);
  document.getElementById("sprintTime").value = sprintMMSS;
});
};

var downSprintTime = document.getElementById("downSprintTime");
if(downSprintTime){downSprintTime.addEventListener("click", function() {
 if(sprintTime>0){ sprintTime--;}
  sprintMMSS = sprintTime.toString().toMMSS()
  console.log(sprintTime);
    document.getElementById("sprintTime").value = sprintMMSS;
});
}
/////////////////REST TIME

var upRestTime = document.getElementById("upRestTime");
if(upRestTime){upRestTime.addEventListener("click", function() {
  restTime++;
  restMMSS = restTime.toString().toMMSS()
  console.log(restTime);
    document.getElementById("restTime").value = restMMSS;
});}

var downRestTime = document.getElementById("downRestTime");
if(downRestTime){downRestTime.addEventListener("click", function() {
  if(restTime>0){restTime--;}
  restMMSS = restTime.toString().toMMSS();
  console.log(restTime);
  console.log(rest);
    document.getElementById("restTime").value = restMMSS;
});}

//////NUMBER OF SPRINTS
var upSprints = document.getElementById("upSprints");
if(upSprints){upSprints.addEventListener("click", function() {
  sprints++;
  console.log(sprints);
  document.getElementById("sprints").value = sprints;
});}

var downSprints = document.getElementById("downSprints");
if(downSprints){downSprints.addEventListener("click", function() {
  if(sprints>0){sprints--;}
  console.log(sprints);
  document.getElementById("sprints").value = sprints;
});}

//////////////////
//Changing Seconds into a nicer format:
String.prototype.toMMSS = function() {
  var sec_num = parseInt(this, 10);
  var minutes = Math.floor(sec_num / 60);
  var seconds = sec_num - (minutes * 60);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  var time = minutes + ':' + seconds;
  return time;
}





});//closed the document.ready