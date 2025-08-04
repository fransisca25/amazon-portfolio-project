import { cart } from '../../client/data/cart.js'


describe('test suite: addToCart', () => {
    const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });

    it('adds an existing product to the cart', () => {
        cart.cartItems = [{
            productId: productId, 
            quantity: 1, 
            deliveryOptionId: '1'
        }];

        const input = document.createElement('input');
        input.className = `js-quantity-selector-${productId}`;
        input.value = '1';

        input.style.position = 'absolute';
        input.style.left = '-9999px';

        document.body.appendChild(input);

        cart.addToCart(productId);
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cartItems[0].productId).toEqual(productId);
        expect(cart.cartItems[0].quantity).toEqual(2);

        document.body.removeChild(input);
    });

    it('adds a new product to the cart', () => {
        cart.cartItems = [];

        const input = document.createElement('input');
        input.className = `js-quantity-selector-${productId}`;
        input.value = '1';

        input.style.position = 'absolute';
        input.style.left = '-9999px';

        document.body.appendChild(input);

        cart.addToCart(productId);
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cartItems[0].productId).toEqual(productId);
        expect(cart.cartItems[0].quantity).toEqual(1);

        document.body.removeChild(input);
    });
});


describe('test suite: removeFromCart', () => {
    const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productIdNotExist = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });

    it('remove product from cart', () => {
        cart.cartItems = [{
            productId: productId, 
            quantity: 1, 
            deliveryOptionId: '1'
        }];

        cart.removeFromCart(productId);

        expect(cart.cartItems.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it('not removing item if the item is not in the cart', () => {
        cart.cartItems = [{
            productId: productId, 
            quantity: 1, 
            deliveryOptionId: '1'
        }];

        cart.removeFromCart(productIdNotExist);

        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
});


describe('test suite: updateDeliveryOption', () => {
    const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productIdNotExist = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        cart.cartItems = [{
            productId: productId, 
            quantity: 1, 
            deliveryOptionId: '1'
        }];
    });

    it('update the delivery option', () => {
        cart.updateDeliveryOption(productId, '3');

        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productId);
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it('not updating item if the item is not in the cart', () => {
        cart.updateDeliveryOption(productIdNotExist);

        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productId);
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
});
