//Define la URL base de la PokeAPI que se utilizará para hacer las solicitudes de datos de Pokémon.
let URL = "https://pokeapi.co/api/v2/pokemon/";

//Declara un array vacío donde se almacenarán los datos de los Pokémon obtenidos de la API.
let pokemonData = []; 

// Inicia el proceso de obtener los datos de los Pokémon, comenzando desde el Pokémon número 1.
fetchSequentially(1);




// Define una función que realiza solicitudes fetch secuenciales para obtener los datos de los Pokémon en orden. Dentro de esta función:
function fetchSequentially(index) {
    if (index <= 151) {
        fetchPokemonData(index)//llama a fetchPokemonData con el índice actual
            .then(() => {
                //  y, cuando se complete, llama recursivamente a fetchSequentially con el siguiente índice.
                fetchSequentially(index + 1);
            })
            .catch(error => console.error('Error al cargar los datos del Pokémon:', error));
    } else {
        // Una vez que se han obtenido los datos de todos los Pokémon, llama a la función enviarDatosPokemon para enviar los datos al servidor.
        enviarDatosPokemon(pokemonData);
    }
}



//Define una función que realiza una solicitud fetch para obtener datos de un Pokémon específico dado su número de índice.
//Una función fetch es una característica de JavaScript que se utiliza para realizar solicitudes HTTP 
//Define una función que realiza una solicitud fetch para obtener datos de un Pokémon específico dado su número de índice.
//Una función fetch es una característica de JavaScript que se utiliza para realizar solicitudes HTTP 
function fetchPokemonData(i) {
    return fetch(URL + i)
        .then(response => response.json())
        .then(poke => {

            // Obtener el primer tipo del Pokémon
            let primerTipo = poke.types[0].type.name;
            let defensa = poke.stats.find(stat => stat.stat.name === "defense").base_stat;
            let ataque = poke.stats.find(stat => stat.stat.name === "attack").base_stat;
            let vida = poke.stats.find(stat => stat.stat.name === "hp").base_stat;

            // Almacena el nombre y el primer tipo del Pokémon en el array pokemonData en la posición correspondiente al índice menos uno.
            pokemonData[i - 1] = {
                name: poke.name,
                type: primerTipo,
                defense: defensa,
                attack: ataque,
                hp: vida
            };
        });
}


// Realiza una solicitud POST al servidor con los datos de los Pokémon en formato JSON.

function enviarDatosPokemon(data) {
    fetch('/pokemon/guardarNombreTipoPokemon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    //Espera la respuesta del servidor y la convierte a JSON.
    .then(response => response.json())
    //Registra la respuesta del servidor en la consola del navegador.
    .then(data => {
        console.log('Respuesta del servidor:', data);
    })
    .catch(error => console.error('Error al enviar los datos de los Pokémon al servidor:', error));
}
