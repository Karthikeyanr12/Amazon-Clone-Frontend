import { getProduct, loadProductsFetch } from "../data/products.js";
import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { updateCartQuantity } from "../data/cart.js";


async function renderTracking(){
    await loadProductsFetch();
    let trackingHTML='';
    const url=new URL(window.location.href);
    const productId=url.searchParams.get('productId');
    const orderId=url.searchParams.get('orderId');
    let order;
    orders.forEach((ord)=>{
        if(orderId===ord.id)
            order=ord;
        })
    let matchingProduct=getProduct(productId);
    let productDetails;
    order.products.forEach((prod)=>{
        if(prod.productId===productId)
        {
            productDetails=prod;
        }
    });

    const today=dayjs();
    const orderTime=dayjs(order.orderTime);
    const deliveryTime=dayjs(productDetails.estimatedDeliveryTime);
    const width=((today-orderTime)/(deliveryTime-orderTime))*100;

    trackingHTML+=`
            <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
            </a>

            <div class="delivery-date">
            ${today<deliveryTime?'Arriving on :':'Delivered on :'}
            ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
            </div>

            <div class="product-info">
            ${matchingProduct.name}
            </div>

            <div class="product-info">
            Quantity: ${productDetails.quantity}
            </div>

            <img class="product-image" src="${matchingProduct.image}">

            <div class="progress-labels-container">
            <div class="progress-label ${width<50?'current-status':''}">
                Preparing
            </div>
            <div class="progress-label ${width>50&&width<100?'current-status':''}">
                Shipped
            </div>
            <div class="progress-label ${width>=100?'current-status':''}">
                Delivered
            </div>
            </div>

            <div class="progress-bar-container">
            <div class="progress-bar" style="width:${width}%"></div>
            </div>
        </div>
    `
    document.querySelector('.js-main').innerHTML=trackingHTML;
    updateCartQuantity();
}
renderTracking();
