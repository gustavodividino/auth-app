import React, { useState } from "react";
import { Link } from 'react-router-dom';

//API
import api from "../../services/api";
import { login } from "../../services/auth";

//material ui core
import './style.css'

//icons
import {FiLogIn}  from 'react-icons/fi'


export default function Login(props){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleUserAuth(e) {

    e.preventDefault();

    var data = {
      email: email,
      password: password,
    };

    const response = await api.post('/auth', data);

    if(response.status === 400){
      props.history.push('/login')

    }else if(response.status === 200){
      const data = response.data;
      console.log(data.auth);

      login(response.data.token);
      
      console.log(response);

      setPassword("");
      setEmail("");

      props.history.push('/home')

    }



  }

    return (

        <div className="logon-container">
          <section className="form">

          <form onSubmit={handleUserAuth}>
              <h1> Faça seu Login</h1>


              <input placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

              <button className="button" type="submit">Entrar</button>
              
              <Link className="back-link" to="/register">
                <FiLogIn size={16} color="#E02041"/>
                Registrar
              </Link>
            
            </form>
          </section>

          
        
        </div>

    )
}