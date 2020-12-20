var mostRecent = Date.now();
window.setInterval(function () {
  //constantly run program, but don't send two notifications too close to each other
  var postureData = JSON.parse(localStorage.getItem("postureData"));
  var expectedPositions = JSON.parse(localStorage.getItem("eyePos"));
  var currX = 0;
  var currY = 0;
  var expectedX = expectedPositions[0];
  var expectedY = expectedPositions[1];
  if (Date.now() - postureData[postureData.length - 1][0] > 1000) {
    return;
  }
  for (var i = 5; i >= 1; i--) {
    for (var j = 36; j < 48; j++) {
      currX += postureData[postureData.length - i][1]._positions[j]._x / 60;
      currY += postureData[postureData.length - i][1]._positions[j]._y / 60;
      if (postureData[postureData - i] - postureData[postureData.length - i - 1][0] > 1000) {
        return;
      }
    }
  }
  var xInterval = 200;
  var yInterval = 70;

  var postureAnalytics;
  postureAnalytics = JSON.parse(localStorage.getItem("postureAnalytics"));
  var today = new Date();
  var currDate = today.toISOString().slice(0, 10);

  if (postureAnalytics == null) {
    postureAnalytics = {};
  }

  console.log(currY);
  console.log(expectedY);
  console.log(postureAnalytics)

  if ((Math.abs(currX - expectedX) > xInterval || currY - expectedY > yInterval) && Date.now() - mostRecent > 5000) {
    mostRecent = Date.now();
    //send notification to fix posture   
    $.getScript('notification.js', function () {
      alertFunction('posture');
    });

    console.log("hi");
    if (currDate in postureAnalytics) {
      console.log("in already");
      postureAnalytics[currDate] += 1;
    } else {
      console.log("not in already");
      postureAnalytics[currDate] = 1;
    }

    if (!(currDate in postureAnalytics)) {
      postureAnalytics[currDate] = 0;
    }
    localStorage.setItem("postureAnalytics", JSON.stringify(postureAnalytics));

  }


}, 1000);