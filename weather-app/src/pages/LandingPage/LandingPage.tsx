import Search from "../../copmpnents/Search";
import useForecast from "../../hooks/useForecast";

function LandingPage(): JSX.Element {
  const { term, options, forecast, onChangeInput, onOptionSelect, onSubmit } =
    useForecast();
  return (
    <main className="w-full max-w-xl flex flex-col justify-center items-center">
      {forecast ? (
        <p> we have a forecast</p>
      ) : (
        <Search
          term={term}
          options={options}
          onChangeInput={onChangeInput}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
        />
      )}
    </main>
  );
}

export default LandingPage;
