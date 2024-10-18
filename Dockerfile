# La creacion por etapas es mejor la optimizacion puesto que no instala de nuevo
# las dependencias, solo las actualiza si se cambia algunas de las dependencias

# Install dependencias only when needed
FROM node:20.9.0-alpine3.18 AS deps
#comando propio de alpine tipo apt -libc6 mas compatibilidad
RUN apk add --no-cache libc6-compat
WORKDIR /app
# yarn.lock evita la variacio de dependencias - especifica una version especifica
COPY package.json yarn.lock ./
# --frozen-lockfile - asegura que las versiones exactas de las dependencias especificadas
# se instalen y no genere actualizaciones no deseadas
RUN echo " Iniciando la instalacion de dependencias..."
RUN yarn install --frozen-lockfile



# Build the app with cache dependencies
FROM node:20.9.0-alpine3.18 AS builder
WORKDIR /app
# va a realizar la copia del primer contenedor deps
COPY --from=deps /app/node_modules ./node_modules
# copio todo lo que tengo a mi working directory (/app => .)
COPY . .
RUN echo "   Iniciando con la construccion de la app - nest build..."
RUN yarn build


# Production image, copy all the files and run next
FROM node:20.9.0-alpine3.18 AS runner

# Set working directory
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --prod

COPY --from=builder /app/dist ./dist

RUN echo "---Finalizando la construccion - start:prod"
CMD [ "node", "dist/main" ]