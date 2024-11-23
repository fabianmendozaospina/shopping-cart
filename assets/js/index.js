'use strict';

const cartItemsObj = select('.cart-items');
const cartButtonObj = select('.cart-button');
const cartPopupObj = select('.cart-popup');
const cartCountObj = select('.cart-count');
const cartTotalObj = select('.cart-total');
const closePopupObj = select('.close-popup');
const addToCarButtonsObj = document.querySelectorAll('.add-to-cart');

// Get cart from localStorage.
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartUI();

function select(selector, scope = document) {
    return scope.querySelector(selector);
}

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

// Save cart to localStorage.
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
  
// Update cart interface.
function updateCartUI() {
    cartCountObj.textContent = cart.length;
    cartItemsObj.innerHTML = cart
      .map(
        (item, index) => `
        <li>
          ${item.name} - $${item.price}
          <button class="remove-item" data-index="${index}"><i class="fa-regular fa-circle-xmark"></i></button>
        </li>
      `
      )
      .join('');
    cartTotalObj.textContent = cart.reduce((total, item) => total + item.price, 0).toFixed(2);
    removeProductHandler();
}

// Add product to cart.
addToCarButtonsObj.forEach(button => {
  listen('click', button, event => {
    const product = event.target.closest('.product');
    const productId = product.dataset.id;
    const productName = product.dataset.name;
    const productPrice = parseFloat(product.dataset.price);

    cart.push({ id: productId, name: productName, price: productPrice });
    saveCart();
    updateCartUI();
  });
});

// Remove product from cart.
function removeProductHandler() {
    const removeCarButtonsObj = document.querySelectorAll('.remove-item');
    removeCarButtonsObj.forEach(button => {
        button.addEventListener('click', event => {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            saveCart();
            updateCartUI();
        });
  });
}

listen('click', cartButtonObj, () => {
  cartPopupObj.classList.remove('hidden');
});

listen('click', closePopupObj, () => {
  cartPopupObj.classList.add('hidden');
});