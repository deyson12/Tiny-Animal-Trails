let animal = null; // Definir fuera para mantener referencia al animal
let pasto = null;
let mouseX = 0;  // Almacenar la posición X del mouse
let speed = 1;   // Velocidad por defecto
let tamano = '35px';  // Tamaño por defecto
let spriteAnimal = ''; // Mantener la URL del sprite del animal
let seguirMouse = true; // Por defecto, el animal sigue el mouse
let direction = 1; // Dirección del movimiento cuando no sigue el mouse
let position = 0; // Posición inicial del animal

// Función para agregar el animal
function agregarAnimal() {
  if (!animal) {
    animal = document.createElement('img');
    animal.src = spriteAnimal; // Usar la URL del sprite del animal
    animal.style.position = 'fixed';
    animal.style.bottom = '0';
    animal.style.left = '0';
    animal.style.height = tamano; // Ajustar la altura con el valor dinámico
    animal.style.zIndex = '9999';
    document.body.appendChild(animal);
    document.body.appendChild(pasto);

    position = 0; // Colocar el animal en la izquierda al principio
    moverAnimal(); // Iniciar el movimiento
  }
}

// Función para quitar el animal
function quitarAnimal() {
  if (animal) {
    document.body.removeChild(animal);
    document.body.removeChild(pasto);
    animal = null;
  }
}

// Capturar la posición del mouse
document.addEventListener('mousemove', function(event) {
  mouseX = event.clientX; // Solo nos interesa la posición horizontal (X)
});

// Función para mover el animal
function moverAnimal() {
  if (!animal) return; // Si no hay animal, salir de la función

  const animalWidth = animal.offsetWidth;
  
  // Si está en modo seguir mouse
  if (seguirMouse) {
    const animalCenter = position + animalWidth / 2;

    // Si el animal está cerca del mouse dentro de la zona de tolerancia, no cambiar de dirección
    if (Math.abs(mouseX - animalCenter) > 10) {
      if (mouseX > animalCenter) {
        direction = 1; // Mover a la derecha
        position += parseFloat(speed);
        animal.style.transform = 'scaleX(1)'; // Mostrar el animal mirando a la derecha
      } else if (mouseX < animalCenter) {
        direction = -1; // Mover a la izquierda
        position -= parseFloat(speed);
        animal.style.transform = 'scaleX(-1)'; // Mostrar el animal mirando a la izquierda
      }
    }
  } else {
    // Movimiento automático de izquierda a derecha y viceversa
    position += direction * parseFloat(speed);
    
    // Cambiar de dirección al llegar a los bordes
    if (position <= 0 || position >= window.innerWidth - animalWidth) {
      direction *= -1; // Cambiar la dirección
      animal.style.transform = direction === 1 ? 'scaleX(1)' : 'scaleX(-1)'; // Voltear el animal
    }
  }

  // Actualizar la posición del animal
  animal.style.left = position + 'px';

  requestAnimationFrame(moverAnimal); // Continuar moviendo el animal
}

// Escuchar mensajes del popup para agregar, quitar y ajustar velocidad, tamaño y animal
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'agregar') {
    speed = request.velocidad; // Actualizar la velocidad
    tamano = request.tamano; // Actualizar el tamaño
    spriteAnimal = request.animal; // Actualizar la URL del sprite del animal
    seguirMouse = request.seguirMouse; // Actualizar si debe seguir el mouse o no
    agregarAnimal(); // Agregar el animal
  } else if (request.action === 'quitar') {
    quitarAnimal();
  } else if (request.action === 'actualizar') {
    // Actualizar velocidad, tamaño y sprite mientras el animal está activo
    if (animal) {
      speed = request.velocidad;
      tamano = request.tamano;
      spriteAnimal = request.animal; // Actualizar la URL del sprite
      seguirMouse = request.seguirMouse; // Actualizar el modo de movimiento
      animal.style.height = tamano; // Aplicar el nuevo tamaño al animal
      animal.src = spriteAnimal; // Cambiar el sprite del animal
    }
  }
});

// Verificar el estado del animal y restaurar los valores de velocidad, tamaño y sprite al cargar la página
chrome.storage.local.get(['animalActivo', 'velocidadAnimal', 'tamanoAnimal', 'animalSprite', 'seguirMouse'], function(result) {
  if (result.animalActivo) {
    speed = result.velocidadAnimal || speed; // Restaurar velocidad si está guardada
    tamano = result.tamanoAnimal || tamano;  // Restaurar tamaño si está guardado
    spriteAnimal = result.animalSprite || spriteAnimal;  // Restaurar sprite del animal si está guardado
    seguirMouse = result.seguirMouse !== undefined ? result.seguirMouse : seguirMouse; // Restaurar el modo de movimiento
    agregarAnimal(); // Agregar el animal con los valores guardados
  }
});

// Función para agregar la línea de pasto
function agregarPasto() {
  pasto = document.createElement('div');
  pasto.style.position = 'fixed';
  pasto.style.bottom = '0'; // Posicionar en la parte inferior de la pantalla
  pasto.style.left = '0'; // Alinear con el borde izquierdo
  pasto.style.width = '100%'; // Ocupar todo el ancho de la pantalla
  pasto.style.height = '2px'; // Altura de 2px
  pasto.style.backgroundColor = 'green'; // Color verde para simular pasto
  pasto.style.zIndex = '9998'; // Asegurarse de que esté detrás del animal
}

// Llama a la función para agregar la línea de pasto cuando la página se cargue
agregarPasto();
