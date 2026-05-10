import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Edit, Search, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


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
import axios from 'axios'
import { toast } from 'sonner'
import { setProducts } from '@/redux/productSlice'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"




const AdminProduct = () => {
  const { products } = useSelector(store => store.product)
  const [editProduct, setEditProduct] = useState(null)
  const accessToken = localStorage.getItem("accessToken")
  const [open, setOpen] = useState(false)
  const [sortOrder, setShortOrder] = useState('')
  const [searchTerm, setSearchTerm] = useState("")
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditProduct(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append("productName", editProduct.productName)
    formData.append("productDesc", editProduct.productDesc)
    formData.append("productPrice", editProduct.productPrice)
    formData.append("category", editProduct.category)
    formData.append("brand", editProduct.brand)

    //add existing images public_ids
    const existingImages = editProduct.productImg
      .filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id)

    formData.append("existingImages", JSON.stringify(existingImages))


    //Add new files
    editProduct.productImg
      .filter((img) => img instanceof File)
      .forEach((file) => {
        formData.append("files", file)
      })

    try {
      const res = await axios.put(`http://localhost:8000/api/v1/product/update/${editProduct._id}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (res.data.success) {
        toast.success("Product updated successfully")
        const updateProducts = products.map((p) =>
          p._id === editProduct._id ? res.data.product : p)
        dispatch(setProducts(updateProducts))
        setOpen(false)
      }

    } catch (error) {
      console.log(error);


    }


  }

  const deleteProductHandler = async (productId) => {
    try {
      const remainingProducts = products.filter((product) => product._id !== productId)
      const res = await axios.delete(`http://localhost:8000/api/v1/product/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (res.data.success) {
        toast.success(res.data.message)
        dispatch(setProducts(remainingProducts))
      }

    } catch (error) {
      console.log(error);


    }
  }

  let filteredProduct = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) || product.brand.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase()))

  if (sortOrder === 'lowToHigh') {
    filteredProduct = [...filteredProduct].sort((a, b) => a.productPrice - b.productPrice)
  }

  if (sortOrder === 'highToLow') {
    filteredProduct = [...filteredProduct].sort((a, b) => b.productPrice - a.productPrice)
  }



  return (
    <div className='pl-[350px] py-20 pr-20 flex flex-col gap-3 min-h-screen bg-gray-100'>
      <div className='flex justify-between'>
        <div className='relative bg-white rounded-lg'>
          <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder="Search product..." className='w-[400px] items-center'></Input>
          <Search className='absolute right-3 top-1.5 text-gray-500' />

        </div>
        <Select onValueChange={(value) => setShortOrder(value)} >
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
        filteredProduct.map((product, index) => {
          return <Card key={index} className='px-4'>
            <div className='flex items-center justify-between'>
              <div className='flex gap-2 items-center'>
                <img src={product.productImg[0].url} alt="" className='w-25 h-25' />
                <h1 className='font-bold w-96 text-gray-700'>{product.productName}</h1>

              </div>
              <h1 className='font-semibold text-gray-800'>₹{product.productPrice}</h1>
              <div className='flex gap-3'>
                <Dialog open={open} onOpenChange={(value) => { if (!value) { document.activeElement?.blur() } setOpen(value) }} >

                  <DialogTrigger asChild>
                    <Edit onClick={() => { setOpen(true), setEditProduct(product) }} className='text-green-500 cursor-pointer' />
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
                        <Input
                          type='text'
                          value={editProduct?.productName}
                          onChange={handleChange}
                          name="productName"
                          placeholder="Pizza..."
                          required />
                      </div>
                      <div>
                        <Label>Price</Label>
                        <Input type='number'
                          value={editProduct?.productPrice}
                          onChange={handleChange}
                          placeholder="Price.." name='productPrice' required />
                      </div>
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='grid gap-2'>
                          <Label>Brand</Label>
                          <Input type='text'
                            value={editProduct?.brand}
                            onChange={handleChange}
                            name='brand' placeholder='Burger' required></Input>

                        </div>
                        <div className='grid gap-2'>
                          <Label>Category</Label>
                          <Input type='text'
                            value={editProduct?.category}
                            onChange={handleChange}
                            name='category' placeholder='Pure-Veg...' required></Input>

                        </div>

                      </div>
                      <div className='grid- gap-2'>
                        <div className='flex items-center'>
                          <Label>Description</Label>


                        </div>
                        <Textarea name='productDesc'
                          value={editProduct?.productDesc}
                          onChange={handleChange}
                          placeholder='Enter brief description of product' />
                      </div>
                      <ImageUpload productData={editProduct} setProductData={setEditProduct} />

                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button onClick={handleSave} type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>

                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline"> <Trash2 className='text-red-500 cursor-pointer' /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteProductHandler(product._id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>


              </div>

            </div>

          </Card>
        })
      }

    </div>
  )
}

export default AdminProduct