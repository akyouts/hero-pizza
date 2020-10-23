const Orders = require('../../../models/order')

 function  statusUpadate(){
    return {
        async index(req,res){
            let userId = req.body.orderId
            let status = req.body.status
            await Orders.updateMany({ _id : userId }, { $set: { status : status } });
            res.redirect('/admin/orders')
           
        }
    }

}

module.exports = statusUpadate
