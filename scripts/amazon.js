import {cart,addToCart, calculateCartQuantity} from '../data/cart.js';
import {products,loadProducts, getProduct} from '../data/products.js';
import formatCurrency from './utils/money.js';
import { updateCartQuantity } from '../data/cart.js';

loadProducts(renderProductsGrid);

function renderProductsGrid()
{
    updateCartQuantity('.js-cart-quantity');
    const url=new URL(window.location.href);
    const search=url.searchParams.get('search');
    let productsHTML='';
    
    let filteredProducts=products;
    if(search){
        filteredProducts=products.filter((product)=>{
            let matchingKeyword=false;
            product.keywords.forEach((keyword)=>{
                if(keyword.toLowerCase().includes(search.toLowerCase()))
                {
                    matchingKeyword=true;
                }
            })
            return matchingKeyword || (product.name).toLowerCase().includes(search.toLowerCase())
        })
    }
    filteredProducts.forEach((product) => {
        productsHTML+=`
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="${product.getStarsUrl()}">
                    <div class="product-rating-count link-primary">
                        ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    ${product.getPrice()}
                </div>

                <div class="product-quantity-container">
                    <select class="js-select-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                ${product.extraInfoHTML()}

                <div class="product-spacer"></div>

                <div class="added-to-cart js-added-${product.id}">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart"
                data-product-id="${product.id}">
                    Add to Cart
                </button>
                </div>
        `;
    })
    document.querySelector('.js-products-grid').innerHTML=productsHTML;

    document.querySelectorAll('.js-add-to-cart')
        .forEach((button)=>{
            let timerId;
            button.addEventListener('click',()=>{
                const {productId}=button.dataset;
                const matchingItem=getProduct(productId);
                const select=Number(document.querySelector(`.js-select-${productId}`).value);
                matchingItem.quantity=select;
                console.log(matchingItem);
                addToCart(productId,select);
                updateCartQuantity();
                const addbtn=document.querySelector(`.js-added-${productId}`)
                addbtn.classList.add('add')
                clearTimeout(timerId);
                timerId=setTimeout(()=>{
                    addbtn.classList.remove('add')
                },2000)
            })
        });
    document.querySelector('.js-search-button')
        .addEventListener('click',()=>{
            const value=document.querySelector('.js-search-bar').value;
            window.location.href=`amazon.html?search=${value}`;
        })
    document.querySelector('.js-search-bar')
        .addEventListener('keydown',(event)=>{
        if(event.key==='Enter')
        {
            const value=document.querySelector('.js-search-bar').value;
            window.location.href=`amazon.html?search=${value}`
        }
    })
    
}
