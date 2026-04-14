const Navbar = () => {
  const navLinks = [
    { title: "Founders", href: "#" },
    { title: "Guide", href: "#" },
    { title: "Docs", href: "#" },
    { title: "Pricing", href: "#" },
    { title: "Log In", href: "#" },
  ];
  return (
    <div className="nav-container">
      <div className="logo">Finta</div>
      <div className="nav-links">
        {navLinks.map((link, _) => (
          <a className="nav-link" key={link.title} href={link.href}>
            {link.title}
          </a>
        ))}
        <button className="nav-btn">Get started</button>
      </div>
    </div>
  );
};
export default Navbar;
