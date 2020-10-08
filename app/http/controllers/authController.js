const Usermodel = require("../../models/user")
const bcrypt = require('bcrypt')

const passport = require('passport')
const admin = require("../middlewares/admin")


function authController(){    
    return {
        login(req, res) {
            res.render('auth/login')
        },
        postLogin(req,res,next){
           passport.authenticate('local', (err,user,info)=>{
               if(err){
                   req.flash('error',info.message)
                   return next(err)
               }
               if(!user){
                req.flash('error',info.message)
                return res.redirect('/login')
               }
               req.logIn(user,(err)=>{
                   if(err)
                   {
                        req.flash('error',info.message)
                       return next(err)
                       
                   }
                   if (user.role == 'admin')
                   {
                       return res.redirect('/admin/orders')
                   }  
                   res.redirect('/')

               })
               
           })(req,res,next)
        },
        register(req,res){
            res.render('auth/register')
        },
        async postRegister(req,res){
           const {name,email,password} = req.body
           if(!name || !email || !password){
           req.flash('error','All fields are required')
           req.flash('name',name)
           req.flash('email', email)
           return res.redirect('/register')
        }
        Usermodel.exists({ email: email}, (err,result)=>{
            if(result){
                req.flash('error','Email already ')
           req.flash('name',name)
           req.flash('email', email)
           return res.redirect('/register')
            }
        })


        //hasing password using bcrypt

        const hashpassword = await bcrypt.hash(password,10)

        const newuser = new Usermodel({
            name : name,
            email : email,
            password: hashpassword
          })
         newuser.save().then((user)=>{
             //login
             return res.redirect('/')
         }).catch(err =>{
            req.flash('error','Something went wrong')
            req.flash('name',name)
            req.flash('email', email)
            return res.redirect('/register')
         })
             
         

           
           
        },
        logout(req,res){
            req.logout()
            return res.redirect('/login')
        }
    }
}

module.exports = authController