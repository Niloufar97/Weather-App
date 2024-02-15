import { ChangeEvent, useEffect, useState } from "react";
import { optionsType } from "../../types";
import Search from "../../copmpnents/Search";
const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

function LandingPage(): JSX.Element {
  const [term, setTerm] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<optionsType | null>(null);
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
    getForcast(city);
  };
  const getForcast = (city: optionsType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => console.log({ data }));
  };
  return (
    <main className="w-full max-w-xl flex flex-col justify-center items-center">
      <Search term={term} options={options} onChangeInput={onChangeInput} onOptionSelect={onOptionSelect} onSubmit={onSubmit}/>
    </main>
  );
}

export default LandingPage;
