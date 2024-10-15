import { useEffect, useState } from "react";
import { quitMenu } from "../utils/mainFunctions";

const DropdownMenu = (props) => {
  const { title, content, buttons } = props;
  useEffect(() => {
    const showDropdown = document.querySelector("#show-dropdown");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const dropdownContainer = document.querySelector(
      ".dropdown-menu-container"
    );
    const openMenu = () => {
      dropdownContainer.style.display = "flex";
      setTimeout(() => {
        dropdownContainer.classList.add("show-backdrop");
        dropdownMenu.classList.add("show-dropdown-menu");
        quitMenu();
      }, 100);
    };

    showDropdown.addEventListener("click", openMenu);

    return () => {
      showDropdown.removeEventListener("click", openMenu);
    };
  });
  return (
    <div className="dropdown-menu-container">
      <div className="back-drop"></div>
      <article className="dropdown-menu">
        <div className="dropdown-menu-header">
          <h2>{title}</h2>
        </div>
        <div className="dropdown-menu-body">
          <p className="dropdown-menu-content">{content}</p>
          <div className="btn-container">
            {buttons.map((button, index) => (
              <button
                key={index}
                className={`btn ${button.className}`}
                onClick={button.function}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default DropdownMenu;
