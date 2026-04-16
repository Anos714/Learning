import Container from "./components/Container";
import Page from "./pages/Page";

const App = () => {
  return (
    <div className="h-screen w-screen relative">
      <div className="h-full w-full bg-linear-to-b from-white to-blue-200/70">
        <Container>
          <div className="absolute left-0 w-px h-full bg-linear-to-t from-white to-neutral-300"></div>
          <div className="absolute right-0 w-px h-full bg-linear-to-t from-white to-neutral-300"></div>
          <Page />
        </Container>
        <div className="absolute bottom-0 w-full h-px  bg-linear-to-l from-white to-neutral-300"></div>
      </div>
    </div>
  );
};
export default App;
