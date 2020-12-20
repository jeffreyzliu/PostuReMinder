// From 0-1
if(localStorage.getItem('Volume')==null){
  localStorage.setItem('Volume',JSON.stringify(0.5));
}
var dict = {
  hydrate: {
    imgsrc: "img/water-bottle.png", 
    title: "Drink Water!", 
    description: "Make sure to stay hydrated!",
    sound: "notification_sound.mp3"
  },
  posture: {
    imgsrc: "img/waiting-room.png", 
    title: "Sit Straight!", 
    description: " Correct that posture!",
    sound: "notification_sound.mp3"
  },
  stretch: {
    imgsrc: "img/posture1.png", 
    title: "Stretch!", 
    description: "Get those juices flowing!",
    sound: "notification_sound.mp3"
  },
  message: {
    imgsrc:"img/cancel.png",
    title: "Exited Posture Check",
    description: "Reopen webpage to continue",
    sound: "exit.mp3"
  }
};

function alertFunction(modal){
  console.log(modal)
  console.log("alert")
  var audio = new Audio(dict[modal]["sound"]);
  audio.volume=localStorage.getItem('Volume');
  audio.play();
  if (!window.Notification) {
    console.log('Browser does not support notifications.');
} else {
    // check if permission is already granted
    if (Notification.permission === 'granted') {
        var notify = new Notification(dict[modal]["title"], {
                  body: dict[modal]["description"],
                  icon: dict[modal]["imgsrc"],
              });
    } else {
        // request permission from user
        Notification.requestPermission().then(function(p) {
           if(p === 'granted') {
               // show notification here
           } else {
               console.log('User blocked notifications.');
           }
        }).catch(function(err) {
            console.error(err);
        });
    }
}
}

$(function() {
  var audioElement = $("<audio>");

  function setVolume(myVolume) {
    if (audioElement != undefined) {
      localStorage.setItem('Volume',JSON.stringify(myVolume));
    }
  }

  $("#volume").slider({
    min: 0,
    max: 1,
    value: localStorage.getItem('Volume'),
    step: 0.05,
    range: "min",
    slide: function(event, ui) {
      setVolume(ui.value);
    }
  });
});

window.onbeforeunload = confirmExit;
    function confirmExit() {
        alertFunction('message')
        return "Leaving this page with halt all processes. Are you sure you want to exit?";
    }

function notificationDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}