import NavbarComponent from "./components/NavbarComponent"
import GamePage from "./pages/GamePage"
import Home from "./pages/Home"
import { BrowserRouter,Routes, Route } from "react-router-dom"
import ProfilePage from "./pages/ProfilePage"


function App() {

  return (
    <> 
    <BrowserRouter>
        <NavbarComponent/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path={`/games/:id`} element={<GamePage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
