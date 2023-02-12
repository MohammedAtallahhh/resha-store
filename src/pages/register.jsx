import Link from "next/link";

import { useFormik } from "formik";
import { object, string, ref } from "yup";

import styles from "../styles/pages/auth.module.scss";

const Register = () => {
  const registerSchema = object().shape({
    fullName: string().required("Full Name is required."),
    email: string().required("Email is required.").email("Invalid email."),
    password: string().required("Password is required."),
    confirmPassword: string()
      .required("Confirm Password")
      .oneOf([ref("password"), null], "Passwords must match"),
  });

  const {
    values,
    handleChange,
    handleSubmit,
    resetForm,
    errors,
    isSubmitting,
    touched,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: registerSchema,

    onSubmit: (values) => {
      console.log({ values });
      resetForm();
    },
  });

  return (
    <div className={styles.auth}>
      <div className="container">
        <div className={styles["login-inner"]}>
          <h2>Register.</h2>
          <p>Get access to one of the best E-shopping services in the world.</p>

          {/* Login form */}
          <form className={styles["login-form"]} onSubmit={handleSubmit}>
            <div className={styles["form-group"]}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={values.fullName}
                onChange={handleChange}
              />
              {errors.fullName && touched.fullName && (
                <p className={styles.error}>{errors.fullName}</p>
              )}
            </div>
            <div className={styles["form-group"]}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={values.email}
                onChange={handleChange}
              />

              {errors.email && touched.email && (
                <p className={styles.error}>{errors.email}</p>
              )}
            </div>
            <div className={styles["form-group"]}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />

              {errors.password && touched.password && (
                <p className={styles.error}>{errors.password}</p>
              )}
            </div>
            <div className={styles["form-group"]}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
              />

              {errors.confirmPassword && touched.confirmPassword && (
                <p className={styles.error}>{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              Register
            </button>

            <p className={styles.message}>
              Already have an account?
              <Link href="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
