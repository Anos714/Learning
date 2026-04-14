import { Route, Routes } from "react-router";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
      <Toaster />
    </div>
  );
};
export default App;
