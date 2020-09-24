import React, { useState } from "react";
import { Link } from "react-router-dom";

//API
import api from "../../services/api";

//icons
import { FiArrowLeft } from "react-icons/fi";

import "./style.css";

export default function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");


  async function handleUser(e) {
    e.preventDefault();

    var data = {
      email: email,
      name: name,
      password: password,
    };

    const response = await api.post('/user', data);

    if(response.status === 200){
      props.history.push('/login')
    }else{
      console.log("error");
    }



  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <h1> Criar Usuário</h1>

          <Link className="back-link" to="/login">
            <FiArrowLeft size={16} color="#E02041" />
            Já possuo Acesso
          </Link>
        </section>
        <form onSubmit={handleUser}>
          <input
            value={email}
            placeholder="E-Mail"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <input
            value={name}
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            value={repassword}
            type="password"
            placeholder="Re Password"
            onChange={(e) => setRepassword(e.target.value)}
            required
          />

          <button className="button" type="submit">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
