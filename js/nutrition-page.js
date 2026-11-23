/**
 * PlatePilot - Nutrition Visualizer & Fitness Tracker Controller
 * Target vs Actual comparisons, macro doughnut charts, historical weight logging, 
 * and Indian Protein-per-Rupee Efficiency Matrix.
 */

const NutritionPage = {
  init() {
    this.renderNutritionData();
    this.renderEfficiencyMatrix();
    this.initWeightTracker();
  },

  renderNutritionData() {
    const profile = window.PlatePilotStorage.getProfile();
    const todayPlan = window.PlatePilotStorage.getTodayPlan();
    const allRecipes = window.RECIPES_DATA || [];

    const meals = [
      allRecipes.find(r => r.id === todayPlan.meals.breakfast) || allRecipes[0],
      allRecipes.find(r => r.id === todayPlan.meals.lunch) || allRecipes[12],
      allRecipes.find(r => r.id === todayPlan.meals.snack) || allRecipes[26],
      allRecipes.find(r => r.id === todayPlan.meals.dinner) || allRecipes[38]
    ];

    const actual = meals.reduce((acc, m) => {
      acc.cost += m.price || 0;
      acc.calories += m.calories || 0;
      acc.protein += m.protein || 0;
      acc.carbs += m.carbs || 0;
      acc.fat += m.fat || 0;
      acc.fiber += m.fiber || 0;
      return acc;
    }, { cost: 0, calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });

    const targets = {
      calories: profile.targetCalories || 2100,
      protein: profile.targetProtein || 110,
      carbs: profile.targetCarbs || 260,
      fat: profile.targetFats || 65,
      fiber: 35 // recommended daily fiber in grams
    };

    // Update Progress Bars & Values
    this.updateNutrientBar('cal', actual.calories, targets.calories, 'kcal');
    this.updateNutrientBar('protein', actual.protein, targets.protein, 'g');
    this.updateNutrientBar('carbs', actual.carbs, targets.carbs, 'g');
    this.updateNutrientBar('fat', actual.fat, targets.fat, 'g');
    this.updateNutrientBar('fiber', actual.fiber, targets.fiber, 'g');

    // Render Charts
    if (window.AppCharts) {
      window.AppCharts.renderMacroDoughnut('nutrition-macro-canvas', actual.protein, actual.carbs, actual.fat);
      window.AppCharts.renderWeeklyTrends('nutrition-weekly-canvas');
    }
  },

  updateNutrientBar(id, actual, target, unit) {
    const actualEl = document.getElementById(`nutr-${id}-actual`);
    const targetEl = document.getElementById(`nutr-${id}-target`);
    const barEl = document.getElementById(`nutr-${id}-bar`);
    const pctEl = document.getElementById(`nutr-${id}-pct`);

    if (actualEl) actualEl.textContent = `${actual} ${unit}`;
    if (targetEl) targetEl.textContent = `Target: ${target} ${unit}`;
    if (barEl) {
      const pct = Math.min(100, Math.round((actual / target) * 100));
      barEl.style.width = `${pct}%`;
      if (pctEl) pctEl.textContent = `${pct}%`;
    }
  },

  renderEfficiencyMatrix() {
    const matrix = [
      { name: 'Soya Chunks', proteinPer100: 52, pricePer100: 12, proteinPerRupee: 4.33, note: 'Undisputed budget protein king in India' },
      { name: 'Roasted Chana (Bhuna)', proteinPer100: 22, pricePer100: 16, proteinPerRupee: 1.38, note: 'Zero-cooking desk snack staple' },
      { name: 'Green Moong / Dal', proteinPer100: 24, pricePer100: 18, proteinPerRupee: 1.33, note: 'High fiber, excellent amino acid balance' },
      { name: 'Sattu Flour', proteinPer100: 25, pricePer100: 20, proteinPerRupee: 1.25, note: 'Instant shake, natural electrolytes' },
      { name: 'Raw Peanuts', proteinPer100: 26, pricePer100: 22, proteinPerRupee: 1.18, note: 'Healthy fats & calorie dense bulking' },
      { name: 'Whole Eggs', proteinPer100: 13, pricePer100: 14, proteinPerRupee: 0.93, note: 'Gold standard complete bioavailability' },
      { name: 'Chicken Breast', proteinPer100: 27, pricePer100: 32, proteinPerRupee: 0.84, note: 'Lean pure animal protein' },
      { name: 'Fresh Paneer', proteinPer100: 18, pricePer100: 38, proteinPerRupee: 0.47, note: 'Vegetarian favorite, higher fat density' }
    ];

    const container = document.getElementById('protein-efficiency-rows');
    if (!container) return;

    container.innerHTML = matrix.map((item, idx) => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid var(--color-border); background: ${idx % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-card-subtle)'};">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 0.85rem; font-weight: 800; color: var(--color-primary-forest); width: 20px;">#${idx + 1}</span>
          <div>
            <strong style="font-size: 0.95rem;">${item.name}</strong>
            <p style="font-size: 0.78rem; color: var(--text-muted); margin: 0;">${item.note}</p>
          </div>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 1.1rem; font-weight: 800; color: var(--color-success);">${item.proteinPerRupee}g</span>
          <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">protein / ₹1 spent</span>
        </div>
      </div>
    `).join('');
  },

  initWeightTracker() {
    let weightHistory = window.PlatePilotStorage.get('platepilot_weight_history') || [
      { date: 'Week 1', weight: 66.5 },
      { date: 'Week 2', weight: 67.0 },
      { date: 'Week 3', weight: 67.4 },
      { date: 'Week 4', weight: 68.0 }
    ];

    if (window.AppCharts) {
      window.AppCharts.renderWeightHistory('weight-history-canvas', weightHistory);
    }

    const logForm = document.getElementById('log-weight-form');
    if (logForm) {
      logForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('new-weight-val');
        if (!input || !input.value) return;

        const val = parseFloat(input.value);
        const weekNum = weightHistory.length + 1;
        weightHistory.push({ date: `Week ${weekNum}`, weight: val });

        window.PlatePilotStorage.set('platepilot_weight_history', weightHistory);
        
        // Also update profile weight
        const profile = window.PlatePilotStorage.getProfile();
        profile.weight = val;
        window.PlatePilotStorage.saveProfile(profile);

        if (window.AppCharts) {
          window.AppCharts.renderWeightHistory('weight-history-canvas', weightHistory);
        }

        input.value = '';
        window.App.showToast(`Logged weight ${val} kg for Week ${weekNum}!`, 'success');
      });
    }
  }
};

window.NutritionPage = NutritionPage;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('nutr-cal-actual')) {
    NutritionPage.init();
  }
});
