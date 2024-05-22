$(document).ready(function() {
    var sprite = $(".chico").animateSprite({
        fps: 16,
        autoplay: false,
        animations: {
            walkDown: [0, 1, 2, 3],
            walkLeft: [7, 6, 5, 4],
            walkRight: [8, 9, 10, 11],
            walkUp: [12, 13, 14, 15]
        },
        loop: true
    });

    var positionX = 0;
    var positionY = 0;
    var moving = false;
    var teclaPulsada = false;
    var speed = 12; // Velocidad del personaje
    var viewport = $('.viewport');
    var gameArea = $('.gameArea');

    function moveCharacter(direction) {
        switch (direction) {
            case 'left':
                teclaPulsada = true;
                async function moveLeft() {
                    while (teclaPulsada) {
                        positionX -= speed;
                        sprite.css('left', positionX + 'px');
                        centerCamera();
                        await new Promise(resolve => setTimeout(resolve, 50));
                    }
                }
                moveLeft();
                sprite.animateSprite('play', 'walkLeft', true);
                break;

            case 'up':
                teclaPulsada = true;
                async function moveUp() {
                    while (teclaPulsada) {
                        positionY -= speed;
                        sprite.css('top', positionY + 'px');
                        centerCamera();
                        await new Promise(resolve => setTimeout(resolve, 50));
                    }
                }
                moveUp();
                sprite.animateSprite('play', 'walkUp', true);
                break;

            case 'right':
                teclaPulsada = true;
                async function moveRight() {
                    while (teclaPulsada) {
                        positionX += speed;
                        sprite.css('left', positionX + 'px');
                        centerCamera();
                        await new Promise(resolve => setTimeout(resolve, 50));
                    }
                }
                moveRight();
                sprite.animateSprite('play', 'walkRight', true);
                break;

            case 'down':
                teclaPulsada = true;
                async function moveDown() {
                    while (teclaPulsada) {
                        positionY += speed;
                        sprite.css('top', positionY + 'px');
                        centerCamera();
                        await new Promise(resolve => setTimeout(resolve, 50));
                    }
                }
                moveDown();
                sprite.animateSprite('play', 'walkDown', true);
                break;
        }
    }

    function centerCamera() {
        var viewportWidth = viewport.width();
        var viewportHeight = viewport.height();
        var spriteWidth = sprite.width();
        var spriteHeight = sprite.height();

        var targetX = positionX + spriteWidth / 2 - viewportWidth / 2;
        var targetY = positionY + spriteHeight / 2 - viewportHeight / 2;

        // Calcular la distancia a desplazar la cámara en cada eje
        var dx = (targetX - parseFloat(gameArea.css('left'))) / 10;
        var dy = (targetY - parseFloat(gameArea.css('top'))) / 10;

        // Mover la cámara suavemente hacia la posición del personaje
        gameArea.css({
            left: '+=' + dx + 'px',
            top: '+=' + dy + 'px'
        });
    }

    // Llamar a la función centerCamera() al inicio para centrar la cámara en el personaje
    centerCamera();

    $(document).keydown(function(e) {
        if (!moving) {
            moving = true;
            switch(e.which) {
                case 37: // Tecla de flecha izquierda
                    moveCharacter('left');
                    break;
                case 38: // Tecla de flecha arriba
                    moveCharacter('up');
                    break;
                case 39: // Tecla de flecha derecha
                    moveCharacter('right');
                    break;
                case 40: // Tecla de flecha abajo
                    moveCharacter('down');
                    break;
            }
        }
    });

    $(document).keyup(function(e) {
        moving = false;
        teclaPulsada = false;
        sprite.animateSprite('stop');
    });
});
