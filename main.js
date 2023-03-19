Status = "";
objects = [];

function setup(){
        canvas = createCanvas(380,280);
        canvas.position(200,200);
        video = createCapture(VIDEO);
        video.size(480,280);
        video.hide();
}
function preload()
{

}
function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}
function modelLoaded() 
{
    console.log("Model Loaded!");
    status = true;
}
function draw()
{
    image(video, 0, 0, 480, 380);
}
function start(){
    video.position(150,335);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
    object_name = document.getElementById("object_name").value;
}

function draw(){
    image(video,0,0,300,290);
    if(status != ""){
        object_Detector.detect(video, gotResults);
        for(i = 0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            console.log(objects.length);
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == object_name){
                video.stop();
                object_Detector.detect(gotResults);
                document.getElementById("object_found").innerHTML = object_name+" Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML = object_name + " Not Found";
            }
        }
    }
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}