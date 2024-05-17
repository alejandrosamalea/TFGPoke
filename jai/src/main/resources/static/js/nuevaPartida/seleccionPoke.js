document.addEventListener('DOMContentLoaded', function() {
    var URL = "https://pokeapi.co/api/v2/pokemon/";
    var botones = document.getElementsByTagName("button")
    botones[0].focus()
    
    for (var i = 0; i < botones.length; i++) {
        let idBton = botones[i].id
        $(botones[i]).data('idPoke', idBton)
        fetch(URL + idBton)
            .then((response) => response.json())
            .then(data => mostrarImagen(data, idBton))
    }
    function mostrarImagen(data, id) {
        console.log(id)
        console.log(data)
        var btn = document.getElementById(id)
        console.log(btn.value)

        // Seleccionar el div con la clase "pokemon-imagen" correspondiente al id del Pokémon
        var imagenPokemon = document.createElement('img');

        // Establecer la URL de la imagen y el texto alternativo
        imagenPokemon.setAttribute('src', data.sprites.other['official-artwork'].front_default);

        // Agregar la imagen al div
        btn.appendChild(imagenPokemon);
    }
    
    document.addEventListener('keydown', function(event) {
        var seleccion = document.activeElement;
        if (event.key == 'ArrowLeft') {
            // Moverse a la tecla izquierda
            var anterior = seleccion.previousElementSibling;
            if (anterior) {
                anterior.focus();
            }
        } else if (event.key == 'ArrowRight') {
            // Moverse a la tecla derecha
            var siguiente = seleccion.nextElementSibling;
            if (siguiente) {
                siguiente.focus();
            }
        }
    })
    $(botones).keyup(function (event) { 
        if (event.which == 13) {
            var idPoke = $(this).data('idPoke');
            
            if (idPoke) { // Si el botón tiene un enlace definido
                // Crear un formulario dinámicamente
                alert(idPoke)
                var form = document.createElement('form');
                form.method = 'POST';
                form.action = '/equipoEntrenador/crearEquipo'; // Ruta del controlador
    
                // Agregar el enlace como un campo oculto en el formulario
                var input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'idPoke';
                input.id = 'idPoke';
                input.value = idPoke;
                form.appendChild(input);
    
                // Agregar el formulario al DOM y enviarlo
                document.body.appendChild(form);
                form.submit();
            }
        }
     });


})