import React from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";
import { useBlogInfo } from "../context/useBlogInfo";

function Blog() {
  const blogData = useBlogInfo();
  const auth = useAuth();
  const navigate = useNavigate()
  //Saber si un usuario esta logeado para que agrege un nuevo blog
  const couldNew = auth.user?.userName;

  //Funcion para añadir nuevo blogPost
  const NuevoBlog = () =>{
    blogData.SetSlug(null);
    navigate('/blog-form');
  }

  return ( <>
  <h1>Blog Page</h1>
  {couldNew && (
    <button onClick={NuevoBlog} style={{backgroundColor:'green', color:'white'}}>Nuevo blog</button>
  )}
  <ul>
  {blogData.blogList.map(post=>(
    <BlogLink key={post.slug} post={post}/>
    ))}
  </ul>
  <Outlet/>
  </> );
}

function BlogLink({post}) {
  return(
    <li>
      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
    </li>
  )
}

export {Blog};