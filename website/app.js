// Example ZIP :  E14,GB
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";
const API_KEY = "829bc908520f8a7393166f1a355e6788&units=imperial";
const SERVER_PORT = "3000";
const SERVER_URL = `http://localhost:${SERVER_PORT}`;
const dialog = document.querySelector("#info-dialog");
const dialogCloseButton = document.querySelector("#close-modal-btn");
const generateButton = document.getElementById('generate');

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


/**
 * @description Fetches weather data from the OpenWeather API for a given ZIP code.
 * @param {string} zipCode - The ZIP code for which weather data is to be retrieved.
 * @returns {Promise<Object>} The weather data retrieved from the API in JSON format.
 * @throws {Error} Throws an error if the fetch request fails or if the API response is not successful.
 */
const getWeatherData = async (zipCode) => {
  try {
    const url = `${API_BASE_URL}zip=${zipCode}&appid=${API_KEY}`; 
    const response = await fetch(url);
    if(response.status === 404)
      alert(`Country not found, please check the ZIP code`);

    if (!response.ok) 
      throw new Error(`Unable to fetch data. Status: ${response.status}`);
    
    const data = await response.json();
    return data;

  } catch (error) {
    console.error(`Error from Async getWeatherData: ${error}`);
  }
};

/**
 * @description Sends data to the server via a POST request and returns the server's response.
 * @param {string} path - The API endpoint or path relative to the server URL.
 * @param {Object} data - The data to be sent in the request body.
 * @returns {Promise<Object>} The JSON response from the server.
 * @throws {Error} Throws an error if the POST request fails or the response is not successful.
 */
const postData = async (path, data) => {
  try {
    const response = await fetch(`${SERVER_URL}${path}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) 
      throw new Error(`POST request failed. Status: ${response.status}`);

    const responseData = await response.json();
    return responseData;

  } catch (error) {
    console.error(`Error from Async postData: ${error}`);
  }
};

/**
 * @description Updates the user interface with the latest weather data fetched from the server.
 * Fetches data from the server's `/projectData` endpoint and populates the UI elements with temperature, date, and user input.
 * @returns {Promise<void>} No value is returned; updates the DOM elements directly.
 * @throws {Error} Throws an error if the fetch request fails or the response is not successful.
 */
const updateUI = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/projectData`); 
    if (!response.ok) {
      throw new Error(`Unable to fetch data from server. Status: ${response.status}`);
    }
    const data = await response.json();

    document.getElementById('temp').textContent = `Temperature: ${data.temperature}°C`;
    document.getElementById('date').textContent = `Date: ${data.date}`;
    document.getElementById('content').textContent = `Feeling: ${data.userResponse}`;
  } catch (error) {
    console.error(`Error from Async updateUI: ${error}`);
  }
};

/**
 * @description Handles the click event of the generate button. 
 * Validates input, fetches weather data, posts data to the server, updates the UI, and shows a modal with the results.
 * @returns {Promise<void>} No value is returned; performs side effects like fetching data, updating UI, and displaying the modal.
 * @throws {Error} Throws an error if there are issues during fetching weather data, posting data to the server, or updating the UI.
 */
async function generateButtonListener() {

  const zipCode = document.getElementById('zip').value.trim();
  const userResponse = document.getElementById('feelings').value.trim();

  if (!zipCode) {
    alert('Please enter a ZIP code');
    return;
  }

  try {
    const weatherData = await getWeatherData(zipCode);
    if (weatherData) {
      const temperature = weatherData.main.temp;

      const data = {
        temperature,
        date: newDate,
        userResponse,
      };

      await postData('/projectData', data);
      await updateUI();
      dialog.showModal();
    }
  } catch (error) {
    console.error(`Error in generate button click handler: ${error}`);
  }

}

generateButton.addEventListener('click', generateButtonListener);
dialogCloseButton.addEventListener('click', () => dialog.close());



  