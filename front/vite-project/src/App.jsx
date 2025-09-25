import { Route, Routes, useNavigate, useLocation } from "react-router-dom"
import Home from "./views/Home/Home"
import Login from "./views/Login/Login"
import MisTurnos from "./views/MisTurnos/MisTurnos"
import Register from "./views/Register/Register"
import NavBar from "./components/NavBar/NavBar"
import AgendarTurno from "./views/AgendarTurno/AgendarTurno.jsx"
import { useContext, useEffect, useState } from "react"
import { UsersContext } from "./context/UserContext"
import NotFound from "./components/notFound/NotFound"

function App() {
  const { isLogged } = useContext(UsersContext) 
  const [isNotFound, setIsNotFound] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()   

  useEffect(() => { 
    const validRoutes = ["/", "/login", "/register", "/misturnos", "/agendarturno"]; 
    const currentPath = location.pathname.toLowerCase();

    if (!validRoutes.includes(currentPath)) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
    
    if (!isLogged && currentPath !== "/login" && currentPath !== "/register") {
      navigate("/login"); 
    }

    if (isLogged && (currentPath === "/login" || currentPath === "/register")) {
      navigate("/");
    }
    
  }, [isLogged, navigate, location.pathname]) 

  return ( 
    <> 
      {!isLogged ? ( 
        <Routes> 
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} /> 
        </Routes>
      ) : (
        <>
          {!isNotFound && (
            <header>
              <NavBar />
            </header>
          )}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/misturnos" element={<MisTurnos />} />
            <Route path="/agendarturno" element={<AgendarTurno />}/>
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </>
      )}
    </>
  )
}

export default App
