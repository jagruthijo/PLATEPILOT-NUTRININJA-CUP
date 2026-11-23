/**
 * PlatePilot - Recipe Explorer & Detailed Cost Breakdown Controller
 * Renders 52+ authentic Indian recipes, filters, search, favorites, 
 * and detailed ingredient price breakdown modal.
 */

const RecipeExplorer = {
  activeCategory: 'all',
  activeSort: 'default',
  searchQuery: '',
  recipes: [],

  init() {
    this.recipes = window.RECIPES_DATA || [];
    this.parseQueryParams();
    this.renderCategoryPills();
    this.initEventListeners();
    this.filterAndRenderRecipes();
  },

  parseQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');
    if (search) {
      this.searchQuery = search.toLowerCase();
      const searchInput = document.getElementById('recipes-search-input');
      if (searchInput) searchInput.value = search;
    }
    const cat = params.get('category');
    if (cat) this.activeCategory = cat;
  },

  initEventListeners() {
    // Search input
    const searchInput = document.getElementById('recipes-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.filterAndRenderRecipes();
      });
    }

    // Sort select
    const sortSelect = document.getElementById('recipes-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.activeSort = e.target.value;
        this.filterAndRenderRecipes();
      });
    }

    // Modal close
    const closeModalBtn = document.getElementById('btn-close-recipe-modal');
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        window.App.closeModal('recipe-detail-modal');
      });
    }
  },

  renderCategoryPills() {
    const categories = [
      { id: 'all', label: 'All Recipes' },
      { id: 'breakfast', label: 'Breakfast' },
      { id: 'lunch', label: 'Lunch' },
      { id: 'snack', label: 'Snacks' },
      { id: 'dinner', label: 'Dinner' },
      { id: 'high_protein', label: 'High Protein (>=20g)' },
      { id: 'budget_30', label: 'Under ₹30' },
      { id: 'veg', label: 'Vegetarian' },
      { id: 'non_veg', label: 'Non-Vegetarian' },
      { id: 'vegan', label: '100% Vegan' },
      { id: 'favorites', label: 'My Favorites ❤️' }
    ];

    const container = document.getElementById('recipe-category-pills');
    if (!container) return;

    container.innerHTML = categories.map(c => `
      <button class="btn btn-sm ${this.activeCategory === c.id ? 'btn-primary' : 'btn-outline'}" 
              onclick="RecipeExplorer.setCategory('${c.id}')" style="border-radius: var(--radius-full);">
        ${c.label}
      </button>
    `).join('');
  },

  setCategory(catId) {
    this.activeCategory = catId;
    this.renderCategoryPills();
    this.filterAndRenderRecipes();
  },

  filterAndRenderRecipes() {
    let filtered = [...this.recipes];
    const favorites = window.PlatePilotStorage.getFavorites();

    // 1. Category Filter
    if (this.activeCategory === 'breakfast') filtered = filtered.filter(r => r.category === 'breakfast');
    else if (this.activeCategory === 'lunch') filtered = filtered.filter(r => r.category === 'lunch');
    else if (this.activeCategory === 'snack') filtered = filtered.filter(r => r.category === 'snack');
    else if (this.activeCategory === 'dinner') filtered = filtered.filter(r => r.category === 'dinner');
    else if (this.activeCategory === 'high_protein') filtered = filtered.filter(r => r.protein >= 20);
    else if (this.activeCategory === 'budget_30') filtered = filtered.filter(r => r.price <= 30);
    else if (this.activeCategory === 'veg') filtered = filtered.filter(r => r.diet === 'veg' || r.diet === 'vegan');
    else if (this.activeCategory === 'non_veg') filtered = filtered.filter(r => r.diet === 'non-veg');
    else if (this.activeCategory === 'vegan') filtered = filtered.filter(r => r.diet === 'vegan');
    else if (this.activeCategory === 'favorites') filtered = filtered.filter(r => favorites.includes(r.id));

    // 2. Search Query Filter
    if (this.searchQuery) {
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(this.searchQuery) ||
        r.description.toLowerCase().includes(this.searchQuery) ||
        r.ingredients.some(ing => ing.name.toLowerCase().includes(this.searchQuery)) ||
        (r.tags && r.tags.some(t => t.toLowerCase().includes(this.searchQuery)))
      );
    }

    // 3. Sorting
    if (this.activeSort === 'price_asc') filtered.sort((a, b) => a.price - b.price);
    else if (this.activeSort === 'price_desc') filtered.sort((a, b) => b.price - a.price);
    else if (this.activeSort === 'protein_desc') filtered.sort((a, b) => b.protein - a.protein);
    else if (this.activeSort === 'calories_asc') filtered.sort((a, b) => a.calories - b.calories);

    // 4. Render Grid
    const grid = document.getElementById('recipes-grid');
    const countEl = document.getElementById('recipes-count');
    if (countEl) countEl.textContent = `Showing ${filtered.length} recipes`;

    if (!grid) return;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <i data-lucide="utensils" style="width: 48px; height: 48px; margin-bottom: 12px; opacity: 0.5;"></i>
          <h3>No matching recipes found</h3>
          <p>Try clearing filters or search terms.</p>
          <button class="btn btn-outline btn-sm" onclick="RecipeExplorer.setCategory('all')" style="margin-top: 14px;">
            Reset Filters
          </button>
        </div>
      `;
      window.App.initLucideIcons();
      return;
    }

    grid.innerHTML = filtered.map(recipe => {
      const isFav = favorites.includes(recipe.id);
      let dietBadge = recipe.diet === 'veg' ? 'badge-veg' : recipe.diet === 'non-veg' ? 'badge-nonveg' : 'badge-vegan';

      return `
        <div class="meal-card">
          <div class="meal-card-img-container" onclick="RecipeExplorer.openRecipeModal('${recipe.id}')" style="cursor: pointer;">
            <img src="${recipe.image}" alt="${recipe.name}" class="meal-card-img" loading="lazy">
            <div class="meal-card-slot-badge">
              ${recipe.category}
            </div>
            <div class="meal-card-price-badge">₹${recipe.price}</div>
            <button class="btn btn-icon" onclick="event.stopPropagation(); RecipeExplorer.toggleFav('${recipe.id}')" 
                    style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.5); color: ${isFav ? '#FF5252' : '#FFF'}; border: none;">
              <i data-lucide="heart" style="fill: ${isFav ? '#FF5252' : 'none'}; width: 16px; height: 16px;"></i>
            </button>
          </div>
          <div class="meal-card-body">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span class="badge ${dietBadge}">
                ${recipe.diet.toUpperCase()}
              </span>
              <span style="font-size: 0.76rem; color: var(--text-muted); font-weight: 600;">
                <i data-lucide="timer" style="width: 14px; height: 14px; display: inline;"></i> ${recipe.prepTime} mins
              </span>
            </div>

            <h3 class="meal-card-title" onclick="RecipeExplorer.openRecipeModal('${recipe.id}')" style="cursor: pointer;">
              ${recipe.name}
            </h3>

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
              <button class="btn btn-outline btn-sm" onclick="RecipeExplorer.openRecipeModal('${recipe.id}')" style="flex: 1;">
                <i data-lucide="info"></i> Cost Breakdown
              </button>
              <button class="btn btn-lime btn-sm" onclick="RecipeExplorer.addMealToToday('${recipe.id}', '${recipe.category}')">
                <i data-lucide="plus"></i> Add
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    window.App.initLucideIcons();
  },

  toggleFav(recipeId) {
    const isNowFav = window.PlatePilotStorage.toggleFavorite(recipeId);
    this.filterAndRenderRecipes();
    window.App.showToast(isNowFav ? 'Added to favorites!' : 'Removed from favorites', 'info');
  },

  addMealToToday(recipeId, category) {
    const slot = category === 'snack' ? 'snack' : category;
    window.PlatePilotStorage.swapMeal(slot, recipeId);
    window.App.showToast(`Added to today's ${slot}!`, 'success');
  },

  /* ==================== RECIPE DETAIL & COST BREAKDOWN MODAL ==================== */
  openRecipeModal(recipeId) {
    const recipe = this.recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    const modalTitle = document.getElementById('recipe-modal-title');
    const modalImage = document.getElementById('recipe-modal-image');
    const modalContent = document.getElementById('recipe-modal-content');

    if (modalTitle) modalTitle.textContent = recipe.name;
    if (modalImage) modalImage.src = recipe.image;

    // Calculate ingredient breakdown table
    let ingredientRows = recipe.ingredients.map(ing => `
      <tr>
        <td><strong>${ing.name}</strong></td>
        <td>${ing.qty} ${ing.unit}</td>
        <td style="text-align: right; font-weight: 700; color: var(--color-primary-forest);">₹${ing.cost}</td>
      </tr>
    `).join('');

    let instructionsList = recipe.instructions.map((step, idx) => `
      <li style="margin-bottom: 8px; line-height: 1.45;">
        <strong style="color: var(--color-primary-forest);">Step ${idx + 1}:</strong> ${step}
      </li>
    `).join('');

    modalContent.innerHTML = `
      <!-- Macros Bar -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; background: var(--bg-card-subtle); padding: 12px; border-radius: var(--radius-md); margin-bottom: 20px; text-align: center;">
        <div>
          <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Cost</span>
          <div style="font-size: 1.25rem; font-weight: 800; color: var(--color-primary-forest);">₹${recipe.price}</div>
        </div>
        <div>
          <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Protein</span>
          <div style="font-size: 1.25rem; font-weight: 800; color: var(--color-success);">${recipe.protein}g</div>
        </div>
        <div>
          <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Calories</span>
          <div style="font-size: 1.25rem; font-weight: 800; color: var(--text-main);">${recipe.calories} kcal</div>
        </div>
        <div>
          <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Time</span>
          <div style="font-size: 1.25rem; font-weight: 800; color: var(--text-main);">${recipe.prepTime}m</div>
        </div>
      </div>

      <!-- Itemized Cost Breakdown Table -->
      <h4 style="margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
        <i data-lucide="receipt" style="width: 18px; height: 18px; color: var(--color-primary-forest);"></i>
        Realistic Ingredient Cost Breakdown
      </h4>
      <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 10px;">
        Estimated 2024-2026 Indian kirana & street vendor prices for hostel cooking.
      </p>

      <table class="cost-table">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Portion</th>
            <th style="text-align: right;">Est. Price</th>
          </tr>
        </thead>
        <tbody>
          ${ingredientRows}
          <tr class="total-row">
            <td colspan="2"><strong>Total Meal Recipe Cost</strong></td>
            <td style="text-align: right;">₹${recipe.price}</td>
          </tr>
        </tbody>
      </table>

      <!-- Cooking Instructions -->
      <h4 style="margin: 20px 0 10px; display: flex; align-items: center; gap: 8px;">
        <i data-lucide="chef-hat" style="width: 18px; height: 18px; color: var(--color-primary-forest);"></i>
        Preparation Steps
      </h4>
      <ol style="padding-left: 20px; font-size: 0.88rem; margin-bottom: 20px;">
        ${instructionsList}
      </ol>

      <!-- Hostel Student Hack -->
      <div style="background: rgba(184, 233, 134, 0.2); border: 1px solid rgba(184, 233, 134, 0.4); border-radius: var(--radius-md); padding: 14px 18px; display: flex; gap: 12px; align-items: flex-start;">
        <i data-lucide="zap" style="color: var(--color-primary-forest); flex-shrink: 0; margin-top: 2px;"></i>
        <div>
          <strong style="color: var(--color-primary-forest); font-size: 0.9rem;">Hostel Room Hack:</strong>
          <p style="font-size: 0.84rem; margin-top: 2px; color: var(--text-main);">${recipe.hostelHack}</p>
        </div>
      </div>
    `;

    window.App.openModal('recipe-detail-modal');
  }
};

window.RecipeExplorer = RecipeExplorer;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('recipes-grid')) {
    RecipeExplorer.init();
  }
});
