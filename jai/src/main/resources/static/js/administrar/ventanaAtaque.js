
document.addEventListener('DOMContentLoaded', function() {
    var botonesEditar = document.querySelectorAll('.editar');
    botonesEditar.forEach(function(button) {
        button.addEventListener('click', function() {
            var posicionIzq = (window.screen.width - 500) / 2;
            var posicionArriba = (window.screen.height - 600) / 2;
            var ataqueId = this.dataset.ataqueId;
            var newWindow = window.open('../ataque/update?id=' + ataqueId, 'NewWindow', 'width=500 , height=600, left=' + posicionIzq + ',top=' + posicionArriba);
            if (window.focus) {
                newWindow.focus();
            }
            window.addEventListener('message', function(event) {
                if (event.data === 'reloadParent') {
                    // Si se recibe el mensaje 'reloadParent', recargar la página principal
                    window.location.reload();
                }
            });
        });
    });
});
