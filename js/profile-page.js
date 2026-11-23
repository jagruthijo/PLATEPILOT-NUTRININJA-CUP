/**
 * PlatePilot - User Profile & Onboarding Controller
 * Manages physical stats, BMR/TDEE formulas, budget preferences, 
 * preset demo profiles, and JSON backup export/import.
 */

const ProfilePage = {
  profile: {},

  init() {
    this.profile = window.PlatePilotStorage.getProfile();
    this.populateFormFields();
    this.updateTargetCalculations();
    this.initEventListeners();
  },

  initEventListeners() {
    // Budget slider live display
    const budgetSlider = document.getElementById('profile-budget-slider');
    const budgetDisplay = document.getElementById('profile-budget-display');
    if (budgetSlider && budgetDisplay) {
      budgetSlider.addEventListener('input', (e) => {
        budgetDisplay.textContent = `₹${e.target.value}`;
      });
    }

    // Input changes trigger live nutrition target update
    const formInputs = document.querySelectorAll('#profile-form input, #profile-form select');
    formInputs.forEach(input => {
      input.addEventListener('change', () => this.updateTargetCalculations());
    });

    // Form submission
    const form = document.getElementById('profile-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveProfile();
      });
    }

    // Preset buttons
    const btnDemoOfficial = document.getElementById('btn-preset-official');
    if (btnDemoOfficial) {
      btnDemoOfficial.addEventListener('click', () => this.loadOfficialDemo());
    }

    const btnDemoVeg = document.getElementById('btn-preset-veg');
    if (btnDemoVeg) {
      btnDemoVeg.addEventListener('click', () => this.loadVegDemo());
    }

    const btnDemoVegan = document.getElementById('btn-preset-vegan');
    if (btnDemoVegan) {
      btnDemoVegan.addEventListener('click', () => this.loadVeganDemo());
    }

    // Export Data JSON
    const exportDataBtn = document.getElementById('btn-export-json');
    if (exportDataBtn) {
      exportDataBtn.addEventListener('click', () => this.exportBackupJSON());
    }
  },

  populateFormFields() {
    const p = this.profile;

    this.setVal('profile-name', p.name || 'Aarav Sharma');
    this.setVal('profile-college', p.college || 'IIT Delhi');
    this.setVal('profile-age', p.age || 20);
    this.setVal('profile-gender', p.gender || 'male');
    this.setVal('profile-height', p.height || 175);
    this.setVal('profile-weight', p.weight || 68);
    this.setVal('profile-activity', p.activityLevel || 'moderate');
    this.setVal('profile-diet', p.dietPreference || 'non-veg');
    this.setVal('profile-goal', p.fitnessGoal || 'muscle_gain');

    const budgetSlider = document.getElementById('profile-budget-slider');
    const budgetDisplay = document.getElementById('profile-budget-display');
    if (budgetSlider) budgetSlider.value = p.dailyBudget || 120;
    if (budgetDisplay) budgetDisplay.textContent = `₹${p.dailyBudget || 120}`;
  },

  setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  },

  getVal(id, fallback = '') {
    const el = document.getElementById(id);
    return el ? el.value : fallback;
  },

  updateTargetCalculations() {
    const tempUser = {
      weight: parseFloat(this.getVal('profile-weight', 68)) || 68,
      height: parseFloat(this.getVal('profile-height', 175)) || 175,
      age: parseInt(this.getVal('profile-age', 20)) || 20,
      gender: this.getVal('profile-gender', 'male'),
      activityLevel: this.getVal('profile-activity', 'moderate'),
      fitnessGoal: this.getVal('profile-goal', 'muscle_gain'),
      dailyBudget: parseInt(this.getVal('profile-budget-slider', 120)) || 120
    };

    const calculated = window.PlatePilotStorage.calculateNutritionTargets(tempUser);

    const bmrEl = document.getElementById('calc-bmr');
    const tdeeEl = document.getElementById('calc-tdee');
    const calTargetEl = document.getElementById('calc-calories-target');
    const proteinTargetEl = document.getElementById('calc-protein-target');

    if (bmrEl) bmrEl.textContent = `${calculated.calculatedBMR} kcal`;
    if (tdeeEl) tdeeEl.textContent = `${calculated.calculatedTDEE} kcal`;
    if (calTargetEl) calTargetEl.textContent = `${calculated.targetCalories} kcal`;
    if (proteinTargetEl) proteinTargetEl.textContent = `${calculated.targetProtein}g`;
  },

  saveProfile() {
    const updated = {
      ...this.profile,
      name: this.getVal('profile-name', 'Aarav Sharma'),
      college: this.getVal('profile-college', 'Hostel Campus'),
      age: parseInt(this.getVal('profile-age', 20)),
      gender: this.getVal('profile-gender', 'male'),
      height: parseFloat(this.getVal('profile-height', 175)),
      weight: parseFloat(this.getVal('profile-weight', 68)),
      activityLevel: this.getVal('profile-activity', 'moderate'),
      dietPreference: this.getVal('profile-diet', 'non-veg'),
      fitnessGoal: this.getVal('profile-goal', 'muscle_gain'),
      dailyBudget: parseInt(this.getVal('profile-budget-slider', 120))
    };

    const saved = window.PlatePilotStorage.saveProfile(updated);
    this.profile = saved;
    window.App.renderHeaderAndProfile();
    window.App.showToast('Profile and nutrition targets updated successfully!', 'success');
  },

  loadOfficialDemo() {
    window.PlatePilotStorage.resetToDemo();
    this.profile = window.PlatePilotStorage.getProfile();
    this.populateFormFields();
    this.updateTargetCalculations();
    window.App.renderHeaderAndProfile();
    window.App.showToast('Loaded NutriNinja Cup Official Demo Profile!', 'success');
  },

  loadVegDemo() {
    const vegProfile = {
      name: 'Pooja Iyer',
      college: 'IIT Madras (Sharavathi Hostel)',
      age: 21,
      gender: 'female',
      height: 165,
      weight: 56,
      activityLevel: 'moderate',
      dailyBudget: 110,
      dietPreference: 'veg',
      fitnessGoal: 'maintenance'
    };
    window.PlatePilotStorage.saveProfile(vegProfile);
    this.profile = window.PlatePilotStorage.getProfile();
    this.populateFormFields();
    this.updateTargetCalculations();
    window.App.renderHeaderAndProfile();
    window.App.showToast('Loaded Vegetarian Student Demo Profile!', 'success');
  },

  loadVeganDemo() {
    const veganProfile = {
      name: 'Kabir Sen',
      college: 'BITS Pilani (Vyas Bhawan)',
      age: 20,
      gender: 'male',
      height: 172,
      weight: 64,
      activityLevel: 'very_active',
      dailyBudget: 100,
      dietPreference: 'vegan',
      fitnessGoal: 'muscle_gain'
    };
    window.PlatePilotStorage.saveProfile(veganProfile);
    this.profile = window.PlatePilotStorage.getProfile();
    this.populateFormFields();
    this.updateTargetCalculations();
    window.App.renderHeaderAndProfile();
    window.App.showToast('Loaded Vegan High-Protein Demo Profile!', 'success');
  },

  exportBackupJSON() {
    const fullBackup = {
      profile: window.PlatePilotStorage.getProfile(),
      todayPlan: window.PlatePilotStorage.getTodayPlan(),
      weeklyPlan: window.PlatePilotStorage.get('platepilot_weekly_plan'),
      grocery: window.PlatePilotStorage.get('platepilot_grocery_list'),
      pantry: window.PlatePilotStorage.getPantry(),
      exportedAt: new Date().toISOString()
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `PlatePilot_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    window.App.showToast('Data exported as JSON file!', 'success');
  }
};

window.ProfilePage = ProfilePage;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('profile-form')) {
    ProfilePage.init();
  }
});
