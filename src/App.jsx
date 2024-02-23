import React, { useState } from "react";
import "./App.css";
import search from "./assets/icons/search.svg";
import { useStateContext } from "./Context";
import { BackgroundLayout, WeatherCard, MiniCard } from "./Components";

function App() {
  const [input, setInput] = useState("");
  const { weather, thisLocation, values, place, setPlace } = useStateContext();
  const [isCelsius, setIsCelsius] = useState(true); // State to track selected unit
  const [unit, setUnit] = useState('metric'); // Default to metric (Celsius)

 console.log(weather)
  const convertToCelsius = (tempFahrenheit) => {
    return ((tempFahrenheit - 32) * 5) / 9;
  };

 
  const convertToFahrenheit = (tempCelsius) => {
    return ((tempCelsius * 9) / 5 + 32).toFixed(2);
  };


  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
    setUnit(unit === 'metric' ? 'imperial' : 'metric');

  };

  const submitCity = () => {
    setPlace(input);
    setInput("");
  };

  return (
    <div className="w-full min-h-screen text-white px-8">
      <nav className="w-full p-3 flex justify-between items-center">
        <h1 className="font-bold tracking-wide text-3xl">Weather App</h1>
        <div className="bg-white w-64 md:w-96 overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
          <img src={search} alt="search" className="w-6 h-6" />
          <input
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                // sumit the form
                submitCity();
              }
            }}
            type="text"
            placeholder="Search city"
            className="focus:outline-none w-full text-[#212121] text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </nav>
      <BackgroundLayout />
      
      <button onClick={toggleUnit} className="text-white bg-blue-500 px-4 py-2 rounded-lg mt-4">
        {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"}
      </button>
      
      <main className="w-full flex flex-wrap gap-8 py-4 px-4 md:px-10 lg:px-20 items-center justify-center">
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={isCelsius ? weather.temp : convertToFahrenheit(weather.temp)}
          heatIndex={weather.heatindex}
          iconString={weather.conditions}
          conditions={weather.conditions}
          mint={ isCelsius ? weather.mint : convertToFahrenheit(weather.mint)}
          maxt={ isCelsius?weather.maxt : convertToFahrenheit(weather.maxt)}
          toggleUnit={toggleUnit}
          unit={unit}
        />
        
        <div className="flex justify-center gap-8 flex-wrap w-full lg:w-3/5 ">
          {values?.slice(1, 7).map((curr) => {
            return (
              <MiniCard
                key={curr.datetime}
                time={curr.datetime}
          unit={unit}
                temp={isCelsius ? curr.temp : convertToFahrenheit(curr.temp)}
                iconString={curr.conditions}
                mint={isCelsius ? curr.mint : convertToFahrenheit(curr.mint)}
                maxt={isCelsius ? curr.maxt : convertToFahrenheit(curr.maxt)}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
