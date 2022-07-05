if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
}

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const ctxCircle = canvas.getContext("2d");
const ballRadius = 10;
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;

canvas.width = window.screen.width;
canvas.height = window.screen.height;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.strokeStyle = '#330000';
    ctx.lineWidth = 5;
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawBall();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    
    x += dx;
    y += dy;

}

const audio = document.getElementById("mouse-squeaking-noise");
let audioPlayed = false;
canvas.onclick = () => {
    if (!audioPlayed) {
        audio.play();
        audioPlayed = true;
    }
}

  audio.addEventListener("pause", (algo) => {
    setInterval(() => {
        audio.play();
    }, Math.floor(Math.random() * (8000 - 2000 + 1000) + 2000));

    console.log("Se ha pausado la reproducción", algo);
  });
  

setInterval(draw, 10);
