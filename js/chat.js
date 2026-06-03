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

// ==========================================
// PRIVATE CHAT SYSTEM (FARMER <-> VENDOR)
// ==========================================
let currentChatSession = null; // { productId, vendorId }

function initPrivateChatModal() {
    if (document.getElementById('privateChatModal')) return;
    
    const modal = document.createElement('div');
    modal.id = 'privateChatModal';
    modal.className = 'private-chat-modal';
    modal.innerHTML = `
        <div class="private-chat-content">
            <div class="private-chat-header">
                <div class="private-chat-title-info">
                    <h3 id="privateChatTitle" style="color: white; margin: 0; font-size: 1.1rem; font-weight: 600;">Chat</h3>
                    <p id="privateChatSubtitle" style="color: rgba(255,255,255,0.8); margin: 0.2rem 0 0 0; font-size: 0.8rem;">Bid Deal Chat</p>
                </div>
                <span class="private-chat-close" onclick="closePrivateChat()" style="color: white; font-size: 1.5rem; cursor: pointer;">&times;</span>
            </div>
            <div class="private-chat-body" id="privateChatBody">
                <!-- Messages populated dynamically -->
            </div>
            <form class="private-chat-input-area" id="privateChatForm" onsubmit="event.preventDefault(); sendPrivateChatMessage();">
                <input type="text" id="privateChatInput" placeholder="Type a message..." required autocomplete="off" />
                <button type="submit" id="privateChatSendBtn">Send</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

function openPrivateChat(productId, vendorId) {
    initPrivateChatModal();
    
    productId = parseInt(productId);
    vendorId = parseInt(vendorId);
    
    currentChatSession = { productId, vendorId };
    
    const modal = document.getElementById('privateChatModal');
    modal.classList.add('active');
    
    const currentUser = State.getCurrentUser();
    const product = State.getProducts().find(p => p.id === productId);
    const profiles = JSON.parse(localStorage.getItem('km_profiles')) || {};
    
    let otherUserName = "Participant";
    if (currentUser.role === 'farmer') {
        const vendorProfile = profiles[vendorId];
        otherUserName = vendorProfile ? vendorProfile.name : "Vendor";
    } else {
        const farmerId = product ? product.farmerId : 1;
        const farmerProfile = profiles[farmerId];
        otherUserName = farmerProfile ? farmerProfile.name : "Farmer";
    }
    
    document.getElementById('privateChatTitle').innerText = `Chat with ${otherUserName}`;
    document.getElementById('privateChatSubtitle').innerText = `Regarding ${product ? product.name : 'Product'}`;
    
    State.markPrivateMessagesRead(productId, vendorId, currentUser.id);
    renderPrivateMessages();
    document.getElementById('privateChatInput').focus();
}

function closePrivateChat() {
    const modal = document.getElementById('privateChatModal');
    if (modal) {
        modal.classList.remove('active');
    }
    currentChatSession = null;
}

function renderPrivateMessages() {
    if (!currentChatSession) return;
    const body = document.getElementById('privateChatBody');
    if (!body) return;
    
    const currentUser = State.getCurrentUser();
    const chat = State.getPrivateChat(currentChatSession.productId, currentChatSession.vendorId);
    
    body.innerHTML = chat.messages.map(m => {
        const isSentByMe = m.senderId === currentUser.id;
        const dateObj = new Date(m.timestamp);
        const timeStr = isNaN(dateObj.getTime()) ? '' : dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        return `
            <div class="private-msg-wrapper ${isSentByMe ? 'sent' : 'received'}">
                <div class="private-msg-bubble">
                    ${escapeHtml(m.text)}
                </div>
                <span class="private-msg-time">${timeStr}</span>
            </div>
        `;
    }).join('');
    
    body.scrollTop = body.scrollHeight;
}

function sendPrivateChatMessage() {
    if (!currentChatSession) return;
    const input = document.getElementById('privateChatInput');
    const text = input.value.trim();
    if (!text) return;
    
    const currentUser = State.getCurrentUser();
    
    State.addPrivateMessage(
        currentChatSession.productId,
        currentChatSession.vendorId,
        currentUser.id,
        currentUser.name,
        text
    );
    
    input.value = '';
    renderPrivateMessages();
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

if (typeof State !== 'undefined') {
    State.listenToChanges(() => {
        if (currentChatSession) {
            const currentUser = State.getCurrentUser();
            State.markPrivateMessagesRead(currentChatSession.productId, currentChatSession.vendorId, currentUser.id);
            renderPrivateMessages();
        }
        
        if (typeof renderBids === 'function') renderBids();
        if (typeof renderMyBids === 'function') renderMyBids();
    });
}

window.openPrivateChat = openPrivateChat;
window.closePrivateChat = closePrivateChat;
window.sendPrivateChatMessage = sendPrivateChatMessage;