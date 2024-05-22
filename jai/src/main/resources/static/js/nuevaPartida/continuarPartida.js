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

    function checkCollision(newX, newY) {
        var chico = $('.chico');
        var chicoOffset = chico.offset();
        var chicoWidth = chico.width();
        var chicoHeight = chico.height();
        chicoOffset.top = newY;
        chicoOffset.left = newX;

        var collision = false;

        $('.limites, .casa, .casa1, #puerta1, .lago, .rio1, .rio2, .casa2, .casa3, .casa4').each(function() {
            var $this = $(this);
            var offset = $this.offset();
            var width = $this.width();
            var height = $this.height();

            if (chicoOffset.left < offset.left + width &&
                chicoOffset.left + chicoWidth > offset.left &&
                chicoOffset.top < offset.top + height &&
                chicoOffset.top + chicoHeight > offset.top) {
                collision = true;
                return false;
            }
        });
        return collision;
    }


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

        $(".casa2").each(function() {
            if (collisionCheck($(".chico"), $(this))) {
                // Ajustar la posición para que el personaje rodee la casa
                switch(e.which) {
                    case 37: // Left arrow key
                        positionX = $(this).offset().left + $(this).width();
                        break;
                    case 38: // Up arrow key
                        positionY = $(this).offset().top + $(this).height();
                        break;
                    case 39: // Right arrow key
                        positionX = $(this).offset().left - $(".chico").width();
                        break;
                    case 40: // Down arrow key
                        positionY = $(this).offset().top - $(".chico").height();
                        break;
                }
            }
        });
    });

    // Cuando se suelta una tecla
    $(document).keyup(function(e) {
        moving = false; // Establece que el personaje ha dejado de moverse
        teclaPulsada = false;
        sprite.animateSprite('stop'); // Detiene la animación del sprite
    });

    function collisionCheck(div1, div2) {
        var x1 = div1.offset().left;
        var y1 = div1.offset().top;
        var h1 = div1.outerHeight(true);
        var w1 = div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = div2.offset().left;
        var y2 = div2.offset().top;
        var h2 = div2.outerHeight(true);
        var w2 = div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
});