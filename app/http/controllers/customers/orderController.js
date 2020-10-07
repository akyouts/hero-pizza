const ordres = require('../../../models/order')
const moment = require('moment')

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
                delete req.session.cart
                return res.redirect('/customers/orders')
            }).catch(err =>{
                req.flash("error","Something went wrong")
                console.log(err)
                return res.redirect('/cart')
            })

        },
        async index(req,res){
            const logingUserOrders = await ordres.find({customerid : req.user._id}, null , {sort: {'createdAt':-1}})
            res.render('customers/orders',{orders : logingUserOrders, moment: moment})
            
        }
    }
}

module.exports = orderController