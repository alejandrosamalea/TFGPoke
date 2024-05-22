document.addEventListener('DOMContentLoaded', function() {
    let URL = "https://pokeapi.co/api/v2/pokemon/";
    pokemonesBD();
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

    function pokemonesBD()
    {
        var elementosTest = document.querySelectorAll('p[id="idPokemon"]');

        // Encuentra el último elemento <p> con el ID "test"
        var ultimoTest = elementosTest[elementosTest.length - 1];
        for (let j = 152; j <= ultimoTest.getAttribute("data-name"); j++) {
            var elemento = document.querySelector('p[data-name="' + j + '"]');
        fetch(URL + j)
            .then((response) => response.json())
            .then(mostrarPokemon2(j,elemento.innerHTML))
    }
    }
   

    function mostrarPokemon2(id,nombreImagen) {

        let pokeId = id;
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
        imagenPokemon.setAttribute('src',"/img/especie/" + nombreImagen + ".png");
        // Establecer la URL de la imagen y el texto alternativo
        // Agregar la imagen al div
        pokemonImagenDiv.appendChild(idFondo);
        pokemonImagenDiv.appendChild(imagenPokemon);
    }

    

});
