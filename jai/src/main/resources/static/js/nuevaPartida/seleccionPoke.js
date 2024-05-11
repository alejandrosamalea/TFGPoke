document.addEventListener('DOMContentLoaded', function() {
    var URL = "https://pokeapi.co/api/v2/pokemon/";
    var botones = document.getElementsByTagName("button")
    botones[0].focus()
    
    for (var i = 0; i < botones.length; i++) {
        let idBton = botones[i].id
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


})