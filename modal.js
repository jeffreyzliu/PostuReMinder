$(function () {
  
  $('.md-trigger').on('click', function() {
    $('.md-modal').addClass('md-show');
  });
  
  $('.md-close').on('click', function() {
    $('.md-modal').removeClass('md-show');
  });
  
});

window.setInterval(function(){
    if(!(localStorage.getItem('eyePos')===null)){
    //console.log("Last Position Exists")
    document.getElementById('calibrationMessage').innerHTML="Calibration Completed";
    document.getElementById('calibrationMessage').style.color="#008000";
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
  document.getElementById('calibrationMessage').style.color="#008000";
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
  
}


