let video = document.getElementById("videoInput"); // video is the id of video tag
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err) {
        console.log("An error occurred! " + err);
    });

var postureData;
console.log("loading old data")
postureData = JSON.parse(localStorage.getItem("postureData"));

let clear = true;
if (postureData == null || clear){
  postureData = new Array();
}

//let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
//let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
let cap = new cv.VideoCapture(video);

let streaming = true;
const FPS = 24;

async function processVideo() {
    let begin = Date.now();
    try {
        if (!streaming) {
            // clean and stop.
            src.delete();
            dst.delete();
            return;
        }

        const displaySize = { width: video.width, height: video.height }
        // resize the overlay canvas to the input dimensions
        const canvas = document.getElementById('canvasOutput')
        faceapi.matchDimensions(canvas, displaySize)

        /* Display face landmarks */
        const detectionsWithLandmarks = await faceapi
          .detectSingleFace(video)
          .withFaceLandmarks()
        // resize the detected boxes and landmarks in case your displayed image has a different size than the original
        const resizedResults = faceapi.resizeResults(detectionsWithLandmarks, displaySize)
        // draw detections into the canvas
        faceapi.draw.drawDetections(canvas, detectionsWithLandmarks)
        // draw the landmarks into the canvas
        faceapi.draw.drawFaceLandmarks(canvas, detectionsWithLandmarks)

        let landmarks = detectionsWithLandmarks.landmarks;

        //console.log(landmarks);
        postureData.push(new Array(Date.now(), landmarks))
        if (postureData.length > 100){
          postureData = postureData.slice(-100,-1)
        }
        localStorage.setItem("postureData", JSON.stringify(postureData));
        
    } catch (err) {
        console.log("error924 "+ err);
    }
    let delay = 1000/FPS - (Date.now() - begin);
    setTimeout(processVideo, delay);
};


// schedule the first one.
async function start(){
  
  console.log(faceapi.nets)
  console.log("loading model");
  await faceapi.nets.ssdMobilenetv1.loadFromUri('/assets')
  await faceapi.nets.faceLandmark68Net.loadFromUri('/assets')
  await faceapi.nets.faceRecognitionNet.loadFromUri('/assets')
  console.log("loaded model");
    console.log(faceapi.nets)

  setTimeout(processVideo, 0);
};
start()