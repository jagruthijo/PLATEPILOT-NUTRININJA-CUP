/**
 * PlatePilot - Storage Management System
 * Handles persistent localStorage data, NutriNinja Cup demo profile, and state management.
 */

const STORAGE_KEYS = {
  PROFILE: 'platepilot_profile',
  THEME: 'platepilot_theme',
  TODAY_PLAN: 'platepilot_today_plan',
  WEEKLY_PLAN: 'platepilot_weekly_plan',
  GROCERY_LIST: 'platepilot_grocery_list',
  PANTRY: 'platepilot_pantry',
  FAVORITES: 'platepilot_favorites',
  COMMUNITY_POSTS: 'platepilot_community_posts',
  WEIGHT_HISTORY: 'platepilot_weight_history',
  CUSTOM_PRICES: 'platepilot_custom_prices',
  NOTIFICATIONS: 'platepilot_notifications'
};

// NutriNinja Cup Default Demo Profile & Initial State
const DEMO_PROFILE = {
  name: 'Aarav Sharma',
  college: 'IIT Delhi (Hostel 7)',
  age: 20,
  gender: 'male',
  height: 175, // cm
  weight: 68,  // kg
  activityLevel: 'moderate', // 1.55 multiplier
  dailyBudget: 120, // ₹120 target
  dietPreference: 'non-veg', // 'veg', 'non-veg', 'vegan'
  fitnessGoal: 'muscle_gain', // 'weight_loss', 'muscle_gain', 'maintenance'
  allergies: [],
  dislikedIngredients: [],
  targetCalories: 2100,
  targetProtein: 110,
  targetCarbs: 260,
  targetFats: 65,
  dailyMealsSchedule: {
    breakfast: '08:00 AM',
    lunch: '01:30 PM',
    snack: '05:00 PM',
    dinner: '08:00 PM'
  }
};

const DEMO_TODAY_PLAN = {
  date: new Date().toISOString().split('T')[0],
  meals: {
    breakfast: 'rec_01', // Egg Bhurji with 2 Rotis - ₹35, 380 kcal, 22g P
    lunch: 'rec_13',     // Soya Chunks Curry with Rice - ₹38, 490 kcal, 31g P
    snack: 'rec_27',     // Roasted Chana with Lemon & Cucumber - ₹15, 210 kcal, 12g P
    dinner: 'rec_39'     // Dal Khichdi with Fresh Curd - ₹30, 390 kcal, 14g P
  },
  completed: {
    breakfast: true,
    lunch: false,
    snack: false,
    dinner: false
  },
  timings: {
    breakfast: '08:00 AM',
    lunch: '01:30 PM',
    snack: '05:00 PM',
    dinner: '08:00 PM'
  }
};

const DEMO_PANTRY_ITEMS = [
  { id: 'pantry_1', name: 'Roasted Chana', qty: '200g', expiryDays: 45, category: 'Pulses & Grains' },
  { id: 'pantry_2', name: 'Rolled Oats', qty: '350g', expiryDays: 60, category: 'Pulses & Grains' },
  { id: 'pantry_3', name: 'Eggs', qty: '6 pcs', expiryDays: 10, category: 'Dairy & Eggs' },
  { id: 'pantry_4', name: 'Peanut Butter', qty: '1 Jar', expiryDays: 90, category: 'Essentials' },
  { id: 'pantry_5', name: 'Onions', qty: '500g', expiryDays: 14, category: 'Vegetables' }
];

const DEMO_COMMUNITY_POSTS = [
  {
    id: 'post_1',
    author: 'Rohan Verma (NIT Trichy)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    title: 'Hostel Kettle Moong Dal Soup Hack! ₹22 for 13g Protein',
    content: 'For guys with only an electric kettle: Wash yellow moong dal, drop in kettle with water, haldi, salt and garlic. Hit boil twice. Pure velvet soup in 12 mins with zero gas stove!',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    cost: 22,
    protein: 13,
    likes: 84,
    likedByUser: false,
    date: '2 hours ago',
    tag: 'Hostel Kettle'
  },
  {
    id: 'post_2',
    author: 'Ananya Deshmukh (BITS Pilani)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    title: 'Sattu + Chaas: ₹15 Post-Workout Miracle',
    content: 'Stop spending ₹2000 on whey tubs if broke! 40g Chana Sattu stirred into cold Amul Buttermilk gave me 18g clean protein + electrolytes after gym. Sits light on stomach too.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    cost: 15,
    protein: 18,
    likes: 142,
    likedByUser: true,
    date: '1 day ago',
    tag: 'Budget Hack'
  },
  {
    id: 'post_3',
    author: 'Vikram Singh (IIT Bombay)',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    title: 'How I hit 120g protein on ₹115 daily mess budget',
    content: 'Trick is combining hostel mess meals with 2 cheap high-density boosters. Mess lunch/dinner gives ~35g protein. Adding 4 eggs (₹28) and 50g soya chunks (₹6) shoots you straight to 110-120g protein without going broke.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    cost: 115,
    protein: 120,
    likes: 219,
    likedByUser: false,
    date: '3 days ago',
    tag: 'Mess Rescue'
  }
];

