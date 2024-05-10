document.addEventListener('DOMContentLoaded', function() {
    var selectElementTipo = document.getElementById('tipo');
    var ataquesContainer = document.querySelector('#ataque');
    var ataquesInternos = ataquesContainer.children;
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var maxCheckboxes = 4; // Límite máximo de checkboxes seleccionados

    // Función para mostrar u ocultar los ataques basados en el tipo seleccionado
    function actualizarAtaques() {
        var tipoSeleccionado = selectElementTipo.value;

        // Ocultar todos los ataques
        for (var i = 0; i < ataquesInternos.length; i++) {
            ataquesInternos[i].style.display = 'none';
        }

        // Mostrar ataques del tipo seleccionado
        var ataquesMostrados = document.querySelectorAll('#ataque-' + tipoSeleccionado);
        for (var i = 0; i < ataquesMostrados.length; i++) {
            ataquesMostrados[i].style.display = 'block';
        }

        // Actualizar el color del primer select
        actualizarColorTipo();
    }

    // Función para contar cuántos checkboxes están marcados
    function contarCheckboxesMarcados() {
        var checkboxesMarcados = 0;
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                checkboxesMarcados++;
            }
        });
        return checkboxesMarcados;
    }

    // Función para limitar la cantidad de checkboxes seleccionados
    function limitarCheckboxes() {
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
                if (contarCheckboxesMarcados() > maxCheckboxes) {
                    this.checked = false; // Desmarcar el checkbox si excede el límite
                }
            });
        });
    }

    // Función para actualizar el color del primer select
    function actualizarColorTipo() {
        var selectedOptionTipo = selectElementTipo.options[selectElementTipo.selectedIndex];
        var selectedColorTipo = window.getComputedStyle(selectedOptionTipo).backgroundColor;
        selectElementTipo.style.backgroundColor = selectedColorTipo;
    }

    // Al cambiar la opción en el primer select, actualizar los ataques
    selectElementTipo.addEventListener('change', function() {
        actualizarAtaques();      
    });

    // Llamar a actualizarAtaques al cargar la página para inicializar los ataques
    actualizarAtaques();

    // Llamar a la función para limitar checkboxes
    limitarCheckboxes();
});
