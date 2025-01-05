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
