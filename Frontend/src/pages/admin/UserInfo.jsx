import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import avatar from "../../assets/avatar.png"
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setUser } from '@/redux/userSlice'

const UserInfo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [updateUser, setUpdateUser] = useState(null)
  const [file, setFile] = useState(null)
  const { user } = useSelector(store => store.user)
  const params = useParams()
  const userId = params.id

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    setUpdateUser({ ...updateUser, profilePic: URL.createObjectURL(selectedFile) }) //preview only
  }

  const handleSubmit = async (e) => {
    e.preventDefault()


    const accessToken = localStorage.getItem("accessToken")

    try {
      //use form data for text + file
      const formData = new FormData()

      formData.append("firstName", updateUser.firstName)
      formData.append("lastName", updateUser.lastName)
      formData.append("email", updateUser.email)
      formData.append("phoneNo", updateUser.phoneNo)
      formData.append("address", updateUser.address)
      formData.append("city", updateUser.city)
      formData.append("zipCode", updateUser.zipCode)
      formData.append("role", updateUser.role)

      if (file) {
        formData.append("file", file) //image file for backend multer
      }

      const res = await axios.put(`http://localhost:8000/api/v1/user/update/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data"
        }
      })

      if (res.data.success) {
        toast.success(res.data.message)
        dispatch(setUser(res.data.user))
        console.log(userId);

      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to update Profile")


    }

  }

  const getUserDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/get-user/${userId}`)
      if (res.data.success) {
        setUpdateUser(res.data.user)
      }

    } catch (error) {
      console.log(error);


    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])


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
              <Label className='mt-4 cursor-pointer bg-orange-600
                            text-white px-2 py-2 rounded-lg hover:bg-orange-700
                            '>Change Picture
                <input onChange={handleFileChange} type="file" accept='image/*' className='hidden' />
              </Label>
            </div>
            {/* Profile-form */}
            <form onSubmit={handleSubmit} className='space-y-4 shadow-lg p-5 rounded-lg bg-white'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label className='block text-sm font-medium'>First Name</Label>
                  <Input
                    type="text"
                    placeholder='John'
                    name='firstName'
                    value={updateUser?.firstName}
                    onChange={handleChange}
                    className='w-full border rounded-lg px-3 py-2 mt-1' />
                </div>
                <div>
                  <Label className='block text-sm font-medium'>Last Name</Label>
                  <Input type="text"
                    value={updateUser?.lastName}
                    onChange={handleChange}
                    placeholder='alexgender' name='lastName' className='w-full border rounded-lg px-3 py-2 mt-1' />
                </div>

              </div>
              <div>
                <Label className='block text-sm font-medium'>Email</Label>
                <Input type="email"
                  value={updateUser?.email}
                  onChange={handleChange}
                  name='email' disabled className='w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed mt-1' />
              </div>
              <div>
                <Label className='block text-sm font-medium'>Phone No.</Label>
                <Input
                  type="text"
                  name='phoneNo'
                  value={updateUser?.phoneNo}
                  onChange={handleChange}
                  placeholder='Enter Your Contact no.'
                  className='w-full border rounded-lg px-3 py-2  mt-1' />
              </div>
              <div>
                <Label className='block text-sm font-medium'>Address</Label>
                <Input
                  type="text"
                  name='address'
                  value={updateUser?.address}
                  onChange={handleChange}
                  placeholder='Enter Your Address'
                  className='w-full border rounded-lg px-3 py-2  mt-1' />
              </div>
              <div>
                <Label className='block text-sm font-medium'>City</Label>
                <Input
                  type="text"
                  name='city'
                  value={updateUser?.city}
                  onChange={handleChange}
                  placeholder='Enter Your City'
                  className='w-full border rounded-lg px-3 py-2  mt-1' />
              </div>
              <div>
                <Label className='block text-sm font-medium'>Zip Code</Label>
                <Input
                  type="text"
                  name='zipCode'
                  value={updateUser?.zipCode}
                  onChange={handleChange}
                  placeholder='Enter Your Zip Code'
                  className='w-full border rounded-lg px-3 py-2  mt-1' />
              </div>
              <div className='flex gap-3 items-center'>
                <Label className='block text-sm font-medium'>Role :</Label>
                <RadioGroup value={updateUser?.role} onValueChange={(value) => setUpdateUser({ ...updateUser, role: value })} className='flex items-center'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='user' id='user' />
                    <Label htmlFor='user'>User</Label>

                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='admin' id='admin' />
                    <Label htmlFor='admin'>Admin</Label>

                  </div>
                </RadioGroup>
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
