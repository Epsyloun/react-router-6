import React from "react";
import { useAuth } from "../auth/auth";

function Logout() {

  const auth = useAuth();

  const logout = (e) =>{
    e.preventDefault();
    auth.logout();
  }

  return (
    <>
      <form onSubmit={logout}>
        <label>¿Seguro que quieres salir?</label>
        <button type="submit">Salir</button>
      </form>
    </>
  );
}

export {Logout};