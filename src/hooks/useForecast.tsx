import { ChangeEvent, useEffect, useState } from "react";
import { forecastType, optionsType } from "../types";
const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
const useForecast = () => {
  const [term, setTerm] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<optionsType | null>(null);
  const [forecast, setForecast] = useState<forecastType | null>(null);
  // change fuction for input
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);
    if (value === "") return;
    getSearchOptions(value);
  };
  // get options from search box
  const getSearchOptions = (value: string) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setOptions(data))
      .catch((err) => console.error(err))
  };
  // when user select one option from the list
  const onOptionSelect = (option: optionsType) => {
    setCity(option);
  };
  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    }
  }, [city]);
  // when user click search button to submit the city
  const onSubmit = () => {
    if (!city) return;
    getForecast(city);
  };
  const getForecast = (city: optionsType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) =>{
        const forecastData = {
          ...data,
          list: data.list.slice(0 , 16)
        }
        setForecast(forecastData);
      })
      .catch((err) => console.error(err))
  };
  return(
    {
        term,
        options,
        forecast,
        onChangeInput,
        onOptionSelect,
        onSubmit
    }
  )
};
export default useForecast;