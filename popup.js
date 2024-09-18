document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggle-animal');
  const velocidadInput = document.getElementById('velocidad');
  const tamanoInput = document.getElementById('tamano');
  const velocidadValue = document.getElementById('velocidadValue');
  const tamanoValue = document.getElementById('tamanoValue');
  const animalSelect = document.getElementById('animal');
  const resetButton = document.getElementById('reset-values');
  const toggleMovimiento = document.getElementById('toggle-movimiento'); // Switch para seguir el mouse

  const defaultAnimal = "https://mir-s3-cdn-cf.behance.net/project_modules/disp/94e17671805451.5ca68c8a444f2.gif"; // URL por defecto del animal
  const defaultVelocidad = "2.5";
  const defaultTamano = "50px";

  let animalActivo = false;

  // Cargar los valores guardados de velocidad, tamaño, animal y modo de movimiento
  chrome.storage.local.get(['velocidadAnimal', 'tamanoAnimal', 'animalSprite', 'animalActivo', 'seguirMouse'], function (result) {
    if (result.velocidadAnimal) {
      velocidadInput.value = result.velocidadAnimal;
      velocidadValue.textContent = result.velocidadAnimal;
    }
    if (result.tamanoAnimal) {
      tamanoInput.value = result.tamanoAnimal.replace('px', ''); // Quitar 'px' para ajustar el input
      tamanoValue.textContent = result.tamanoAnimal;
    }
    if (result.animalSprite) {
      animalSelect.value = result.animalSprite;
    }
    animalActivo = result.animalActivo || false;
    toggleMovimiento.checked = result.seguirMouse !== undefined ? result.seguirMouse : true; // Restaurar estado del switch
    toggleButton.textContent = animalActivo ? 'Quitar Animal' : 'Agregar Animal';
  });

  // Actualizar el texto que muestra los valores actuales y guardar en almacenamiento local
  velocidadInput.addEventListener('input', function () {
    velocidadValue.textContent = velocidadInput.value;
    guardarValores(); // Guardar velocidad
    enviarValoresActuales(); // Enviar al content script cuando cambie la velocidad
  });

  tamanoInput.addEventListener('input', function () {
    tamanoValue.textContent = tamanoInput.value + 'px';
    guardarValores(); // Guardar tamaño
    enviarValoresActuales(); // Enviar al content script cuando cambie el tamaño
  });

  animalSelect.addEventListener('change', function () {
    guardarValores(); // Guardar el animal seleccionado
    enviarValoresActuales(); // Enviar al content script cuando se cambie el animal
  });

  toggleMovimiento.addEventListener('change', function () {
    guardarValores(); // Guardar el estado del switch
    enviarValoresActuales(); // Enviar el nuevo estado del switch al content script
  });

  // Cuando se hace clic en el botón, enviar mensaje al content script para agregar o quitar el animal
  toggleButton.addEventListener('click', function () {
    animalActivo = !animalActivo;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: animalActivo ? 'agregar' : 'quitar',
        velocidad: velocidadInput.value,
        tamano: tamanoInput.value + 'px',
        animal: animalSelect.value,
        seguirMouse: toggleMovimiento.checked // Enviar el estado del switch
      });

      // Actualizar el botón
      toggleButton.textContent = animalActivo ? 'Quitar Animal' : 'Agregar Animal';

      // Guardar el estado en el almacenamiento local
      chrome.storage.local.set({ animalActivo });
    });
  });

  // Función para guardar los valores de velocidad, tamaño, animal y modo de movimiento en el almacenamiento local
  function guardarValores() {
    chrome.storage.local.set({
      velocidadAnimal: velocidadInput.value,
      tamanoAnimal: tamanoInput.value + 'px',
      animalSprite: animalSelect.value,
      seguirMouse: toggleMovimiento.checked // Guardar el estado del switch
    });
  }

  // Función para enviar los valores actuales al content script
  function enviarValoresActuales() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'actualizar',
        velocidad: velocidadInput.value,
        tamano: tamanoInput.value + 'px',
        animal: animalSelect.value,
        seguirMouse: toggleMovimiento.checked // Enviar el estado del switch
      });
    });
  }

  // Evento para restablecer los valores predeterminados
  resetButton.addEventListener('click', function () {
    velocidadInput.value = defaultVelocidad;
    tamanoInput.value = defaultTamano.replace('px', '');
    animalSelect.value = defaultAnimal;
    toggleMovimiento.checked = true; // Por defecto, seguir el mouse

    velocidadValue.textContent = defaultVelocidad;
    tamanoValue.textContent = defaultTamano;

    guardarValores(); // Restablecer valores
    enviarValoresActuales(); // Aplicar los cambios
  });
});
