import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const AddProduct = () => {
  return (
    <div className='pl-[350px] py-10 pr-20 mx-auto px-4 bg-gray-100'>
      <Card className='w-full my-20'>
        <CardHeader>
          <CardTitle> Add Product </CardTitle>
          <CardDescription>Enter Product details below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-2'>
            <div className='grid gap-2'>
              <Label>Product Name</Label>
              <Input type='text' name='productName' placeholder='Pizza' required></Input>

            </div>
            <div className='grid gap-2'>
              <Label>Price</Label>
              <Input type='text' name='productPrice' placeholder='Burger' required></Input>

            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label>Brand</Label>
                <Input type='text' name='brand' placeholder='Brand' required></Input>
              </div>
              <div className='grid gap-2'>
                <Label>Category</Label>
                <Input type='text' name='category' placeholder='category' required></Input>
              </div>
            </div>

            <div className='grid-cols-2'>
              <div className='flex items-center'>
                <Label>Description</Label>
              </div>
              <Textarea name='productDisc' placeholder="Enter brief description of your product"></Textarea>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddProduct
