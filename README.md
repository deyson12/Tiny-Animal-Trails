# Extensión de Chrome - Tiny-Animal-Trails

## Descripción

Esta extensión de Chrome permite agregar un animal en estilo **cartoon** que se mueve por la parte inferior de la pantalla del navegador. Puedes elegir entre diferentes animales y controlar su velocidad y tamaño. Además, hay un modo para que el animal siga el movimiento del mouse o se mueva automáticamente de un lado a otro de la pantalla.

## Características

- Selección de diferentes animales.
- Control de la velocidad y tamaño del animal.
- Modo de movimiento automático o seguir el mouse.
- Persistencia de las configuraciones entre sesiones (los valores se guardan y se restauran al recargar la extensión).
- Botón para restablecer las configuraciones a los valores predeterminados.

## Requisitos

- Navegador Google Chrome.
- Cuenta de desarrollador de Chrome si deseas publicarla en la Chrome Web Store (opcional).

## Instalación

### 1. Clonar el repositorio

Primero, clona este repositorio en tu máquina local utilizando **Git**:

```bash
git clone https://github.com/usuario/nombre-repositorio.git
```

### 2. Cargar la extensión en Chrome

1. Abre Google Chrome.
2. En la barra de direcciones, ingresa chrome://extensions/ y presiona Enter.
3. Activa el Modo desarrollador en la esquina superior derecha.
4. Haz clic en el botón "Cargar descomprimida".
5. Navega hasta la carpeta donde clonaste este repositorio y selecciona la carpeta de la extensión.
  
La extensión se cargará y estará disponible en la barra de extensiones de Chrome.

### Uso

1. Haz clic en el icono de la extensión en la barra de herramientas de Chrome para abrir el popup de configuración.
2. Selecciona el animal que deseas ver en pantalla utilizando el menú desplegable.
3. Ajusta la velocidad y el tamaño del animal usando los controles deslizantes.
4. Usa el switch para seleccionar si el animal debe seguir al mouse o moverse automáticamente por la pantalla.
5. Haz clic en Agregar Animal para mostrarlo en la parte inferior de la pantalla.
6. Para eliminar el animal de la pantalla, simplemente haz clic en Quitar Animal.
7. Si deseas restablecer todas las configuraciones a los valores predeterminados, haz clic en Restablecer Valores.

### Personalización
Si deseas personalizar esta extensión, puedes hacer lo siguiente:

1. Agregar más animales: Para añadir más animales, simplemente agrega nuevas opciones en el archivo popup.html con las URLs de los sprites en formato GIF o PNG.

```html
<option value="https://example.com/nueva_imagen.gif">Nuevo Animal</option>
```

2. Modificar el comportamiento: Puedes cambiar la lógica del movimiento del animal ajustando las funciones en pet.js. Por ejemplo, puedes agregar más modos de movimiento o cambiar la forma en que el animal sigue al mouse.

### Contribuciones
Si deseas contribuir a este proyecto, siéntete libre de abrir un pull request o crear un issue en GitHub. Cualquier sugerencia o mejora es bienvenida.

### Licencia
Este proyecto está bajo la licencia MIT. Siéntete libre de usarlo y modificarlo a tu gusto.

### Contacto
Si tienes alguna duda o sugerencia, no dudes en ponerte en contacto:

**Email:** deyson12@gmail.com
**GitHub:** https://github.com/deyson12

¡Gracias por usar esta extensión! 😄
