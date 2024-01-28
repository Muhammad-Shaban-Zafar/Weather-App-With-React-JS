import { useState } from 'react';
import './App.scss';

function App() {

  const [inputValue, setInputValue] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isInvalidLocation, setIsInvalidLocation] = useState(false);

  function changeHandler(e) {
    setInputValue(e.target.value);
    // Reset isInvalidLocation when the user starts typing a new location
    setIsInvalidLocation(false);
  }

  async function searchWeather(e) {
    e.preventDefault();

    const apiKey = "35147b107da3338bfc05499fabaf15d3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`;

    try {
      const fetchedWeatherData = await fetch(url).then(response => response.json());

      // Check if the weatherData has the expected structure
      if (fetchedWeatherData.name && fetchedWeatherData.weather && fetchedWeatherData.weather[0] && fetchedWeatherData.main) {
        setWeatherData(fetchedWeatherData);
        setIsInvalidLocation(false);
      } else {
        console.error("Invalid weather data structure:", fetchedWeatherData);
        setWeatherData(null); // Reset weatherData to null if the structure is not as expected
        setIsInvalidLocation(true);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null); // Reset weatherData to null in case of an error
      setIsInvalidLocation(true);
    }
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row mx-auto">
          <div className="col-5 border shadow p-5 mx-auto">

            <div className="row">
              <div className="col">
                <form className="input-group mb-3" onClick={searchWeather}>
                  <input type="text" value={inputValue} placeholder='Enter Location' className='form-control rounded-0' onChange={changeHandler} />
                  <button className='btn btn-dark rounded-0 fw-bold btn-sm' type='submit'>Search</button>
                </form>
              </div>
            </div>

            <div className="row text-center p-4">
              {isInvalidLocation ? (
                <h4 className='fw-bold'>Sorry, the location is incorrect.</h4>
              ) : weatherData ? (
                <>
                  <div className="col">
                    <br />
                    <h1 className='fw-light'>{weatherData.name}</h1>

                    {weatherData.weather && weatherData.weather[0] && (
                      <>
                        <img
                          src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                          alt={weatherData.weather[0].description}
                          className='img-fluid w-50 rounded-circle'
                        />
                        <br />
                        <h3 className='fw-light'>
                          {weatherData.weather[0].description}
                        </h3>
                      </>
                    )}

                    <div className="row mt-5">
                      <div className="col-6">
                        <h4 className='fw-bold'>Temperature
                          <br />
                          {Math.round(weatherData.main.temp - 273.15)}℃
                        </h4>
                      </div>

                      <div className="col-6">
                        <h4 className='fw-bold'>Humidity
                          <br />
                          {weatherData.main.humidity}%
                        </h4>
                      </div>

                    </div>

                  </div>
                </>
              ) : (
                <h4 className='fw-bold'>NO WEATHER FOUND</h4>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
