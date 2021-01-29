// Initial declarations of variables and constants
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

const PLAY = 1;
const END = 0;
const TACKLING = 0.5;

var engine, world;

var frameCount, frameCountIncreaser;
var ground;
var particles = [];

var plinkos_row_1, plinkos_row_2, plinkos_row_3, plinkos_row_4;
var plinkos = [];

var buckets = [];

var entered_particles = [];

var shouldRestartGame;

var createdDisco;

var r_color, g_color, b_color;

var bucket_score = [];

var points;

var yellow_line_x;

var turn;

var gameState;

var bg_music, bg_music_volume;

// Add a pre-seup function to load initial assets that would be used in the code all over
function preload() {
    bg_music = loadSound("Chord-Party.mp3");
}

// Setup all the objects, variables and properties of the game
function setup() {
    // Background music
    bg_music_volume = 0.6;
    bg_music.setVolume(bg_music_volume);
    bg_music.play();
    bg_music.setLoop(true);

    // canvas
    canvasWidth = 480;
    canvasHeight = 800;
    createCanvas(canvasWidth, canvasHeight);

    // Matter.js engine setup
    engine = Engine.create();
    world = engine.world;

    world.gravity.y = 2.5;

    //Edges
    createEdges();

    //Ground
    ground = new Rect_Obj(240, 740, width, 20);

    // Blockages
    var blockages_y = ((canvasHeight / 2) - (265 / 2));
    var blockages_width = 30;
    var blockages_height = canvasHeight - 265;
    // Left
    left_block = new Rect_Obj(465, blockages_y, blockages_width, blockages_height);
    // Right
    right_block = new Rect_Obj(15, blockages_y, blockages_width, blockages_height);

    // Frame Count work
    frameCount = 0;
    frameCountIncreaser = 1;

    //Plinko groups
    plinkos_row_1 = [];
    plinkos_row_2 = [];
    plinkos_row_3 = [];
    plinkos_row_4 = [];

    // Radius of the plinko
    var plinko_radius = random(5, 8);

    // Create the plinkos
    plinkos.push(plinkos_row_1);
    createPlinkos(40, canvasWidth, 100, plinko_radius, plinkos[0]);

    plinkos.push(plinkos_row_2);
    createPlinkos(60, 440, 210, plinko_radius, plinkos[1]);

    plinkos.push(plinkos_row_3);
    createPlinkos(40, canvasWidth, 320, plinko_radius, plinkos[2]);

    plinkos.push(plinkos_row_4);
    createPlinkos(60, 440, 430, plinko_radius, plinkos[3]);

    // Buckts
    createBuckets(15, 90, 635, 10, 190, "red");

    //Rgb colors for the text
    r_color = 0;
    g_color = 0;
    b_color = 0;

    // Points
    bucket_score = [100, 200, 500, 200, 100, 0];
    points = 50;

    // Yellow Line
    yellow_line_x = 0;

    // Turns
    turn = 0;

    // Game State
    gameState = PLAY;
}

