import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/userSlice'

const Navbar = () => {
  const { user } = useSelector(store => store.user)
  const accessToken = localStorage.getItem('accessToken')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cart } = useSelector(store => store.product)


  const logOutHandler = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/logout", {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (res.data.success) {
        dispatch(setUser(null))
        toast.success(res.data.message)
      }

    } catch (error) {
      console.log(error);


    }
  }
  return (
    <header className='bg-orange-100 fixed w-full  shadow-2xl z-20 border-b border-orange-200'>
      <div className='max-w-7xl mx-auto flex justify-between items-center py-3'>

        {/* //logo-section */}
        <div >
          <h2 className='text-4xl font-bold'>Foodi<span className='text-orange-600 '>z</span>
          </h2>
        </div>

        {/* nav-section */}
        <nav className='flex gap-10 justify-between items-center'>
          <ul className='flex gap-7 items-center text-xl font-semibold'>
            <Link to={'/'}><li>Home</li></Link>
            <Link to={'/products'}><li>Products</li></Link>
            {
              user && <Link to={`/profile/${user._id}`}><li>Hello, {user.firstName}</li></Link>
            }
          </ul>
          <Link to={'/cart'} className='relative'>
            <ShoppingCart />
            <span className='bg-orange-500 rounded-full absolute text-white -top-3 -right-5 px-2'>{cart.items.length}</span>
          </Link>
          {
            user ? <Button onClick={logOutHandler} className="bg-orange-500 text-xl text-white cursor-pointer">Logout</Button> : <Button onClick={() => navigate('/login')} className="bg-orange-500 text-white text-xl cursor-pointer">Login</Button>
          }


        </nav>





      </div>

    </header>
  )
}

export default Navbar
