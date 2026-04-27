import { useFormik } from "formik";
import { dateTimeValidates } from "../../helpers/validates";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UsersContext } from "../../context/UserContext";
import Swal from "sweetalert2";
import Styles from "./AgendarTurno.module.css";
import Footer from "../../components/Footer/Footer";

const POLITICA = [
  "Solo días hábiles — lunes a viernes",
  "Horario disponible: 08:00 a 18:00 hs",
  "Mínimo 24 horas de anticipación",
  "Un turno activo por vez",
];

const AgendarTurno = () => {
  const { createUserApp, isLogged } = useContext(UsersContext);

  const formik = useFormik({
    initialValues: { date: "", time: "" },
    validate: dateTimeValidates,
    onSubmit: async (values) => {
      try {
        await createUserApp(values);
        Swal.fire({ icon: "success", title: "Turno agendado correctamente" });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: err.response?.data?.msg ?? "No se pudo agendar el turno",
          text: "Intentalo de nuevo",
        });
      } finally {
        formik.resetForm();
      }
    },
  });

  if (!isLogged) {
    return (
      <>
        <div className={Styles.container}>
          <h1 className={Styles.title}>Agendar Turno</h1>
          <div className={Styles.policy} role="note" aria-label="Política de turnos">
            <p className={Styles.policyTitle}>Antes de reservar</p>
            <ul className={Styles.policyList}>
              {POLITICA.map((texto) => (
                <li key={texto} className={Styles.policyItem}>{texto}</li>
              ))}
            </ul>
          </div>
          <div className={Styles.loginPromptCard}>
            <p className={Styles.loginPromptText}>
              Necesitás una cuenta para reservar un turno en Q-Golf.
            </p>
            <div className={Styles.loginPromptActions}>
              <Link to="/login" className={Styles.loginPromptBtn}>Iniciar sesión</Link>
              <Link to="/register" className={Styles.loginPromptSecondary}>Registrarse</Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
    <div className={Styles.container}>
      <h1 className={Styles.title}>Agendar Turno</h1>

      <div className={Styles.policy} role="note" aria-label="Política de turnos">
        <p className={Styles.policyTitle}>Antes de reservar</p>
        <ul className={Styles.policyList}>
          {POLITICA.map((texto) => (
            <li key={texto} className={Styles.policyItem}>{texto}</li>
          ))}
        </ul>
      </div>

      <form className={Styles.form} onSubmit={formik.handleSubmit} noValidate>
        <div className={Styles.formGroup}>
          <label htmlFor="date">Fecha</label>
          <input
            id="date"
            name="date"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
            className={formik.touched.date && formik.errors.date ? Styles.errorInput : Styles.input}
            aria-invalid={formik.touched.date && !!formik.errors.date}
            aria-describedby={formik.touched.date && formik.errors.date ? "error-date" : undefined}
          />
          {formik.touched.date && formik.errors.date && (
            <p id="error-date" className={Styles.error} role="alert">{formik.errors.date}</p>
          )}
        </div>

        <div className={Styles.formGroup}>
          <label htmlFor="time">Hora</label>
          <input
            id="time"
            name="time"
            type="time"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.time}
            className={formik.touched.time && formik.errors.time ? Styles.errorInput : Styles.input}
            aria-invalid={formik.touched.time && !!formik.errors.time}
            aria-describedby={formik.touched.time && formik.errors.time ? "error-time" : undefined}
          />
          {formik.touched.time && formik.errors.time && (
            <p id="error-time" className={Styles.error} role="alert">{formik.errors.time}</p>
          )}
        </div>

        <button
          type="submit"
          className={Styles.submitButton}
          disabled={formik.isSubmitting}
        >
          Confirmar turno
        </button>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default AgendarTurno;
