import Sidebar from '@/components/Sidebar'
import React from 'react'
import TypeRoomList from'@/components/TypeRoomList'
import withAuth from '../withAuth'
const typeroomlist = () => {
  
  return (
    <div className='flex'>
      <div className='w-3/12'>
      <Sidebar />
      </div>
      <div className="  justify-center mt-10 w-full ">
        <TypeRoomList />
      </div>
    </div>
  )
}

export default withAuth(typeroomlist)
