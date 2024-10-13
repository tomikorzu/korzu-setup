import { useEffect } from "react";
import NavbarMenu from "../components/NavbarMenu.jsx";
import { redirectPage } from "../utils/mainFunctions.js";

const SignIn = () => {
  useEffect(() => {
    document.title = "Home - Sign-In";
    const goToSignUpBtn = document.getElementById("go-to-sign-up");
    goToSignUpBtn.addEventListener("click", (e) => {
      e.preventDefault();
      redirectPage("/signup", "fade-out", 500);
    });
    const inputUserNameAndEmail = document.getElementById("email-username");
    const inputPassword = document.getElementById("password");
    const submitSigninBtn = document.getElementById("submit-signin-btn");
    submitSigninBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (
        formFunctions.verifyUserName(inputUserNameAndEmail.value) &&
        formFunctions.verifyPassword(inputPassword.value)
      ) {
        console.log("All inputs are correct");
      }
    });
  }, []);
  return (
    <>
      <div className="back-drop">
        <NavbarMenu
          items={[
            { item: "Home", url: "/" },
            { item: "Sign Up", url: "/signup" },
          ]}
        />
        <main className="fade-in">
          <form className="form-class" id="sign-in-form">
            <h2 className="form-title">Sign In</h2>
            <div className="inputs-container">
              <input
                type="text"
                className="input-form"
                id="email-username"
                placeholder="Email or User Name"
              />
              <input
                type="password"
                className="input-form"
                id="password"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              id="submit-signin-btn"
              className="accept-btn form-btn"
            >
              Submit
            </button>
            <p className="already-account-p">
              Aleready you don't have an account?
              <button className="already-account-btn" id="go-to-sign-up">
                Sign up
              </button>
            </p>
          </form>
        </main>
      </div>
    </>
  );
};

export default SignIn;
