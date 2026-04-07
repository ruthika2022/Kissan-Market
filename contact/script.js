


/* ===============================
   NAVBAR MENU
=================================*/
const navMenu = document.getElementById("navMenu");
const overlay = document.getElementById("overlay");

function toggleMenu() {
  navMenu.classList.toggle("show");
  overlay.classList.toggle("active");
  document.body.classList.toggle("menu-open");
}

/* close menu when clicking outside */
overlay.addEventListener("click", () => {
  navMenu.classList.remove("show");
  overlay.classList.remove("active");
  document.body.classList.remove("menu-open");

  cartDrawer.classList.remove("active");
});

/* ===============================
   LOCATION POPUP
=================================*/
const openPopup = document.getElementById("openPopup");
const popup = document.getElementById("locationPopup");
const closeBtn = document.querySelector(".close");

openPopup.onclick = () => popup.style.display = "flex";
closeBtn.onclick = () => popup.style.display = "none";

popup.onclick = (e) => {
  if (e.target === popup) popup.style.display = "none";
};

/* ===============================
   CART DRAWER
=================================*/
const cartToggle = document.getElementById("cartToggle");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");

cartToggle.addEventListener("click", (e) => {
  e.preventDefault();
  cartDrawer.classList.add("active");
  overlay.classList.add("active");
  document.body.classList.add("menu-open");
});

closeCart.addEventListener("click", () => {
  cartDrawer.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("menu-open");
});

/* Remove cart item */
document.querySelectorAll(".remove-item").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".cart-item").remove();
  });
});

/* Close menu after clicking link (mobile UX) */
document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});





