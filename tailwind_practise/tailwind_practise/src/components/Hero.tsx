const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-badge">
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
      <h1 className="hero-heading">Magically simplify accounting and taxes</h1>
      <p className="hero-desc">
        Automated bookkeeping. Effortless tax filing. Financial clarity. Set up
        in 10 mins. Back to building by 8:56pm.
      </p>
      <div className="hero-btn-container">
        <button className="nav-btn">Get started</button>
        <button className="pricing-btn">
          <p>Pricing</p>
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
  );
};
export default Hero;