function draw() {
    // Initial required function calls    
    background(0);
    updateGame();
    setModes();

    // Blockage at the left and right display
    left_block.display("blue");
    right_block.display("blue");

    // Display objects
    for (var i = 0; i < plinkos.length; i++) {
        var plinko_group_for_display = plinkos[i]
        displayPlinkos(plinko_group_for_display);
    }
    ground.display();
    displayBuckets(buckets);
    displayParticles();

    // Control the increment of the points
    decideScores();
    // Game state control
    if (turn === 5) {
        gameState = END;
    }
    // Restart the game
    if (keyDown("r") && gameState === END) {
        restart();
    }

    // controlLineMovement();

    // All texts on the screen
    // Rgb color increment
    r_color += random(0, 25);
    g_color += random(0, 25);
    b_color += random(0, 25);

    // Reset of rgb colors
    if (r_color >= 255) {
        r_color = 0;
    }
    if (g_color >= 255) {
        g_color = 0;
    }
    if (b_color >= 255) {
        b_color = 0;
    }

    // text("Mouse X: " + mouseX, 115, 650);
    // text("Mouse Y: " + mouseY, 385, 650);

    // Display the texts according to the colors and variated porperties
    if (Math.round(frameCount) % 20 >= 0 && Math.round(frameCount) % 20 < 10) {
        push();
        if (Math.round(frameCount) % 8 >= 0 && Math.round(frameCount) % 30 < 30000) {
            fill(rgb(random(0, 255), random(0, 255), random(0, 255)));
        }
        textSize(16);
        text("Created by Peeyush Agarwal, also called Peeyush - The Debugger.", 2.5, 500);
        pop();
    }
    push();
    textSize(15);
    fill(r_color, g_color, b_color);
    text("Press the places where you want to spawn your ball. This presentation", 2, 762);
    text("shows the chances of an object that falls from a height.", 45, 775);
    text("It has a 50% chance to fall on the either sides of its suspension.", 15, 790);
    pop();
    if (gameState === END) {
        push();
        fill("Red");
        stroke("Blue");
        textSize(75);
        strokeWeight(4);
        text("Game Over", 50, 287.5);
        textSize(25);
        text("Press 'R' to restart", 140, 370);
        pop();
    }
    push();
    textSize(25);
    fill("green");
    text("Your points: " + points, 35, 55);
    pop();
}

// Function for controlling the scores
function decideScores() {
    for (var j = 0; j < particles.length; j++) {
        var obj = particles[j];
        if (obj.body.position.x > 20 && obj.body.position.x < 100 && obj.body.position.y > 665) {
            entered_particles.push(obj);
            incrementScores(500, obj /*, j*/);
        }
        else if (obj.body.position.x > 110 && obj.body.position.x < 190 && obj.body.position.y > 665) {
            entered_particles.push(obj);
            incrementScores(200, obj /*, j*/);
        }
        else if (obj.body.position.x > 200 && obj.body.position.x < 280 && obj.body.position.y > 665) {
            entered_particles.push(obj);
            incrementScores(100, obj /*, j*/);
        }
        else if (obj.body.position.x > 290 && obj.body.position.x < 370 && obj.body.position.y > 665) {
            entered_particles.push(obj);
            incrementScores(200, obj /*, j*/);
        }
        else if (obj.body.position.x > 380 && obj.body.position.x < 460 && obj.body.position.y > 665) {
            entered_particles.push(obj);
            incrementScores(500, obj /*, j*/);
        }
    }
}

// A common function to imcrement the points
function incrementScores(score_to_add, object /*, for_var*/) {
    points += score_to_add;
    object.body = null;
    object = null;
    particles.pop();
    // for_var--;
    gameState = PLAY;
}

// Reload the page for restart of game
function restart() {
    // location.reload();
    // for (var q = 0; q < entered_particles.length; q++) {
    //     var entered_particle = entered_particles[q];
    //     particles.push(entered_particle);
    //     entered_particles.pop();
    // }
    particles = [];
    gameState = PLAY;
    turn = 0;
    points = 50;
}

// Function for what to do when the mouse was pressed and then it got released by the user.
function mouseReleased() {
    if (gameState === PLAY) {
        spawnParticle();
    }
}

// Game updates
function updateGame() {
    Engine.update(engine);
    frameCount += frameCountIncreaser;
    frameCountIncreaser += 0.07;
}

// The modes that are set for the code to function according to the modes set for any object image, etc.
function setModes() {
    rectMode(CENTER);
    ellipseMode(RADIUS);
    angleMode(RADIANS);
    imageMode(CENTER);
}

// Spawn particles after an interval continuously
function spawnParticle() {
    // var particle = new Particle(240, 20, 10);
    if (mouseX < 445) {
        var particle = new Particle(mouseX, 20, 10);
        particles.push(particle);
        turn += 1;
        points -= 50;
        gameState = TACKLING;
    }
}

