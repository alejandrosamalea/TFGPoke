// Define la URL base de la PokeAPI que se utilizará para hacer las solicitudes de datos de Pokémon.
const URL = "https://pokeapi.co/api/v2/pokemon/";
// Define el total de Pokémon a cargar
const totalPokemon = 151;
// Declara un array vacío donde se almacenarán los datos de los Pokémon obtenidos de la API.
let pokemonData = []; 

// Define una función que realiza una solicitud fetch para obtener datos de un Pokémon específico dado su número de índice.
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

// Define una función que realiza solicitudes fetch secuenciales para obtener los datos de los Pokémon en orden.
function fetchSequentially(index) {
    if (index <= totalPokemon) {
        fetchPokemonData(index)
            .then(() => {
                // Calcula el progreso actual
                const progress = Math.ceil((index / totalPokemon) * 100);
                // Actualiza la barra de progreso
                document.getElementById("progress").style.width = progress + "%";
                // y, cuando se complete, llama recursivamente a fetchSequentially con el siguiente índice.
                fetchSequentially(index + 1);
            })
            .catch(error => console.error('Error al cargar los datos del Pokémon:', error));
    } else {
        // Una vez que se han obtenido los datos de todos los Pokémon, llama a la función enviarDatosPokemon para enviar los datos al servidor.
        enviarDatosPokemon(pokemonData);
    }
}

// Realiza una solicitud POST al servidor con los datos de los Pokémon en formato JSON.
function enviarDatosPokemon(data) {
    fetch('/especie/guardarNombreTipoPokemon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        // Redireccionar a la página index.html después de enviar los datos al servidor
        window.location.href = '/index';
    })
    .catch(error => console.error('Error al enviar los datos de los Pokémon al servidor:', error));
}

// Inicia el proceso de obtener los datos de los Pokémon, comenzando desde el Pokémon número 1.
var elementosTest = document.querySelectorAll('p[id="nombre"]');
// Encuentra el último elemento <p> con el ID "nombre"
var ultimoTest = elementosTest[elementosTest.length - 1];

if (!ultimoTest) {
    fetchSequentially(1);
} else {
    // Obtén la duración total de la animación de la barra de progreso
    var tiempoInicio = Date.now();

    // Actualiza la barra de progreso basándose en el tiempo transcurrido
    function actualizarBarraProgreso() {
        var tiempoActual = Date.now();
        var tiempoTranscurrido = tiempoActual - tiempoInicio;
        var progreso = Math.min(100, (tiempoTranscurrido / 5000) * 100); // Limita el progreso al 100%
        document.getElementById("progress").style.width = progreso + "%";

        if (tiempoTranscurrido < 5000) {
            requestAnimationFrame(actualizarBarraProgreso); // Llama a la función nuevamente si aún no han pasado 5 segundos
        } else {
            window.location.href = '/index';
        }
    }

    actualizarBarraProgreso(); // Inicia la actualización de la barra de progreso
}
