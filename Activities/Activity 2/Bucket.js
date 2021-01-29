class Bucket {
    constructor(x, y, width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.score = 0;
        this.options = {
            isStatic: true
        }
        this.body = Bodies.rectangle(x, y, this.width, this.height, this.options);
        World.add(world, this.body);
    }
    display() {
        fill(this.color);
        rect(this.body.position.x, this.body.position.y, this.width, this.height);
    }
}