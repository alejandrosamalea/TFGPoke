document.addEventListener("DOMContentLoaded", function() {
    // Define un array con los textos que quieres mostrar
    var textos = [
        "Levantando a Snorlax",
        "Buscando pokeballs perdidas",
        "Pescando Magikarps",
        "Haciendo super las pociones",
        "Avistando Pidgeys"
    ];

    // Obtiene el elemento con la clase "texto"
    var textoElement = document.querySelector('.texto p');
    
    // Variable para mantener el índice del texto anterior
    var lastIndex = -1;

    // Función para actualizar el texto
    function cambiarTexto() {
        var newIndex;
        do {
            // Genera un índice aleatorio diferente al anterior
            newIndex = Math.floor(Math.random() * textos.length);
        } while (newIndex === lastIndex); // Repite hasta que el nuevo índice sea diferente al anterior

        // Actualiza el índice anterior con el nuevo índice
        lastIndex = newIndex;

        // Asigna el texto actual al elemento <p>
        textoElement.textContent = textos[newIndex];
    }

    // Llama a la función cambiarTexto inicialmente
    cambiarTexto();

    // Configura un intervalo para llamar a la función cambiarTexto cada 4 segundos
    setInterval(cambiarTexto, 1000);
});
