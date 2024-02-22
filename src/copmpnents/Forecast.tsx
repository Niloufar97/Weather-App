import {
  getHumidityValue,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
} from "../helpers";
import { forecastType } from "../types";
import Sunrise from "./Icons/Sunrise";
import Sunset from "./Icons/Sunset";
import Tile from "./Tile";
import { useState } from "react";
import LandingPage from "../pages/LandingPage/LandingPage";
type props = {
  data: forecastType;
};
const Degree = ({ temp }: { temp: number }): JSX.Element => {
  return (
    <span>
      {temp}
      <sup>o</sup>
    </span>
  );
};
function Forecast({ data }: props): JSX.Element {
  const today = data.list[0];
  const [showSearch, setShowSearch] = useState(false);
  const backToSearch = () => {
    setShowSearch(true);
  }
  if (showSearch) {
    return (
    <LandingPage/>
    );
  }

  return (
    <div className="w-full md:max-w-[500px] py-4 bg-white bg-opacity-20 rounded backdrop-blur-lg">
      <div className="mx-auto w-[300px]">
        <section className="text-center">
          <h2 className="text-2xl font-black">
            {data.city.name}{" "}
            <span className="font-thin">, {data.city.country}</span>
          </h2>
          <h1 className="text-4xl font-black">
            <Degree temp={Math.round(today.main.temp)} />
          </h1>
          <p className="text-sm">
            {today.weather[0].main}
            {today.weather[0].description}
          </p>
          <p>
            H : <Degree temp={Math.ceil(today.main.temp_max)} /> L :{" "}
            <Degree temp={Math.ceil(today.main.temp_min)} />
          </p>
        </section>
        <section className="flex overflow-x-scroll mt-4 py-2 mb-5">
          {data.list.map((item, index) => (
            <div
              className="w-[50px] text-center inline-block flex-shrink-0"
              key={index}
            >
              <p className="text-sm">
                {index === 0 ? "Now" : new Date(item.dt * 1000).getHours()}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              ></img>
              <p className="text-sm font-bold">
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>
        <section className="flex flex-wrap justify-between text-zink-700 ">
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 rounded backdrop-blur-lg drop-shadow-lg py-4 mb-5">
            <Sunrise />
            <p className="mt-2">{getSunTime(data.city.sunrise)}</p>
          </div>
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 rounded backdrop-blur-lg drop-shadow-lg py-4 mb-5">
            <Sunset />
            <p className="mt-2">{getSunTime(data.city.sunset)}</p>
          </div>
          <Tile
            icon="wind"
            title="Wind"
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(
              Math.round(today.wind.deg)
            )}, gusts ${today.wind.gust.toFixed(1)}`}
          />
          <Tile
            icon="feels"
            title="Feels Like"
            info={<Degree temp={Math.round(today.main.feels_like)} />}
            description={`feels ${
              Math.round(today.main.temp) > Math.round(today.main.feels_like)
                ? "colder"
                : "warmer"
            }`}
          />
          <Tile
            icon="humidity"
            title="Humidity"
            info={`${today.main.humidity} %`}
            description={getHumidityValue(today.main.humidity)}
          />
          <Tile
            icon="visibility"
            title="Visibility"
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={`${getVisibilityValue(today.visibility)}`}
          />
        </section>
      </div>
      <button
        className="w-full mx-auto"
        onClick={backToSearch}
      >
        Back
      </button>
    </div>
  );
}

export default Forecast;
