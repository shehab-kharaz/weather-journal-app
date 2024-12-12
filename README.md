# Weather Journal App
This project is a fork of the [Original Starter Code](https://github.com/udacity/fend/tree/refresh-2019) from [Udacity](https://www.udacity.com/).

## Description
The Weather Journal App allows users to input a ZIP code and their current feelings. It then fetches the temperature data from the [Weather API](https://openweathermap.org/api) based on the provided ZIP code and stores this information along with the user's feelings and the current date in a server-side object. The app dynamically updates the user interface to display the temperature, date, and the user's feelings. Additionally, the app has been restyled from scratch to provide a cleaner interface.

## Functionality

### 1. **Weather Data Fetching**
   - **GET Request**: The client sends a `GET` request to the weather API to retrieve the temperature for a given ZIP code.
   - **POST Request**: After receiving the temperature data, the app sends a `POST` request to store the weather data, the user's feelings, and the current date on the server.

### 2. **Dynamic Content Update**
   - After successfully posting the data, the UI is updated dynamically to display the temperature, current date, and user’s feelings.
   - The modal dialog is displayed with the updated content.

### 3. **User Interface**
   - The app features a clean UI designed using custom CSS. It includes:
     - Input fields for ZIP code and user feelings.
     - A button to trigger the weather data retrieval and posting of user data.
     - A modal dialog to display the fetched weather data and the user’s feelings.
   

## API Endpoints

### 1. **POST /projectData**
   - Stores the weather data, user feelings, and current date.
   - **Request Body:**
     ```json
     {
       "temperature": 25,
       "date": "12.12.2024",
       "userResponse": "Feeling good"
     }
     ```

### 2. **GET /projectData**
   - Retrieves the stored weather data, user feelings, and the current date.
   - **Response Body:**
     ```json
     {
       "temperature": 25,
       "date": "12.12.2024",
       "userResponse": "Feeling good"
     }
     ```

### 3. **GET /weatherData?zip=<ZIP_CODE>**
   - Fetches the temperature for a given ZIP code from the weather API.
   - **Query Parameters:**
     - `zip`: The ZIP code to fetch the weather data for.
   - **Response Body:**
     ```json
     {
       "main": {
         "temp": 25
       }
     }
     ```

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/) for the original materials.

For the work I have contributed, the code is licensed under the **No License** (meaning you may not use, distribute, or modify the code).


