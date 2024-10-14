import { changePageSetting } from "../utils/mainFunctions.js";

const Home = () => {
  changePageSetting("Home", "../../public/vite.svg");

  document.getElementById("app").innerHTML = `
    <h1>Home</h1>
    <p>Welcome to the home page!</p>
    <a href="/signin">signin</a>
  `;
};

export default Home;
