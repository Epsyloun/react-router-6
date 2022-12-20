import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth';
import { useBlogInfo } from '../context/useBlogInfo';

function BlogForm() {

  const navigate = useNavigate()
  const blogData = useBlogInfo();
  const auth = useAuth();

  let initialState=
  {
    title: "",
    slug: "",
    author: auth.user.userName,
    content: ""
  };

  useEffect(()=>{
    //edit state
    if(blogData.slug !== null){
      const initialData = blogData.GetOneBlog(blogData.slug);
      initialState=
      {
        title: initialData.title,
        slug: initialData.slug,
        author: initialData.author,
        content: initialData.content
      }
      setBlog(initialState)
    }
  },[blogData.slug])

  //state para manejar el objeto blog
  const [blog, setBlog] = useState(initialState);
  //state para saber si el slug se repite
  const [error, setError] = useState(false);

  //Funcion para crear el slug
  const createSlug = ()=>{
    if(blog.title !== ""){
      const slug = blog.title.trim().replace(/ /g, "-");
      if(blogData.slug === slug){
        setError(false)
        return slug;
      }else{
        if(!blogData.blogList.find(blog => blog.slug === slug)){
          setError(false)
          return slug;
        }else{setError(true)}
      }
    }
  }

  //Manejar los datos de los textfields
  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    setBlog({...blog, [name]:value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    const newSlug = createSlug();
    if(newSlug === undefined){
      setError(true)
    }else{
      const newData = {...blog, 'slug':newSlug}
      if(blogData.slug === null)
      {
        blogData.AddBlogList(newData)
      }else{
        console.log('edit');
        const newListBlog = blogData.blogList.filter(({slug})=> slug !== blogData.slug)
        blogData.UpdateBlogList([...newListBlog, newData])
      }
      navigate('/blog')
    }
  }



  return (
  <>
    <form onSubmit={handleSubmit}>
      <h1>{blogData.slug === null ?('New '):('Update ')}blog form</h1>
      {error&&(<p style={{color:'red'}}>Error cambie el titulo, ya que este ya esta registrado</p>)}
      <label>Titulo</label>
      <br/>
      <input required value={blog.title} onChange={handleInputChange} type="text" name="title"/>
      <br/>
      <label>Contenido</label>
      <br/>
      <textarea required value={blog.content} onChange={handleInputChange} type="text" rows="5" name="content"/>
      <br/>
      <button type="submit">Agregar blog</button>
    </form>
  </>
  );
}

export {BlogForm};