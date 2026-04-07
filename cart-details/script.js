// function changeImage(thumbnail) {
//     document.getElementById("mainImg").src = thumbnail.src;
// }


// /* =========================
//    CART DRAWER
// ========================= */

// const cartDrawer = document.getElementById("cartDrawer");
// const cartToggle = document.getElementById("cartToggle");
// const closeCart = document.getElementById("closeCart");
// const overlay = document.getElementById("overlay");
// const cartItems = document.getElementById("cartItems");
// const totalPrice = document.querySelector(".total-row span:last-child");

// let total = 0;

// /* OPEN CART */
// cartToggle.onclick = () => {
//   cartDrawer.classList.add("active");
//   overlay.classList.add("active");
// };

// /* CLOSE CART */
// closeCart.onclick = () => {
//   cartDrawer.classList.remove("active");
//   overlay.classList.remove("active");
// };

// overlay.onclick = () => {
//   cartDrawer.classList.remove("active");
//   overlay.classList.remove("active");
// };
// /* =========================
//    ADD TO CART
// ========================= */

// const addButtons = document.querySelectorAll(".add-cart");

// addButtons.forEach((btn) => {

//   btn.addEventListener("click", function () {

//     const product = this.parentElement;

//     const name = product.querySelector("h3").innerText;
//     const priceText = product.querySelector(".new-price").innerText;
//     const img = product.querySelector("img").src;

//     const price = parseInt(priceText.replace("₹", ""));

//     total += price;

//     /* CREATE CART ITEM */

//     const cartItem = document.createElement("div");
//     cartItem.classList.add("cart-item");

//     cartItem.innerHTML = `
//       <img src="${img}">
//       <div class="cart-item-details">
//         <h3>${name}</h3>
//         <p>1 Item</p>
//         <p class="price">₹${price}</p>
//       </div>
//       <div class="remove-item">✖</div>
//     `;

//     cartItems.appendChild(cartItem);

//     updateTotal();

//     /* REMOVE ITEM */

//     cartItem.querySelector(".remove-item").onclick = () => {
//       cartItem.remove();
//       total -= price;
//       updateTotal();
//     };

//   });

// });


// const buttons = document.querySelectorAll(".add-cart");

// buttons.forEach(button => {

//   button.addEventListener("click", function () {

//     const product = this.closest(".v1");

//     const name = product.querySelector("h3").innerText;
//     const price = product.querySelector(".new-price").innerText;
//     const img = product.querySelector("img").src;

//     const item = {
//       name: name,
//       price: price,
//       img: img
//     };

//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     cart.push(item);

//     localStorage.setItem("cart", JSON.stringify(cart));

//     alert("Product added to cart");

//   });

// });

// function loadCart() {

//   const cartItems = document.getElementById("cartItems");
//   const totalPrice = document.querySelector(".total-row span:last-child");

//   let cart = JSON.parse(localStorage.getItem("cart")) || [];

//   cartItems.innerHTML = "";

//   let total = 0;

//   cart.forEach((item, index) => {

//     const priceNumber = parseInt(item.price.replace("₹",""));
//     total += priceNumber;

//     const div = document.createElement("div");
//     div.classList.add("cart-item");

//     div.innerHTML = `
//       <img src="${item.img}">
//       <div class="cart-item-details">
//         <h3>${item.name}</h3>
//         <p class="price">${item.price}</p>
//       </div>
//       <div class="remove-item">✖</div>
//     `;

//     /* REMOVE BUTTON */
//     div.querySelector(".remove-item").addEventListener("click", function(){

//       let cart = JSON.parse(localStorage.getItem("cart")) || [];

//       cart.splice(index,1);

//       localStorage.setItem("cart", JSON.stringify(cart));

//       loadCart();

//     });

//     cartItems.appendChild(div);

//   });

//   totalPrice.innerText = "₹" + total;

// }

// /* LOAD CART WHEN PAGE OPENS */
// window.onload = loadCart;
 function changeImage(img){

document.getElementById("mainImg").src = img.src;

}