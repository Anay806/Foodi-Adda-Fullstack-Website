import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/productSlice';
import axios from 'axios';
import { toast } from 'sonner';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const { products } = useSelector(store => store.product);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8000/api/v1/product/getallproducts`);
        if (res.data.success) {
          dispatch(setProducts(res.data.products));
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch Products");
      } finally {
        setLoading(false);
      }
    };
    getAllProducts();
  }, [dispatch]);



  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`}>
        <AiOutlineArrowRight
          className="arrow"
          style={{
            ...style,
            display: "block",
            fontSize: "24px",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            right: "50px",
          }}
        />
      </div>
    );
  };
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className}`}
        style={{ zIndex: 3 }}
      >
        <AiOutlineArrowLeft
          className="arrow"
          style={{
            ...style,
            display: "block",
            fontSize: "24px",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            left: "50px",
          }}
        />
      </div>
    );
  };

  var settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="w-full">
      <Slider {...settings}>
        {Array.isArray(products) && products.length > 0 ? (
          products.slice(0, 15).map((item, index) => {
            return (
              <div
                key={index}
                className="bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] via-[#fdbb2d] to-[#00c9ff] h-[600px] -z-10"
              >
                <div className="flex flex-col md:flex-row gap-10 justify-center h-[600px] my-20 md:my-0 items-center px-4">
                  <div className="md:space-y-6 space-y-3">
                    <h3 className="text-red-800 font-semibold font-sans text-sm">
                      Powering the world with the best Food Items
                    </h3>
                    <h1 className="md:text-4xl text-xl font-white font-bold uppercase lineclamp-2 ">
                      {item.productName}
                    </h1>
                    <p className="md:w-[500px] lineclamp-3 text-white-700 pr-7">
                      {item.productDesc}
                    </p>
                    <button onClick={() => navigate(`/product/${item._id}`)} className="bg-gradient-to-r from-[#FD7F2C] to-[#FF6200] rounded-md px-4 py-2 text-white font-semibold hover:scale-105 transition-transform ">
                      Shop now
                    </button>
                  </div>
                  <img
                    src={item.productImg[0]?.url}
                    alt={item.productName}
                    className="rounded-full w-[450px] hover:scale-105 transition-all shadow-2xl shadow-red-200"
                    onClick={() => navigate(`/product/${item._id}`)}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-gray-200 h-[600px] flex items-center justify-center">
            <p className="text-gray-600">Loading products...</p>
          </div>
        )}
      </Slider>
    </div>
  );
};

export default Carousel;
