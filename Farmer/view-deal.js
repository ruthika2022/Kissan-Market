function toggleMenu(){

document.getElementById("navMenu").classList.toggle("show");

}

/* LOCATION POPUP */

const openPopup = document.getElementById("openPopup");
const popup = document.getElementById("locationPopup");
const closeBtn = document.querySelector(".close");

openPopup.onclick = () => {
popup.style.display = "flex";
}

closeBtn.onclick = () => {
popup.style.display = "none";
}

popup.onclick = (e)=>{
if(e.target === popup){
popup.style.display="none";
}
}


/* DEAL ACTION */

function handleDeal(button,status){

const actions = button.parentElement;

const statusText = document.createElement("span");

statusText.classList.add("status");

if(status === "accepted"){

statusText.textContent="✔ Deal Accepted";
statusText.style.color="green";

}

else{

statusText.textContent="✖ Deal Rejected";
statusText.style.color="red";

}

actions.innerHTML="";
actions.appendChild(statusText);

}