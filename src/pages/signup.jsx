import Link from "next/link";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

import { useFormik } from "formik";
import { object, string, ref } from "yup";

import styles from "../styles/pages/auth.module.scss";

const SignUp = () => {
  const signUpSchema = object().shape({
    fullName: string()
      .required("Full Name is required")
      .min(3, "Your name must be at least 3 characters long")
      .max(16, `Your name mustn't be more than 16 characters`)
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed"),

    email: string().required("Email is required").email("Invalid email"),
    password: string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long."),
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

    validationSchema: signUpSchema,

    onSubmit: (values) => {
      console.log({ values });
      resetForm();
    },
  });

  return (
    <div className={styles.auth}>
      <div className="container">
        <div className={styles["auth-inner"]}>
          <h2>Sign Up.</h2>
          <p>Get access to one of the best E-shopping services in the world.</p>

          {/* Auth form */}
          <form className={styles["auth-form"]} onSubmit={handleSubmit}>
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
              signUp
            </button>

            <p className={styles.message}>
              Already have an account?
              <Link href="/signin">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  return {
    props: {},
  };
}

export default SignUp;
