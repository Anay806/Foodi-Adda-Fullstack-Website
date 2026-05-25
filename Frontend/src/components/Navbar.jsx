import { ShoppingCart, Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/userSlice'
import { setCart } from '@/redux/productSlice'

const Navbar = () => {
  const { user } = useSelector(store => store.user)
  const accessToken = localStorage.getItem('accessToken')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cart } = useSelector(store => store.product)
  const admin = user?.role === "admin" ? true : false
  const [menuOpen, setMenuOpen] = useState(false)


  const logOutHandler = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/logout", {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (res.data.success) {
        localStorage.removeItem('accessToken')
        dispatch(setUser(null))
        dispatch(setCart({ items: [], totalPrice: 0 }))
        toast.success(res.data.message)
        setMenuOpen(false)
        navigate('/')
      }

    } catch (error) {
      console.log(error);
      // Clear local data even if logout API fails
      localStorage.removeItem('accessToken')
      dispatch(setUser(null))
      dispatch(setCart({ items: [], totalPrice: 0 }))
      toast.success('Logged out successfully')
      setMenuOpen(false)
      navigate('/')
    }
  }

  const handleNavClick = () => {
    setMenuOpen(false)
  }

  return (
    <header className='bg-orange-100 fixed w-full shadow-2xl z-20 border-b border-orange-200'>
      <div className='max-w-7xl mx-auto flex justify-between items-center py-3 px-4'>

        {/* Logo Section */}
        <div>
          <h2 className='text-3xl md:text-4xl font-bold'>Foodi<span className='text-orange-600'>z</span></h2>
        </div>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex gap-10 justify-between items-center'>
          <ul className='flex gap-7 items-center text-lg md:text-xl font-semibold'>
            <Link to={'/'}><li className='hover:text-orange-600 cursor-pointer transition'>Home</li></Link>
            <Link to={'/products'}><li className='hover:text-orange-600 cursor-pointer transition'>Products</li></Link>
            {
              user && <Link to={`/profile/${user._id}`}><li className='hover:text-orange-600 cursor-pointer transition'>Hello, {user.firstName}</li></Link>
            }
            {
              admin && <Link to={`/dashboard/sales`}><li className='hover:text-orange-600 cursor-pointer transition'>Dashboard</li></Link>
            }
          </ul>
          <Link to={'/cart'} className='relative'>
            <ShoppingCart size={24} />
            <span className='bg-orange-500 rounded-full absolute text-white -top-3 -right-5 px-2 text-sm'>{cart.items.length}</span>
          </Link>
          {
            user ? <Button onClick={logOutHandler} className="bg-orange-500 text-lg text-white cursor-pointer">Logout</Button> : <Button onClick={() => navigate('/login')} className="bg-orange-500 text-white text-lg cursor-pointer">Login</Button>
          }
        </nav>

        {/* Mobile Navigation - Hamburger Menu */}
        <div className='md:hidden flex items-center gap-4'>
          <Link to={'/cart'} className='relative'>
            <ShoppingCart size={24} />
            <span className='bg-orange-500 rounded-full absolute text-white -top-3 -right-5 px-2 text-xs'>{cart.items.length}</span>
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='text-2xl focus:outline-none'
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className='absolute top-full left-0 right-0 bg-orange-100 md:hidden border-b border-orange-200 shadow-lg'>
            <ul className='flex flex-col gap-4 p-6 text-lg font-semibold'>
              <Link to={'/'} onClick={handleNavClick}><li className='hover:text-orange-600 cursor-pointer transition'>Home</li></Link>
              <Link to={'/products'} onClick={handleNavClick}><li className='hover:text-orange-600 cursor-pointer transition'>Products</li></Link>
              {
                user && <Link to={`/profile/${user._id}`} onClick={handleNavClick}><li className='hover:text-orange-600 cursor-pointer transition'>Profile - {user.firstName}</li></Link>
              }
              {
                admin && <Link to={`/dashboard/sales`} onClick={handleNavClick}><li className='hover:text-orange-600 cursor-pointer transition'>Dashboard</li></Link>
              }
              <div className='flex flex-col gap-3 pt-2 border-t border-orange-200'>
                {
                  user ? <Button onClick={logOutHandler} className="bg-orange-500 text-white cursor-pointer w-full">Logout</Button> : <Button onClick={() => { navigate('/login'); setMenuOpen(false); }} className="bg-orange-500 text-white cursor-pointer w-full">Login</Button>
                }
              </div>
            </ul>
          </div>
        )}

      </div>

    </header>
  )
}

export default Navbar
