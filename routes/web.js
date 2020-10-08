const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')

const ordersController = require('../app/http/controllers/customers/orderController')

const adminOrderController = require('../app/http/controllers/admin/orderControler')


//middlewares
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')



function initRoutes(app) {
    app.get('/', homeController().index)
    app.get('/login',guest,authController().login)
    app.post('/login',authController().postLogin)
    app.get('/cart',cartController().index)
    app.post('/update-cart',cartController().update)
    app.get('/register',guest,authController().register)
    app.post('/register',authController().postRegister)
    app.get('/logout',authController().logout)

    //Customer Routes
    app.get('/customers/orders',auth,ordersController().index)
    app.post('/orders',auth,ordersController().store)


    //admin Routes
    app.get('/admin/orders',admin,adminOrderController().index)
   

    

}

module.exports = initRoutes

