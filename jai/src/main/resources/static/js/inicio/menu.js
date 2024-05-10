document.addEventListener('DOMContentLoaded', function() {
    // Crear partículas
    const numParticles = 150;
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particlesContainer.appendChild(particle);
    }

    // Animar partículas
    const particles = document.getElementsByClassName('particle');
    Array.from(particles).forEach((particle) => {
        animateParticle(particle);
    });

    function animateParticle(particle) {
        const duration = Math.random() * 2 + 1; // Duración de la animación entre 1 y 3 segundos
        const delay = Math.random() * 1; // Retardo aleatorio
        const size = Math.random() * 15 + 5; // Tamaño de la partícula entre 5 y 20 px
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight; // Iniciar desde la parte inferior de la ventana

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.position = 'absolute';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = 0;

        // Animación de movimiento de abajo hacia arriba
        particle.animate(
            [{ opacity: 0, top: y + 'px' }, { opacity: 1, top: '0px' }],
            {
                duration: duration * 3000,
                delay: delay * 1000,
                easing: 'linear',
                iterations: Infinity
            }
        );
    }

    $('#nuevaPartida').focus(); // Establecer el enfoque en el botón "Nueva Partida"
    $(document).ready(function() {
        // Asignando enlaces a los botones utilizando el atributo data
        $('#logout').data('enlace', '/inicioRegistro/logout');
        $('#nuevaPartida').data('enlace', '/nuevaPartida/nuevaPartida');
        $('#continuarPartida').data('enlace', '/continuarPartida/continuar');
        $('#administración').data('enlace', '/administrar/home');
    })
    // Evento para mover el enfoque entre los botones usando las teclas de dirección
    $('button').keydown(function(e) {
        if (e.which === 40 || e.which === 38) { // Teclas de flecha hacia abajo o arriba
            e.preventDefault(); // Evita el comportamiento predeterminado de las teclas de flecha
            var $next; // Almacenar el próximo botón al que se moverá el enfoque
    
            if (e.which === 40) { // Flecha hacia abajo
                $next = $(this).nextAll('button:first'); // Obtener el siguiente botón
            } else if (e.which === 38) { // Flecha hacia arriba
                $next = $(this).prevAll('button:first'); // Obtener el botón anterior
            }
    
            if ($next.length) { // Verificar si existe un botón siguiente o anterior
                $next.focus(); // Establecer el enfoque en el próximo botón
            }
        } else if (e.which === 13) { // Si se presiona la tecla "Enter"
            var $link = $(this).data('enlace'); // Obtener el enlace del botón
            if ($link) { // Si el botón tiene un enlace definido
                window.location.href = $link; // Ir al enlace
            }
        }
    });
    
    let botonFocus;
    $('.overlay').on('click', function(e) {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del clic
        e.stopPropagation(); // Prevenir la propagación del evento clic
        if (true) {
            botonFocus.focus(); // Restablecer el foco en el elemento previamente enfocado
        }
    });
    $('button').on('focus', function() {
        botonFocus = this; // Almacenar una referencia al elemento que tiene el foco
    });

    var rolUsuario = document.getElementById('rolUsuario').innerText.trim(); // trim() para eliminar espacios en blanco
    if (rolUsuario === "true") { // comparación estricta
        $('#administración').show();
    } else {
        $('#administración').hide();
    }
    // Mostrar el nombre de usuario en una alerta
    
});
