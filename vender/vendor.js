let products=[];
let orders=[];
let earnings=0;

function toggle(){
 document.getElementById("sidebar").classList.toggle("active");
}

function show(id){
 document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
 document.getElementById(id).classList.add("active");
}

function addProduct(){
 let name=document.getElementById("name").value;
 let price=document.getElementById("price").value;
 let qty=document.getElementById("qty").value;

 products.push({name,price,qty});
 loadStock();
}

function loadStock(){
 let table=document.getElementById("stockTable");
 table.innerHTML="";
 products.forEach(p=>{
 table.innerHTML+=`<tr><td>${p.name}</td><td>${p.price}</td><td>${p.qty}</td></tr>`;
 });
 document.getElementById("stockCount").innerText=products.length;
}

function createOrder(){
 if(products.length==0){alert("Add product");return;}
 let p=products[0];
 orders.push(p);
 earnings+=Number(p.price);
 loadOrders();
}

function loadOrders(){
 let list=document.getElementById("orderList");
 list.innerHTML="";
 orders.forEach(o=>{
 list.innerHTML+=`<li>${o.name} - ₹${o.price}</li>`;
 });
 document.getElementById("ordersCount").innerText=orders.length;
 document.getElementById("earnCount").innerText=earnings;
 document.getElementById("earnVal").innerText=earnings;
}

function sendMsg(){
 let msg=document.getElementById("msg").value;
 let box=document.getElementById("chatBox");
 box.innerHTML+=`<p><b>You:</b> ${msg}</p>`;
 box.innerHTML+=`<p><b>Support:</b> Reply soon</p>`;
}
