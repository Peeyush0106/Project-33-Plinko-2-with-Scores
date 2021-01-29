for (var o = initial_x; o < 480; o += x_spacing) {
    var bucket = new Bucket(o, y, width, height, color);
    buckets.push(bucket);
}
console.log(buckets);

function createPlinkos(plinkos_in_a_row, initial_x, x_spacing, y, plinkos) {
    for (var l = initial_x; l < plinkos_in_a_row; l++) {
        // for (var l = initial_x; l < canvasWidth; l += 50) {
        var plinko = new Plinko((l + 1) * x_spacing, y, 7.5);
        console.log(plinko.body.position.x);
        plinkos.push(plinko);
    }
}

function displayPlinkos(plinkos) {
    for (var m = 0; m < plinkos.length; m++) {
        var plinko = plinkos[m];
        plinko.display();
    }
}













const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var frameCount, frameCountIncreaser;
var ground;
var particles = [];

var plinkos_row_1, plinkos_row_2, plinkos_row_3, plinkos_row_4;
var plinkos = [];

var buckets = [];

var shouldRestartGame;

function preload() {
    // backgroundImg = loadImage("sprites/bg.png");
}

function setup() {
    canvasWidth = 480;
    canvasHeight = 800;
    createCanvas(canvasWidth, canvasHeight);

    engine = Engine.create();
    world = engine.world;

    side_EdgesWidth = 10;
    topAndBottom_EdgesHeight = 10;
    rightEdge = new Edge(canvasWidth + (side_EdgesWidth / 2), canvasHeight / 2, side_EdgesWidth, canvasHeight);
    leftEdge = new Edge(0 - (side_EdgesWidth / 2), canvasHeight / 2, side_EdgesWidth, canvasHeight);
    topEdge = new Edge(canvasWidth / 2, 0 - (topAndBottom_EdgesHeight / 2), canvasWidth, topAndBottom_EdgesHeight);
    bottomEdge = new Edge(canvasWidth / 2, canvasHeight + (topAndBottom_EdgesHeight / 2), canvasWidth, topAndBottom_EdgesHeight);


    ground = new Ground(240, 790, width, 20);

    frameCount = 0;
    frameCountIncreaser = 1;
    plinkos_row_1 = [];
    plinkos_row_2 = [];
    plinkos_row_3 = [];
    plinkos_row_4 = [];

    shouldRestartGame = false;

    plinkos.push(plinkos_row_1);
    createPlinkos(9, 40, 100, plinkos[0]);
    plinkos.push(plinkos_row_2);
    createPlinkos(11, 40, 210, plinkos[1]);
    plinkos.push(plinkos_row_3);
    createPlinkos(9, 40, 320, plinkos[2]);
    plinkos.push(plinkos_row_4);
    createPlinkos(11, 40, 430, plinkos[3]);

    createBuckets(15, 90, 690, 10, 190, "red");
}

function createBuckets(initial_x, x_spacing, y, width, height, color) {
    for (var o = initial_x; o < 480; o += x_spacing) {
        var bucket = new Bucket(o, y, width, height, color);
        buckets.push(bucket);
    }
    console.log(buckets);
}
function displayBuckets(group) {
    for (var p = 0; p < group.length; p++) {
        var bucket = group[p];
        bucket.display();
    }
}

function draw() {
    background(0);
    updateGame();
    setModes();
    if (!shouldRestartGame) {
        spawnParticle();
    }
    for (var q = 0; q < particles.length; q++) {
        var particle = particles[q];
        if (particles.length >= 5 && particle.body.position.y > 600) {
            // shouldRestartGame = true;
        }
    }

    for (i = 0; i < plinkos.length; i++) {
        displayPlinkos(plinkos[i]);
    }
    displayBuckets(buckets);
    ground.display();
    if (shouldRestartGame) {
        // restartGame();
    }
    if (Math.round(frameCount) % 20 >= 0 && Math.round(frameCount) % 20 < 10) {
        push();
        textSize(20);
        text("After 25 ball Spawns, your output is to be restarted.", 10, 525);
        pop();
    }
    push();
    fill(rgb(random(0, 255), random(0, 255), random(0, 255)));
    textSize(16);
    text("Created by Peeyush Agarwal, also called Peeyush - The Debugger.", 2.5, 575);
    pop();
}

function restartGame() {
    // // location.reload();
    // for (var r = 0; r < particles.length; r++) {
    //     particle = particles[r];
    //     World.remove(world, particle.body);
    //     particles.pop();
    // }
    // shouldRestartGame = false;
}

function updateGame() {
    Engine.update(engine);
    frameCount += frameCountIncreaser;
    frameCountIncreaser += 0.07;
}

function setModes() {
    rectMode(CENTER);
    ellipseMode(RADIUS);
    angleMode(RADIANS);
    imageMode(CENTER);
}

function spawnParticle() {
    if (Math.round(frameCount) % 70 === 0) {
        console.log("Ball Spawned");
        var particle = new Particle(240, 50, 10);
        particles.push(particle);
    }
    displayParticles();
}

function displayParticles() {
    for (var j = 0; j < particles.length; j++) {
        var particle = particles[j];
        particle.display();
    }
}

function createPlinkos(plinkos_in_a_row, initial_x, x_spacing, y, plinkos) {
    for (var l = initial_x; l < plinkos_in_a_row; l++) {
        // for (var l = initial_x; l < canvasWidth; l += 50) {
        var plinko = new Plinko((l + 1) * x_spacing, y, 7.5);
        console.log(plinko.body.position.x);
        plinkos.push(plinko);
    }
}

function displayPlinkos(plinkos) {
    for (var m = 0; m < plinkos.length; m++) {
        var plinko = plinkos[m];
        plinko.display();
    }
}