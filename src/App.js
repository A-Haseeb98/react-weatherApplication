import { useState, useEffect } from 'react'
import { Header, Input, Button, DisplayWeather, Footer } from './Components'
import { ClEARSKY, DEFAULT_PIC, MIST, SCATTERED, SNOW, THUNDER, RAIN } from './Assets/asset'
import './App.css'


function App() {
  const [value, setValue] = useState('')
  const [image, setImage] = useState(DEFAULT_PIC)
  const [weather, setWeather] = useState("")

  let clearSearch = () => {
    setValue(" ")
  }

  //FOR SETTING BACKGROUND IMAGE RELATED TO WEATHER
  const setBackgroundImage = (code) => {

    code === 'Clouds' ? setImage(SCATTERED) :
      code === 'Snow' ? setImage(SNOW) :
        code === 'Rain' || code === 'Drizzle' || code === 'Fog' || code === 'Dust' ? setImage(RAIN) :
          code === 'Thunderstorm' ? setImage(THUNDER) :
            code === 'Smoke' || code === 'Mist' ? setImage(MIST) :
              code === 'Clear' ? setImage(ClEARSKY) :
                setImage(DEFAULT_PIC)
  }

  //for geting weather of curent location, THIS WILL RUN ONLY ON RELOAD
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      let lat = location.coords.latitude.toFixed(4);
      let lon = location.coords.longitude.toFixed(4);

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=035a79083cc2ac4fdbdc664b6c36622f&units=metric`)
        .then((res) => res.json())
        .then((json) => {
          setWeather(json)
          setBackgroundImage(json.weather[0].main)

        })
    })
  }, [])

  //for getting weather according to search, it will re render on every input value
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=035a79083cc2ac4fdbdc664b6c36622f&units=metric`)
      .then((res) => res.json())
      .then((json) => {
        setWeather(json)
        json.name ? setBackgroundImage(json.weather[0].main) : setBackgroundImage(DEFAULT_PIC)

      })
  }, [value])

  return (
    <div className="App">

      {weather.name ?
        <Header name={weather.name} country={`,${weather.sys.country}`} temp={weather.main.temp} />
        :
        <Header name='Weather App' country=' ' temp='0' />
      }

      <div className='container' style={{ backgroundImage: `url(${image})` }}>
        <div className="small-container">
          <Input value={value} onchange={(e) => setValue(e.target.value)} />
          <Button onclick={clearSearch} >X</Button>
        </div>

      </div>

      {weather.name ?
        <DisplayWeather temp_min={weather.main.temp_min} code={weather.weather[0].icon} temp_max={weather.main.temp_max} speed={weather.wind.speed} humidity={weather.main.humidity} pressure={weather.main.pressure} description={weather.weather[0].description} feels_like={weather.main.feels_like} temp={weather.main.temp} />
        : <p>City Not Found</p>
      }

      <Footer />
    </div>


  );
}

export default App;
