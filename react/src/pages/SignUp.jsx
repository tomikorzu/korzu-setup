import { useEffect } from "react";
import NavbarMenu from "../components/NavbarMenu.jsx";
import { redirectPage, changePageSetting } from "../utils/mainFunctions.js";
import { User } from "../utils/variables.js";
import { userAlert } from "../utils/mainFunctions.js";

const signUp = () => {
  useEffect(() => {
    changePageSetting("Home - Sign-Up", "../../public/vite.svg");
    const signUpForm = document.getElementById("sign-up-form");
    signUpForm.addEventListener("submit", submitForm);
    const goToSignInBtn = document.getElementById("go-to-sign-in");
    goToSignInBtn.addEventListener("click", (e) => {
      e.preventDefault();
      redirectPage("/signin", "fade-out", 500);
    });
  }, []);

  async function submitForm(e) {
    e.preventDefault();

    const inputUserName = document.getElementById("user-name");
    const inputFullName = document.getElementById("full-name");
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("password");

    const user = new User(
      inputUserName.value,
      inputEmail.value,
      inputPassword.value,
      inputFullName.value
    );

    if (user.verifyAll()) {
      try {
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: inputUserName.value,
            email: inputEmail.value,
            password: inputPassword.value,
            fullname: inputFullName.value,
          }),
        });

        if (response.status === 409) {
          userAlert("alert", "The username or email already exist");
          return;
        }

        redirectPage("/signin", "fade-out", 500);
      } catch (error) {
        console.log("Error during signup:", error.message);
      }
    }
  }

  return (
    <>
      <div className="back-drop">
        <NavbarMenu
          items={[
            { item: "Home", url: "/" },
            { item: "Sign In", url: "/signin" },
            { item: "Sign Up", url: "/signup", active: true },
          ]}
        />
        <main className="fade-in main-center">
          <form
            className="form-class form"
            id="sign-up-form"
          >
            <h2 className="form-title">Sign Up</h2>
            <div className="inputs-container">
              <input
                type="email"
                className="input-form input"
                id="email"
                placeholder="Email"
              />
              <input
                type="text"
                className="input-form input"
                id="user-name"
                placeholder="User Name"
              />
              <input
                type="text"
                className="input-form input"
                id="full-name"
                placeholder="Full Name"
              />
              <input
                type="password"
                className="input-form input"
                id="password"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              id="submit-signUp-btn"
              className="accept-btn form-btn btn"
            >
              Submit
            </button>
            <p className="already-account-p">
              Aleready you have an account?
              <button className="already-account-btn" id="go-to-sign-in">
                Sign In
              </button>
            </p>
          </form>
        </main>
      </div>
    </>
  );
};

export default signUp;
