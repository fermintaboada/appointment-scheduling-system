import { useContext } from "react";
import { UsersContext } from "../../context/UserContext";
import Styles from "./Turno.module.css";
import Swal from "sweetalert2";

const formatDate = (dateStr) => {
  if (!dateStr) return dateStr;
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("es-AR", {
    day: "numeric", month: "long", year: "numeric",
  });
};

function Turno({ id, date, time, status, index = 0 }) {
  const { cancelUserApp } = useContext(UsersContext);

  const handleCancel = async () => {
    try {
      await cancelUserApp(id);
      Swal.fire({ icon: "warning", title: "Turno cancelado con éxito" });
    } catch (error) {
      Swal.fire({ icon: "error", title: "No se pudo cancelar el turno. Intentalo más tarde." });
    }
  };

  const isActive = status === "active";

  return (
    <div className={Styles.appointmentCard} style={{ animationDelay: `${index * 0.08}s` }}>
      <div className={Styles.appointmentHeader}>
        <h3>Turno #{id}</h3>
        <span
          className={isActive ? Styles.statusActive : Styles.statusInactive}
          aria-label={isActive ? "Turno activo" : "Turno cancelado"}
        >
          {isActive ? "Activo" : "Cancelado"}
        </span>
      </div>
      <div className={Styles.appointmentDetails}>
        <p><strong>Fecha:</strong> <span>{formatDate(date)}</span></p>
        <p><strong>Hora:</strong> <span>{time}</span></p>
      </div>
      <button
        className={`${Styles.cancelButton} ${!isActive ? Styles.disabled : ""}`}
        onClick={handleCancel}
        disabled={!isActive}
        aria-label={isActive ? `Cancelar turno #${id}` : `Turno #${id} ya cancelado`}
      >
        Cancelar Turno
      </button>
    </div>
  );
}

export default Turno;
