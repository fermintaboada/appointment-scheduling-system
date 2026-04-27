import { useFormik } from 'formik';
import styles from './Login.module.css';
import { loginFormValidates } from '../../helpers/validates';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UsersContext } from '../../context/UserContext';

function Login() {
  const { loginUser } = useContext(UsersContext);
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validate: loginFormValidates,
    initialErrors: {
      username: "El usuario es requerido",
      password: "La contraseña es requerida"
    },
    onSubmit: (values) => {
      loginUser(values)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({ icon: 'success', title: "Sesión iniciada correctamente" });
          }
        })
        .catch((err) => {
          if (err.response?.status === 400) {
            Swal.fire({
              icon: 'error',
              title: err.response.data.msg,
              text: "Intentá nuevamente"
            });
          }
        });
    }
  });

  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit} noValidate>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Iniciar Sesión</h2>

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
            placeholder="Tu contraseña"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            aria-invalid={!!formik.errors.password}
            aria-describedby={formik.errors.password ? "error-password" : undefined}
            autoComplete="current-password"
          />
          {formik.errors.password && (
            <p id="error-password" className={styles.errorLabel} role="alert">
              {formik.errors.password}
            </p>
          )}
        </div>

        <button
          className={styles.formButton}
          type="submit"
          disabled={
            Object.keys(formik.errors).length > 0 ||
            !formik.values.username ||
            !formik.values.password
          }
        >
          Iniciar Sesión
        </button>

        <p className={styles.registerLabel}>
          ¿No tenés cuenta? <Link to="/register">Registrate</Link>
        </p>
      </div>
    </form>
  );
}

export default Login;
