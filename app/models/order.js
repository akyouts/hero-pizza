const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
    customerid:{
          type : mongoose.Schema.Types.ObjectId,
          ref : 'User',
          required : true
    },
    items : {type: Object , required : true},
    phone : {type: Number , required: true},
    address : {type: String , required: true},
    status: {type: String, default:'Order Placed'},
    paymentType : {type: String, default: 'COD'}
    
},{timestamps:true})

module.exports = mongoose.model('order',ordersSchema)

 