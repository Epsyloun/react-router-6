import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/auth";
import { useBlogInfo } from "../context/useBlogInfo";

function BlogPost() {
  const navigate = useNavigate();
  const auth = useAuth();
  const blogData = useBlogInfo();

  const { slug } = useParams();
  const blogPost = blogData.GetOneBlog(slug);

  //Funcion testear blogPost
  const [testload, setTestload] = useState(false);
  const [testready, setTestready] = useState(false);

  if (blogPost === undefined) {
    return (
      <>
        <h1>No se encontre un blog </h1>
        <br />
        <Link to="/blog">regresar</Link>
      </>
    );
  } else {
    //Funcion eliminar blogPost
    const EliminarBlog = () => {
      const newListBlog = blogData.blogList.filter(
        ({ slug }) => slug !== blogPost.slug
      );
      blogData.UpdateBlogList(newListBlog);
      navigate("/blog");
    };


    const TestearBlog = () => {
      setTestload(true);
      setTimeout(() => {
        setTestload(false);
        setTestready(true);
      }, 3000);
    };

    //Funcion editar blog
    const editBlog = () => {
      blogData.SetSlug(slug);
      navigate("/blog-form");
    };

    const couldDelete =
      auth.user?.role === "admin" || blogPost.author === auth.user?.userName;
    const couldEdit =
      auth.user?.role === "admin" ||
      auth.user?.role === "editor" ||
      blogPost.author === auth.user?.userName;
    const couldTest =
      auth.user?.role === "admin" || auth.user?.role === "testing";

    const returnToBlog = () => {
      navigate("/blog");
    };
    return (
      <>
        <h2>{blogPost.title}</h2>
        <button onClick={returnToBlog}>Volver a la lista</button>
        <p>{blogPost.author}</p>
        <p>{blogPost.content}</p>
        {couldDelete && (
          <button
            onClick={EliminarBlog}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Eliminar blog
          </button>
        )}
        {couldEdit && (
          <button
            onClick={editBlog}
            style={{ backgroundColor: "orange", color: "white" }}
          >
            Editar blog
          </button>
        )}
        {couldTest && (
          <>
            <button
              onClick={TestearBlog}
              style={{ backgroundColor: "blue", color: "white" }}
            >
              Testear blog
            </button>
            {testload && <h5>Testing...</h5>}
            {testready && <h4>Testing terminado, todo listo!</h4>}
          </>
        )}
      </>
    );
  }
}

export { BlogPost };
