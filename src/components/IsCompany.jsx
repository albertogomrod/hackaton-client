import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function IsCompany(props) {
  const { isCompany } = useContext(AuthContext);

  if (isCompany === true) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}

export default IsCompany;
