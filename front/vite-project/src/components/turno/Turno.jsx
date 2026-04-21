import { useContext } from "react";
import { UsersContext } from "../../context/UserContext";
import Styles from "./Turno.module.css";
import Swal from "sweetalert2"

function Turno({ id, date, time, status }) {

    const { cancelUserApp } = useContext(UsersContext)

    const handleCancel = async() => {
        try {
            await cancelUserApp(id)
            Swal.fire({
                icon: "warning",
                color:"red",
                title: "Turno cancelado con exito"
            })
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al cancelar el turno, intentelo mas tarde"
            })
        }
    }

    return (
    <div className={Styles.appointmentCard}>
    <div className={Styles.appointmentHeader}>
        <h3>Turno #{id}</h3>
        <span className={status === "active" ? Styles.statusActive : Styles.statusInactive}>
            {status === "active" ? "Activo" : "Cancelado"}
        </span>
    </div>
    <div className={Styles.appointmentDetails}>
        <p><strong>Fecha:</strong> <span>{date}</span></p>
        <p><strong>Hora:</strong> <span>{time}</span> </p>
    </div>
    <button
        className={`${Styles.cancelButton} ${
            status === "cancelled" ? Styles.disabled : ""
        }`}
        onClick={handleCancel}
        disabled={status === "cancelled"}
        >
        Cancelar Turno
    </button>
    </div>
);
}

export default Turno;
