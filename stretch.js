$(function () {
  
  $('.xy-trigger').on('click', function() {
    $('.xy-stretch').addClass('xy-show');
  });
  
  $('.xy-close').on('click', function() {
    $('.xy-stretch').removeClass('xy-show');
  });
  
});
if(localStorage.getItem('StretchTimer')==null){
  localStorage.setItem('StretchTimer',JSON.stringify(60));
}
document.getElementById('stretchMessageMain').innerHTML="Notification Every " + localStorage.getItem('StretchTimer') + " Minutes";
  document.getElementById('stretchMessageMain').style.color="#4CA64C";
var passedTimeStretch = 0;
window.setInterval(function(){
  if(localStorage.getItem('StretchTimer')!=0&&passedTimeStretch>localStorage.getItem('StretchTimer')*60){
    passedTimeStretch=0;
    console.log("Stretch " + localStorage.getItem('StretchTimer'))
    $.getScript('notification.js', function () {
      alertFunction('stretch');
    });
  }
  passedTimeStretch++;
}, 1000);

document.getElementById('stretchMessage').innerHTML="Time In Between Reminders " + localStorage.getItem('StretchTimer') + " Minutes";

$(function() {

  $("#stretch").slider({
    min: 0,
    max: 120,
    value: localStorage.getItem('StretchTimer'),
    step: 5,
    range: "min",
    slide: function(event, ui) {
      localStorage.setItem('StretchTimer',JSON.stringify(ui.value));
      document.getElementById('stretchMessage').innerHTML="Time in Between Notifications: " + ui.value + " Minutes";
      document.getElementById('stretchMessageMain').innerHTML="Notification Every " + localStorage.getItem('StretchTimer') + " Minutes";
  document.getElementById('stretchMessageMain').style.color="#4CA64C";
    }
  });
});