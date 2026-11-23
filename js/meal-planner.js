/**
 * PlatePilot - Weekly 7-Day Meal Planner Controller
 * Manages full week calendar, individual day regeneration, 
 * single meal swap, copying previous days, and weekly cost totals.
 */

const MealPlanner = {
  activeDay: 'Monday',
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  weeklyData: {},

  init() {
    this.loadWeeklyPlan();
    this.renderDayTabs();
    this.renderCurrentDay();
    this.initEventListeners();
  },

  loadWeeklyPlan() {
    let saved = window.PlatePilotStorage.get('platepilot_weekly_plan');
    if (!saved) {
      saved = {};
      this.days.forEach(day => {
        const generated = window.MealOptimizer.generateDailyPlan();
        saved[day] = generated.mealObjects;
      });
      window.PlatePilotStorage.set('platepilot_weekly_plan', saved);
    }
    this.weeklyData = saved;
    this.calculateWeeklySummary();
  },

  initEventListeners() {
    // Regenerate whole week button
    const regenWeekBtn = document.getElementById('btn-regen-week');
    if (regenWeekBtn) {
      regenWeekBtn.addEventListener('click', () => this.regenerateWholeWeek());
    }

    // Regenerate active day button
    const regenDayBtn = document.getElementById('btn-regen-day');
    if (regenDayBtn) {
      regenDayBtn.addEventListener('click', () => this.regenerateActiveDay());
    }

    // Copy from previous day
    const copyDayBtn = document.getElementById('btn-copy-prev-day');
    if (copyDayBtn) {
      copyDayBtn.addEventListener('click', () => this.copyPreviousDay());
    }

    // Export PDF
    const exportPdfBtn = document.getElementById('btn-export-planner-pdf');
    if (exportPdfBtn) {
      exportPdfBtn.addEventListener('click', () => {
        if (window.PDFExporter) window.PDFExporter.export7DayPlan();
      });
    }
  },

  calculateWeeklySummary() {
    let totalWeekCost = 0;
    let totalWeekProtein = 0;
    let totalWeekCalories = 0;

    this.days.forEach(d => {
      const dayMeals = this.weeklyData[d] || {};
      ['breakfast', 'lunch', 'snack', 'dinner'].forEach(slot => {
        const meal = dayMeals[slot];
        if (meal) {
          totalWeekCost += meal.price || 0;
          totalWeekProtein += meal.protein || 0;
          totalWeekCalories += meal.calories || 0;
        }
      });
    });

    const profile = window.PlatePilotStorage.getProfile();
    const weeklyBudget = (profile.dailyBudget || 120) * 7;
    const avgProtein = Math.round(totalWeekProtein / 7);

    const weekCostEl = document.getElementById('weekly-total-cost');
    const weekBudgetEl = document.getElementById('weekly-budget-target');
    const avgProteinEl = document.getElementById('weekly-avg-protein');

    if (weekCostEl) weekCostEl.textContent = `₹${totalWeekCost}`;
    if (weekBudgetEl) weekBudgetEl.textContent = `of ₹${weeklyBudget}`;
    if (avgProteinEl) avgProteinEl.textContent = `${avgProtein}g / day`;
  },

  renderDayTabs() {
    const container = document.getElementById('planner-day-tabs');
    if (!container) return;

    container.innerHTML = this.days.map(d => {
      const dayMeals = this.weeklyData[d] || {};
      let dayCost = 0;
      ['breakfast', 'lunch', 'snack', 'dinner'].forEach(slot => {
        if (dayMeals[slot]) dayCost += dayMeals[slot].price || 0;
      });

      const isActive = d === this.activeDay;

      return `
        <button class="planner-tab-btn ${isActive ? 'active' : ''}" onclick="MealPlanner.switchDay('${d}')">
          <div style="font-weight: 700; font-size: 0.95rem;">${d.slice(0, 3)}</div>
          <div style="font-size: 0.75rem; opacity: 0.85;">₹${dayCost}</div>
        </button>
      `;
    }).join('');
  },

  switchDay(dayName) {
    this.activeDay = dayName;
    this.renderDayTabs();
    this.renderCurrentDay();
    if (window.AppAnimations) window.AppAnimations.animateCardGrid('.planner-meal-slot');
  },

  renderCurrentDay() {
    const dayMeals = this.weeklyData[this.activeDay];
    if (!dayMeals) return;

    const currentDayTitle = document.getElementById('planner-current-day-title');
    if (currentDayTitle) currentDayTitle.textContent = `${this.activeDay}'s Schedule`;

    let dayCost = 0;
    let dayProtein = 0;
    let dayCalories = 0;

    ['breakfast', 'lunch', 'snack', 'dinner'].forEach(slot => {
      const meal = dayMeals[slot];
      if (meal) {
        dayCost += meal.price || 0;
        dayProtein += meal.protein || 0;
        dayCalories += meal.calories || 0;
        this.renderPlannerMealSlot(slot, meal);
      }
    });

    const dayCostEl = document.getElementById('planner-day-cost');
    const dayProteinEl = document.getElementById('planner-day-protein');
    const dayCalEl = document.getElementById('planner-day-calories');

    if (dayCostEl) dayCostEl.textContent = `₹${dayCost}`;
    if (dayProteinEl) dayProteinEl.textContent = `${dayProtein}g`;
    if (dayCalEl) dayCalEl.textContent = `${dayCalories} kcal`;

    if (window.App) window.App.initLucideIcons();
  },

  renderPlannerMealSlot(slot, meal) {
    const slotEl = document.getElementById(`planner-slot-${slot}`);
    if (!slotEl || !meal) return;

    slotEl.innerHTML = `
      <div class="planner-meal-slot card card-hover" style="display: flex; gap: 16px; align-items: center; padding: 18px; margin-bottom: 14px;">
        <img src="${meal.image}" alt="${meal.name}" style="width: 80px; height: 80px; border-radius: var(--radius-md); object-fit: cover; flex-shrink: 0;">
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span class="badge ${meal.diet === 'veg' ? 'badge-veg' : meal.diet === 'non-veg' ? 'badge-nonveg' : 'badge-vegan'}">
              ${meal.diet.toUpperCase()}
            </span>
            <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--text-muted);">${slot}</span>
          </div>
          <h4 style="font-size: 1.05rem; margin-bottom: 4px;">${meal.name}</h4>
          <div style="display: flex; gap: 16px; font-size: 0.82rem; color: var(--text-muted);">
            <span><strong>${meal.calories}</strong> kcal</span>
            <span style="color: var(--color-success);"><strong>${meal.protein}g</strong> Protein</span>
            <span><strong>${meal.prepTime}</strong> mins</span>
          </div>
        </div>
        <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
          <span style="font-weight: 800; font-size: 1.25rem; color: var(--text-main);">₹${meal.price}</span>
          <button class="btn btn-outline btn-sm" onclick="MealPlanner.openSlotSwap('${slot}')">
            <i data-lucide="repeat"></i> Swap
          </button>
        </div>
      </div>
    `;
  },

  openSlotSwap(slot) {
    // Re-use swap modal from dashboard
    if (window.Dashboard) {
      const meal = this.weeklyData[this.activeDay][slot];
      window.Dashboard.openSwapModal(slot, meal.id);
      // Temporarily override executeSwap to update weeklyData
      const origExecute = window.Dashboard.executeSwap;
      window.Dashboard.executeSwap = (newRecipeId) => {
        const recipe = (window.RECIPES_DATA || []).find(r => r.id === newRecipeId);
        if (recipe) {
          this.weeklyData[this.activeDay][slot] = recipe;
          window.PlatePilotStorage.set('platepilot_weekly_plan', this.weeklyData);
          this.renderDayTabs();
          this.renderCurrentDay();
          this.calculateWeeklySummary();
          window.App.closeModal('swap-meal-modal');
          window.App.showToast(`Updated ${this.activeDay}'s ${slot}!`, 'success');
        }
        window.Dashboard.executeSwap = origExecute;
      };
    }
  },

  regenerateActiveDay() {
    window.App.showToast(`Optimizing meals for ${this.activeDay}...`, 'info');
    setTimeout(() => {
      const generated = window.MealOptimizer.generateDailyPlan();
      this.weeklyData[this.activeDay] = generated.mealObjects;
      window.PlatePilotStorage.set('platepilot_weekly_plan', this.weeklyData);
      this.renderDayTabs();
      this.renderCurrentDay();
      this.calculateWeeklySummary();
      window.App.showToast(`Regenerated ${this.activeDay} plan!`, 'success');
    }, 300);
  },

  regenerateWholeWeek() {
    window.App.showToast('Generating full 7-day budget & protein meal plan...', 'info');
    setTimeout(() => {
      this.days.forEach(day => {
        const generated = window.MealOptimizer.generateDailyPlan();
        this.weeklyData[day] = generated.mealObjects;
      });
      window.PlatePilotStorage.set('platepilot_weekly_plan', this.weeklyData);
      this.renderDayTabs();
      this.renderCurrentDay();
      this.calculateWeeklySummary();
      window.App.showToast('Full 7-day meal plan generated successfully!', 'success');
    }, 450);
  },

  copyPreviousDay() {
    const currentIndex = this.days.indexOf(this.activeDay);
    if (currentIndex <= 0) {
      window.App.showToast('No previous day to copy for Monday!', 'info');
      return;
    }
    const prevDay = this.days[currentIndex - 1];
    this.weeklyData[this.activeDay] = JSON.parse(JSON.stringify(this.weeklyData[prevDay]));
    window.PlatePilotStorage.set('platepilot_weekly_plan', this.weeklyData);
    this.renderDayTabs();
    this.renderCurrentDay();
    this.calculateWeeklySummary();
    window.App.showToast(`Copied meal schedule from ${prevDay} to ${this.activeDay}!`, 'success');
  }
};

window.MealPlanner = MealPlanner;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('planner-day-tabs')) {
    MealPlanner.init();
  }
});
