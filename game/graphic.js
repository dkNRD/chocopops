function init()
{
    // set some camera attributes
    var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

    $container = $('#container');
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
                                    ASPECT,
                                    NEAR,
                                    FAR);
    scene = new THREE.Scene();
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    camera.position.z = 500;
    scene.add(camera);

    renderer.setSize(WIDTH, HEIGHT);

    $container.append(renderer.domElement);

    player1 = new Player("player1", 0xffff00, new THREE.Vector2(100, 0), 0);
    scene.add(player1.graphic);

    ennemy1 = new Ennemy("ennemy1", 0xff0000, new THREE.Vector2(200, 50), 3);
    scene.add(ennemy1.graphic);

    playerPositions = [player1.position, ennemy1.position];

    noGround = [];
    ground = new Ground(0xffffff, WIDTH, HEIGHT, 10, playerPositions);

    light1 = new Light("sun", 0xffffff, "0,0,340");
    scene.add(light1);
}

function Ground(color, size_x, size_y, nb_tile, playerPositions)
{
    colors = Array(0xff0000, 0x00ff00, 0x0000ff, 0x000000);

    sizeOfTileX = size_x / nb_tile;
    minX = -(size_x/2);
    maxX = (size_x/2);
    
    sizeOfTileY = size_y / nb_tile;
    minY = -(size_y/2);
    maxY = (size_y/2);

    for (x = minX; x <= maxX; x = x+sizeOfTileX){
        for (y = minY; y <= maxY; y = y+sizeOfTileY){

            color = colors[Math.floor(Math.random()*colors.length)];

            for (var i = 0; i < playerPositions.length; i++) {
                const playerPosition = playerPositions[i];
                const posX = playerPosition.x;
                const posY = playerPosition.y;
                if (posX >= x - sizeOfTileX/2 && posX <= x + sizeOfTileX/2 &&
                    posY >= y - sizeOfTileY/2 && posY <= y + sizeOfTileY/2) {
                    while (0x000000 === color)
                        color = colors[Math.floor(Math.random()*colors.length)];
                }
            }

            if (0x000000 !== color)
            {
                tmpGround = new THREE.Mesh(
                new THREE.PlaneGeometry(sizeOfTileX-10, sizeOfTileY-10),
                new THREE.MeshLambertMaterial({color: color, transparent: true, opacity: 0.6}));
                tmpGround.position.x = x;
                tmpGround.position.y = y;
                scene.add(tmpGround);
            }
            else
                noGround.push([x, y]);
        }
    }
}

function Light(name, color, position)
{
    pointLight = new THREE.PointLight(color, 50, 10000);

    pointLight.position.x = position.split(',')[0];
    pointLight.position.y = position.split(',')[1];
    pointLight.position.z = position.split(',')[2];

    return pointLight;
}
