const State = {
    
    keys: {
        products: 'products',
        bids: 'bids',
        accepted: 'accepted_products',
        history: 'bid_history',
        vendors: 'vendor_status',
        currentUser: 'km_current_user',
        orders: 'km_orders',
        interested: 'km_interested_list',
        buyer_orders: 'km_buyer_orders'
    },

    init() {
        // Migration logic to ensure new seeded products/bids/profiles are loaded
        const CURRENT_VERSION = "3";
        if (localStorage.getItem("km_data_version") !== CURRENT_VERSION) {
            localStorage.removeItem(this.keys.products);
            localStorage.removeItem(this.keys.bids);
            localStorage.removeItem("km_profiles");
            localStorage.setItem("km_data_version", CURRENT_VERSION);
        }

        if (!localStorage.getItem(this.keys.products)) {
            const dummyProducts = [
                {
                    id: 102,
                    name: "Premium Basmati Rice",
                    category: "Grains",
                    price: 80,
                    minPrice: 50,
                    maxPrice: 55,
                    quantity: 1000,
                    unit: "kg",
                    status: "Active",
                    farmerId: 1,
                    farmerName: "Rajesh Kumar",
                    location: "Ambala, HR",
                    createdAt: new Date().toISOString(),
                    endTime: new Date(Date.now() + 172800000).toISOString(),
                    image:
                        "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300",
                },
                {
                    id: 105,
                    name: "Bitter Gourd",
                    category: "Vegetables",
                    price: 64,
                    minPrice: 40,
                    maxPrice: 55,
                    quantity: 200,
                    unit: "kg",
                    status: "Active",
                    farmerId: 1,
                    farmerName: "Rajesh Kumar",
                    location: "Vikarabad, TS",
                    createdAt: new Date().toISOString(),
                    endTime: new Date(Date.now() + 86400000).toISOString(),
                    image:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiYOs0p9EXF4zIbpBgEWqQho60pYdyA1K9EE_3vKozlLvFaoyNEsUxT77nsf9kPA7zP4M&usqp=CAU",
                },
                {
                    id: 106,
                    name: "Onion",
                    category: "Vegetables",
                    price: 29,
                    minPrice: 25,
                    maxPrice: 35,
                    quantity: 1000,
                    unit: "kg",
                    status: "Active",
                    farmerId: 1,
                    farmerName: "Rajesh Kumar",
                    location: "Nashik, MH",
                    createdAt: new Date().toISOString(),
                    endTime: new Date(Date.now() + 172800000).toISOString(),
                    image:
                        "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=300",
                },
                {
                    id: 107,
                    name: "Lady Finger",
                    category: "Vegetables",
                    price: 25,
                    minPrice: 20,
                    maxPrice: 30,
                    quantity: 300,
                    unit: "kg",
                    status: "Active",
                    farmerId: 1,
                    farmerName: "Rajesh Kumar",
                    location: "Vikarabad, TS",
                    createdAt: new Date().toISOString(),
                    endTime: new Date(Date.now() + 43200000).toISOString(),
                    image:
                        "https://kyssafarms.com/cdn/shop/products/lady-finger.jpg?v=1600955405",
                },
                {
                    id: 104,
                    name: "Alphonso Mangoes",
                    category: "Fruits",
                    price: 120,
                    minPrice: 100,
                    maxPrice: 130,
                    quantity: 200,
                    unit: "kg",
                    status: "Active",
                    farmerId: 1,
                    farmerName: "Rajesh Kumar",
                    location: "Ratnagiri, MH",
                    createdAt: new Date().toISOString(),
                    endTime: new Date(Date.now() + 259200000).toISOString(),
                    image:
                        "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=300",
                },
            ];
            localStorage.setItem(this.keys.products, JSON.stringify(dummyProducts));
        }

        // Ensure all products have a maxPrice set to 1.3x minPrice when missing
        try {
            const prods = JSON.parse(localStorage.getItem(this.keys.products)) || [];
            let changed = false;
            prods.forEach((p) => {
                p.minPrice = Number(p.minPrice) || 0;
                if (!p.maxPrice || Number(p.maxPrice) < p.minPrice) {
                    p.maxPrice = Math.round(p.minPrice * 1.3);
                    changed = true;
                }
            });
            if (changed) localStorage.setItem(this.keys.products, JSON.stringify(prods));
        } catch (err) {
            /* ignore parse errors */
        }

        if (!localStorage.getItem(this.keys.bids)) {
            const dummyBids = [
                {
                    id: 201,
                    productId: 102,
                    productName: "Premium Basmati Rice",
                    vendorId: 2,
                    vendorName: "Suresh Raina",
                    amount: 52,
                    quantity: 500,
                    status: "Pending Admin Review",
                    timestamp: new Date(Date.now() - 3600000).toISOString(),
                    farmerId: 1,
                },
                {
                    id: 202,
                    productId: 102,
                    productName: "Premium Basmati Rice",
                    vendorId: 3,
                    vendorName: "AgriCorp Ltd.",
                    amount: 54,
                    quantity: 1000,
                    status: "Pending Admin Review",
                    timestamp: new Date(Date.now() - 1800000).toISOString(),
                    farmerId: 1,
                },
                {
                    id: 203,
                    productId: 106,
                    productName: "Onion",
                    vendorId: 2,
                    vendorName: "Suresh Raina",
                    amount: 28,
                    quantity: 500,
                    status: "Pending Admin Review",
                    timestamp: new Date(Date.now() - 3000000).toISOString(),
                    farmerId: 1,
                },
                {
                    id: 204,
                    productId: 106,
                    productName: "Onion",
                    vendorId: 4,
                    vendorName: "Organic Roots",
                    amount: 30,
                    quantity: 1000,
                    status: "Pending Admin Review",
                    timestamp: new Date(Date.now() - 1500000).toISOString(),
                    farmerId: 1,
                },
                {
                    id: 205,
                    productId: 105,
                    productName: "Bitter Gourd",
                    vendorId: 2,
                    vendorName: "Suresh Raina",
                    amount: 45,
                    quantity: 100,
                    status: "Pending Admin Review",
                    timestamp: new Date(Date.now() - 2400000).toISOString(),
                    farmerId: 1,
                },
                {
                    id: 206,
                    productId: 105,
                    productName: "Bitter Gourd",
                    vendorId: 3,
                    vendorName: "AgriCorp Ltd.",
                    amount: 48,
                    quantity: 200,
                    status: "Pending Admin Review",
                    timestamp: new Date(Date.now() - 1200000).toISOString(),
                    farmerId: 1,
                },
                {
                    id: 207,
                    productId: 107,
                    productName: "Lady Finger",
                    vendorId: 2,
                    vendorName: "Suresh Raina",
                    amount: 22,
                    quantity: 150,
                    status: "Pending Admin Review",
                    timestamp: new Date(Date.now() - 2000000).toISOString(),
                    farmerId: 1,
                },
                {
                    id: 208,
                    productId: 107,
                    productName: "Lady Finger",
                    vendorId: 4,
                    vendorName: "Organic Roots",
                    amount: 24,
                    quantity: 300,
                    status: "Pending Admin Review",
                    timestamp: new Date(Date.now() - 1000000).toISOString(),
                    farmerId: 1,
                },
                {
                    id: 209,
                    productId: 104,
                    productName: "Alphonso Mangoes",
                    vendorId: 3,
                    vendorName: "AgriCorp Ltd.",
                    amount: 110,
                    quantity: 100,
                    status: "Pending Admin Review",
                    timestamp: new Date(Date.now() - 1600000).toISOString(),
                    farmerId: 1,
                },
                {
                    id: 210,
                    productId: 104,
                    productName: "Alphonso Mangoes",
                    vendorId: 4,
                    vendorName: "Organic Roots",
                    amount: 115,
                    quantity: 200,
                    status: "Pending Admin Review",
                    timestamp: new Date(Date.now() - 800000).toISOString(),
                    farmerId: 1,
                }
            ];
            localStorage.setItem(this.keys.bids, JSON.stringify(dummyBids));
        }

        if (!localStorage.getItem(this.keys.orders)) {
            const dummyOrders = [
                { id: 301, productId: 102, productName: 'Premium Basmati Rice', vendorId: 2, vendorName: 'Suresh Raina', amount: 78000, quantity: 1000, status: 'pending', timestamp: new Date(Date.now() - 86400000).toISOString(), farmerId: 1 }
            ];
            localStorage.setItem(this.keys.orders, JSON.stringify(dummyOrders));
        }
        if (!localStorage.getItem(this.keys.interested)) localStorage.setItem(this.keys.interested, JSON.stringify([]));
        if (!localStorage.getItem(this.keys.accepted)) localStorage.setItem(this.keys.accepted, JSON.stringify([]));
        if (!localStorage.getItem(this.keys.history)) localStorage.setItem(this.keys.history, JSON.stringify([]));
        
        if (!localStorage.getItem(this.keys.buyer_orders)) {
            const dummyBuyerOrders = [
                { 
                    id: 501, 
                    buyerName: 'Anita Rao', 
                    productName: 'Organic Tomatoes', 
                    quantity: '50 kg', 
                    orderedDate: new Date().toISOString(), 
                    address: 'Flat 402, Sunshine Apts, Mumbai', 
                    paymentStatus: 'Paid', 
                    status: 'Pending',
                    vendorId: 2 
                },
                { 
                    id: 502, 
                    buyerName: 'Ramesh Chen', 
                    productName: 'Fresh Broccoli', 
                    quantity: '10 kg', 
                    orderedDate: new Date(Date.now() - 86400000).toISOString(), 
                    address: '12-A, Green Park, Pune', 
                    paymentStatus: 'COD', 
                    status: 'Approved',
                    vendorId: 2 
                }
            ];
            localStorage.setItem(this.keys.buyer_orders, JSON.stringify(dummyBuyerOrders));
        }
        
  
        if (!localStorage.getItem('km_profiles')) {
            const dummyProfiles = {
                1: { id: 1, name: 'Rajesh Kumar', email: 'rajesh@farmer.com', phone: '+91 98765 43210', location: 'Nashik, Maharashtra', role: 'farmer', image: 'https://images.unsplash.com/photo-1595273670150-db0a3d39074f?auto=format&fit=crop&q=80&w=200' },
                2: { id: 2, name: 'Suresh Raina', email: 'suresh@vendor.com', phone: '+91 87654 32109', location: 'Mumbai, Maharashtra', role: 'vendor', image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&q=80&w=200' },
                3: { id: 3, name: "AgriCorp Ltd.", email: "info@agricorp.com", phone: "+91 76543 21098", location: "Pune, Maharashtra", role: "vendor", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200" },
                4: { id: 4, name: "Organic Roots", email: "contact@organicroots.com", phone: "+91 65432 10987", location: "Nagpur, Maharashtra", role: "vendor", image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=200" }
            };
            localStorage.setItem('km_profiles', JSON.stringify(dummyProfiles));
        }


        if (!localStorage.getItem('km_notifications')) {
            const dummyNotifs = [
                { id: 1, userId: 1, title: 'New Bid Received', message: 'You received a bid of ₹45 for Organic Tomatoes.', read: false, timestamp: new Date().toISOString() },
                { id: 2, userId: 2, title: 'Bid Accepted', message: 'Your bid for Basmati Rice has been accepted!', read: false, timestamp: new Date(Date.now() - 3600000).toISOString() },
                { id: 3, userId: 1, title: 'Welcome!', message: 'Welcome to Kissan Market, Rajesh!', read: true, timestamp: new Date(Date.now() - 86400000).toISOString() }
            ];
            localStorage.setItem('km_notifications', JSON.stringify(dummyNotifs));
        }
        
        setInterval(() => this.checkTimers(), 1000);
    },

    getData(key) { return JSON.parse(localStorage.getItem(key)) || []; },
    saveData(key, data) { 
        localStorage.setItem(key, JSON.stringify(data)); 
        this.syncDashboards(); 
    },

    getProducts() { return this.getData(this.keys.products); },
    getBids() { return this.getData(this.keys.bids); },
    getOrders() { return this.getData(this.keys.orders); },
    getInterested() { return this.getData(this.keys.interested); },
    getNotifications(userId) { 
        const all = JSON.parse(localStorage.getItem('km_notifications')) || [];
        return userId ? all.filter(n => n.userId === userId) : all;
    },

    getBuyerOrders(vendorId) {
        const orders = this.getData(this.keys.buyer_orders);
        return vendorId ? orders.filter(o => o.vendorId === vendorId) : orders;
    },

    updateBuyerOrderStatus(orderId, status) {
        const orders = this.getData(this.keys.buyer_orders);
        const orderIndex = orders.findIndex(o => o.id === orderId);
        if (orderIndex !== -1) {
            orders[orderIndex].status = status;
            this.saveData(this.keys.buyer_orders, orders);
            
    
            const user = this.getCurrentUser();
            this.addNotification(user.id, `Order Update`, `Order #${orderId} has been ${status === 'Approved' ? 'Approved Successfully' : 'Rejected'}.`);
        }
    },


    setCurrentUser(user) { localStorage.setItem(this.keys.currentUser, JSON.stringify(user)); },
    getCurrentUser() { 
        const user = JSON.parse(localStorage.getItem(this.keys.currentUser));
        if (!user) return null;
        const profiles = JSON.parse(localStorage.getItem('km_profiles')) || {};
        return { ...user, ...(profiles[user.id] || {}) };
    },
    logout() { 
        localStorage.clear();
        sessionStorage.clear();
        
     
        const path = window.location.pathname;
        let rootPath = './';
        
        if (path.includes('/pages/')) {
            const partsAfterPages = path.split('/pages/')[1].split('/').filter(p => p.length > 0);
            rootPath = '../'.repeat(partsAfterPages.length + 1);
        } else if (path.includes('/buyer/')) {
            const partsAfterBuyer = path.split('/buyer/')[1].split('/').filter(p => p.length > 0);
            rootPath = '../'.repeat(partsAfterBuyer.length + 1);
        } else if (path.includes('/farmer/')) {
             const partsAfterFarmer = path.split('/farmer/')[1].split('/').filter(p => p.length > 0);
             rootPath = '../'.repeat(partsAfterFarmer.length + 1);
        } else if (path.includes('/vendor/')) {
             const partsAfterVendor = path.split('/vendor/')[1].split('/').filter(p => p.length > 0);
             rootPath = '../'.repeat(partsAfterVendor.length + 1);
        }
        
        window.location.href = rootPath + 'index.html';
    },

    updateProfile(profileData) {
        const profiles = JSON.parse(localStorage.getItem('km_profiles')) || {};
        const user = this.getCurrentUser();
        if (!user) return;
        
        profiles[user.id] = { ...profiles[user.id], ...profileData };
        localStorage.setItem('km_profiles', JSON.stringify(profiles));
        this.syncDashboards();
    },

  
addProduct(product) {

    const products = this.getProducts();

    product.id = Date.now();

    product.status = "Active";

    products.push(product);

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    this.notify();
},

    updateProduct(id, updatedData) {
        const products = this.getData(this.keys.products);
        const index = products.findIndex(p => p.id === id);
        if (index > -1) {
            products[index] = { ...products[index], ...updatedData };
            this.saveData(this.keys.products, products);
        }
    },

    deleteProduct(id) {
        let products = this.getData(this.keys.products);
        products = products.filter(p => p.id !== id);
        this.saveData(this.keys.products, products);
    },

    updateStock(id, newQty) {
        this.updateProduct(id, { quantity: newQty });
        this.addNotification(this.getCurrentUser().id, 'Stock Updated', `Stock for product ID ${id} updated to ${newQty}.`);
    },

    placeBid(bid) {
        const bids = this.getData(this.keys.bids);
        const history = this.getData(this.keys.history);
        const existingIndex = bids.findIndex(b => b.productId === bid.productId && b.vendorId === bid.vendorId);
        const newBid = { ...bid, id: existingIndex > -1 ? bids[existingIndex].id : Date.now(), status: 'Pending Admin Review', timestamp: new Date().toISOString() };

        if (existingIndex > -1) bids[existingIndex] = newBid;
        else bids.push(newBid);

        history.push({ ...newBid, historyId: Date.now() });
        this.saveData(this.keys.bids, bids);
        this.saveData(this.keys.history, history);

        const product = this.getProducts().find(p => p.id === bid.productId);
        if (product) {
            this.addNotification(
                bid.vendorId,
                "Bid Submitted",
                `You placed a bid of ₹${bid.amount} on ${product.name}`
            );
            this.addNotification(
                0,
                "New Bid Submitted",
                `Vendor ${bid.vendorName} submitted a bid of ₹${bid.amount} on ${product.name}`
            );
        }
        return newBid;
    },

    cancelBid(bidId) {
        let bids = this.getData(this.keys.bids);
        bids = bids.filter(b => b.id !== bidId);
        this.saveData(this.keys.bids, bids);
    },

    counterOffer(bidId, amount) {
        const bids = this.getData(this.keys.bids);
        const bid = bids.find(b => b.id === bidId);
        if (bid) {
            bid.status = 'countered';
            bid.counterAmount = amount;
            this.saveData(this.keys.bids, bids);
            this.addNotification(bid.vendorId, 'Counter Offer Received', `Farmer offered ₹${amount} for ${bid.productName}.`);
        }
    },

    acceptBid(bidId) {
        this.farmerAcceptBid(bidId);
    },

    rejectBid(bidId) {
        const bids = this.getData(this.keys.bids);
        const bid = bids.find(b => b.id === bidId);
        if (bid) {
            bid.status = 'Rejected By Admin';
            this.saveData(this.keys.bids, bids);
            this.addNotification(bid.vendorId, 'Bid Rejected', `Your bid for ${bid.productName} was rejected.`);
        }
    },

    adminSelectBid(bidId) {
        const bids = this.getData(this.keys.bids);
        const products = this.getData(this.keys.products);
        const selectedBid = bids.find(b => b.id === bidId);
        if (!selectedBid) return;

        selectedBid.status = "Selected By Admin";

        bids.forEach(b => {
            if (b.productId === selectedBid.productId && b.id !== bidId) {
                b.status = "Rejected By Admin";
                this.addNotification(
                    b.vendorId,
                    "Bid Rejected",
                    `Your bid of ₹${b.amount} for ${b.productName} was rejected by the Admin.`
                );
            }
        });

        const productIndex = products.findIndex(p => p.id === selectedBid.productId);
        if (productIndex > -1) {
            products[productIndex].status = "Selected Bid Review";
        }

        this.saveData(this.keys.bids, bids);
        this.saveData(this.keys.products, products);

        this.addNotification(
            selectedBid.vendorId,
            "Bid Approved",
            `Your bid of ₹${selectedBid.amount} for ${selectedBid.productName} has been approved by the Admin and sent to the Farmer.`
        );

        this.addNotification(
            selectedBid.farmerId,
            "Admin Selected Bid",
            `Admin selected Vendor ${selectedBid.vendorName}'s bid of ₹${selectedBid.amount} for ${selectedBid.productName}. Please review and Accept/Decline.`
        );
    },

    farmerAcceptBid(bidId) {
        const bids = this.getData(this.keys.bids);
        const products = this.getData(this.keys.products);
        const accepted = this.getData(this.keys.accepted);
        const bid = bids.find(b => b.id === bidId);
        if (!bid) return;

        bid.status = "Accepted By Farmer";
        const productIndex = products.findIndex(p => p.id === bid.productId);
        if (productIndex > -1) {
            products[productIndex].status = "Deal Active";
            accepted.push({
                ...products[productIndex],
                soldPrice: bid.amount,
                soldTo: bid.vendorName,
                timestamp: new Date().toISOString()
            });
        }

        this.saveData(this.keys.bids, bids);
        this.saveData(this.keys.products, products);
        this.saveData(this.keys.accepted, accepted);

        this.addNotification(
            bid.vendorId,
            "Farmer Accepted",
            `Farmer accepted your bid of ₹${bid.amount} for ${bid.productName}!`
        );

        this.addNotification(
            bid.farmerId,
            "Deal Activated",
            `Deal is active for ${bid.productName} with ${bid.vendorName}. Private chat is enabled.`
        );

        this.addNotification(
            0,
            "Farmer Accepted",
            `Farmer accepted Vendor ${bid.vendorName}'s bid of ₹${bid.amount} for ${bid.productName}.`
        );
    },

    farmerDeclineBid(bidId) {
        const bids = this.getData(this.keys.bids);
        const products = this.getData(this.keys.products);
        const bid = bids.find(b => b.id === bidId);
        if (!bid) return;

        bid.status = "Declined By Farmer";

        const productIndex = products.findIndex(p => p.id === bid.productId);
        if (productIndex > -1) {
            products[productIndex].status = "Active";
        }

        bids.forEach(b => {
            if (b.productId === bid.productId && b.id !== bidId) {
                b.status = "Pending Admin Review";
            }
        });

        this.saveData(this.keys.bids, bids);
        this.saveData(this.keys.products, products);

        this.addNotification(
            bid.vendorId,
            "Farmer Declined",
            `Farmer declined your bid of ₹${bid.amount} for ${bid.productName}.`
        );

        this.addNotification(
            0,
            "Farmer Declined",
            `Farmer declined Vendor ${bid.vendorName}'s bid of ₹${bid.amount} for ${bid.productName}.`
        );
    },

    getPrivateChats() {
        return JSON.parse(localStorage.getItem("km_private_chats")) || [];
    },

    savePrivateChats(chats) {
        localStorage.setItem("km_private_chats", JSON.stringify(chats));
        this.syncDashboards();
    },

    getPrivateChat(productId, vendorId) {
        const chats = this.getPrivateChats();
        let chat = chats.find(c => c.productId === productId && c.vendorId === vendorId);
        if (!chat) {
            const product = this.getProducts().find(p => p.id === productId);
            chat = {
                chatId: `chat_${productId}_${vendorId}`,
                productId: productId,
                productName: product ? product.name : "Product",
                farmerId: product ? product.farmerId : 1,
                vendorId: vendorId,
                messages: []
            };
            chats.push(chat);
            this.savePrivateChats(chats);
        }
        return chat;
    },

    addPrivateMessage(productId, vendorId, senderId, senderName, text) {
        const chats = this.getPrivateChats();
        let chatIndex = chats.findIndex(c => c.productId === productId && c.vendorId === vendorId);
        
        if (chatIndex === -1) {
            this.getPrivateChat(productId, vendorId);
            return this.addPrivateMessage(productId, vendorId, senderId, senderName, text);
        }

        const newMessage = {
            senderId: senderId,
            senderName: senderName,
            text: text,
            timestamp: new Date().toISOString(),
            read: false
        };

        chats[chatIndex].messages.push(newMessage);
        this.savePrivateChats(chats);
        return newMessage;
    },

    markPrivateMessagesRead(productId, vendorId, readerId) {
        const chats = this.getPrivateChats();
        const chatIndex = chats.findIndex(c => c.productId === productId && c.vendorId === vendorId);
        if (chatIndex !== -1) {
            let updated = false;
            chats[chatIndex].messages.forEach(m => {
                if (m.senderId !== readerId && !m.read) {
                    m.read = true;
                    updated = true;
                }
            });
            if (updated) {
                this.savePrivateChats(chats);
            }
        }
    },

    getPrivateChatUnreadCount(productId, vendorId, userId) {
        const chats = this.getPrivateChats();
        const chat = chats.find(c => c.productId === productId && c.vendorId === vendorId);
        if (!chat) return 0;
        return chat.messages.filter(m => m.senderId !== userId && !m.read).length;
    },

    addToInterested(productId) {
        const interested = this.getData(this.keys.interested);
        if (!interested.includes(productId)) {
            interested.push(productId);
            this.saveData(this.keys.interested, interested);
            return true;
        }
        return false;
    },

    addNotification(userId, title, message) {
        const notifs = JSON.parse(localStorage.getItem('km_notifications')) || [];
        notifs.unshift({ id: Date.now(), userId, title, message, read: false, timestamp: new Date().toISOString() });
        localStorage.setItem('km_notifications', JSON.stringify(notifs.slice(0, 50)));
        this.syncDashboards();
    },

    markNotificationsRead(userId) {
        let notifs = JSON.parse(localStorage.getItem('km_notifications')) || [];
        notifs.forEach(n => { if (n.userId === userId) n.read = true; });
        localStorage.setItem('km_notifications', JSON.stringify(notifs));
        this.syncDashboards();
    },

    deleteNotification(id) {
        let notifs = JSON.parse(localStorage.getItem('km_notifications')) || [];
        notifs = notifs.filter(n => n.id !== id);
        localStorage.setItem('km_notifications', JSON.stringify(notifs));
        this.syncDashboards();
    },

    getHighestBid(productId) {
        const bids = this.getData(this.keys.bids).filter(b => b.productId === productId);
        if (bids.length === 0) return null;
        return bids.reduce((prev, current) => (prev.amount > current.amount) ? prev : current);
    },

    checkTimers() {
        const products = this.getData(this.keys.products);
        let changed = false;
        const now = new Date();
        products.forEach(p => { if (p.status === 'Active' && new Date(p.endTime) <= now) { p.status = 'Closed'; changed = true; } });
        if (changed) this.saveData(this.keys.products, products);
    },

    syncDashboards() { window.dispatchEvent(new Event('km_sync')); },
    listenToChanges(callback) {
        window.addEventListener('km_sync', callback);
        window.addEventListener('storage', callback);
    }
};


State.init();


const addProduct = (p) => State.addProduct(p);
const placeBid = (b) => State.placeBid(b);
const acceptBid = (id) => State.acceptBid(id);
const updateLocalStorage = (key, data) => State.saveData(key, data);
const syncDashboards = () => State.syncDashboards();
const logout = () => State.logout();
window.logout = logout;

State.init();



