import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAdmin(props) {
  const { isAdmin } = useContext(AuthContext);

  if (isAdmin === true) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}

export default IsAdmin;
