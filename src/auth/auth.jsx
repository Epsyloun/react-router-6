import React, { createContext, useContext, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const roleList = [
  {
    name:'Rodrigo',
    info:"un poco de mi info personal",
    role:'admin'
  },
  {
    name:'Lucia',
    info:"un poco de mi info personal",
    role:'admin'
  },
  {
    name:'Allan',
    info:"un poco de mi info personal",
    role:'editor'
  },
  {
    name:'Gerardo',
    info:"un poco de mi info personal",
    role:'editor'
  },
  {
    name:'Monica',
    info:"un poco de mi info personal",
    role:'testing'
  }
]

const AuthContext = createContext();

function AuthProvider({children}){

  const navigate = useNavigate();
  let location = useLocation();
  const [user, setUser] = useState(null);
  const [SearchedUser, setSearchedUser] = useState(null);

  const login = ({ userName }) =>{
    let from = location.state?.from?.pathname || "/";
    const findUser = roleList.find(({name}) => name === userName)
    let role;
    let info;
    if(findUser === undefined){
      role = 'user'
    }else{role = findUser.role; info=findUser.info}
    setUser({ userName, role, info })
    navigate(from, { replace: true });
  }
  const logout = () =>{
    setUser(null)
    navigate('/')
  }

  const searchUser = ({slug})=>{
    const findUser = roleList.find(({name}) => name === slug)
    let userInfo;
    if(findUser === undefined){
      userInfo = null;
    }else{userInfo = findUser}
    setSearchedUser(userInfo);
  }

  const auth={user,SearchedUser, login, logout, searchUser};

  return(
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(){
  const auth = useContext(AuthContext)
  return auth;
}

function CheckRoute({children}){
  const auth = useAuth();
  const location = useLocation();
  if(!auth.user){
    return <Navigate to="/login" state={{ from: location }} replace/>
  }
  return children

}

export {AuthProvider, useAuth, CheckRoute}