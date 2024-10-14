import Home from "./src/pages/home.js";
import SignIn from "./src/pages/signing.js";
import SignUp from "./src/pages/signup.js";

document.addEventListener("DOMContentLoaded", function () {
  if (location.pathname === "/") {
    Home();
  } else if (this.location.pathname === "/signin") {
    SignIn();
  } else if (this.location.pathname === "/signup") {
    SignUp();
  }
});
