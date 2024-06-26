# curso-basico-nodejs

Curso básico de Node JS

## Sesión #01

- Crear proyecto en el repositorio
- Clonar proyecto localmente
- Iniciar el proyecto de Node `npm init`
- Instalando dependencias: express, dotenv, cross-env
- Crear carpeta "src"
- Crear archivo index.js básico
- Importar la dependencia "express"
- Codificar un servidor básico
- Importar la dependencia "dotenv"
- Implementación de las variables de entorno
- Crear el directorio "views"
- Crear un archivo html básico
- Importar la dependencia "path"
- Desarrollar endpoint para el front page

## Sesión #02

- Agregar archivo JSON de prueba
- Agregando endpoint GET básico
- Crear solicitud GET en POSTMAN
- Instalar las siguientes dependencias: underscore validator
- Instalar las siguientes dependencias de desarrollo: nodemon
- Configurar nodemon
- Configurar el cuerpo de la solicitud en express
- Agregar endpoint POST de suma
- Crear solicitud POST en POSTMAN
- Agregar validación de campos en el método POST
- Agregar endpoint PUT de multiplicación
- Agregar validación de campos en el método PUT
- Crear solicitud PUT en POSTMAN
- Agregar endpoint DELETE de divión
- Agregar validación de campos en el método DELETE
- Crear solicitud DELETE en POSTMAN

## Sesión #03

- Instalar los siguientes plugins para vscode: editorconfig eslint prettier
- Instalando las siguientes dependencias de desarrollo: eslint prettier eslint-config-prettier eslint-plugin-prettier
- Agregar el archivo de configuración de editorconfig
- Agregar configuración de eslint `npx eslint --init`
- Crear los siguientes directorios:
  - src/config
  - src/api
  - src/api/routes
  - src/api/services
  - src/api/controllers
- Implementar la arquitectura de 3 capaz a los primeros endpoints
  - Crear el archivo de servicios y desarrollar los métodos de servicio
  - Crear el archivo de controladores y desarrollar los métodos controladores
  - Crear el archivo de rutas y desarrollar las rutas de los endpoints
- Instalando las siguientes dependencias: http-status-codes winston morgan rotating-file-stream moment-timezone
- Implementando enrutadores en el indice
- Implementando la librería de códigos de respuesta
- Implementando la librería morgan para logs
- Implementando la librería winston para logs

## Sesión #04

- Instalar las siguientes dependencias: knex objection sqlite3
- Instalar los siguientes plugins para vscode: Sqlite Viewer
- Desarrollar el manejador de conexión a la base de datos: `npx knex init`
- Configurar la conexión a sqlite en el archivo de configuración knexfile.js
- Crear el siguiente **directiorio**:
  - /src/config
  - /src/models
- Desarrollar el modelo base
- Desarrollar la configuración de base de datos
- Desarrollar modelo de la tabla 'Tipos de Ataques'
- Desarrollar el endpoint get que devuelve los tipos de ataques

## Sesión 05

- Desarrollar modelo de la tabla 'Movimientos'
- Desarrollar modelo de la tabla 'Tipos'
- Desarrollar modelo de la tabla de 'Pokemon'
- Desarrollar modelo de la tabla de 'Entrenadores'
- Desarrollar el modelo de la tabla pivote de 'Tipos de pokemon'
- Desarrollar el modelo de la tabla pivote de 'Movimientos de pokemon'
- Desarrollar el modelo de la tabla pivote de 'Pokemones de entrenadores'

## Sesión 06

- Desarrollar el endpoint get que devuelve un tipo de ataque enviando el ID por la URL
- Desarrollar el endpoint post que registra un nuevo tipo de ataque
- Desarrollar el endpoint put que actualiza un tipo de ataque en específico
- Desarrollar el endpoint delete que elimina un tipo de ataque en específico

- Desarrollar el endpoint get que devuelve los movimientos
- Desarrollar el endpoint get que devuelve un movimiento enviando el ID por la URL
- Desarrollar el endpoint post que registra un nuevo movimeinto
- Desarrollar el endpoint put que actualiza un movimiento en específico
- Desarrollar el endpoint delete que elimina un movimiento en específico

## Sesión 07

- Desarrollar el endpoint get que devuelve los tipos
- Desarrollar el endpoint get que devuelve un tipo enviando el ID por la URL
- Desarrollar el endpoint post que registra un nuevo tipo
- Desarrollar el endpoint put que actualiza un tipo en específico
- Desarrollar el endpoint delete que elimina un tipo en específico

- Desarrollar el endpoint get que devuelve los pokemon
- Desarrollar el endpoint get que devuelve un pokemon enviando el ID por la URL
- Desarrollar el endpoint post que registra un nuevo pokemon
- Desarrollar el endpoint put que actualiza un pokemon en específico
- Desarrollar el endpoint delete que elimina un pokemon en específico

## Sesión 08

- Desarrollar el endpoint get que devuelve los entrenadores
- Desarrollar el endpoint get que devuelve un entrenador enviando el ID por la URL
- Desarrollar el endpoint post que registra un nuevo entrenador
- Desarrollar el endpoint put que actualiza un entrenador en específico
- Desarrollar el endpoint delete que elimina un entrenador en específico

## Sesión 09

- Crear los siguientes directorrios:
  - /database/data
  - /database/migrations
  - /database/seeds
- Configurar las migraciones en el archivo knexfile.js
- Generar los archivos de migración:
  - Generar la tabla de tipos de ataques: `npx knex migrate:make attack_types
  - Generar la tabla de movimientos de pokemon: `npx knex migrate:make moves`
  - Generar la tabla de pokemons: `npx knex migrate:make pokemon`
  - Generar la tabla de tipos de pokemon: `npx knex migrate:make types`
  - Generar la tabla de entrenadores de pokemon: `npx knex migrate:make trainer`
  - Generar la tabla de pivote entre pokemones y sus movimientos : `npx knex migrate:make pokemon_moves`
  - Generar la tabla de pivote entre tipos de pokemon : `npx knex migrate:make pokemon_types`
  - Generar la tabla de pivote entre entrenadores y pokemones : `npx knex migrate:make trainer_pokemons`
- Generar los archivos de carga de datos:
  - Generar la carga de datos de la tabla de tipos de ataques: `npx knex seed:make 01_attack_types
  - Generar la carga de datos de la tabla de movimientos de pokemon: `npx knex seed:make 02_moves`
  - Generar la carga de datos de la tabla de tipos de pokemon: `npx knex seed:make 03_types`
  - Generar la carga de datos de la tabla de pivote entre tipos de pokemon y pokemones : `npx knex seed:make 04_pokemon-types`
  - Generar la carga de datos de la tabla de pivote entre movimientos de pokemon y pokemones : `npx knex seed:make 05_pokemon-moves`
  - Generar la carga de datos de la tabla de pokemons: `npx knex seed:make 06_pokemon`
  - Generar la carga de datos de la tabla de entrenadores de pokemon: `npx knex seed:make 07_trainer`
  - Generar la carga de datos de la tabla de pivote entre entrenadores y pokemones : `npx knex seed:make 08_trainer-pokemon`
- Crear los scripts de migración de datos para desarrollo
