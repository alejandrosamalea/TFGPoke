document.addEventListener('DOMContentLoaded', function() {
    var URL = "https://pokeapi.co/api/v2/pokemon/";    
    var botonesPokemones = document.querySelectorAll('.general button.botonesPoke:not(#volver)');
    botonesPokemones[0].focus()
    let idPokeEntrenador = document.getElementById("infoCombate").getAttribute("data-idPokeCombate")
    let idPokeSalvaje = document.getElementById("infoCombate").getAttribute("data-idPokeSalvaje")
    let vidaActualPokeSalvaje = document.getElementById("infoCombate").getAttribute("data-vidaActualPokeSalvaje")
    let posicionX = document.getElementById("infoCombate").getAttribute("data-posicionX")
    let posicionY = document.getElementById("infoCombate").getAttribute("data-posicionY")
    let idEntrenador = document.getElementById("infoCombate").getAttribute("data-idEntrenador")
    botonesPokemones.forEach(function(button) {
        fetch(URL + button.id)
            .then(response => response.json())
            .then(data => mostrarImagenPokeEntrenador(data, button.id));
    });

    function addNavigationHandlers(buttonSelector) {
        document.querySelectorAll(buttonSelector).forEach(button => {
            button.addEventListener('keydown', function(e) {
                var buttons = document.querySelectorAll(buttonSelector);
                var index = Array.prototype.indexOf.call(buttons, this);

                function moverFocus(nextButton) {
                    this.blur();
                    nextButton.focus();
                }

                function siguienteBoton(direction) {
                    var nextIndex;
                    switch (direction) {
                        case 'up':
                            nextIndex = Math.max(index - 1, 0);
                            break;
                        case 'down':
                            nextIndex = Math.min(index + 1, buttons.length - 1);
                            break;
                    }
                    return buttons[nextIndex];
                }

                switch (e.key) {
                    case 'ArrowDown':
                        moverFocus.call(this, siguienteBoton('down'));
                        break;
                    case 'ArrowUp':
                        moverFocus.call(this, siguienteBoton('up'));
                        break;
                    case 'Enter': // Tecla "Enter"
                        switch (this.id) {
                            case "volver":
                                volverCombate(idPokeEntrenador,idPokeSalvaje,vidaActualPokeSalvaje,posicionX,posicionY,idEntrenador)
                            default:
                                abrirMenu(this.getAttribute("data-idPoke"), this);
                                break;
                        }
                        break;
                }
            });
        });
    }

    addNavigationHandlers('.general button');

    function mostrarImagenPokeEntrenador(data, id) {
        var div = document.getElementById("pokeImagen" + id);
    
        var imagenPokemon = document.createElement('img');
        imagenPokemon.setAttribute('src', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/" + id + ".png");
        imagenPokemon.setAttribute('alt', data.name);
        imagenPokemon.setAttribute('class', 'pokemonEntrenador');
        div.appendChild(imagenPokemon);
    }

    function abrirMenu(idPoke, button) {
        // Crear el menú
        var accionesDiv = button.querySelector('#acciones');
        var menu = document.createElement("div")
        var seleccionar = document.createElement("button")
        var cerrar = document.createElement("button");
        var buttonRect = button.getBoundingClientRect();
        
        menu.className = "menu"
        seleccionar.textContent = "Seleccionar";
        seleccionar.id = "seleccionar"
        cerrar.textContent = "Cerrar"
        cerrar.id = "cerrar"

        menu.appendChild(seleccionar);
        menu.appendChild(cerrar);

        accionesDiv.appendChild(menu);


        // Ajustar la posición del menú
        menu.style.position = 'absolute';
        menu.style.top = buttonRect.top + 'px';
        menu.style.left = (buttonRect.left + button.offsetWidth) + 'px';

        document.body.appendChild(menu);
        seleccionar.focus();
        addMenuNavigationHandlers(menu, idPoke);
    }

    function addMenuNavigationHandlers(menu, idPoke) {
        var menuButtons = menu.querySelectorAll('button');
        
        menuButtons.forEach((menuButton, index) => {
            menuButton.addEventListener('keydown', function(e) {
                function moverFocus(nextButton) {
                    this.blur();
                    nextButton.focus();
                }

                switch (e.key) {
                    case 'ArrowDown':
                        if (index < menuButtons.length - 1) {
                            moverFocus.call(this, menuButtons[index + 1]);
                        }
                        break;
                    case 'ArrowUp':
                        if (index > 0) {
                            moverFocus.call(this, menuButtons[index - 1]);
                        }
                        break;
                    case 'Enter': // Tecla "Enter"
                        if (this.id == "seleccionar") {
                            volverCombate(idPoke,idPokeSalvaje,vidaActualPokeSalvaje,posicionX,posicionY,idEntrenador)
                        } else {
                            menu.remove();
                            // button.focus();
                        }
                        break;
                }
            });
        });
    }
    function volverCombate(idPokeEntrenador,idPokeSalvaje,vidaActualPokeSalvaje,posicionX,posicionY,idEntrenador) {
        var form = document.createElement('form')
                form.method = 'POST'
                form.action = '/combate/volverCombate' 
    
                // Agregar el enlace como un campo oculto en el formulario
                var idPokeEntrenadorButton = document.createElement('input')
                var idPokeSalvajeButton = document.createElement('input')
                var vidaActualPokeSalvajeButton = document.createElement('input')
                var posicionXButton = document.createElement('input')
                var posicionYButton = document.createElement('input')
                var idEntrenadorButton = document.createElement('input')
                
                idPokeEntrenadorButton.type = 'hidden'
                idPokeEntrenadorButton.name = 'idPokeEntrenador'
                idPokeEntrenadorButton.id = 'idPokeEntrenador'
                idPokeEntrenadorButton.value = idPokeEntrenador

                idPokeSalvajeButton.type = 'hidden'
                idPokeSalvajeButton.name = 'idPokeSalvaje'
                idPokeSalvajeButton.id = 'idPokeSalvaje'
                idPokeSalvajeButton.value = idPokeSalvaje
                
                vidaActualPokeSalvajeButton.type = 'hidden'
                vidaActualPokeSalvajeButton.name = 'vidaActualPokeSalvaje'
                vidaActualPokeSalvajeButton.id = 'vidaActualPokeSalvaje'
                vidaActualPokeSalvajeButton.value = vidaActualPokeSalvaje

                posicionXButton.type = 'hidden'
                posicionXButton.name = 'posicionX'
                posicionXButton.id = 'posicionX'
                posicionXButton.value = posicionX

                posicionYButton.type = 'hidden'
                posicionYButton.name = 'posicionY'
                posicionYButton.id = 'posicionY'
                posicionYButton.value = posicionY

                idEntrenadorButton.type = 'hidden'
                idEntrenadorButton.name = 'idEntrenador'
                idEntrenadorButton.id = 'idEntrenador'
                idEntrenadorButton.value = idEntrenador
                
                form.appendChild(idPokeEntrenadorButton)
                form.appendChild(idPokeSalvajeButton)
                form.appendChild(vidaActualPokeSalvajeButton)
                form.appendChild(posicionXButton)
                form.appendChild(posicionYButton)
                form.appendChild(idEntrenadorButton)

                // Agregar el formulario al DOM y enviarlo
                // Importante!
                // Este acto ha sido maquinado por Ivan y Javier coaccionado ha tenido que hacerlo.
                document.body.appendChild(form)
                form.submit()
    }
});
