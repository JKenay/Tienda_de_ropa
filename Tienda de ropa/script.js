let count = 0;
const cartBtn = document.getElementById('cart-btn');

document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    count++;
    cartBtn.textContent = `Carrito (${count})`;
  });
});