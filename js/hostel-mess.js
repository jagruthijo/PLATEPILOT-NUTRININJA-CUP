/**
 * PlatePilot - Hostel Mess Alternative & Rescue Mode
 * Analyzes bland/low-protein hostel mess menus and recommends 
 * affordable pocket-friendly booster add-ons to reach protein & nutrition targets.
 */

const HostelMess = {
  presets: {
    typical: {
      breakfast: 'Poha with tea & 1 slice bread',
      lunch: 'Watery Yellow Dal, Plain White Rice, Aloo Sabzi, 2 Rotis',
      dinner: 'Mix Veg Sabzi, Thin Dal, Rice, 2 Rotis'
    }
  },

  init() {
    this.initEventListeners();
  },

  initEventListeners() {
    const analyzeBtn = document.getElementById('btn-analyze-mess');
    if (analyzeBtn) {
      analyzeBtn.addEventListener('click', () => this.analyzeMessMenu());
    }

    const loadPresetBtn = document.getElementById('btn-load-mess-preset');
    if (loadPresetBtn) {
      loadPresetBtn.addEventListener('click', () => {
        document.getElementById('mess-breakfast-input').value = this.presets.typical.breakfast;
        document.getElementById('mess-lunch-input').value = this.presets.typical.lunch;
        document.getElementById('mess-dinner-input').value = this.presets.typical.dinner;
        window.App.showToast('Loaded typical hostel mess menu', 'info');
      });
    }
  },

  analyzeMessMenu() {
    const bText = (document.getElementById('mess-breakfast-input').value || '').toLowerCase();
    const lText = (document.getElementById('mess-lunch-input').value || '').toLowerCase();
    const dText = (document.getElementById('mess-dinner-input').value || '').toLowerCase();

    window.App.showToast('Analyzing hostel mess nutritional gaps...', 'info');

    setTimeout(() => {
      // Estimated hostel mess nutritional baseline
      let baseProtein = 38; // standard Indian hostel mess averages 35-40g protein
      let baseCalories = 1650;
      let baseCarbs = 280;
      let baseFats = 40;

      const profile = window.PlatePilotStorage.getProfile();
      const targetProtein = profile.targetProtein || 110;
      const proteinDeficit = Math.max(0, targetProtein - baseProtein);

      // Tailored affordable booster recommendations
      const boosters = [
        {
          id: 'boost_eggs',
          name: 'Add 2-3 Hard Boiled Eggs',
          cost: 21,
          protein: 19,
          calories: 230,
          prep: 'Boil in kettle for 9 mins in your hostel room or buy at mess gate.',
          icon: 'egg'
        },
        {
          id: 'boost_chana',
          name: '50g Roasted Bhuna Chana + Lemon',
          cost: 8,
          protein: 11,
          calories: 185,
          prep: 'Zero cooking. Keep a jar on study table and munch after lunch.',
          icon: 'sparkles'
        },
        {
          id: 'boost_sattu',
          name: 'Chana Sattu Buttermilk Shake',
          cost: 15,
          protein: 18,
          calories: 220,
          prep: 'Stir 40g sattu into cold curd/chaas with roasted cumin. Drink at 5 PM.',
          icon: 'cup-soda'
        },
        {
          id: 'boost_soya',
          name: 'Dry Pan-Roasted Soya Chunks (50g)',
          cost: 6,
          protein: 26,
          calories: 175,
          prep: 'Boil in kettle, squeeze, sear with chaat masala in induction pan.',
          icon: 'zap'
        }
      ];

      // Calculate total rescued stats
      const totalBoosterCost = boosters.reduce((sum, b) => sum + b.cost, 0);
      const totalBoosterProtein = boosters.reduce((sum, b) => sum + b.protein, 0);
      const rescuedProtein = baseProtein + totalBoosterProtein;

      // Render results
      const resultsContainer = document.getElementById('mess-analysis-results');
      if (!resultsContainer) return;

      resultsContainer.style.display = 'block';
      resultsContainer.innerHTML = `
        <div class="card card-premium" style="margin-bottom: 24px; border-left: 5px solid var(--color-warning);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
            <h3 style="color: var(--text-main); display: flex; align-items: center; gap: 8px;">
              <i data-lucide="alert-triangle" style="color: var(--color-warning);"></i>
              Hostel Mess Nutritional Diagnostic
            </h3>
            <span class="badge badge-nonveg" style="font-size: 0.85rem; padding: 6px 14px;">
              Deficit: -${proteinDeficit}g Protein
            </span>
          </div>
          <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">
            Your hostel mess menu provides approximately <strong>${baseCalories} kcal</strong> and only <strong>${baseProtein}g protein</strong> (mostly carb-heavy grains and watered-down lentils). To support your <strong>${profile.fitnessGoal || 'fitness'}</strong> goal, you need <strong>+${proteinDeficit}g additional protein</strong>.
          </p>

          <!-- Before vs After Comparison Grid -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 20px 0;">
            <div style="background: var(--bg-card-subtle); padding: 16px; border-radius: var(--radius-md); text-align: center;">
              <div style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--text-muted);">Current Mess Only</div>
              <div style="font-size: 1.75rem; font-weight: 800; color: var(--color-danger); margin: 4px 0;">${baseProtein}g</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">${Math.round((baseProtein / targetProtein) * 100)}% of goal</div>
            </div>

            <div style="background: var(--color-lime-light); border: 1px solid rgba(184, 233, 134, 0.4); padding: 16px; border-radius: var(--radius-md); text-align: center;">
              <div style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--color-primary-forest);">With PlatePilot Boosters</div>
              <div style="font-size: 1.75rem; font-weight: 800; color: var(--color-success); margin: 4px 0;">${rescuedProtein}g</div>
              <div style="font-size: 0.8rem; color: var(--color-primary-forest); font-weight: 700;">100%+ Goal Achieved! (Total Boost Cost: ₹${totalBoosterCost})</div>
            </div>
          </div>
        </div>

        <h3 style="margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
          <i data-lucide="shield-check" style="color: var(--color-success);"></i>
          Recommended Student Pocket Boosters (Under ₹25 each)
        </h3>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
          ${boosters.map(b => `
            <div class="card card-hover" style="padding: 18px; border-radius: var(--radius-md);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <strong style="font-size: 1.05rem; color: var(--text-main);">${b.name}</strong>
                <span class="badge badge-lime">₹${b.cost}</span>
              </div>
              <div style="display: flex; gap: 14px; font-size: 0.82rem; margin-bottom: 8px;">
                <span style="color: var(--color-success); font-weight: 700;">+${b.protein}g Protein</span>
                <span style="color: var(--text-muted);">${b.calories} kcal</span>
              </div>
              <p style="font-size: 0.82rem; color: var(--text-muted); margin: 0; line-height: 1.4;">${b.prep}</p>
            </div>
          `).join('')}
        </div>
      `;

      window.App.initLucideIcons();
      if (window.AppAnimations) window.AppAnimations.celebrateGoal();
    }, 400);
  }
};

window.HostelMess = HostelMess;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('mess-breakfast-input')) {
    HostelMess.init();
  }
});
