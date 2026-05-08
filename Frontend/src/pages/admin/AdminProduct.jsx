import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Edit, Search, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'


import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'
import ImageUpload from '@/components/ImageUpload'




const AdminProduct = () => {
  const { products } = useSelector(store => store.product)
  const [editProduct, setEditProduct] = useState(null)
  return (
    <div className='pl-[350px] py-20 pr-20 flex flex-col gap-3 min-h-screen bg-gray-100'>
      <div className='flex justify-between'>
        <div className='relative bg-white rounded-lg'>
          <Input type='text' placeholder="Search product..." className='w-[400px] items-center'></Input>
          <Search className='absolute right-3 top-1.5 text-gray-500' />

        </div>
        <Select>
          <SelectTrigger className='w-[200px] bg-white'>
            <SelectValue placeholder='Sort by Price'>

            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='lowToHigh'>Price: Low to High</SelectItem>
            <SelectItem value='highToLow'>Price: High to Low</SelectItem>
          </SelectContent>
        </Select>

      </div>
      {
        products.map((product, index) => {
          return <Card key={index} className='px-4'>
            <div className='flex items-center justify-between'>
              <div className='flex gap-2 items-center'>
                <img src={product.productImg[0].url} alt="" className='w-25 h-25' />
                <h1 className='font-bold w-96 text-gray-700'>{product.productName}</h1>

              </div>
              <h1 className='font-semibold text-gray-800'>₹{product.productPrice}</h1>
              <div className='flex gap-3'>
                <Dialog>
                  <form>
                    <DialogTrigger asChild>
                      <Edit className='text-green-500 cursor-pointer' />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px] max-h-[740px] overflow-y-scroll">
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when you&apos;re
                          done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className='space-y-4 flex flex-col gap-2'>
                        <div className='grid gap-2'>
                          <Label>Product Name</Label>
                          <Input type='text' name="productName" placeholder="Pizza..." required />
                        </div>
                        <div>
                          <Label>Price</Label>
                          <Input type='number' placeholder="Price.." name='productPrice' required />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                          <div className='grid gap-2'>
                            <Label>Brand</Label>
                            <Input type='text' name='brand' placeholder='Burger' required></Input>

                          </div>
                          <div className='grid gap-2'>
                            <Label>Category</Label>
                            <Input type='text' name='category' placeholder='Pure-Veg...' required></Input>

                          </div>

                        </div>
                        <div className='grid- gap-2'>
                          <div className='flex items-center'>
                            <Label>Description</Label>


                          </div>
                          <Textarea name='productDesc' placeholder='Enter brief description of product' />
                        </div>
                        <ImageUpload />

                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </form>
                </Dialog>

                <Trash2 className='text-red-500 cursor-pointer' />
              </div>

            </div>

          </Card>
        })
      }

    </div>
  )
}

export default AdminProduct
