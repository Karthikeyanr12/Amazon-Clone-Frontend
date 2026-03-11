import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts,loadProductsFetch } from "../data/products.js";
import { loadCart,loadCartFetch } from "../data/cart.js";
//import "../data/cart-class.js"
//import '../data/car.js';
//import '../data/backend-practice.js'

async function loadPage(){

    try{
        await Promise.all([loadProductsFetch(),loadCartFetch()])
    }catch(error){
        console.log('Unexpected Error. Please try again')
    }

    
    /*
    try{
        //throw 'error1';
        await loadProductsFetch();
        const value = await new Promise((resolve,reject)=>{
            //throw 'error2'
            loadCartFetch(()=>{
                //reject('error3')
                resolve('Hello');
            });
        });
    }catch(error){
        console.log('Unexpexted Error. Please try again later.')
    }*/
    

    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        })
    })

]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve)=>{
    loadProducts(()=>{
        resolve('Hello');
    });
}).then((value)=>{
    console.log(value)
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        })
    }).then(()=>{
        renderOrderSummary();
        renderPaymentSummary();
    })
});
*/

/*
loadProducts(()=>{
    loadCart(()=>{
        renderOrderSummary();
        renderPaymentSummary();
    })
});
*/