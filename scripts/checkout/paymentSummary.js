import {calculateCartQuantity, cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';

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
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <button class="place-order-button button-primary">
        Place your order
    </button>`;
    document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
}

