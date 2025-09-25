import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./Home.module.css";

function Home() {
return (
    <div className={styles.home}>
    <section
        className={styles.hero}
        style={{
        backgroundImage: "url('https://i.pinimg.com/1200x/8f/73/b3/8f73b33df3c15bfbc5900cecb798ecf4.jpg')",
        }}
    >
        
        <div className={styles.heroContent}>
        <h1>// Las mejores instalaciones del país...</h1>
        <Link to="/agendarturno" className={styles.ctaButton}>
            Saca tu turno
        </Link>
        </div>
    </section>

    <section className={styles.section}>
        <h1>Nuestro Campo</h1>
        <img
            src="https://i.pinimg.com/1200x/2d/9d/93/2d9d93947cb08f1d771e7c6f1b0a4f68.jpg"
            alt="Nuestro campo"
            className={styles.image}
        />
    </section>

    <section className={styles.section}>
        <h1>El Driving Range</h1>
        <p>
            No hace falta sacar turnos, vení y sé parte de nuestro nuevo driving range,
            con la tecnología más avanzada del país para medir tus golpes, con feedback
            instantáneo. Pagás la canasta de pelotas ¡y tenés un entrenador gratis!
        </p>
        <img
            src="https://impx.topgolf.com/SQBEQhdEM0L8eLdzP_OxfvqbsVwVgGFhaPoD6_qKax8/da:0/rt:fill/w:1600/h:900/aHR0cHM6Ly9zMy50b3Bnb2xmLmNvbS9nYWxsZXJ5LzI4NTIwLzIyNTUxX3RnLW1pYW1pZ2FyZGVucy1pbnRlcmlvci10ZWVsaW5lLW5pZ2h0LmpwZw"
            alt="Driving range"
            className={styles.image}
        />
    </section>

    <footer className={styles.footer}>
        <p>
        Turnos disponibles de <strong>Lunes a Viernes de 8:00 a 18:00hs</strong>.
        <br /> Fines de semana son de competición, por lo que no abrimos al público.
        </p>
        <p>
        <span>Driving Range abierto toda la semana</span>
        </p>
    </footer>
    </div>
);
}

export default Home;
