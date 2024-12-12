const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";
const API_KEY = "829bc908520f8a7393166f1a355e6788&units=imperial";


let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


const getWeatherData = async (zipCode) => {
  try {

    const url = `${BASE_URL}zip=${zipCode}&appid=${API_KEY}`; 
    const response = await fetch(url);
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

    const response = await fetch(path, {
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
    }
  } catch (error) {
    console.error(`Error in generate button click handler: ${error}`);
  }

}


document.getElementById('generate').addEventListener('click', generateButtonListener);



















document.getElementById('generate').addEventListener('click', async () => {
  const zipCode = document.getElementById('zip').value.trim();
  if (!zipCode) {
    alert('Please enter a ZIP code');
    return;
  }

  const weatherData = await getWeatherData(zipCode);
  if (weatherData) {
    console.log(`Temperature: ${weatherData.main.temp}°C`);
    console.log(`Weather: ${weatherData.weather[0].description}`);
  }
});







  // const zip = "E14";
  // const country = "GB";
  