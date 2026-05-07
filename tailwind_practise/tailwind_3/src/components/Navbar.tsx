const Navbar = () => {
  const links = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "About", href: "/about" },
    { id: 3, label: "Services", href: "/services" },
    { id: 4, label: "Contact", href: "/contact" },
    { id: 5, label: "Blog", href: "/blog" },
  ];
  return (
    <div className="shadow-input m-auto mt-5 flex max-w-300 items-center justify-between rounded-full bg-neutral-100 px-6 py-2">
      <div className="flexitems-center justify-center">
        <img src="favicon.svg" alt="logo" height={25} width={25} />
      </div>
      <div className="flex items-center justify-center gap-5 text-sm text-neutral-800">
        {links.map((link, _) => (
          <a
            className="transition-colors duration-200 ease-out hover:text-neutral-500"
            key={link.label}
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </div>
      <div></div>
    </div>
  );
};
export default Navbar;
