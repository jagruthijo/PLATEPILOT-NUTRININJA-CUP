/**
 * PlatePilot - Ingredient Master Database
 * Realistic 2024-2026 Indian kirana & street market pricing (INR)
 * Unit prices can be customized by the user in settings.
 */

const DEFAULT_INGREDIENTS = [
  // Proteins & Dairy
  { id: 'egg', name: 'Eggs', category: 'Dairy & Eggs', unit: 'pcs', unitPrice: 7.0, defaultServing: 2, proteinPer100: 13.0, calPer100: 143 },
  { id: 'soya_chunks', name: 'Soya Chunks', category: 'Pulses & Grains', unit: 'g', unitPrice: 0.12, defaultServing: 50, proteinPer100: 52.0, calPer100: 345 },
  { id: 'paneer', name: 'Paneer (Cottage Cheese)', category: 'Dairy & Eggs', unit: 'g', unitPrice: 0.38, defaultServing: 80, proteinPer100: 18.0, calPer100: 265 },
  { id: 'tofu', name: 'Tofu', category: 'Dairy & Eggs', unit: 'g', unitPrice: 0.30, defaultServing: 100, proteinPer100: 15.0, calPer100: 144 },
  { id: 'chicken_breast', name: 'Chicken Breast / Curry Cut', category: 'Meat & Poultry', unit: 'g', unitPrice: 0.24, defaultServing: 150, proteinPer100: 27.0, calPer100: 165 },
  { id: 'fish_rohu', name: 'Fish (Rohu / Pangasius)', category: 'Meat & Poultry', unit: 'g', unitPrice: 0.28, defaultServing: 120, proteinPer100: 20.0, calPer100: 125 },
  { id: 'curd', name: 'Curd / Dahi', category: 'Dairy & Eggs', unit: 'g', unitPrice: 0.07, defaultServing: 150, proteinPer100: 3.5, calPer100: 61 },
  { id: 'milk', name: 'Toned Milk', category: 'Dairy & Eggs', unit: 'ml', unitPrice: 0.06, defaultServing: 200, proteinPer100: 3.2, calPer100: 58 },
  { id: 'sattu', name: 'Chana Sattu (Roasted Gram Flour)', category: 'Pulses & Grains', unit: 'g', unitPrice: 0.11, defaultServing: 50, proteinPer100: 25.0, calPer100: 380 },
  { id: 'besan', name: 'Besan (Gram Flour)', category: 'Pulses & Grains', unit: 'g', unitPrice: 0.09, defaultServing: 60, proteinPer100: 22.0, calPer100: 387 },

  // Pulses & Legumes
  { id: 'moong_dal', name: 'Moong Dal (Yellow/Split)', category: 'Pulses & Grains', unit: 'g', unitPrice: 0.13, defaultServing: 60, proteinPer100: 24.0, calPer100: 347 },
  { id: 'green_moong', name: 'Whole Green Moong (Sprouts)', category: 'Pulses & Grains', unit: 'g', unitPrice: 0.14, defaultServing: 50, proteinPer100: 24.0, calPer100: 340 },
  { id: 'toor_dal', name: 'Toor / Arhar Dal', category: 'Pulses & Grains', unit: 'g', unitPrice: 0.15, defaultServing: 60, proteinPer100: 22.0, calPer100: 343 },
  { id: 'chana_dal', name: 'Chana Dal', category: 'Pulses & Grains', unit: 'g', unitPrice: 0.10, defaultServing: 50, proteinPer100: 21.0, calPer100: 360 },
  { id: 'rajma', name: 'Rajma (Kidney Beans)', category: 'Pulses & Grains', unit: 'g', unitPrice: 0.14, defaultServing: 60, proteinPer100: 24.0, calPer100: 333 },
  { id: 'kabuli_chana', name: 'Kabuli Chana (Chickpeas)', category: 'Pulses & Grains', unit: 'g', unitPrice: 0.13, defaultServing: 60, proteinPer100: 19.0, calPer100: 364 },
  { id: 'kala_chana', name: 'Kala Chana (Brown Chickpeas)', category: 'Pulses & Grains', unit: 'g', unitPrice: 0.11, defaultServing: 60, proteinPer100: 20.0, calPer100: 360 },
  { id: 'roasted_chana', name: 'Roasted Chana (Bhuna Chana)', category: 'Pulses & Grains', unit: 'g', unitPrice: 0.16, defaultServing: 50, proteinPer100: 22.0, calPer100: 370 },
  { id: 'lobia', name: 'Lobia (Black Eyed Peas)', category: 'Pulses & Grains', unit: 'g', unitPrice: 0.12, defaultServing: 50, proteinPer100: 23.0, calPer100: 336 },

  // Grains & Staples
  { id: 'rice', name: 'Rice (Raw / Steamed)', category: 'Pulses & Grains', unit: 'g', unitPrice: 0.045, defaultServing: 75, proteinPer100: 7.0, calPer100: 360 },
  { id: 'wheat_flour', name: 'Whole Wheat Atta (Roti)', category: 'Pulses & Grains', unit: 'g', unitPrice: 0.04, defaultServing: 70, proteinPer100: 12.0, calPer100: 340 },
  { id: 'roti_prepared', name: 'Prepared Roti / Chapati', category: 'Pulses & Grains', unit: 'pcs', unitPrice: 4.0, defaultServing: 2, proteinPer100: 10.0, calPer100: 100 },
  { id: 'bread', name: 'Whole Wheat / White Bread', category: 'Pulses & Grains', unit: 'slices', unitPrice: 2.5, defaultServing: 2, proteinPer100: 8.5, calPer100: 75 },
  { id: 'rolled_oats', name: 'Rolled / Instant Oats', category: 'Pulses & Grains', unit: 'g', unitPrice: 0.15, defaultServing: 50, proteinPer100: 14.0, calPer100: 389 },
  { id: 'poha', name: 'Poha (Flattened Rice)', category: 'Pulses & Grains', unit: 'g', unitPrice: 0.06, defaultServing: 60, proteinPer100: 7.0, calPer100: 350 },
  { id: 'rava_suji', name: 'Rava / Suji (Semolina)', category: 'Pulses & Grains', unit: 'g', unitPrice: 0.05, defaultServing: 50, proteinPer100: 11.0, calPer100: 360 },
  { id: 'dalia', name: 'Broken Wheat (Dalia)', category: 'Pulses & Grains', unit: 'g', unitPrice: 0.06, defaultServing: 50, proteinPer100: 12.0, calPer100: 340 },

  // Nuts, Seeds & Oils
  { id: 'peanuts', name: 'Raw / Roasted Peanuts', category: 'Essentials', unit: 'g', unitPrice: 0.15, defaultServing: 30, proteinPer100: 26.0, calPer100: 567 },
  { id: 'cooking_oil', name: 'Mustard / Refined Oil', category: 'Essentials', unit: 'ml', unitPrice: 0.15, defaultServing: 10, proteinPer100: 0.0, calPer100: 884 },
  { id: 'ghee', name: 'Desi Ghee', category: 'Essentials', unit: 'ml', unitPrice: 0.60, defaultServing: 5, proteinPer100: 0.0, calPer100: 900 },
  { id: 'butter', name: 'Table Butter', category: 'Dairy & Eggs', unit: 'g', unitPrice: 0.50, defaultServing: 10, proteinPer100: 1.0, calPer100: 717 },
  { id: 'peanut_butter', name: 'Peanut Butter', category: 'Essentials', unit: 'g', unitPrice: 0.35, defaultServing: 25, proteinPer100: 25.0, calPer100: 588 },
  { id: 'makhana', name: 'Foxnuts (Makhana)', category: 'Essentials', unit: 'g', unitPrice: 0.70, defaultServing: 25, proteinPer100: 9.7, calPer100: 347 },

  // Vegetables & Aromatics
  { id: 'onion', name: 'Onion', category: 'Vegetables', unit: 'g', unitPrice: 0.035, defaultServing: 50, proteinPer100: 1.1, calPer100: 40 },
  { id: 'tomato', name: 'Tomato', category: 'Vegetables', unit: 'g', unitPrice: 0.04, defaultServing: 50, proteinPer100: 0.9, calPer100: 18 },
  { id: 'potato', name: 'Potato', category: 'Vegetables', unit: 'g', unitPrice: 0.03, defaultServing: 80, proteinPer100: 2.0, calPer100: 77 },
  { id: 'sweet_potato', name: 'Sweet Potato (Shakarkand)', category: 'Vegetables', unit: 'g', unitPrice: 0.05, defaultServing: 120, proteinPer100: 1.6, calPer100: 86 },
  { id: 'palak', name: 'Spinach (Palak)', category: 'Vegetables', unit: 'g', unitPrice: 0.04, defaultServing: 100, proteinPer100: 2.9, calPer100: 23 },
  { id: 'green_peas', name: 'Green Peas (Matar)', category: 'Vegetables', unit: 'g', unitPrice: 0.06, defaultServing: 50, proteinPer100: 5.4, calPer100: 81 },
  { id: 'cucumber', name: 'Cucumber', category: 'Vegetables', unit: 'g', unitPrice: 0.03, defaultServing: 80, proteinPer100: 0.7, calPer100: 15 },
  { id: 'green_chilli', name: 'Green Chillies & Ginger', category: 'Vegetables', unit: 'g', unitPrice: 0.08, defaultServing: 10, proteinPer100: 1.8, calPer100: 40 },
  { id: 'lemon', name: 'Lemon', category: 'Vegetables', unit: 'pcs', unitPrice: 3.0, defaultServing: 1, proteinPer100: 1.0, calPer100: 20 },
  { id: 'coriander', name: 'Fresh Coriander (Dhaniya)', category: 'Vegetables', unit: 'bunch', unitPrice: 3.0, defaultServing: 0.5, proteinPer100: 2.1, calPer100: 23 },
  { id: 'spices_salt', name: 'Spices, Salt & Haldi Allowance', category: 'Essentials', unit: 'pinch', unitPrice: 2.5, defaultServing: 1, proteinPer100: 0.0, calPer100: 15 },
  { id: 'banana', name: 'Banana', category: 'Fruits', unit: 'pcs', unitPrice: 5.0, defaultServing: 1, proteinPer100: 1.3, calPer100: 89 },
  { id: 'apple', name: 'Apple', category: 'Fruits', unit: 'pcs', unitPrice: 18.0, defaultServing: 1, proteinPer100: 0.3, calPer100: 52 },
  { id: 'sweet_corn', name: 'Sweet Corn', category: 'Vegetables', unit: 'g', unitPrice: 0.08, defaultServing: 80, proteinPer100: 3.3, calPer100: 86 }
];

window.DEFAULT_INGREDIENTS = DEFAULT_INGREDIENTS;
