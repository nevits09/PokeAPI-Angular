# Pokédex Angular

Aplicación standalone de Angular para explorar Pokémon mediante la API pública de PokéAPI. Incluye búsqueda por nombre o ID entre los primeros 36 resultados, tarjetas con tipos, indicador de carga, gestión de errores y un modal con datos físicos y estadísticas base.

## Requisitos

- Node.js y npm
- Conexión a internet para consultar PokéAPI

## Instalar y ejecutar

Instala las dependencias con `npm install` y después inicia el servidor de desarrollo con `npm start`. Abre `http://localhost:4200` en el navegador. La app consulta `https://pokeapi.co/api/v2/pokemon`.

## Compilar y probar

- `npm run build` genera la compilación de producción.
- `npm test -- --watch=false` ejecuta las pruebas una vez.

## Implementación

- `provideHttpClient()` habilita las peticiones HTTP en la configuración standalone.
- `PokemonService` combina los detalles de la lista mediante `forkJoin`.
- Angular Signals y `computed` mantienen el estado y la búsqueda reactivos.
- Las tarjetas y el diálogo de detalles se adaptan a pantallas pequeñas.
