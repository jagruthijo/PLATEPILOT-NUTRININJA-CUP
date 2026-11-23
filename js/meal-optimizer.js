/**
 * PlatePilot - Smart Budget Meal Optimizer
 * Greedy + Knapsack-inspired Multi-Objective Optimization Algorithm
 * Balances: Daily Budget <= Target, Protein Maximization, Calorie Matching, 
 * Dietary Filters, Allergen Avoidance, and Ingredient Variety.
 */

const MealOptimizer = {
  /**
   * Filter recipes based on dietary preferences and allergies
   */
  filterEligibleRecipes(recipes, dietPreference, allergies = [], disliked = []) {
    return recipes.filter(recipe => {
      // 1. Dietary filter
      if (dietPreference === 'vegan' && recipe.diet !== 'vegan') {
        return false;
      }
      if (dietPreference === 'veg' && recipe.diet === 'non-veg') {
        return false;
      }
      // non-veg accepts all (veg, vegan, non-veg)

      // 2. Allergen check
      if (allergies && allergies.length > 0) {
        const hasAllergen = recipe.ingredients.some(ing => 
          allergies.some(allergy => ing.name.toLowerCase().includes(allergy.toLowerCase()) || ing.id.includes(allergy.toLowerCase()))
        );
        if (hasAllergen) return false;
      }

      // 3. Disliked ingredients
      if (disliked && disliked.length > 0) {
        const hasDisliked = recipe.ingredients.some(ing => 
          disliked.some(dis => ing.name.toLowerCase().includes(dis.toLowerCase()) || ing.id.includes(dis.toLowerCase()))
        );
        if (hasDisliked) return false;
      }

      return true;
    });
  },

  /**
   * Main Meal Plan Generation Algorithm
   */
  generateDailyPlan(options = {}) {
    const profile = window.PlatePilotStorage ? window.PlatePilotStorage.getProfile() : {};
    const budget = options.budget || profile.dailyBudget || 120;
    const targetCalories = options.targetCalories || profile.targetCalories || 2100;
    const targetProtein = options.targetProtein || profile.targetProtein || 110;
    const dietPreference = options.dietPreference || profile.dietPreference || 'non-veg';
    const allergies = options.allergies || profile.allergies || [];
    const disliked = options.disliked || profile.dislikedIngredients || [];
    const pinnedMeals = options.pinnedMeals || {}; // e.g. { breakfast: 'rec_01' }

    const allRecipes = window.RECIPES_DATA || [];
    const eligible = this.filterEligibleRecipes(allRecipes, dietPreference, allergies, disliked);

    // Group by category
    const breakfastPool = pinnedMeals.breakfast 
      ? eligible.filter(r => r.id === pinnedMeals.breakfast) 
      : eligible.filter(r => r.category === 'breakfast');

    const lunchPool = pinnedMeals.lunch 
      ? eligible.filter(r => r.id === pinnedMeals.lunch) 
      : eligible.filter(r => r.category === 'lunch');

    const snackPool = pinnedMeals.snack 
      ? eligible.filter(r => r.id === pinnedMeals.snack) 
      : eligible.filter(r => r.category === 'snack');

    const dinnerPool = pinnedMeals.dinner 
      ? eligible.filter(r => r.id === pinnedMeals.dinner) 
      : eligible.filter(r => r.category === 'dinner');

    // Fallbacks if pools are empty due to tight filters
    const bList = breakfastPool.length ? breakfastPool : eligible.slice(0, 3);
    const lList = lunchPool.length ? lunchPool : eligible.slice(0, 3);
    const sList = snackPool.length ? snackPool : eligible.slice(0, 3);
    const dList = dinnerPool.length ? dinnerPool : eligible.slice(0, 3);

    let bestPlan = null;
    let bestScore = -Infinity;
    let closestFeasiblePlan = null;
    let minOverBudgetDiff = Infinity;

    // Multi-objective Knapsack Exploration
    for (const b of bList) {
      for (const l of lList) {
        for (const s of sList) {
          for (const d of dList) {
            const totalCost = b.price + l.price + s.price + d.price;
            const totalCalories = b.calories + l.calories + s.calories + d.calories;
            const totalProtein = b.protein + l.protein + s.protein + d.protein;
            const totalCarbs = b.carbs + l.carbs + s.carbs + d.carbs;
            const totalFats = b.fat + l.fat + s.fat + d.fat;

            // Repetition check (penalize identical main sources e.g. 2 soya or 3 eggs)
            let repetitionPenalty = 0;
            const mealIds = [b.id, l.id, s.id, d.id];
            if (new Set(mealIds).size < 4) repetitionPenalty += 150;

            const namesCombined = `${b.name} ${l.name} ${s.name} ${d.name}`.toLowerCase();
            const soyaOccurrences = (namesCombined.match(/soya/g) || []).length;
            if (soyaOccurrences > 1) repetitionPenalty += 40 * (soyaOccurrences - 1);

            const eggOccurrences = (namesCombined.match(/egg/g) || []).length;
            if (eggOccurrences > 2) repetitionPenalty += 30 * (eggOccurrences - 2);

            const calDiff = Math.abs(totalCalories - targetCalories);
            const proteinDiff = Math.max(0, targetProtein - totalProtein);

            // Scoring Function
            // Heavy penalty for exceeding budget
            let budgetComponent = 0;
            if (totalCost <= budget) {
              // Reward protein density and saving money within budget
              budgetComponent = (budget - totalCost) * 0.8;
            } else {
              // Hard knapsack penalty for breaking budget
              budgetComponent = - (totalCost - budget) * 25;
            }

            const score = (totalProtein * 4.0) 
                        + budgetComponent 
                        - (calDiff * 0.18) 
                        - (proteinDiff * 2.5) 
                        - repetitionPenalty;

            const candidate = {
              meals: {
                breakfast: b,
                lunch: l,
                snack: s,
                dinner: d
              },
              totals: {
                cost: totalCost,
                calories: totalCalories,
                protein: totalProtein,
                carbs: totalCarbs,
                fat: totalFats,
                fiber: b.fiber + l.fiber + s.fiber + d.fiber
              },
              score
            };

            // Track within-budget best plan
            if (totalCost <= budget) {
              if (score > bestScore) {
                bestScore = score;
                bestPlan = candidate;
              }
            } else {
              // Track closest plan if strictly under budget cannot be found
              const over = totalCost - budget;
              if (over < minOverBudgetDiff) {
                minOverBudgetDiff = over;
                closestFeasiblePlan = candidate;
              }
            }
          }
        }
      }
    }

    // Determine final plan and status explanation
    let finalResult = bestPlan;
    let isConstrained = false;
    let message = '';

    if (!finalResult) {
      finalResult = closestFeasiblePlan || {
        meals: { breakfast: bList[0], lunch: lList[0], snack: sList[0], dinner: dList[0] },
        totals: this.calculateTotals([bList[0], lList[0], sList[0], dList[0]]),
        score: 0
      };
      isConstrained = true;
      message = `Your target budget of ₹${budget} is very tight for your protein goal (${targetProtein}g). We generated the closest possible plan at ₹${finalResult.totals.cost} using affordable staples like Soya, Eggs, and Chana.`;
    } else {
      const remainingBudget = budget - finalResult.totals.cost;
      message = `Optimal meal plan generated! Utilizes ₹${finalResult.totals.cost} of your ₹${budget} daily budget (₹${remainingBudget} saved) and delivers ${finalResult.totals.protein}g protein (${finalResult.totals.calories} kcal).`;
    }

    return {
      plan: {
        breakfast: finalResult.meals.breakfast.id,
        lunch: finalResult.meals.lunch.id,
        snack: finalResult.meals.snack.id,
        dinner: finalResult.meals.dinner.id
      },
      mealObjects: finalResult.meals,
      totals: finalResult.totals,
      budget,
      remainingBudget: Math.max(0, budget - finalResult.totals.cost),
      isBudgetStrained: isConstrained,
      explanation: message
    };
  },

  /**
   * Find smart alternatives for a single meal slot (One-Click Meal Swap)
   */
  getAlternativeMeals(currentRecipeId, slot, userBudget, currentTotalCost) {
    const allRecipes = window.RECIPES_DATA || [];
    const profile = window.PlatePilotStorage ? window.PlatePilotStorage.getProfile() : {};
    const eligible = this.filterEligibleRecipes(allRecipes, profile.dietPreference, profile.allergies, profile.dislikedIngredients);
    
    const currentRecipe = allRecipes.find(r => r.id === currentRecipeId) || {};
    const maxAvailableBudget = (userBudget - currentTotalCost) + (currentRecipe.price || 0);

    // Candidates in same slot (or snacks/breakfast crossover)
    let candidates = eligible.filter(r => r.id !== currentRecipeId && (r.category === slot || (slot === 'snack' && r.category === 'breakfast')));

    // Calculate delta and budget fit
    return candidates.map(recipe => {
      const priceDiff = recipe.price - (currentRecipe.price || 0);
      const proteinDiff = recipe.protein - (currentRecipe.protein || 0);
      const calDiff = recipe.calories - (currentRecipe.calories || 0);
      const fitsBudget = recipe.price <= maxAvailableBudget;

      return {
        ...recipe,
        priceDiff,
        proteinDiff,
        calDiff,
        fitsBudget
      };
    }).sort((a, b) => {
      // Prioritize alternatives that fit within the remaining daily budget and offer good protein
      if (a.fitsBudget && !b.fitsBudget) return -1;
      if (!a.fitsBudget && b.fitsBudget) return 1;
      return b.protein - a.protein;
    });
  },

  /**
   * Helper to sum macros of an array of recipes
   */
  calculateTotals(recipesArray) {
    return recipesArray.reduce((acc, r) => {
      if (!r) return acc;
      acc.cost += r.price || 0;
      acc.calories += r.calories || 0;
      acc.protein += r.protein || 0;
      acc.carbs += r.carbs || 0;
      acc.fat += r.fat || 0;
      acc.fiber += r.fiber || 0;
      return acc;
    }, { cost: 0, calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
  }
};

window.MealOptimizer = MealOptimizer;
