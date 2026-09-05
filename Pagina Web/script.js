let cart = [];

const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartDrawer = document.getElementById('cart-drawer');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

// Abrir y cerrar el carrito desplegable
cartBtn.addEventListener('click', () => cartDrawer.classList.add('open'));
closeCartBtn.addEventListener('click', () => cartDrawer.classList.remove('open'));

// Agregar elementos al carrito
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);

    cart.push({ name, price });
    updateCart();
    cartDrawer.classList.add('open'); // Despliega el carrito automáticamente al agregar
  });
});

// Renderizar contenido y actualizar totales
function updateCart() {
  cartCount.textContent = cart.length;
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-msg">El carrito está vacío</p>';
    cartTotal.textContent = '0.00';
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <div>
        <div>${item.name}</div>
        <small>$${item.price.toFixed(2)}</small>
      </div>
      <button onclick="removeItem(${index})">Quitar</button>
    `;
    cartItemsContainer.appendChild(itemEl);
  });

  cartTotal.textContent = total.toFixed(2);
}

// Eliminar un elemento
window.removeItem = function(index) {
  cart.splice(index, 1);
  updateCart();
};
