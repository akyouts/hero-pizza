const localStrategy = require('passport-local').Strategy

const User = require('../models/user')
const bcrypt = require('bcrypt')

function init(passport){

    passport.use(new localStrategy({ usernameField: 'email' } , async(email,passowrd,done) =>{
       const user = await User.findOne({email : email})
      
       if(!user)
       {
           return done(null, false, { message : 'No user with this email'})
       }
       bcrypt.compare(passowrd,user.password).then(match =>{
           if(match){
               return done(null,user,{message : 'Logging Complete'})
           }
           
            return done(null, false, { message : 'Eiter password or email is wrong '})
           
       }).catch(err => {
           console.log(err)
        return done(null, false, { message: 'Something went wrong' })

    })

       passport.serializeUser((user, done)=>{
           done(null,user._id)
       })

       passport.deserializeUser((id,done)=>{
           User.findById(id,(err,user)=>{
               done(err,user)
           })
       })

    } ))


}

module.exports = init