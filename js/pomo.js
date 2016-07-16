$("document").ready(function() {
    /*
Do controls as such:
start function{
    if(sprinting)
    controls sprint timer
    else
    controls rest timer
}

and same for rest.
stop can just use one.
use let's go as equvalent of start
    */


//DECLARING VARIABLES:
var sprints = 3;
var sprintNum = 0;
var sprintTime = 5;
var restTime = 2;
var sprinting = false;
var processOn = false;
var pause = false;
console.log(sprints + "  " + sprintTime + "  " + restTime);

//FUNCTION TO RUN another iteration or stop
var runOrStop = function() {
	if(sprintNum==sprints)
	{
		kaboom();
	}
	else
	{
		run();
	}
};

//FUNCTION FOR WHAT TO DO WHEN SPRINTS ARE DONE
var kaboom = function (e) {
        $(".letsGoButton").html("LET'S GO!");
    $('#countdownExample .values').html('DONE!!!');
    sprinting = false;
    processOn = false;
}


//FUNCTION FOR RESTING
var rest = function (e) {
    sprinting = false;
    pause = false;
    $(".letsGoButton").html("RESTING");
	var restTimer = new Timer();
	restTimer.start({countdown: true, startValues: {seconds: restTime}});
$('#countdownExample .values').html(restTimer.getTimeValues().toString());
restTimer.addEventListener('secondsUpdated', function (e) {
    $('#countdownExample .values').html(restTimer.getTimeValues().toString());
});
restTimer.addEventListener('targetAchieved', runOrStop);
//////////button control
//var timer = new Timer();
$('.startButton').click(function () {
    console.log ("processOn " + processOn + " pause " + pause + " sprinting " + sprinting);
    if (processOn == true && pause == true && sprinting == false)
        {
            pause = false;
            restTimer.start();
        }
});

$('.pauseButton').click(function () {
    if (pause == false && processOn == true && sprinting == false)
    {
        pause = true;
        restTimer.pause();
    console.log("paused rest!");
    
    }
});
$('.stopButton').click(function () {
    processOn = false;
    sprintNum = 0;
    restTimer.stop();
});

restTimer.addEventListener('started', function (e) {
    $('#countdownExample .values').html(restTimer.getTimeValues().toString());
});

}

//FUNCTION FOR RUNNING
var run = function (e){
    sprinting = true;
    pause = false;
        $(".letsGoButton").html("SPRINTING!");
	sprintNum++;
    (console.log("sprint number " + sprintNum));
var sprintTimer = new Timer();

sprintTimer.start({countdown: true, startValues: {seconds: sprintTime}});

$('#countdownExample .values').html(sprintTimer.getTimeValues().toString());
sprintTimer.addEventListener('secondsUpdated', function (e) {
$('#countdownExample .values').html(sprintTimer.getTimeValues().toString());
});
sprintTimer.addEventListener('targetAchieved', rest);
//////////button control
$('.startButton').click(function () {
    console.log("pressed start. process on is " + processOn + " and pause is " + pause);
    if(processOn == true && pause == true && sprinting == true)
        {
            pause=false;
            sprintTimer.start();
        }

    else if(processOn == false)
    {
        processOn = true;
    	sprinting = true;
    	sprintNum = 0;
    	run();
    }
});

$('.pauseButton').click(function () {
    console.log("pressed pause button. pause is " + pause);
     if (processOn == true && sprinting == true && pause == false)
        {
            pause = true;
            sprintTimer.pause();
            console.log("paused sprint!");
            $(".letsGoButton").html("PAUSE - Press START to Restart");
           
        }
});
$('.stopButton').click(function () {
    sprintTimer.stop();
    processOn = false;
    sprintNum = 0;
    if(sprinting == true)
    {
    	sprinting = false;
    }
});

$('#letsGoButton').click(function()
{  if (pause == true)
    {
        sprintTimer.start();
        pause = false;
    }
});


sprintTimer.addEventListener('started', function (e) {
    $('#countdownExample .values').html(sprintTimer.getTimeValues().toString());
});


//////

}

/////PROGRAMMING LETSGO BUTTON!!!
$('.letsGoButton').click(function () 
{
    if(processOn == false){
    sprintNum = 0;
    processOn = true;
    run();
}

}
);


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
  sprint = sprintTime.toString().toMMSS();
  console.log(sprintTime);
  document.getElementById("sprintTime").value = sprint;
});
};

var downSprintTime = document.getElementById("downSprintTime");
if(downSprintTime){downSprintTime.addEventListener("click", function() {
 if(sprintTime>0){ sprintTime--;}
  sprint = sprintTime.toString().toMMSS()
  console.log(sprintTime);
    document.getElementById("sprintTime").value = sprint;
});
}
/////////////////REST TIME

var upRestTime = document.getElementById("upRestTime");
if(upRestTime){upRestTime.addEventListener("click", function() {
  restTime++;
  rest = restTime.toString().toMMSS()
  console.log(restTime);
    document.getElementById("restTime").value = rest;
});}

var downRestTime = document.getElementById("downRestTime");
if(downRestTime){downRestTime.addEventListener("click", function() {
  if(restTime>0){restTime--;}
  rest = restTime.toString().toMMSS();
  console.log(restTime);
  console.log(rest);
    document.getElementById("restTime").value = rest;
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







}); //closing docready

