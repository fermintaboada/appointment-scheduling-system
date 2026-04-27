import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <h3 className={styles.footerLogo}>Q-Golf</h3>
          <p className={styles.footerTagline}>
            Una experiencia de juego única, rodeada de naturaleza.
          </p>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerHeading}>Horarios</h4>
          <ul className={styles.footerList}>
            <li><span className={styles.footerLabel}>Campo</span>Lun – Vie · 08:00 a 18:00 hs</li>
            <li><span className={styles.footerLabel}>Driving Range</span>Todos los días · 08:00 a 20:00 hs</li>
            <li><span className={styles.footerLabel}>Fines de semana</span>Solo competición</li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerHeading}>Accesos rápidos</h4>
          <ul className={styles.footerList}>
            <li><Link to="/agendarturno" className={styles.footerLink}>Agendar turno</Link></li>
            <li><Link to="/misturnos" className={styles.footerLink}>Mis turnos</Link></li>
            <li><Link to="/about" className={styles.footerLink}>Instalaciones</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Q-Golf · Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;
