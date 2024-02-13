import { ChangeEvent, useEffect, useState } from "react";
import { optionsType } from "../../types";
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
  useEffect(()=>{
    if(city){
      setTerm(city.name);
      setOptions([]);
    }
  },[city]);
  // when user click search button to submit the city
  const onSubmit = () => {
   if(!city) return
   getForcast(city)
  }
  const getForcast = (city: optionsType) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => console.log({data}))
  }
  return (
    <section className="w-full max-w-xl min-h-96 flex flex-col justify-center items-center bg-white bg-opacity-20 rounded backdrop-blur-lg text-zinc-700 py-2">
      <h1 className="text-3xl m-2">
        Weather <span className="font-black">Forecast</span>
      </h1>
      <p className="m-2">Enter your location:</p>
      <div className="flex mt-10 md:mt-5 relative mb-8">
        <input
          type="text"
          value={term}
          className=" border-white border-2 rounded-l-md px-2 py-1 "
          onChange={onChangeInput}
        ></input>
        <ul className="absolute bg-white top-9 rounded">
          {options.map((option: optionsType, index: number) => {
            return (
              <li className="hover:bg-zinc-400 cursor-pointer" key={index}>
                <button className="px-1" onClick={() => onOptionSelect(option)}>
                  {option.name}
                </button>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className="rounded-r-md border-2 border-zinc-100 px-2 py-1 cursor-pointer text-zinc-400 hover:border-zinc-500 hover:text-zinc-500 "
          onClick={onSubmit}
        >
          Search
        </button>
      </div>
    </section>
  );
}

export default LandingPage;
