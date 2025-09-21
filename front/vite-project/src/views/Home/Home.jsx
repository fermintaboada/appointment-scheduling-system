import NavBar from "../../components/NavBar/NavBar";
import styles from "./Home.module.css";

function Home() {
return (
    <div className={styles.home}>
    <NavBar />

    <main className={styles.main}>
        <section className={styles.section}>
        <h1>Sobre nosotros</h1>
        <p>
            Las mejores instalaciones para perfeccionar tu técnica, con
            tecnología de vanguardia y los mejores entrenadores del país a tu
            disposición. Desde veteranos a principiantes eligen Q-Golf para ser
            su mejor versión.
        </p>
        </section>

        <section className={styles.section}>
            <h1>Nuestro campo</h1>
            <img
            src="https://impx.topgolf.com/SQBEQhdEM0L8eLdzP_OxfvqbsVwVgGFhaPoD6_qKax8/da:0/rt:fill/w:1600/h:900/aHR0cHM6Ly9zMy50b3Bnb2xmLmNvbS9nYWxsZXJ5LzI4NTIwLzIyNTUxX3RnLW1pYW1pZ2FyZGVucy1pbnRlcmlvci10ZWVsaW5lLW5pZ2h0LmpwZw"
            alt="Nuestro campo de golf"
            className={styles.image}
        />
        </section>
    </main>

    <footer className={styles.footer}>
        <p>
            Turnos disponibles de <strong>Lunes a Viernes de 8:00 a 18:00hs</strong>.  
            Fines de semana son de competición, por lo que no abrimos al público.
        </p>
        <p>
        Teléfono: <span>AGREGAR_NUMERO</span> | Email:{" "}
        <span>AGREGAR_MAIL</span>
        </p>
    </footer>
    </div>
);
}

export default Home;
