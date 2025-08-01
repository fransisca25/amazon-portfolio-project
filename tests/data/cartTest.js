import { addToCart, cart, loadFromStorage, removeFromCart } from "../../data/cart.js";

describe('test suite: addToCart', () => {
    const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'setItem');
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
        spyOn(localStorage, 'setItem');
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
    const productIdOther = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    it('remove product from cart', () => {
        spyOn(localStorage, 'setItem');
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
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId, 
                quantity: 1, 
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        removeFromCart(productIdOther);

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
});
