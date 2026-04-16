import React, { useState } from 'react'


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import avatar from "../assets/avatar.png"
import { toast } from 'sonner'
import axios from 'axios'
import { setUser } from '@/redux/userSlice'


const Profile = () => {
  const { user } = useSelector(store => store.user)
  const params = useParams()
  const userId = params.userId
  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phoneNo: user?.phoneNo,
    city: user?.city,
    zipCode: user?.zipCode,
    profilePic: user?.profilePic,
    role: user?.role,
  })

  const [file, setFile] = useState(null)
  const dispatch = useDispatch()

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






  return (
    <div className='pt-20 min-h-screen bg-gray-100'>

      <Tabs defaultValue="profile" className="max-w-7xl mx-auto w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div>
            <div className='flex flex-col justify-center items-center bg-gray-100'>
              <h1 className='font-bold mb-7 text-2xl text-gray-800'>Update Profile</h1>
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
                    <input
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

        </TabsContent>
        <TabsContent value="orders">

        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                Generate and download your detailed reports. Export data in
                multiple formats for analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              You have 5 reports ready and available to export.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Manage your account preferences and options. Customize your
                experience to fit your needs.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Configure notifications, security, and themes.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

    </div>

  )
}

export default Profile
