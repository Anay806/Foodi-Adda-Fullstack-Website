import express from 'express'
import { createOrder, verifyPayment } from '../controller/orderController.js'
import { isAuthenticated } from "../middleware/isAuthenticated.js"

const router = express.Router()

router.post("/create-order", isAuthenticated, createOrder)
router.post("/verify-payment", isAuthenticated, verifyPayment)



export default router