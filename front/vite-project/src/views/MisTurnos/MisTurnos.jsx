/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import Turno from "../../components/Turno/Turno";
import styles from "./MisTurnos.module.css";
import { UsersContext } from "../../context/UserContext";


function MisTurnos() {
  const { getUserAppointments, userAppointments } = useContext(UsersContext);

  useEffect(() => {
    getUserAppointments();
  }, []);

  return (
    <div className={styles.contenedor}>
      <div className={styles.contenedorH1}>
        <h1>Mis Turnos</h1>
      </div>

      <div className={styles.containerTurns}>
        { userAppointments?.length > 0 ?  userAppointments.map((app) => {
          return <Turno
              key={app.id}
              id={app.id}
              date={app.date}
              time={app.time}
              status={app.status}
            />
        }) : <h1>No hay turnos para mostrar</h1>
        }
      </div>
    </div>
  );
}

export default MisTurnos;
