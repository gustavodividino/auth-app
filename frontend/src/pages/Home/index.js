import React, { useState, useEffect } from "react";

//API
import api from "../../services/api";
import { logout } from "../../services/auth";

//material ui core
import "./style.css";

export default function Home(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/user");
      setUsers(response.data);
    }
    loadUsers();
  }, []);


  async function handleLogout(e) {

    e.preventDefault();

    logout();

    props.history.push('/login')


    }

  return (
    <div className="logon-container">

     
      {users.map((row) => (
        <div>
          <p>{row.name}</p>
        </div>
      ))}

      <div>
        <button className="button" onClick={handleLogout}>Logout</button>
      </div>
    </div>

  );
}
