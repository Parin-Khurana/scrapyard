

const chaosZone = document.getElementById("chaosZone");
const chaosGod = chaosZone.getContext("2d");
const respawnBtn = document.getElementById("respawnBtn");
const startVibe = document.getElementById("startVibe");
chaosZone.width = window.innerWidth;
chaosZone.height = window.innerHeight;

const toiletMan = new Image();
toiletMan.src = "logo.png";

const goofyObstacle = new Image();
goofyObstacle.src = "skibidi_pillar.png";

const boingSFX = document.getElementById("boingSFX");
const oofSFX = document.getElementById("oofSFX");

let madness = false;
let skibidiToilet = { x: 100, y: chaosZone.height / 2, width: 70, height: 70, velocity: 0, gravity: 0.2 };
let goofyPipes = [];
let dripScore = 0;
let chunkyPipes = 100;
let bigGap = 200;
let zoomSpeed = 4;

function unleashMadness() {
    madness = true;
    startVibe.style.display = "none";
    chaosZone.style.display = "block";
    skibidiToilet.y = chaosZone.height / 2;
    skibidiToilet.velocity = 0;
    goofyPipes = [];
    dripScore = 0;
    respawnBtn.style.display = "none";
    oofSFX.pause();
    oofSFX.currentTime = 0;
    dropGoofyPipe();
    makeItMove();
}

function dropGoofyPipe() {
    if (!madness) return;
    let goofyHeight = Math.random() * (chaosZone.height - bigGap - 100) + 50;
    goofyPipes.push({ x: chaosZone.width, goofyHeight, bottomY: goofyHeight + bigGap });
    setTimeout(dropGoofyPipe, 2000);
}

function makeItMove() {
    if (!madness) return;
    skibidiToilet.velocity += skibidiToilet.gravity;
    skibidiToilet.y += skibidiToilet.velocity;

    for (let i = 0; i < goofyPipes.length; i++) {
        goofyPipes[i].x -= zoomSpeed;
        if (goofyPipes[i].x + chunkyPipes < 0) {
            goofyPipes.splice(i, 1);
            dripScore++;
        }
    }
    if (dripScore === 1) {
        console.log("You're a drip!");  
        setTimeout(pageChange, 1000)
    }

    if (skibidiToilet.y + skibidiToilet.height >= chaosZone.height || skibidiToilet.y <= 0 || bonkDetected()) {
        madness = false;
        oofSFX.play();
        console.log("yo")
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        
        respawnBtn.style.display = "block";
    }

    summonTheMadness();
    requestAnimationFrame(makeItMove);
}

function bonkDetected() {
    for (let pipe of goofyPipes) {
        if (
            skibidiToilet.x < pipe.x + chunkyPipes &&
            skibidiToilet.x + skibidiToilet.width > pipe.x &&
            (skibidiToilet.y < pipe.goofyHeight || skibidiToilet.y + skibidiToilet.height > pipe.bottomY)
        ) {
            return true;
        }
    }
    return false;
}

function summonTheMadness() {
    chaosGod.clearRect(0, 0, chaosZone.width, chaosZone.height);
    goofyPipes.forEach(pipe => {
        if (goofyObstacle.complete && goofyObstacle.naturalWidth !== 0) {
            chaosGod.drawImage(goofyObstacle, pipe.x, 0, chunkyPipes, pipe.goofyHeight);
            chaosGod.drawImage(goofyObstacle, pipe.x, pipe.bottomY, chunkyPipes, chaosZone.height - pipe.bottomY);
        } else {
            chaosGod.fillStyle = "green";
            chaosGod.fillRect(pipe.x, 0, chunkyPipes, pipe.goofyHeight);
            chaosGod.fillRect(pipe.x, pipe.bottomY, chunkyPipes, chaosZone.height - pipe.bottomY);
        }
    });

    if (toiletMan.complete && toiletMan.naturalWidth !== 0) {
        chaosGod.drawImage(toiletMan, skibidiToilet.x, skibidiToilet.y, skibidiToilet.width, skibidiToilet.height);
    } else {
        chaosGod.fillStyle = "black";
        chaosGod.fillRect(skibidiToilet.x, skibidiToilet.y, skibidiToilet.width, skibidiToilet.height);
    }

    chaosGod.fillStyle = "white";
    chaosGod.font = "40px Arial";
    chaosGod.fillText("Drip Score: " + dripScore, 20, 50);
}

document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && madness) {
        skibidiToilet.velocity = -10;
        boingSFX.play();
    } else if (e.code === "Enter" && !madness) {
        unleashMadness();
    }
});

function pageChange(){

    window.location.href = "index3.html";
    settext();
}

respawnBtn.addEventListener("click", unleashMadness);