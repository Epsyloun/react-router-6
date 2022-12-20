import React, { createContext, useContext, useState } from 'react'
import { BlogData } from '../Components/BlogData';

const blogInfo = createContext();

function BlogInfoProvider({children}) {

  const [blogList, setBlogList] = useState(BlogData);
  const [slug, setSlug] = useState(null);

  function SetSlug(slug){
    if(slug !== null){
      const blogItem = blogList.find((blogItem) => blogItem.slug === slug);
      setSlug(blogItem.slug)
    }else{
      setSlug(null)
    }
  }

  function GetOneBlog(slug){
    const blogItem = blogList.find((blogItem) => blogItem.slug === slug)
    return blogItem;
  }

  function UpdateBlogList(newListBlog){
    setBlogList(newListBlog)
  }
  function AddBlogList(newListBlog){
    setBlogList([...blogList, newListBlog])
  }
  const infoBlog = {blogList, slug, UpdateBlogList, AddBlogList, GetOneBlog, SetSlug}

  return (
    <blogInfo.Provider value={infoBlog}>
      {children}
    </blogInfo.Provider>
  );
}
function useBlogInfo(){
  const info = useContext(blogInfo);
  return info;
}

export {BlogInfoProvider, useBlogInfo};