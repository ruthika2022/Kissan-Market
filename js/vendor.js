const UI = {
  
    toggleTheme() {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('km_theme', newTheme);
    },

    initTheme() {
        const savedTheme = localStorage.getItem('km_theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
    },

    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const hamburger = document.querySelector('.hamburger');
        const overlay = document.querySelector('.sidebar-overlay');
        if (sidebar) {
            sidebar.classList.toggle('active');
            const isActive = sidebar.classList.contains('active');
            if (overlay) {
                if (isActive) {
                    overlay.classList.add('active');
                } else {
                    overlay.classList.remove('active');
                }
            }
            if (hamburger) {
                if (isActive) {
                    hamburger.innerText = '✖';
                } else {
                    hamburger.innerText = '☰';
                }
            }
        }
    },
    


    setLanguage(lang) {
        localStorage.setItem('km_lang', lang);

        alert(`Language changed to: ${lang}. This would refresh content in a full implementation.`);
    },


    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#388e3c' : '#d32f2f'};
            color: white;
            border-radius: 50px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            z-index: 10000;
            font-weight: 600;
        `;
        toast.className = `fade-in`;
        toast.innerText = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = '0.5s';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    },

    updateNotificationBadges() {
        const user = State.getCurrentUser();
        if (!user) return;
        
        const notifications = State.getNotifications(user.id);
        const unreadCount = notifications.filter(n => !n.read).length;
        
        const badges = document.querySelectorAll('.notif-badge');
        badges.forEach(badge => {
            badge.innerText = unreadCount;
            badge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
        });
        
  
        const sidebarNotifLink = document.querySelector('a[href*="notifications.html"]');
        if (sidebarNotifLink) {
            let badgeSpan = sidebarNotifLink.querySelector('.notif-count');
            if (unreadCount > 0) {
                if (!badgeSpan) {
                    badgeSpan = document.createElement('span');
                    badgeSpan.className = 'notif-count';
                    badgeSpan.style.cssText = 'background: #d32f2f; color: white; border-radius: 20px; padding: 2px 8px; font-size: 0.7rem; margin-left: auto; font-weight: 700;';
                    sidebarNotifLink.appendChild(badgeSpan);
                }
                badgeSpan.innerText = unreadCount;
            } else if (badgeSpan) {
                badgeSpan.remove();
            }
        }
    },

    formatTimeLeft(endTime) {
        const diff = new Date(endTime) - new Date();
        if (diff <= 0) return "Closed";
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        if (hours > 24) return `${Math.floor(hours/24)}d ${hours%24}h`;
        return `${hours}h ${minutes}m`;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    UI.initTheme();
    UI.updateNotificationBadges();
    
    // Dynamically insert backdrop overlay if missing
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }

    // Dynamically insert hamburger menu button into header if missing
    const headerLeft = document.querySelector('.header-left');
    if (headerLeft && !headerLeft.querySelector('.hamburger')) {
        const hamburgerBtn = document.createElement('button');
        hamburgerBtn.className = 'hamburger';
        hamburgerBtn.type = 'button';
        hamburgerBtn.innerText = '☰';
        hamburgerBtn.style.display = 'none'; // Controlled by media queries
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            UI.toggleSidebar();
        });
        headerLeft.insertBefore(hamburgerBtn, headerLeft.firstChild);
    }

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', UI.toggleTheme);

    const langSelect = document.getElementById('lang-select');
    if (langSelect) langSelect.addEventListener('change', (e) => UI.setLanguage(e.target.value));


    State.listenToChanges(() => {
        UI.updateNotificationBadges();
    });

    // Close sidebar on clicking backdrop overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            const hamburger = document.querySelector('.hamburger');
            if (sidebar && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                if (hamburger) {
                    hamburger.innerText = '☰';
                }
            }
        });
    }

    // Fallback document listener for click-outside just in case
    document.addEventListener('click', (e) => {
        const sidebar = document.querySelector('.sidebar');
        const hamburger = document.querySelector('.hamburger');
        if (window.innerWidth <= 1024 && sidebar && sidebar.classList.contains('active')) {
            if (!sidebar.contains(e.target) && (!hamburger || !hamburger.contains(e.target)) && (!overlay || !overlay.contains(e.target))) {
                sidebar.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
                if (hamburger) hamburger.innerText = '☰';
            }
        }
    });
});
