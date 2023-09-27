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
    scene.remove(this.graphic);
}

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
