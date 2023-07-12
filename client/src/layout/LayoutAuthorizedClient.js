import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function LayoutAuthorizedClient({children}) {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("token")) {
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
      if(role === "client" || role === "admin"){
        return
      }else{
        localStorage.clear();
        console.log("mamafa");
        navigate("/signin")
        console.log(role);
      }
   }
   request();
  },[]);
  return (
    <>{children}</>
  )
}

export default LayoutAuthorizedClient