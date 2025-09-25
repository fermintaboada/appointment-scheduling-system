import { useFormik } from "formik";
import { registerFormValidates } from "../../helpers/validates";
import styles from "./Register.module.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../context/UserContext";

function Register() {
  
  const {registerUser} =  useContext(UsersContext)
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthDate: "",  
      nDni: "",
      username: "",
      password: ""
    },
    validate: registerFormValidates,
    initialErrors: {
      name: "Name is required",
      email: "Email is required",
      birthDate: "BirthDate is required", 
      nDni: "nDni is required",
      username: "Username is required",
      password: "Password is required"
    },
    onSubmit: async (values) => {
      try {
        await registerUser(values)
        Swal.fire({
          icon: "success",
          title:"El usuario fue creado correctamente"   
        })
      } catch(err) {
          if (err.response?.data?.msg.includes("username")) {
          Swal.fire({
            icon: "error",
            title: `Ya existe un usuario con el username: ${formik.values.username}`,
            text: "Intente de nuevo con otro username"
          })
        }

        if (err.response?.data?.msg.includes("email")) {
          Swal.fire({
            icon: "error",
            title: `Ya existe un usuario con el email: ${formik.values.email}`,
            text: "Intente de nuevo con otro email"
          })
        }

        if (err.response?.data?.msg.includes("birthDate")) {
          Swal.fire({
            icon: "error",
            title: `Fecha de nacimiento inválida: ${formik.values.birthDate}`,
            text: "Intente de nuevo con otra fecha"
          })
        }

        if (err.response?.data?.msg.includes("nDni")) {
          Swal.fire({
            icon: "error",
            title: `Ya existe un usuario con el DNI: ${formik.values.nDni}`,
            text: "Intente de nuevo con otro número de documento"
          })
        }
      }
    }
  });

  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
      <h2 className={styles.formTitle}>Formulario De Registro</h2>

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

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Fecha de nacimiento:</label>
        <input
          className={styles.formInput}
          type="date"
          name="birthDate"  
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.birthDate}  
        />
        {formik.errors.birthDate && (       
          <label className={styles.errorLabel}>{formik.errors.birthDate}</label>
        )}
      </div>

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
          !formik.values.password
        }
      >
        Registrarse
      </button>
      <br/>
      <label className={styles.loginLabel}>
        ¿Ya tienes cuenta? <Link to="/login"> Login</Link>
      </label>
    </form>
  );
}

export default Register;
