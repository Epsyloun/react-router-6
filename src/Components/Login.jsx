import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";

function Login() {

  const auth = useAuth();
  let location = useLocation();

  const [userName, setUserName] = useState('');
  let from = location.state?.from?.pathname || "/";

  const login = (e)=>{
    e.preventDefault();
    auth.login({userName})
  }
  if(auth.user) return navigate(from, { replace: true });
  return (
    <>
    <h1>Login</h1>
    <form onSubmit={login}>
      <label>Escribe tu nombre de usuario</label>
      <input type="text" value={userName} onChange={e=>setUserName(e.target.value)} />
      <button type="submit">Entrar</button>
    </form>
    </>

  );
}

export {Login};