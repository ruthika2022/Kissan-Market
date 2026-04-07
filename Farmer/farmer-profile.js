// ================= MENU TOGGLE =================
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
}

// ================= LOCATION POPUP =================
const locationPopup = document.getElementById("locationPopup");
const openLocation = document.getElementById("openPopup");
const closeLocation = document.querySelector(".close");

openLocation.onclick = () => {
  locationPopup.style.display = "flex";
};

closeLocation.onclick = () => {
  locationPopup.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === locationPopup) {
    locationPopup.style.display = "none";
  }
};

// ================= LOGOUT =================
document.querySelector(".logout-btn").onclick = () => {
  alert("Logged out successfully");
};

// ================= EDIT PROFILE OVERLAY =================

// Elements
const editBtn = document.getElementById("editBtn");
const editPopup = document.getElementById("editPopup");
const closeEdit = document.querySelector(".close-edit");
const saveBtn = document.querySelector(".save-btn");

// OPEN POPUP + AUTO-FILL INPUTS
editBtn.onclick = () => {
  editPopup.style.display = "flex";

  document.getElementById("editName").value =
    document.querySelector(".name").innerText.split(": ")[1];

  document.getElementById("editLocation").value =
    document.querySelector(".location").innerText.split(": ")[1];

  document.getElementById("editPhone").value =
    document.querySelector(".phone").innerText.split(": ")[1];

  document.getElementById("editCrops").value =
    document.querySelector(".crops").innerText.split(": ")[1];

  document.getElementById("editExperience").value =
    document.querySelector(".experience").innerText.split(": ")[1];
};

// CLOSE POPUP (X BUTTON)
closeEdit.onclick = () => {
  editPopup.style.display = "none";
};

// CLOSE POPUP (CLICK OUTSIDE)
editPopup.onclick = (e) => {
  if (e.target === editPopup) {
    editPopup.style.display = "none";
  }
};

// SAVE CHANGES → UPDATE PROFILE CARD
saveBtn.onclick = () => {
  const name = document.getElementById("editName").value.trim();
  const location = document.getElementById("editLocation").value.trim();
  const phone = document.getElementById("editPhone").value.trim();
  const crops = document.getElementById("editCrops").value.trim();
  const experience = document.getElementById("editExperience").value.trim();

  document.querySelector(".name").innerHTML = `<b>Name:</b> ${name}`;
  document.querySelector(".location").innerHTML = `<b>Location:</b> ${location}`;
  document.querySelector(".phone").innerHTML = `<b>Phone:</b> ${phone}`;
  document.querySelector(".crops").innerHTML = `<b>Crops:</b> ${crops}`;
  document.querySelector(".experience").innerHTML = `<b>Experience:</b> ${experience}`;

  // Close popup
  editPopup.style.display = "none";
};