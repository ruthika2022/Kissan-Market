// ==========================================
// 1. JSON DATA INITIALIZATION
// ==========================================
const initData = {
    farmers: [
        { id: "FRM101", name: "Ravi Kumar", location: "Andhra Pradesh", crop: "Rice", vStatus: "Verified", aStatus: "Active" },
        { id: "FRM102", name: "Anita Devi", location: "Uttar Pradesh", crop: "Sugarcane", vStatus: "Pending", aStatus: "Active" },
        { id: "FRM103", name: "Gurpreet Singh", location: "Punjab", crop: "Wheat", vStatus: "Verified", aStatus: "Suspended" }
    ],
    vendors: [
        { id: "VND201", name: "AgriCorp Ltd.", type: "Wholesaler", activity: "High", vStatus: "Verified" },
        { id: "VND202", name: "Fresh Foods", type: "Retailer", activity: "Medium", vStatus: "Pending" },
        { id: "VND203", name: "Organic Roots", type: "Distributor", activity: "Low", vStatus: "Restricted" }
    ],
    products: [
        { id: "PRD301", name: "Premium Basmati Rice", farmer: "Ravi Kumar", category: "Grains", qty: "500 kg", bidStatus: "Active", pStatus: "Approved" },
        { id: "PRD302", name: "Raw Cotton", farmer: "Manoj Patel", category: "Fibers", qty: "200 kg", bidStatus: "Closed", pStatus: "Flagged" },
        { id: "PRD303", name: "Organic Tomatoes", farmer: "Anita Devi", category: "Vegetables", qty: "50 kg", bidStatus: "Active", pStatus: "Pending" }
    ],
    inventory: [
        { name: "Premium Basmati Rice", warehouse: "WH-South", qty: 1500, status: "Available" },
        { name: "Organic Tomatoes", warehouse: "WH-North", qty: 50, status: "Low Stock" },
        { name: "Raw Cotton", warehouse: "WH-West", qty: 5, status: "Critical" }
    ],
    tickets: [
        { id: "TCK401", user: "Ravi Kumar", role: "Farmer", issue: "Payment delayed for PRD301", priority: "High", status: "Pending" },
        { id: "TCK402", user: "Fresh Foods", role: "Vendor", issue: "Unable to place bid", priority: "Medium", status: "Resolved" }
    ],
    complaints: [
        { id: "CMP501", user: "AgriCorp Ltd.", type: "Quality Issue", desc: "Received inferior quality wheat compared to sample.", status: "Under Review" },
        { id: "CMP502", user: "Gurpreet Singh", type: "Platform Bug", desc: "App crashes when uploading crop photos.", status: "Pending" }
    ],
    notifications: [
        { id: "N1", text: "New support ticket from Ravi Kumar", time: "10 mins ago", type: "ticket" },
        { id: "N2", text: "Low inventory alert: Organic Tomatoes", time: "1 hour ago", type: "alert" },
        { id: "N3", text: "Product PRD302 has been flagged", time: "2 hours ago", type: "warning" }
    ]
};

function loadCombinedFarmers() {
    const storedFarmers = JSON.parse(localStorage.getItem('km_farmers')) || initData.farmers;
    const profiles = JSON.parse(localStorage.getItem('km_profiles')) || {};
    const profileFarmers = Object.values(profiles).filter(p => p.role === 'farmer');
    
    const merged = [...storedFarmers];
    profileFarmers.forEach(pf => {
        const idStr = "FRM" + pf.id;
        if (!merged.some(f => f.id === idStr || f.id === pf.id)) {
            merged.push({
                id: idStr,
                name: pf.name,
                location: pf.location || 'Unknown',
                crop: 'General Crops',
                vStatus: 'Verified',
                aStatus: 'Active',
                isReal: true,
                realId: pf.id
            });
        }
    });
    return merged;
}

function loadCombinedVendors() {
    const storedVendors = JSON.parse(localStorage.getItem('km_vendors')) || initData.vendors;
    const profiles = JSON.parse(localStorage.getItem('km_profiles')) || {};
    const profileVendors = Object.values(profiles).filter(p => p.role === 'vendor');
    
    const merged = [...storedVendors];
    profileVendors.forEach(pv => {
        const idStr = "VND" + pv.id;
        if (!merged.some(v => v.id === idStr || v.id === pv.id)) {
            merged.push({
                id: idStr,
                name: pv.name,
                type: 'Wholesaler',
                activity: 'Medium',
                vStatus: 'Verified',
                isReal: true,
                realId: pv.id
            });
        }
    });
    return merged;
}

