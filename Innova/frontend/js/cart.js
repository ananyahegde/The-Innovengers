document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cart-items');
  const totalContainer = document.getElementById('cart-total');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const groupedItems = cart.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  let total = 0;

  Object.entries(groupedItems).forEach(([id, quantity]) => {
    const product = products.find(p => p.id == id);
    if (product) {
      total += product.price * quantity;
      const item = document.createElement('div');
      item.className = 'cart-item';
      item.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="width:100px; border-radius:8px;">
        <div class="cart-item-details">
          <h4>${product.name}</h4>
          <p>Quantity: ${quantity}</p>
          <p>Total: ₹${product.price * quantity}</p>
          <button onclick="removeFromCart(${product.id})" class="btn-checkout" style="padding: 4px 10px;">Remove</button>
        </div>
      `;
      cartContainer.appendChild(item);
    }
  });

  totalContainer.textContent = `Grand Total: ₹${total}`;
});

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(id => id != productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}
