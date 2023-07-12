import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
function LayoutAuthorizedAdmin({children}) {
  const navigate = useNavigate();
  useEffect(()=>{
  if(!localStorage.getItem("token")){
    navigate("/signin");
    return ;
  };
   const request = async () => {
      const req = await fetch("http://localhost:3002/api/authorization",{
        method : "get",
        headers : {
          "authorization" : `bearer= ${localStorage.getItem("token")}`
        }
      });
      const {role} = await req.json();
      if(role !== "admin"){
        navigate("/")
      }
   }
   request();
  },[]);
  return (
    <>{children}</>
  )
}

export default LayoutAuthorizedAdmin