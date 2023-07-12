import React from 'react'
import Sidebar from '../../components/Admin/Sidebar/Sidebar'

import {Outlet} from 'react-router-dom'
const Admin = () => {
  return (
    <div className='w-full flex flex-row justify-center content-center h-[600px] mt-7'>
       <div>
       <Sidebar/>
       </div>

         
            
          <Outlet/>  

           
         
        
      
      
    </div>
  )
}

export default Admin