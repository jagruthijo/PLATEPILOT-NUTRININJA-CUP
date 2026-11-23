/**
 * PlatePilot - Smart Grocery Shopping Controller
 * Consolidates duplicate ingredients from the 7-day meal plan, calculates total quantities,
 * categorizes items, tracks purchase checkboxes, supports custom items, and persists in localStorage.
 */

const Grocery = {
  groceryList: [],

  init() {
    this.loadOrGenerateGrocery();
    this.renderGroceryList();
    this.initEventListeners();
  },

  initEventListeners() {
    // Regenerate from current 7-day plan
    const regenBtn = document.getElementById('btn-sync-grocery');
    if (regenBtn) {
      regenBtn.addEventListener('click', () => this.syncFromWeeklyPlan());
    }

    // Add custom ingredient form
    const addForm = document.getElementById('add-grocery-item-form');
    if (addForm) {
      addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.addCustomItem();
      });
    }

    // Clear completed items
    const clearBtn = document.getElementById('btn-clear-completed-grocery');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearPurchased());
    }

    // Copy to clipboard
    const copyBtn = document.getElementById('btn-copy-grocery');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => this.copyToClipboard());
    }
  },

  loadOrGenerateGrocery() {
    let saved = window.PlatePilotStorage.get('platepilot_grocery_list');
    if (!saved || saved.length === 0) {
      this.syncFromWeeklyPlan(false);
    } else {
      this.groceryList = saved;
    }
  },

  syncFromWeeklyPlan(notify = true) {
    const weeklyPlan = window.PlatePilotStorage.get('platepilot_weekly_plan');
    const allRecipes = window.RECIPES_DATA || [];
    const masterIngredients = window.DEFAULT_INGREDIENTS || [];

    // Map to aggregate by ingredient id / name
    const aggregated = {};

    // Collect all meals from the weekly plan (or fallback to today's plan x 7)
    const mealList = [];
    if (weeklyPlan) {
      Object.keys(weeklyPlan).forEach(day => {
        const dayMeals = weeklyPlan[day];
        ['breakfast', 'lunch', 'snack', 'dinner'].forEach(s => {
          if (dayMeals[s]) mealList.push(dayMeals[s]);
        });
      });
    } else {
      const todayPlan = window.PlatePilotStorage.getTodayPlan();
      ['breakfast', 'lunch', 'snack', 'dinner'].forEach(s => {
        const r = allRecipes.find(x => x.id === todayPlan.meals[s]);
        if (r) {
          // repeat 7 times for estimated week
          for (let i = 0; i < 7; i++) mealList.push(r);
        }
      });
    }

    // Consolidate duplicate ingredients
    mealList.forEach(recipe => {
      if (recipe && recipe.ingredients) {
        recipe.ingredients.forEach(ing => {
          const key = ing.id || ing.name.toLowerCase().trim();
          if (!aggregated[key]) {
            // Find category from master or default
            const master = masterIngredients.find(m => m.id === ing.id) || {};
            aggregated[key] = {
              id: key,
              name: master.name || ing.name,
              category: master.category || 'Essentials',
              qty: 0,
              unit: ing.unit || 'g',
              cost: 0,
              checked: false
            };
          }
          aggregated[key].qty += parseFloat(ing.qty) || 1;
          aggregated[key].cost += parseFloat(ing.cost) || 0;
        });
      }
    });

    this.groceryList = Object.values(aggregated);
    this.save();
    this.renderGroceryList();

    if (notify) {
      window.App.showToast('Grocery list synchronized with your weekly meal plan!', 'success');
    }
  },

  renderGroceryList() {
    const container = document.getElementById('grocery-categories-container');
    if (!container) return;

    if (this.groceryList.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 50px 20px; color: var(--text-muted);">
          <i data-lucide="shopping-cart" style="width: 48px; height: 48px; margin-bottom: 12px; opacity: 0.5;"></i>
          <h3>Your grocery list is empty</h3>
          <p>Sync from your weekly meal plan or add custom items below.</p>
        </div>
      `;
      window.App.initLucideIcons();
      this.updateSummary(0, 0, 0);
      return;
    }

    // Categories ordering
    const categories = ['Pulses & Grains', 'Dairy & Eggs', 'Vegetables', 'Meat & Poultry', 'Fruits', 'Essentials'];
    
    // Group by category
    const grouped = {};
    categories.forEach(c => grouped[c] = []);

    let totalEstimatedCost = 0;
    let totalItems = this.groceryList.length;
    let completedItems = 0;

    this.groceryList.forEach(item => {
      totalEstimatedCost += item.cost || 0;
      if (item.checked) completedItems++;
      const cat = grouped[item.category] ? item.category : 'Essentials';
      grouped[cat].push(item);
    });

    let html = '';

    categories.forEach(cat => {
      const items = grouped[cat];
      if (items.length > 0) {
        const catCost = items.reduce((sum, i) => sum + (i.cost || 0), 0);
        
        let itemsHtml = items.map(item => `
          <div class="card card-hover" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; margin-bottom: 8px; border-radius: var(--radius-md); opacity: ${item.checked ? '0.6' : '1'};">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div class="custom-checkbox ${item.checked ? 'checked' : ''}" onclick="Grocery.toggleItem('${item.id}')" style="cursor: pointer;">
                ${item.checked ? '<i data-lucide="check" style="width: 14px; height: 14px;"></i>' : ''}
              </div>
              <div>
                <span style="font-weight: 600; font-size: 0.95rem; text-decoration: ${item.checked ? 'line-through' : 'none'};">
                  ${item.name}
                </span>
                <div style="font-size: 0.78rem; color: var(--text-muted);">
                  Quantity: <strong>${Math.round(item.qty)} ${item.unit}</strong>
                </div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
              <span style="font-weight: 800; font-size: 0.95rem; color: var(--text-main);">
                ₹${Math.round(item.cost)}
              </span>
              <button class="btn btn-ghost btn-sm" onclick="Grocery.deleteItem('${item.id}')" title="Delete" style="padding: 4px; color: var(--text-muted);">
                <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
              </button>
            </div>
          </div>
        `).join('');

        html += `
          <div style="margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid var(--color-border); padding-bottom: 6px;">
              <h3 style="font-size: 1.1rem; color: var(--color-primary-forest); display: flex; align-items: center; gap: 8px;">
                <i data-lucide="layers" style="width: 18px; height: 18px;"></i>
                ${cat} (${items.length})
              </h3>
              <span style="font-weight: 700; font-size: 0.88rem; color: var(--text-muted);">Est. ₹${Math.round(catCost)}</span>
            </div>
            ${itemsHtml}
          </div>
        `;
      }
    });

    container.innerHTML = html;
    window.App.initLucideIcons();
    this.updateSummary(totalItems, completedItems, Math.round(totalEstimatedCost));
  },

  updateSummary(total, completed, totalCost) {
    const totalEl = document.getElementById('grocery-total-items');
    const completedEl = document.getElementById('grocery-completed-items');
    const costEl = document.getElementById('grocery-total-cost');
    const progressEl = document.getElementById('grocery-progress-fill');

    if (totalEl) totalEl.textContent = total;
    if (completedEl) completedEl.textContent = `${completed} bought`;
    if (costEl) costEl.textContent = `₹${totalCost}`;
    if (progressEl) {
      const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
      progressEl.style.width = `${pct}%`;
    }
  },

  toggleItem(id) {
    const item = this.groceryList.find(i => i.id === id);
    if (item) {
      item.checked = !item.checked;
      this.save();
      this.renderGroceryList();
    }
  },

  deleteItem(id) {
    this.groceryList = this.groceryList.filter(i => i.id !== id);
    this.save();
    this.renderGroceryList();
    window.App.showToast('Item removed from grocery list', 'info');
  },

  addCustomItem() {
    const nameInput = document.getElementById('custom-item-name');
    const qtyInput = document.getElementById('custom-item-qty');
    const costInput = document.getElementById('custom-item-cost');
    const catInput = document.getElementById('custom-item-category');

    if (!nameInput || !nameInput.value.trim()) return;

    const newItem = {
      id: 'custom_' + Date.now(),
      name: nameInput.value.trim(),
      category: catInput ? catInput.value : 'Essentials',
      qty: parseFloat(qtyInput ? qtyInput.value : 1) || 1,
      unit: 'servings',
      cost: parseFloat(costInput ? costInput.value : 20) || 20,
      checked: false
    };

    this.groceryList.push(newItem);
    this.save();
    this.renderGroceryList();

    nameInput.value = '';
    if (qtyInput) qtyInput.value = '';
    if (costInput) costInput.value = '';

    window.App.showToast(`Added ${newItem.name} to grocery list!`, 'success');
  },

  clearPurchased() {
    const beforeCount = this.groceryList.length;
    this.groceryList = this.groceryList.filter(i => !i.checked);
    this.save();
    this.renderGroceryList();
    const removed = beforeCount - this.groceryList.length;
    window.App.showToast(`Cleared ${removed} purchased items`, 'info');
  },

  copyToClipboard() {
    if (this.groceryList.length === 0) return;
    let text = '🛒 PlatePilot Student Grocery Checklist:\n\n';
    this.groceryList.forEach(item => {
      text += `${item.checked ? '✅' : '⬜'} ${item.name} (${Math.round(item.qty)} ${item.unit}) - ₹${Math.round(item.cost)}\n`;
    });
    navigator.clipboard.writeText(text).then(() => {
      window.App.showToast('Grocery list copied to clipboard!', 'success');
    }).catch(() => {
      window.App.showToast('List ready to copy', 'info');
    });
  },

  save() {
    window.PlatePilotStorage.set('platepilot_grocery_list', this.groceryList);
  }
};

window.Grocery = Grocery;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('grocery-categories-container')) {
    Grocery.init();
  }
});
