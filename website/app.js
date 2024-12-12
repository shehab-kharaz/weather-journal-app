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



  