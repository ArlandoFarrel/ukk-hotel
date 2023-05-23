import React from 'react'
import EditOrder from '@/components/EditOrder'
import { useRouter } from 'next/router'
const updateorder = () => {
    const router=useRouter()
  return (
    <div>
      <EditOrder orderId={router.query.id}/>
    </div>
  )
}

export default updateorder
