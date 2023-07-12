import React ,{useEffect ,useState} from 'react'
import axios from 'axios'
function UserGestions() {

   const [dataUser, setDataUser] = useState([])
  useEffect(()=>{

   axios.get('http://localhost:3002/api/alldata')
    .then(response=>{
        setDataUser(response.data)
        console.log(response.data)
    })
    .catch(error=>{
        console.log(error);
    })


    



  },[])
  
  const handleRemove = (id)=>{
    try {
     const deleteUser = async ()=>{
       const result = await axios.delete(`http://localhost:3002/api/deleteUser/${id}`)
       setDataUser((prevState)=>prevState.filter(n=> n.id != id))
     }

      deleteUser()
      } catch (error) {
       console.log(error);
      }
    
 }

   console.log(dataUser);

  return (
    <div>
        
    

<div className="flex ml-32  w-full items-center justify-center min-h-screen">
    <div className="col-span-11">
      <div className="overflow-auto lg:overflow-visible ">
        <table className="table text-gray-400 border-separate space-y-11 text-sm">
          <thead className="bg-gray-800 text-gray-500 w-full">
            <tr>
              <th className="p-3">Id</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Adresse</th>
              <th className="p-3 text-left">Pays</th>
              <th className="p-3 text-left">Code Postal</th>
              <th className="p-3 text-left">Ville</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
           {dataUser.map((elm)=>(

<tr key={elm.id} className="bg-gray-800">
<td className="p-3 font-bold">{elm.id}</td>
<td className="p-3">{elm.email}</td>
<td className="p-3 font-bold">{elm.nom}</td>
<td className="p-3 font-bold">{elm.adresse}</td>
<td className="p-3 font-bold">{elm.pays}</td>

<td className="p-3 font-bold">{elm.codePostal}</td>
     
 
<td className="p-3 font-bold">{elm.ville}</td>
<td className="p-3 font-bold">{elm.date}</td>
<td className="p-3 font-bold"><button className='text-red-500' onClick={()=>handleRemove(elm.id)}>Bann</button></td>
</tr>



           ))}
             
            
            
            
          </tbody>
        </table>
      </div>
    </div>
  </div>


  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n\t.table {\n\t\tborder-spacing: 0 15px;\n\t}\n\n\ti {\n\t\tfont-size: 1rem !important;\n\t}\n\n\t.table tr {\n\t\tborder-radius: 20px;\n\t}\n\n\ttr td:nth-child(n+9),\n\ttr th:nth-child(n+9) {\n\t\tborder-radius: 0 .625rem .625rem 0;\n\t}\n\n\ttr td:nth-child(1),\n\ttr th:nth-child(1) {\n\t\tborder-radius: .625rem 0 0 .625rem;\n\t}\n"
    }}
  />

    </div>
  )
}

export default UserGestions