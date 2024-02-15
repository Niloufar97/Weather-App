import { ChangeEvent, useEffect, useState } from "react";
import { optionsType } from "../types";
const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
const useForecast = () => {
  const [term, setTerm] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<optionsType | null>(null);
  const [forecast, setForecast] = useState<null>(null);
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
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setOptions(data));
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
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setForecast(data));
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