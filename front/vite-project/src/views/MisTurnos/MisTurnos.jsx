import { useState, useEffect } from "react";
import Turno from "../../components/Turno/Turno";
import styles from "./MisTurnos.module.css";
import axios from "axios";

function MisTurnos() {
  const [app, setApp] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/appointments')
      .then((data)=>{
        setApp(data.data.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className={styles.contenedor}>
      <div className={styles.contenedorH1}>
        <h1>Mis Turnos</h1>
      </div>

      <div className={styles.containerTurns}>
        {app.length > 0 ? (
          app.map((app) => (
            <Turno
              key={app.id}
              id={app.id}
              date={app.date}
              time={app.time}
              status={app.status}
            />
          ))
        ) : <h1>No hay turnos para mostrar</h1>
        }
      </div> 
    </div>
  );
}

export default MisTurnos;
