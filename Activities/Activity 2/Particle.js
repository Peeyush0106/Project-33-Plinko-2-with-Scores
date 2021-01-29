class Particle {
    constructor(x, y, radius) {
        this.radius = radius;
        this.diameter = this.radius * 2;
        this.fill = rgb(random(10, 255), random(10, 255), random(10, 255));
        this.options = {
            restitution: 1.0,
            friction: 1.0,
            density: 1.0
        }
        this.body = Bodies.circle(x, y, this.radius, this.options);
        World.add(world, this.body);
    }

    display() {
        var angle = this.body.angle;
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        fill(this.fill);
        ellipse(0, 0, this.radius);
        pop();
    }
}