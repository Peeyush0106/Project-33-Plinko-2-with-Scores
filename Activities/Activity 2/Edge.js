class Edge {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.options =
        {
            isStatic: true,
            density: 10
        };
        this.body = Bodies.rectangle(this.x, this.y, this.width, this.height, this.options);
        World.add(world, this.body);
    }
    display(objectImage, color, giveImageX, giveImageY) {
        if (objectImage) {
            image(objectImage, giveImageX, giveImageY, this.width, this.height);
        }
        else {
            push();
            if (color) {
                fill(color);
            }
            rect(this.body.position.x, this.body.position.y, this.width, this.height);
            pop();
        }
    }
}