/**
 * PlatePilot - Master Application Controller
 * Handles global navigation, themes, notifications, Lucide icons, search, and reminders.
 */

const App = {
  init() {
    this.initTheme();
    this.initLucideIcons();
    this.initSidebarNavigation();
    this.renderHeaderAndProfile();
    this.initMealReminders();
    this.initGlobalSearch();

    // Event listener for theme changes
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Event listener for reset demo
    const resetBtn = document.getElementById('btn-reset-demo');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.handleResetDemo());
    }

    // Close modals on backdrop click or escape key
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal(modal.id);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.active').forEach(modal => {
          this.closeModal(modal.id);
        });
      }
    });
  },

  /* ==================== THEME CONTROLLER ==================== */
  initTheme() {
    const savedTheme = localStorage.getItem('platepilot_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcon(savedTheme);
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('platepilot_theme', next);
    this.updateThemeIcon(next);
    this.showToast(`Switched to ${next} mode`, 'info');

    if (window.AppCharts) {
      window.AppCharts.refreshAll();
    }
  },

  updateThemeIcon(theme) {
    const iconWrapper = document.getElementById('theme-toggle-icon');
    if (!iconWrapper) return;
    if (theme === 'dark') {
      iconWrapper.innerHTML = '<i data-lucide="sun"></i>';
    } else {
      iconWrapper.innerHTML = '<i data-lucide="moon"></i>';
    }
    this.initLucideIcons();
  },

  /* ==================== LUCIDE ICONS ==================== */
  initLucideIcons() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  },

  /* ==================== SIDEBAR & HEADER ==================== */
  initSidebarNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    }
  },

  renderHeaderAndProfile() {
    const profile = window.PlatePilotStorage ? window.PlatePilotStorage.getProfile() : {};
    
    // User name in header/sidebar
    const nameEls = document.querySelectorAll('.user-display-name');
    nameEls.forEach(el => el.textContent = profile.name || 'Student');

    // College / hostel
    const collegeEls = document.querySelectorAll('.user-display-college');
    collegeEls.forEach(el => el.textContent = profile.college || 'Hostel Campus');

    // Budget chip
    const budgetEls = document.querySelectorAll('.header-budget-val');
    budgetEls.forEach(el => el.textContent = `₹${profile.dailyBudget || 120}/day`);
  },

  /* ==================== TOAST NOTIFICATIONS ==================== */
  showToast(message, type = 'success', duration = 3200) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconName = 'check-circle';
    if (type === 'error') iconName = 'alert-circle';
    if (type === 'info') iconName = 'info';

    toast.innerHTML = `
      <i data-lucide="${iconName}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    this.initLucideIcons();

    // Trigger animation
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, duration);
  },

  /* ==================== MODALS ==================== */
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      this.initLucideIcons();
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  /* ==================== RESET DEMO ==================== */
  handleResetDemo() {
    if (confirm('Reset PlatePilot to the official NutriNinja Cup demo state (₹120 budget, Non-Veg, Aarav Sharma)?')) {
      if (window.PlatePilotStorage) {
        window.PlatePilotStorage.resetToDemo();
        this.showToast('Reset to NutriNinja Cup demo profile!', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 600);
      }
    }
  },

  /* ==================== GLOBAL SEARCH ==================== */
  initGlobalSearch() {
    const searchInputs = document.querySelectorAll('.global-search-input');
    searchInputs.forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const query = input.value.trim();
          if (query) {
            window.location.href = `recipes.html?search=${encodeURIComponent(query)}`;
          }
        }
      });
    });
  },

  /* ==================== MEAL REMINDERS ==================== */
  initMealReminders() {
    // Check if notification is supported and reminder active
    const now = new Date();
    const hours = now.getHours();
    
    let nextMeal = 'Breakfast';
    let mealTime = '8:00 AM';

    if (hours >= 8 && hours < 13) {
      nextMeal = 'Lunch';
      mealTime = '1:30 PM';
    } else if (hours >= 13 && hours < 17) {
      nextMeal = 'Evening Snack';
      mealTime = '5:00 PM';
    } else if (hours >= 17 && hours < 21) {
      nextMeal = 'Dinner';
      mealTime = '8:00 PM';
    } else {
      nextMeal = 'Breakfast (Tomorrow)';
      mealTime = '8:00 AM';
    }

    const bannerMealName = document.getElementById('upcoming-meal-name');
    const bannerMealTime = document.getElementById('upcoming-meal-time');
    if (bannerMealName) bannerMealName.textContent = nextMeal;
    if (bannerMealTime) bannerMealTime.textContent = `Scheduled at ${mealTime}`;
  }
};

window.App = App;
document.addEventListener('DOMContentLoaded', () => App.init());
