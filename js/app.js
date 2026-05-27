const State = {
  keys: {
    products: "products",
    bids: "bids",
    accepted: "accepted_products",
    history: "bid_history",
    vendors: "vendor_status",
    currentUser: "km_current_user",
    orders: "km_orders",
    interested: "km_interested_list",
    buyer_orders: "km_buyer_orders",
    cart: "km_cart",
  },

  init() {
    if (!localStorage.getItem(this.keys.products)) {
      const dummyProducts = [
        {
          id: 101,
          name: "Organic Tomatoes",
          category: "Vegetables",
          price: 40,
          minPrice: 35,
          maxPrice:45,
          quantity: 500,
          unit: "kg",
          status: "Active",
          farmerId: 1,
          farmerName: "Rajesh Kumar",
          location: "Nashik, MH",
          createdAt: new Date().toISOString(),
          endTime: new Date(Date.now() + 86400000).toISOString(),
          image:
            "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=300",
        },
        {
          id: 102,
          name: "Premium Basmati Rice",
          category: "Grains",
          price: 80,
          minPrice: 50,
          maxPrice:55,
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
          maxPrice:55,
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
          maxPrice:35,
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
          maxPrice:130,
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
          productId: 101,
          productName: "Organic Tomatoes",
          vendorId: 2,
          vendorName: "Suresh Raina",
          amount: 42,
          status: "pending",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          farmerId: 1,
        },
        {
          id: 202,
          productId: 101,
          productName: "Organic Tomatoes",
          vendorId: 3,
          vendorName: "GreenGrocer",
          amount: 45,
          status: "pending",
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          farmerId: 1,
        },
      ];
      localStorage.setItem(this.keys.bids, JSON.stringify(dummyBids));
    }
    if (!localStorage.getItem(this.keys.orders)) {
      const dummyOrders = [
        {
          id: 301,
          productId: 102,
          productName: "Premium Basmati Rice",
          vendorId: 2,
          vendorName: "Suresh Raina",
          amount: 78000,
          quantity: 1000,
          status: "pending",
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          farmerId: 1,
        },
      ];
      localStorage.setItem(this.keys.orders, JSON.stringify(dummyOrders));
    }
    if (!localStorage.getItem(this.keys.interested))
      localStorage.setItem(this.keys.interested, JSON.stringify([]));
    if (!localStorage.getItem(this.keys.accepted))
      localStorage.setItem(this.keys.accepted, JSON.stringify([]));
    if (!localStorage.getItem(this.keys.history))
      localStorage.setItem(this.keys.history, JSON.stringify([]));

    if (!localStorage.getItem(this.keys.buyer_orders)) {
      const dummyBuyerOrders = [
        {
          id: 501,
          buyerName: "Anita Rao",
          productName: "Organic Tomatoes",
          quantity: "50 kg",
          orderedDate: new Date().toISOString(),
          address: "Flat 402, Sunshine Apts, Mumbai",
          paymentStatus: "Paid",
          status: "Pending",
          vendorId: 2,
        },
        {
          id: 502,
          buyerName: "Ramesh Chen",
          productName: "Fresh Broccoli",
          quantity: "10 kg",
          orderedDate: new Date(Date.now() - 86400000).toISOString(),
          address: "12-A, Green Park, Pune",
          paymentStatus: "COD",
          status: "Approved",
          vendorId: 2,
        },
      ];
      localStorage.setItem(
        this.keys.buyer_orders,
        JSON.stringify(dummyBuyerOrders),
      );
    }

    if (!localStorage.getItem("km_profiles")) {
      const dummyProfiles = {
        1: {
          id: 1,
          name: "Rajesh Kumar",
          email: "rajesh@farmer.com",
          phone: "+91 98765 43210",
          location: "Nashik, Maharashtra",
          role: "farmer",
          image:
            "https://images.unsplash.com/photo-1595273670150-db0a3d39074f?auto=format&fit=crop&q=80&w=200",
        },
        2: {
          id: 2,
          name: "Suresh Raina",
          email: "suresh@vendor.com",
          phone: "+91 87654 32109",
          location: "Mumbai, Maharashtra",
          role: "vendor",
          image:
            "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&q=80&w=200",
        },
      };
      localStorage.setItem("km_profiles", JSON.stringify(dummyProfiles));
    }

    if (!localStorage.getItem("km_notifications")) {
      const dummyNotifs = [
        {
          id: 1,
          userId: 1,
          title: "New Bid Received",
          message: "You received a bid of ₹45 for Organic Tomatoes.",
          read: false,
          timestamp: new Date().toISOString(),
        },
        {
          id: 2,
          userId: 2,
          title: "Bid Accepted",
          message: "Your bid for Basmati Rice has been accepted!",
          read: false,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: 3,
          userId: 1,
          title: "Welcome!",
          message: "Welcome to Kissan Market, Rajesh!",
          read: true,
          timestamp: new Date(Date.now() - 86400000).toISOString(),
        },
      ];
      localStorage.setItem("km_notifications", JSON.stringify(dummyNotifs));
    }

    setInterval(() => this.checkTimers(), 1000);
  },

  getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  },
  saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    this.syncDashboards();
  },

  getProducts() {
    return this.getData(this.keys.products);
  },
  getBids() {
    return this.getData(this.keys.bids);
  },
  getOrders() {
    return this.getData(this.keys.orders);
  },
  getInterested() {
    return this.getData(this.keys.interested);
  },
  getNotifications(userId) {
    const all = JSON.parse(localStorage.getItem("km_notifications")) || [];
    return userId ? all.filter((n) => n.userId === userId) : all;
  },

  getBuyerOrders(vendorId) {
    const orders = this.getData(this.keys.buyer_orders);
    return vendorId ? orders.filter((o) => o.vendorId === vendorId) : orders;
  },

  getFarmerStats(farmerId) {
    const products = this.getProducts().filter((p) => p.farmerId === farmerId);
    const bids = this.getBids().filter((b) => b.farmerId === farmerId);
    const acceptedProducts = this.getData(this.keys.accepted).filter(
      (p) => p.farmerId === farmerId,
    );

    const totalSold = acceptedProducts.length;
    const revenue = acceptedProducts.reduce((sum, p) => sum + p.soldPrice, 0);
    const activeBids = bids.filter((b) => b.status === "pending").length;
    const monthlySales = acceptedProducts.filter((p) => {
      const date = new Date(p.timestamp || Date.now());
      return date.getMonth() === new Date().getMonth();
    }).length;

    return {
      totalSold,
      revenue,
      activeBids,
      monthlySales,
      totalProducts: products.length,
    };
  },

  getVendorStats(vendorId) {
    const bids = this.getBids().filter((b) => b.vendorId === vendorId);
    const myOrders = this.getOrders().filter((o) => o.vendorId === vendorId);
    const buyerOrders = this.getBuyerOrders(vendorId);

    const totalPurchases = myOrders.reduce((sum, o) => sum + o.amount, 0);
    const activeBids = bids.filter((b) => b.status === "pending").length;
    const approvedBuyerOrders = buyerOrders.filter(
      (o) => o.status === "Approved",
    ).length;
    const activeBuyerOrders = buyerOrders.filter(
      (o) => o.status === "Pending",
    ).length;

    return {
      totalPurchases,
      activeBids,
      approvedBuyerOrders,
      activeBuyerOrders,
      totalBids: bids.length,
    };
  },

  getBuyerStats(buyerId) {
    const orders = this.getData(this.keys.buyer_orders).filter(
      (o) => o.buyerId === buyerId,
    ); // Assuming buyerId exists in orders
    const cart = JSON.parse(localStorage.getItem("km_cart")) || [];

    const totalOrders = orders.length;
    const completedPurchases = orders.filter(
      (o) => o.status === "Approved",
    ).length;
    const cartItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const monthlyPurchases = orders.filter((o) => {
      const date = new Date(o.orderedDate);
      return date.getMonth() === new Date().getMonth();
    }).length;

    return {
      totalOrders,
      completedPurchases,
      cartItemsCount,
      monthlyPurchases,
    };
  },

  updateBuyerOrderStatus(orderId, status) {
    const orders = this.getData(this.keys.buyer_orders);
    const orderIndex = orders.findIndex((o) => o.id === orderId);
    if (orderIndex !== -1) {
      orders[orderIndex].status = status;
      this.saveData(this.keys.buyer_orders, orders);

      const user = this.getCurrentUser();
      this.addNotification(
        user.id,
        `Order Update`,
        `Order #${orderId} has been ${status === "Approved" ? "Approved Successfully" : "Rejected"}.`,
      );
    }
  },

  setCurrentUser(user) {
    localStorage.setItem(this.keys.currentUser, JSON.stringify(user));
  },
  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem(this.keys.currentUser));
    if (!user) return null;
    const profiles = JSON.parse(localStorage.getItem("km_profiles")) || {};
    return { ...user, ...(profiles[user.id] || {}) };
  },
  logout() {
    localStorage.clear();
    sessionStorage.clear();

    const path = window.location.pathname;
    let rootPath = "./";

    if (path.includes("/pages/")) {
      const partsAfterPages = path
        .split("/pages/")[1]
        .split("/")
        .filter((p) => p.length > 0);

      rootPath = "../".repeat(partsAfterPages.length + 1);
    } else if (path.includes("/buyer/")) {
      const partsAfterBuyer = path
        .split("/buyer/")[1]
        .split("/")
        .filter((p) => p.length > 0);
      rootPath = "../".repeat(partsAfterBuyer.length + 1);
    } else if (path.includes("/farmer/")) {
      const partsAfterFarmer = path
        .split("/farmer/")[1]
        .split("/")
        .filter((p) => p.length > 0);
      rootPath = "../".repeat(partsAfterFarmer.length + 1);
    } else if (path.includes("/vendor/")) {
      const partsAfterVendor = path
        .split("/vendor/")[1]
        .split("/")
        .filter((p) => p.length > 0);
      rootPath = "../".repeat(partsAfterVendor.length + 1);
    }

    window.location.href = rootPath + "index.html";
  },

  updateProfile(profileData) {
    const profiles = JSON.parse(localStorage.getItem("km_profiles")) || {};
    const user = this.getCurrentUser();
    if (!user) return;

    profiles[user.id] = { ...profiles[user.id], ...profileData };
    localStorage.setItem("km_profiles", JSON.stringify(profiles));
    this.syncDashboards();
  },

  addProduct(product) {
    const products = this.getData(this.keys.products);
    const newProduct = {
      ...product,
      id: Date.now(),
      status: "Active",
      createdAt: new Date().toISOString(),
    };
    products.push(newProduct);
    this.saveData(this.keys.products, products);
    return newProduct;
  },

  updateProduct(id, updatedData) {
    const products = this.getData(this.keys.products);
    const index = products.findIndex((p) => p.id === id);
    if (index > -1) {
      products[index] = { ...products[index], ...updatedData };
      this.saveData(this.keys.products, products);
    }
  },

  removeProduct(id) {
    let products = this.getProducts();

    products = products.filter((p) => p.id !== id);

    this.saveData(this.keys.products, products);

    this.addNotification(
      this.getCurrentUser()?.id || 1,
      "Product Removed",
      `Product removed successfully`,
    );
  },

  updateStock(id, newQty) {
    this.updateProduct(id, { quantity: newQty });
    this.addNotification(
      this.getCurrentUser().id,
      "Stock Updated",
      `Stock for product ID ${id} updated to ${newQty}.`,
    );
  },

  placeBid(bid) {
    const bids = this.getData(this.keys.bids);
    const history = this.getData(this.keys.history);
    const existingIndex = bids.findIndex(
      (b) => b.productId === bid.productId && b.vendorId === bid.vendorId,
    );
    const newBid = {
      ...bid,
      id: existingIndex > -1 ? bids[existingIndex].id : Date.now(),
      status: "pending",
      timestamp: new Date().toISOString(),
    };

    if (existingIndex > -1) bids[existingIndex] = newBid;
    else bids.push(newBid);

    history.push({ ...newBid, historyId: Date.now() });
    this.saveData(this.keys.bids, bids);
    this.saveData(this.keys.history, history);

    const product = this.getProducts().find((p) => p.id === bid.productId);
    if (product)
      this.addNotification(
        product.farmerId,
        "New Bid Received",
        `Vendor ${bid.vendorName} bid ₹${bid.amount} on ${product.name}`,
      );
    return newBid;
  },

  cancelBid(bidId) {
    let bids = this.getData(this.keys.bids);
    bids = bids.filter((b) => b.id !== bidId);
    this.saveData(this.keys.bids, bids);
  },

  counterOffer(bidId, amount) {
    const bids = this.getData(this.keys.bids);
    const bid = bids.find((b) => b.id === bidId);
    if (bid) {
      bid.status = "countered";
      bid.counterAmount = amount;
      this.saveData(this.keys.bids, bids);
      this.addNotification(
        bid.vendorId,
        "Counter Offer Received",
        `Farmer offered ₹${amount} for ${bid.productName}.`,
      );
    }
  },

  acceptBid(bidId) {
    const bids = this.getData(this.keys.bids);
    const products = this.getData(this.keys.products);
    const accepted = this.getData(this.keys.accepted);
    const bid = bids.find((b) => b.id === bidId);
    if (!bid) return;

    bid.status = "accepted";
    const productIndex = products.findIndex((p) => p.id === bid.productId);
    if (productIndex > -1) {
      products[productIndex].status = "Sold";
      accepted.push({
        ...products[productIndex],
        soldPrice: bid.amount,
        soldTo: bid.vendorName,
      });
    }

    bids.forEach((b) => {
      if (b.productId === bid.productId && b.id !== bidId)
        b.status = "rejected";
    });
    this.saveData(this.keys.bids, bids);
    this.saveData(this.keys.products, products);
    this.saveData(this.keys.accepted, accepted);
    this.addNotification(
      bid.vendorId,
      "Bid Accepted!",
      `Your bid for ${bid.productName} was accepted!`,
    );
  },

  rejectBid(bidId) {
    const bids = this.getData(this.keys.bids);
    const bid = bids.find((b) => b.id === bidId);
    if (bid) {
      bid.status = "rejected";
      this.saveData(this.keys.bids, bids);
      this.addNotification(
        bid.vendorId,
        "Bid Rejected",
        `Your bid for ${bid.productName} was rejected.`,
      );
    }
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
    const notifs = JSON.parse(localStorage.getItem("km_notifications")) || [];
    notifs.unshift({
      id: Date.now(),
      userId,
      title,
      message,
      read: false,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(
      "km_notifications",
      JSON.stringify(notifs.slice(0, 50)),
    );
    this.syncDashboards();
  },

  markNotificationsRead(userId) {
    let notifs = JSON.parse(localStorage.getItem("km_notifications")) || [];
    notifs.forEach((n) => {
      if (n.userId === userId) n.read = true;
    });
    localStorage.setItem("km_notifications", JSON.stringify(notifs));
    this.syncDashboards();
  },

  deleteNotification(id) {
    let notifs = JSON.parse(localStorage.getItem("km_notifications")) || [];
    notifs = notifs.filter((n) => n.id !== id);
    localStorage.setItem("km_notifications", JSON.stringify(notifs));
    this.syncDashboards();
  },

  getHighestBid(productId) {
    const bids = this.getData(this.keys.bids).filter(
      (b) => b.productId === productId,
    );
    if (bids.length === 0) return null;
    return bids.reduce((prev, current) =>
      prev.amount > current.amount ? prev : current,
    );
  },

  checkTimers() {
    const products = this.getData(this.keys.products);
    let changed = false;
    const now = new Date();
    products.forEach((p) => {
      if (p.status === "Active" && new Date(p.endTime) <= now) {
        p.status = "Closed";
        changed = true;
      }
    });
    if (changed) this.saveData(this.keys.products, products);
  },

  syncDashboards() {
    window.dispatchEvent(new Event("km_sync"));
  },
  listenToChanges(callback) {
    window.addEventListener("km_sync", callback);
    window.addEventListener("storage", callback);
  },
};

State.init();

const addProduct = (p) => State.addProduct(p);
const placeBid = (b) => State.placeBid(b);
const acceptBid = (id) => State.acceptBid(id);
const updateLocalStorage = (key, data) => State.saveData(key, data);
const syncDashboards = () => State.syncDashboards();
const logout = () => State.logout();
window.logout = logout;

window.removeProduct = (id) => State.removeProduct(id);

State.init();
