import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '@/redux/productSlice';
import { useNavigate } from 'react-router-dom';


const Hero = () => {
  const { products } = useSelector(store => store.product)
  const [allProducts, setAllProducts] = useState([])
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  let getAllProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/product/getallproducts`);

      if (res.data.success) {
        setAllProducts(res.data.products)
        dispatch(setProducts(res.data.products))

      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch Products. please try again  later.")


    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      className="w-full"
    >
      {
        allProducts && allProducts.length > 0 ? (
          allProducts.map((item, index) => (
            <SwiperSlide key={index} className='h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
              <div className="w-full px-4 md:px-8 py-8 md:py-0">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-between items-center h-[600px] md:h-screen">
                  {/* Text Content */}
                  <div className="md:space-y-8 space-y-4 md:max-w-xl flex-1 text-center md:text-left order-2 md:order-1">
                    <div className="space-y-2">
                      <p className="text-orange-400 font-semibold text-sm tracking-widest uppercase">
                        Premium Quality Products
                      </p>
                      <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
                        {item.productName}
                      </h1>
                    </div>

                    <p className="text-gray-300 text-base md:text-lg leading-relaxed line-clamp-4">
                      {item.productDesc}
                    </p>

                    {/* Price and Rating */}
                    <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                      <span className="text-2xl md:text-3xl font-bold text-orange-400">
                        ₹{item.productPrice}
                      </span>
                      {item.rating && (
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-gray-300">{item.rating}</span>
                        </div>
                      )}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                      <Button
                        onClick={() => navigate(`/product/${item._id}`)}
                        className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105"
                      >
                        Shop Now
                      </Button>
                      <Button
                        className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-slate-900 transition-all duration-300"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>

                  {/* Image Container */}
                  <div className="flex-1 flex items-center justify-center order-1 md:order-2">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-3xl opacity-20 -z-10"></div>
                      <img
                        className="w-80 md:w-96 h-80 md:h-96 rounded-full object-cover hover:scale-105 transition-transform duration-500 shadow-2xl shadow-orange-500/20 border-4 border-orange-400/30 cursor-pointer"
                        onClick={() => navigate(`/product/${item._id}`)}
                        src={item.productImg[0]?.url}
                        alt={item.productName}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className='h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800'>
            <div className="text-center">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-400 border-t-transparent"></div>
              </div>
              <p className="text-gray-400 mt-4">Loading amazing products...</p>
            </div>
          </SwiperSlide>
        )
      }
    </Swiper>
  )
}

export default Hero
