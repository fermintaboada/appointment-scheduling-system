import styles from "./NavBar.module.css";

function NavBar() {
return (
    <nav className={styles.navbar}>
    <div className={styles.logo}>
        <h2>Q-GOLF</h2>
    </div>
    <div className={styles.links}>
        <span>HOME</span>
        <span>LOGIN</span>
        <span>MIS TURNOS</span>
        <span>SACAR TURNO</span>
        <span>ABOUT</span>
    </div>
    </nav>
        );
}

export default NavBar;
