// ================= MENU =================
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
}


// ================= CART OPEN / CLOSE =================
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");

document.getElementById("cartToggle").onclick = () => {
  cartDrawer.classList.add("active");
  overlay.classList.add("active");
};

document.getElementById("closeCart").onclick = closeCart;
overlay.onclick = closeCart;

function closeCart() {
  cartDrawer.classList.remove("active");
  overlay.classList.remove("active");
}


// ================= TOAST =================
function showToast(message) {
  let toast = document.getElementById("toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }

  toast.innerText = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #333;
    color: #fff;
    padding: 12px 20px;
    border-radius: 6px;
    z-index: 2000;
    opacity: 1;
    transition: 0.3s;
  `;

  setTimeout(() => {
    toast.style.opacity = "0";
  }, 2000);
}


// ================= CART DATA =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ================= ADD TO CART =================
document.querySelectorAll(".add-cart").forEach((btn, index) => {
  btn.onclick = () => {
    const card = btn.parentElement;

    const name = card.querySelector("h3").innerText;
    const price = card.querySelector(".new").innerText;
    const img = card.querySelector("img").src;

    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        name,
        price,
        img,
        qty: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    showToast("Product added to cart 🛒");
    loadCart();
  };
});


// ================= LOAD CART =================
function loadCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.querySelector("#cartFooter .total-row span:last-child");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    totalPrice.innerText = "₹0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const priceNumber = parseInt(item.price.replace("₹", ""));
    total += priceNumber * item.qty;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.img}">
      <div class="cart-item-details">
        <h3>${item.name}</h3>

        <div class="qty-control">
          <button class="minus">-</button>
          <span>${item.qty}</span>
          <button class="plus">+</button>
        </div>

        <p class="price">₹${priceNumber * item.qty}</p>
      </div>

      <div class="remove-item">✖</div>
    `;

    // ➕ PLUS
    div.querySelector(".plus").onclick = () => {
      cart[index].qty++;
      updateCart();
    };

    // ➖ MINUS
    div.querySelector(".minus").onclick = () => {
      if (cart[index].qty > 1) {
        cart[index].qty--;
      } else {
        cart.splice(index, 1);
      }
      updateCart();
    };

    // ❌ REMOVE
    div.querySelector(".remove-item").onclick = () => {
      cart.splice(index, 1);
      updateCart();
    };

    cartItems.appendChild(div);
  });

  totalPrice.innerText = "₹" + total;
}


// ================= UPDATE CART =================
function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}


// ================= LOAD ON START =================
loadCart();

