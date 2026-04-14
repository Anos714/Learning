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
    </div>
  );
};
export default Page;
