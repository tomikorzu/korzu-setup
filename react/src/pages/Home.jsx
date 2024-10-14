import "../assets/styles/home.css";
import NavbarMenu from "../components/NavbarMenu.jsx";
import React, { useEffect, useState } from "react";
import { changePageSetting } from "../utils/mainFunctions.js";

const Home = () => {
  useEffect(() => {
    changePageSetting("Home", "../../public/vite.svg");
  });
  return (
    <>
      <div className="back-drop">
        <NavbarMenu
          items={[
            { item: "Home", url: "/", active: true },
            { item: "Sign In", url: "signin" },
            { item: "Sign Up", url: "signup" },
          ]}
        />
        <main className="fade-in">
          <h1>Home Page</h1>
        </main>
      </div>
    </>
  );
};
export default Home;
