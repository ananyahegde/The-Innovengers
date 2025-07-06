document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('product-grid');

  // Show products on products.html
  if (grid && typeof products !== "undefined") {
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <a href="product-detail.html?id=${product.id}" style="text-decoration:none; color:inherit;">
          <img src="${product.image}" alt="${product.name}" style="width:100%; height:250px; object-fit:cover; border-radius:8px;">
          <h4>${product.name}</h4>
          <p>Rs. ${product.price}</p>
        </a>
        <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      grid.appendChild(card);
    });
  }

  // Load specific product details on product-detail.html
  const url = new URLSearchParams(window.location.search);
  const id = url.get('id');
  if (id && typeof products !== "undefined") {
    const product = products.find(p => p.id == id);
    if (product) {
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `Rs. ${product.price}`;
    document.getElementById('product-description').textContent = product.description || "This elegant piece is crafted for comfort and style.";
      if (img) img.src = product.image;
      if (name) name.textContent = product.name;
      if (price) price.textContent = `Rs. ${product.price}`;
    }

    const addBtn = document.querySelector('.btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => addToCart(product.id));
    }
  }
});

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart!');

    const user = JSON.parse(localStorage.getItem("currentUser"));
    const url = new URLSearchParams(window.location.search);
    const id = url.get('id');

    fetch('/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        user: user.id,           
        product: id,            
        action: 'viewed_product',
        accessedBy: 'internal-services'
      }) 
    })
    .then(res => res.json())
    .then(() => {
    })
    .catch(err => console.error('Log failed:', err));
}
