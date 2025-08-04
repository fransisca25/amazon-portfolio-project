import { Product, products } from "../../../client/data/products.js";
import { cart } from "../../../client/data/cart.js";
import { renderPaymentSummary } from "../../../client/scripts/checkout/paymentSummary.js";
import { loadProductsFetch } from '../../../client/data/products.js';


describe('test suite: paymentSummary', () => {
    const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    let product;
    let deliveryOptions;
    
    beforeAll(async () => {
        await loadProductsFetch();
    });

    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-payment-summary"></div>
        `;

        product = new Product({
            id: productId,
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: [
            "socks",
            "sports",
            "apparel"
            ]
        });

        // make sure products array empty for test
        products.length = 0; 
        products.push(product);

        cart.cartItems = [{
            productId: productId, 
            quantity: 1, 
            deliveryOptionId: '3'
        }];

        deliveryOptions = [{
            id: '1',
            deliveryDays: 7, 
            priceCents: 0 
        }, {
            id: '2', 
            deliveryDays: 3, 
            priceCents: 499
        }, {
            id: '3', 
            deliveryDays: 1, 
            priceCents: 999
        }];
    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    });

    it('check all payment element in renderPaymentSummary', () => {
        renderPaymentSummary();

        expect(
            document.querySelector('.js-payment-summary-quantity').innerHTML
        ).toContain('Items (1)');
        
        expect(
            document.querySelector('.js-payment-summary-price').innerHTML
        ).toContain('$10.90');

        expect(
            document.querySelector('.js-payment-summary-shipping').innerHTML
        ).toContain('$9.99');

        expect(
            document.querySelector('.js-payment-summary-before-tax').innerHTML
        ).toContain('$20.89');

        expect(
            document.querySelector('.js-payment-summary-tax').innerHTML
        ).toContain('$2.09');

        expect(
            document.querySelector('.js-payment-summary-total').innerHTML
        ).toContain('$22.98');
    });
});