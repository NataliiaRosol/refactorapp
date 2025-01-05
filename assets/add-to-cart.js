const buttons = document.querySelectorAll('.featured-products__button');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.getAttribute('data-productVariant-id');

    fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: productId,
        quantity: 1,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        updateCart();
      })
      .then(() => updateBuble())
      .catch((error) => console.error('Error:', error));
  });
});

function updateCart() {
  fetch('/?section_id=cart-drawer') // Запитуємо секцію "cart-items тут cart-drawer"
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const newCartDrawerContent = parser.parseFromString(html, 'text/html').querySelector('cart-drawer');
      const currentCartDrawerContent = document.querySelector('cart-drawer');
      console.log(currentCartDrawerContent);

      if (currentCartDrawerContent.classList.contains('is-empty')) {
        currentCartDrawerContent.classList.remove('is-empty');
      }

      if (newCartDrawerContent && currentCartDrawerContent) {
        // currentCartIconBubble.innerHTML = newCartIconBubble.innerHTML;
        currentCartDrawerContent.innerHTML = newCartDrawerContent.innerHTML; // Оновлюємо HTML в pop-up

        document.querySelector('cart-drawer').open(); // Відкриваємо pop-up кошик
      }
    })
    .catch((error) => console.error('Error updating cart:', error));
}

function updateBuble() {
  fetch('/cart.js')
    .then((response) => response.json())
    .then((cart) => {
      let cartBubble = document.querySelector('.cart-count-bubble');
      // const visuallyHiddenBubble = document.querySelector('.cart-count-bubble .visually-hidden');
      let cartIcon = document.getElementById('cart-icon-bubble');
      const svgWrapper = cartIcon.querySelector('.svg-wrapper svg');

      if (cart && cart.item_count > 0) {
        if (!cartBubble) {
          cartBubble = document.createElement('div');
          cartBubble.className = 'cart-count-bubble';
          cartBubble.innerHTML = `
            <span aria-hidden="true">${cart.item_count}</span>
            <span class="visually-hidden">${cart.item_count} items</span>
          `;
          cartIcon.appendChild(cartBubble);
        } else {
          // Якщо buble існує, оновлюємо його
          cartBubble.querySelector('span[aria-hidden="true"]').textContent = cart.item_count;
          cartBubble.querySelector('.visually-hidden').textContent = `${cart.item_count} items`;
        }
        cartIcon.classList.remove('hidden'); // Переконуємося, що buble видимий
        svgWrapper.innerHTML = `
              <path fill="currentColor" fill-rule="evenodd" d="M20.5 6.5a4.75 4.75 0 0 0-4.75 4.75v.56h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33l-.77-11.6h-3.16v-.57A4.75 4.75 0 0 0 20.5 6.5m3.75 5.31v-.56a3.75 3.75 0 1 0-7.5 0v.56zm-7.5 1h7.5v.56a3.75 3.75 0 1 1-7.5 0zm-1 0v.56a4.75 4.75 0 1 0 9.5 0v-.56h2.22l.71 10.67a4 4 0 0 1-3.99 4.27h-7.38a4 4 0 0 1-4-4.27l.72-10.67z"></path>
            `;
      } else {
        // Видаляємо buble, якщо кошик порожній
        if (cartBubble) {
          cartBubble.remove();
        }
        svgWrapper.innerHTML = `
              <path fill="currentColor" fill-rule="evenodd" d="M15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33L28.4 11.8zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1-9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z"></path>
            `;
      }
    })
    .catch((error) => console.error('Error updating cart bubble:', error));
}
