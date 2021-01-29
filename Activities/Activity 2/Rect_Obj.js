class Rect_Obj {
    constructor(x, y, width, height) {
        var options = {
            isStatic: true
        }
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;
        World.add(world, this.body);
    }
    display(color) {
        var pos = this.body.position;
        rectMode(CENTER);
        if (color) {
            fill(color);
        }
        else {
            fill("brown");
        }
        rect(pos.x, pos.y, this.width, this.height);
    }
}