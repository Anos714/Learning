import Container from "../components/Container";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

const Page = () => {
  return (
    <div className="layout">
      <Container>
        <div className="left-line"></div>
        <div className="right-line"></div>
        <Navbar />
        <Hero />
      </Container>
      <div className="bottom-line"></div>
      <div className="hero-img-container">
        <img className="hero-img" src="hero-ui-v6.webp" alt="image" />
      </div>
    </div>
  );
};
export default Page;
