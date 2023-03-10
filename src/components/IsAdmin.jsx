import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"

function IsAdmin(props) {

    const { isAdmin } = useContext(AuthContext)
    
    if ( isAdmin === true ) {
        return props.children
    } else {
        return <Navigate to="/" />
    }

  
}

export default IsAdmin