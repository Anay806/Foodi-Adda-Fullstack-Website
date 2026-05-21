import { BadgeCheck, ChefHat, Leaf, Truck } from 'lucide-react';
import React from 'react'

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <Truck className="w-10 h-10 text-orange-500" />,
      title: "Fast Delivery",
      desc: "Get your food delivered hot and fresh at your doorstep quickly.",
    },

    {
      id: 2,
      icon: <Leaf className="w-10 h-10 text-orange-500" />,
      title: "Fresh Ingredients",
      desc: "We use only fresh and healthy ingredients for every meal.",
    },

    {
      id: 3,
      icon: <ChefHat className="w-10 h-10 text-orange-500" />,
      title: "Expert Chefs",
      desc: "Prepared by experienced chefs with amazing taste and quality.",
    },

    {
      id: 4,
      icon: <BadgeCheck className="w-10 h-10 text-orange-500" />,
      title: "Best Quality",
      desc: "Premium quality food with hygienic cooking process.",
    },
  ];

  return (
    <div>
      <div className="w-full py-20 bg-gradient-to-r from-orange-50 to-red-50">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Why Choose Us
          </h1>

          <p className="mt-4 text-gray-500 text-sm">
            Experience the best taste with premium quality food.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {features.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-3xl shadow-lg text-center hover:-translate-y-2 hover:shadow-2xl duration-300"
            >

              {/* Icon */}
              <div className="flex justify-center">
                <div className="bg-orange-100 p-5 rounded-full">
                  {item.icon}
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold mt-6">
                {item.title}
              </h2>

              {/* Description */}
              <p className="text-gray-500 mt-4 leading-7">
                {item.desc}
              </p>

            </div>
          ))}

        </div>
      </div>


    </div>
  )
}

export default Features
