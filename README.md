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
- Instalando las siguientes dependencias: http-status-codes
- Implementando enrutadores
- Instalar dependencias: knex objection

## Sesión #04

- Instalar las siguientes dependencias: knex objection sqlite3
- Instalar los siguientes plugins para vscode: Sqlite Viewer
- Desarrollar el manejador de conexión a la base de datos: `npx knex init`

- Generar los archivos de migración:
  - Generar la tabla de tipos de pokemon: `npx knex migrate:make type`
  - Generar la tabla de habilidades de pokemon: `npx knex migrate:make abilitiy`
  - Generar la tabla de entrenadores de pokemon: `npx knex migrate:make trainer`
  - Generar la tabla de pokemons: `npx knex migrate:make pokemon`
- src/api/models
