import {calculateCartQuantity, cart,resetCart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { addOrders } from '../../data/orders.js';

export function renderPaymentSummary()
{
    let productPriceCents=0;
    let ShippingpriceCents=0;
    cart.forEach((cartItem)=>{
        const product = getProduct(cartItem.productId)
        productPriceCents+=product.priceCents*cartItem.quantity
        const deliveryOption=getDeliveryOption(cartItem.deliveryOptionId)
        ShippingpriceCents+=deliveryOption.priceCents;
    })
    const totalBeforeTaxCents= productPriceCents+ShippingpriceCents;
    const taxCents= (totalBeforeTaxCents/100)*10;
    const totalCents= totalBeforeTaxCents+taxCents;

    const paymentSummaryHTML=
    `
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Items (${calculateCartQuantity()}):</div>
        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(ShippingpriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
        Place your order
    </button>`;
    document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
    document.querySelector('.js-place-order').addEventListener('click',async ()=>{
        try{
            const response= await fetch('https://supersimplebackend.dev/orders',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    cart: cart
                })
            });
            const order= await response.json();
            addOrders(order)
            console.log(order);
            const orders=window.open('orders.html');
            orders.console.log(order)
            resetCart();
        } catch(error){
            console.log('Unexpected error. Try again later.')
        }

        window.location.href='orders.html'
    });
}