function loadCombinedProducts() {
    if (typeof State === 'undefined') return initData.products;
    const realProducts = State.getProducts();
    return realProducts.map(p => ({
        id: p.id,
        name: p.name,
        farmer: p.farmerName || 'Farmer User',
        category: p.category,
        qty: p.quantity + " " + p.unit,
        bidStatus: p.status,
        pStatus: p.pStatus || 'Approved',
        isReal: true,
        realId: p.id
    }));
}

function updateRealProfileStatus(realId, vStatus, aStatus) {
    const profiles = JSON.parse(localStorage.getItem('km_profiles')) || {};
    if (profiles[realId]) {
        if (vStatus) profiles[realId].vStatus = vStatus;
        if (aStatus) profiles[realId].aStatus = aStatus;
        localStorage.setItem('km_profiles', JSON.stringify(profiles));
    }
}

// Load from localStorage or use initData
let db = {
    farmers: loadCombinedFarmers(),
    vendors: loadCombinedVendors(),
    products: loadCombinedProducts(),
    inventory: JSON.parse(localStorage.getItem('km_inventory')) || initData.inventory,
    tickets: JSON.parse(localStorage.getItem('km_tickets')) || initData.tickets,
    complaints: JSON.parse(localStorage.getItem('km_complaints')) || initData.complaints,
    notifications: JSON.parse(localStorage.getItem('km_notifications')) || initData.notifications,
};

function saveDB() {
    localStorage.setItem('km_farmers', JSON.stringify(db.farmers));
    localStorage.setItem('km_vendors', JSON.stringify(db.vendors));
    localStorage.setItem('km_products', JSON.stringify(db.products));
    localStorage.setItem('km_inventory', JSON.stringify(db.inventory));
    localStorage.setItem('km_tickets', JSON.stringify(db.tickets));
    localStorage.setItem('km_complaints', JSON.stringify(db.complaints));
    localStorage.setItem('km_notifications', JSON.stringify(db.notifications));
}

// ==========================================
// 2. ROUTING & NAVIGATION
// ==========================================
const menuItems = document.querySelectorAll('.menu-item');
const sections = document.querySelectorAll('.section');
const pageTitle = document.getElementById('pageTitle');
const sidebar = document.getElementById('sidebar');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        if (item.hasAttribute('onclick')) return;

        menuItems.forEach(i => i.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));

        item.classList.add('active');
        const target = item.getAttribute('data-target');
        document.getElementById(target).classList.add('active');

        pageTitle.textContent = item.querySelector('span').textContent;

        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
            const overlay = document.querySelector('.sidebar-overlay');
            if (overlay) overlay.classList.remove('active');
            if (menuIcon) {
                menuIcon.className = 'fa-solid fa-bars';
            }
        }

        if (target === 'dashboard') animateCounters();
        if (target === 'analytics') initCharts(); // Re-render charts to fit view
    });
});

const menuToggleBtn = document.getElementById('menuToggle');
const menuIcon = menuToggleBtn ? menuToggleBtn.querySelector('i') : null;

if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('active');
        const isActive = sidebar.classList.contains('active');
        
        let overlay = document.querySelector('.sidebar-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);
        }
        
        if (isActive) {
            overlay.classList.add('active');
        } else {
            overlay.classList.remove('active');
        }

        if (menuIcon) {
            if (isActive) {
                menuIcon.className = 'fa-solid fa-xmark';
            } else {
                menuIcon.className = 'fa-solid fa-bars';
            }
        }
    });
}

// Add DOMContentLoaded overlay creation for admin layout
document.addEventListener('DOMContentLoaded', () => {
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }
    overlay.addEventListener('click', () => {
        if (sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            if (menuIcon) {
                menuIcon.className = 'fa-solid fa-bars';
            }
        }
    });
});

document.addEventListener('click', (e) => {
    const overlay = document.querySelector('.sidebar-overlay');
    if (window.innerWidth <= 1024 && sidebar) {
        if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && (!menuToggleBtn || !menuToggleBtn.contains(e.target)) && (!overlay || !overlay.contains(e.target))) {
            sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            if (menuIcon) {
                menuIcon.className = 'fa-solid fa-bars';
            }
        }
    }
});


