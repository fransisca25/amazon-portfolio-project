import { cart } from "../../data/cart.js";

export function renderCheckoutHeader() {
    const cartQuantity = cart.calculateCartQuantity();
    document.querySelector('.js-return-home-link').innerHTML= `${cartQuantity} items`;
}