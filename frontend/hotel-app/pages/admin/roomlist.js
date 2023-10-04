import Sidebar from '@/components/Sidebar'
import RoomList from '@/components/RoomList'
import React from 'react'
import withAuth from '../withAuth'


const roomlist = () => {
  return (
    <div className='flex'>
      <div className='w-3/12'>
      <Sidebar />
      </div>
      <div className='justify-center mt-10 w-full'>
      <RoomList/>
      </div>
    </div>
  )
}

export default withAuth(roomlist)
