import "../assets/styles/home.css";
import NavbarMenu from "../components/NavbarMenu.jsx";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getData() {
      const url = "/api/users";
      try {
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const users = await response.json();
        setUsers(users);
      } catch (error) {
        console.error(error.message);
      }
    }
    getData();    
  }, []);
  return (
    <>
      <div className="back-drop">
        <NavbarMenu
          items={[
            { item: "Home", url: "/" },
            { item: "Start", url: "/signin" },
          ]}
        />
        <main className="fade-in">
          <h1>Home Page</h1>
          <h2>Lista de Usuarios</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
};
export default Home;
