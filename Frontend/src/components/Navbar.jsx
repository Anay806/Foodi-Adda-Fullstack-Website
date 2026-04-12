import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const Navbar = () => {
  const user = true
  return (
    <header className='bg-orange-100 fixed w-full  shadow-2xl z-20 border-b border-orange-200'>
      <div className='max-w-7xl mx-auto flex justify-between items-center py-3'>

        {/* //logo-section */}
        <div >
          <h2 className='text-2xl font-bold'>Foodi<span className='text-orange-600 '>z</span>
          </h2>
        </div>

        {/* nav-section */}
        <nav className='flex gap-10 justify-between items-center'>
          <ul className='flex gap-7 items-center text-xl font-semibold'>
            <Link to={'/'}><li>Home</li></Link>
            <Link to={'/products'}><li>Products</li></Link>
            {
              user && <Link to={'/profile'}><li>Hello User</li></Link>
            }
          </ul>
          <Link to={'/cart'} className='relative'>
            <ShoppingCart />
            <span className='bg-orange-500 rounded-full absolute text-white -top-3 -right-5 px-2'>20</span>
          </Link>
          {
            user ? <Button className="bg-orange-500 text-xl text-white cursor-pointer">Logout</Button> : <Button className="bg-orange-500 text-white text-xl cursor-pointer">Login</Button>
          }


        </nav>





      </div>

    </header>
  )
}

export default Navbar
