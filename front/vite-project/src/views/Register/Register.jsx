import { useFormik } from "formik";
import { registerFormValidates } from "../../helpers/validates";
import styles from "./Register.module.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../context/UserContext";

function Register() {
  const { registerUser } = useContext(UsersContext);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthDate: "",
      nDni: "",
      username: "",
      password: "",
      confirmPassword: ""
    },
    validate: registerFormValidates,
    initialErrors: {
      name: "requerido",
      email: "requerido",
      birthDate: "requerido",
      nDni: "requerido",
      username: "requerido",
      password: "requerido",
      confirmPassword: "requerido"
    },
    onSubmit: async (values) => {
      try {
        await registerUser(values);
        Swal.fire({ icon: "success", title: "Cuenta creada correctamente" });
      } catch (err) {
        if (err.response?.data?.msg?.includes("username")) {
          Swal.fire({
            icon: "error",
            title: `El usuario "${formik.values.username}" ya existe`,
            text: "Intentá con otro nombre de usuario"
          });
        } else if (err.response?.data?.msg?.includes("email")) {
          Swal.fire({
            icon: "error",
            title: `El email "${formik.values.email}" ya está registrado`,
            text: "Intentá con otro email"
          });
        } else if (err.response?.data?.msg?.includes("birthDate")) {
          Swal.fire({
            icon: "error",
            title: "Fecha de nacimiento inválida",
            text: "Revisá la fecha ingresada"
          });
        } else if (err.response?.data?.msg?.includes("nDni")) {
          Swal.fire({
            icon: "error",
            title: `El DNI "${formik.values.nDni}" ya está registrado`,
            text: "Intentá con otro número de documento"
          });
        }
      }
    }
  });

  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit} noValidate>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Crear cuenta</h2>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="name">Nombre</label>
          <input
            id="name"
            className={styles.formInput}
            type="text"
            name="name"
            placeholder="Tu nombre completo"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            aria-invalid={!!formik.errors.name}
            aria-describedby={formik.errors.name ? "error-name" : undefined}
            autoComplete="name"
          />
          {formik.errors.name && (
            <p id="error-name" className={styles.errorLabel} role="alert">
              {formik.errors.name}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="email">Email</label>
          <input
            id="email"
            className={styles.formInput}
            type="email"
            name="email"
            placeholder="mail@mail.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            aria-invalid={!!formik.errors.email}
            aria-describedby={formik.errors.email ? "error-email" : undefined}
            autoComplete="email"
          />
          {formik.errors.email && (
            <p id="error-email" className={styles.errorLabel} role="alert">
              {formik.errors.email}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="birthDate">Fecha de nacimiento</label>
          <input
            id="birthDate"
            className={styles.formInput}
            type="date"
            name="birthDate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.birthDate}
            aria-invalid={!!formik.errors.birthDate}
            aria-describedby={formik.errors.birthDate ? "error-birthDate" : undefined}
            autoComplete="bday"
          />
          {formik.errors.birthDate && (
            <p id="error-birthDate" className={styles.errorLabel} role="alert">
              {formik.errors.birthDate}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="nDni">N° de DNI</label>
          <input
            id="nDni"
            className={styles.formInput}
            type="text"
            name="nDni"
            placeholder="12345678"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nDni}
            aria-invalid={!!formik.errors.nDni}
            aria-describedby={formik.errors.nDni ? "error-nDni" : undefined}
            inputMode="numeric"
          />
          {formik.errors.nDni && (
            <p id="error-nDni" className={styles.errorLabel} role="alert">
              {formik.errors.nDni}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="username">Usuario</label>
          <input
            id="username"
            className={styles.formInput}
            type="text"
            name="username"
            placeholder="Tu nombre de usuario"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            aria-invalid={!!formik.errors.username}
            aria-describedby={formik.errors.username ? "error-username" : undefined}
            autoComplete="username"
          />
          {formik.errors.username && (
            <p id="error-username" className={styles.errorLabel} role="alert">
              {formik.errors.username}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="password">Contraseña</label>
          <input
            id="password"
            className={styles.formInput}
            type="password"
            name="password"
            placeholder="Mínimo 8 caracteres"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            aria-invalid={!!formik.errors.password}
            aria-describedby={formik.errors.password ? "error-password" : undefined}
            autoComplete="new-password"
          />
          {formik.errors.password && (
            <p id="error-password" className={styles.errorLabel} role="alert">
              {formik.errors.password}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="confirmPassword">Confirmá tu contraseña</label>
          <input
            id="confirmPassword"
            className={styles.formInput}
            type="password"
            name="confirmPassword"
            placeholder="Repetí tu contraseña"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            aria-invalid={!!formik.errors.confirmPassword}
            aria-describedby={formik.errors.confirmPassword ? "error-confirmPassword" : undefined}
            autoComplete="new-password"
          />
          {formik.errors.confirmPassword && (
            <p id="error-confirmPassword" className={styles.errorLabel} role="alert">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          className={styles.formButton}
          type="submit"
          disabled={
            Object.keys(formik.errors).length > 0 ||
            !formik.values.name ||
            !formik.values.email ||
            !formik.values.birthDate ||
            !formik.values.nDni ||
            !formik.values.username ||
            !formik.values.password ||
            !formik.values.confirmPassword
          }
        >
          Registrarse
        </button>

        <p className={styles.loginLabel}>
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
        </p>
      </div>
    </form>
  );
}

export default Register;
