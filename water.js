if(localStorage.getItem('WaterTimer')==null){
  localStorage.setItem('WaterTimer',JSON.stringify(60));
}
document.getElementById('waterMessageMain').innerHTML="Notification Every " + localStorage.getItem('WaterTimer') + " Minutes";
  document.getElementById('waterMessageMain').style.color="#008000";
var passedTime = 0;
window.setInterval(function(){
  if(localStorage.getItem('WaterTimer')!=0&&passedTime>localStorage.getItem('WaterTimer')*60){
    passedTime=0;
    console.log("Drink Water " + localStorage.getItem('WaterTimer'))
    $.getScript('notification.js', function () {
      alertFunction('hydrate');
    });
  }
  passedTime++;
}, 1000);

document.getElementById('waterMessage').innerHTML="Time In Between Reminders " + localStorage.getItem('WaterTimer') + " Minutes";
$(function () {
  
  $('.ab-trigger').on('click', function() {
    $('.ab-water').addClass('ab-show');
  });
  
  $('.ab-close').on('click', function() {
    $('.ab-water').removeClass('ab-show');
  });
  
});

$(function() {

  $("#water").slider({
    min: 0,
    max: 120,
    value: localStorage.getItem('WaterTimer'),
    step: 5,
    range: "min",
    slide: function(event, ui) {
      localStorage.setItem('WaterTimer',JSON.stringify(ui.value));
      document.getElementById('waterMessage').innerHTML="Time in Between Notifications: " + ui.value + " Minutes";
      document.getElementById('waterMessageMain').innerHTML="Notification Every " + localStorage.getItem('WaterTimer') + " Minutes";
  document.getElementById('waterMessageMain').style.color="#008000";
    }
  });
});


/*
window.setInterval(function(){
    if(!(localStorage.getItem('eyePos')===null)){
    //console.log("Last Position Exists")
    document.getElementById('calibrationMessage').innerHTML="Calibration Completed";
    document.getElementById('calibrationMessage').style.color="#47e347";
  }
  else{
    //console.log("Last Position Does Not Exist" + localStorage.getItem('eyePos'));
    document.getElementById('calibrationMessage').innerHTML= "Needs Calibration";
    document.getElementById('calibrationMessage').style.color="#d80000";
  }
}, 1000);

if(!localStorage.getItem('eyePos')===null){
  console.log("Last Position Exists")
  document.getElementById('calibrationMessage').innerHTML="Calibration Completed";
  document.getElementById('calibrationMessage').style.color="#47e347";
}
else{
  console.log("Last Position Does Not Exist");
  document.getElementById('calibrationMessage').innerHTML= "Needs Calibration";
  document.getElementById('calibrationMessage').style.color="#d80000";
}


function updateAverage(){
  document.getElementById('timer').innerHTML="Sit Straight Until Calibration is Complete";
  setTimeout(function () {
        helper()
    }, 5000);
}


function helper(){
  //tell user to sit with good posture
  //wait 5 seconds
  //average the data and store it locally (store in class and in localstorage)
  //give message saying calibration is done
  document.getElementById('timer').innerHTML="Calibration Finished";
  var avgX = 0;
  var avgY = 0;
  var postureData = JSON.parse(localStorage.getItem("postureData"));
  for (var i = 5; i >=1; i --){
    for(var j = 36; j < 48; j ++){
      avgX += postureData[postureData.length-i][1]._positions[j]._x/60;
      avgY += postureData[postureData.length-i][1]._positions[j]._y/60;
    }
  }
  localStorage.setItem('eyePos',JSON.stringify([avgX,avgY]));
  document.getElementById('calibrationMessage').innerHTML="Calibration Completed";
  document.getElementById('calibrationMessage').style.color="#47e347";
  alert("Calibration Complete!")
  
}*/
