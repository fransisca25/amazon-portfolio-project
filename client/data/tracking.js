import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { orders } from "./orders.js";
import { getProduct, loadProductsFetch } from './products.js';


// Load products first, then render tracking
loadProductsFetch().then(() => {
    renderTracking();
});

export function renderTracking() {
    let trackingHTML = '';

    orders.forEach((order) => {
        order.products.forEach((product, idx) => {
            let estimateDelivery = dayjs(product.estimatedDeliveryTime).format('dddd, MMMM D');
            const productDetail = getProduct(product.productId);
            const urlParams = new URLSearchParams(window.location.search);
            const trackedProductId = urlParams.get('productId');

            if (product.productId === trackedProductId) {
                trackingHTML += `
                    <div class="order-tracking">
                        <a class="back-to-orders-link link-primary" href="orders.html">
                        View all orders
                        </a>

                        <div class="delivery-date">
                        Arriving on ${estimateDelivery}
                        </div>

                        <div class="product-info">
                        ${productDetail.name}
                        </div>

                        <div class="product-info">
                        Quantity: ${product.quantity}
                        </div>

                        <img class="product-image" src="${productDetail.image}">

                        <div class="progress-labels-container">
                        <div class="progress-label">
                            Preparing
                        </div>
                        <div class="progress-label current-status">
                            Shipped
                        </div>
                        <div class="progress-label">
                            Delivered
                        </div>
                        </div>

                        <div class="progress-bar-container">
                        <div class="progress-bar"></div>
                        </div>
                    </div>
                `
            }
        });

    });

    document.querySelector('.js-main').innerHTML = trackingHTML;
}
      
      
