function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
}

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



function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}

