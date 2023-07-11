import "./App.css";
import { Routes, Route } from "react-router-dom";
import FirstPage from "./components/FirstPage/FirstPage";
import HomePage from "./components/HomePage/HomePage";
import DetailPage from "./components/DetailPage/DetailPage";
import FormPage from "./components/FormPage/FormPage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [showLanding, setShowLanding] = useState(false);
  const navigate = useNavigate();
  const [persistent, setPersistent] = useState(() => {
    const valuePersistent = window.localStorage.getItem("home");
    return JSON.parse(valuePersistent);
  });

  const showHomePage = () => {
    setShowLanding(true);
    navigate("/home");
    window.localStorage.setItem("home", JSON.stringify("home"));
  };

  const leaveHomePage = () => {
    setShowLanding(false);
    window.localStorage.removeItem("home");
    navigate("/");
  };

  useEffect(() => {
    !showLanding && navigate("/");
  }, [showLanding]);

  useEffect(() => {
    persistent && navigate("/home");
  }, [persistent]);

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
