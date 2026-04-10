import { Route, Routes } from "react-router";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import useGetAuthUser from "./hooks/useGetAuthUser";

const App = () => {
  const { authUserData, isLoading, error } = useGetAuthUser();
  console.log(authUserData, isLoading, error);

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
};
export default App;
