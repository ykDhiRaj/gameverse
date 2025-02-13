import NavbarComponent from "./components/NavbarComponent"
import GamePage from "./pages/GamePage"
import Home from "./pages/Home"
import { BrowserRouter,Routes, Route } from "react-router-dom"


function App() {

  return (
    <> 
    <BrowserRouter>
        <NavbarComponent/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/game" element={<GamePage/>}/>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
