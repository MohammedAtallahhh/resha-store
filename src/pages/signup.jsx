import Link from "next/link";
import { useRouter } from "next/router";

import { useState } from "react";

import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

import { useFormik } from "formik";
import { object, string, ref } from "yup";

import styles from "../styles/pages/auth.module.scss";
import axios from "axios";
import Loader from "@/components/Layout/Loader/Loader";

const SignUp = ({ callbackUrl }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const signUpSchema = object().shape({
    name: string()
      .required("Full Name is required")
      .min(3, "Your name must be at least 3 characters long")
      .max(24, `Your name mustn't be more than 24 characters`)
      .matches(
        /^[a-zA-Z ]+$/,
        "Numbers and special characters are not allowed"
      ),

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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: signUpSchema,

    onSubmit: async (values) => {
      try {
        setLoading(true);

        // Making the request to add the user
        const { data } = await axios.post("/api/auth/signup", values);
        setMessage(data.message);

        // adding the session and direct the user to homepage
        const res = await signIn("credentials", {
          ...values,
          redirect: false,
        });

        if (res.ok) {
          router.push(callbackUrl);
          setMessage("Singed in successfully");
        } else {
          setMessage(res.error);
        }
        setLoading(false);
        resetForm();
        //
      } catch (err) {
        setLoading(false);
        setMessage(err.response.data.message);
      }
    },
  });

  return (
    <div className={styles.auth}>
      {loading && <Loader loading={loading} />}
      <div className="container">
        <div className={styles["auth-inner"]}>
          <h2>Sign Up.</h2>
          <p>Get access to one of the best E-shopping services in the world.</p>

          {/* Auth form */}
          <form className={styles["auth-form"]} onSubmit={handleSubmit}>
            <div className={styles["form-group"]}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && touched.name && (
                <p className={styles.error}>{errors.name}</p>
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
              Sign Up
            </button>

            <p className={styles.message}>
              Already have an account?
              <Link
                href={`/signup?callbackUrl=${encodeURIComponent(
                  process.env.NEXT_PUBLIC_BASE_URL + router.asPath
                )}`}
              >
                Sign in
              </Link>
            </p>

            {message && <p>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const { callbackUrl } = context.query;

  if (session) {
    return { redirect: { destination: callbackUrl || "/" } };
  }

  return {
    props: { callbackUrl },
  };
}

export default SignUp;
