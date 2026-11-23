/**
 * PlatePilot - Pantry Leftover Optimizer Controller
 * Manages ingredients available in student rooms, tracks expiry, 
 * and searches recipes matching available ingredients with minimum additional purchase.
 */

const Pantry = {
  items: [],

  init() {
    this.items = window.PlatePilotStorage.getPantry();
    this.renderPantryItems();
    this.initEventListeners();
    this.findMatchingRecipes();
  },

  initEventListeners() {
    const addForm = document.getElementById('add-pantry-form');
    if (addForm) {
      addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.addPantryItem();
      });
    }

    const matchBtn = document.getElementById('btn-find-pantry-recipes');
    if (matchBtn) {
      matchBtn.addEventListener('click', () => this.findMatchingRecipes());
    }
  },

  renderPantryItems() {
    const container = document.getElementById('pantry-items-list');
    const countEl = document.getElementById('pantry-items-count');
    if (countEl) countEl.textContent = `${this.items.length} items in room`;

    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
          <i data-lucide="package-open" style="width: 42px; height: 42px; margin-bottom: 8px; opacity: 0.5;"></i>
          <p>No ingredients in your pantry yet. Add items you have in your room!</p>
        </div>
      `;
      window.App.initLucideIcons();
      return;
    }

    container.innerHTML = this.items.map(item => `
      <div class="card card-hover" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; margin-bottom: 10px; border-radius: var(--radius-md);">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 38px; height: 38px; border-radius: var(--radius-sm); background: var(--bg-card-subtle); display: flex; align-items: center; justify-content: center; color: var(--color-primary-forest);">
            <i data-lucide="package" style="width: 20px; height: 20px;"></i>
          </div>
          <div>
            <strong style="font-size: 0.95rem;">${item.name}</strong>
            <div style="font-size: 0.78rem; color: var(--text-muted);">
              Quantity: <strong>${item.qty}</strong> | Expiring in <strong>${item.expiryDays} days</strong>
            </div>
          </div>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="Pantry.deleteItem('${item.id}')" title="Remove" style="color: var(--text-muted);">
          <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
        </button>
      </div>
    `).join('');

    window.App.initLucideIcons();
  },

  addPantryItem() {
    const nameInput = document.getElementById('pantry-name-input');
    const qtyInput = document.getElementById('pantry-qty-input');
    const expiryInput = document.getElementById('pantry-expiry-input');

    if (!nameInput || !nameInput.value.trim()) return;

    const newItem = {
      id: 'pantry_' + Date.now(),
      name: nameInput.value.trim(),
      qty: qtyInput ? qtyInput.value.trim() : '1 pack',
      expiryDays: parseInt(expiryInput ? expiryInput.value : 30) || 30,
      category: 'Pantry'
    };

    this.items.push(newItem);
    window.PlatePilotStorage.savePantry(this.items);
    this.renderPantryItems();
    this.findMatchingRecipes();

    nameInput.value = '';
    if (qtyInput) qtyInput.value = '';

    window.App.showToast(`Added ${newItem.name} to pantry!`, 'success');
  },

  deleteItem(id) {
    this.items = this.items.filter(i => i.id !== id);
    window.PlatePilotStorage.savePantry(this.items);
    this.renderPantryItems();
    this.findMatchingRecipes();
    window.App.showToast('Item removed from pantry', 'info');
  },

  findMatchingRecipes() {
    const allRecipes = window.RECIPES_DATA || [];
    const pantryNames = this.items.map(i => i.name.toLowerCase());

    if (pantryNames.length === 0) return;

    // Score recipes based on available ingredients
    const scored = allRecipes.map(recipe => {
      let matchedCount = 0;
      let missingCost = 0;

      recipe.ingredients.forEach(ing => {
        const has = pantryNames.some(p => ing.name.toLowerCase().includes(p) || p.includes(ing.name.toLowerCase()));
        if (has) {
          matchedCount++;
        } else {
          missingCost += ing.cost || 0;
        }
      });

      const matchPct = Math.round((matchedCount / recipe.ingredients.length) * 100);

      return {
        ...recipe,
        matchedCount,
        totalIngs: recipe.ingredients.length,
        matchPct,
        missingCost
      };
    }).filter(r => r.matchedCount > 0)
      .sort((a, b) => b.matchPct - a.matchPct || a.missingCost - b.missingCost);

    const container = document.getElementById('pantry-matched-recipes');
    if (!container) return;

    const topMatches = scored.slice(0, 6);

    container.innerHTML = topMatches.map(r => `
      <div class="meal-card" style="margin-bottom: 16px;">
        <div class="meal-card-img-container">
          <img src="${r.image}" alt="${r.name}" class="meal-card-img" loading="lazy">
          <div class="meal-card-slot-badge">${r.category}</div>
          <div class="meal-card-price-badge">₹${r.missingCost} Extra</div>
        </div>
        <div class="meal-card-body">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="badge ${r.matchPct >= 80 ? 'badge-lime' : 'badge-gray'}">
              ${r.matchPct}% Ingredients In Room
            </span>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-success);">
              ${r.protein}g Protein
            </span>
          </div>

          <h3 class="meal-card-title">${r.name}</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 14px;">
            You have ${r.matchedCount} of ${r.totalIngs} ingredients. Only ₹${r.missingCost} needed from shop!
          </p>

          <button class="btn btn-primary btn-sm" onclick="RecipeExplorer.openRecipeModal('${r.id}')" style="width: 100%;">
            View Recipe & Missing Items
          </button>
        </div>
      </div>
    `).join('');

    window.App.initLucideIcons();
  }
};

window.Pantry = Pantry;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('pantry-items-list')) {
    Pantry.init();
  }
});
