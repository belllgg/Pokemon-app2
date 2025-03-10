# Pokemon Explorer

## Introducción
Pokemon Explorer es una aplicación que permite buscar información sobre Pokémon utilizando la API de PokeAPI. La aplicación está dividida en un backend desarrollado en PHP y un frontend en React, los cuales interactúan para obtener y mostrar la información de cada Pokémon.

## Funcionamiento

### 1. Backend (PHP)
El backend se encarga de hacer las solicitudes a la PokeAPI y devolver la información en un formato adecuado para el frontend. 

Sus principales funciones son:
- Recibir solicitudes desde el frontend.
- Consultar la API externa para obtener información de un Pokémon por ID o nombre.
- Implementar un sistema de caché para reducir las peticiones repetidas.
- Devolver los datos en formato JSON al frontend.

### 2. Frontend (React)
El frontend proporciona una interfaz interactiva para que el usuario busque Pokémon de manera sencilla. Sus características principales incluyen:
- Un campo de búsqueda donde se puede ingresar el ID o nombre del Pokémon.
- Botones para navegar entre Pokémon anteriores y siguientes.
- Tarjetas que muestran el nombre, imagen, tipos y habilidades del Pokémon.
- Manejo de errores en caso de que un Pokémon no exista o haya problemas con la API.

### 3. Flujo de la Aplicación
- El usuario abre la aplicación en el navegador.
- Introduce un ID o nombre de Pokémon y presiona "Buscar".
- El frontend envía la solicitud al backend.
- El backend consulta la PokeAPI (o el caché si el dato ya fue solicitado anteriormente).
- Se devuelve la información al frontend en formato JSON.
- El frontend muestra los datos en una tarjeta con la imagen y características del Pokémon.

### 4. Sistema de Caché
Para mejorar la eficiencia, el backend almacena en caché la información de los Pokémon ya consultados. Esto evita hacer demasiadas solicitudes a la PokeAPI y mejora la velocidad de respuesta.

### 5. Pruebas
   
#### Backend (PHPUnit)
Las pruebas verifican:
- Que el servicio pueda obtener correctamente un Pokémon por ID
- Que el servicio pueda obtener correctamente un Pokémon por nombre
- Que el servicio maneje adecuadamente casos de error (ej: IDs inexistentes)

#### Frontend (Jest/React Testing Library)
Las pruebas verifican:
- Que el formulario de búsqueda se renderice correctamente
- Que la aplicación llame al servicio correcto según el tipo de búsqueda
- Que muestre correctamente los resultados de la búsqueda
- Que muestre mensajes de error cuando corresponda

### 6. Docker y Despliegue
La aplicación utiliza Docker para facilitar su despliegue:

docker-compose.yml: Orquesta tres servicios:
- postgres: Base de datos PostgreSQL 
- backend: Servidor PHP con Apache
- frontend: Aplicación React servida a través de serve

Cada servicio tiene su propio Dockerfile con las instrucciones para construir el contenedor.

## Inicialización de la Aplicación

Para ejecutar la aplicación localmente, sigue estos pasos:

### Requisitos Previos:
- Tener Docker instalado.
- Tener Node.js instalado (para ejecutar el frontend fuera de Docker).

### Pasos para iniciar la aplicación con Docker:
- Clonar el repositorio:
  ```
  git clone https://github.com/belllgg/POKEMON-APP.git
  cd pokemon-explorer
  ```
- Construir y levantar los contenedores con Docker Compose:
  ```
  docker-compose up --build
  ```
- La aplicación estará disponible en:
  - Backend: http://localhost:80/
  - Frontend: http://localhost:3000

### Pasos para ejecutar sin Docker:

#### Iniciar el backend:
1. Instalar PHP y Composer.
2. Navegar al directorio del backend:
   ```
   cd backend
   ```
3. Instalar dependencias:
   ```
   composer install
   ```
4. Iniciar el servidor PHP:
   ```
   php -S localhost:8000 -t public
   ```

#### Iniciar el frontend:
1. Navegar al directorio del frontend:
   ```
   cd frontend
   ```
2. Instalar dependencias:
   ```
   npm install
   ```
3. Ejecutar la aplicación:
   ```
   npm start
   ```
4. Abrir http://localhost:3000 en el navegador para ver la aplicación en funcionamiento.
