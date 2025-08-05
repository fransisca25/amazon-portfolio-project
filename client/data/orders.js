import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { getProduct, loadProductsFetch } from './products.js';
import { formatCurrency } from '../scripts/utils/money.js';


loadProductsFetch().then(() => {
    renderOrderGrid();
});


export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    const existingOrderIdx = orders.findIndex(existingOrder => existingOrder.id === order.id);
    if (existingOrderIdx !== -1) {
        // Update existing order
        orders[existingOrderIdx] = order;
    } else {
        // Add new order
        orders.unshift(order);
    }
    
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function renderOrderGrid() {
    let orderHTML = '';

    orders.forEach((order) => {
        let orderDate = dayjs(order.orderTime).format('dddd, MMMM D');

        // order header
        orderHTML += `
            <div class="order-container">
            
                <div class="order-header">
                    <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${orderDate}</div>
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
        `;

        // ordered products
        order.products.forEach((product) => {
            let estimateDelivery = dayjs(product.estimatedDeliveryTime).format('dddd, MMMM D');

            const productsDetail = getProduct(product.productId);

            // console.log(productsDetail);

            orderHTML += `
                    <div class="product-image-container">
                        <img src="${productsDetail.image}">
                    </div>

                    <div class="product-details">
                        <div class="product-name">
                            ${productsDetail.name}
                        </div>
                    <div class="product-delivery-date">
                        Arriving on: ${estimateDelivery}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${product.quantity}
                    </div>
                    <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                    </div>

                    <div class="product-actions">
                    <a href="tracking.html?productId=${product.productId}">
                        <button class="track-package-button button-secondary">
                        Track package
                        </button>
                    </a>
                    </div>
            `
        });


        orderHTML += `
            </div>
        </div>
        `;
    });

    document.querySelector('.js-orders-grid').innerHTML = orderHTML;
}
