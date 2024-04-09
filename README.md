# 📌 Sunset Finance

This application was developed for a work challenge.

React Ecosystem:

-   [Yup](https://github.com/jquense/yup)
-   [Lodash](https://github.com/lodash/lodash)
-   [NextJS](https://github.com/vercel/next.js)
-   [ChartJS](https://github.com/chartjs/Chart.js)
-   [Zustand](https://github.com/pmndrs/zustand)
-   [Material UI](https://github.com/mui/material-ui)
-   [TanStack Query](https://github.com/TanStack/query)
-   [React Hook Form](https://github.com/react-hook-form/react-hook-form)

### 📋 Requirements

-   NPM v9 or higher
-   Node v18 or higher

### 🔧 How to install

-   Clone the project

    ```bash
        git clone git@github.com:joaopalopes24/finance-client.git
    ```

-   Copy the .env.example file

    -   If using linux: cp .env.example .env.local
    -   If you are on windows, open the file in a code editor and save it again as .env

-   Run the system using Docker

    ```bash
        docker build -t finance-client .

        docker run -p 3000:3000 finance-client
    ```

-   Run the system using Docker Compose

    ```bash
        docker compose up --build
    ```

-   Run the system with local NPM and Node

    ```bash
        npm install

        npm run dev
    ```

## 🚀 Okay, good job!
