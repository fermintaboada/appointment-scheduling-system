import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>✖</div>
      <h1 className={styles.title}>Error 404</h1>
      <p className={styles.message}>¡Ups! Esta dirección no existe.</p>
      <Link to="/" className={styles.link}>
        Regresar a la página principal
      </Link>
    </div>
  );
}

export default NotFound;
