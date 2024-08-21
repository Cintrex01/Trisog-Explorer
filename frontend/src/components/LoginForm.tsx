import { useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import styles from './LoginForm.module.css'

const LoginForm = () => {

    const [isSigning, setIsSigning] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [signInError, setSignInError] = useState<string>("");


    const signMode = () => {
        setIsSigning(!isSigning);
      };

  return (
    <section className={styles.loginSection}>
      <div className={styles.signInContainer}>
        <div className={styles.loginHeader}>
          <h1>Trisog Travel Agency</h1>
        </div>

        <form
          className={styles.loginForm}
        >
          <h2>{isSigning ? "SIGN UP" : "SIGN IN"}</h2>
          <p>
            {isSigning
              ? "Create your account"
              : "Enter your credentials to access your account"}
          </p>
          {errorMessage && <span className={styles.errors}>{errorMessage}</span>}
          {signInError && <span className={styles.errors}>{signInError}</span>}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className={`inputBase ${emailError ? "inputError" : ""}`}
          />
          {emailError && <span className={styles.errors}>{emailError}</span>}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className={`inputBase ${passwordError ? "inputError" : ""}`}
          />
          {passwordError && <span className={styles.errors}>{passwordError}</span>}
          <button type="submit" className={styles.signInButton}>
            {isSigning ? "SIGN UP" : "SIGN IN"}
          </button>
          <div className={styles.switch}>
            <a
              className={styles.signUpA}
              onClick={(e) => {
                e.preventDefault();
                signMode();
              }}
            >
              {isSigning
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </a>
          </div>
          <p style={isSigning ? { display: "none" } : {}}>OR</p>
          <button
            disabled={isSigning}
            className={styles.googleButton}
          >
            <FaGoogle className={styles.googleIcon} />{" "}
            <span>SIGN IN WITH GOOGLE</span>
          </button>
          <button
            disabled={isSigning}
            className={styles.facebookButton}
          >
            <FaFacebookF className={styles.facebookIcon} />{" "}
            <span>SIGN IN WITH FACEBOOK</span>
          </button>
        </form>
      </div>
    </section>
  )
}

export default LoginForm