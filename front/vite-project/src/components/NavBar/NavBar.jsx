import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UsersContext } from "../../context/UserContext";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/misturnos", label: "Mis Turnos" },
  { to: "/agendarturno", label: "Agendar Turno" },
  { to: "/about", label: "About" },
];

function NavBar() {
  const { logOutUser, isLogged } = useContext(UsersContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path) => location.pathname === path;
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => { closeMenu(); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    closeMenu();
    Swal.fire({ icon: "success", title: "Sesión cerrada correctamente" });
    logOutUser();
    navigate("/");
  };

  return (
    <nav
      className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}
      aria-label="Navegación principal"
    >
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink} onClick={closeMenu}>Q-GOLF</Link>
      </div>

      <ul className={styles.desktopLinks} role="list">
        {NAV_LINKS.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={`${styles.navLink} ${isActive(to) ? styles.active : ""}`}
              aria-current={isActive(to) ? "page" : undefined}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {isLogged ? (
        <div className={styles.desktopLogout}>
          <button className={styles.logoutBtn} onClick={handleLogout}>Salir</button>
        </div>
      ) : (
        <div className={styles.desktopAuth}>
          <Link to="/login" className={styles.loginBtn}>Iniciar sesión</Link>
          <Link to="/register" className={styles.registerBtn}>Registrarse</Link>
        </div>
      )}

      <button
        className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className={styles.mobileLinks} role="list">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`${styles.mobileNavLink} ${isActive(to) ? styles.mobileActive : ""}`}
                aria-current={isActive(to) ? "page" : undefined}
                tabIndex={menuOpen ? 0 : -1}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.mobileDivider} />
        {isLogged ? (
          <button
            className={styles.mobileLogoutBtn}
            onClick={handleLogout}
            tabIndex={menuOpen ? 0 : -1}
          >
            Cerrar sesión
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className={styles.mobileAuthLink}
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
            >
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className={styles.mobileRegisterLink}
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
            >
              Registrarse
            </Link>
          </>
        )}
      </div>

      {menuOpen && (
        <div className={styles.backdrop} onClick={closeMenu} aria-hidden="true" />
      )}
    </nav>
  );
}

export default NavBar;
