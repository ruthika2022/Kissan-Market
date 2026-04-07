// Page Switch
function openPage(event,pageId){

document.querySelectorAll(".page")
.forEach(p=>p.classList.remove("active"));

document.getElementById(pageId)
.classList.add("active");

document.getElementById("pageTitle").innerText =
pageId.charAt(0).toUpperCase()+pageId.slice(1);

document.querySelectorAll(".sidebar a")
.forEach(l=>l.classList.remove("active"));

event.currentTarget.classList.add("active");

if(window.innerWidth<=1024){
document.getElementById("sidebar").classList.remove("show");
}
}

// Toggle Sidebar (Mobile + Tablet only)
function toggleMenu(){
if(window.innerWidth<=1024){
document.getElementById("sidebar")
.classList.toggle("show");
}
}

// Close sidebar when clicking outside (Mobile UX)
document.addEventListener("click",function(e){
if(window.innerWidth<=1024){
if(!e.target.closest(".sidebar") && !e.target.closest(".menu-toggle")){
document.getElementById("sidebar").classList.remove("show");
}
}
});

// Buttons functionality
document.addEventListener("click",function(e){

if(e.target.classList.contains("approve-btn")){
let row = e.target.closest("tr");
row.querySelector(".status").innerText="Approved";
row.querySelector(".status").className="status active-status";
alert("Farmer Approved Successfully");
}

if(e.target.classList.contains("remove-btn")){
if(confirm("Are you sure to remove?")){
e.target.closest("tr").remove();
}
}

if(e.target.classList.contains("deliver-btn")){
let row = e.target.closest("tr");
row.querySelector(".status").innerText="Delivered";
row.querySelector(".status").className="status active-status";
e.target.remove();
alert("Order marked as Delivered");
}

if(e.target.classList.contains("resolve-btn")){
e.target.closest(".card").remove();
alert("Complaint Resolved");
}

if(e.target.classList.contains("save-btn")){
alert("Settings Saved Successfully");
}

});

// Search functionality
document.getElementById("farmerSearch")?.addEventListener("keyup",function(){
let filter=this.value.toLowerCase();
document.querySelectorAll("#farmersTable tr")
.forEach((row,i)=>{
if(i===0)return;
row.style.display=row.innerText.toLowerCase().includes(filter)?"":"none";
});
});

document.getElementById("buyerSearch")?.addEventListener("keyup",function(){
let filter=this.value.toLowerCase();
document.querySelectorAll("#buyersTable tr")
.forEach((row,i)=>{
if(i===0)return;
row.style.display=row.innerText.toLowerCase().includes(filter)?"":"none";
});
});