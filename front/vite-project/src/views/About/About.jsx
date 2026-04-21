import styles from "./About.module.css";

function About() {
return (
    <div className={styles.about}>
    <div className={styles.heroSection}>
        <img
            src="https://i.pinimg.com/1200x/6d/26/88/6d26886b473a2dbb8315d23602b2397a.jpg"
            alt="Golf hero"
        />
    </div>

    <section className={styles.section}>
        <div className={styles.row}>
            <div className={styles.textBlock}>
                <h1>Nuestro Bar</h1>
                <div className={styles.divider}></div>
                <p>
                    Amplia carta de tragos y menús variados para que disfrutes con vistas
                    a nuestro campo. El lugar perfecto para cerrar una buena ronda con amigos.
                </p>
            </div>
            <div className={styles.imageBlock}>
                <img
                    src="https://i.pinimg.com/736x/d6/ca/69/d6ca69afa91ecd8bb0a8995b33a481bb.jpg"
                    alt="Nuestro bar"
                    className={styles.image}
                />
            </div>
        </div>
    </section>

    <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={`${styles.row} ${styles.rowReverse}`}>
            <div className={styles.textBlock}>
                <h1>Pro Shop</h1>
                <div className={styles.divider}></div>
                <p>
                    Contamos con las marcas más reconocidas a nivel mundial, con palos e
                    indumentaria aptas tanto para principiantes como para profesionales.
                    Si todavía no estás seguro si el golf es lo tuyo, también podés
                    alquilar equipos: pedilos directamente en caja.
                </p>
            </div>
            <div className={styles.imageBlock}>
                <img
                    src="https://i.pinimg.com/1200x/2a/b6/27/2ab627aad5b1505d5a1943b79d26b07d.jpg"
                    alt="Pro Shop"
                    className={styles.image}
                />
            </div>
        </div>
    </section>

    <section className={styles.section}>
        <div className={styles.row}>
            <div className={styles.textBlock}>
                <h1>Próximamente...</h1>
                <div className={styles.divider}></div>
                <p>
                    Pensado para vos: un resort con todas las comodidades para que te
                    sientas como un profesional en una gira de competición.
                </p>
            </div>
            <div className={styles.imageBlock}>
                <img
                    src="https://i.pinimg.com/1200x/60/d6/d0/60d6d002b29ded8920fc4062d51bb5b2.jpg"
                    alt="Resort"
                    className={styles.image}
                />
            </div>
        </div>
    </section>
    </div>
);
}

export default About;
