import Link from "next/link";

import styles from "../styles/pages/auth.module.scss";

const Register = () => {
  return (
    <div className={styles.auth}>
      <div className="container">
        <div className={styles["login-inner"]}>
          <h2>Register.</h2>
          <p>Get access to one of the best E-shopping services in the world.</p>

          {/* Login form */}
          <form className={styles["login-form"]}>
            <div className={styles["form-group"]}>
              <input type="text" placeholder="Full Name" />
            </div>
            <div className={styles["form-group"]}>
              <input type="email" placeholder="Email Address" />
            </div>
            <div className={styles["form-group"]}>
              <input type="password" placeholder="Password" />
            </div>
            <div className={styles["form-group"]}>
              <input type="password" placeholder="Confirm Password" />
            </div>

            <button className="btn-primary">Register</button>

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
