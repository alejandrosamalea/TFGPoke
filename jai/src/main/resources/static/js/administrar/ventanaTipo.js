document.addEventListener('DOMContentLoaded', function() {
    var botonesEditar = document.querySelectorAll('.ventanaEditar');
    botonesEditar.forEach(function(button) {
        button.addEventListener('click', function() {
            var posicionIzq = (window.screen.width - 500) / 2;
            var posicionArriba = (window.screen.height - 600) / 2;
            var tipoId = this.dataset.tipoId;
            var newWindow = window.open('../tipo/update?id=' + tipoId, 'Hola', 'width=500 , height=600, left=' + posicionIzq + ',top=' + posicionArriba);
            if (window.focus) {
                newWindow.focus();
            }
        });
    });
    // Agregar un controlador de eventos para el mensaje
    window.addEventListener('message', function(event) {
    // Verificar si el mensaje recibido es 'reloadParent'
    if (event.data == 'reloadParent') {
        // Si es así, recargar la página principal
        window.location.reload();
    }
});
});
