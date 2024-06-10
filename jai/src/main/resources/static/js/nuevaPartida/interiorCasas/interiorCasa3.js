$(document).ready(function() {
    var genero = document.getElementById("chico").getAttribute("data-genero")
    var idEntrenador = document.getElementById("idEntrenador").value;
    var posicion = document.getElementById("posicion").value;
    var posicionY = document.getElementById("posicionY").value;
    $("#idEntrenador").data("enlace", "/empezarJuego/salirCasa?idEntrenador=" + idEntrenador + "&posicion=" + posicion + "&posicionY=" + posicionY);
    $("#idEntrenador").data("curarPokemones", "/pokemon/curarPokemones?idEntrenador=" + idEntrenador);
    var enlace = $("#idEntrenador").data("enlace");
    var curarPokemones = $("#idEntrenador").data("curarPokemones");

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
    var tocando = false;

    var imagePath = genero === 'true' ? '/img/chicaSprite.png' : '/img/chicoSprite.png';
    $(".chico").css({
        'background-image': 'url(' + imagePath + ')',


    });

    var dialogosNaara = [
        "Estoy harta de escuchar gritos que vienen de esa casa.",
        "Dicen que en el lago vive una criatura",
        "Quand mon fils aura trois ans, je l'emmènerai à Paris",
    ];
   
    function mostrarDialogoAleatorioNaara() {
        var indiceAleatorio = Math.floor(Math.random() * dialogosNaara.length);
        var dialogo = dialogosNaara[indiceAleatorio];
        $(".dialogoNaara").text(dialogo);
        $(".dialogoNaara").show();
        setTimeout(function() {
            $(".dialogoNaara").fadeOut();
        }, 4000);
    }

   function checkCollision(newX, newY, direction) {
    var elements = $(".pared, .puerta, .personajes");
    var chicoRect = $(".chico")[0].getBoundingClientRect();

    for (var i = 0; i < elements.length; i++) {
        var elementRect = elements[i].getBoundingClientRect();
        var futureRect = {
            left: chicoRect.left + newX - positionX,
            right: chicoRect.right + newX - positionX,
            top: chicoRect.top + newY - positionY,
            bottom: chicoRect.bottom + newY - positionY
        };

        if (futureRect.right > elementRect.left &&
            futureRect.left < elementRect.right &&
            futureRect.bottom > elementRect.top &&
            futureRect.top < elementRect.bottom) {
            
            // Verifica si está tocando una puerta mientras se mueve hacia abajo
            if (direction === 'down' && $(elements[i]).hasClass('puerta')) {
                window.location.href = enlace;

            }
            if ($(elements[i]).hasClass('colisionErik')) {
                $(document).on('keydown', function(event) {
                    if (event.which == 13) {
                        window.location.href = curarPokemones;
                    }
                });
            }
            return false;
        }
    }

    return true;
}

    function moveCharacter(direction) {
        var speed = 14;

        switch (direction) {
            case 'left':
                teclaPulsada = true;
                async function moveLeft() {
                    while (teclaPulsada) {
                        var newX = positionX - speed;
                        if (checkCollision(newX, positionY, 'left')) {
                            positionX = newX;
                            sprite.css('left', positionX + 'px');
                        }
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
                        var newY = positionY - speed;
                        if (checkCollision(positionX, newY, 'up')) {
                            positionY = newY;
                            sprite.css('top', positionY + 'px');
                        }
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
                        var newX = positionX + speed;
                        if (checkCollision(newX, positionY, 'right')) {
                            positionX = newX;
                            sprite.css('left', positionX + 'px');
                        }
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
                        var newY = positionY + speed;
                        if (checkCollision(positionX, newY, 'down')) {
                            positionY = newY;
                            sprite.css('top', positionY + 'px');
                        }
                        await new Promise(resolve => setTimeout(resolve, 50));
                    }
                }
                moveDown();
                sprite.animateSprite('play', 'walkDown', true);
                break;
        }
    }

    $(document).keydown(function(e) {
        if (!moving) {
            moving = true;
            switch (e.which) {
                case 37:
                    moveCharacter('left');
                    break;
                case 38:
                    moveCharacter('up');
                    break;
                case 39:
                    moveCharacter('right');
                    break;
                case 40:
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
