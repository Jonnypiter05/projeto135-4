video ="";
status = "";
objects = [];

function preload()
{
   video = createVideo('video.mp4');
   video.hide();
}
function setup()
{
    canvas = createCanvas(580, 300);
    canvas.center();
}
function draw() 
{
   image(video, 0, 0, 580, 300);
       if(status !="")
       {
         objectDetector.detect(video, gotResult);
         for (i = 0; i < objects.lenght; i++) 
         {
            document.getElementById("status").innerHTML = "Status: Objetos Detectados";
            document.getElementById("numberOfObjects").innerHTML = 
                                        "Quantidade de Objetos Detectados"+ objects.lenght;
            
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         }
        }
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status Detectando Objetos";
}
function modelLoaded()
{
    console.log("Modelo Carregado");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(erro, results)
{
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}