<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
  
## Servir contenido estatico - <strong>crear directorio public</strong>

```bash
# instalar paquete
$ yarn add @nestjs/serve-static
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    })
  ]
})

export class AppModule {}
```

## Start Proyect

1. ejecutar - instalacion de las dependencias

```
yarn install
```

2. Contar con NEST CLI instalado

```
npm i -g @nest/cli
```

3. Iniciar la base de Datos

```
docker-compose up -d
```
4. Clonar el archivo ```.env.templete``` y renombre a ```.env``` y actualize sus variables
## Creamos pipes

lo recomendado esque este dentro de la carpeta common/pipes

```bash
# Nest agrega Pipe - resultado final ParseMongoIdPipe
nest g pi common/pipes/parseMongoId --no-spec
```

## Herramientas Utilizados

Conectar con la base de datos Mongo

```
npm install --save @nestjs/mongoose mongoose
```

## Configuracion de prettierrc

1.  semi: true -Indica si se deben agregar puntos y coma al final de cada declaración.
2.  trailingComma: "all" - Indica si se deben agregar comas adicionales después del último elemento de un objeto o array.
3.  singleQuote: false - Indica si se deben utilizar comillas simples (') o dobles (") para las cadenas.
4.  printWidth: 180 - Establece el ancho máximo de línea antes de que Prettier intente dividir automáticamente.
5.  tabWidth: 2 - Establece el número de espacios por tabulación.
6.  arrowParens: "avoid" - Indica si los paréntesis alrededor de los parámetros de funciones de flecha deben omitirse cuando solo hay un parámetro.
7.  "braceSpacing": false, Sin espacios en fn(){sin espacios}

## revertir cambios

```
git checkout -- . # restaura el codigo al ultimo commit
```

## Reconstruir la base de datos

```
http://127.0.0.1:3000/api/seed
```

## Paginacion

para la paginacion, cuando se mando los parametros, se mandan como string <br>
pero esperamos que nuestro parametros vengan en int o number

```bash
# convertimos los query parameters a nuestros tipos de datos definidos en los dtos
# para ello utilizamos el Pipe con la siguiente configuracion
  transform: true,
  transformOptions: {
  enableImplicitConversion: true,
},
```
## Variables de entorno 
Para utiliar variables de entorno  en nestjs, debemos utilizar el paquete <br>
```bash
# en node ya se tiene variables de entorno en process.env
console.log(process.env)
# en la anterior no podremos visualizar nuestras variables de entorno 
# de nosotros que tenemos en .env
# Para hacerlo necesitamos instalar el siguiente paquete
yarn add @nestjs/config
# Despues de la instalacion, importamos la siguiente configuracion en el modulo principal
import {EnvConfiguration} from './config/app.config';
ConfigModule.forRoot({
  load: [EnvConfiguration],
}),
# de @nestjs/config
  constructor() {
    console.log(process.env);
  }
```
## Utilizar MONGODB ATLAS
Conectarse a la base de datos de atlasian
```
mongo "mongodb+srv://<usuario>:<contraseña>@<cluster>/<basededatos>?retryWrites=true&w=majority"
```
## Dockerizar proyecto
Comandos utiles
```bash
# PASOS DE CONSTRUCCION A PARTIR DEL DOCKERFILE Y DOCKER_COMPOSE.JSON
#------------------------ Construccion ------------------------------
# -f indica el archivo que utilizar (si != docker-compose.yml)
# --env-file el archivo de variables de entorno (!=.env)
# up levantar y --build ->construir
docker-compose -f docker-compose.prod.yml --env-file .env.prod up --build
```
  1.  docker compose -f docker-compose.prod.yml - Indica otro archivo diferente a d-c.yml