// Create the buckets at the bottom
function createBuckets(initial_x, x_spacing, y, width, height, color) {
    for (var k = initial_x; k < 480; k += x_spacing) {
        var bucket = new Bucket(k, y, width, height, color);
        buckets.push(bucket);
    }
    // Only setting points of the first 5 buckets
    buckets[0].points = 500;
    buckets[1].points = 200;
    buckets[2].points = 100;
    buckets[3].points = 200;
    buckets[4].points = 500;
}

// Create the Plinkos that are the obstacles that bounce the particles off
function createPlinkos(initial_x, maxX, y, radius, plinko_group) {
    for (var l = initial_x; l < maxX; l += 50) {
        var plinko = new Plinko(l, y, radius);
        plinko_group.push(plinko);
    }
}

// Display function declaration for the objects in our game
//Particles
function displayParticles() {
    for (var m = 0; m < particles.length; m++) {
        var particle = particles[m];
        particle.display();
        bounceOff(particle, left_block);
    }
}

// function controlLineMovement() {
//     for (var n = 0; n < particles.length; n++) {
//         var particle = particles[n];
//         if (particle && particle.body.position.y > 80 && particle.body.position.y < 537.5 && yellow_line_x <= canvasWidth - 5) {
//             console.log("Moving yellow line to allow ball pass");
//             moveYelloLine(8);
//         }
//         else if (particle.body.position.y >= 537.5 && yellow_line_x >= 0) {
//             console.log("Mocing Yellow Line to block the path");
//             moveYelloLine(-8);
//         }
//         if (particle.body.position.y >= 537.5) {
//             particle = null;
//         }
//     }
// }

// Buckets
function displayBuckets(group) {
    for (var n = 0; n < group.length; n++) {
        var bucket = group[n];
        bucket.display();
    }
    // Added one more loop for not showing points of last bucket;
    for (var o = 0; o < group.length - 1; o++) {
        var bucket = group[o];
        push();
        textSize(15);
        fill("yellow");
        text("Points: " + bucket.points, bucket.body.position.x + 7.5, bucket.body.position.y);
        pop();
    }
    push();
    stroke("yellow");
    strokeWeight(5);
    line(yellow_line_x, 537.5, yellow_line_x + canvasWidth, 537.5);
    pop();
}

// function moveYelloLine(speed) {
//     yellow_line_x += speed;
// }

// Plinkos
function displayPlinkos(plinkos) {
    for (var p = 0; p < plinkos.length; p++) {
        var plinko = plinkos[p];
        plinko.display();
    }
}

//Edges in the game.
function createEdges() {
    side_EdgesWidth = 10;
    topAndBottom_EdgesHeight = 10;
    rightEdge = new Edge(canvasWidth + (side_EdgesWidth / 2),
        canvasHeight / 2,
        side_EdgesWidth,
        canvasHeight);

    leftEdge = new Edge(0 - (side_EdgesWidth / 2),
        canvasHeight / 2,
        side_EdgesWidth,
        canvasHeight);

    topEdge = new Edge(canvasWidth / 2,
        0 - (topAndBottom_EdgesHeight / 2),
        canvasWidth,
        topAndBottom_EdgesHeight);

    bottomEdge = new Edge(canvasWidth / 2,
        canvasHeight + (topAndBottom_EdgesHeight / 2),
        canvasWidth,
        topAndBottom_EdgesHeight);
}

// function isTouching(bodyA, bodyB) {
//     if (bodyA.body.position.x ) {
//     }
// }

// We have added the bouceOff function here because we want to ball to move and it should not get stuck in the place between the plinko and the blocking edge.
function bounceOff(target1, target2) {
    if (target1.body.position.x - target2.x < (target1.width + target2.width) / 2 &&
        target2.x - target1.body.position.x < (target1.width + target2.width) / 2) {
        // target1.velocityX *= (-1);
        target1.body.restitution = 4;
    }
    else {
        target1.body.restitution = 1;
    }

    if (target1.body.position.y - target2.y < (target1.height + target2.height) / 2 &&
        target2.y - target1.body.position.y < (target1.height + target2.height) / 2) {
        target1.body.restitution = 4;
    }
    else {
        target1.body.restitution = 1;
    }
}