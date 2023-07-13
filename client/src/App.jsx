import "./App.css";
import { Routes, Route } from "react-router-dom";
import FirstPage from "./components/FirstPage/FirstPage";
import HomePage from "./components/HomePage/HomePage";
import DetailPage from "./components/DetailPage/DetailPage";
import FormPage from "./components/FormPage/FormPage";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const showHomePage = () => {
    navigate("/home");
  };

  const leaveHomePage = () => {
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="/"
        exact
        element={<FirstPage showHomePage={showHomePage} />}
      />
      <Route
        path="/home"
        exact
        element={<HomePage leaveHomePage={leaveHomePage} />}
      />
      <Route path="/detail/:id" exact element={<DetailPage />} />
      <Route path="/form" exact element={<FormPage />} />
    </Routes>
  );
}

export default App;
