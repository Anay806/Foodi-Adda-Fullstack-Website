import express from 'express'
import { createOrder, getAllOrdersAdmin, getMyOrder, verifyPayment } from '../controller/orderController.js'
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js"

const router = express.Router()

router.post("/create-order", isAuthenticated, createOrder)
router.post("/verify-payment", isAuthenticated, verifyPayment)
router.get("/myorder", isAuthenticated, getMyOrder)
router.get("/all", isAuthenticated, isAdmin, getAllOrdersAdmin)
router.get("/user-order/:userId", isAuthenticated, isAdmin, getMyOrder)



export default router