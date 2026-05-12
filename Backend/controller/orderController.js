import razorpayInstance from "../config/razorpay"

export const createOrder = async (req, res) => {
  try {
    const { products, amount, tax, shiping, currency } = req.body
    const option = {
      amount: Math.round(Number(amount) * 100),
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`
    }

    const razorpayOrder = await razorpayInstance.orders.create(option)

  } catch (error) {


  }
}