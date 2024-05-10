document.addEventListener('DOMContentLoaded', function() {
    let URL = "https://pokeapi.co/api/v2/pokemon/";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => mostrarPokemon(data, i))
    }

    function mostrarPokemon(data, id) {

        let pokeId = data.id.toString();
        if (pokeId.length === 1) {
            pokeId = "00" + pokeId;
        } else if (pokeId.length === 2) {
            pokeId = "0" + pokeId;
        }
    
        // Seleccionar el div con la clase "pokemon-imagen" correspondiente al id del Pokémon
        var pokemonImagenDiv = document.getElementById('pokemon-img-' + id);
        var imagenPokemon = document.createElement('img');
        var idFondo = document.createElement('p');
        idFondo.innerHTML = `<p class="pokemon-id-back">#${pokeId}</p>`

        // Establecer la URL de la imagen y el texto alternativo
        imagenPokemon.setAttribute('src', data.sprites.other['official-artwork'].front_default);
        imagenPokemon.setAttribute('alt', data.name);

        // Agregar la imagen al div
        pokemonImagenDiv.appendChild(imagenPokemon);
        pokemonImagenDiv.appendChild(idFondo);
    }
});
