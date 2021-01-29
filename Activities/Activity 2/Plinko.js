class Plinko {
    constructor(x, y, radius) {
        this.radius = radius;
        this.diameter = this.radius * 2;
        this.fill = rgb(255, 255, 255);
        this.options = {
            restitution: 0.8,
            friction: 1.0,
            density: 1.0,
            isStatic: true
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