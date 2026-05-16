import OrderCard from '@/components/OrderCard'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ShowUserOrders = () => {
  const params = useParams()

  const [userOrders, setUserOrders] = useState(null)

  const getUserOrders = async () => {
    const accessToken = localStorage.getItem("accessToken")
    const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/orders/user-order/${params.userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (res.data.success) {
      setUserOrders(res.data.orders)
    }
  }

  useEffect(() => {
    getUserOrders()
  }, [])

  return (
    <div className='pl-[350px] py-20'>
      <OrderCard userOrders={userOrders} />

    </div>
  )
}

export default ShowUserOrders
