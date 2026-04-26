import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'
import { useSelector } from 'react-redux'
import logo from "../assets/logo.jpeg"
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const Cart = () => {
  const { cart } = useSelector(store => store.product)
  console.log(cart);

  const subtotal = cart?.totalPrice
  const shipping = subtotal > 299 ? 0 : 10;
  const tax = subtotal * 0.05 // 5%
  const total = subtotal + shipping + tax

  return (
    <div className='pt-20 bg-gray-50 min-h-screen'>
      {
        cart?.items?.length > 0 ? <div className='max-w-7xl mx-auto'>
          <h1 className='text-2xl font-bold text-gray-800 mb-7'>Shopping Cart</h1>
          <div className='max-w-7xl mx-auto flex gap-7'>
            <div className='flex flex-col gap-5 flex-1'>
              {
                cart?.items?.map((product, index) => {
                  return <Card key={index}>
                    <div className='flex justify-between items-center pr-7'>
                      <div className='flex items-center gap-10 ml-3  w-[350px]'>
                        <img src={product?.productId?.productImg?.[0]?.url || logo} alt="" className='w-25 h-25' />
                        <div className='w-[280px] ml-10'>
                          <h1 className='font-semibold truncate '>
                            {product?.productId?.productName}</h1>
                          <p className='font-semibold'>₹{product?.productId?.productPrice}</p>
                        </div>

                      </div>
                      <div className='flex gap-5 items-center'>
                        <Button variant='outline'>-</Button>
                        <span>1</span>
                        <Button variant='outline'>+</Button>
                      </div>
                      <p>{(product?.productId?.productPrice) * (product?.quantity)}</p>
                      <p className='flex text-red-500 items-center gap-1 cursor-pointer'><Trash2 className='w-4 h-4' />Remove</p>
                    </div>

                  </Card>
                })
              }

            </div>
            <div>
              <Card className="w-[400px]">
                <CardHeader>
                  <CardTitle>
                    Order Sumarry
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className='flex justify-between'>
                    <span>Subtotal ({cart?.items?.length} items)</span>
                    <span>₹{cart?.totalPrice?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Tax(5%)</span>
                    <span>₹{tax}</span>
                  </div>

                </CardContent>
              </Card>
            </div>
          </div>

        </div> : <div></div>
      }

    </div>
  )
}

export default Cart
