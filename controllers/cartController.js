
// import cartSchema
const carts = require('../model/cartSchema');

// logic for cart
// add products to cart
exports.addtocart = async (req, res) => {
    // get specific product details from the request
    // javascript destructuring
    const { id, title, price, image, quantity } = req.body

    try {
        // check if product is already in cart then uodate the quantity and price
        const product = await carts.findOne({ id });
        if (product) {
            // if product is already in cart,increment the quantity
            product.quantity += 1
            // update grand total
            product.grandTotal = product.price * product.quantity
            // to save changes into the db
            product.save();
            // response send back to client
            res.status(200).json("item updated in cart");
        }
        else {
            // else  -> product is not in the cart, add to cart
            const newProduct = await carts({ id, title, price, image, quantity, grandTotal: price });

            // save new product
            await newProduct.save();
            // response send back to client
            res.status(200).json("item added to cart");
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}

// get cart product from db

exports.getcart = async (req, res) => {
    try {
        // logic
        // get all products from cart
        const allcart = await carts.find();
        res.status(200).json(allcart);
    }
    catch (error) {
        res.status(401).json(error)
    }
}

// cart delete
exports.delete = async (req, res) => {
    // remove cart items
    // get product id from parameter
    const { id } = req.params
    try {
        const removecartitems = await carts.deleteOne({ id })
        if (removecartitems.deleteCount != 0) {
            // get all cart items after removing particular cart items
            const allcartitems = await carts.find()
            res.status(200).json(allcartitems)
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}

// increment cart items
exports.incrementCartItems = async (req, res) => {
    // get product id from request
    const { id } = req.params
    try {
        // check if product is already in cart
        const product = await carts.findOne({ id })
        if (product) {
            // update the quantity and grand total
            product.quantity += 1
            product.grandTotal = product.price * product.quantity
            // save changes into the db
            await product.save()
            // updated details send back to client
            const allcartitems = await carts.find()
            // response send back to client
            res.status(200).json(allcartitems)
        }
        else {
            res.status(404).json("product not found")
        }
    }
    catch (error) {
        res.status(404).json(error)
    }
}

// decrement cart items
exports.decrementCartItems = async (req, res) => {
    // get product id from request
    const { id } = req.params
    try {
        // check if product is already in cart
        const product = await carts.findOne({ id })
        if (product) {
            // update the quantity and grand total
            product.quantity -= 1
            product.grandTotal = product.price * product.quantity
            if (product.quantity == 0) {
                const removecartitems = await carts.deleteOne({ id })
                // updated details send back to client
                const allcartitems = await carts.find()
                // response send back to client
                res.status(200).json(allcartitems)
            }
            else {
                product.grandTotal = product.price * product.quantity

                // save changes into the db
                await product.save()
                // updated details send back to client
                const allcartitems = await carts.find()
                // response send back to client
                res.status(200).json(allcartitems)
            }
        }
        else {
            res.status(404).json("product not found")
        }
    }
    catch (error) {
        res.status(404).json(error)
    }
}