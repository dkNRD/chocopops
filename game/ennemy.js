var Ennemy = function(name, color, position, direction) {

    this.name = name;
    this.position = position;
    this.life = 3;
    this.bullets = new Array();
    this.direction = direction;
    this.speed = 0;

    this.material = new THREE.MeshLambertMaterial({
        color: color,
    });

    var singleGeometry = new THREE.Geometry();

    vehiculeMesh = new THREE.ConeGeometry(5, 20, 32);
    this.graphic = new THREE.Mesh(vehiculeMesh, this.material);
    this.graphic.position.z = 6;

    this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), this.direction+(3*Math.PI/2));
};

Ennemy.prototype.dead = function () {
    this.graphic.position.z = this.graphic.position.z-0.1;
    //Nettoyage de la div container
    $("#container").html("");
    jQuery('#'+this.name+' >.life').text("Tu es mort !");
    init();
}

Ennemy.prototype.accelerate = function (distance) {
    var max = 2;

    this.speed += distance / 4;
    if (this.speed >= max) {
        this.speed = max;
    }
};

Ennemy.prototype.decelerate = function (distance) {
    var min = -1;

    this.speed -= distance / 16;
    if (this.speed <= min) {
        this.speed = min;
    }
};

Ennemy.prototype.displayInfo = function () {
    jQuery('#'+this.name+' >.life').text(this.life);
}

Ennemy.prototype.turnRight = function (angle) {
    this.direction -= angle;
    this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), -angle);
};

Ennemy.prototype.turnLeft = function (angle) {
    this.direction += angle;
    this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), +angle);
};

Ennemy.prototype.move = function () {
    this.position.x += this.direction
    if (this.position.x >= WIDTH / 2) {
        this.position.x = WIDTH / 2;
        this.direction = -this.direction;
    }
    if (this.position.x <= -WIDTH / 2) {
        this.position.x = -WIDTH / 2;
        this.direction = -this.direction;
    }

    this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), this.direction);
    this.graphic.position.x = this.position.x;
    this.graphic.position.y = this.position.y;
};
