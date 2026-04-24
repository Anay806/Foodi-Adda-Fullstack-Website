
export const getCart = async () => {
  try {
    const userId = req.id;

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status({ success: true, message: "Cart is Empty", cart: [] })

    }
    res.status(200).json({
      success: true,
      cart
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })

  }
}

export const addToCart = async () => {
  try {
    const userId = req.id;
    const { productId } = req.body;

    //check if the  product exist

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      })
    }

    //find the user cart if exist

    let cart = await Cart.findOne({ userId });

    //if cart doesn't exist , the create new one
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, questity: 1, price: product.price }],
        totalPrice: product.productPrice
      })
    }
    else {
      //Find if  product exist in the cart
      const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId)
      if (itemIndex > -1) {
        //if product exist in the cart update the quentity and price
        cart.items[itemIndex].quentity += 1;
      } else {
        //if product new -> add to the cart
        cart.items.push({
          productId,
          quentity: 1,
          price: product.productPrice,
        })
      }

      //update the total price
      cart.totalPrice = cart.items.reduce(
        (acc, item) => acc + item.price * item.quentity
      )
    }

    //save update cart
    await cart.save();

    //populate the cart details before sending responce
    const polulatedCart = await Cart.findById(cart._id).populate(items.productId);

    res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cart: populatedCart
    })




  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })

  }

}

export const removeFromCart = async () => {
  try {

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })

  }
}