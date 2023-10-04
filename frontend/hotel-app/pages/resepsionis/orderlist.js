import React, {useState} from 'react'
import OrderList from '@/components/OrderList'
import Sidebar from '@/components/Sidebar'
import withAuth from '../withAuth'
const orderlist = () => {

 

  return (
    <div className='flex'>
      <div className='w-3/12'> 
      <Sidebar/>
      </div>
      <div className='w-full justify-center mt-10'>
      <OrderList/>
      </div>
    </div>
  )
}

export default withAuth(orderlist)
