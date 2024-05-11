document.addEventListener('DOMContentLoaded', function() {
    var selectElementTipo = document.getElementById('tipo');

    function actualizarColorTipo() {
        var selectedOptionTipo = selectElementTipo.options[selectElementTipo.selectedIndex];
        var tipoId = selectedOptionTipo.value;
        var tipoSelect = document.getElementById('tipo');
        tipoSelect.className = "tipo-" + tipoId;
    }

    selectElementTipo.addEventListener('change', function() {
        actualizarColorTipo();
    });

    // Llamamos a la función inicialmente para establecer el color del tipo seleccionado
    actualizarColorTipo();
});