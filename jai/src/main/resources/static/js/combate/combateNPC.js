
document.addEventListener('DOMContentLoaded', () => {
    var URL = "https://pokeapi.co/api/v2/pokemon/";  
    var imagenPokemon = document.createElement('img');
    var i = 1;
    var idPokeSalvajeButton = document.getElementById("idPokeNPC_1");
    var idPokeEntrenadorButton = document.getElementById("idPokeEntrenador") 
    var botonPokeSalvaje = idPokeSalvajeButton.getAttribute("data-id")
    var botonPokeEntrenador = idPokeEntrenadorButton.getAttribute("data-id")

    // Variables a borrar en futuroz
    let idPokeEntrenador = idPokeEntrenadorButton.getAttribute("data-idPokemonEntrenador")
    let idPokeSalvaje = idPokeSalvajeButton.getAttribute("data-idPokemonNPC")
    let idEntrenador = document.getElementById("idEntrenador").getAttribute("data-idEntrenador")
    let nombrePokeSalvaje =idPokeSalvajeButton.getAttribute("data-nombrePokeNPC")
    let nombrePokeEntrenador =idPokeEntrenadorButton.getAttribute("data-nombrePokeEntrenador")
    let vidaPokeSalvaje = idPokeSalvajeButton.getAttribute("data-vidaPokeNPC")
    let vidaPokeEntrenador = idPokeEntrenadorButton.getAttribute("data-vidaPokeEntrenador")
    let defensaPokeSalvaje = idPokeSalvajeButton.getAttribute("data-defensaNPC")
    let defensaPokeEntrenador = idPokeEntrenadorButton.getAttribute("data-defensaPokeEntrenador")
    let ataquePokeSalvaje = idPokeSalvajeButton.getAttribute("data-ataquePokeNPC")
    let ataquePokeEntrenador = idPokeEntrenadorButton.getAttribute("data-ataquePokeEntrenador")
    let nvlPokeSalvaje = idPokeSalvajeButton.getAttribute("data-nvlPokeNPC")
    let nvlPokeEntrenador = idPokeEntrenadorButton.getAttribute("data-nvlPokeEntrenador")
    let idPokeTipoSalvaje = idPokeSalvajeButton.getAttribute("data-idTipoPokeNPC")
    let posicionX = document.getElementById("posiciones").getAttribute("data-posicionX")
    let posicionY = document.getElementById("posiciones").getAttribute("data-posicionY")
    $("#ataque").focus();
    actualizarVida();
  



    if (idPokeSalvaje) {
        fetch(URL + idPokeSalvaje)
            .then((response) => response.json())
            .then(data => mostrarImagenPokeSalvaje(data, botonPokeSalvaje));
        
        document.getElementById("nombrePokeNPC").innerText = nombrePokeSalvaje 
        document.getElementById("vidaPokeNPC").innerHTML = vidaPokeSalvaje + "/"
        document.getElementById("vidaPokeEntrenador").innerHTML = vidaPokeEntrenador
        document.getElementById("textoAcciones").innerHTML = "Apareció un " + nombrePokeSalvaje + " salvaje."
        $("#huir").data("enlace", true);

    }
    if (botonPokeEntrenador) {
        fetch(URL + botonPokeEntrenador)
            .then((response) => response.json())
            .then(data => mostrarImagenPokeEntrenador(data, botonPokeEntrenador));
    }

    function addNavigationHandlers(buttonSelector) {
        $(buttonSelector).keydown(function(e) {
            var $this = $(this);
            var $buttons = $(buttonSelector);

            function moverFocus($next) {
                $this.blur();
                $next.focus();
            }

            function siguienteBoton(direction) {
                var index = $buttons.index($this);
                var nextIndex;

                switch (direction) {
                    case 'up':
                        nextIndex = Math.max(index - 2, 0);
                        break;
                    case 'down':
                        nextIndex = Math.min(index + 2, $buttons.length - 1);
                        break;
                    case 'left':
                        nextIndex = Math.max(index - 1, 0);
                        break;
                    case 'right':
                        nextIndex = Math.min(index + 1, $buttons.length - 1);
                        break;
                }

                return $buttons.eq(nextIndex);
            }

            switch (e.which) {
                case 40:
                    moverFocus(siguienteBoton('down'));
                    break;
                case 38:
                    moverFocus(siguienteBoton('up'));
                    break;
                case 37:
                    moverFocus(siguienteBoton('left'));
                    break;
                case 39:
                    moverFocus(siguienteBoton('right'));
                    break;
                case 13: // Tecla "Enter"
                switch ($this.attr('id')) {
                    case "huir":
                        document.getElementById("textoAcciones").innerHTML = "Escapaste sin problemas"
                        setTimeout(function () {
                            window.location.href = "/combate/cargarMapa?idEntrenador=" + idEntrenador + "&posicion=" + posicionX + "&posicionY=" + posicionY + "&vidaPokemon=" + parseInt(idPokeEntrenadorButton.getAttribute("data-vidaPokeEntrenador")) + "&idPokemon=" + idPokeEntrenador
                        },2000)
                        break
                    case "ataque":
                        $("#acciones").hide();
                        $("#ataques").show();
                        $("#ataque1").focus();
                        document.getElementById("textoAcciones").innerHTML = "Que ataque quieres realizar?"
                        break
                    case "captura":
                        intentoCaptura(nvlPokeSalvaje,1)
                        break
                    case "pokemones":
                        window.location.href = "/combate/verPokemones?idEntrenador=" 
                                            + idEntrenador + "&&vidaActualEntrenador=" 
                                            + idPokeEntrenadorButton.getAttribute("data-vidaPokeEntrenador") 
                                            + "&&idPokeEntrenador=" + idPokeEntrenador + "&&posicionX=" + posicionX 
                                            + "&&posicionY=" + posicionY + "&&idPokeSalvaje=" + idPokeSalvaje
                                            + "&&vidaActualPokeSalvaje=" 
                                            + idPokeSalvajeButton.getAttribute("data-vidaPokeSalvaje")
                    case "ataque1":
                    case "ataque2":
                    case "ataque3":
                        var nombreAtaque = $this.text();
                        fetch("/combateRest/atacar", {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ nombreAtaque: nombreAtaque })
                        }).then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        }).then(ataque => {
                            realizarAtaqueEntrenador(
                                ataque,
                                idPokeTipoSalvaje,
                                defensaPokeSalvaje,
                                ataquePokeSalvaje,
                                nvlPokeSalvaje,
                                idPokeEntrenador,
                                ataquePokeEntrenador,
                                defensaPokeEntrenador, 
                            )
                        }).catch(error => {
                            document.getElementById("textoAcciones").innerHTML = nombrePokeEntrenador + " Falló el ataque!"
                            realizarAtaquePokeSalvaje(idPokeTipoSalvaje, ataquePokeSalvaje, nvlPokeSalvaje, defensaPokeEntrenador)
                            console.error('Error al ejecutar el ataque:', error);
                        });
                        break
                    case "ataque4":
                        $("#acciones").show();
                        $("#ataques").hide();
                        $("#ataque").focus(); // Devolver el foco al botón de ataque principal
                        document.getElementById("textoAcciones").innerHTML = "Que acción hacer ahora?"
                        break
                }                    
            }
        });
    }

    addNavigationHandlers('.acciones button');
    addNavigationHandlers('.ataques button');



