import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import LoginPage from "./pages/(auth)/login";
import DashboardLayout from "./layouts/dashboard";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/error/not-found";
import AuthLayout from "./layouts/auth";
import { useEffect } from "react";
import { getCookie, getLocalStorage } from "./lib/utils";
import { useAuth } from "./context/auth-context";
import WeatherPage from "./pages/weather";
import LocationPage from "./pages/locations";

function App() {
  const { login, user } = useAuth();

  useEffect(() => {
    const userData = getLocalStorage("data");
    if (userData && userData.token) {
      login(userData);
    }
  }, []);

  console.log({ user });
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/weather" element={<WeatherPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
