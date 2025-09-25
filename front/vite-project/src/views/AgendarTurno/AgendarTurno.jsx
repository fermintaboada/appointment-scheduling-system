import { useFormik } from "formik";
import { dateTimeValidates } from "../../helpers/validates";
import { useContext } from "react";
import { UsersContext } from "../../context/UserContext";
import Swal from "sweetalert2";
import Styles from "./AgendarTurno.module.css";

const AgendarTurno = () => {
  const { createUserApp } = useContext(UsersContext);

  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
    },
    validate: dateTimeValidates,
    onSubmit: async (values) => {
      try {
        await createUserApp(values);
        Swal.fire({
          icon: "success",
          title: "Turno agendado correctamente",
        }) 
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: `${err.response.data.msg}`,
          text: "Intentelo de nuevo",
        });
      } finally {
        formik.resetForm();
      }
    },
  });

  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>Agendar Turno</h1>
      <form className={Styles.form} onSubmit={formik.handleSubmit}>
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
            className={
              formik.touched.date && formik.errors.date
                ? Styles.errorInput
                : Styles.input
            }
          />
          {formik.touched.date && formik.errors.date && (
            <div className={Styles.error}>{formik.errors.date}</div>
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
            className={
              formik.touched.time && formik.errors.time
                ? Styles.errorInput
                : Styles.input
            }
          />
          {formik.touched.time && formik.errors.time && (
            <div className={Styles.error}>{formik.errors.time}</div>
          )}
        </div>

        <button
          type="submit"
          className={Styles.submitButton}
          disabled={Object.keys(formik.errors).length > 0}
        >
          Agendar
        </button>
      </form>
    </div>
  );
};

export default AgendarTurno;
