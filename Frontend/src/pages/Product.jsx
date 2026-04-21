import FilterSideBar from '@/components/FilterSideBar'
import React, { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ProductCard from '@/components/ProductCard'
import { toast } from 'sonner'
import axios from 'axios'



const Product = () => {
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 999])

  const getAllProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/product/getAllproducts`);
      if (res.data.success) {
        setAllProducts(res.data.products)
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products. please try again later.")

    }
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  console.log(allProducts);



  return (
    <div className='pt-20 pb-10'>
      <div className='max-w-7xl mx-auto flex gap-7'>
        {/* sideBar */}
        <FilterSideBar allProducts={allProducts} priceRange={priceRange} />

        {/* Main product section */}
        <div className='flex flex-col flex-1'>
          <div className='flex justify-end mb-4'>
            <Select>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="lowToHigh">Price: low to high</SelectItem>
                  <SelectItem value="highToLow">Price: high to low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

          </div>
          {/* Product-grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7'>

            {
              allProducts.map((product) => {
                return <ProductCard key={product._id} product={product} loading={loading} />;
              })
            }

          </div>
        </div>

      </div>

    </div>
  )
}

export default Product
