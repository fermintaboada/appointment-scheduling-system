import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.code}>404</div>
      <div className={styles.divider} />
      <h1 className={styles.title}>Página no encontrada</h1>
      <p className={styles.message}>La dirección que buscás no existe o fue removida.</p>
      <Link to="/" className={styles.link}>
        Regresar a la página principal
      </Link>
    </div>
  );
}

export default NotFound;
