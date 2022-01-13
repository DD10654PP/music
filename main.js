leftX = 0;
leftY = 0;
rightX = 0;
rightY = 0;
scoreLeft = 0;
scoreRight = 0;
statusSong = "";
statusSong2 = "";
faded = "";
mem = "";

function preload() {
    faded = loadSound("songFaded.mp3");
    mem = loadSound("songMem.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    PoseNet = ml5.poseNet(video, modelLoaded)
    PoseNet.on("pose", gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#332829");
    stroke("#332829");
    statusSong = faded.isPlaying();

    if (scoreLeft > 0.02) {
        circle(leftX, leftY, 20)
        mem.stop()
        if (songStatus == false) {
            faded.play()
        }
    }

    statusSong2 = mem.isPlaying();

    if (scoreRight > 0.02) {
        circle(rightX, rightY, 20)
        faded.stop()
        if (songStatus2 == false) {
            mem.play()
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded!")
}

function gotPoses(result) {
    if (result.length > 0) {
        leftX = result[0].pose.leftWrist.x;
        leftY = result[0].pose.leftWrist.y;
        rightX = result[0].pose.rightWrist.x;
        rightY = result[0].pose.rightWrist.y;
        console.log(result);
        scoreLeft = result[0].pose.keypoints[9].score;
        console.log(scoreLeft);
        scoreRight = result[0].pose.keypoints[10].score;
        console.log(scoreRight);

    }
}