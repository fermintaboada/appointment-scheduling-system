import { useFormik } from "formik";
import { registerFormValidates } from "../../helpers/validates";
import styles from "./Register.module.css";
import axios from "axios";
import Swal from "sweetalert2";

function Register() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthDate: "",  // 👈 Ahora con D mayúscula
      nDni: "",
      username: "",
      password: ""
    },
    validate: registerFormValidates,
    initialErrors: {
      name: "Name is required",
      email: "Email is required",
      birthDate: "BirthDate is required", // 👈 también aquí
      nDni: "nDni is required",
      username: "Username is required",
      password: "Password is required"
    },
    onSubmit: (values) => {
      console.log("Payload enviado:", values);

      axios
        .post("http://localhost:3000/users/register", values)
        .then((res) => {
          console.log(res);
          Swal.fire(
            "Registro exitoso",
            "El usuario fue creado correctamente",
            "success"
          );
        })
        .catch((err) => {
          console.error(err);
          Swal.fire("Error", "No se pudo registrar el usuario", "error");
        });
    }
  });

  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
      <h2 className={styles.formTitle}>Formulario De Registro</h2>

      {/* NAME */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Nombre:</label>
        <input
          className={styles.formInput}
          type="text"
          name="name"
          placeholder="Tu nombre"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.errors.name && (
          <label className={styles.errorLabel}>{formik.errors.name}</label>
        )}
      </div>

      {/* EMAIL */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Email:</label>
        <input
          className={styles.formInput}
          type="text"
          name="email"
          placeholder="mail@mail.com"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email && (
          <label className={styles.errorLabel}>{formik.errors.email}</label>
        )}
      </div>

      {/* BIRTHDATE */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Fecha de nacimiento:</label>
        <input
          className={styles.formInput}
          type="date"
          name="birthDate"  // 👈 con D mayúscula
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.birthDate}  // 👈 con D mayúscula
        />
        {formik.errors.birthDate && (       // 👈 con D mayúscula
          <label className={styles.errorLabel}>{formik.errors.birthDate}</label>
        )}
      </div>

      {/* DNI */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>nDni:</label>
        <input
          className={styles.formInput}
          type="text"
          name="nDni"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nDni}
        />
        {formik.errors.nDni && (
          <label className={styles.errorLabel}>{formik.errors.nDni}</label>
        )}
      </div>

      {/* USERNAME */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Username:</label>
        <input
          className={styles.formInput}
          type="text"
          name="username"
          placeholder="Tu nombre de usuario"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.errors.username && (
          <label className={styles.errorLabel}>{formik.errors.username}</label>
        )}
      </div>

      {/* PASSWORD */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Password:</label>
        <input
          className={styles.formInput}
          type="password"
          name="password"
          placeholder="********"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.errors.password && (
          <label className={styles.errorLabel}>{formik.errors.password}</label>
        )}
      </div>

      {/* SUBMIT */}
      <button
        className={styles.formButton}
        type="submit"
        disabled={
          Object.keys(formik.errors).length > 0 ||
          !formik.values.name ||
          !formik.values.email ||
          !formik.values.birthDate || // 👈 con D mayúscula
          !formik.values.nDni ||
          !formik.values.username ||
          !formik.values.password
        }
      >
        Registrarse
      </button>
    </form>
  );
}

export default Register;
