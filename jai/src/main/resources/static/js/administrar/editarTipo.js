// Agregar un evento submit al formulario
document.getElementById('editForm').addEventListener('submit', function(event) {
    // Prevenir el comportamiento predeterminado de envío del formulario
    event.preventDefault();
    // Enviar el formulario usando AJAX
    var formData = new FormData(document.getElementById('editForm'));
    fetch('/ataque/update', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // Si la operación fue exitosa, cerrar la ventana
            window.close();
            // Enviar mensaje al window principal para recargar la página
            window.opener.postMessage('reloadParent', '*');
        } else {
            // Si hay algún error, mostrar un mensaje de error
            console.error('Error al procesar el formulario');
        }
    })
    .catch(error => {
        console.error('Error de red:', error);
    });
});