import { cart } from "../../../data/cart.js";
import { renderCheckoutHeader } from "../../../scripts/checkout/checkoutHeader.js";

describe('test suite: renderCheckoutHeader', () => {
    const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-return-home-link"></div>
        `;


        cart.cartItems = [{
            productId: productId, 
            quantity: 2, 
            deliveryOptionId: '1'
        }];
    });

    it('check checkout header render the correct quantity', () => {
        renderCheckoutHeader();

        expect(document.querySelector('.js-return-home-link').innerHTML).toContain('2 items');
    });
});



