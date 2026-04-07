function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
}

function login(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "rohith@gmail.com" && password === "rohith123") {
    alert("Login Successful ✅");
    window.location.href = "../home/index.html";
  } else {
    alert("Invalid Email or Password ❌");
  }
}