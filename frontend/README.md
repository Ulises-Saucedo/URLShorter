# URLShorter

## Descripción
Esta es el frontend del acortador de URLs. Está construido Vue.js, Typescript y pnpm como gestor de paquetes.

## Requisitos
-  [NodeJS](https://nodejs.org/en)
-  [pnpm](https://pnpm.io/es/)

## Instalación
1. Clona el repositorio a tu máquina local:
    ```sh
    git clone https://github.com/Ulises-Saucedo/URLShorter.git
    ```
2. Instalar las dependencias necesarias:
    ```sh
    cd frontend && pnpm install
    ```
3. Configuración (si cambió el puerto escuchado por express):
   ```sh
    cd frontend/src/api y cambiar baseUrl dentro del objeto de axios
   ```
   
## Comandos 🕹
1. Desarrollo:
   ```sh
    pnpm dev
   ```
2. Construcción:
   ```sh
    pnpm build
   ```
3. Producción:
   ```sh
    pnpm start
   ```
4. Linter:
   ```sh
    pnpm lint
    ```
   
## Enlaces útiles
-  [Vue.js](https://vuejs.org/)
-  [Typescript](https://www.typescriptlang.org/)
-  [NodeJS](https://nodejs.org/en)
-  [pnpm](https://pnpm.io/es/)
