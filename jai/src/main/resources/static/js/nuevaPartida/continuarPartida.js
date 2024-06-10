$(document).ready(function() {
    var genero = document.getElementById("chico").getAttribute("data-genero")
    var posicion = $(".chico").position().left
    var posicion = $("#posicion").val();
    if (posicion === null) {
        posicion = 0;
    }
    var posicionY = $("#posicionY").val();
    if (posicionY === null) {
        posicionY = 0;
    }

    var idEntrenador = document.getElementById("chico").getAttribute("data-idEntrenador");
    var imagePath = genero === 'true' ? '/img/chicaSprite.png' : '/img/chicoSprite.png';
    $(".chico").css({
        'background-image': 'url(' + imagePath + ')',
        'left': posicion + 'px', // Establece la posición inicial según el valor de "posicion"
        'top': posicionY + 'px' // Establece la posición inicial según el valor de "posicion"

    });

    $(document).keydown(function(e) {
        if (e.which === 13) {
            if (checkElementCollision($(".naaraColision"))) {
                mostrarDialogoAleatorioNaara();
            }
        }
    });

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
    var speed = 12;
    var movingDirection = null;
    var keysPressed = {};
    var touchingDoor1 = false;
    var touchingDoor2 = false;
    var menuAbierto = false;

    var mapBounds = {
        left: 0,
        top: 0,
        right: $(".limites").width(),
        bottom: $(".limites").height()
    };

    positionX = $(".chico").position().left ;
    positionY = $(".chico").position().top;

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

    function checkCollision(newX, newY) {
        var collided = false;
        var spriteWidth = sprite.width();
        var spriteHeight = sprite.height();

        function checkElementCollision(element) {
            var offset = element.offset();
            var width = element.width();
            var height = element.height();
            if (newX < offset.left + width - 10 &&
                newX + spriteWidth - 10 > offset.left &&
                newY < offset.top + height - 10 &&
                newY + spriteHeight - 10 > offset.top) {
                collided = true;55
            }
        }

        $(" .rio1, .rio2, .naaraColision, .frenteCasa1, .ladoIzqCasa1, .ladoDerCasa1, .ladoArribaCasa1, .frenteDerCasa1, .frenteIzqCasa1, .ladoDerCasa2, .ladoArribaCasa3, .frenteDerCasa3, .frenteIzqCasa3, .ladoArribaIzqCasa4, .ladoDerCasa4, .ladoIzqCasa4, .ladoArribaDerCasa4, .frenteIzqCasa4, .vallas, .limiteAvionCentro, .limiteAvionSegurata").each(function() {
            checkElementCollision($(this));
        });

        if (newX < mapBounds.left ||
            newX + spriteWidth > mapBounds.right ||
            newY < mapBounds.top ||
            newY + spriteHeight > mapBounds.bottom) {
            collided = true;
        }

        return collided;
    }

    async function moveCharacter(direction, e) {
        teclaPulsada = true;

        if (movingDirection && movingDirection !== direction) {

            return;
        }

        movingDirection = direction;

        while (teclaPulsada) {
            var newX = positionX;
            var newY = positionY;

            switch (direction) {
                case 'left':
                    newX -= speed;
                    break;
                case 'up':
                    newY -= speed;
                    break;
                case 'right':
                    newX += speed;
                    break;
                case 'down':
                    newY += speed;
                    break;
            }

            if (!checkCollision(newX, newY)) {
                positionX = newX;
                positionY = newY;
                sprite.css('left', positionX + 'px');
                sprite.css('top', positionY + 'px');

                if (checkDoorCollision($(".puerta1")) && direction === 'up') {
                    var currentPositionX = $(".chico").position().left;
                    var currentPositionY = $(".chico").position().top;
                    touchingDoor1 = true;
                    var form = document.createElement('form');
                    form.method = 'POST'
                    form.action = '/empezarJuego/cargarCasa1'
                    var input = document.createElement('input')
                    var input2 = document.createElement('input')
                    var input3 = document.createElement('input')
                    input.type = 'hidden'
                    input.name = 'idEntrenador'
                    input.id = 'idEntrenador'
                    input.value = idEntrenador
                    input2.type = 'hidden'
                    input2.name = 'posicion'
                    input2.id = 'posicion'
                    input2.value = currentPositionX
                    input3.type = 'hidden'
                    input3.name = 'posicionY'
                    input3.id = 'posicionYposicionY'
                    input3.value = currentPositionY
                    form.appendChild(input)
                    form.appendChild(input2)
                    form.appendChild(input3)
                    document.body.appendChild(form);
                    form.submit();
                }

                if (checkDoorCollision($(".puerta2")) && direction === 'up') {
                    touchingDoor2 = true;
                    var currentPositionX = $(".chico").position().left;
                    var currentPositionY = $(".chico").position().top;
                    var form = document.createElement('form');
                    form.method = 'POST'
                    form.action = '/empezarJuego/cargarCasa2'
                    var input = document.createElement('input')
                    var input2 = document.createElement('input')
                    var input3 = document.createElement('input')
                    input.type = 'hidden'
                    input.name = 'idEntrenador'
                    input.id = 'idEntrenador'
                    input.value = idEntrenador
                    input2.type = 'hidden'
                    input2.name = 'posicion'
                    input2.id = 'posicion'
                    input2.value = currentPositionX
                    input3.type = 'hidden'
                    input3.name = 'posicionY'
                    input3.id = 'posicionYposicionY'
                    input3.value = currentPositionY
                    form.appendChild(input)
                    form.appendChild(input2)
                    form.appendChild(input3)
                    document.body.appendChild(form);
                    form.submit();                
                }
                if (checkDoorCollision($(".puerta3")) && direction === 'up') {
                    var currentPositionX = $(".chico").position().left;
                    var currentPositionY = $(".chico").position().top;
                    touchingDoor2 = true;
                    var form = document.createElement('form');
                    form.method = 'POST'
                    form.action = '/empezarJuego/cargarCasa3'
                    var input = document.createElement('input')
                    var input2 = document.createElement('input')
                    var input3 = document.createElement('input')
                    input.type = 'hidden'
                    input.name = 'idEntrenador'
                    input.id = 'idEntrenador'
                    input.value = idEntrenador
                    input2.type = 'hidden'
                    input2.name = 'posicion'
                    input2.id = 'posicion'
                    input2.value = currentPositionX
                    input3.type = 'hidden'
                    input3.name = 'posicionY'
                    input3.id = 'posicionYposicionY'
                    input3.value = currentPositionY
                    form.appendChild(input)
                    form.appendChild(input2)
                    form.appendChild(input3)
                    document.body.appendChild(form);
                    form.submit();

                }
                if (checkDoorCollision($(".puerta4")) && direction === 'up') {
                    var currentPositionX = $(".chico").position().left;
                    var currentPositionY = $(".chico").position().top;
                    touchingDoor2 = true;
                    var form = document.createElement('form');
                    form.method = 'POST'
                    form.action = '/empezarJuego/cargarCasa4'
                    var input = document.createElement('input')
                    var input2 = document.createElement('input')
                    var input3 = document.createElement('input')
                    input.type = 'hidden'
                    input.name = 'idEntrenador'
                    input.id = 'idEntrenador'
                    input.value = idEntrenador
                    input2.type = 'hidden'
                    input2.name = 'posicion'
                    input2.id = 'posicion'
                    input2.value = currentPositionX
                    input3.type = 'hidden'
                    input3.name = 'posicionY'
                    input3.id = 'posicionYposicionY'
                    input3.value = currentPositionY
                    form.appendChild(input)
                    form.appendChild(input2)
                    form.appendChild(input3)
                    document.body.appendChild(form);
                    form.submit();
                }
                
               
            } else {
                teclaPulsada = false;
            }

            await new Promise(resolve => setTimeout(resolve, 50));
        }

        movingDirection = null;
    }
   
    
    function checkElementCollision(element) {
        var characterRect = sprite[0].getBoundingClientRect();
        var elementRect = element[0].getBoundingClientRect();

        var isCollision = (
            characterRect.left < elementRect.right &&
            characterRect.right > elementRect.left &&
            characterRect.top < elementRect.bottom &&
            characterRect.bottom > elementRect.top
        );

        return isCollision;
    }

    function checkDoorCollision(door) {
        return checkElementCollision(door);
    }

    $(document).keydown(function(e) {
        if (menuAbierto) {
            return;
        }
        keysPressed[e.which] = true;

        if (!moving) {
            moving = true;

            if (movingDirection && movingDirection !== directionFromKeyCode(e.which)) {
                teclaPulsada = false;
            }

            switch (e.which) {
                case 37:
                    sprite.animateSprite('play', 'walkLeft', true);
                    moveCharacter('left', e); // Pasar "e" como argumento
                    break;
                case 38:
                    sprite.animateSprite('play', 'walkUp', true);
                    moveCharacter('up', e); // Pasar "e" como argumento
                    break;
                case 39:
                    sprite.animateSprite('play', 'walkRight', true);
                    moveCharacter('right', e); // Pasar "e" como argumento
                    break;
                case 40:
                    sprite.animateSprite('play', 'walkDown', true);
                    moveCharacter('down', e); // Pasar "e" como argumento
                    break;
            }
        }
        if (e.which == 27) { // Tecla ESC
            mostrarMenu();
        }
    });

    $(document).keyup(function(e) {
        delete keysPressed[e.which];

        if (Object.keys(keysPressed).length === 0) {
            moving = false;
            teclaPulsada = false;
            sprite.animateSprite('stop');
        }
    });

    function directionFromKeyCode(keyCode) {
        switch (keyCode) {
            case 37:
                return 'left';
            case 38:
                return 'up';
            case 39:
                return 'right';
            case 40:
                return 'down';
            default:
                return null;
        }
    }
    function mostrarMenu() {
        var menu = $('#menuJuego');
        if (menu.css('left') == '0px') {
            menu.css('left', '-100%');
            menuAbierto = false;
        } else {
            menu.css('left', '0');
            menuAbierto = true;
            $("#reanudar").focus()
        }
    }
    function mostrarInfo() {
        document.getElementById('cartaInfo').style.display = 'block';
        $("#nombreEntrenador").text("Nombre del Entrenador: \n"+  document.getElementById("chico").getAttribute("data-nombre"))
        $("#cartaInfo img").remove();
        let imagenEntrenador = document.createElement('img')
        let genero = document.getElementById("chico").getAttribute("data-genero") == "true" ? "chica" : "chico"
        imagenEntrenador.setAttribute("src", "/img/"+genero+".png")
        imagenEntrenador.setAttribute("class", "imagenEntrenador")
        $("#cartaInfo").append(imagenEntrenador)
    }
    
    function salir(){
        window.location.href = "/inicioRegistro/vueltaMenu?idUsuario="+document.getElementById("chico").getAttribute("data-idUsuario")
    }
    $(document).click(function(event) {
        var menu = $('#menuJuego');
        if (menuAbierto && !$(event.target).closest('#menuJuego').length) {
            menu.css('left', '-100%');
            menuAbierto = false;
        }
    });

    $(document).keydown(function(tecla) {
        if (!menuAbierto) return

        let botonesMenu = $("#menuJuego").find("button")
        let botonFocus = $(":focus")
        let indexBoton = botonesMenu.index(botonFocus)

        switch (tecla.which) {
            case 38:
                if (indexBoton > 0) {
                    botonesMenu.eq(indexBoton - 1).focus()
                }
                break;
            case 40:
                if (indexBoton < botonesMenu.length - 1) {
                    botonesMenu.eq(indexBoton + 1).focus()
                }
                break;
            case 27:
                mostrarMenu()
                cerrarVentana()
                break;
            case 13:
                if (botonFocus.attr("id") == "reanudar") {
                    cerrarVentana()
                    mostrarMenu()
                } else if (botonFocus.attr("id") == "info") {
                    mostrarInfo()
                } else if (botonFocus.attr("id") == "salir") {
                    salir()
                }
            
            default:
                break;
        }
    })

});
function cerrarVentana() {
    document.getElementById('cartaInfo').style.display = 'none';
}