// ==========================================
// 3. CLOCK & THEME
// ==========================================
// function updateClock() {
//     const now = new Date();
//     const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
//     document.getElementById('realtimeClock').textContent = now.toLocaleDateString('en-US', options);
// }
// setInterval(updateClock, 1000);
// updateClock();

// const darkModeToggle = document.getElementById('darkModeToggle');
// const themeToggleTop = document.getElementById('themeToggleTop');

function setTheme(isDark) {
    if (isDark) {
        document.body.setAttribute('data-theme', 'dark');
        darkModeToggle.checked = true;
        themeToggleTop.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.removeAttribute('data-theme');
        darkModeToggle.checked = false;
        themeToggleTop.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
    localStorage.setItem('km_theme', isDark ? 'dark' : 'light');
    initCharts();
}

const savedTheme = localStorage.getItem('km_theme');
if (savedTheme === 'dark') setTheme(true);

darkModeToggle.addEventListener('change', (e) => setTheme(e.target.checked));
themeToggleTop.addEventListener('click', () => {
    setTheme(!document.body.hasAttribute('data-theme'));
});

// ==========================================
// 4. RENDERING FUNCTIONS
// ==========================================
function getStatusClass(status) {
    status = status.toLowerCase();
    if (status.includes('verified') || status.includes('active') || status.includes('approved') || status.includes('available') || status.includes('resolved')) return 'status-active';
    if (status.includes('pending') || status.includes('review') || status.includes('low')) return 'status-pending';
    if (status.includes('suspended') || status.includes('restricted') || status.includes('rejected') || status.includes('closed')) return 'status-inactive';
    if (status.includes('critical') || status.includes('flagged') || status.includes('removed')) return 'status-critical';
    return 'status-inactive';
}

function renderFarmers() {
    const tbody = document.getElementById('farmersTableBody');
    tbody.innerHTML = db.farmers.map((f, i) => `
        <tr>
            <td>${f.id}</td>
            <td><strong>${f.name}</strong></td>
            <td>${f.location}</td>
            <td>${f.crop}</td>
            <td><span class="status-badge ${getStatusClass(f.vStatus)}">${f.vStatus}</span></td>
            <td><span class="status-badge ${getStatusClass(f.aStatus)}">${f.aStatus}</span></td>
            <td class="action-btns">
                <button class="btn btn-primary" onclick="verifyFarmer(${i})"><i class="fa-solid fa-check"></i></button>
                <button class="btn btn-danger" onclick="suspendFarmer(${i})"><i class="fa-solid fa-ban"></i></button>
            </td>
        </tr>
    `).join('');
    updateCounters();
}

function renderVendors() {
    const tbody = document.getElementById('vendorsTableBody');
    tbody.innerHTML = db.vendors.map((v, i) => `
        <tr>
            <td>${v.id}</td>
            <td><strong>${v.name}</strong></td>
            <td>${v.type}</td>
            <td>${v.activity}</td>
            <td><span class="status-badge ${getStatusClass(v.vStatus)}">${v.vStatus}</span></td>
            <td class="action-btns">
                <button class="btn btn-primary" onclick="verifyVendor(${i})"><i class="fa-solid fa-check"></i></button>
                <button class="btn btn-warning" onclick="restrictVendor(${i})"><i class="fa-solid fa-lock"></i></button>
            </td>
        </tr>
    `).join('');
    updateCounters();
}

function toggleProductDetails(productId) {
    const detailsRow = document.getElementById(`details-${productId}`);
    if (detailsRow) {
        detailsRow.style.display = detailsRow.style.display === 'none' ? 'table-row' : 'none';
    }
}

function adminSelectBid(bidId) {
    if (confirm('Are you sure you want to select this bid? This will approve it, notify the farmer, and reject all other bids.')) {
        State.adminSelectBid(bidId);
        showToast('Bid approved and sent to farmer.');
        db.products = loadCombinedProducts();
        renderProducts();
    }
}

function adminRejectBid(bidId) {
    if (confirm('Are you sure you want to reject this bid?')) {
        State.rejectBid(bidId);
        showToast('Bid rejected.');
        db.products = loadCombinedProducts();
        renderProducts();
    }
}

function removeAdminProduct(productId) {
    if (confirm('Are you sure you want to remove this product? This will permanently delete it.')) {
        State.removeProduct(productId);
        showToast('Product removed.');
        db.products = loadCombinedProducts();
        renderProducts();
    }
}

function renderProducts() {
    const tbody = document.getElementById('productsTableBody');
    if (typeof State === 'undefined') return;
    const realProducts = State.getProducts();
    const allBids = State.getBids();
    
    tbody.innerHTML = realProducts.map((p, i) => {
        const productBids = allBids.filter(b => b.productId === p.id);
        const farmerProfile = (JSON.parse(localStorage.getItem('km_profiles')) || {})[p.farmerId] || {
            name: p.farmerName || 'Unknown Farmer',
            email: 'N/A',
            phone: 'N/A',
            location: p.location || 'Unknown'
        };
        
        let statusLabel = p.status;
        let rowClass = "";
        if (p.status === 'Selected Bid Review') {
            statusLabel = 'Awaiting Farmer';
            rowClass = "row-reviewing";
        } else if (p.status === 'Deal Active') {
            statusLabel = 'Deal Active';
            rowClass = "row-deal-active";
        }
        
        return `
        <tr class="product-row ${rowClass}" onclick="toggleProductDetails(${p.id})">
            <td>${p.id}</td>
            <td><strong>${p.name}</strong></td>
            <td>${p.farmerName || 'Farmer User'}</td>
            <td>${p.category}</td>
            <td>${p.quantity} ${p.unit}</td>
            <td><span class="status-badge ${getStatusClass(p.status)}">${statusLabel}</span></td>
            <td class="action-btns" onclick="event.stopPropagation()">
                <button class="btn btn-primary btn-sm" onclick="toggleProductDetails(${p.id})">
                    <i class="fa-solid fa-eye"></i> View Bids (${productBids.length})
                </button>
                <button class="btn btn-danger btn-sm" onclick="removeAdminProduct(${p.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        <tr class="details-row" id="details-${p.id}" style="display: none; background: var(--secondary-color);">
            <td colspan="7">
                <div class="product-detail-panel" style="padding: 1.5rem; border-left: 4px solid var(--primary-green);">
                    <div style="display: flex; gap: 2rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 200px;">
                            <h4 style="color: var(--primary-green); margin-bottom: 0.5rem;"><i class="fa-solid fa-circle-info"></i> Product Details</h4>
                            <p><strong>Min Price:</strong> ₹${p.minPrice}</p>
                            <p><strong>Max Price:</strong> ₹${p.maxPrice || Math.round(p.minPrice * 1.3)}</p>
                            <p><strong>Location:</strong> ${p.location}</p>
                            <p><strong>End Time:</strong> ${new Date(p.endTime).toLocaleString()}</p>
                        </div>
                        <div style="flex: 1; min-width: 200px;">
                            <h4 style="color: var(--primary-green); margin-bottom: 0.5rem;"><i class="fa-solid fa-user"></i> Farmer Details</h4>
                            <p><strong>Name:</strong> ${farmerProfile.name}</p>
                            <p><strong>Phone:</strong> ${farmerProfile.phone}</p>
                            <p><strong>Email:</strong> ${farmerProfile.email}</p>
                            <p><strong>Location:</strong> ${farmerProfile.location}</p>
                        </div>
                    </div>
                    
                    <div class="bids-section">
                        <h4 style="color: var(--primary-green); margin-bottom: 0.8rem; border-bottom: 1px solid #ddd; padding-bottom: 0.3rem;"><i class="fa-solid fa-gavel"></i> Vendor Bids (${productBids.length})</h4>
                        ${productBids.length === 0 ? `
                            <p style="color: var(--text-muted); font-style: italic;">No bids placed on this product yet.</p>
                        ` : `
                            <div class="table-container" style="box-shadow: none; border: 1px solid #eee; margin: 0;">
                                <table style="width: 100%; border-collapse: collapse;">
                                    <thead>
                                        <tr style="background: #fafafa; border-bottom: 1px solid #eee;">
                                            <th style="padding: 0.8rem;">Vendor</th>
                                            <th style="padding: 0.8rem;">Bid Amount</th>
                                            <th style="padding: 0.8rem;">Bid Qty</th>
                                            <th style="padding: 0.8rem;">Status</th>
                                            <th style="padding: 0.8rem;">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${productBids.sort((a,b) => b.amount - a.amount).map(bid => {
                                            let actionHtml = '';
                                            if (bid.status === 'Pending Admin Review' && p.status === 'Active') {
                                                actionHtml = `
                                                    <button class="btn btn-primary btn-xs" style="padding: 0.25rem 0.5rem; font-size: 0.7rem;" onclick="adminSelectBid(${bid.id})">Accept</button>
                                                    <button class="btn btn-danger btn-xs" style="padding: 0.25rem 0.5rem; font-size: 0.7rem; background:#dc2626;" onclick="adminRejectBid(${bid.id})">Decline</button>
                                                `;
                                            } else {
                                                const statusColor = bid.status === 'Accepted By Farmer' ? '#16a34a' : 
                                                                   (bid.status === 'Selected By Admin' ? '#2563eb' : 
                                                                   (bid.status === 'Rejected By Admin' || bid.status === 'Declined By Farmer' ? '#dc2626' : '#4b5563'));
                                                actionHtml = `<span style="font-size:0.75rem; font-weight:800; color:${statusColor}; text-transform:uppercase;">${bid.status}</span>`;
                                            }
                                            return `
                                                <tr style="border-bottom: 1px solid #eee;">
                                                    <td style="padding: 0.8rem;"><strong>${bid.vendorName}</strong></td>
                                                    <td style="padding: 0.8rem;">₹${bid.amount} / kg</td>
                                                    <td style="padding: 0.8rem;">${bid.quantity} ${p.unit}</td>
                                                    <td style="padding: 0.8rem;"><span class="status-badge ${getStatusClass(bid.status)}">${bid.status}</span></td>
                                                    <td class="action-btns" style="padding: 0.8rem;">${actionHtml}</td>
                                                </tr>
                                            `;
                                        }).join('')}
                                    </tbody>
                                </table>
                            </div>
                        `}
                    </div>
                </div>
            </td>
        </tr>
        `;
    }).join('');
    updateCounters();
}

function renderInventory() {
    const tbody = document.getElementById('inventoryTableBody');
    tbody.innerHTML = db.inventory.map((inv, i) => `
        <tr>
            <td><strong>${inv.name}</strong></td>
            <td>${inv.warehouse}</td>
            <td>${inv.qty}</td>
            <td><span class="status-badge ${getStatusClass(inv.status)}">${inv.status}</span></td>
            <td class="action-btns">
                <button class="btn btn-brown" onclick="alertInventory(${i})"><i class="fa-solid fa-bell"></i> Alert</button>
            </td>
        </tr>
    `).join('');
}

function renderTickets() {
    const container = document.getElementById('ticketsContainer');
    container.innerHTML = db.tickets.map((t, i) => `
        <div class="info-card">
            <div class="info-card-header">
                <div class="info-user">
                    <i class="fa-solid ${t.role === 'Farmer' ? 'fa-tractor' : 'fa-store'}"></i>
                    <span>${t.user} (${t.id})</span>
                </div>
                <span class="status-badge ${getStatusClass(t.status)}">${t.status}</span>
            </div>
            <div style="font-size:12px; margin-bottom:10px;">Priority: <strong>${t.priority}</strong></div>
            <p class="info-desc">"${t.issue}"</p>
            <div class="action-btns">
                <button class="btn btn-primary" style="flex:1;" onclick="replyTicket(${i})">Reply</button>
                <button class="btn btn-brown" style="flex:1;" onclick="resolveTicket(${i})">Resolve</button>
            </div>
        </div>
    `).join('');
}

function renderComplaints() {
    const container = document.getElementById('complaintsContainer');
    container.innerHTML = db.complaints.map((c, i) => `
        <div class="info-card">
            <div class="info-card-header">
                <div class="info-user">
                    <i class="fa-solid fa-user-shield"></i>
                    <span>${c.user}</span>
                </div>
                <span class="status-badge ${getStatusClass(c.status)}">${c.status}</span>
            </div>
            <div style="font-size:12px; margin-bottom:10px; color:var(--primary-brown)">Type: ${c.type}</div>
            <p class="info-desc">"${c.desc}"</p>
            <div class="action-btns">
                <button class="btn btn-primary" style="flex:1;" onclick="resolveComplaint(${i})">Resolve</button>
                <button class="btn btn-danger" style="flex:1;" onclick="rejectComplaint(${i})">Reject</button>
            </div>
        </div>
    `).join('');
    updateCounters();
}

function renderNotifications() {
    const list = document.getElementById('notificationsList');
    const badge = document.getElementById('notifBadge');
    
    const allNotifs = JSON.parse(localStorage.getItem('km_notifications')) || [];
    const adminNotifs = allNotifs.filter(n => n.userId === 0);
    
    badge.textContent = adminNotifs.length;
    badge.style.display = adminNotifs.length > 0 ? 'flex' : 'none';

    if (adminNotifs.length === 0) {
        list.innerHTML = `<div style="padding:15px; text-align:center; color:var(--text-muted)">No new notifications</div>`;
        return;
    }

    list.innerHTML = adminNotifs.map(n => {
        let icon = 'fa-bell';
        if (n.title.includes('Rejected') || n.title.includes('Declined')) icon = 'fa-triangle-exclamation';
        else if (n.title.includes('Accepted') || n.title.includes('Approved')) icon = 'fa-circle-check';
        
        const timeStr = formatTimeAgo(new Date(n.timestamp));
        
        return `
        <div class="notification-item">
            <i class="fa-solid ${icon}" style="color:var(--primary-green)"></i>
            <div class="notification-content">
                <p><strong>${n.title}</strong>: ${n.message}</p>
                <span>${timeStr}</span>
            </div>
        </div>
    `}).join('');
}

function formatTimeAgo(date) {
    if (isNaN(date.getTime())) return 'some time ago';
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + " years ago";
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + " months ago";
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + " days ago";
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + " hours ago";
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + " mins ago";
    return "just now";
}

// ==========================================
// 5. ACTIONS & LOGIC
// ==========================================

function verifyFarmer(idx) {
    db.farmers[idx].vStatus = 'Verified';
    db.farmers[idx].aStatus = 'Active';
    if (db.farmers[idx].isReal) {
        updateRealProfileStatus(db.farmers[idx].realId, 'Verified', 'Active');
    }
    saveDB();
    renderFarmers();
    showToast(`Farmer ${db.farmers[idx].name} verified successfully.`);
}

function suspendFarmer(idx) {
    if(confirm(`Are you sure you want to suspend farmer ${db.farmers[idx].name}?`)) {
        db.farmers[idx].aStatus = 'Suspended';
        if (db.farmers[idx].isReal) {
            updateRealProfileStatus(db.farmers[idx].realId, null, 'Suspended');
        }
        saveDB();
        renderFarmers();
        showToast('Farmer suspended.');
    }
}

function verifyVendor(idx) {
    db.vendors[idx].vStatus = 'Verified';
    if (db.vendors[idx].isReal) {
        updateRealProfileStatus(db.vendors[idx].realId, 'Verified', null);
    }
    saveDB();
    renderVendors();
    showToast(`Vendor ${db.vendors[idx].name} verified.`);
}

function restrictVendor(idx) {
    db.vendors[idx].vStatus = 'Restricted';
    if (db.vendors[idx].isReal) {
        updateRealProfileStatus(db.vendors[idx].realId, 'Restricted', null);
    }
    saveDB();
    renderVendors();
    showToast('Vendor restricted.');
}

function approveProduct(idx) {
    db.products[idx].pStatus = 'Approved';
    saveDB();
    renderProducts();
    showToast(`Product ${db.products[idx].name} approved.`);
}

function flagProduct(idx) {
    db.products[idx].pStatus = 'Flagged';
    saveDB();
    renderProducts();
    showToast('Product flagged for review.');
}

function removeProduct(idx) {
    if(confirm('Warning: This will permanently remove the product from the marketplace. Proceed?')) {
        db.products.splice(idx, 1);
        saveDB();
        renderProducts();
        showToast('Product removed.');
    }
}

function alertInventory(idx) {
    showToast(`Alert sent to ${db.inventory[idx].warehouse} for ${db.inventory[idx].name}`);
}

function replyTicket(idx) {
    const reply = prompt(`Enter reply for ${db.tickets[idx].user}:`);
    if(reply) {
        showToast('Reply sent successfully.');
    }
}

function resolveTicket(idx) {
    db.tickets[idx].status = 'Resolved';
    saveDB();
    renderTickets();
    showToast('Support ticket marked as resolved.');
}

function resolveComplaint(idx) {
    db.complaints[idx].status = 'Resolved';
    saveDB();
    renderComplaints();
    showToast('Complaint resolved.');
}

function rejectComplaint(idx) {
    db.complaints[idx].status = 'Rejected';
    saveDB();
    renderComplaints();
    showToast('Complaint rejected.');
}

function clearNotifications() {
    db.notifications = [];
    saveDB();
    renderNotifications();
}

document.getElementById('notifIcon').addEventListener('click', () => {
    document.getElementById('notifDropdown').classList.toggle('active');
});

// Close dropdown when clicking outside
window.addEventListener('click', function(e) {
    if (!document.getElementById('notifIcon').contains(e.target) && !document.getElementById('notifDropdown').contains(e.target)) {
        document.getElementById('notifDropdown').classList.remove('active');
    }
});

// ==========================================
// 6. DASHBOARD COUNTERS & UTILS
// ==========================================
function updateCounters() {
    document.getElementById('countFarmers').setAttribute('data-target', db.farmers.length);
    document.getElementById('countVendors').setAttribute('data-target', db.vendors.length);
    document.getElementById('countProducts').setAttribute('data-target', db.products.filter(p => p.pStatus === 'Approved').length);
    document.getElementById('countComplaints').setAttribute('data-target', db.complaints.filter(c => c.status !== 'Resolved' && c.status !== 'Rejected').length);
    
    // Update Sidebar Badges
    const pendingT = db.tickets.filter(t => t.status === 'Pending').length;
    // document.getElementById('badgeTickets').textContent = pendingT;
    // document.getElementById('badgeTickets').style.display = pendingT > 0 ? 'inline-block' : 'none';
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / 200; // Speed

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        counter.innerText = '0';
        updateCount();
    });
}

