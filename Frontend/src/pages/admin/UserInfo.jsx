import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserInfo = () => {
  const navigate = useNavigate()
  return (
    <div className='pt-5 min-h-screen bg-gray-100'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
          <div className='flex justify-between gap-10'>
            <Button onClick={() => navigate(-1)}><ArrowLeft /></Button>
            <h1 className='font-bold mb-7 text-2xl text-gray-800'>Update Profile</h1>

          </div>
          <div className='w-full flex gap-10 justfy-between items-start px-7 max-w-2xl'>
            {/* Profile-pictures */}
            <div className='flex flex-col items-center'>
              <img src={updateUser?.profilePic || avatar} alt="profile" className='w-32 h-30 rounded-full object-cover border-4 border-orange-600' />
              <label className='mt-4 cursor-pointer bg-orange-600
                            text-white px-2 py-2 rounded-lg hover:bg-orange-700
                            '>Change Picture
                <input onChange={handleFileChange} type="file" accept='image/*' className='hidden' />
              </label>
            </div>
            {/* Profile-form */}
            <form onSubmit={handleSubmit} className='space-y-4 shadow-lg p-5 rounded-lg bg-white'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium'>First Name</label>
                  <input
                    type="text"
                    placeholder='John'
                    name='firstName'
                    value={updateUser.firstName}
                    onChange={handleChange}
                    className='w-full border rounded-lg px-3 py-2 mt-1' />
                </div>
                <div>
                  <label className='block text-sm font-medium'>Last Name</label>
                  <input type="text"
                    value={updateUser.lastName}
                    onChange={handleChange}
                    placeholder='alexgender' name='lastName' className='w-full border rounded-lg px-3 py-2 mt-1' />
                </div>

              </div>
              <div>
                <label className='block text-sm font-medium'>Email</label>
                <input type="email"
                  value={updateUser.email}
                  onChange={handleChange}
                  name='email' disabled className='w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed mt-1' />
              </div>
              <div>
                <label className='block text-sm font-medium'>Phone No.</label>
                <input
                  type="text"
                  name='phoneNo'
                  value={updateUser.phoneNo}
                  onChange={handleChange}
                  placeholder='Enter Your Contact no.'
                  className='w-full border rounded-lg px-3 py-2  mt-1' />
              </div>
              <div>
                <label className='block text-sm font-medium'>Address</label>
                <input
                  type="text"
                  name='address'
                  value={updateUser.address}
                  onChange={handleChange}
                  placeholder='Enter Your Address'
                  className='w-full border rounded-lg px-3 py-2  mt-1' />
              </div>
              <div>
                <label className='block text-sm font-medium'>City</label>
                <input
                  type="text"
                  name='city'
                  value={updateUser.city}
                  onChange={handleChange}
                  placeholder='Enter Your City'
                  className='w-full border rounded-lg px-3 py-2  mt-1' />
              </div>
              <div>
                <label className='block text-sm font-medium'>Zip Code</label>
                <Input
                  type="text"
                  name='zipCode'
                  value={updateUser.zipCode}
                  onChange={handleChange}
                  placeholder='Enter Your Zip Code'
                  className='w-full border rounded-lg px-3 py-2  mt-1' />
              </div>
              <Button className='w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg'>Update Profile</Button>

            </form>

          </div>

        </div>

      </div>

    </div>
  )
}

export default UserInfo
