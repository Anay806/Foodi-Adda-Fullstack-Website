import { Product } from "../models/productModel.js";
import cloudinary from "../Utils/cloudinary.js";
import getDataUri from "../Utils/dataUri.js";

export const addProduct = async (req, res) => {
  try {
    const { productName, productDesc, productPrice, category, brand } = req.body;
    const userId = req.id;

    if (!productName || !productDesc || !productPrice || !category || !brand) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }

    //Handle multiple image uploads
    let productImg = [];
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const fileUri = getDataUri(file)
        const result = await cloudinary.uploader.upload(fileUri, {
          folder: "mern_products" // cloudinary forder name
        });

        productImg.push({
          url: result.secure_url,
          public_id: result.public_id
        })
      }

    }

    //create a product In DB
    const newProduct = await Product.create({
      userId,
      productName,
      productDesc,
      productPrice,
      category,
      brand,
      productImg,
    })

    return res.status(200).json({
      success: true,
      message: "Product added successFully",
      product: newProduct,
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })

  }
}

export const getAllProduct = async (_, res) => {
  try {
    const products = await Product.find()
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "No product available",
        products: []
      })
    }
    return res.status(200).json({
      success: true,
      products
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })

  }
}