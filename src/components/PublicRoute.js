import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//here we preventing logged in user from reaching login/register page.
function PublicRoute({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return <div>{children}</div>;
}

export default PublicRoute;
