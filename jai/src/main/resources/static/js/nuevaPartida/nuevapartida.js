$(document).ready(function() {
    // Establecer el enfoque en el botón "chica"
    $('#chica').focus()
    var genero
    // Función para mostrar el teclado cuando se selecciona un género
    var id_usuario

    var test = false;

    function mostrarTeclado() {
        test = false;
        $('#nombreFormContainer').show() // Mostrar el formulario de nombre
        $('.h1-nombre').show()
        $('.input-nombre').show()
        var letras = document.getElementsByClassName('key')
        letras[0].focus()
        $('.card-container').hide()
        $('.h1-card').hide()
        
    }
    // añadir evento teclado para que se añada un backspace para quitar la primera letra
    $('#chica, #chico').keyup(function(event) {
        if (event.which === 13) { // Si se presiona la tecla Enter
          genero = document.activeElement.getAttribute('data-genero')
          mostrarTeclado(); // Llamar a la función para mostrar el teclado
          console.log(document.getElementById('nombre').value)
          document.getElementById('nombre').value=""
        }
    
    });
    
    $('#iniciarPartida').on('click', function() {
        id_usuario = document.getElementById('id_usuario').value
        var nombre = $('#nombre').val(); // Obtener el valor del campo de nombre
        window.location.href = '/nuevaPartida/inicioPost?nombre=' + nombre + '&genero=' + genero + '&id_usuario='+ id_usuario
    });
    
  
    document.addEventListener('keyup', function(event) {
        if(test)
        {
             if (event.key === 'Enter') {
            var nombre = document.getElementById('nombre')
            var letraPresionada = document.activeElement.getAttribute('data-key')
            

            if (letraPresionada == "Backspace") {
                nombre.value = nombre.value.slice(0, -1)
            } else if (letraPresionada != null){
                nombre.value += letraPresionada
            }
            console.log(document.getElementById('nombre').value)
        }
        }
        else test = true;
       
    })
    
    // Añadir evento de teclado para moverse entre las teclas
    document.addEventListener('keydown', function(event) {
        var seleccion = document.activeElement;
        var nombre = document.getElementById('nombre');
    
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
        } else if (event.key == 'ArrowUp') {
            // Moverse a la tecla arriba
            var indexFila = Array.from(seleccion.parentElement.parentElement.children).indexOf(seleccion.parentElement);
            var filaAnterior = seleccion.parentElement.previousElementSibling;
            if (filaAnterior) {
                var letrasAnteriores = filaAnterior.children;
                var indiceColumna = Array.from(seleccion.parentElement.children).indexOf(seleccion);
                if (letrasAnteriores[indiceColumna]) {
                    letrasAnteriores[indiceColumna].focus();
                }
            }
        } else if (event.key == 'ArrowDown') {
            // Moverse a la tecla abajo
            var indexFila = Array.from(seleccion.parentElement.parentElement.children).indexOf(seleccion.parentElement);
            var siguienteFila = seleccion.parentElement.nextElementSibling;
            if (siguienteFila) {
                var letrasSiguientes = siguienteFila.children;
                var indiceColumna = Array.from(seleccion.parentElement.children).indexOf(seleccion);
                if (letrasSiguientes[indiceColumna]) {
                    letrasSiguientes[indiceColumna].focus();
                }
            }
        } else if (event.key == 'Backspace') {
            // Borrar la última letra si se presiona la tecla de retroceso
            nombre.value = nombre.value.slice(0, -1); 
        } else if (event.key.length == 1 && event.key !== ' ') {
            // Si se presiona una tecla alfabética, escribir en el campo de entrada
            var letraPresionada = event.key.toLowerCase();
            nombre.value += letraPresionada;
        }
    });
    
});