import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useReveal } from "../../hooks/useReveal";

function Home() {
  useReveal();

  return (
    <div className={`${styles.home} page-enter`}>
      <section
        className={styles.hero}
        style={{ backgroundImage: "url('https://i.pinimg.com/1200x/8f/73/b3/8f73b33df3c15bfbc5900cecb798ecf4.jpg')" }}
        aria-label="Sección principal"
      >
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Las mejores instalaciones del país</h1>
          <p className={styles.heroSubtitle}>
            Reservá tu turno en el campo y viví una experiencia única rodeado de naturaleza
          </p>
          <Link to="/agendarturno" className={styles.ctaButton}>
            Reservar turno
          </Link>
        </div>
      </section>

      <main>
        <section className={styles.section}>
          <h2 className={`${styles.sectionHeading} reveal`}>Nuestro Campo</h2>
          <p className={`${styles.sectionText} reveal reveal-d1`}>
            18 hoyos de nivel internacional diseñados entre bosques y lagos naturales.
            Un desafío para todos los niveles, desde el jugador ocasional hasta el competidor experimentado.
          </p>
          <div className={`${styles.imageWrapper} reveal reveal-d2`}>
            <img
              src="https://i.pinimg.com/1200x/2d/9d/93/2d9d93947cb08f1d771e7c6f1b0a4f68.jpg"
              alt="Campo de golf de 18 hoyos rodeado de naturaleza"
              className={styles.image}
              loading="lazy"
            />
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <h2 className={`${styles.sectionHeading} reveal`}>El Driving Range</h2>
          <p className={`${styles.sectionText} reveal reveal-d1`}>
            No hace falta sacar turnos, vení y sé parte de nuestro nuevo driving range,
            con la tecnología más avanzada del país para medir tus golpes, con feedback
            instantáneo. Pagás la canasta de pelotas ¡y tenés un entrenador gratis!
          </p>
          <div className={`${styles.imageWrapper} reveal reveal-d2`}>
            <img
              src="https://impx.topgolf.com/SQBEQhdEM0L8eLdzP_OxfvqbsVwVgGFhaPoD6_qKax8/da:0/rt:fill/w:1600/h:900/aHR0cHM6Ly9zMy50b3Bnb2xmLmNvbS9nYWxsZXJ5LzI4NTIwLzIyNTUxX3RnLW1pYW1pZ2FyZGVucy1pbnRlcmlvci10ZWVsaW5lLW5pZ2h0LmpwZw"
              alt="Driving range con tecnología de análisis de golpes"
              className={styles.image}
              loading="lazy"
            />
          </div>
        </section>
      </main>

      <footer className={`${styles.footer} reveal`}>
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
              <li><a href="/agendarturno" className={styles.footerLink}>Agendar turno</a></li>
              <li><a href="/misturnos" className={styles.footerLink}>Mis turnos</a></li>
              <li><a href="/about" className={styles.footerLink}>Instalaciones</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} Q-Golf · Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
