// ELEMENTS

const chatIcon =
document.getElementById("chatIcon");

const chatContainer =
document.getElementById("chatContainer");

const closeChat =
document.getElementById("closeChat");

const sendBtn =
document.getElementById("sendBtn");

const chatInput =
document.getElementById("chatInput");

const chatBody =
document.getElementById("chatBody");

// OPEN CHAT

chatIcon.addEventListener("click", function(){

    chatContainer.style.display = "flex";

});

// CLOSE CHAT

closeChat.addEventListener("click", function(){

    chatContainer.style.display = "none";

});

// SEND MESSAGE

function sendMessage(){

    const message =
    chatInput.value.trim();

    if(message === ""){
        return;
    }

    // USER MESSAGE

    const userMessage =
    document.createElement("div");

    userMessage.classList.add("user-msg");

    userMessage.innerText = message;

    chatBody.appendChild(userMessage);

    // CLEAR INPUT

    chatInput.value = "";

    // AUTO SCROLL

    chatBody.scrollTop =
    chatBody.scrollHeight;

    // ADMIN REPLY

    setTimeout(function(){

        const adminReply =
        document.createElement("div");

        adminReply.classList.add("admin-msg");

        adminReply.innerText =
        "Thank you. Admin will contact you shortly.";

        chatBody.appendChild(adminReply);



        chatBody.scrollTop =
        chatBody.scrollHeight;

    }, 1000);

}



sendBtn.addEventListener(
    "click",
    sendMessage
);



chatInput.addEventListener(
    "keypress",
    function(e){

        if(e.key === "Enter"){

            sendMessage();

        }

    }
);