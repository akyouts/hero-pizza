const Order = require('../../../models/order')


function adminOrder(){

    return {
        index(req,res){
            Order.find({status : {$ne : 'completed'}},null,{sort : {'createdAdt' : -1}}).populate('customerid','-password').then(orders=>{
                if (req.xhr)
                {
                    
                   
                    return res.json(orders)

                }
                return res.render('admin/orders')
            }).catch(err => 
                {
                    console.log(err)
                    res.render('<h1>Something Went Wrong</h1>')
                })
        }
    }
}

module.exports = adminOrder