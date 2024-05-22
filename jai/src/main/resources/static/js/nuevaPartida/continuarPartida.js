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
    var moving = false; // Variable para controlar si el personaje está en movimiento
    var teclaPulsada = false;
    function moveCharacter(direction) {
        var speed = 12; // Velocidad de movimiento

        // Mueve al personaje en la dirección especificada
        switch (direction) {
    case 'left':
    teclaPulsada = true;
        async function moveLeft() {
            while (teclaPulsada) {
                positionX -= speed;
                sprite.css('left', positionX + 'px');
                await new Promise(resolve => setTimeout(resolve, 50)); // Retraso de 50 milisegundos
            }
        }
        moveLeft();
        sprite.animateSprite('play', 'walkLeft', true);
        break;

    case 'up':
    teclaPulsada = true;
    async function moveTop() {
        while (teclaPulsada) {
            positionY -= speed;
            sprite.css('top', positionY + 'px');
            await new Promise(resolve => setTimeout(resolve, 50)); // Retraso de 50 milisegundos

        }

    }
        moveTop();
        sprite.animateSprite('play', 'walkUp', true);
        break;

    case 'right':
    teclaPulsada = true;

    async function moveRight() {
        while (teclaPulsada) {
            positionX += speed;
            sprite.css('left', positionX + 'px');
            await new Promise(resolve => setTimeout(resolve, 50)); // Retraso de 50 milisegundos

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
            await new Promise(resolve => setTimeout(resolve, 50)); // Retraso de 50 milisegundos

        }

    }
    moveDown();
        sprite.animateSprite('play', 'walkDown', true);
        break;
}
    }

    // Cuando se presiona una tecla
    $(document).keydown(function(e) {
        if (!moving) { // Comprueba si el personaje ya está en movimiento
            moving = true; // Establece que el personaje está en movimiento
            switch(e.which) {
                case 37: // Left arrow key
                    moveCharacter('left');
                    break;
                case 38: // Up arrow key
                    moveCharacter('up');
                    break;
                case 39: // Right arrow key
                    moveCharacter('right');
                    break;
                case 40: // Down arrow key
                    moveCharacter('down');
                    break;
            }
        }
    });

    // Cuando se suelta una tecla
    $(document).keyup(function(e) {
        moving = false; // Establece que el personaje ha dejado de moverse
        teclaPulsada = false;
        sprite.animateSprite('stop'); // Detiene la animación del sprite
    });
});