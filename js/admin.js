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

// Load from localStorage or use initData
let db = {
    farmers: JSON.parse(localStorage.getItem('km_farmers')) || initData.farmers,
    vendors: JSON.parse(localStorage.getItem('km_vendors')) || initData.vendors,
    products: JSON.parse(localStorage.getItem('km_products')) || initData.products,
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

        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }

        if (target === 'dashboard') animateCounters();
        if (target === 'analytics') initCharts(); // Re-render charts to fit view
    });
});

document.getElementById('menuToggle').addEventListener('click', () => {
    sidebar.classList.toggle('active');
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

function renderProducts() {
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = db.products.map((p, i) => `
        <tr>
            <td>${p.id}</td>
            <td><strong>${p.name}</strong></td>
            <td>${p.farmer}</td>
            <td>${p.category}</td>
            <td>${p.qty}</td>
            <td><span class="status-badge ${getStatusClass(p.pStatus)}">${p.pStatus}</span></td>
            <td class="action-btns">
                <button class="btn btn-primary" onclick="approveProduct(${i})"><i class="fa-solid fa-check"></i></button>
                <button class="btn btn-warning" onclick="flagProduct(${i})"><i class="fa-solid fa-flag"></i></button>
                <button class="btn btn-danger" onclick="removeProduct(${i})"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
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
    
    badge.textContent = db.notifications.length;
    badge.style.display = db.notifications.length > 0 ? 'flex' : 'none';

    if (db.notifications.length === 0) {
        list.innerHTML = `<div style="padding:15px; text-align:center; color:var(--text-muted)">No new notifications</div>`;
        return;
    }

    list.innerHTML = db.notifications.map(n => {
        let icon = 'fa-bell';
        if(n.type === 'alert') icon = 'fa-triangle-exclamation';
        if(n.type === 'warning') icon = 'fa-flag';
        
        return `
        <div class="notification-item">
            <i class="fa-solid ${icon}" style="color:var(--primary-green)"></i>
            <div class="notification-content">
                <p>${n.text}</p>
                <span>${n.time}</span>
            </div>
        </div>
    `}).join('');
}

// ==========================================
// 5. ACTIONS & LOGIC
// ==========================================

function verifyFarmer(idx) {
    db.farmers[idx].vStatus = 'Verified';
    db.farmers[idx].aStatus = 'Active';
    saveDB();
    renderFarmers();
    showToast(`Farmer ${db.farmers[idx].name} verified successfully.`);
}

function suspendFarmer(idx) {
    if(confirm(`Are you sure you want to suspend farmer ${db.farmers[idx].name}?`)) {
        db.farmers[idx].aStatus = 'Suspended';
        saveDB();
        renderFarmers();
        showToast('Farmer suspended.');
    }
}

function verifyVendor(idx) {
    db.vendors[idx].vStatus = 'Verified';
    saveDB();
    renderVendors();
    showToast(`Vendor ${db.vendors[idx].name} verified.`);
}

function restrictVendor(idx) {
    db.vendors[idx].vStatus = 'Restricted';
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
    document.getElementById('badgeTickets').textContent = pendingT;
    document.getElementById('badgeTickets').style.display = pendingT > 0 ? 'inline-block' : 'none';
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
});