function realizarAtaqueEntrenador (ataque, idTipoPokeSalvaje, defensaPokeSalvaje, ataquePokeSalvaje , nvlPokeSalvaje, idPokeEntrenador ,ataquePokeEntrenador, defensaPokeEntrenador) {
    let vidaActualPokeSalvaje = parseInt(document.getElementById("vidaPokeNPC").textContent)
    let vidaActualPokeEntrenador = parseInt(document.getElementById("vidaPokeEntrenador").textContent)
    if (vidaActualPokeSalvaje > 0 && vidaActualPokeEntrenador > 0) {
        let defensaTotal = nvlPokeSalvaje * defensaPokeSalvaje
        let ataqueTotal = ataquePokeEntrenador
        let danio = ataque.danio *  (defensaTotal > ataqueTotal ? 2 : 5)
        vidaActualPokeSalvaje -= danio 
        document.getElementById("textoAcciones").innerHTML = nombrePokeEntrenador + " atacó con " + ataque.nombre + " e hizo " + danio + " de daño"
        actualizarVida();
        setTimeout(function() {
            if (vidaActualPokeSalvaje <= 0) {
                document.getElementById("vidaPokeNPC").innerHTML = 0
                idPokeEntrenadorButton.setAttribute("data-vidaPokeEntrenador", vidaActualPokeEntrenador)
                document.getElementById("textoAcciones").innerHTML = nombrePokeSalvaje + " debilitado!"
                setTimeout(function() {
                    try
                    {
                        i++;
                        var idPokeSalvajeButton = document.getElementById("idPokeNPC_" + i);
                        var botonPokeSalvaje = idPokeSalvajeButton.getAttribute("data-id")
                        var botonPokeEntrenador = idPokeEntrenadorButton.getAttribute("data-id")
                        // Variables a borrar en futuroz
                        let idPokeEntrenador = idPokeEntrenadorButton.getAttribute("data-idPokemonEntrenador")
                        let idPokeSalvaje = idPokeSalvajeButton.getAttribute("data-idPokemonNPC")
                        let idEntrenador = document.getElementById("idEntrenador").getAttribute("data-idEntrenador")
                        let nombrePokeSalvaje =idPokeSalvajeButton.getAttribute("data-nombrePokeNPC")
                        let nombrePokeEntrenador =idPokeEntrenadorButton.getAttribute("data-nombrePokeEntrenador")
                        let vidaPokeSalvaje = idPokeSalvajeButton.getAttribute("data-vidaPokeNPC")
                        let vidaPokeEntrenador = idPokeEntrenadorButton.getAttribute("data-vidaPokeEntrenador")
                        let defensaPokeSalvaje = idPokeSalvajeButton.getAttribute("data-defensaNPC")
                        let defensaPokeEntrenador = idPokeEntrenadorButton.getAttribute("data-defensaPokeEntrenador")
                        let ataquePokeSalvaje = idPokeSalvajeButton.getAttribute("data-ataquePokeNPC")
                        let ataquePokeEntrenador = idPokeEntrenadorButton.getAttribute("data-ataquePokeEntrenador")
                        let nvlPokeSalvaje = idPokeSalvajeButton.getAttribute("data-nvlPokeNPC")
                        let nvlPokeEntrenador = idPokeEntrenadorButton.getAttribute("data-nvlPokeEntrenador")
                        let idPokeTipoSalvaje = idPokeSalvajeButton.getAttribute("data-idTipoPokeNPC")
                        let posicionX = document.getElementById("posiciones").getAttribute("data-posicionX")
                        let posicionY = document.getElementById("posiciones").getAttribute("data-posicionY")
                        
                        fetch(URL + idPokeSalvaje)
                        .then((response) => response.json())
                        .then(data => mostrarImagenPokeSalvaje(data, botonPokeSalvaje));
                        document.getElementById("nombrePokeNPC").innerText = nombrePokeSalvaje
                        document.getElementById("vidaPokeNPC").innerHTML = vidaPokeSalvaje 
                        document.getElementById("vidaPokeEntrenador").innerHTML = vidaPokeEntrenador
                        document.getElementById("textoAcciones").innerHTML = "Apareció un " + nombrePokeSalvaje + " salvaje."
                    }
                    catch
                    {
                        window.location.href = "/combate/saliCombateNPC?idEntrenador=" + idEntrenador + "&posicion=" + posicionX + "&posicionY=" + posicionY + "&vidaPokemon=" + parseInt(idPokeEntrenadorButton.getAttribute("data-vidaPokeEntrenador")) + "&idPokemon=" + idPokeEntrenador

                    }
                 
                $("#huir").data("enlace", true);
                }, 2000)
            } else {
                document.getElementById("vidaPokeNPC").innerHTML = vidaActualPokeSalvaje
                realizarAtaquePokeSalvaje(
                    idTipoPokeSalvaje,
                    ataquePokeSalvaje,
                    nvlPokeSalvaje,
                    defensaPokeEntrenador,
                )
            }
        }, 2000)         
    }     
}
function realizarAtaquePokeSalvaje(idTipoPokeSalvaje, ataquePokeSalvaje, nvlPokeSalvaje, defensaPokeEntrenador) { 
    fetch("/combateRest/ataqueAleatorio?idTipoPokeSalvaje="+idTipoPokeSalvaje)
        .then(response => response.json())
        .then(ataque => {
            let vidaActualPokeEntrenador = parseInt(document.getElementById("vidaPokeEntrenador").textContent)
            let vidaActualPokeSalvaje = parseInt(document.getElementById("vidaPokeNPC").textContent)
            if (vidaActualPokeEntrenador > 0 && vidaActualPokeSalvaje > 0) {
                let defensaTotal = defensaPokeEntrenador
                let ataqueTotal = nvlPokeSalvaje * ataquePokeSalvaje
                let danio = ataque.danio *  (defensaTotal > ataqueTotal ? 2 : 5)
                vidaActualPokeEntrenador -= danio
                document.getElementById("textoAcciones").innerHTML = nombrePokeSalvaje + " realizo " + ataque.nombre + " e hizo " + danio + " de daño"
                setTimeout(function () {
                    if (vidaActualPokeEntrenador <= 0) {
                        document.getElementById("vidaPokeEntrenador").innerHTML = 0
                        document.getElementById("ataque").disabled = true
                        
                        idPokeEntrenadorButton.setAttribute("data-vidaPokeEntrenador", 0)
                    } else {
                        document.getElementById("vidaPokeEntrenador").innerHTML = vidaActualPokeEntrenador
                    idPokeEntrenadorButton.setAttribute("data-vidaPokeEntrenador", vidaActualPokeEntrenador)
                    }
                    $("#acciones").show();
                    $("#ataques").hide();
                    $("#captura").focus();
                    actualizarVida();
                }, 2000)
            }            
        })
        .catch(error => {
            document.getElementById("textoAcciones").innerHTML = nombrePokeSalvaje + " falló el ataque"
            }
        )
}


