import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { setCart } from '@/redux/productSlice'

const ProductDesc = ({ product }) => {
  const accessToken = localStorage.getItem("accessToken")
  const dispatch = useDispatch()
  const addToCart = async (productId) => {
    try {
      const res = await axios.post('http://localhost:8000/api/v1/cart/add', { productId }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (res.data.success) {
        toast.success('Product added to cart')
        dispatch(setCart(res.data.cart))
      }

    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Failed to add product to cart')
      }
    }
  }
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='font-bold text-4xl text-gray-800'>{product.productName}</h1>
      <p className='text-gray-800'>{product.category} | {product.brand}</p>
      <h2 className='font-bold text-2xl text-orange-800'>₹{product.productPrice}</h2>
      <p className='line-clamp-12'>{product.productDesc}</p>
      <div className='flex gap-2 items-center w-[300px]'>
        <p>Quantity :</p>
        <Input type="number" className="w-14" defaultValue={1} />

      </div>
      <Button onClick={() => addToCart(product._id)} className="bg-orange-600 w-max">Add to cart</Button>

    </div>
  )
}

export default ProductDesc
