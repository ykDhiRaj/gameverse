import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import GamePage from "./pages/GamePage";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";


function App() {
  return (
    
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    
  );
}

function MainLayout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup"];
  

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <NavbarComponent />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/:id" element={<GamePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
