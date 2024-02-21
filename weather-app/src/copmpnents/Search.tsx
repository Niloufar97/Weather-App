import { ChangeEvent } from "react";
import { optionsType } from "../types";
type props = {
    term : string,
    options: [],
    onChangeInput : (e : ChangeEvent<HTMLInputElement>) => void,
    onOptionSelect : (option: optionsType) => void,
    onSubmit : () => void
}
function Search({term , options , onChangeInput, onOptionSelect , onSubmit} : props) : JSX.Element {
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
                <li className="hover:bg-zinc-400 cursor-pointer" key={index} onClick={() => onOptionSelect(option)}>
                  <button
                    className="px-1"
                    
                  >
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
  )
}

export default Search;
