//  function sendMessage() {
//         const input = document.getElementById("messageInput");
//         const chatBody = document.getElementById("chatBody");

//         if (input.value.trim() === "") return;

//         const msg = document.createElement("div");
//         msg.className = "message buyer";
//         msg.innerText = input.value;

//         chatBody.appendChild(msg);
//         input.value = "";
//         chatBody.scrollTop = chatBody.scrollHeight;

//         setTimeout(() => {
//             const reply = document.createElement("div");
//             reply.className = "message farmer";
//             reply.innerText = "Yes, fresh stock is available.";
//             chatBody.appendChild(reply);
//             chatBody.scrollTop = chatBody.scrollHeight;
//         }, 700);
//     }


//     function toggleMenu() {
//   document.getElementById("navMenu").classList.toggle("show");
// }

// const openPopup = document.getElementById("openPopup");
// const popup = document.getElementById("locationPopup");
// const closeBtn = document.querySelector(".close");

// openPopup.onclick = () => {
//   popup.style.display = "flex";
// };

// closeBtn.onclick = () => {
//   popup.style.display = "none";
// };

// popup.onclick = (e) => {
//   if (e.target === popup) {
//     popup.style.display = "none";
//   }
// };



// function toggleMenu() {
//   document.getElementById("navMenu").classList.toggle("active");
// }


//  // CART DRAWER FUNCTIONALITY
//   const cartToggle = document.getElementById('cartToggle');
//   const cartDrawer = document.getElementById('cartDrawer');
//   const closeCart = document.getElementById('closeCart');
//   const overlay = document.getElementById('overlay');

//   cartToggle.addEventListener('click', (e) => {
//     e.preventDefault();
//     cartDrawer.classList.add('active');
//     overlay.classList.add('active');
//   });

//   closeCart.addEventListener('click', () => {
//     cartDrawer.classList.remove('active');
//     overlay.classList.remove('active');
//   });

//   overlay.addEventListener('click', () => {
//     cartDrawer.classList.remove('active');
//     overlay.classList.remove('active');
//   });

//   // Remove cart item
//   document.querySelectorAll('.remove-item').forEach((btn) => {
//     btn.addEventListener('click', () => {
//       const item = btn.closest('.cart-item');
//       item.remove();
//       // Optionally update totals here
//     });
//   });


//   function toggleMenu() {
//   const nav = document.getElementById("navMenu");
//   nav.classList.toggle("show");
//   document.body.classList.toggle("menu-open");
// }

// /* click outside closes menu */
// document.addEventListener("click", function (e) {
//   const nav = document.getElementById("navMenu");
//   const menuIcon = document.querySelector(".menu-icon");

//   if (!nav.contains(e.target) && !menuIcon.contains(e.target)) {
//     nav.classList.remove("show");
//     document.body.classList.remove("menu-open");
//   }
// });


  
function send() {
    let input = document.getElementById("input");
    let text = input.value.toLowerCase().trim();
    if (text === "") return;

    let chatBox = document.getElementById("chatBox");

    // USER MESSAGE
    let userMsg = document.createElement("div");
    userMsg.className = "msg user";
    userMsg.textContent = input.value;
    chatBox.appendChild(userMsg);

    let reply = "";

    // 👋 GREETING
    if (text.includes("hi") || text.includes("hello")) {
        reply = "Hi 😊 Welcome! How can I help you today?";
    }

    // 🍅 TOMATO PRICE
    else if (text.includes("tomato") && text.includes("price")) {
        reply = "🍅 Tomatoes are ₹50 per kg.";
    }

    // 💰 GENERAL PRICE
    else if (text.includes("price") || text.includes("cost")) {
        reply = "📊 Prices:\n🍅 Tomato - ₹50/kg\n🧅 Onion - ₹40/kg\n🥔 Potato - ₹25/kg\n🥕 Carrot - ₹30/kg";
    }

    // 🌱 FRESHNESS
    else if (text.includes("fresh")) {
        reply = "🌱 Yes, all vegetables are fresh and directly from farmers.";
    }

    // 🛒 ORDER PROCESS
    else if (text.includes("order") || text.includes("how to buy")) {
        reply = "🛒 To order:\n1. Select product\n2. Add to cart\n3. Enter address\n4. Place order ✅";
    }

    // 🚚 DELIVERY
    else if (text.includes("delivery") || text.includes("time")) {
        reply = "🚚 Your order will be delivered today evening or next day.";
    }

    // 💳 PAYMENT
    else if (text.includes("payment") || text.includes("pay")) {
        reply = "💳 You can pay using Cash on Delivery, UPI, or Card.";
    }

    // ❗ ISSUE
    else if (text.includes("problem") || text.includes("issue")) {
        reply = "😔 Sorry for the issue.\nPlease go to Contact page or call 9876543210.";
    }

    // 🙏 THANK YOU
    else if (text.includes("thank")) {
        reply = "😊 Thank you for shopping with us! 🛍️";
    }

    // DEFAULT
    else {
        reply = "You can ask:\n✔ Product prices\n✔ Fresh vegetables\n✔ Delivery details\n✔ Payment options 🙂";
    }

    // BOT MESSAGE
    let botMsg = document.createElement("div");
    botMsg.className = "msg bot";
    botMsg.textContent = reply;

    setTimeout(() => {
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);

    input.value = "";
}

// ENTER KEY
function enterKey(e) {
    if (e.key === "Enter") send();
}