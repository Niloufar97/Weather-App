function LandingPage() {
  return (
    <section className="w-full max-w-xl min-h-80 flex flex-col justify-center items-center bg-white bg-opacity-20 rounded backdrop-blur-lg text-zinc-700">
      <h1 className="text-3xl m-2">
        Weather <span className="font-black">Forecast</span>
      </h1>
      <p className="m-2">Enter your location:</p>
      <div className="flex mt-10 md:mt-5 ">
        <input
          type="text"
          value={""}
          className="border-white border-2 rounded-l-md px-2 py-1 "
        ></input>
        <button
          type="button"
          className="rounded-r-md border-2 border-zinc-100 px-2 py-1 cursor-pointer text-zinc-400 hover:border-zinc-500 hover:text-zinc-500 "
        >
          Search
        </button>
      </div>
    </section>
  );
}

export default LandingPage;
