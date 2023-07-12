import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
function LayoutUnAuthorized({children}) {
  const navigate = useNavigate();
  useEffect(()=>{
   const request = async () => {
    if(!localStorage.getItem("token")) return ;
      const req = await fetch("http://localhost:3002/api/authorization",{
        method : "get",
        headers : {
          "authorization" : `bearer= ${localStorage.getItem("token")}`
        }
      });
      const {role} = await req.json();
      if(role === "admin"){
        navigate("/admin")
      }
      if(role === "client"){
        navigate("/")
      }
   }
   request();
  },[]);
  return (
    <>{children}</>
  )
}

export default LayoutUnAuthorized