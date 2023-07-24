// import wishlistSchema
const wishlists = require('../model/wishlistSchema');
// logic for wishlist
// add products to wishlist
exports.addtowishlist = async (req, res) => {
    // get specific product details from the request
    
    // javascript destructuring
    
    const {id,title,price,image} = req.body

    // logic for wishlist
   try{
      // check if product already in wishlist
      const item = await wishlists.findOne({id});
      if(item){
          res.status(401).json("item already in wishlist");
      }
      else{
          // product is added to wishlist
          const newProduct = await wishlists({id,title,price,image});
          // to store in db
          await newProduct.save();
          res.status(200).json("item added to wishlist");  // response send back to client
      }
   }
   catch(error){
    res.status(404).json(error)
   }
}

// get wishlist product from db
exports.getwishlist = async (req, res) => {
    try{
       // logic
       // get all products from wishlist
       const allwishlist = await wishlists.find();
       res.status(200).json(allwishlist);
    }
    catch(error){
        res.status(404).json(error)
    }
}

// delete wishlist product from db
exports.deletewishlist = async (req, res) => {
    // get particular product id
    const {id} = req.params
    try{
       // logic
       // delete wishlist product
       const removewishlist = await wishlists.deleteOne({id});
       if(removewishlist){
        // get all wishlist products after removing particular product
        const removewishlist = await wishlists.find();
        res.status(200).json(removewishlist); // response send back to client
        
       }
    }
    catch(error){
        res.status(404).json(error)
    }
}