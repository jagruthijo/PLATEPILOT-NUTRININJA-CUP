/**
 * PlatePilot - Dashboard Page Controller
 * Manages daily statistics, calorie meter, today's meal schedule, 
 * completion toggles, quick actions, and the One-Click Meal Swap Modal.
 */

const Dashboard = {
  activeSwapSlot: null,

  init() {
    this.renderDashboardData();
    this.initEventListeners();

    // Listen for storage updates
    window.addEventListener('platepilot_plan_updated', () => {
      this.renderDashboardData();
    });
  },

  initEventListeners() {
    // Generate new plan button
    const generateBtn = document.getElementById('btn-reoptimize');
    if (generateBtn) {
      generateBtn.addEventListener('click', () => this.handleRegeneratePlan());
    }

    // Export PDF button
    const pdfBtn = document.getElementById('btn-export-pdf');
    if (pdfBtn) {
      pdfBtn.addEventListener('click', () => {
        if (window.PDFExporter) window.PDFExporter.export7DayPlan();
      });
    }

    // Modal Close
    const closeSwapModal = document.getElementById('btn-close-swap-modal');
    if (closeSwapModal) {
      closeSwapModal.addEventListener('click', () => {
        window.App.closeModal('swap-meal-modal');
      });
    }

    // Modal filters
    const filterDiet = document.getElementById('swap-filter-diet');
    if (filterDiet) {
      filterDiet.addEventListener('change', () => this.filterSwapModalContent());
    }
  },

  renderDashboardData() {
    const profile = window.PlatePilotStorage.getProfile();
    const todayPlan = window.PlatePilotStorage.getTodayPlan();
    const allRecipes = window.RECIPES_DATA || [];

    // Map meal IDs to recipe objects
    const meals = {
      breakfast: allRecipes.find(r => r.id === todayPlan.meals.breakfast) || allRecipes[0],
      lunch: allRecipes.find(r => r.id === todayPlan.meals.lunch) || allRecipes[12],
      snack: allRecipes.find(r => r.id === todayPlan.meals.snack) || allRecipes[26],
      dinner: allRecipes.find(r => r.id === todayPlan.meals.dinner) || allRecipes[38]
    };

    // Calculate daily totals
    const totalCost = meals.breakfast.price + meals.lunch.price + meals.snack.price + meals.dinner.price;
    const totalCalories = meals.breakfast.calories + meals.lunch.calories + meals.snack.calories + meals.dinner.calories;
    const totalProtein = meals.breakfast.protein + meals.lunch.protein + meals.snack.protein + meals.dinner.protein;
    const totalCarbs = meals.breakfast.carbs + meals.lunch.carbs + meals.snack.carbs + meals.dinner.carbs;
    const totalFats = meals.breakfast.fat + meals.lunch.fat + meals.snack.fat + meals.dinner.fat;

    const targetBudget = profile.dailyBudget || 120;
    const remainingBudget = Math.max(0, targetBudget - totalCost);
    const targetCalories = profile.targetCalories || 2100;
    const targetProtein = profile.targetProtein || 110;

    // 1. Update KPI Values
    const spentEl = document.getElementById('kpi-spent-val');
    const budgetTargetEl = document.getElementById('kpi-budget-target');
    const remainingBudgetEl = document.getElementById('kpi-remaining-budget');
    const budgetFillEl = document.getElementById('kpi-budget-fill');

    if (spentEl) spentEl.textContent = `₹${totalCost}`;
    if (budgetTargetEl) budgetTargetEl.textContent = `of ₹${targetBudget}`;
    if (remainingBudgetEl) remainingBudgetEl.textContent = `₹${remainingBudget} remaining`;
    if (budgetFillEl) {
      const budgetPct = Math.min(100, Math.round((totalCost / targetBudget) * 100));
      budgetFillEl.style.width = `${budgetPct}%`;
      if (totalCost > targetBudget) {
        budgetFillEl.style.background = '#D32F2F';
      }
    }

    // Calories KPI
    const calValEl = document.getElementById('kpi-calories-val');
    const calTargetEl = document.getElementById('kpi-calories-target');
    const calFillEl = document.getElementById('kpi-calories-fill');
    if (calValEl) calValEl.textContent = `${totalCalories}`;
    if (calTargetEl) calTargetEl.textContent = `of ${targetCalories} kcal`;
    if (calFillEl) {
      const calPct = Math.min(100, Math.round((totalCalories / targetCalories) * 100));
      calFillEl.style.width = `${calPct}%`;
    }

    // Protein KPI
    const proteinValEl = document.getElementById('kpi-protein-val');
    const proteinTargetEl = document.getElementById('kpi-protein-target');
    const proteinFillEl = document.getElementById('kpi-protein-fill');
    if (proteinValEl) proteinValEl.textContent = `${totalProtein}g`;
    if (proteinTargetEl) proteinTargetEl.textContent = `of ${targetProtein}g`;
    if (proteinFillEl) {
      const pPct = Math.min(100, Math.round((totalProtein / targetProtein) * 100));
      proteinFillEl.style.width = `${pPct}%`;
    }

    // Carbs & Fat KPI
    const carbsValEl = document.getElementById('kpi-carbs-val');
    const fatsValEl = document.getElementById('kpi-fats-val');
    if (carbsValEl) carbsValEl.textContent = `${totalCarbs}g`;
    if (fatsValEl) fatsValEl.textContent = `${totalFats}g`;

    // 2. Render Macro Doughnut Chart
    if (window.AppCharts) {
      window.AppCharts.renderMacroDoughnut('macro-doughnut-canvas', totalProtein, totalCarbs, totalFats);
      window.AppCharts.renderWeeklyTrends('weekly-trends-canvas');
    }

    const doughnutValEl = document.getElementById('doughnut-calories-val');
    if (doughnutValEl) doughnutValEl.textContent = totalCalories;

    // 3. Render Today's Meal Cards
    this.renderMealCard('breakfast', meals.breakfast, todayPlan.completed.breakfast, '08:00 AM');
    this.renderMealCard('lunch', meals.lunch, todayPlan.completed.lunch, '01:30 PM');
    this.renderMealCard('snack', meals.snack, todayPlan.completed.snack, '05:00 PM');
    this.renderMealCard('dinner', meals.dinner, todayPlan.completed.dinner, '08:00 PM');

    if (window.App) window.App.initLucideIcons();
  },

  renderMealCard(slot, recipe, isCompleted, timeSlot) {
    const cardEl = document.getElementById(`meal-card-${slot}`);
    if (!cardEl || !recipe) return;

    let dietBadgeClass = 'badge-veg';
    if (recipe.diet === 'non-veg') dietBadgeClass = 'badge-nonveg';
    if (recipe.diet === 'vegan') dietBadgeClass = 'badge-vegan';

    cardEl.innerHTML = `
      <div class="meal-card-img-container">
        <img src="${recipe.image}" alt="${recipe.name}" class="meal-card-img" loading="lazy">
        <div class="meal-card-slot-badge">
          <i data-lucide="clock"></i> ${timeSlot}
        </div>
        <div class="meal-card-price-badge">₹${recipe.price}</div>
      </div>
      <div class="meal-card-body">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <span class="badge ${dietBadgeClass}">
            <i data-lucide="circle-dot"></i> ${recipe.diet.toUpperCase()}
          </span>
          <span style="font-size: 0.76rem; color: var(--text-muted); font-weight: 600;">
            <i data-lucide="timer" style="width: 14px; height: 14px; display: inline;"></i> ${recipe.prepTime} mins
          </span>
        </div>

        <h3 class="meal-card-title">${recipe.name}</h3>
        <p style="font-size: 0.8rem; line-height: 1.4; margin-bottom: 12px; height: 38px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
          ${recipe.description}
        </p>

        <div class="macro-pills">
          <div class="macro-pill-item">
            <span class="macro-val protein-val">${recipe.protein}g</span>
            <span class="macro-lbl">Protein</span>
          </div>
          <div class="macro-pill-item">
            <span class="macro-val">${recipe.calories}</span>
            <span class="macro-lbl">Kcal</span>
          </div>
          <div class="macro-pill-item">
            <span class="macro-val">${recipe.carbs}g</span>
            <span class="macro-lbl">Carbs</span>
          </div>
          <div class="macro-pill-item">
            <span class="macro-val">${recipe.fat}g</span>
            <span class="macro-lbl">Fats</span>
          </div>
        </div>

        <div class="meal-card-actions">
          <label class="meal-checkbox-label">
            <div class="custom-checkbox ${isCompleted ? 'checked' : ''}" onclick="Dashboard.toggleCompleted('${slot}')">
              ${isCompleted ? '<i data-lucide="check" style="width: 14px; height: 14px;"></i>' : ''}
            </div>
            <span>${isCompleted ? 'Completed' : 'Mark Eaten'}</span>
          </label>

          <button class="btn btn-outline btn-sm" onclick="Dashboard.openSwapModal('${slot}', '${recipe.id}')">
            <i data-lucide="repeat"></i> Swap
          </button>
        </div>
      </div>
    `;
  },

  toggleCompleted(slot) {
    const isNowCompleted = window.PlatePilotStorage.toggleMealCompletion(slot);
    this.renderDashboardData();
    if (isNowCompleted) {
      window.App.showToast(`Marked ${slot} as completed! Keep going!`, 'success');
      if (window.AppAnimations) window.AppAnimations.celebrateGoal();
    }
  },

  handleRegeneratePlan() {
    window.App.showToast('Optimizing budget meal plan with greedy knapsack...', 'info');
    setTimeout(() => {
      const generated = window.MealOptimizer.generateDailyPlan();
      const currentPlan = window.PlatePilotStorage.getTodayPlan();
      
      currentPlan.meals = generated.plan;
      currentPlan.completed = { breakfast: false, lunch: false, snack: false, dinner: false };
      
      window.PlatePilotStorage.saveTodayPlan(currentPlan);
      this.renderDashboardData();

      window.App.showToast(generated.explanation, generated.isBudgetStrained ? 'error' : 'success', 4500);
      if (window.AppAnimations) window.AppAnimations.animateCardGrid('.meal-card');
    }, 400);
  },

  /* ==================== ONE-CLICK MEAL SWAP MODAL ==================== */
  openSwapModal(slot, currentRecipeId) {
    this.activeSwapSlot = slot;
    const profile = window.PlatePilotStorage.getProfile();
    const todayPlan = window.PlatePilotStorage.getTodayPlan();
    const allRecipes = window.RECIPES_DATA || [];

    // Calculate current total
    const totalCost = Object.keys(todayPlan.meals).reduce((sum, key) => {
      const r = allRecipes.find(x => x.id === todayPlan.meals[key]);
      return sum + (r ? r.price : 0);
    }, 0);

    const alternatives = window.MealOptimizer.getAlternativeMeals(currentRecipeId, slot, profile.dailyBudget, totalCost);
    this.renderSwapModalAlternatives(alternatives, currentRecipeId);

    const slotTitleEl = document.getElementById('swap-modal-slot-title');
    if (slotTitleEl) slotTitleEl.textContent = `Swap ${slot.toUpperCase()}`;

    window.App.openModal('swap-meal-modal');
  },

  renderSwapModalAlternatives(alternatives, currentRecipeId) {
    const container = document.getElementById('swap-alternatives-list');
    if (!container) return;

    if (alternatives.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 30px; color: var(--text-muted);">
          <i data-lucide="alert-triangle" style="width: 36px; height: 36px; margin-bottom: 8px;"></i>
          <p>No alternative meals found matching your current dietary restrictions and budget.</p>
        </div>
      `;
      window.App.initLucideIcons();
      return;
    }

    container.innerHTML = alternatives.map(recipe => {
      let diffSign = recipe.priceDiff > 0 ? `+₹${recipe.priceDiff}` : recipe.priceDiff < 0 ? `-₹${Math.abs(recipe.priceDiff)}` : 'Same Price';
      let diffColor = recipe.priceDiff <= 0 ? 'var(--color-success)' : 'var(--color-warning)';
      let proteinSign = recipe.proteinDiff >= 0 ? `+${recipe.proteinDiff}g` : `${recipe.proteinDiff}g`;

      return `
        <div class="card card-hover" style="display: flex; gap: 16px; padding: 14px; margin-bottom: 12px; align-items: center; border-radius: var(--radius-md);">
          <img src="${recipe.image}" alt="${recipe.name}" style="width: 80px; height: 80px; border-radius: var(--radius-sm); object-fit: cover; flex-shrink: 0;">
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span class="badge ${recipe.diet === 'veg' ? 'badge-veg' : recipe.diet === 'non-veg' ? 'badge-nonveg' : 'badge-vegan'}">
                ${recipe.diet.toUpperCase()}
              </span>
              <strong style="font-size: 0.95rem;">${recipe.name}</strong>
            </div>
            <div style="font-size: 0.82rem; color: var(--text-muted); display: flex; gap: 14px;">
              <span><strong>${recipe.calories}</strong> kcal</span>
              <span style="color: var(--color-success);"><strong>${recipe.protein}g</strong> Protein (${proteinSign})</span>
              <span><strong>${recipe.prepTime}</strong> mins</span>
            </div>
          </div>
          <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
            <div style="font-weight: 800; font-size: 1.1rem; color: var(--text-main);">₹${recipe.price}</div>
            <div style="font-size: 0.75rem; font-weight: 700; color: ${diffColor};">${diffSign}</div>
            <button class="btn btn-lime btn-sm" onclick="Dashboard.executeSwap('${recipe.id}')">
              Select
            </button>
          </div>
        </div>
      `;
    }).join('');

    window.App.initLucideIcons();
  },

  executeSwap(newRecipeId) {
    if (!this.activeSwapSlot) return;

    window.PlatePilotStorage.swapMeal(this.activeSwapSlot, newRecipeId);
    window.App.closeModal('swap-meal-modal');
    this.renderDashboardData();
    window.App.showToast(`Successfully swapped ${this.activeSwapSlot}! Budget & macros updated.`, 'success');
  }
};

window.Dashboard = Dashboard;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('meal-card-breakfast')) {
    Dashboard.init();
  }
});