function actualizarVida() {
    var idPokeSalvajeButton = document.getElementById("idPokeNPC_" + i);
    let vidaActualPokeEntrenador = parseInt(document.getElementById("vidaPokeEntrenador").textContent)
    let vidaActualPokeSalvaje = parseInt(document.getElementById("vidaPokeNPC").textContent)
    let vidaPokeSalvaje = idPokeSalvajeButton.getAttribute("data-vidaPokeNPC")
    let vidaPokeEntrenador = idPokeEntrenadorButton.getAttribute("data-vida2PokeEntrenador")
    // Obtén los elementos de la vida del Pokémon NPC y del entrenador
    const vidaPokeNPC = parseInt(document.getElementById("vidaPokeNPC").textContent);
    const vidaRestanteNPC = document.getElementById("vidaRestanteNPC");

    const vidaRestanteEntrenador = document.getElementById("vidaRestanteEntrenador");


    // Calcula el ancho en porcentaje
    const porcentajeVidaNPC = (vidaActualPokeSalvaje / vidaPokeSalvaje) * 100;

    const porcentajeVidaEntrenador = (vidaActualPokeEntrenador / vidaPokeEntrenador) * 100;

    // Establece el ancho de la barra de vida
    vidaRestanteNPC.style.width = porcentajeVidaNPC + "%";
    vidaRestanteEntrenador.style.width = porcentajeVidaEntrenador + "%";
}


function mostrarImagenPokeSalvaje(data, id) {
    var div = document.getElementById("imgPokeNPC");
    imagenPokemon.setAttribute('src', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/"+ id + ".gif");
    
    imagenPokemon.setAttribute('alt', data.name);
    imagenPokemon.setAttribute('class', 'pokemonSalvaje');
    imagenPokemon.setAttribute('id', 'idPokemonSalvaje'); // Ajusta el tamaño según lo que necesites
    

    div.appendChild(imagenPokemon);
}

function mostrarImagenPokeEntrenador(data, id) {
    var div = document.getElementById("imgPokeEntrenador");

    var imagenPokemon = document.createElement('img');
    imagenPokemon.setAttribute('src', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/"+id+".gif");
    imagenPokemon.setAttribute('alt', data.name);
    imagenPokemon.setAttribute('class', 'pokemonEntrenador');
    div.appendChild(imagenPokemon);
}

});