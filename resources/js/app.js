import axios from 'axios'
import Noty from 'noty';
import { initAdmin } from './admin'
 

let addtocart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelectorAll('.cartCounter')


function updateCart(pizza){
    axios.post("/update-cart",pizza).then((res)=>{
        cartCounter[0].innerText = res.data.totalQuantity

        new Noty({
            
            text : 'Item added to cart',
            timeout : 1000,
            progressBar : false,
            type : 'success'
            
        }).show();
     
        
    }).catch((err)=>{
        new Noty({
            
            text : 'Something went Wrong',
            timeout : 1000,
            progressBar : false,
            type : 'error'            
        }).show();
    })
}

addtocart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        // console.log(JSON.parse(btn.dataset.pizza))
        
        updateCart(JSON.parse(btn.dataset.pizza))
    })
})

initAdmin()