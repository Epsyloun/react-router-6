import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../auth/auth";

function Profile() {
  let auth = useAuth();
  let {slug} = useParams();

  useEffect(()=>{
    auth.searchUser({slug});
  },[slug])

  if(auth.SearchedUser !== null && auth.user?.userName !== slug){
    return(
      <>
        <h1>Perfil</h1>
        <h3>Perfil de {auth.SearchedUser.name}</h3>
        <p>{auth.SearchedUser.info}</p>
      </>
    )
  }else if(auth.user === null){
    return (
      <>
        <h1>Este usuario no existe</h1>
      </>
    );
  }else{
    return (
      <>
        <h1>Perfil</h1>
        <h3>Welcome, {auth.user.userName}</h3>
        <p>{auth.user.info}</p>
        {auth.user.userName === slug?(<Link to="/profile-edit"><button>Editar</button></Link>):null}
      </>
    );
  }
}

export {Profile};