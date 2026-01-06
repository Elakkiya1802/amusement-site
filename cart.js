let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* Save cart */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* Add item */
function addToCart(name, price) {
  const item = cart.find(i => i.name === name);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  saveCart();
  alert("Added to cart");
}

/* Remove item */
function removeItem(name) {
  cart = cart.filter(item => item.name !== name);
  saveCart();
  openCart();
}

/* Change quantity */
function changeQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    removeItem(name);
  } else {
    saveCart();
    openCart();
  }
}

/* Open cart modal */
function openCart() {
  const modal = document.getElementById("cartModal");
  const itemsDiv = document.getElementById("cart-items");
  const totalSpan = document.getElementById("cart-total");

  itemsDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    itemsDiv.innerHTML = "<p>Your cart is empty</p>";
  }

  cart.forEach(item => {
    total += item.price * item.qty;

    itemsDiv.innerHTML += `
      <div style="display:flex;justify-content:space-between;align-items:center;margin:10px 0;">
        <div>
          <strong>${item.name}</strong><br>
          ₹${item.price} × ${item.qty}
        </div>

        <div>
          <button onclick="changeQty('${item.name}',1)">+</button>
          <button onclick="changeQty('${item.name}',-1)">−</button>
          <button onclick="removeItem('${item.name}')">❌</button>
        </div>
      </div>
    `;
  });

  totalSpan.innerText = total;
  modal.style.display = "flex";
}

/* Close cart */
function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

/* Checkout → open payment modal */
function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  closeCart();
  document.getElementById("paymentModal").style.display = "flex";
}

/* Close payment modal */
function closePayment() {
  document.getElementById("paymentModal").style.display = "none";
}

/* Payment success */
function makePayment(method) {
  alert("✅ Payment Successful via " + method);

  cart = [];
  localStorage.removeItem("cart");

  closePayment();
}
