import OrderCard from '@/components/OrderCard'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyOrder = () => {
  const [userOrders, setUserOrders] = useState(null)

  const getUserOrders = async () => {
    const accessToken = localStorage.getItem("accessToken")
    const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/orders/myorder`, {
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
    <>
      <OrderCard userOrders={userOrders} />
    </>

  )
}

export default MyOrder
