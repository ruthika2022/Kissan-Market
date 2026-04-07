/* =========================
   MENU
========================= */
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
}

/* =========================
   LOCATION POPUP
========================= */
const openPopup = document.getElementById("openPopup");
const popup = document.getElementById("locationPopup");
const closeBtn = document.querySelector(".close");

openPopup.onclick = () => {
  popup.style.display = "flex";
};

closeBtn.onclick = () => {
  popup.style.display = "none";
};

popup.onclick = (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
};

/* =========================
   CART DRAWER
========================= */
const cartDrawer = document.getElementById("cartDrawer");
const cartToggle = document.getElementById("cartToggle");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

cartToggle.onclick = () => {
  cartDrawer.classList.add("active");
  overlay.classList.add("active");
};

closeCart.onclick = () => {
  cartDrawer.classList.remove("active");
  overlay.classList.remove("active");
};

overlay.onclick = () => {
  cartDrawer.classList.remove("active");
  overlay.classList.remove("active");
};

/* =========================
   ADD TO CART
========================= */
const buttons = document.querySelectorAll(".add-cart");

buttons.forEach(button => {
  button.addEventListener("click", function () {

    const product = this.closest(".v1");

    const name = product.querySelector("h3").innerText;
    const price = product.querySelector(".new-price").innerText;
    const img = product.querySelector("img").src;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.name === name);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        name: name,
        price: price,
        img: img,
        qty: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart");
    loadCart();
  });
});

/* =========================
   LOAD CART + QUANTITY
========================= */
function loadCart() {

  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.querySelector(".total-row span:last-child");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {

    const priceNumber = parseInt(item.price.replace("₹", ""));
    const qty = item.qty || 1;

    total += priceNumber * qty;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.img}">
      <div class="cart-item-details">
        <h3>${item.name}</h3>

        <div class="qty-control">
          <button class="minus">-</button>
          <span class="qty">${qty}</span>
          <button class="plus">+</button>
        </div>

        <p class="price">₹${priceNumber * qty}</p>
      </div>

      <div class="remove-item">✖</div>
    `;

    /* ➕ PLUS */
    div.querySelector(".plus").onclick = () => {
      cart[index].qty += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    };

    /* ➖ MINUS */
    div.querySelector(".minus").onclick = () => {
      if (cart[index].qty > 1) {
        cart[index].qty -= 1;
      } else {
        cart.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    };

    /* ❌ REMOVE */
    div.querySelector(".remove-item").onclick = () => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    };

    cartItems.appendChild(div);
  });

  totalPrice.innerText = "₹" + total;
}

/* =========================
   LOAD ON PAGE START
========================= */
window.onload = loadCart;