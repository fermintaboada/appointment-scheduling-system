/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Turno from "../../components/turno/Turno";
import Footer from "../../components/Footer/Footer";
import styles from "./MisTurnos.module.css";
import { UsersContext } from "../../context/UserContext";

function MisTurnos() {
  const { getUserAppointments, userAppointments, isLogged } = useContext(UsersContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLogged) { setLoading(false); return; }
    getUserAppointments().finally(() => setLoading(false));
  }, []);

  if (!isLogged) {
    return (
      <>
        <div className={styles.contenedor}>
          <div className={styles.contenedorH1}><h1>Mis Turnos</h1></div>
          <div className={styles.loginPrompt}>
            <p className={styles.loginPromptText}>
              Necesitás iniciar sesión para ver y gestionar tus turnos.
            </p>
            <div className={styles.loginPromptActions}>
              <Link to="/login" className={styles.emptyStateBtn}>Iniciar sesión</Link>
              <Link to="/register" className={styles.loginPromptSecondary}>Registrarse</Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className={styles.contenedor}>
        <div className={styles.contenedorH1}>
          <h1>Mis Turnos</h1>
        </div>

        {loading ? (
          <div className={styles.inlineLoader}>
            <div className={styles.spinner} />
            <p className={styles.loadingText}>Cargando turnos...</p>
          </div>
        ) : (() => {
          const today = new Date().toISOString().split("T")[0];
          const vigentes = (userAppointments ?? [])
            .filter(a => a.status === "active" && a.date >= today)
            .sort((a, b) => a.date.localeCompare(b.date));
          const previos = (userAppointments ?? [])
            .filter(a => a.status !== "active" || a.date < today)
            .sort((a, b) => b.date.localeCompare(a.date));

          return (
            <>
              <div className={styles.section}>
                <div className={styles.sectionLabelWrapper}><span className={styles.sectionLabel}>Turnos vigentes</span></div>
                {vigentes.length > 0 ? (
                  <div className={styles.containerTurns}>
                    {vigentes.map((app, i) => (
                      <Turno key={app.id} id={app.id} date={app.date} time={app.time} status={app.status} index={i} />
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <p>No tenés turnos agendados aún.</p>
                    <Link to="/agendarturno" className={styles.emptyStateBtn}>Agendar un turno</Link>
                  </div>
                )}
              </div>

              {previos.length > 0 && (
                <div className={styles.section}>
                  <div className={styles.sectionLabelWrapper}><span className={styles.sectionLabel}>Turnos previos</span></div>
                  <div className={styles.containerTurns}>
                    {previos.map((app, i) => (
                      <Turno key={app.id} id={app.id} date={app.date} time={app.time} status={app.status} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </>
          );
        })()}
      </div>
      <Footer />
    </>
  );
}

export default MisTurnos;