const Storage = {
  // Get item with JSON parse
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error(`Error reading ${key} from localStorage`, e);
      return defaultValue;
    }
  },

  // Save item with JSON stringify
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Error saving ${key} to localStorage`, e);
      return false;
    }
  },

  // Profile operations
  getProfile() {
    return this.get(STORAGE_KEYS.PROFILE, DEMO_PROFILE);
  },

  saveProfile(profile) {
    // Recalculate BMR and TDEE if physical stats changed
    const updated = this.calculateNutritionTargets(profile);
    this.set(STORAGE_KEYS.PROFILE, updated);
    return updated;
  },

  calculateNutritionTargets(user) {
    const weight = parseFloat(user.weight) || 68;
    const height = parseFloat(user.height) || 175;
    const age = parseInt(user.age) || 20;
    const gender = user.gender || 'male';

    // Mifflin-St Jeor Formula
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr += (gender === 'male' ? 5 : -161);

    // Activity multiplier
    const activityMap = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very_active: 1.725
    };
    const multiplier = activityMap[user.activityLevel] || 1.55;
    let tdee = Math.round(bmr * multiplier);

    // Adjust for fitness goal
    let targetCalories = tdee;
    let targetProtein = Math.round(weight * 1.6); // 1.6g/kg baseline

    if (user.fitnessGoal === 'muscle_gain') {
      targetCalories += 300;
      targetProtein = Math.round(weight * 1.8); // 1.8g/kg
    } else if (user.fitnessGoal === 'weight_loss') {
      targetCalories -= 400;
      targetProtein = Math.round(weight * 1.8); // Preserve lean mass
    }

    // Protein: 4 kcal/g, Fat: 9 kcal/g, Carbs: 4 kcal/g
    const proteinCalories = targetProtein * 4;
    const targetFats = Math.round((targetCalories * 0.25) / 9);
    const fatCalories = targetFats * 9;
    const remainingCalories = Math.max(targetCalories - proteinCalories - fatCalories, 0);
    const targetCarbs = Math.round(remainingCalories / 4);

    return {
      ...user,
      calculatedBMR: Math.round(bmr),
      calculatedTDEE: tdee,
      targetCalories,
      targetProtein,
      targetCarbs,
      targetFats
    };
  },

  // Today's Meal Plan
  getTodayPlan() {
    let plan = this.get(STORAGE_KEYS.TODAY_PLAN);
    if (!plan) {
      plan = DEMO_TODAY_PLAN;
      this.set(STORAGE_KEYS.TODAY_PLAN, plan);
    }
    return plan;
  },

  saveTodayPlan(plan) {
    this.set(STORAGE_KEYS.TODAY_PLAN, plan);
    // Also trigger custom event for listeners
    window.dispatchEvent(new CustomEvent('platepilot_plan_updated', { detail: plan }));
    return plan;
  },

  // Mark meal completed
  toggleMealCompletion(mealKey) {
    const plan = this.getTodayPlan();
    if (plan.completed && plan.completed[mealKey] !== undefined) {
      plan.completed[mealKey] = !plan.completed[mealKey];
      this.saveTodayPlan(plan);
      return plan.completed[mealKey];
    }
    return false;
  },

  // Swap specific meal
  swapMeal(mealSlot, newRecipeId) {
    const plan = this.getTodayPlan();
    if (plan.meals && plan.meals[mealSlot]) {
      plan.meals[mealSlot] = newRecipeId;
      this.saveTodayPlan(plan);
      return true;
    }
    return false;
  },

  // Pantry
  getPantry() {
    return this.get(STORAGE_KEYS.PANTRY, DEMO_PANTRY_ITEMS);
  },

  savePantry(items) {
    return this.set(STORAGE_KEYS.PANTRY, items);
  },

  // Community Posts
  getCommunityPosts() {
    return this.get(STORAGE_KEYS.COMMUNITY_POSTS, DEMO_COMMUNITY_POSTS);
  },

  saveCommunityPosts(posts) {
    return this.set(STORAGE_KEYS.COMMUNITY_POSTS, posts);
  },

  // Favorites
  getFavorites() {
    return this.get(STORAGE_KEYS.FAVORITES, ['rec_01', 'rec_13', 'rec_27', 'rec_39']);
  },

  toggleFavorite(recipeId) {
    let favs = this.getFavorites();
    if (favs.includes(recipeId)) {
      favs = favs.filter(id => id !== recipeId);
    } else {
      favs.push(recipeId);
    }
    this.set(STORAGE_KEYS.FAVORITES, favs);
    return favs.includes(recipeId);
  },

  // Reset to original Demo
  resetToDemo() {
    this.set(STORAGE_KEYS.PROFILE, DEMO_PROFILE);
    this.set(STORAGE_KEYS.TODAY_PLAN, DEMO_TODAY_PLAN);
    this.set(STORAGE_KEYS.PANTRY, DEMO_PANTRY_ITEMS);
    this.set(STORAGE_KEYS.COMMUNITY_POSTS, DEMO_COMMUNITY_POSTS);
    this.set(STORAGE_KEYS.FAVORITES, ['rec_01', 'rec_13', 'rec_27', 'rec_39']);
    this.set(STORAGE_KEYS.WEIGHT_HISTORY, [
      { date: 'Week 1', weight: 66.5 },
      { date: 'Week 2', weight: 67.0 },
      { date: 'Week 3', weight: 67.4 },
      { date: 'Week 4', weight: 68.0 }
    ]);
    // Clear generated weekly and grocery
    localStorage.removeItem(STORAGE_KEYS.WEEKLY_PLAN);
    localStorage.removeItem(STORAGE_KEYS.GROCERY_LIST);
    console.log('PlatePilot demo data reset successfully.');
  },

  // Initialize on first visit
  initDefaults() {
    if (!localStorage.getItem(STORAGE_KEYS.PROFILE)) {
      this.resetToDemo();
    }
  }
};

// Initialize default storage immediately
Storage.initDefaults();
window.PlatePilotStorage = Storage;
