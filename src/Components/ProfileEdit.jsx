import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/auth';

function ProfileEdit() {

  let auth = useAuth();

  const saveInfo = (e)=>{
    e.preventDefault();
    console.log('deberia guardar pero me dio weba xd')
  }

  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    setBlog({...blog, [name]:value})
  }

  return (
  <>
    <form onSubmit={saveInfo}>
      <label>nombre</label>
      <br/>
      <input value={auth.user.userName} onChange={handleInputChange} type="text" nane="nombre" />
      <br/>
      <label>Un poco sobre mi</label>
      <br/>
      <textarea value={auth.user.info} onChange={handleInputChange} type="text" nane="nombre" />
      <br/>
      <Link to={`/profile/${auth.user?.userName}`}><button>Regresar</button></Link>
      <button type='submit'>Guardar</button>
    </form>
  </>
  );
}

export {ProfileEdit};