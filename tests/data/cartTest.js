import { addToCart, cart, loadFromStorage, removeFromCart ,updateDeliveryOption } from "../../data/cart.js";

describe('test suite: addToCart', () => {
    const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });

    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId, 
                quantity: 1, 
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        const input = document.createElement('input');
        input.className = `js-quantity-selector-${productId}`;
        input.value = '1';

        input.style.position = 'absolute';
        input.style.left = '-9999px';

        document.body.appendChild(input);

        addToCart(productId);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual(productId);
        expect(cart[0].quantity).toEqual(2);

        document.body.removeChild(input);
    });

    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();

        const input = document.createElement('input');
        input.className = `js-quantity-selector-${productId}`;
        input.value = '1';

        input.style.position = 'absolute';
        input.style.left = '-9999px';

        document.body.appendChild(input);

        addToCart(productId);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual(productId);
        expect(cart[0].quantity).toEqual(1);

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
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId, 
                quantity: 1, 
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        removeFromCart(productId);

        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it('not removing item if the item is not in the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId, 
                quantity: 1, 
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        removeFromCart(productIdNotExist);

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
});


describe('test suite: updateDeliveryOption', () => {
    const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productIdNotExist = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId, 
                quantity: 1, 
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();
    });

    it('update the delivery option', () => {
        updateDeliveryOption(productId, '3');

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId);
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it('not updating item if the item is not in the cart', () => {
        updateDeliveryOption(productIdNotExist);

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId);
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
});
