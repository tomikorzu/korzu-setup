import "../assets/styles/home.css";
import NavbarMenu from "../components/NavbarMenu.jsx";
import React, { useEffect, useState } from "react";
import {
  changePageSetting,
  redirectPage,
  quitMenu,
} from "../utils/mainFunctions.js";
import DropdownMenu from "../components/DropdownMenu.jsx";

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(true);

  useEffect(() => {
    changePageSetting("Home", "../../public/vite.svg");
    const showDropdownBtn = document.querySelector("#show-dropdown");

    const showMenu = () => {
      setShowDropdown(true);
    };

    showDropdownBtn.addEventListener("click", showMenu);

    return () => {
      showDropdownBtn.removeEventListener("click", showMenu);
    };
  });

  return (
    <>
      <div className="fade-in">
        <NavbarMenu
          items={[
            { item: "Home", url: "/", active: true },
            { item: "Sign In", url: "signin" },
            { item: "Sign Up", url: "signup" },
          ]}
        />
        <main className="fade-in">
          <h1>Home Page</h1>
          <button className="btn" id="show-dropdown">
            Click
          </button>
          {showDropdown && (
            <DropdownMenu
              title="Lets start to create your account"
              content="Press the button to start creating your account"
              buttons={[
                {
                  text: "Get started",
                  function: () => redirectPage("/signup", "fade-out", 500),
                  className: "go-signup",
                },
              ]}
            />
          )}
        </main>
      </div>
    </>
  );
};
export default Home;
