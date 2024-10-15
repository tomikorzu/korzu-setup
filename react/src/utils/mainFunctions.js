const body = document.querySelector("body");

export function redirectPage(url, className, time) {
  body.classList.add(`${className}`);
  setTimeout(() => {
    window.location.href = url;
  }, time);
}

export function changePageSetting(title, iconUrl) {
  document.title = title;
  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/svg+xml";
  link.href = iconUrl;
}

export function userAlert(title, message) {
  const alertMenu = document.createElement("div");
  alertMenu.classList.add("alert-menu");
  setTimeout(() => {
    alertMenu.classList.add("show-alert-menu");
  }, 100);

  alertMenu.innerHTML = `
      <h2>${title}</h2>
      <p>${message}</p>
  `;
  body.appendChild(alertMenu);
  setTimeout(() => {
    alertMenu.classList.remove("show-alert-menu");
    setTimeout(() => {
      alertMenu.remove();
    }, 500);
  }, 2000);
}

export function quitMenu() {
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const dropdownMenuContainer = document.querySelector(
    ".dropdown-menu-container"
  );

  function clickOutside(event) {
    if (!dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.remove("show-dropdown-menu");
      dropdownMenuContainer.classList.remove("show-backdrop");
      setTimeout(() => {
        dropdownMenuContainer.style.display = "none";
      }, 500);
      document.removeEventListener("click", clickOutside);
    }
  }

  document.addEventListener("click", clickOutside);
}

export function applyBlur() {
  const backDrop = document.querySelector(".back-drop");
  backDrop.classList.toggle("blur");
}
