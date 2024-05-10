var estadoSonido = true; // Variable para controlar el estado del sonido
        var audio = document.getElementById("audio");
            audio.volume = 0.2;
        function cambiarEstadoSonido() {
            var img = document.querySelector('.volumen');
            var audio = document.getElementById('audio');

            if (!estadoSonido) {
                img.src = '/img/muted.png'; // Cambiar la imagen a "muted"
                audio.pause(); // Pausar el audio
            } else {
                img.src = '/img/unmuted.png'; // Cambiar la imagen a "unmuted"
                audio.play(); // Reproducir el audio
            }
            estadoSonido = !estadoSonido; // Cambiar el estado del sonido
        }

        document.addEventListener('keydown', function(event) {
            // Verificar si la tecla presionada no es la tecla "Alt" ni "F5"
            if (event.key !== "Alt" && event.key !== "F5" && event.key !== "F11") {
                // Redirigir a otra página cuando se presiona cualquier tecla que no sea "Alt"
                window.location.href = '/inicioRegistro/main'; 
            }
        });