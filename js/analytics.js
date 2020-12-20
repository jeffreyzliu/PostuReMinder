var currValue = 0;
window.setInterval(function () {
  var ctx = document.getElementById('analytics').getContext("2d");
  var postureAnalytics = JSON.parse(localStorage.getItem("postureAnalytics"));
  let clear = true;
  if (postureAnalytics == null) {
    postureAnalytics = {};
  }

  let demo = true;
  postureDemo = [7, 8, 8, 6, 4, 6, 7, 4, 5, 3, 3, 2, 4, 6, 5, 3, 3, 4, 2, 1, 2, 3, 4, 1, 5, 1, 2, 2, 1, 0];
  var X = [], Y1 = [], Y2 = [];
  var start = new Date();
  start.setDate(start.getDate() - 30);
  var numToday = 0;
  var numThisWeek = 0;
  var monthTotal = 0;

  for (i = 0; i < 30; i++) {
    start.setDate(start.getDate() + 1);
    X.push(start.toISOString().slice(5, 10))

    var currDate = start.toISOString().slice(0, 10);
    let tmp = monthTotal;
    if (demo) {
      monthTotal += postureDemo[i];
      if (i >= 23) {
        numThisWeek += postureDemo[i];
      }
    }
    if (currDate in postureAnalytics) {

      monthTotal += postureAnalytics[currDate];

      if (i >= 23) {
        numThisWeek += postureAnalytics[currDate];
      }
      if (i >= 29) {
        numToday += postureAnalytics[currDate];
      }
    }

    Y1.push(monthTotal - tmp);

    /*Y1.push(postureCheck[i])
    monthTotal += postureCheck[i];
    if (i >= 23) {
      numThisWeek += postureCheck[i];
    }*/
  }
  if(monthTotal == currValue){
    return;
  }
  currValue = monthTotal;
  for (i = 0; i < 30; i++) {
    Y2.push((monthTotal / 30).toFixed(1))
  }
  console.log(X)
  console.log(Y1)

  document.getElementById("analyticsText").innerHTML = "Today: " + "<br />" + numToday + " checks" + "<br />" + (monthTotal / 30).toFixed(1) + " avg" + "<br />" + "<br />" + "This week: " + "<br />" + numThisWeek + " checks" + "<br />" + (monthTotal * 7 / 30).toFixed(1) + " avg" + "<br />" + "<br />" + "This month: " + "<br />" + monthTotal + " checks";


  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: X,
      datasets: [{
        label: "Number of Posture Checks",
        data: Y1,
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 2
      }, {
        label: 'Average Posture Checks Per Day This Month',
        data: Y2,
        fill: false,
        backgroundColor: [
          'rgb(75, 192, 192)'
        ],
        borderColor: [
          'rgb(75, 192, 192)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Number of Posture Checks vs. Time (Days)'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Day (Month-Date)'
          }
        }],
        yAxes: [{
          ticks: {
            suggestedMax: 1.5 * Math.max.apply(Math, postureDemo),
            beginAtZero: true
          },
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Posture Checks (Per Day)'
          }
        }]
      }
    }
  });
}, 1000);

