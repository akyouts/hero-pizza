
function cartController() {
    return {
        index(req, res) {
            res.render('customers/cart')
        },
        update(req,res){
           if(!req.session.cart){
               req.session.cart = {
                   items : {},
                   totalQuantity : 0,
                   totalPrice : 0
               }
           }
           let cart = req.session.cart

           if (!cart.items[req.body._id]){
               cart.items[req.body._id]={
                   item:req.body,
                   qty: 1
               }
               cart.totalQuantity = cart.totalQuantity + 1
               cart.totalPrice = cart.totalPrice + req.body.price

                   
               }
               else{
                   cart.items[req.body._id].qty=cart.items[req.body._id].qty+1
                     cart.totalQuantity=  cart.totalQuantity+1 
                   cart.totalPrice= cart.totalPrice+ req.body.price
               }
               return res.json({
                   totalQuantity : req.session.cart.totalQuantity
               })

           },
           clearCart(req,res)
           {
            req.session.cart = {
                items : {},
                totalQuantity : 0,
                totalPrice : 0
            }
            return res.redirect('/cart')
           }

           
            
        }
    }


module.exports = cartController