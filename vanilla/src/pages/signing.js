import { changePageSetting } from "../utils/mainFunctions";
import { redirectPage } from "../utils/mainFunctions";

const Signin = () => {
  changePageSetting("Home - Sign-In", "../../public/vite.svg");

  document.querySelector("#app").innerHTML = `
  <div class="back-drop">
        <main class="fade-in main-center">
          <form class="form-class form" id="sign-in-form">
          <h2 class="form-title">Sign In</h2>
          <div class="inputs-container">
          <input
          type="text"
          class="input-form input"
          id="email-username"
          placeholder="Email or User Name"
          />
          <input
          type="password"
          class="input-form input"
          id="password"
          placeholder="Password"
          />
          </div>
          <button
              type="submit"
              id="submit-signin-btn"
              class="accept-btn form-btn btn"
              >
              Submit
              </button>
              <p class="already-account-p">
              Aleready you don't have an account?
              <button class="already-account-btn" id="go-to-sign-up">
              Sign up
              </button>
              </p>
              </form>
              </main>
              </div>
              `;

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
};

export default Signin;
