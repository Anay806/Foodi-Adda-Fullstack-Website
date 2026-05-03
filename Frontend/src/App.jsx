import React from 'react'
import { Button } from './components/ui/button';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Verify from './pages/Verify';
import VerifyEmail from './pages/VerifyEmail';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import AdminSales from './pages/admin/AdminSales';
import AdminProduct from './pages/admin/AdminProduct';
import AddProduct from './pages/admin/AddProduct';
import AdminOrders from './pages/admin/AdminOrders';
import ShowUserOrders from './pages/admin/ShowUserOrders';
import AdminUsers from './pages/admin/AdminUsers';
import UserInfo from './pages/admin/UserInfo';
import ProtectedRoute from './components/ProtectedRoute';
import SingleProduct from './pages/SingleProduct';

const router = createBrowserRouter([
  {
    path: '/',
    element: <><Navbar /><Home /> <Footer /></>
  },
  {
    path: '/signup',
    element: <><Signup /></>
  },
  {
    path: '/login',
    element: <><Login /></>
  },
  {
    path: '/verify',
    element: <><Verify /></>
  },
  {
    path: '/verify/:token',
    element: <><VerifyEmail /></>
  },
  {
    path: '/products/:id',
    element: <><Navbar /><SingleProduct /></>

  },
  {
    path: '/profile/:userId',
    element: <ProtectedRoute><Navbar /><Profile /><Footer /></ProtectedRoute>
  },
  {
    path: '/products',
    element: <><Navbar /><Product /><Footer /></>
  },
  {
    path: '/cart',
    element: <ProtectedRoute><Navbar /><Cart /></ProtectedRoute>
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute adminOnly={true}><Navbar /><Dashboard /></ProtectedRoute>,
    children: [
      {
        path: "sales",
        element: <AdminSales />
      },
      {
        path: "add-product",
        element: <AddProduct />
      },
      {
        path: "products",
        element: <AdminProduct />
      },
      {
        path: "orders",
        element: <AdminOrders />
      },
      {
        path: "users/orders/:userId",
        element: <ShowUserOrders />
      },
      {
        path: "users",
        element: <AdminUsers />
      },
      {
        path: "users/:id",
        element: <UserInfo />
      },
    ]
  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />

    </>
  )


}

export default App;

