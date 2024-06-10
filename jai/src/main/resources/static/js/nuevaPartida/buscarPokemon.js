$(document).ready(function() {
    var numeroMagico = 15;
    var hierbaVisitada = null;

    function colision() { 
        var chico = $(".chico");
        var chicoPosicion = chico.offset();
        var chicoAncho = chico.width();
        var chicoAlto = chico.height();
        var hierbaActual = null;

        $(".hierba").each(function () { 
            var hierba = $(this);
            var hierbaPosicion = hierba.offset();
            var hierbaAncho = hierba.width();
            var hierbaAlto = hierba.height();
            
            if (chicoPosicion.left < hierbaPosicion.left + hierbaAncho && chicoPosicion.left + chicoAncho
                > hierbaPosicion.left && chicoPosicion.top < hierbaPosicion.top + hierbaAlto && chicoPosicion.top +
                chicoAlto > hierbaPosicion.top) {
                    hierbaActual = hierba.attr('id')
                    if (hierbaActual != hierbaVisitada) {
                        console.log(hierbaActual)
                        hierbaVisitada = hierbaActual;
                        var idEntrenador = document.getElementById("chico").getAttribute("data-idEntrenador")
                        if (Math.floor(Math.random() * 15) + 1 == numeroMagico) {    
                            var currentPositionX = $(".chico").position().left;
                            var currentPositionY = $(".chico").position().top;                        
                            var form = document.createElement('form');
                            form.method = 'POST';
                            form.action = '/combate/combatePokeRandom';
                            var input = document.createElement('input');
                            var input2 = document.createElement('input');
                            var input3 = document.createElement('input');
                            input.type = 'hidden';
                            input.name = 'idEntrenador';
                            input.id = 'idEntrenador';
                            input.value = idEntrenador;
                            input2.type = 'hidden';
                            input2.name = 'posicion';
                            input2.id = 'posicion';
                            input2.value = currentPositionX;
                            input3.type = 'hidden';
                            input3.name = 'posicionY';
                            input3.id = 'posicionY';
                            input3.value = currentPositionY;
                            form.appendChild(input);
                            form.appendChild(input2);
                            form.appendChild(input3);

                            document.body.appendChild(form);
                            form.submit();
                        }
                        console.log(hierbaVisitada);
                    } 
                }
        });
    }

    $(document).keydown(function(e) {
        // Aquí inserta el código para mover al personaje
        colision(); // Llama a la función de colisión cada vez que el personaje se mueva
    });
    
});
