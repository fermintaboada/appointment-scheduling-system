import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UsersContext } from "../../context/UserContext";

function NavBar() {

const {logOutUser} = useContext(UsersContext)

const navigate = useNavigate()    
const handleLogout = () => {
    Swal.fire({
        icon: "warning",
        title: "Tu sesion fue cerrada correctamente",
    })
    logOutUser()
    navigate("/login")
}    

const location = useLocation();
return (
<nav className={styles.navbar}>
        <div className={styles.logo}>
            <h2>Q-GOLF</h2>
        </div>
    
        <ul className={styles.links}>
            <li>
            <Link  to="/" className={`${styles.navLink} ${  location.pathname === "/" ? styles.active : ""}`}>
            HOME
            </Link>
            </li>
                <li>
                    <Link 
                    to="/misturnos" 
                    className={`${styles.navLink} ${ location.pathname === "/misturnos" ? styles.active : "" }`}
                    >
                    MIS TURNOS
                    </Link>
                </li>
                <li>
                <Link to="/agendarturno"className={`${styles.navLink} ${location.pathname === "/agendarturno" ? styles.active : ""}`}
                >
                AGENDAR TURNO
                </Link>
                </li>
                <li>
                <Link to="/about"className={`${styles.navLink} ${location.pathname === "/about" ? styles.active : ""}`}>
                    ABOUT
                </Link>
            </li>
        </ul>
        
        <div className={styles.logoutContainer}>
            <button className={styles.logoutBtn} onClick ={handleLogout} >Logout</button>
        </div>
    </nav>
);
}

export default NavBar;

