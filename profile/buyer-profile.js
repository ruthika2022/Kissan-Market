function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
}

const openPopup = document.getElementById("openPopup");
const popup = document.getElementById("locationPopup");
const closeBtn = document.querySelector(".close");

openPopup.onclick = () => (popup.style.display = "flex");

closeBtn.onclick = () => (popup.style.display = "none");

popup.onclick = (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
};

const monthlyPurchases = [
  { month: "January", orders: 5, amount: 2500 },
  { month: "February", orders: 3, amount: 1800 },
  { month: "March", orders: 7, amount: 4200 },
  { month: "April", orders: 2, amount: 900 },
];

const yearlyPurchases = [
  { year: "2022", orders: 45, amount: 32000 },
  { year: "2023", orders: 60, amount: 47000 },
  { year: "2024", orders: 72, amount: 56000 },
];

const monthlyTable = document.getElementById("monthlyData");

monthlyPurchases.forEach((data) => {
  let row = `
<tr>
<td>${data.month}</td>
<td>${data.orders}</td>
<td>₹${data.amount}</td>
</tr>
`;

  monthlyTable.innerHTML += row;
});

const yearlyTable = document.getElementById("yearlyData");

yearlyPurchases.forEach((data) => {
  let row = `
<tr>
<td>${data.year}</td>
<td>${data.orders}</td>
<td>₹${data.amount}</td>
</tr>
`;

  yearlyTable.innerHTML += row;
});
// ================= EDIT PROFILE =================

const editBtn = document.querySelector(".button");
const editPopup = document.getElementById("editPopup");
const closeEdit = document.querySelector(".close-edit");
const saveBtn = document.querySelector(".save-btn");

// OPEN POPUP + FILL DATA
editBtn.onclick = () => {
  editPopup.style.display = "flex";

  document.getElementById("editName").value =
    document.querySelector(".profile-card h2").innerText;

  document.getElementById("editEmail").value =
    document.querySelectorAll(".info-row p")[0].innerText;

  document.getElementById("editPhone").value =
    document.querySelectorAll(".info-row p")[1].innerText;

  document.getElementById("editAddress").value =
    document.querySelectorAll(".info-row p")[2].innerText;
};

// CLOSE POPUP
closeEdit.onclick = () => {
  editPopup.style.display = "none";
};

// CLOSE ON OUTSIDE CLICK
editPopup.onclick = (e) => {
  if (e.target === editPopup) {
    editPopup.style.display = "none";
  }
};

// SAVE CHANGES
saveBtn.onclick = () => {
  const name = document.getElementById("editName").value.trim();
  const email = document.getElementById("editEmail").value.trim();
  const phone = document.getElementById("editPhone").value.trim();
  const address = document.getElementById("editAddress").value.trim();

  // Update UI
  document.querySelector(".profile-card h2").innerText = name;

  document.querySelectorAll(".info-row p")[0].innerText = email;
  document.querySelectorAll(".info-row p")[1].innerText = phone;
  document.querySelectorAll(".info-row p")[2].innerText = address;

  // Close popup
  editPopup.style.display = "none";
};