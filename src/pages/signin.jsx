import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";

import { Field, Form, Formik } from "formik";
import { object, string } from "yup";

import Loader from "@/components/Layout/Loader/Loader";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import styles from "../styles/pages/auth.module.scss";

const SignIn = ({ providers, callbackUrl }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // SignIn schema
  const SignInSchema = object({
    email: string().required("Email is required.").email("Invalid email"),
    password: string().required("Password is required."),
  });

  // SignIn with providers
  const handleSignIn = async (providerId) => {
    try {
      await signIn(providerId);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className={styles.auth}>
      {/* Loader */}
      {loading && <Loader loading={loading} />}
      <div className="container">
        <div className={styles["auth-inner"]}>
          <h2>Sign In.</h2>
          <p>Get access to one of the best E-shopping services in the world.</p>

          {/* SignIn form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={SignInSchema}
            onSubmit={async (values, { resetForm }) => {
              setLoading(true);

              const res = await signIn("credentials", {
                ...values,
                redirect: false,
              });

              if (res.ok) {
                resetForm();
                router.push(callbackUrl || "/");
                setMessage("Singed in successfully");
              }
              setMessage(res.error);
              setLoading(false);
            }}
          >
            {({ errors, touched }) => (
              <Form className={styles["auth-form"]}>
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
                  SignIn
                </button>

                <p className={styles.message}>
                  Don&apos;t have and account?
                  <Link
                    href={`/signup?callbackUrl=${encodeURIComponent(
                      process.env.NEXT_PUBLIC_BASE_URL + router.asPath
                    )}`}
                  >
                    Sign Up
                  </Link>
                </p>

                {message && <p>{message}</p>}
              </Form>
            )}
          </Formik>

          <div className={styles.line}></div>

          {/* SignIn providers */}
          <div className={styles.providers}>
            {Object.values(providers).map((provider) =>
              provider.name === "Credentials" ? null : (
                <button
                  key={provider.id}
                  onClick={() => handleSignIn(provider.id)}
                >
                  {provider.name === "Google" ? <FcGoogle /> : null}
                  {provider.name === "GitHub" ? <AiFillGithub /> : null}
                  Sign In with {provider.name}
                </button>
              )
            )}
          </div>
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

  const providers = await getProviders(context);

  return {
    props: {
      providers: Object.values(providers) ?? [],
      callbackUrl: callbackUrl || "",
    },
  };
}

export default SignIn;
