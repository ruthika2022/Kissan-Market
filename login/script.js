
function log() {

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (email === "admin@12" && password === "admin123") {
    window.location.href = "../Admin/admin.html";
  } 
  else if (email === "buyer@12" && password === "buyer123") {
    window.location.href = "../home/index.html";
  } 
  else if (email === "farmer@12" && password === "farmer123") {
    window.location.href = "../Farmer/farmer.html";
  } 
  else if (email === "vendor@12" && password === "vendor123") {
    window.location.href = "../vender/vender.html";
  }
  else {
    alert("Invalid Email or Password");
  }


  
}