function showToast(msg) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${msg}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Settings
function saveSettings() {
    const name = document.getElementById('settingAdminName').value;
    localStorage.setItem('km_admin_name', name);
    document.getElementById('displayAdminName').textContent = name;
    showToast('Settings saved successfully!');
}

function resetData() {
    if(confirm('This will restore all data to default and reload the page. Proceed?')) {
        localStorage.clear();
        location.reload();
    }
}

const savedName = localStorage.getItem('km_admin_name');
if (savedName) {
    document.getElementById('settingAdminName').value = savedName;
    document.getElementById('displayAdminName').textContent = savedName;
}

// ==========================================
// 7. CHART.JS
// ==========================================
let charts = [];
        
function initCharts() {
    charts.forEach(c => c.destroy());
    charts = [];

    const isDark = document.body.hasAttribute('data-theme');
    const textColor = isDark ? '#f9fafb' : '#1f2937';
    const gridColor = isDark ? '#374151' : '#e5e7eb';

    Chart.defaults.color = textColor;
    Chart.defaults.font.family = "'Outfit', sans-serif";

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { grid: { color: gridColor } },
            y: { grid: { color: gridColor } }
        },
        plugins: { legend: { labels: { color: textColor } } }
    };

    const ctx1 = document.getElementById('growthChart')?.getContext('2d');
    if(ctx1) {
        charts.push(new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    { label: 'New Farmers', data: [12, 19, 15, 22, 18, 25], borderColor: '#10b981', tension: 0.4 },
                    { label: 'New Vendors', data: [5, 8, 10, 15, 12, 18], borderColor: '#b45309', tension: 0.4 }
                ]
            },
            options: options
        }));
    }

    const ctx2 = document.getElementById('ticketsChart')?.getContext('2d');
    if(ctx2) {
        charts.push(new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ['Quality', 'Payment', 'Platform Bug', 'Delivery'],
                datasets: [{
                    label: 'Issues Reported',
                    data: [15, 25, 10, 5],
                    backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444']
                }]
            },
            options: options
        }));
    }
}

// Init
window.addEventListener('DOMContentLoaded', () => {
    renderFarmers();
    renderVendors();
    renderProducts();
    renderInventory();
    renderTickets();
    renderComplaints();
    renderNotifications();
    animateCounters();
    initCharts();

    if (typeof State !== 'undefined') {
        State.listenToChanges(() => {
            db.farmers = loadCombinedFarmers();
            db.vendors = loadCombinedVendors();
            db.products = loadCombinedProducts();
            renderFarmers();
            renderVendors();
            renderProducts();
            renderNotifications();
            updateCounters();
        });
    }
});
