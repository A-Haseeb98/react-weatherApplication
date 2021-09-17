import { useEffect } from 'react'
import { Header, Input, Button, Footer } from './Components'

function App() {

  let clickHandler = () => {
    console.log(`running`)
  }

  return (
    <div className="App">
      <Header />
      <Input />
      <Button onCLick={()=>clickHandler} />
      {
        useEffect(() => {
          fetch('https://api.openweathermap.org/data/2.5/weather?q=quetta&appid=035a79083cc2ac4fdbdc664b6c36622f')
            .then((res) => res.json())
            .then((json) => console.log(json))
        }, [])
      }
      {/* {
        useEffect(() => {

          navigator.geolocation.getCurrentPosition((location) => {
            console.log(location)

            fetch('https://api.openweathermap.org/data/2.5/weather?lat={24.86173}&lon={67.0088}&appid=035a79083cc2ac4fdbdc664b6c36622f')
              .then((res) => res.json())
              .then((json) => console.log(json))
          })
        }, [])

      } */}
      <Footer />
    </div>


  );
}

export default App;
