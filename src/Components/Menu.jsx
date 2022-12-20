import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth/auth";

function Menu() {

  const auth = useAuth();

  const routes = [];
  routes.push({
    to: "/",
    text: "Home",
    private: false,
  });
  routes.push({
    to: "/blog",
    text: "Blog",
    private: false,
  });
  routes.push({
    to: `/profile/${auth.user?.userName}`,
    text: "Profile",
    private: true,
  });
  routes.push({
    to: "/login",
    text: "Login",
    publicOnly:true,
    private: false,
  });
  routes.push({
    to: "/logout",
    text: "Logout",
    private: true,
  });

  return (
    <nav>
      <ul>
        {routes.map((route) => {
          if(route.private && !auth.user) return null
          if(route.publicOnly && auth.user) return null

          return(
            <li key={route.to}>
            <NavLink
              style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
              to={route.to}
            >
              {route.text}
            </NavLink>
          </li>
          )
        })}
      </ul>
    </nav>
  );
}

export { Menu };
