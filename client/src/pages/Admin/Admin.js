import React from 'react'
import Sidebar from '../../components/Admin/Sidebar/Sidebar'
import UserGestions from '../../components/Admin/UserGestions/UserGestions'
const Admin = () => {
  return (
    <div className='w-full flex flex-row justify-center content-center h-[600px] mt-7'>
       <div>
       <Sidebar/>
       </div>

        <div>
        <UserGestions/>
        </div>
      
      
    </div>
  )
}

export default Admin