import { orders } from "../data/orders.js";
import formatCurrency from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { getProduct,loadProductsFetch } from "../data/products.js";
import { addToCart } from "../data/cart.js";
import { updateCartQuantity } from "../data/cart.js";
updateCartQuantity();3
async function renderOrderHeader(){
  await loadProductsFetch();
  let orderHTML='';
  orders.forEach((order)=>{
      const orderTimeString=dayjs(order.orderTime).format('MMMM D')
      orderHTML+=`
      <div class="order-container data-order-id=${order.id}">
        
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${renderOrderGrid(order)}
        </div>
      </div>
  `
  })

  function renderOrderGrid(order)
  {
    let orderGridHTML='';
    order.products.forEach((product)=>{
      let matchingProduct=getProduct(product.productId);
      orderGridHTML+=`
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again" data-product-id="${product.productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `
    })
    
    return orderGridHTML;
  }
  document.querySelector('.js-orders-grid').innerHTML=orderHTML;
  document.querySelectorAll(`.js-buy-again`).forEach((button)=>{
    button.addEventListener('click',()=>{
      addToCart(button.dataset.productId);
      button.innerHTML='Added';
      setTimeout(()=>{
        button.innerHTML=`
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `
        updateCartQuantity();
      },1000)
    })
  })
}
renderOrderHeader();