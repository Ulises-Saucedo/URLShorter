# URLShorter 📎

## Description

URLShorter is a URL shortening service powered by Firebase, allowing users to create shortened versions of long URLs for easier sharing.

## Configuration
Set environment variables with your Firebase configuration and your frontend domain:

```shell
VITE_FRONTEND_URL=XXXXXXXXXXXXXXXXX
VITE_apiKey=XXXXXXXXXXXXXXXXX
VITE_authDomain=XXXXXXXXXXXXXXXXX
VITE_projectId=XXXXXXXXXXXXXXXXX
VITE_storageBucket=XXXXXXXXXXXXXXXXX
VITE_messagingSenderId=XXXXXXXXXXXXXXXXX
VITE_appId=XXXXXXXXXXXXXXXXX
```

## Project Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/urlshorter.git
    ```

2. Navigate to the project directory:

    ```sh
    cd urlshorter
    ```

3. Install dependencies:

    ```sh
    pnpm install
    ```

## Usage

1. Compile and hot-reload for development:

    ```sh
    pnpm dev
    ```

2. Open your browser and go to `http://localhost:3000` to access the application.

## Building for Production

1. Type-check, compile, and minify for production:

    ```sh
    pnpm build
    ```

## Additional Commands

- **Linting with ESLint:** 

    ```sh
    pnpm lint
    ```
