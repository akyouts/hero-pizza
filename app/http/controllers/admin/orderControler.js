const Orders = require('../../../models/order')


function adminOrder(){

    return {
        index(req,res){
            Orders.find({status : {$ne : 'completed'}},null,{sort : {'createdAdt' : -1}}).populate('customerid','-password').exec((err,orders)=>{
                res.render('admin/orders',{orders : orders})
            })
        }
    }
}

module.exports = adminOrder