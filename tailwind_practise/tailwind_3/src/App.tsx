const App = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center bg-neutral-900">
      <div className="flex justify-center bg-linear-to-b from-red-300 to-yellow-200 bg-clip-text py-20 text-7xl leading-5 tracking-widest text-transparent selection:text-blue-500">
        Hello World
      </div>

      <button className="relative rounded-xl border border-neutral-800 bg-neutral-700 px-4 py-2 text-white">
        <div className="via-primary text-primary absolute inset-x-0 -bottom-px h-px w-full bg-linear-to-r from-transparent to-transparent"></div>
        Join waitlist
      </button>
    </div>
  );
};
export default App;
