import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import GamePage from "./pages/GamePage";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useSelector } from "react-redux";


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
  const user = useSelector((state)=>state.user.user);
  console.log(user);
  

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <NavbarComponent />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/:id" element={<GamePage />} />

        <Route path="/profile" element={user? <ProfilePage />:<Navigate to={'/login'}/>} />
        <Route path="/login" element={user? <Navigate to={'/'}/>:<LoginPage/>} />
        <Route path="/signup" element={user? <Navigate to={'/'}/>:<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
