import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { addAddress, deletedAddress, setSelectedAddress } from '@/redux/productSlice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AddressForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  })
  const { cart, addresses, selectedAddress } = useSelector((store) => store.product)
  const [showForm, setShowForm] = useState(addresses?.length > 0 ? false : true)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    dispatch(addAddress(formData))
    setShowForm(false)
  }

  const subTotal = cart.totalPrice
  const shiping = subTotal > 50 ? 0 : 10
  const tax = parseFloat((subTotal * 0.05).toFixed(2))
  const total = subTotal + shiping + tax


  return (
    <div className='max-w-7xl mx-auto grid place-items-center p-10'>
      <div className='grid grid-cols-2 items-start gap-20 mt-10 max-w-7xl mx-auto'>
        <div className='space-y-4 p-6 bg-white'>
          {
            showForm ? (
              <>
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" name="fullName" required placeholder="john doe"
                    value={formData.fullName}
                    onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" required placeholder="+91 987654321"
                    value={formData.phone}
                    onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" required placeholder="john@gmail"
                    value={formData.email}
                    onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" required placeholder="Address"
                    value={formData.address}
                    onChange={handleChange} />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" required placeholder="Indore"
                      value={formData.city}
                      onChange={handleChange} />

                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" name="state" required placeholder="Madhya Pradesh"
                      value={formData.state}
                      onChange={handleChange} />

                  </div>

                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor="zip">Zip Code</Label>
                    <Input id="zip" name="zip" required placeholder="562157"
                      value={formData.zip}
                      onChange={handleChange} />

                  </div>
                  <div>
                    <Label htmlFor="state">Country</Label>
                    <Input id="country" name="country" required placeholder="India"
                      value={formData.country}
                      onChange={handleChange} />

                  </div>

                </div>
                <Button onClick={handleSave} className="w-full">Save & Continue</Button>
              </>) : (
              <div className='space-y-4'>
                <h2 className='text-lg font-semibold'>Saved Addresses</h2>
                {
                  addresses.map((addr, index) => {
                    return <div onClick={() => dispatch(setSelectedAddress(index))} key={index} className={`border p-4 rounded-md cursor-pointer relative ${selectedAddress === index ? "border-orange-600 bg-orange-50" : "border-gray-300"} `}>
                      <p className='font-medium'>{addr.fullName}</p>
                      <p>{addr.phone}</p>
                      <p>{addr.email}</p>
                      <p>{addr.address}, {addr.city}, {addr.state}, {addr.zip}, {addr.country}</p>
                      <button onClick={(e) => dispatch(deletedAddress(index))} className='absolute top-2 right-2 text-red-500 hovera:text-red-700 text-sm'>Delete</button>
                    </div>
                  })
                }
                <Button className='w-full' varient='outline' onClick={() => setShowForm(true)}>+ Add New Address</Button>
                <Button disabled={selectedAddress === null} className='w-full bg-orange-600'>Proceed To Checkout</Button>

              </div>
            )
          }
        </div>
        {/* right side order submit */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex justify-between'>
                <span>Subtotal ({cart.items.length}) items</span>
                <span>₹{subTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className='flex justify-between'>
                <span>Shiping</span>
                <span>₹{shiping}</span>
              </div>

              <div className='flex justify-between'>
                <span>Tax</span>
                <span>₹{tax}</span>
              </div>
              <Separator />
              <div className='flex justify-between font-bold text-lg'>
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <div className='text-sm text-muted-foreground pt-4'>
                <p>* Free shipping on orders over 299</p>
                <p>* 30-days return policy</p>
                <p>* Secure checkout with SSL encryption</p>
              </div>

            </CardContent>
          </Card>
        </div>


      </div>

    </div>
  )
}

export default AddressForm
