# Fish Feed Calculator - Frontend

This is the frontend for the Fish Feed Calculator, a modern, responsive user interface built with React. It provides an intuitive way for users to interact with the powerful features of the [Fish Feed Calculator Backend](https://github.com/JayJay247in/fish-feed-calculator-backend.git).

The application is designed to be user-friendly, providing clear inputs, formatted results, and real-time feedback.

## Features

*   **Dynamic & Responsive Form:** A clean and intuitive form for entering all calculation parameters, including fish species, quantity, and weights.
*   **Advanced Parameter Inputs:** Includes optional fields for `Growth Period` and `Water Temperature` to leverage the backend's advanced calculation capabilities.
*   **Real-time API Communication:** Dynamically fetches supported fish species from the backend on startup.
*   **Comprehensive Results Display:** Neatly presents the complex calculation results in a structured and easy-to-read format, including:
    *   A summary of total feed and cost.
    *   A detailed table of the optimized ingredient mix.
    *   The recommended daily feeding schedule.
    *   A nutrient analysis with clear status indicators.
*   **Interactive Order Placement:** A "Place Order" button that takes the calculated ingredient list and sends it to the backend's simulated feed mill endpoint.
*   **Robust User Experience:** Provides clear loading indicators while fetching data or performing calculations, and displays user-friendly error messages from the API.

## Technology Stack

*   **Framework:** React
*   **Component Library:** Material-UI (MUI) for a professional and consistent design system.
*   **API Client:** Axios for all communication with the backend REST API.
*   **Package Manager:** Node.js / npm

## Setup and Running

**Prerequisites:**
*   Node.js and npm
*   The [Fish Feed Calculator Backend](https://github.com/JayJay247in/fish-feed-calculator-backend.git) **must be running** on `http://localhost:8080`.

**Instructions:**
1.  Navigate to the project's root directory (`fish-feed-calculator-frontend`).
2.  Install all the required dependencies:
    ```bash
    npm install
    ```
3.  Start the React development server:
    ```bash
    npm start
    ```
4.  The application will automatically open in your web browser at `http://localhost:3000`.

## Application Flow

1.  Upon loading, the application fetches the list of supported fish species from the backend (`/species`).
2.  The user fills in the required fields in the "Calculation Parameters" form.
3.  Upon clicking "Calculate Feed", a request is sent to the backend's `/calculate` endpoint.
4.  While waiting, a loading spinner is displayed. If an error occurs, it is shown in an alert box.
5.  On a successful response, the "Calculation Results" section appears, displaying all the returned data.
6.  The user can then click the "Place Simulated Order" button, which sends the calculated ingredient quantities to the `/order` endpoint and displays the mock confirmation.