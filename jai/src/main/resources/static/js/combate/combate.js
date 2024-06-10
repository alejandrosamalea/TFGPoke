
document.addEventListener('DOMContentLoaded', () => {
    var URL = "https://pokeapi.co/api/v2/pokemon/";    
    var idPokeSalvajeButton = document.getElementById("idPokeSalvaje");
    var idPokeEntrenadorButton = document.getElementById("idPokeEntrenador") 
    var botonPokeSalvaje = idPokeSalvajeButton.getAttribute("data-id")
    var botonPokeEntrenador = idPokeEntrenadorButton.getAttribute("data-id")

    // Variables a borrar en futuro
    let idPokeEntrenador = idPokeEntrenadorButton.getAttribute("data-idPokemonEntrenador")
    let idPokeSalvaje = idPokeSalvajeButton.getAttribute("data-idPokeSalvaje")
    let idEntrenador = document.getElementById("idEntrenador").getAttribute("data-idEntrenador")
    let nombrePokeSalvaje =idPokeSalvajeButton.getAttribute("data-nombrePokeSalvaje")
    let nombrePokeEntrenador =idPokeEntrenadorButton.getAttribute("data-nombrePokeEntrenador")
    let vidaPokeSalvaje = idPokeSalvajeButton.getAttribute("data-vidaPokeSalvaje")
    let vidaPokeEntrenador = idPokeEntrenadorButton.getAttribute("data-vidaPokeEntrenador")
    let defensaPokeSalvaje = idPokeSalvajeButton.getAttribute("data-defensaPokeSalvaje")
    let defensaPokeEntrenador = idPokeEntrenadorButton.getAttribute("data-defensaPokeEntrenador")
    let ataquePokeSalvaje = idPokeSalvajeButton.getAttribute("data-ataquePokeSalvaje")
    let ataquePokeEntrenador = idPokeEntrenadorButton.getAttribute("data-ataquePokeEntrenador")
    let nvlPokeSalvaje = (Math.floor(Math.random() * 5) + 1)
    let nvlPokeEntrenador = idPokeEntrenadorButton.getAttribute("data-nvlPokeEntrenador")
    let idPokeTipoSalvaje = idPokeSalvajeButton.getAttribute("data-idTipoPokeSalvaje")
    let posicionX = document.getElementById("posiciones").getAttribute("data-posicionX")
    let posicionY = document.getElementById("posiciones").getAttribute("data-posicionY")
    $("#ataque").focus();
    
  



    if (idPokeSalvaje) {
 
        fetch(URL + idPokeSalvaje)
            .then((response) => response.json())
            .then(data => mostrarImagenPokeSalvaje(data, idPokeSalvaje));
        
        if (nvlPokeSalvaje < 3) {
            nvlPokeSalvaje = 3
        }
        document.getElementById("nvlPokeSalvaje").innerText += " "+nvlPokeSalvaje
        document.getElementById("vidaPokeSalvaje").innerHTML = vidaPokeSalvaje * parseInt(nvlPokeSalvaje)
        document.getElementById("vidaPokeEntrenador").innerHTML = vidaPokeEntrenador
        document.getElementById("textoAcciones").innerHTML = "Apareció un " + nombrePokeSalvaje + " salvaje."
        $("#huir").data("enlace", true);

    }
    if (botonPokeEntrenador) {
        fetch(URL + botonPokeEntrenador)
            .then((response) => response.json())
            .then(data => mostrarImagenPokeEntrenador(data, botonPokeEntrenador));
    }
    actualizarVida();

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


function intentoCaptura(nvlPokeSalvaje, numero) {
    let containerPokeball = document.getElementById("container-ball");
    let pokeball = document.getElementById("ball");
    let pokeSalvaje = document.getElementById("idPokemonSalvaje");

    // Quitar la animación
    pokeball.style.animation = "none";
    containerPokeball.style.animation = "none";
    pokeSalvaje.style.animation = "none";

    // Forzar un reflow (recalcular estilos)
    void pokeball.offsetWidth;
    void containerPokeball.offsetWidth;
    void pokeSalvaje.offsetWidth;

    // Volver a asignar la animación
    pokeball.style.animation = "rotar 10s";
    containerPokeball.style.animation = "captura 10s";
    pokeSalvaje.style.animation = "encoger 10s";
    
    

    let vidaTotal = document.getElementById("idPokeSalvaje").getAttribute("data-vidaPokeSalvaje") * nvlPokeSalvaje
    let vidaActualPokeSalvaje = parseInt(document.getElementById("vidaPokeSalvaje").textContent)
    let porcentajeVida = ( vidaActualPokeSalvaje / vidaTotal ) * 100
    pokeball.style.backgroundImage = '';
    
    if (determinarCaptura(porcentajeVida, numero, pokeball)) {
        let datos = {
            idEntrenador: idEntrenador,
            idEspecie: idPokeSalvaje,
            lvPokeSalvaje: nvlPokeSalvaje,
        }
        enviarSolicitud(datos);
    } else {
        setTimeout(function() {
            document.getElementById("textoAcciones").innerHTML = "Casi! El " + nombrePokeSalvaje + " escapó"
            realizarAtaquePokeSalvaje(idPokeTipoSalvaje, ataquePokeSalvaje, nvlPokeSalvaje, defensaPokeEntrenador)
        }, 10100)
        
    }
}
function determinarCaptura(porcentajeVida, numero, pokeball) {
    switch (true) {
        case (porcentajeVida >= 75):
            pokeball.style.backgroundImage = 'url("/img/balls/pokeball.png")';
            console.log("Intento captura +75%");
            if (numero == numero) {
                return true;
            } else {
                return false
            }
        case (porcentajeVida > 50 && porcentajeVida <= 75):
            pokeball.style.backgroundImage = 'url("/img/balls/superball.png")';
            console.log("Intento captura entre 50 y 75");
            if ((Math.floor(Math.random() * 7) + 1) == numero) {
                return true;
            } else {
                return false;
            }
        case (porcentajeVida > 25 && porcentajeVida <= 50):
            pokeball.style.backgroundImage = 'url("/img/balls/ultraball.png")';
            console.log("Intento captura entre 25 y 50");
            if ((Math.floor(Math.random() * 4) + 1) == numero) {
                return true;
            } else {
                return false;
            }
        case (porcentajeVida > 0 && porcentajeVida <= 25):
            pokeball.style.backgroundImage = 'url("/img/balls/cremaball.png")';
            console.log("Intento captura entre 1 y 25");
            if ((Math.floor(Math.random() * 2) + 1) == numero) {
                return true;
            } else {
                return false;
            }
        default:
            return false;
    }
}
function enviarSolicitud(datos) {
    fetch('/combateRest/capturarPokemon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => {
        if (response.ok) {
            
            setTimeout(function() {
                document.getElementById("textoAcciones").innerHTML = "Has capturado un nuevo " + nombrePokeSalvaje + "!"
                window.location.href = "/combate/cargarMapa?idEntrenador=" + document.getElementById("idEntrenador").getAttribute("data-idEntrenador") 
                                                            + "&posicion=" + document.getElementById("posiciones").getAttribute("data-posicionX") 
                                                            + "&posicionY=" + document.getElementById("posiciones").getAttribute("data-posicionY") 
                                                            + "&vidaPokemon=" + document.getElementById("idPokeEntrenador").getAttribute("data-vidaPokeEntrenador")
                                                            + "&idPokemon=" + idPokeEntrenador
            }, 10000)
        } else {
            document.getElementById("textoAcciones").innerHTML = "Estuvo muy muy cerca pero" + nombrePokeSalvaje + " escapó"
        }
    })
    .catch(error => {
        console.error('Error de red:', error);
    });
}
function realizarAtaqueEntrenador (ataque, idTipoPokeSalvaje, defensaPokeSalvaje, ataquePokeSalvaje , nvlPokeSalvaje, idPokeEntrenador ,ataquePokeEntrenador, defensaPokeEntrenador) {
    let vidaActualPokeSalvaje = parseInt(document.getElementById("vidaPokeSalvaje").textContent)
    let vidaActualPokeEntrenador = parseInt(document.getElementById("vidaPokeEntrenador").textContent)
    if (vidaActualPokeSalvaje > 0 && vidaActualPokeEntrenador > 0) {
        let defensaTotal = nvlPokeSalvaje * defensaPokeSalvaje
        let ataqueTotal = ataquePokeEntrenador
        let danio = ataque.danio *  (defensaTotal > ataqueTotal ? 2 : 5)
        vidaActualPokeSalvaje -= danio
        document.getElementById("textoAcciones").innerHTML = nombrePokeEntrenador + " atacó con " + ataque.nombre + " e hizo " + danio + " de daño"
        setTimeout(function() {
            if (vidaActualPokeSalvaje <= 0) {
                document.getElementById("vidaPokeSalvaje").innerHTML = 0
                idPokeEntrenadorButton.setAttribute("data-vidaPokeEntrenador", vidaActualPokeEntrenador)
                actualizarVida();
                document.getElementById("textoAcciones").innerHTML = nombrePokeSalvaje + " debilitado!"
                setTimeout(function() {
                    window.location.href = "/combate/cargarMapa?idEntrenador=" + document.getElementById("idEntrenador").getAttribute("data-idEntrenador") 
                                                                + "&posicion=" + document.getElementById("posiciones").getAttribute("data-posicionX") 
                                                                + "&posicionY=" + document.getElementById("posiciones").getAttribute("data-posicionY") 
                                                                + "&vidaPokemon=" + document.getElementById("idPokeEntrenador").getAttribute("data-vidaPokeEntrenador")
                                                                + "&idPokemon=" + idPokeEntrenador
                }, 2000)
            } else {
                document.getElementById("vidaPokeSalvaje").innerHTML = vidaActualPokeSalvaje
                actualizarVida();
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
            let vidaActualPokeSalvaje = parseInt(document.getElementById("vidaPokeSalvaje").textContent)
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
                        actualizarVida();
                    idPokeEntrenadorButton.setAttribute("data-vidaPokeEntrenador", vidaActualPokeEntrenador)
                    }
                    $("#acciones").show();
                    $("#ataques").hide();
                    $("#captura").focus();
                }, 2000)
            }            
        })
        .catch(error => {
            document.getElementById("textoAcciones").innerHTML = nombrePokeSalvaje + " falló el ataque"
            }
        )
}
function mostrarImagenPokeSalvaje(data, id) {
    var div = document.getElementById("imgPokeSalvaje");

    var imagenPokemon = document.createElement('img');
    imagenPokemon.setAttribute('src', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/"+ id + ".gif");
    imagenPokemon.setAttribute('alt', data.name);
    imagenPokemon.setAttribute('class', 'pokemonSalvaje');
    imagenPokemon.setAttribute('id', 'idPokemonSalvaje'); // Ajusta el tamaño según lo que necesites
    

    div.appendChild(imagenPokemon);
}

function mostrarImagenPokeEntrenador(data, id) {
    var div = document.getElementById("imgPokeEntrenador");

    var imagenPokemon = document.createElement('img');
    imagenPokemon.setAttribute('src', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/"+ id+".gif");
    imagenPokemon.setAttribute('alt', data.name);
    imagenPokemon.setAttribute('class', 'pokemonEntrenador');
    div.appendChild(imagenPokemon);
}

function actualizarVida() {
 
    let vidaActualPokeSalvaje = parseInt(document.getElementById("vidaPokeSalvaje").textContent)
    let vidaPokeSalvaje = idPokeSalvajeButton.getAttribute("data-vidaPokeSalvaje")
    let vidaActualPokeEntrenador = parseInt(document.getElementById("vidaPokeEntrenador").textContent)
    let vidaPokeEntrenador = idPokeEntrenadorButton.getAttribute("data-vidaPokeEntrenador")
    const vidaRestanteNPC = document.getElementById("vidaRestanteNPC");



    // Calcula el ancho en porcentaje
    const porcentajeVidaNPC = (vidaActualPokeSalvaje / (vidaPokeSalvaje * nvlPokeSalvaje)) * 100;

    const porcentajeVidaEntrenador = (vidaActualPokeEntrenador / vidaPokeEntrenador) * 100;


    // Establece el ancho de la barra de vida
    vidaRestanteNPC.style.width = porcentajeVidaNPC + "%";
    vidaRestanteEntrenador.style.width = porcentajeVidaEntrenador + "%";
}


});