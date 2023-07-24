// logic to resolve

// get all 

// import products collection
const products = require('../model/productSchema');



// get all products
exports.getallproducts = async (req, res) => {
    // logic
    try {
        // get all products from products collection in mongodb
        const allProducts = await products.find();
        res.status(200).json(allProducts);  // respond send back to the client
    }
    catch (err) {
        res.status(500).json(err); // error sending back to the client

    }
}

// view particular product details
exports.viewproduct = async (req, res) => {
    //logic
    // get particular product id
    const id = req.params.id;
    // get details of particular product
    try {
        const product = await products.findOne({ id });
        if (product) {
            res.status(200).json(product); // respond send back to the client
        }
        else {
            res.status(401).json("product not found"); // error send back to the client
        }
    }
    catch (err) {
        res.status(401).json(err); // error sending back to the client
    }
}

