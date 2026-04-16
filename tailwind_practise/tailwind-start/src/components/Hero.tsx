const Hero = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="flex gap-1 items-center my-15 px-2 py-1 font-semibold bg-neutral-100 border border-neutral-200/70 rounded-full hover:bg-neutral-200/60 transition-colors duration-200 ease-out cursor-pointer">
        <p>Income taxes and R&D tax credits are due by April 15</p>
        <svg width="16" height="16" fill="none">
          <path
            stroke="#1E1F25"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-opacity=".5"
            stroke-width="1.25"
            d="M8 4.75 11.25 8m0 0L8 11.25M11.25 8h-6.5"
          ></path>
        </svg>
      </div>

      <div className="max-w-150 flex flex-col justify-center items-center gap-5">
        <h1 className="text-5xl font-bold text-center">
          Magically simplify accounting and taxes
        </h1>
        <p className="max-w-120 text-center text-neutral-500">
          Automated bookkeeping. Effortless tax filing. Financial clarity. Set
          up in 10 mins. Back to building by 7:18pm.
        </p>

        <div className="mt-5 flex justify-center items-center gap-4">
          <button className="bg-blue-500 px-5 py-3 rounded-lg text-white font-bold shadow-lg hover:bg-blue-600 transition-colors duration-200 ease-out cursor-pointer">
            Get started
          </button>
          <button className="flex gap-1 justify-center items-center px-2 py-3 rounded-lg hover:bg-neutral-200 transition-colors duration-200 ease-out cursor-pointer">
            <p className="font-semibold">Pricing</p>
            <svg width="16" height="16" fill="none">
              <path
                stroke="#1E1F25"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-opacity=".5"
                stroke-width="1.25"
                d="M8 4.75 11.25 8m0 0L8 11.25M11.25 8h-6.5"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="px-5 py-20 ">
        <img className="rounded-sm" src="hero-ui-v6.webp" alt="image" />
      </div>
    </div>
  );
};
export default Hero;
