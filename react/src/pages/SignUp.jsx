import { useEffect, useState } from "react";
import NavbarMenu from "../components/NavbarMenu.jsx";
import { redirectPage, applyBlur } from "../utils/mainFunctions.js";
import DesplegableMenu from "../components/DesplegableMenu.jsx";
import { User } from "../utils/variables.js";
import { userAlert } from "../utils/mainFunctions.js";

const signUp = () => {
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    applyBlur();
  }, [showMenu]);
  useEffect(() => {
    document.title = "Home - Sign-Up";
    const goToSignInBtn = document.getElementById("go-to-sign-in");
    goToSignInBtn.addEventListener("click", (e) => {
      e.preventDefault();
      redirectPage("/signin", "fade-out", 500);
    });
  }, []);

  const handleSignUp = async (e) => {
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

        if (!response.ok) {
          const errorData = await response.json();

          if (response.status === 409) {
            userAlert("alert", "The username or email already exist");
            return;
          }

          throw new Error(errorData.message || "Error during signup");
        }

        redirectPage("/signin", "fade-out", 500);
      } catch (error) {
        console.log("Error during signup:", error.message);
      }
    }
  };

  return (
    <>
      <button id="clckk" style={{ position: "fixed", top: "0" }}>
        Click
      </button>
      {showMenu ? (
        <DesplegableMenu
          title="Menu"
          buttons={[
            { text: "", icon: "", function: "" },
            { text: "", icon: "", function: "" },
          ]}
        />
      ) : null}
      <div className="back-drop">
        <NavbarMenu
          items={[
            { item: "Home", url: "/" },
            { item: "Sign In", url: "/signin" },
          ]}
        />
        <main className="fade-in">
          <form
            className="form-class"
            id="sign-up-form"
            onSubmit={handleSignUp}
          >
            <h2 className="form-title">Sign Up</h2>
            <div className="inputs-container">
              <input
                type="email"
                className="input-form"
                id="email"
                placeholder="Email"
              />
              <input
                type="text"
                className="input-form"
                id="user-name"
                placeholder="User Name"
              />
              <input
                type="text"
                className="input-form"
                id="full-name"
                placeholder="Full Name"
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
              id="submit-signUp-btn"
              className="accept-btn form-btn"
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
