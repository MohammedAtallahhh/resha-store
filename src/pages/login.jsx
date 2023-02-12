import Link from "next/link";

import { getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";

import { Field, Form, Formik } from "formik";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import styles from "../styles/pages/auth.module.scss";
import { authOptions } from "./api/auth/[...nextauth]";
import { object, string } from "yup";

const Login = ({ providers }) => {
  // Login schema
  const loginSchema = object({
    email: string().required("Email is required.").email("Invalid email"),
    password: string().required("Password is required."),
  });

  // Login with providers
  const handleLogin = async (providerId) => {
    try {
      await signIn(providerId);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className={styles.auth}>
      <div className="container">
        <div className={styles["login-inner"]}>
          <h2>Login.</h2>
          <p>Get access to one of the best E-shopping services in the world.</p>

          {/* Login form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              resetForm();
            }}
            validationSchema={loginSchema}
          >
            {({ errors, touched }) => (
              <Form className={styles["login-form"]}>
                {/* Form group */}
                <div className={styles["form-group"]}>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email Address"
                  />

                  {errors.email && touched.email && (
                    <p className={styles.error}>{errors.email}</p>
                  )}
                </div>

                {/* Form group */}
                <div className={styles["form-group"]}>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  {errors.password && touched.password && (
                    <p className={styles.error}>{errors.password}</p>
                  )}
                  <Link
                    href="/forget-password"
                    className={styles["forget-password"]}
                  >
                    Forget password?
                  </Link>
                </div>

                <button className="btn-primary" type="submit">
                  Login
                </button>

                <p className={styles.message}>
                  Don&apos;t have and account?
                  <Link href="/register">Register</Link>
                </p>
              </Form>
            )}
          </Formik>

          <div className={styles.line}></div>

          {/* Login providers */}
          <div className={styles.providers}>
            {Object.values(providers).map((provider) => (
              <button
                key={provider.id}
                onClick={() => handleLogin(provider.id)}
              >
                {provider.name === "Google" ? <FcGoogle /> : null}
                {provider.name === "GitHub" ? <AiFillGithub /> : null}
                Login with {provider.name}
              </button>
            ))}
          </div>
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

  const providers = await getProviders(context);

  return {
    props: { providers: Object.values(providers) ?? [] },
  };
}

export default Login;
