import React from 'react'
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 md:flex md:justify-between">
        {/* info */}
        <div className="mb-6 md:mb-0">
          <Link to="/">
            <h1 className=" inline-block text-white-500 border-b-4 border-orange-500 text-4xl font-bold">
              Foodi
              <span className="text-orange-600">z</span>

            </h1>
          </Link>
          <p className="mt-2 text-sm">
            Powering Your World with the best in Foood..
          </p>
          <p className="mt-2 text-sm">
            Eswar Luxury PG, Husamaranahalli, Yelahanka
          </p>
          <p className="text-sm">Email: anayshrivastava9@gmail.com </p>
          <p className="text-sm">Phone: 9356416493</p>
        </div>
        {/* Customer service Link */}
        <div className="mb-6 md:mb-0 ">
          <h3 className="text-xl font-semibold">Customer Services</h3>
          <ul className="mt-2 text-sm space-y-2">
            <li>Contact Us</li>
            <li>Shipping & Returns</li>
            <li>FAQs</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
          </ul>
        </div>
        {/* Social Media Links */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <FaFacebook className="w-6 h-5" />
            <FaInstagram className="w-6 h-5" />
            <FaTwitter className="w-6 h-5" />
            <FaPinterest className="w-6 h-5" />
          </div>
        </div>
        {/* newsLetter subscription */}
        <div>
          <h3 className="text-xl font-semibold">Stay in the Loop</h3>
          <p className="mt-2 text-sm">

            Subscribe to get special offers, free giveaways, and more
          </p>
          <form action="" className="mt-4 flex ">
            <input type="email" placeholder="Your Email Address" className="w-full p-2 bg-white rounded-l-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500" /> <button type="submit" className="bg-orange-600 text-white px-4 rounded-r-md hover:bg-orange-700">Subscribe</button>
          </form>
        </div>
      </div>
      {/* bottom-section */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
        <p className="">&copy; {new Date().getFullYear()}<span>F</span>reash <span>F</span>east. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer
