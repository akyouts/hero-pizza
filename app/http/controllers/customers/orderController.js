const ordres = require('../../../models/order')

function orderController(){
    return{
        store(req,res){
            const { phone, address } = req.body
            if ( !phone || !address){
                req.flash('error','All fields are required')
                return res.redirect('/cart')
                
            }
            const newOrder = new ordres({
                customerid: req.user._id,
              items : req.session.cart.items,
              phone : phone,
              address : address
              
            })
            newOrder.save().then(result=>{
                req.flash("Success","All Placed Successfully")
                return res.redirect('/')
            }).catch(err =>{
                req.flash("error","Something went wrong")
                console.log(err)
                return res.redirect('/cart')
            })

        }
    }
}

module.exports = orderController