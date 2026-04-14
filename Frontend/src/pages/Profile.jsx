import React from 'react'


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


const Profile = () => {
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
                  <img src="/Anay.jpeg" alt="profile" className='w-32 h-32 rounded-full object-cover border-4 border-orange-600' />
                  <label className='mt-4 cursor-pointer bg-orange-600
                  text-white px-2 py-2 rounded-lg hover:bg-orange-700
                  '>Change Picture
                    <input type="file" accept='image/*' className='hidden' />
                  </label>
                </div>
                {/* Profile-form */}
                <form className='space-y-4 shadow-lg p-5 rounded-lg bg-white'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium'>First Name</label>
                      <input type="text" placeholder='John' name='firstName'
                        className='w-full border rounded-lg px-3 py-2 mt-1' />
                    </div>
                    <div>
                      <label className='block text-sm font-medium'>Last Name</label>
                      <input type="text" placeholder='alexgender' name='lastName' className='w-full border rounded-lg px-3 py-2 mt-1' />
                    </div>

                  </div>
                  <div>
                    <label className='block text-sm font-medium'>Email</label>
                    <input type="email" name='email' disabled className='w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed mt-1' />
                  </div>
                  <div>
                    <label className='block text-sm font-medium'>Phone No.</label>
                    <input
                      type="text"
                      name='phone'
                      placeholder='Enter Your Contact no.'
                      className='w-full border rounded-lg px-3 py-2  mt-1' />
                  </div>
                  <div>
                    <label className='block text-sm font-medium'>Address</label>
                    <input
                      type="text"
                      name='address'
                      placeholder='Enter Your Address'
                      className='w-full border rounded-lg px-3 py-2  mt-1' />
                  </div>
                  <div>
                    <label className='block text-sm font-medium'>City</label>
                    <input
                      type="text"
                      name='city'
                      placeholder='Enter Your City'
                      className='w-full border rounded-lg px-3 py-2  mt-1' />
                  </div>
                  <div>
                    <label className='block text-sm font-medium'>Zip Code</label>
                    <input
                      type="text"
                      name='zipcode'
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
