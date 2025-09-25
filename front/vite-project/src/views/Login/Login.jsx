import { useFormik } from 'formik';
import styles from './Login.module.css';
import { loginFormValidates } from '../../helpers/validates';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UsersContext } from '../../context/UserContext';


function Login(){

    const {loginUser} = useContext(UsersContext)
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
    validate:loginFormValidates,
    initialErrors: {
        username: "El username es requerido",
        password: "La contraseña es requerida"
    },
    onSubmit: (values) => {
        loginUser(values)
        .then((res) => {
            if(res.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: "Usuario logueado correctamente"
                })
            }           
        })
        .catch((err) => {
            if(err.status === 400){
                Swal.fire({
                    icon: 'error',
                    title: `${err.response.data.msg}`,
                    text: "Intenta nuevamente"
                })
            }
        })

    }
    })
    return(
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
    <h2 className={styles.formTitle}>Formulario De Login</h2>

    <div className={styles.formGroup}>
        <label className={styles.formLabel}>Username:</label>
        <input
        className={styles.formInput}
        type="text"
        name="username"
        placeholder="Tu nombre de usuario"
        onChange={formik.handleChange}
        />
        {formik.errors.username && formik.errors.username ? (
        <label className={styles.errorLabel}>
        {formik.errors.username}
        </label>
        ) : null}
    </div>

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
    {formik.errors.password && formik.errors.password ? (
        <label className={styles.errorLabel}>
        {formik.errors.password}
        </label>
        ) : null}
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
        Submit
    </button>
    <br/>
    <label className={styles.registerLabel}>
        No tienes cuenta? <Link to="/register"> Registrate</Link>
    </label>
    </form>

    )
}

export default Login