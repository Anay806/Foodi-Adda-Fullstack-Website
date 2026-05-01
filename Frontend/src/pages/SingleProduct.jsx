import BreadCrums from '@/components/BreadCrums'
import ProductDesc from '@/components/ProductDesc'
import ProductImg from '@/components/ProductImg'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'

const SingleProduct = () => {
  const params = useParams()
  const productId = params.id
  const { products } = useSelector(store => store.product)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("ProductId:", productId)
        // First check if product exists in Redux
        let foundProduct = products.find((item) => item._id.toString() === productId)

        if (foundProduct) {
          console.log("Found in Redux:", foundProduct)
          setProduct(foundProduct)
        } else {
          // If not in Redux, fetch from API
          console.log("Fetching from API...")
          const res = await axios.get(`http://localhost:8000/api/v1/product/get/${productId}`)
          console.log("API Response:", res.data)
          if (res.data.success) {
            setProduct(res.data.product)
          }
        }
      } catch (error) {
        console.log("Error:", error.message)
        console.log("Error Response:", error.response?.data)
        toast.error("Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId, products])
  return (
    <div className='pt-20 py-10 max-w-7xl mx-auto'>
      {loading ? (
        <div className='text-center py-20 text-xl'>Loading product...</div>
      ) : product ? (
        <>
          <BreadCrums product={product} />


          <div className='mt-10 grid grid-cols-2 items-start'>
            <ProductImg images={product.productImg} />
            <ProductDesc product={product} />


          </div>
        </>
      ) : (
        <div className='text-center py-20'>Product not found</div>
      )}
    </div>
  )
}


export default SingleProduct
