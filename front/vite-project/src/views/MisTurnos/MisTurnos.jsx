/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Turno from "../../components/turno/Turno";
import styles from "./MisTurnos.module.css";
import { UsersContext } from "../../context/UserContext";


function MisTurnos() {
  const { getUserAppointments, userAppointments } = useContext(UsersContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserAppointments().finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.contenedor}>
      <div className={styles.contenedorH1}>
        <h1>Mis Turnos</h1>
      </div>

      {loading ? (
        <div className={styles.inlineLoader}>
          <div className={styles.spinner} />
          <p className={styles.loadingText}>Cargando turnos...</p>
        </div>
      ) : (
        <div className={styles.containerTurns}>
          {userAppointments?.length > 0 ? userAppointments.map((app) => (
            <Turno
              key={app.id}
              id={app.id}
              date={app.date}
              time={app.time}
              status={app.status}
            />
          )) : (
            <div className={styles.emptyState}>
              <p>No tenés turnos agendados aún.</p>
              <Link to="/agendarturno" className={styles.emptyStateBtn}>
                Agendar un turno
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MisTurnos;
