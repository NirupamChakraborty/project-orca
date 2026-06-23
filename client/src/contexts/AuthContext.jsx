import axios from "axios";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({})

const client = axios.create({
    baseURL :"http://localhost:8000/api/v1/users",
})

export const AuthProvider=({children})=>{

    const authContext = useContext(AuthContext)
    const [userData, setUserData] = useState(authContext);

    const navigate = useNavigate()
    const data ={
        userData,
        setUserData
    }
}