const Navbar = () => {
  const navLinks = [
    { title: "Founders", href: "#" },
    { title: "Guide", href: "#" },
    { title: "Docs", href: "#" },
    { title: "Pricing", href: "#" },
    { title: "Log In", href: "#" },
  ];
  return (
    <div className="flex justify-between items-center px-5 py-5 mb-25">
      <div className="">
        <img
          className="h-10 w-20 cursor-pointer"
          src="finta-logo-light.svg"
          alt="logo"
        />
      </div>
      <div className="flex justify-center items-center gap-5 text-lg ">
        {navLinks.map((item, _) => (
          <a
            className="font-semibold hover:text-neutral-400"
            key={item.title}
            href={item.href}
          >
            {item.title}
          </a>
        ))}
        <button className="bg-blue-500 px-5 py-3 rounded-lg text-white font-bold shadow-lg hover:bg-blue-600 transition-colors duration-200 ease-out cursor-pointer">
          Get started
        </button>
      </div>
    </div>
  );
};
export default Navbar;
