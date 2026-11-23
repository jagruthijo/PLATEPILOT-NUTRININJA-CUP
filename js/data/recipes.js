/**
 * PlatePilot - Master Recipe Database (52 Authentic Indian Student Recipes)
 * Each recipe contains verified macros, itemized ingredient cost breakdowns, 
 * preparation time, cooking steps, and hostel hacks.
 */

const RECIPES_DATA = [
  // ==================== BREAKFAST RECIPES ====================
  {
    id: 'rec_01',
    name: 'Egg Bhurji with 2 Rotis',
    category: 'breakfast',
    diet: 'non-veg',
    price: 35,
    calories: 380,
    protein: 22,
    carbs: 38,
    fat: 14,
    fiber: 5,
    prepTime: 12,
    tags: ['High Protein', 'Student Staple', 'Quick Prep', 'Budget Champion'],
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    description: 'Spiced scrambled eggs with fresh onions, green chillies, tomatoes, and 2 soft whole wheat rotis.',
    ingredients: [
      { id: 'egg', name: 'Eggs (2 pcs)', qty: 2, unit: 'pcs', cost: 14 },
      { id: 'onion', name: 'Chopped Onion', qty: 40, unit: 'g', cost: 2 },
      { id: 'tomato', name: 'Chopped Tomato', qty: 40, unit: 'g', cost: 2 },
      { id: 'cooking_oil', name: 'Mustard / Veg Oil', qty: 5, unit: 'ml', cost: 1 },
      { id: 'green_chilli', name: 'Chillies & Dhaniya', qty: 10, unit: 'g', cost: 2 },
      { id: 'spices_salt', name: 'Salt & Turmeric', qty: 1, unit: 'pinch', cost: 2 },
      { id: 'roti_prepared', name: 'Whole Wheat Rotis', qty: 2, unit: 'pcs', cost: 12 }
    ],
    instructions: [
      'Finely chop onion, green chillies, and tomato.',
      'Heat oil in a pan or electric induction cooker. Sauté onions and chillies until golden.',
      'Add tomatoes, turmeric, salt, and red chilli powder. Cook for 2 minutes until soft.',
      'Crack 2 eggs directly into the pan, stir vigorously on medium heat until cooked.',
      'Garnish with fresh coriander and serve warm with 2 whole wheat rotis.'
    ],
    hostelHack: 'Can easily be made in an electric kettle by sauteing in 1 tsp oil on boil mode!'
  },
  {
    id: 'rec_02',
    name: 'Moong Dal Chilla with Mint Chutney',
    category: 'breakfast',
    diet: 'vegan',
    price: 28,
    calories: 320,
    protein: 18,
    carbs: 44,
    fat: 6,
    fiber: 8,
    prepTime: 15,
    tags: ['High Protein', 'Vegan', 'Budget Under ₹30', 'Gluten Free Option'],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    description: 'Golden savoury crepes made from blended soaked yellow moong dal with ginger, chillies, and cumin.',
    ingredients: [
      { id: 'moong_dal', name: 'Moong Dal (Yellow)', qty: 60, unit: 'g', cost: 8 },
      { id: 'onion', name: 'Finely Chopped Onion', qty: 30, unit: 'g', cost: 2 },
      { id: 'green_chilli', name: 'Ginger & Green Chilli', qty: 10, unit: 'g', cost: 2 },
      { id: 'cooking_oil', name: 'Oil for Drizzling', qty: 5, unit: 'ml', cost: 1 },
      { id: 'spices_salt', name: 'Jeera, Hing & Salt', qty: 1, unit: 'pinch', cost: 3 },
      { id: 'coriander', name: 'Mint Coriander Dip', qty: 1, unit: 'dip', cost: 12 }
    ],
    instructions: [
      'Soak yellow moong dal for 2 hours (or overnight in hostel room).',
      'Grind into a smooth batter with ginger, green chilli, and a splash of water.',
      'Season with salt, jeera, and hing. Stir in chopped onions.',
      'Heat a flat tawa or induction pan, pour a ladle of batter and spread thin.',
      'Drizzle a few drops of oil on edges, flip when crisp and golden on both sides.'
    ],
    hostelHack: 'If no mixer grinder, buy moong dal flour (atta) or coarse besan for 2-minute instant batter!'
  },
  {
    id: 'rec_03',
    name: 'Classic Poha with Roasted Peanuts',
    category: 'breakfast',
    diet: 'vegan',
    price: 20,
    calories: 310,
    protein: 8,
    carbs: 52,
    fat: 7,
    fiber: 4,
    prepTime: 10,
    tags: ['Quick Prep', 'Budget Under ₹30', 'Vegan', 'Easy Digestion'],
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    description: 'Fluffy flattened rice tempered with mustard seeds, crunchy roasted peanuts, turmeric, and fresh lemon.',
    ingredients: [
      { id: 'poha', name: 'Thick Poha (Flattened Rice)', qty: 65, unit: 'g', cost: 5 },
      { id: 'peanuts', name: 'Peanuts', qty: 25, unit: 'g', cost: 4 },
      { id: 'onion', name: 'Chopped Onion', qty: 40, unit: 'g', cost: 2 },
      { id: 'cooking_oil', name: 'Mustard Oil', qty: 6, unit: 'ml', cost: 1 },
      { id: 'green_chilli', name: 'Mustard seeds & Chillies', qty: 1, unit: 'pinch', cost: 2 },
      { id: 'lemon', name: 'Fresh Lemon Juice', qty: 0.5, unit: 'pcs', cost: 2 },
      { id: 'spices_salt', name: 'Turmeric & Salt', qty: 1, unit: 'pinch', cost: 4 }
    ],
    instructions: [
      'Rinse poha in a colander under running water for 30 seconds; drain completely.',
      'In a pan, heat 1 tsp oil and roast peanuts until crunchy; remove and set aside.',
      'In same oil, crackle mustard seeds, add curry leaves and chopped onions.',
      'Sauté until onions turn translucent. Add turmeric and salt.',
      'Add drained poha and roasted peanuts. Toss gently on low heat for 2 mins. Finish with lemon.'
    ],
    hostelHack: 'Takes less than 10 mins; peanuts provide essential zinc and healthy fats.'
  },
  {
    id: 'rec_04',
    name: 'Vegetable Upma with Crunchy Peanuts',
    category: 'breakfast',
    diet: 'vegan',
    price: 20,
    calories: 290,
    protein: 8,
    carbs: 48,
    fat: 7,
    fiber: 4,
    prepTime: 12,
    tags: ['Budget Under ₹30', 'Vegan', 'Quick Prep'],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    description: 'Savory roasted semolina cooked with mustard seeds, green chillies, curry leaves, and crunchy peanuts.',
    ingredients: [
      { id: 'rava_suji', name: 'Roasted Rava / Suji', qty: 55, unit: 'g', cost: 4 },
      { id: 'peanuts', name: 'Peanuts', qty: 20, unit: 'g', cost: 4 },
      { id: 'onion', name: 'Diced Onion & Veggies', qty: 40, unit: 'g', cost: 3 },
      { id: 'cooking_oil', name: 'Oil', qty: 6, unit: 'ml', cost: 1 },
      { id: 'green_chilli', name: 'Mustard seeds & Green Chilli', qty: 1, unit: 'pinch', cost: 3 },
      { id: 'spices_salt', name: 'Salt & Spices', qty: 1, unit: 'pinch', cost: 5 }
    ],
    instructions: [
      'Dry roast suji on low heat for 3-4 minutes until aromatic.',
      'In a pot, heat oil, splutter mustard seeds, sauté peanuts, onions, and chillies.',
      'Pour 2 cups of boiling water with salt.',
      'Gradually pour roasted suji in a stream while stirring continuously to prevent lumps.',
      'Cover with a lid and cook on low heat for 2 minutes until fluffy.'
    ],
    hostelHack: 'Pre-roast a 500g packet of suji once and keep in a jar. Makes breakfast in 5 mins.'
  },
  {
    id: 'rec_05',
    name: 'Bread Omelette (3 Eggs & 2 Toast)',
    category: 'breakfast',
    diet: 'non-veg',
    price: 32,
    calories: 380,
    protein: 21,
    carbs: 30,
    fat: 16,
    fiber: 3,
    prepTime: 8,
    tags: ['High Protein', 'Under 10 mins', 'Non-Veg', 'Student Favorite'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80',
    description: 'Fluffy 3-egg omelette loaded with chopped onions and chillies sandwiched between toasted bread slices.',
    ingredients: [
      { id: 'egg', name: 'Farm Fresh Eggs (3 pcs)', qty: 3, unit: 'pcs', cost: 21 },
      { id: 'bread', name: 'Whole Wheat Bread (2 slices)', qty: 2, unit: 'slices', cost: 5 },
      { id: 'onion', name: 'Finely Chopped Onion', qty: 30, unit: 'g', cost: 2 },
      { id: 'green_chilli', name: 'Green Chilli & Dhaniya', qty: 10, unit: 'g', cost: 1 },
      { id: 'cooking_oil', name: 'Oil / Butter Drizzle', qty: 5, unit: 'ml', cost: 1 },
      { id: 'spices_salt', name: 'Salt & Pepper', qty: 1, unit: 'pinch', cost: 2 }
    ],
    instructions: [
      'Whisk 3 eggs with chopped onions, chillies, salt, and black pepper until frothy.',
      'Heat oil on a pan, pour the egg mix.',
      'Place 2 bread slices into the egg while wet, flip each slice so both sides get egg coated.',
      'Once bottom is golden, flip the entire omelette with bread attached, fold edges and toast crisp.'
    ],
    hostelHack: '3 whole eggs give 18-21g of bioavailable protein for just ₹21!'
  },
  {
    id: 'rec_06',
    name: 'Masala Oats with Peanuts & Veggies',
    category: 'breakfast',
    diet: 'vegan',
    price: 22,
    calories: 310,
    protein: 11,
    carbs: 46,
    fat: 9,
    fiber: 6,
    prepTime: 8,
    tags: ['Quick Prep', 'Budget Under ₹30', 'Vegan', 'High Fiber'],
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=600&auto=format&fit=crop&q=80',
    description: 'Comforting savory rolled oats simmered with Indian spices, onions, tomatoes, and crunchy roasted peanuts.',
    ingredients: [
      { id: 'rolled_oats', name: 'Rolled / Instant Oats', qty: 50, unit: 'g', cost: 8 },
      { id: 'peanuts', name: 'Roasted Peanuts', qty: 20, unit: 'g', cost: 4 },
      { id: 'onion', name: 'Onion & Tomato', qty: 40, unit: 'g', cost: 3 },
      { id: 'cooking_oil', name: 'Oil', qty: 4, unit: 'ml', cost: 1 },
      { id: 'spices_salt', name: 'Maggi/Curry Masala & Salt', qty: 1, unit: 'pinch', cost: 4 },
      { id: 'coriander', name: 'Coriander Garnish', qty: 1, unit: 'pinch', cost: 2 }
    ],
    instructions: [
      'Heat oil in a small pot, sauté chopped onions and tomatoes with salt and curry masala.',
      'Add 1.5 cups water and bring to a rolling boil.',
      'Stir in oats and peanuts, reduce heat, simmer for 3 minutes until thick and creamy.'
    ],
    hostelHack: 'Electric kettle safe! Put oats, water, masala, and peanuts together, turn kettle on!'
  },
  {
    id: 'rec_07',
    name: 'Besan Chilla with Mint Mayo Dip',
    category: 'breakfast',
    diet: 'vegan',
    price: 24,
    calories: 280,
    protein: 13,
    carbs: 36,
    fat: 7,
    fiber: 5,
    prepTime: 10,
    tags: ['Budget Under ₹30', 'Vegan', 'High Protein', 'Gluten Free Option'],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    description: 'Protein-packed gram flour pancakes seasoned with carom seeds (ajwain), onions, and green chillies.',
    ingredients: [
      { id: 'besan', name: 'Besan (Gram Flour)', qty: 60, unit: 'g', cost: 6 },
      { id: 'onion', name: 'Onion & Green Chilli', qty: 40, unit: 'g', cost: 3 },
      { id: 'cooking_oil', name: 'Oil', qty: 5, unit: 'ml', cost: 1 },
      { id: 'spices_salt', name: 'Ajwain, Haldi, Salt', qty: 1, unit: 'pinch', cost: 4 },
      { id: 'coriander', name: 'Chutney / Dip', qty: 1, unit: 'dip', cost: 10 }
    ],
    instructions: [
      'In a bowl, mix besan with ajwain, turmeric, chopped onions, and salt.',
      'Add water slowly to form a pourable lump-free batter.',
      'Pour on hot tawa, spread into circles, cook both sides until golden brown.'
    ],
    hostelHack: 'Gram flour is shelf-stable in hostels for months and packs 22g protein per 100g.'
  },
  {
    id: 'rec_08',
    name: 'Idli (4 pcs) with Homestyle Sambar',
    category: 'breakfast',
    diet: 'vegan',
    price: 28,
    calories: 340,
    protein: 10,
    carbs: 62,
    fat: 3,
    fiber: 5,
    prepTime: 10,
    tags: ['Traditional', 'Budget Under ₹30', 'Low Fat', 'Easy Digestion'],
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    description: 'Steamed fermented rice and urad dal cakes served with aromatic lentil vegetable sambar.',
    ingredients: [
      { id: 'rice', name: 'Idli Batter / Ready Idlis', qty: 4, unit: 'pcs', cost: 16 },
      { id: 'toor_dal', name: 'Toor Dal for Sambar', qty: 30, unit: 'g', cost: 5 },
      { id: 'onion', name: 'Veggies & Onion', qty: 30, unit: 'g', cost: 3 },
      { id: 'spices_salt', name: 'Sambar Masala & Spices', qty: 1, unit: 'pinch', cost: 4 }
    ],
    instructions: [
      'Steam fermented batter in an idli stand for 10 minutes (or heat ready idlis).',
      'Boil toor dal with diced veggies, turmeric, tamarind, and sambar powder.',
      'Temper with mustard seeds and curry leaves. Pour piping hot over soft idlis.'
    ],
    hostelHack: 'Local messes and bakeries sell fresh 4-pack idlis for ₹20-25; pair with dal for cheap fuel.'
  },
  {
    id: 'rec_09',
    name: 'Sprouted Moong Chaat with Peanuts',
    category: 'breakfast',
    diet: 'vegan',
    price: 20,
    calories: 240,
    protein: 14,
    carbs: 34,
    fat: 5,
    fiber: 9,
    prepTime: 5,
    tags: ['No Cooking Required', 'High Protein', 'Budget Under ₹30', 'Superfood'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    description: 'Fresh sprouted whole moong tossed with raw onion, tomato, lemon juice, roasted peanuts, and chaat masala.',
    ingredients: [
      { id: 'green_moong', name: 'Sprouted Green Moong', qty: 70, unit: 'g', cost: 8 },
      { id: 'peanuts', name: 'Roasted Peanuts', qty: 20, unit: 'g', cost: 3 },
      { id: 'onion', name: 'Finely Chopped Onion', qty: 30, unit: 'g', cost: 2 },
      { id: 'tomato', name: 'Finely Chopped Tomato', qty: 30, unit: 'g', cost: 2 },
      { id: 'lemon', name: 'Lemon Juice & Green Chilli', qty: 1, unit: 'pcs', cost: 3 },
      { id: 'spices_salt', name: 'Chaat Masala & Rock Salt', qty: 1, unit: 'pinch', cost: 2 }
    ],
    instructions: [
      'Sprout whole moong beans in your hostel room (soak overnight, tie in cloth for 24h).',
      'In a bowl, combine sprouted moong, roasted peanuts, chopped onions, and tomatoes.',
      'Squeeze fresh lemon juice generously, sprinkle chaat masala and black salt.',
      'Toss thoroughly and enjoy crisp!'
    ],
    hostelHack: 'Zero cooking required! Perfect for rooms with no induction or hot plate.'
  },
  {
    id: 'rec_10',
    name: 'Banana Peanut Butter Oats Smoothie',
    category: 'breakfast',
    diet: 'veg',
    price: 35,
    calories: 410,
    protein: 17,
    carbs: 58,
    fat: 13,
    fiber: 7,
    prepTime: 5,
    tags: ['High Protein', 'Bulking / Muscle Gain', 'Quick Prep'],
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80',
    description: 'High-energy muscle building shake made with toned milk, ripe banana, oats, and creamy peanut butter.',
    ingredients: [
      { id: 'milk', name: 'Toned Milk', qty: 200, unit: 'ml', cost: 12 },
      { id: 'banana', name: 'Ripe Banana', qty: 1, unit: 'pcs', cost: 5 },
      { id: 'rolled_oats', name: 'Quick Oats', qty: 40, unit: 'g', cost: 6 },
      { id: 'peanut_butter', name: 'Peanut Butter', qty: 25, unit: 'g', cost: 9 },
      { id: 'spices_salt', name: 'Cinnamon or Elaichi', qty: 1, unit: 'pinch', cost: 3 }
    ],
    instructions: [
      'Soak oats in warm milk or water for 3 minutes.',
      'Blend milk, peeled banana, soaked oats, and 1 tbsp peanut butter until velvety smooth.',
      'Pour into shaker or glass and drink immediately before class.'
    ],
    hostelHack: 'If no blender, mash banana finely with a fork, shake vigorously in a protein shaker!'
  },
  {
    id: 'rec_11',
    name: 'Methi Thepla (3 pcs) with Fresh Curd',
    category: 'breakfast',
    diet: 'veg',
    price: 25,
    calories: 350,
    protein: 11,
    carbs: 48,
    fat: 11,
    fiber: 5,
    prepTime: 12,
    tags: ['Budget Under ₹30', 'Long Shelf Life', 'Vegetarian'],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    description: 'Nutritious Gujarati flatbreads infused with fresh fenugreek leaves, ajwain, turmeric, served with curd.',
    ingredients: [
      { id: 'wheat_flour', name: 'Atta & Besan Mix', qty: 65, unit: 'g', cost: 5 },
      { id: 'curd', name: 'Fresh Curd / Dahi', qty: 100, unit: 'g', cost: 7 },
      { id: 'palak', name: 'Methi / Palak Greens', qty: 30, unit: 'g', cost: 3 },
      { id: 'cooking_oil', name: 'Oil for Dough & Roasting', qty: 6, unit: 'ml', cost: 2 },
      { id: 'spices_salt', name: 'Ajwain, Haldi, Red Chilli', qty: 1, unit: 'pinch', cost: 8 }
    ],
    instructions: [
      'Knead whole wheat flour, a spoon of besan, chopped methi leaves, spices, and a dash of curd into a soft dough.',
      'Roll out into thin round theplas.',
      'Roast on a hot griddle with a smear of oil until golden spots appear.',
      'Serve with a bowl of cool fresh dahi.'
    ],
    hostelHack: 'Can stay fresh for 3-4 days without refrigeration; ideal for exam weeks!'
  },
  {
    id: 'rec_12',
    name: 'Sattu Buttermilk Drink with 2 Boiled Eggs',
    category: 'breakfast',
    diet: 'non-veg',
    price: 29,
    calories: 320,
    protein: 24,
    carbs: 22,
    fat: 12,
    fiber: 5,
    prepTime: 5,
    tags: ['High Protein', 'Bihari Superfood', 'Budget Under ₹30', 'Instant'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    description: 'Chana sattu whisked into chilled spiced chaas paired with 2 hard-boiled eggs for maximum morning protein.',
    ingredients: [
      { id: 'sattu', name: 'Roasted Chana Sattu', qty: 40, unit: 'g', cost: 5 },
      { id: 'curd', name: 'Curd for Chaas', qty: 80, unit: 'g', cost: 6 },
      { id: 'egg', name: 'Boiled Eggs (2 pcs)', qty: 2, unit: 'pcs', cost: 14 },
      { id: 'spices_salt', name: 'Roasted Jeera & Kala Namak', qty: 1, unit: 'pinch', cost: 4 }
    ],
    instructions: [
      'Whisk curd with water to make thin chaas.',
      'Add roasted chana sattu, roasted cumin powder, and black salt. Stir until lump-free.',
      'Boil 2 eggs in electric kettle for 9 mins, peel, and sprinkle black pepper.',
      'Gulp down the cooling sattu drink with eggs.'
    ],
    hostelHack: 'Gives 24g of bio-available protein for just ₹29 in 5 minutes flat!'
  },

  // ==================== LUNCH RECIPES ====================
  {
    id: 'rec_13',
    name: 'Soya Chunks Curry with Steamed Rice',
    category: 'lunch',
    diet: 'vegan',
    price: 38,
    calories: 490,
    protein: 31,
    carbs: 68,
    fat: 9,
    fiber: 9,
    prepTime: 20,
    tags: ['High Protein', 'Vegan', 'Gym Student Favorite', 'Budget Champion'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    description: 'Meaty soya chunks soaked and simmered in a rich tomato-onion-garlic masala with fluffy steamed rice.',
    ingredients: [
      { id: 'soya_chunks', name: 'Soya Chunks (50g dry)', qty: 50, unit: 'g', cost: 6 },
      { id: 'rice', name: 'Rice (raw)', qty: 75, unit: 'g', cost: 4 },
      { id: 'onion', name: 'Chopped Onion', qty: 50, unit: 'g', cost: 3 },
      { id: 'tomato', name: 'Chopped Tomato', qty: 50, unit: 'g', cost: 3 },
      { id: 'cooking_oil', name: 'Mustard Oil', qty: 8, unit: 'ml', cost: 2 },
      { id: 'green_chilli', name: 'Ginger Garlic & Chilli', qty: 15, unit: 'g', cost: 2 },
      { id: 'spices_salt', name: 'Garam Masala, Haldi, Salt', qty: 1, unit: 'pinch', cost: 8 },
      { id: 'coriander', name: 'Fresh Dhaniya', qty: 1, unit: 'pinch', cost: 10 }
    ],
    instructions: [
      'Boil soya chunks in hot water with a pinch of salt for 5 minutes. Squeeze out excess water thoroughly.',
      'Cook rice in another pot or kettle until tender.',
      'In a pan, heat mustard oil, fry onion and ginger-garlic paste until brown.',
      'Add pureed or finely diced tomatoes and spices. Cook until oil separates.',
      'Toss in squeezed soya chunks, add 1 cup water, simmer for 6 minutes until flavors infuse.',
      'Serve hot over steamed rice.'
    ],
    hostelHack: 'Soya chunks are 52% pure protein! ₹6 worth gives 26g protein, beating chicken gram-for-gram in price.'
  },
  {
    id: 'rec_14',
    name: 'Soya Chunks Bhurji with 2 Rotis',
    category: 'lunch',
    diet: 'vegan',
    price: 32,
    calories: 420,
    protein: 32,
    carbs: 48,
    fat: 8,
    fiber: 10,
    prepTime: 15,
    tags: ['High Protein', 'Vegan', 'Low Cost', 'Quick Lunch'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    description: 'Minced spiced soya granules cooked like paneer bhurji with onions, green chillies, and warm chapatis.',
    ingredients: [
      { id: 'soya_chunks', name: 'Minced Soya Granules/Chunks', qty: 55, unit: 'g', cost: 7 },
      { id: 'onion', name: 'Onion & Green Chilli', qty: 50, unit: 'g', cost: 3 },
      { id: 'tomato', name: 'Tomato', qty: 40, unit: 'g', cost: 2 },
      { id: 'cooking_oil', name: 'Oil', qty: 6, unit: 'ml', cost: 1 },
      { id: 'spices_salt', name: 'Pav Bhaji / Garam Masala', qty: 1, unit: 'pinch', cost: 7 },
      { id: 'roti_prepared', name: 'Prepared Rotis', qty: 2, unit: 'pcs', cost: 12 }
    ],
    instructions: [
      'Pulse boiled soya chunks in a mixer or chop finely with a knife to resemble minced meat.',
      'Heat oil in a pan, sauté onions and green chillies until lightly golden.',
      'Add tomatoes, turmeric, pav bhaji masala, and salt. Cook until soft.',
      'Fold in the minced soya, sauté for 3-4 minutes on medium flame.',
      'Enjoy with 2 fresh chapatis.'
    ],
    hostelHack: 'Tastes identical to mutton/egg keema when spiced with pav bhaji masala or kitchen king!'
  },
  {
    id: 'rec_15',
    name: 'Dal Tadka with Steamed Rice & Onion Salad',
    category: 'lunch',
    diet: 'vegan',
    price: 30,
    calories: 430,
    protein: 15,
    carbs: 72,
    fat: 7,
    fiber: 8,
    prepTime: 18,
    tags: ['Classic Comfort', 'Budget Under ₹30', 'Vegan', 'Hostel Standard'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    description: 'Golden yellow toor and moong lentils tempered with cumin, garlic, dry red chillies, served with basmati rice.',
    ingredients: [
      { id: 'toor_dal', name: 'Toor & Moong Dal Mix', qty: 60, unit: 'g', cost: 8 },
      { id: 'rice', name: 'Steamed Rice', qty: 75, unit: 'g', cost: 4 },
      { id: 'onion', name: 'Onion & Garlic', qty: 40, unit: 'g', cost: 3 },
      { id: 'tomato', name: 'Tomato', qty: 30, unit: 'g', cost: 2 },
      { id: 'cooking_oil', name: 'Oil / Ghee for Tadka', qty: 6, unit: 'ml', cost: 2 },
      { id: 'spices_salt', name: 'Jeera, Hing, Dry Chilli', qty: 1, unit: 'pinch', cost: 7 },
      { id: 'lemon', name: 'Onion Lemon Salad', qty: 1, unit: 'side', cost: 4 }
    ],
    instructions: [
      'Pressure cook dal with turmeric, salt, and water for 3 whistles.',
      'Cook rice until grains are fluffy.',
      'Prepare tadka: heat oil, add jeera, hing, chopped garlic, and dry red chilli.',
      'Pour sizzling tadka into the cooked dal. Serve with rice and sliced onion rings.'
    ],
    hostelHack: 'The ultimate hostel staple. Mix 50% yellow moong and 50% toor for better digestion and creaminess.'
  },
  {
    id: 'rec_16',
    name: 'Rajma Masala with Jeera Rice',
    category: 'lunch',
    diet: 'vegan',
    price: 42,
    calories: 510,
    protein: 19,
    carbs: 82,
    fat: 9,
    fiber: 14,
    prepTime: 25,
    tags: ['High Fiber', 'Vegan', 'North Indian Classic', 'Filling'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    description: 'Slow-cooked red kidney beans in aromatic Punjabi gravy paired with fragrant cumin-infused steamed rice.',
    ingredients: [
      { id: 'rajma', name: 'Red Rajma Beans (dry)', qty: 65, unit: 'g', cost: 9 },
      { id: 'rice', name: 'Jeera Rice (raw)', qty: 75, unit: 'g', cost: 4 },
      { id: 'onion', name: 'Onion, Ginger, Garlic', qty: 50, unit: 'g', cost: 4 },
      { id: 'tomato', name: 'Tomatoes', qty: 60, unit: 'g', cost: 3 },
      { id: 'cooking_oil', name: 'Mustard Oil', qty: 8, unit: 'ml', cost: 2 },
      { id: 'spices_salt', name: 'Rajma Masala & Salt', qty: 1, unit: 'pinch', cost: 8 },
      { id: 'coriander', name: 'Fresh Coriander', qty: 1, unit: 'pinch', cost: 12 }
    ],
    instructions: [
      'Soak red rajma overnight (8 hours). Pressure cook for 5-6 whistles until melt-in-mouth soft.',
      'Sauté onions, ginger, and garlic paste until deep brown.',
      'Add tomato puree and rajma masala. Cook until thick masala paste forms.',
      'Add cooked rajma along with its broth. Mash a few beans with ladle to thicken gravy.',
      'Simmer for 10 minutes. Serve over hot jeera rice.'
    ],
    hostelHack: 'Batch-cook rajma on Sunday and store in room fridge for quick lunches throughout the week.'
  },
  {
    id: 'rec_17',
    name: 'Chana Masala with 2 Whole Wheat Rotis',
    category: 'lunch',
    diet: 'vegan',
    price: 35,
    calories: 460,
    protein: 18,
    carbs: 68,
    fat: 9,
    fiber: 13,
    prepTime: 20,
    tags: ['High Protein', 'Vegan', 'Budget Under ₹40', 'Satiety Champion'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    description: 'Tender chickpeas simmered in tangy amchur-flavored dark masala with two freshly rolled chapatis.',
    ingredients: [
      { id: 'kabuli_chana', name: 'Kabuli Chana (dry)', qty: 60, unit: 'g', cost: 8 },
      { id: 'onion', name: 'Onions & Green Chilli', qty: 50, unit: 'g', cost: 3 },
      { id: 'tomato', name: 'Tomatoes', qty: 50, unit: 'g', cost: 2 },
      { id: 'cooking_oil', name: 'Oil', qty: 6, unit: 'ml', cost: 2 },
      { id: 'spices_salt', name: 'Chole Masala, Amchur, Salt', qty: 1, unit: 'pinch', cost: 8 },
      { id: 'roti_prepared', name: 'Prepared Rotis', qty: 2, unit: 'pcs', cost: 12 }
    ],
    instructions: [
      'Soak chana overnight. Pressure cook with salt and tea bag (for dark color) for 5 whistles.',
      'Make gravy with sautéed onions, tomatoes, and chole masala.',
      'Add boiled chickpeas and simmer on low for 8-10 minutes.',
      'Serve hot with 2 soft chapatis.'
    ],
    hostelHack: 'High in low-glycemic complex carbohydrates that sustain energy through 3-hour afternoon lectures.'
  },
  {
    id: 'rec_18',
    name: 'Simple Egg Curry (2 Eggs) with Rice',
    category: 'lunch',
    diet: 'non-veg',
    price: 38,
    calories: 470,
    protein: 20,
    carbs: 58,
    fat: 14,
    fiber: 4,
    prepTime: 18,
    tags: ['High Protein', 'Non-Veg', 'Easy Hostel Dinner/Lunch'],
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    description: 'Two golden pan-seared hard-boiled eggs simmered in spicy onion-tomato gravy with steamed rice.',
    ingredients: [
      { id: 'egg', name: 'Hard Boiled Eggs (2 pcs)', qty: 2, unit: 'pcs', cost: 14 },
      { id: 'rice', name: 'Rice (raw)', qty: 70, unit: 'g', cost: 4 },
      { id: 'onion', name: 'Onion & Garlic', qty: 45, unit: 'g', cost: 3 },
      { id: 'tomato', name: 'Tomato', qty: 40, unit: 'g', cost: 2 },
      { id: 'cooking_oil', name: 'Mustard Oil', qty: 8, unit: 'ml', cost: 2 },
      { id: 'spices_salt', name: 'Turmeric, Kashmiri Mirch, Salt', qty: 1, unit: 'pinch', cost: 5 },
      { id: 'coriander', name: 'Garnish & Dhaniya', qty: 1, unit: 'pinch', cost: 8 }
    ],
    instructions: [
      'Boil eggs for 9 minutes, peel and prick lightly with fork.',
      'Pan fry eggs in oil with a pinch of turmeric and chilli powder until crispy golden.',
      'In same oil, sauté onions and garlic until browned, add tomato puree and spice blend.',
      'Add 1/2 cup water, drop in fried eggs, and simmer for 5 minutes. Serve with hot rice.'
    ],
    hostelHack: 'Prick the boiled eggs before frying so the spicy curry penetrates deep into the yolks!'
  },
  {
    id: 'rec_19',
    name: 'Hostel Chicken Curry (150g) with 2 Rotis',
    category: 'lunch',
    diet: 'non-veg',
    price: 65,
    calories: 520,
    protein: 38,
    carbs: 42,
    fat: 16,
    fiber: 5,
    prepTime: 25,
    tags: ['Super High Protein', 'Non-Veg', 'Weekend Feast', 'Muscle Builder'],
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80',
    description: 'Fresh chicken cooked in rustic homestyle curry with ginger, garlic, whole spices, and two whole wheat rotis.',
    ingredients: [
      { id: 'chicken_breast', name: 'Chicken Breast / Curry Cut', qty: 150, unit: 'g', cost: 36 },
      { id: 'onion', name: 'Sliced Onions', qty: 60, unit: 'g', cost: 3 },
      { id: 'tomato', name: 'Chopped Tomato', qty: 50, unit: 'g', cost: 2 },
      { id: 'cooking_oil', name: 'Mustard Oil', qty: 8, unit: 'ml', cost: 2 },
      { id: 'green_chilli', name: 'Ginger Garlic Paste', qty: 15, unit: 'g', cost: 2 },
      { id: 'spices_salt', name: 'Chicken Masala & Whole Spices', qty: 1, unit: 'pinch', cost: 8 },
      { id: 'roti_prepared', name: 'Prepared Rotis', qty: 2, unit: 'pcs', cost: 12 }
    ],
    instructions: [
      'Heat mustard oil in a cooker or pot until smoking. Add cumin and dry red chilli.',
      'Brown sliced onions thoroughly (approx. 6 mins). Add ginger-garlic paste.',
      'Add chicken pieces and sear on high heat until the exterior turns white.',
      'Add tomatoes, chicken masala, turmeric, and salt. Cook until oil surfaces.',
      'Add 1 cup warm water, cover and cook for 10-12 minutes until tender. Serve with rotis.'
    ],
    hostelHack: 'Pool money with roommates to buy 1kg chicken at wholesale market for ₹200 (₹30-35 per huge serving).'
  },
  {
    id: 'rec_20',
    name: 'Paneer Bhurji with 2 Rotis',
    category: 'lunch',
    diet: 'veg',
    price: 55,
    calories: 460,
    protein: 26,
    carbs: 42,
    fat: 18,
    fiber: 5,
    prepTime: 12,
    tags: ['High Protein', 'Vegetarian Favorite', 'Quick Prep'],
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&auto=format&fit=crop&q=80',
    description: 'Crumbled malai paneer stir-fried with diced onions, tomatoes, capsicum, green chillies, and warm rotis.',
    ingredients: [
      { id: 'paneer', name: 'Fresh Paneer (Crumbled)', qty: 85, unit: 'g', cost: 32 },
      { id: 'onion', name: 'Onion & Green Chilli', qty: 40, unit: 'g', cost: 2 },
      { id: 'tomato', name: 'Tomato', qty: 40, unit: 'g', cost: 2 },
      { id: 'cooking_oil', name: 'Butter / Oil', qty: 6, unit: 'ml', cost: 2 },
      { id: 'spices_salt', name: 'Kasuri Methi, Haldi, Salt', qty: 1, unit: 'pinch', cost: 5 },
      { id: 'roti_prepared', name: 'Prepared Rotis', qty: 2, unit: 'pcs', cost: 12 }
    ],
    instructions: [
      'Heat butter or oil in a pan. Sauté chopped onions and chillies for 2 minutes.',
      'Add tomatoes and dry spices. Cook until juicy and fragrant.',
      'Crumble paneer with clean hands and add to pan. Toss gently for 2 minutes.',
      'Do not overcook paneer to keep it tender and moist. Rub kasuri methi on top. Serve with rotis.'
    ],
    hostelHack: 'Buy loose dairy paneer from local milk shop instead of branded packets to save ₹15 per 100g.'
  },
  {
    id: 'rec_21',
    name: 'Palak Dal with Steamed Rice',
    category: 'lunch',
    diet: 'vegan',
    price: 32,
    calories: 420,
    protein: 16,
    carbs: 68,
    fat: 7,
    fiber: 9,
    prepTime: 18,
    tags: ['Iron Rich', 'Vegan', 'Budget Under ₹35', 'Healthy Gut'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    description: 'Nutrient-packed spinach leaves cooked into creamy yellow lentils with garlic tadka and rice.',
    ingredients: [
      { id: 'moong_dal', name: 'Yellow Moong Dal', qty: 55, unit: 'g', cost: 7 },
      { id: 'palak', name: 'Fresh Chopped Palak (Spinach)', qty: 80, unit: 'g', cost: 3 },
      { id: 'rice', name: 'Steamed Rice', qty: 70, unit: 'g', cost: 4 },
      { id: 'onion', name: 'Garlic & Onion Tadka', qty: 30, unit: 'g', cost: 3 },
      { id: 'cooking_oil', name: 'Oil', qty: 6, unit: 'ml', cost: 2 },
      { id: 'spices_salt', name: 'Jeera, Hing, Haldi, Salt', qty: 1, unit: 'pinch', cost: 13 }
    ],
    instructions: [
      'Boil moong dal with finely chopped spinach, turmeric, and salt until creamy.',
      'Heat oil in a small pan, fry crushed garlic and cumin seeds until aromatic.',
      'Pour garlic tadka over the dal. Serve steaming with cooked rice.'
    ],
    hostelHack: 'Spinach provides vital iron and magnesium for mental focus during intense study sessions.'
  },
  {
    id: 'rec_22',
    name: 'Soya Chunks Pulao with Onion Raita',
    category: 'lunch',
    diet: 'veg',
    price: 40,
    calories: 480,
    protein: 30,
    carbs: 70,
    fat: 8,
    fiber: 8,
    prepTime: 20,
    tags: ['High Protein', 'One Pot Meal', 'Vegetarian', 'Hostel Hit'],
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80',
    description: 'Fragrant one-pot basmati pulao infused with whole spices, meaty soya chunks, and a cooling bowl of onion raita.',
    ingredients: [
      { id: 'soya_chunks', name: 'Soya Chunks', qty: 50, unit: 'g', cost: 6 },
      { id: 'rice', name: 'Basmati / Regular Rice', qty: 75, unit: 'g', cost: 5 },
      { id: 'curd', name: 'Curd for Raita', qty: 80, unit: 'g', cost: 6 },
      { id: 'onion', name: 'Onion & Green Chilli', qty: 45, unit: 'g', cost: 3 },
      { id: 'cooking_oil', name: 'Ghee / Oil', qty: 6, unit: 'ml', cost: 2 },
      { id: 'spices_salt', name: 'Biryani / Pulao Spices', qty: 1, unit: 'pinch', cost: 6 },
      { id: 'coriander', name: 'Mint & Salt', qty: 1, unit: 'pinch', cost: 12 }
    ],
    instructions: [
      'Boil and squeeze soya chunks.',
      'In a single pot or cooker, heat oil, add cloves, cardamom, and bay leaf.',
      'Sauté sliced onions until golden. Add soya chunks and biryani spices; roast 2 mins.',
      'Add washed rice, 1.75 cups water, and salt. Cook for 2 whistles or until water is absorbed.',
      'Mix curd with chopped onion, roasted cumin, and black salt for raita. Serve together.'
    ],
    hostelHack: 'Single pot dish means only one utensil to wash in the hostel bathroom!'
  },
  {
    id: 'rec_23',
    name: 'Curd Rice with South Indian Tadka & Peanuts',
    category: 'lunch',
    diet: 'veg',
    price: 25,
    calories: 360,
    protein: 11,
    carbs: 56,
    fat: 8,
    fiber: 3,
    prepTime: 8,
    tags: ['Budget Under ₹30', 'Probiotic Gut Health', 'Cooling', 'Quick Lunch'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    description: 'Creamy mashed rice folded with probiotic rich curd, tempered with mustard seeds, curry leaves, ginger, and crunchy peanuts.',
    ingredients: [
      { id: 'rice', name: 'Cooked Soft Rice', qty: 75, unit: 'g', cost: 4 },
      { id: 'curd', name: 'Fresh Dahi / Curd', qty: 150, unit: 'g', cost: 11 },
      { id: 'peanuts', name: 'Peanuts', qty: 20, unit: 'g', cost: 3 },
      { id: 'cooking_oil', name: 'Oil for Tadka', qty: 5, unit: 'ml', cost: 1 },
      { id: 'green_chilli', name: 'Mustard, Ginger, Curry Leaves', qty: 1, unit: 'pinch', cost: 3 },
      { id: 'spices_salt', name: 'Hing & Salt', qty: 1, unit: 'pinch', cost: 3 }
    ],
    instructions: [
      'Slightly overcook rice and mash lightly while warm.',
      'Allow rice to cool completely, then mix with fresh curd, a splash of water, and salt.',
      'Heat oil in a small ladle. Splutter mustard seeds, peanuts, ginger bits, green chilli, and curry leaves.',
      'Pour tadka over curd rice and mix gently.'
    ],
    hostelHack: 'Cures hostel mess upset stomach in 24 hours while keeping your protein and carb balance.'
  },
  {
    id: 'rec_24',
    name: 'Black Eyed Peas (Lobia) Curry with Rice',
    category: 'lunch',
    diet: 'vegan',
    price: 34,
    calories: 460,
    protein: 19,
    carbs: 76,
    fat: 7,
    fiber: 12,
    prepTime: 20,
    tags: ['High Protein', 'Vegan', 'Budget Under ₹35', 'Quick Soak'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    description: 'Savory black-eyed peas simmered in onion-tomato-garlic masala served over fluffy rice.',
    ingredients: [
      { id: 'lobia', name: 'Lobia Beans (dry)', qty: 60, unit: 'g', cost: 7 },
      { id: 'rice', name: 'Rice', qty: 70, unit: 'g', cost: 4 },
      { id: 'onion', name: 'Onion, Ginger, Garlic', qty: 45, unit: 'g', cost: 3 },
      { id: 'tomato', name: 'Tomato Puree', qty: 40, unit: 'g', cost: 2 },
      { id: 'cooking_oil', name: 'Oil', qty: 6, unit: 'ml', cost: 2 },
      { id: 'spices_salt', name: 'Garam Masala, Haldi, Salt', qty: 1, unit: 'pinch', cost: 16 }
    ],
    instructions: [
      'Lobia needs only 30 minutes of soaking unlike rajma or chana.',
      'Sauté onions and ginger garlic in oil, add tomatoes and spice powders.',
      'Add lobia and water; pressure cook for 3 whistles.',
      'Serve hot with rice.'
    ],
    hostelHack: 'Forgot to soak beans overnight? Lobia cooks tender without overnight soaking!'
  },
  {
    id: 'rec_25',
    name: 'Tofu Bhurji with 2 Multigrain Rotis',
    category: 'lunch',
    diet: 'vegan',
    price: 45,
    calories: 380,
    protein: 24,
    carbs: 42,
    fat: 12,
    fiber: 6,
    prepTime: 12,
    tags: ['100% Vegan', 'High Protein', 'Dairy Free', 'Clean Eating'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    description: 'Crumbled high-protein soy tofu stir-fried with turmeric, onions, tomatoes, and cumin seeds.',
    ingredients: [
      { id: 'tofu', name: 'Firm Tofu', qty: 120, unit: 'g', cost: 25 },
      { id: 'onion', name: 'Onion & Chilli', qty: 40, unit: 'g', cost: 2 },
      { id: 'tomato', name: 'Tomato', qty: 30, unit: 'g', cost: 2 },
      { id: 'cooking_oil', name: 'Oil', qty: 5, unit: 'ml', cost: 1 },
      { id: 'spices_salt', name: 'Haldi, Kala Namak, Jeera', qty: 1, unit: 'pinch', cost: 3 },
      { id: 'roti_prepared', name: 'Rotis', qty: 2, unit: 'pcs', cost: 12 }
    ],
    instructions: [
      'Press tofu between paper towels to remove excess moisture; crumble coarsely.',
      'Sauté cumin, chopped onions, and chillies in hot oil.',
      'Add tomatoes, turmeric, coriander powder, and black salt (kala namak gives an eggy aroma).',
      'Stir in crumbled tofu and cook for 3 minutes. Serve with rotis.'
    ],
    hostelHack: 'Ideal for lactose-intolerant students who cannot digest paneer or whey!'
  },
  {
    id: 'rec_26',
    name: 'Aloo Matar Sabzi with 3 Whole Wheat Rotis',
    category: 'lunch',
    diet: 'vegan',
    price: 28,
    calories: 410,
    protein: 11,
    carbs: 72,
    fat: 7,
    fiber: 8,
    prepTime: 15,
    tags: ['Budget Under ₹30', 'Vegan', 'Student Classic'],
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    description: 'Diced potatoes and sweet green peas cooked in a spiced cumin-coriander gravy with 3 rotis.',
    ingredients: [
      { id: 'potato', name: 'Potatoes (diced)', qty: 80, unit: 'g', cost: 3 },
      { id: 'green_peas', name: 'Green Peas (Matar)', qty: 50, unit: 'g', cost: 3 },
      { id: 'onion', name: 'Onion & Tomato', qty: 50, unit: 'g', cost: 3 },
      { id: 'cooking_oil', name: 'Oil', qty: 6, unit: 'ml', cost: 1 },
      { id: 'spices_salt', name: 'Cumin, Haldi, Coriander Masala', qty: 1, unit: 'pinch', cost: 6 },
      { id: 'roti_prepared', name: 'Fresh Rotis (3 pcs)', qty: 3, unit: 'pcs', cost: 12 }
    ],
    instructions: [
      'Sauté onions, ginger, and tomatoes in oil until fragrant.',
      'Add diced potatoes, peas, turmeric, and coriander powder.',
      'Add 1/2 cup water, cover and cook on medium flame for 10 minutes until potatoes are fork tender.',
      'Serve with 3 warm chapatis.'
    ],
    hostelHack: 'Ultra cheap comfort food costing under ₹30 for a generous 3-roti meal.'
  },

  // ==================== SNACKS RECIPES ====================
  {
    id: 'rec_27',
    name: 'Roasted Chana with Lemon & Cucumber',
    category: 'snack',
    diet: 'vegan',
    price: 15,
    calories: 210,
    protein: 12,
    carbs: 32,
    fat: 3,
    fiber: 7,
    prepTime: 3,
    tags: ['Budget Under ₹20', 'High Protein', 'No Cook', 'Desk Snack'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    description: 'Crunchy roasted Bengal gram (bhuna chana) tossed with cucumber slices, green chillies, lemon, and chaat masala.',
    ingredients: [
      { id: 'roasted_chana', name: 'Roasted Bhuna Chana', qty: 50, unit: 'g', cost: 8 },
      { id: 'cucumber', name: 'Diced Cucumber', qty: 50, unit: 'g', cost: 2 },
      { id: 'tomato', name: 'Diced Tomato', qty: 30, unit: 'g', cost: 1 },
      { id: 'lemon', name: 'Fresh Lemon Juice', qty: 0.5, unit: 'pcs', cost: 2 },
      { id: 'spices_salt', name: 'Chaat Masala & Kala Namak', qty: 1, unit: 'pinch', cost: 2 }
    ],
    instructions: [
      'Measure 50g roasted chana into a snack bowl or coffee mug.',
      'Toss in diced cucumber, tomato, green chillies.',
      'Squeeze half a lemon and sprinkle chaat masala.',
      'Shake and munch while studying.'
    ],
    hostelHack: 'The best ₹15 high-protein snack in India. Zero mess, zero cooking, 12g protein!'
  },
  {
    id: 'rec_28',
    name: 'Boiled Egg Chaat (3 Eggs)',
    category: 'snack',
    diet: 'non-veg',
    price: 26,
    calories: 250,
    protein: 19,
    carbs: 6,
    fat: 15,
    fiber: 1,
    prepTime: 8,
    tags: ['High Protein', 'Non-Veg', 'Budget Under ₹30', 'Post-Workout'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80',
    description: 'Three sliced hard-boiled eggs layered with diced onions, tomatoes, green chillies, lemon, and roasted cumin.',
    ingredients: [
      { id: 'egg', name: 'Boiled Eggs (3 pcs)', qty: 3, unit: 'pcs', cost: 21 },
      { id: 'onion', name: 'Finely Chopped Onion', qty: 25, unit: 'g', cost: 1 },
      { id: 'tomato', name: 'Finely Chopped Tomato', qty: 25, unit: 'g', cost: 1 },
      { id: 'lemon', name: 'Lemon Juice', qty: 0.5, unit: 'pcs', cost: 1 },
      { id: 'spices_salt', name: 'Roasted Jeera & Black Pepper', qty: 1, unit: 'pinch', cost: 2 }
    ],
    instructions: [
      'Boil 3 eggs in water (or kettle) for 9 minutes. Cool in cold water and peel.',
      'Slice eggs into halves or quarters and place on plate.',
      'Top with onions, tomatoes, and chopped green chillies.',
      'Drizzle fresh lemon juice and season with rock salt, cumin powder, and black pepper.'
    ],
    hostelHack: 'Outstanding post-workout snack with almost zero carbs and 19g pure protein.'
  },
  {
    id: 'rec_29',
    name: 'Peanut Chaat with Tomato & Onion',
    category: 'snack',
    diet: 'vegan',
    price: 18,
    calories: 290,
    protein: 13,
    carbs: 18,
    fat: 20,
    fiber: 5,
    prepTime: 5,
    tags: ['Budget Under ₹20', 'Vegan', 'High Protein', 'No Cook'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    description: 'Crispy roasted peanuts mixed with chopped crunchy onions, juicy tomatoes, fresh coriander, and tangy spices.',
    ingredients: [
      { id: 'peanuts', name: 'Roasted Peanuts', qty: 45, unit: 'g', cost: 7 },
      { id: 'onion', name: 'Chopped Onion', qty: 35, unit: 'g', cost: 2 },
      { id: 'tomato', name: 'Chopped Tomato', qty: 35, unit: 'g', cost: 2 },
      { id: 'lemon', name: 'Lemon Juice', qty: 1, unit: 'pcs', cost: 3 },
      { id: 'spices_salt', name: 'Chaat Masala & Green Chilli', qty: 1, unit: 'pinch', cost: 4 }
    ],
    instructions: [
      'In a bowl, mix roasted peanuts, diced onions, green chillies, and tomatoes.',
      'Add lemon juice, chaat masala, and salt.',
      'Mix with a spoon and serve immediately while peanuts remain crunchy.'
    ],
    hostelHack: 'Keeps cravings away for hours due to heart-healthy monounsaturated fats.'
  },
  {
    id: 'rec_30',
    name: 'Boiled Kala Chana Chaat',
    category: 'snack',
    diet: 'vegan',
    price: 20,
    calories: 260,
    protein: 15,
    carbs: 42,
    fat: 4,
    fiber: 11,
    prepTime: 10,
    tags: ['Super High Fiber', 'Vegan', 'Budget Under ₹20', 'High Protein'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    description: 'Tender boiled black desi chickpeas tossed with lemon juice, onions, tomatoes, and toasted cumin powder.',
    ingredients: [
      { id: 'kala_chana', name: 'Boiled Kala Chana', qty: 65, unit: 'g', cost: 7 },
      { id: 'onion', name: 'Onion & Green Chilli', qty: 35, unit: 'g', cost: 2 },
      { id: 'tomato', name: 'Tomato', qty: 35, unit: 'g', cost: 2 },
      { id: 'lemon', name: 'Lemon Juice', qty: 1, unit: 'pcs', cost: 3 },
      { id: 'spices_salt', name: 'Jeera Powder & Kala Namak', qty: 1, unit: 'pinch', cost: 6 }
    ],
    instructions: [
      'Boil pre-soaked kala chana until tender with a little salt.',
      'Drain water and transfer chana to a bowl.',
      'Add onions, tomatoes, lemon juice, and spices.',
      'Toss well and serve.'
    ],
    hostelHack: 'Kala chana is cheaper than white chickpeas and has higher fiber and iron content.'
  },
  {
    id: 'rec_31',
    name: 'Masala Soya Chunks Dry Fry',
    category: 'snack',
    diet: 'vegan',
    price: 25,
    calories: 260,
    protein: 24,
    carbs: 18,
    fat: 7,
    fiber: 8,
    prepTime: 10,
    tags: ['Mega Protein', 'Vegan', 'Gym Snack', 'Low Budget'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    description: 'Crispy pan-roasted soya nuggets tossed in chaat masala, red chilli, and a squeeze of lemon.',
    ingredients: [
      { id: 'soya_chunks', name: 'Soya Chunks', qty: 45, unit: 'g', cost: 5 },
      { id: 'cooking_oil', name: 'Oil for Searing', qty: 6, unit: 'ml', cost: 2 },
      { id: 'spices_salt', name: 'Chilli Powder, Garam Masala, Salt', qty: 1, unit: 'pinch', cost: 3 },
      { id: 'lemon', name: 'Lemon Juice', qty: 1, unit: 'pcs', cost: 3 },
      { id: 'coriander', name: 'Coriander Dip', qty: 1, unit: 'dip', cost: 12 }
    ],
    instructions: [
      'Boil soya chunks in salted water for 4 minutes. Rinse in cold water and squeeze dry.',
      'Heat 1 tsp oil in a pan, toss the soya chunks on medium-high heat until the edges turn golden crisp.',
      'Sprinkle red chilli powder, chaat masala, and salt. Toss for 1 minute.',
      'Finish with lemon juice and enjoy crunchy protein bites.'
    ],
    hostelHack: 'Gives 24g of vegetarian protein for only ₹25 — unbeatable efficiency!'
  },
  {
    id: 'rec_32',
    name: 'Paneer Tikka (Tawa Cooked) with Onion Salad',
    category: 'snack',
    diet: 'veg',
    price: 50,
    calories: 340,
    protein: 22,
    carbs: 12,
    fat: 22,
    fiber: 2,
    prepTime: 15,
    tags: ['High Protein', 'Vegetarian', 'Gourmet on a Budget'],
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&auto=format&fit=crop&q=80',
    description: 'Cubed paneer marinated in thick curd, kasuri methi, tandoori masala, and seared to smoky perfection on a tawa.',
    ingredients: [
      { id: 'paneer', name: 'Fresh Paneer Cubes', qty: 100, unit: 'g', cost: 38 },
      { id: 'curd', name: 'Thick Curd / Hung Dahi', qty: 40, unit: 'g', cost: 3 },
      { id: 'cooking_oil', name: 'Oil for Sear', qty: 5, unit: 'ml', cost: 1 },
      { id: 'spices_salt', name: 'Tandoori Masala & Salt', qty: 1, unit: 'pinch', cost: 4 },
      { id: 'lemon', name: 'Lemon & Onion Rings', qty: 1, unit: 'side', cost: 4 }
    ],
    instructions: [
      'Mix thick curd with tandoori masala, ginger paste, salt, and a dash of mustard oil.',
      'Coat paneer cubes evenly and let marinate for 10 minutes.',
      'Heat a flat tawa with minimal oil; sear paneer cubes for 2-3 minutes per side until charred.',
      'Serve with onion rings and lemon wedges.'
    ],
    hostelHack: 'Restaurant paneer tikka costs ₹200+; make it in your hostel room for ₹50.'
  },
  {
    id: 'rec_33',
    name: 'Masala Buttermilk (Chaas) with 2 Boiled Eggs',
    category: 'snack',
    diet: 'non-veg',
    price: 22,
    calories: 190,
    protein: 15,
    carbs: 6,
    fat: 10,
    fiber: 1,
    prepTime: 4,
    tags: ['Low Calorie', 'High Protein', 'Budget Under ₹25', 'Cooling'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80',
    description: 'Chilled spiced buttermilk with mint and roasted cumin paired with two protein-dense boiled eggs.',
    ingredients: [
      { id: 'egg', name: 'Boiled Eggs (2 pcs)', qty: 2, unit: 'pcs', cost: 14 },
      { id: 'curd', name: 'Fresh Curd', qty: 70, unit: 'g', cost: 5 },
      { id: 'spices_salt', name: 'Roasted Cumin, Salt & Mint', qty: 1, unit: 'pinch', cost: 3 }
    ],
    instructions: [
      'Whisk curd with 1 cup cold water, roasted jeera powder, black salt, and crushed mint.',
      'Slice 2 boiled eggs in half and sprinkle black pepper.',
      'Sip the digestive chaas while eating the eggs.'
    ],
    hostelHack: 'Low calorie snack (190 kcal) perfect for fat loss goals.'
  },
  {
    id: 'rec_34',
    name: 'Curd Bowl with Roasted Peanuts & Chia',
    category: 'snack',
    diet: 'veg',
    price: 28,
    calories: 280,
    protein: 14,
    carbs: 18,
    fat: 16,
    fiber: 4,
    prepTime: 3,
    tags: ['Vegetarian', 'Gut Friendly', 'High Protein', 'No Cook'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    description: 'Chilled creamy yogurt topped with crunchy roasted peanuts, honey drizzle, and a pinch of cinnamon.',
    ingredients: [
      { id: 'curd', name: 'Creamy Dahi / Curd', qty: 160, unit: 'g', cost: 12 },
      { id: 'peanuts', name: 'Roasted Peanuts', qty: 35, unit: 'g', cost: 5 },
      { id: 'spices_salt', name: 'Honey / Jaggery & Cinnamon', qty: 1, unit: 'pinch', cost: 11 }
    ],
    instructions: [
      'Take 1 cup of cold curd in a bowl.',
      'Top with roasted peanuts for a satisfying crunch.',
      'Drizzle half a spoon of honey or crushed jaggery and a pinch of cinnamon.'
    ],
    hostelHack: 'Tastes like gourmet Greek yogurt parfait at a fraction of the supermarket cost.'
  },
  {
    id: 'rec_35',
    name: 'Roasted Makhana (Foxnuts) with Turmeric & Salt',
    category: 'snack',
    diet: 'vegan',
    price: 25,
    calories: 180,
    protein: 5,
    carbs: 32,
    fat: 4,
    fiber: 5,
    prepTime: 5,
    tags: ['Light Snack', 'Budget Under ₹30', 'Vegan', 'Super Crunchy'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    description: 'Crispy lotus seeds roasted in a teaspoon of oil with turmeric, black pepper, and Himalayan rock salt.',
    ingredients: [
      { id: 'makhana', name: 'Foxnuts (Phool Makhana)', qty: 30, unit: 'g', cost: 21 },
      { id: 'cooking_oil', name: 'Oil / Ghee Drop', qty: 3, unit: 'ml', cost: 1 },
      { id: 'spices_salt', name: 'Turmeric, Black Pepper, Salt', qty: 1, unit: 'pinch', cost: 3 }
    ],
    instructions: [
      'Dry roast makhana on low heat for 4-5 minutes until they crush easily between two fingers.',
      'Add 1/2 tsp oil, sprinkle turmeric and rock salt.',
      'Toss for 30 seconds and let cool for maximum crunch.'
    ],
    hostelHack: 'Healthy alternative to potato chips during late-night assignment marathons.'
  },
  {
    id: 'rec_36',
    name: 'Boiled Sweet Potato Chaat',
    category: 'snack',
    diet: 'vegan',
    price: 18,
    calories: 210,
    protein: 4,
    carbs: 48,
    fat: 1,
    fiber: 6,
    prepTime: 10,
    tags: ['Complex Carbs', 'Vegan', 'Budget Under ₹20', 'Pre-Workout Fuel'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    description: 'Steamed sweet potato cubes tossed with tangy lemon juice, roasted jeera, and rock salt.',
    ingredients: [
      { id: 'sweet_potato', name: 'Sweet Potato (Shakarkand)', qty: 150, unit: 'g', cost: 8 },
      { id: 'lemon', name: 'Fresh Lemon Juice', qty: 1, unit: 'pcs', cost: 3 },
      { id: 'spices_salt', name: 'Chaat Masala, Jeera, Rock Salt', qty: 1, unit: 'pinch', cost: 7 }
    ],
    instructions: [
      'Boil sweet potato until tender. Peel and cut into bite-sized cubes.',
      'Sprinkle chaat masala, roasted cumin powder, and squeeze fresh lemon.',
      'Toss and eat warm.'
    ],
    hostelHack: 'Exceptional slow-release energy for intense workouts or morning running.'
  },
  {
    id: 'rec_37',
    name: 'Masala Boiled Sweet Corn with Lemon',
    category: 'snack',
    diet: 'vegan',
    price: 20,
    calories: 210,
    protein: 6,
    carbs: 42,
    fat: 3,
    fiber: 5,
    prepTime: 8,
    tags: ['Budget Under ₹25', 'Vegan', 'Quick Snack'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    description: 'Juicy steamed golden sweet corn kernels seasoned with butter or oil, red chilli, chaat masala, and lime.',
    ingredients: [
      { id: 'sweet_corn', name: 'Sweet Corn Kernels', qty: 100, unit: 'g', cost: 8 },
      { id: 'cooking_oil', name: 'Butter / Oil', qty: 5, unit: 'ml', cost: 2 },
      { id: 'lemon', name: 'Lime Juice', qty: 1, unit: 'pcs', cost: 3 },
      { id: 'spices_salt', name: 'Chaat Masala & Chilli Powder', qty: 1, unit: 'pinch', cost: 7 }
    ],
    instructions: [
      'Boil corn kernels in kettle or pot for 4 minutes; drain water.',
      'Stir in butter or oil while hot so it melts evenly.',
      'Add chaat masala and lime juice. Serve in cup.'
    ],
    hostelHack: 'Costs ₹20 compared to ₹80 at the mall cinema counters!'
  },
  {
    id: 'rec_38',
    name: 'Boiled Egg Sandwich (2 Eggs & Whole Wheat Bread)',
    category: 'snack',
    diet: 'non-veg',
    price: 28,
    calories: 340,
    protein: 18,
    carbs: 32,
    fat: 12,
    fiber: 4,
    prepTime: 8,
    tags: ['High Protein', 'Non-Veg', 'Easy Portable Lunch/Snack'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80',
    description: 'Mashed hard boiled eggs mixed with black pepper, mustard dip, cucumber slices inside toasted brown bread.',
    ingredients: [
      { id: 'egg', name: 'Hard Boiled Eggs (2 pcs)', qty: 2, unit: 'pcs', cost: 14 },
      { id: 'bread', name: 'Brown / Whole Wheat Bread', qty: 2, unit: 'slices', cost: 5 },
      { id: 'cucumber', name: 'Sliced Cucumber & Onion', qty: 30, unit: 'g', cost: 2 },
      { id: 'spices_salt', name: 'Black Pepper, Salt, Mayo/Curd', qty: 1, unit: 'pinch', cost: 7 }
    ],
    instructions: [
      'Boil and peel 2 eggs. Mash roughly with a fork.',
      'Season with salt, black pepper, and 1 tsp curd or mayo for creaminess.',
      'Spread onto toasted bread slice, top with cucumber slices, and close sandwich.'
    ],
    hostelHack: 'Pack in foil and take to college library for lunch.'
  },

  // ==================== DINNER RECIPES ====================
  {
    id: 'rec_39',
    name: 'Dal Khichdi with Fresh Curd & Pickle',
    category: 'dinner',
    diet: 'veg',
    price: 30,
    calories: 390,
    protein: 14,
    carbs: 64,
    fat: 7,
    fiber: 7,
    prepTime: 15,
    tags: ['Student Lifesaver', 'Comfort Food', 'Budget Under ₹30', 'Easy Digestion'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    description: 'Wholesome one-pot rice and yellow moong dal cooked with turmeric, cumin, ginger, and a side of cool curd.',
    ingredients: [
      { id: 'moong_dal', name: 'Yellow Moong Dal', qty: 40, unit: 'g', cost: 5 },
      { id: 'rice', name: 'Rice', qty: 55, unit: 'g', cost: 3 },
      { id: 'curd', name: 'Curd / Dahi', qty: 100, unit: 'g', cost: 7 },
      { id: 'cooking_oil', name: 'Ghee / Oil', qty: 6, unit: 'ml', cost: 2 },
      { id: 'spices_salt', name: 'Jeera, Hing, Haldi, Salt', qty: 1, unit: 'pinch', cost: 3 },
      { id: 'coriander', name: 'Achar / Pickle & Dhaniya', qty: 1, unit: 'side', cost: 10 }
    ],
    instructions: [
      'Wash moong dal and rice together.',
      'In a pressure cooker or electric cooker, heat oil or ghee, splutter cumin and hing.',
      'Add washed dal-rice, turmeric, salt, and 3 cups of water.',
      'Cook for 3 whistles until soft and porridge-like.',
      'Serve warm with a bowl of fresh curd and spicy mango pickle.'
    ],
    hostelHack: 'The definitive Indian comfort food. Perfect for nights when you are too tired to cook.'
  },
  {
    id: 'rec_40',
    name: 'Green Moong Dal Tadka with 2 Rotis',
    category: 'dinner',
    diet: 'vegan',
    price: 32,
    calories: 410,
    protein: 17,
    carbs: 62,
    fat: 7,
    fiber: 11,
    prepTime: 18,
    tags: ['High Protein', 'Vegan', 'Budget Under ₹35', 'Wholesome'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    description: 'Earthy green whole moong dal tempered with garlic, tomatoes, and cumin seeds served with two soft rotis.',
    ingredients: [
      { id: 'green_moong', name: 'Whole Green Moong', qty: 55, unit: 'g', cost: 8 },
      { id: 'onion', name: 'Onion & Garlic', qty: 40, unit: 'g', cost: 3 },
      { id: 'tomato', name: 'Tomato', qty: 40, unit: 'g', cost: 2 },
      { id: 'cooking_oil', name: 'Oil for Tadka', qty: 6, unit: 'ml', cost: 2 },
      { id: 'spices_salt', name: 'Cumin, Haldi, Salt', qty: 1, unit: 'pinch', cost: 5 },
      { id: 'roti_prepared', name: 'Fresh Rotis', qty: 2, unit: 'pcs', cost: 12 }
    ],
    instructions: [
      'Pressure cook green moong with 2.5 cups water, salt, and turmeric for 4 whistles.',
      'In a pan, heat oil, brown minced garlic and onions, add tomatoes.',
      'Stir cooked dal into the masala, simmer for 5 minutes.',
      'Serve with 2 whole wheat rotis.'
    ],
    hostelHack: 'Whole green moong contains intact fiber husks that keep your gut microbiome healthy.'
  },
  {
    id: 'rec_41',
    name: 'Egg Masala Roll with Mint Mayo',
    category: 'dinner',
    diet: 'non-veg',
    price: 38,
    calories: 430,
    protein: 19,
    carbs: 45,
    fat: 16,
    fiber: 4,
    prepTime: 12,
    tags: ['High Protein', 'Street Food Favorite', 'Non-Veg', 'Easy Dinner'],
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    description: 'Double egg layered whole wheat paratha wrapped around crunchy pickled onions, green chillies, and chaat masala.',
    ingredients: [
      { id: 'egg', name: 'Eggs (2 pcs)', qty: 2, unit: 'pcs', cost: 14 },
      { id: 'roti_prepared', name: 'Paratha / Large Roti', qty: 1, unit: 'pcs', cost: 8 },
      { id: 'onion', name: 'Sliced Onions & Chillies', qty: 40, unit: 'g', cost: 2 },
      { id: 'cooking_oil', name: 'Oil for Crisping', qty: 5, unit: 'ml', cost: 1 },
      { id: 'lemon', name: 'Lemon & Green Sauce', qty: 1, unit: 'dip', cost: 5 },
      { id: 'spices_salt', name: 'Chaat Masala & Pepper', qty: 1, unit: 'pinch', cost: 8 }
    ],
    instructions: [
      'Whisk 2 eggs with a pinch of salt.',
      'Pour onto hot tawa, place a chapati or paratha on top immediately so it sticks.',
      'Flip when egg is cooked, toast the roti side crisp.',
      'Transfer egg-side-up to plate, top with sliced onions, chillies, lemon, and chaat masala.',
      'Roll tightly in parchment paper and bite!'
    ],
    hostelHack: 'Kolkata street-style egg roll made healthy with whole wheat at half the vendor price.'
  },
  {
    id: 'rec_42',
    name: 'Soya Keema Roll (High Protein Vegan Wrap)',
    category: 'dinner',
    diet: 'vegan',
    price: 32,
    calories: 390,
    protein: 26,
    carbs: 48,
    fat: 8,
    fiber: 8,
    prepTime: 12,
    tags: ['High Protein', '100% Vegan', 'Student Roll', 'Budget Under ₹35'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    description: 'Juicy spiced minced soya filling rolled in whole wheat roti with onion rings and tangy lemon.',
    ingredients: [
      { id: 'soya_chunks', name: 'Soya Granules (dry)', qty: 45, unit: 'g', cost: 6 },
      { id: 'roti_prepared', name: 'Whole Wheat Roti', qty: 1, unit: 'pcs', cost: 6 },
      { id: 'onion', name: 'Sliced Onion & Capsicum', qty: 40, unit: 'g', cost: 3 },
      { id: 'tomato', name: 'Tomato paste', qty: 25, unit: 'g', cost: 2 },
      { id: 'cooking_oil', name: 'Oil', qty: 5, unit: 'ml', cost: 1 },
      { id: 'spices_salt', name: 'Tikka Masala & Salt', qty: 1, unit: 'pinch', cost: 14 }
    ],
    instructions: [
      'Boil and mince soya chunks.',
      'Sauté with onions, tomatoes, and tikka masala for 4 minutes until juicy.',
      'Spread along center of a warm chapati.',
      'Add lemon juice and crunchy onion rings; roll tightly.'
    ],
    hostelHack: 'Massive 26g plant protein in a handheld dinner you can eat while revising.'
  },
  {
    id: 'rec_43',
    name: 'Vegetable Dalia Khichdi with Curd',
    category: 'dinner',
    diet: 'veg',
    price: 26,
    calories: 330,
    protein: 12,
    carbs: 58,
    fat: 5,
    fiber: 9,
    prepTime: 15,
    tags: ['Low Calorie', 'High Fiber', 'Budget Under ₹30', 'Light Dinner'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    description: 'Broken wheat and yellow moong simmered with chopped carrots, beans, and cumin with cooling curd.',
    ingredients: [
      { id: 'dalia', name: 'Broken Wheat (Dalia)', qty: 50, unit: 'g', cost: 3 },
      { id: 'moong_dal', name: 'Yellow Moong Dal', qty: 30, unit: 'g', cost: 4 },
      { id: 'curd', name: 'Curd / Dahi', qty: 80, unit: 'g', cost: 6 },
      { id: 'onion', name: 'Onion & Green Peas', qty: 40, unit: 'g', cost: 3 },
      { id: 'cooking_oil', name: 'Ghee / Oil', qty: 5, unit: 'ml', cost: 2 },
      { id: 'spices_salt', name: 'Jeera, Haldi, Salt', qty: 1, unit: 'pinch', cost: 8 }
    ],
    instructions: [
      'Dry roast dalia for 2 minutes until nutty.',
      'In a cooker, sauté cumin, onions, and veggies in 1 tsp oil.',
      'Add dalia, moong dal, 3 cups water, and salt.',
      'Cook for 3 whistles. Serve warm with curd.'
    ],
    hostelHack: 'Broken wheat provides complex carbs that prevent midnight hunger pangs in hostel.'
  },
  {
    id: 'rec_44',
    name: 'Hostel Chicken Bhurji with 2 Rotis',
    category: 'dinner',
    diet: 'non-veg',
    price: 68,
    calories: 490,
    protein: 36,
    carbs: 38,
    fat: 16,
    fiber: 5,
    prepTime: 15,
    tags: ['Massive Protein', 'Non-Veg', 'Fitness Favorite', 'Quick Dinner'],
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80',
    description: 'Minced chicken breast stir-fried with diced onions, tomatoes, ginger, green chillies, and 2 rotis.',
    ingredients: [
      { id: 'chicken_breast', name: 'Chicken Breast (Minced)', qty: 140, unit: 'g', cost: 34 },
      { id: 'onion', name: 'Finely Chopped Onion', qty: 50, unit: 'g', cost: 3 },
      { id: 'tomato', name: 'Chopped Tomato', qty: 40, unit: 'g', cost: 2 },
      { id: 'cooking_oil', name: 'Oil', qty: 7, unit: 'ml', cost: 2 },
      { id: 'green_chilli', name: 'Ginger Garlic & Chillies', qty: 15, unit: 'g', cost: 2 },
      { id: 'spices_salt', name: 'Garam Masala & Salt', qty: 1, unit: 'pinch', cost: 13 },
      { id: 'roti_prepared', name: 'Prepared Rotis', qty: 2, unit: 'pcs', cost: 12 }
    ],
    instructions: [
      'Chop chicken breast into tiny mince or buy keema.',
      'Sauté ginger garlic, onions, and chillies in oil until browned.',
      'Add tomatoes and dry spices; cook 2 minutes.',
      'Add chicken mince, stir rapidly on high heat to prevent clumping.',
      'Cook for 7-8 minutes until tender and dry. Serve with rotis.'
    ],
    hostelHack: 'Minced chicken cooks in half the time of bone-in curry cut with zero bone wastage.'
  },
  {
    id: 'rec_45',
    name: 'Paneer Roll (Whole Wheat)',
    category: 'dinner',
    diet: 'veg',
    price: 52,
    calories: 440,
    protein: 21,
    carbs: 46,
    fat: 17,
    fiber: 5,
    prepTime: 12,
    tags: ['High Protein', 'Vegetarian', 'Quick Dinner'],
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&auto=format&fit=crop&q=80',
    description: 'Tawa-tossed spiced cottage cheese fingers wrapped in a flaky whole wheat chapati with crisp mint onions.',
    ingredients: [
      { id: 'paneer', name: 'Paneer Strips', qty: 80, unit: 'g', cost: 30 },
      { id: 'roti_prepared', name: 'Whole Wheat Roti', qty: 1, unit: 'pcs', cost: 6 },
      { id: 'onion', name: 'Sliced Onions', qty: 40, unit: 'g', cost: 2 },
      { id: 'cooking_oil', name: 'Oil / Butter', qty: 5, unit: 'ml', cost: 2 },
      { id: 'spices_salt', name: 'Chaat Masala & Herbs', qty: 1, unit: 'pinch', cost: 12 }
    ],
    instructions: [
      'Pan sear paneer strips with chaat masala, turmeric, and salt for 3 minutes.',
      'Warm a whole wheat roti on the tawa.',
      'Place paneer down the center, add raw onion slices and lemon juice.',
      'Roll and wrap in foil for dinner.'
    ],
    hostelHack: 'Clean, mess-free dinner that requires minimal dish cleaning.'
  },
  {
    id: 'rec_46',
    name: 'Yellow Moong Dal Soup with Crunchy Croutons',
    category: 'dinner',
    diet: 'vegan',
    price: 22,
    calories: 220,
    protein: 13,
    carbs: 34,
    fat: 3,
    fiber: 6,
    prepTime: 12,
    tags: ['Light Dinner', 'Budget Under ₹25', 'Vegan', 'Easy Digestion'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    description: 'Comforting golden lentil soup tempered with garlic, black pepper, lemon, and toasted bread cubes.',
    ingredients: [
      { id: 'moong_dal', name: 'Yellow Moong Dal', qty: 50, unit: 'g', cost: 6 },
      { id: 'bread', name: 'Bread Croutons (1 slice)', qty: 1, unit: 'slices', cost: 3 },
      { id: 'onion', name: 'Garlic & Onion', qty: 25, unit: 'g', cost: 2 },
      { id: 'cooking_oil', name: 'Oil Drop', qty: 3, unit: 'ml', cost: 1 },
      { id: 'spices_salt', name: 'Black Pepper, Jeera & Salt', qty: 1, unit: 'pinch', cost: 3 },
      { id: 'lemon', name: 'Lemon Juice', qty: 1, unit: 'pcs', cost: 7 }
    ],
    instructions: [
      'Boil moong dal with turmeric, ginger, and garlic until completely soft.',
      'Blend with spoon or whisk until velvety soup consistency.',
      'Toast bread cubes in a pan until crispy.',
      'Season soup with crushed black pepper and lemon; float croutons on top.'
    ],
    hostelHack: 'Great light dinner when studying late and avoiding heavy food sleepiness.'
  },
  {
    id: 'rec_47',
    name: 'Fish Fry (120g) with Green Salad & Lemon',
    category: 'dinner',
    diet: 'non-veg',
    price: 60,
    calories: 310,
    protein: 26,
    carbs: 8,
    fat: 14,
    fiber: 2,
    prepTime: 15,
    tags: ['High Protein', 'Non-Veg', 'Omega-3 Rich', 'Keto / Low Carb Friendly'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80',
    description: 'Fresh local fish steak marinated in red chilli, turmeric, lemon, and pan-fried with cucumber and onion salad.',
    ingredients: [
      { id: 'fish_rohu', name: 'Fresh Fish Steak', qty: 120, unit: 'g', cost: 34 },
      { id: 'cooking_oil', name: 'Mustard Oil for Fry', qty: 10, unit: 'ml', cost: 3 },
      { id: 'cucumber', name: 'Cucumber & Onion Salad', qty: 60, unit: 'g', cost: 3 },
      { id: 'lemon', name: 'Lemon Juice', qty: 1, unit: 'pcs', cost: 3 },
      { id: 'spices_salt', name: 'Fish Fry Masala & Salt', qty: 1, unit: 'pinch', cost: 17 }
    ],
    instructions: [
      'Marinate fish with lemon juice, turmeric, red chilli powder, and salt for 10 minutes.',
      'Heat mustard oil in pan until hot.',
      'Shallow fry fish for 3-4 minutes on each side until crisp on outside and flaky inside.',
      'Serve with fresh cucumber slices and lemon wedges.'
    ],
    hostelHack: 'Local fish markets in hostel towns sell fresh rohu or catla steaks starting at ₹25-30 each.'
  },
  {
    id: 'rec_48',
    name: 'Toor Dal with Jeera Rice & Achar',
    category: 'dinner',
    diet: 'vegan',
    price: 30,
    calories: 420,
    protein: 14,
    carbs: 72,
    fat: 7,
    fiber: 8,
    prepTime: 15,
    tags: ['Classic Indian', 'Budget Under ₹30', 'Vegan', 'Hostel Standard'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    description: 'Comforting home-style pigeon pea dal tempered with ghee/oil, cumin, and dry red chilli over jeera rice.',
    ingredients: [
      { id: 'toor_dal', name: 'Toor Dal', qty: 55, unit: 'g', cost: 8 },
      { id: 'rice', name: 'Rice', qty: 75, unit: 'g', cost: 4 },
      { id: 'onion', name: 'Onion & Garlic', qty: 35, unit: 'g', cost: 3 },
      { id: 'cooking_oil', name: 'Oil / Ghee', qty: 6, unit: 'ml', cost: 2 },
      { id: 'spices_salt', name: 'Jeera, Hing, Salt & Achar', qty: 1, unit: 'side', cost: 13 }
    ],
    instructions: [
      'Boil toor dal with salt and haldi.',
      'Temper with cumin, hing, and garlic.',
      'Serve warm over jeera rice with mango achar.'
    ],
    hostelHack: 'Add a pinch of hing (asafoetida) to aid nighttime lentil digestion.'
  },
  {
    id: 'rec_49',
    name: 'Oats Chilla with Grated Veggies',
    category: 'dinner',
    diet: 'vegan',
    price: 24,
    calories: 270,
    protein: 11,
    carbs: 42,
    fat: 6,
    fiber: 7,
    prepTime: 10,
    tags: ['Budget Under ₹25', 'Vegan', 'Quick Prep', 'Light Dinner'],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    description: 'Savory crepes made with powdered oats and besan batter loaded with grated carrots and onions.',
    ingredients: [
      { id: 'rolled_oats', name: 'Powdered Oats', qty: 45, unit: 'g', cost: 7 },
      { id: 'besan', name: 'Besan for Binding', qty: 25, unit: 'g', cost: 3 },
      { id: 'onion', name: 'Grated Veggies & Onion', qty: 40, unit: 'g', cost: 3 },
      { id: 'cooking_oil', name: 'Oil', qty: 5, unit: 'ml', cost: 1 },
      { id: 'spices_salt', name: 'Ajwain, Jeera, Salt & Dip', qty: 1, unit: 'dip', cost: 10 }
    ],
    instructions: [
      'Mix powdered oats and besan with water, grated veggies, ajwain, and salt.',
      'Spread thin on hot non-stick or induction tawa.',
      'Cook until crisp on both sides. Serve with spicy chutney.'
    ],
    hostelHack: 'Beta-glucan fiber in oats stabilizes blood sugar overnight, helping you wake up refreshed.'
  },
  {
    id: 'rec_50',
    name: 'Dahi Poha with Roasted Cumin & Mustard',
    category: 'dinner',
    diet: 'veg',
    price: 22,
    calories: 290,
    protein: 9,
    carbs: 46,
    fat: 6,
    fiber: 3,
    prepTime: 5,
    tags: ['No Cooking Required', 'Budget Under ₹25', 'Vegetarian', 'Gut Friendly'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    description: 'Light flattened rice soaked directly in cool curd with roasted jeera, ginger bits, and black salt.',
    ingredients: [
      { id: 'poha', name: 'Thick Poha', qty: 55, unit: 'g', cost: 4 },
      { id: 'curd', name: 'Fresh Curd', qty: 140, unit: 'g', cost: 10 },
      { id: 'spices_salt', name: 'Kala Namak, Roasted Jeera, Ginger', qty: 1, unit: 'pinch', cost: 8 }
    ],
    instructions: [
      'Rinse poha and let soak in 1 cup fresh dahi for 5 minutes until soft.',
      'Stir in black salt, crushed roasted cumin, and grated ginger.',
      'Eat cool and light.'
    ],
    hostelHack: 'Zero stove or kettle required; popular summer dinner across Maharashtra and Odisha.'
  },
  {
    id: 'rec_51',
    name: 'Double Egg Fried Rice (Hostel Kettle / Pan Style)',
    category: 'dinner',
    diet: 'non-veg',
    price: 36,
    calories: 460,
    protein: 20,
    carbs: 58,
    fat: 14,
    fiber: 3,
    prepTime: 12,
    tags: ['High Protein', 'Non-Veg', 'Leftover Rice Hack', 'Budget Friendly'],
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    description: 'Leftover cooked rice stir fried on high heat with 2 scrambled eggs, onions, green chillies, and soy sauce.',
    ingredients: [
      { id: 'egg', name: 'Eggs (2 pcs)', qty: 2, unit: 'pcs', cost: 14 },
      { id: 'rice', name: 'Cooked Leftover Rice', qty: 75, unit: 'g', cost: 4 },
      { id: 'onion', name: 'Onion & Green Chilli', qty: 40, unit: 'g', cost: 3 },
      { id: 'cooking_oil', name: 'Oil', qty: 8, unit: 'ml', cost: 2 },
      { id: 'spices_salt', name: 'Soya Sauce, Pepper & Salt', qty: 1, unit: 'pinch', cost: 13 }
    ],
    instructions: [
      'Scramble 2 eggs in hot oil in pan and remove.',
      'Sauté onions and chillies on high flame.',
      'Add cold cooked rice and toss vigorously with a splash of soy sauce and black pepper.',
      'Toss scrambled eggs back in and serve piping hot.'
    ],
    hostelHack: 'Transforms bland leftover hostel mess rice into a delicious restaurant style dinner in 5 mins.'
  },
  {
    id: 'rec_52',
    name: 'Soya Chunks & Green Peas Masala with 2 Rotis',
    category: 'dinner',
    diet: 'vegan',
    price: 36,
    calories: 440,
    protein: 29,
    carbs: 56,
    fat: 8,
    fiber: 10,
    prepTime: 16,
    tags: ['High Protein', 'Vegan', 'Budget Under ₹40', 'Satiety Champion'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    description: 'Protein powerhouse soya nuggets and sweet green peas simmered in rich homestyle onion gravy with rotis.',
    ingredients: [
      { id: 'soya_chunks', name: 'Soya Chunks (dry)', qty: 45, unit: 'g', cost: 5 },
      { id: 'green_peas', name: 'Green Peas (Matar)', qty: 45, unit: 'g', cost: 3 },
      { id: 'onion', name: 'Onion & Tomato', qty: 50, unit: 'g', cost: 3 },
      { id: 'cooking_oil', name: 'Oil', qty: 6, unit: 'ml', cost: 1 },
      { id: 'spices_salt', name: 'Curry Powder & Salt', qty: 1, unit: 'pinch', cost: 12 },
      { id: 'roti_prepared', name: 'Fresh Rotis', qty: 2, unit: 'pcs', cost: 12 }
    ],
    instructions: [
      'Boil soya chunks and squeeze water.',
      'Cook onions and tomatoes with curry powder until oil surfaces.',
      'Add green peas and soya chunks with half cup water; simmer for 6 minutes.',
      'Serve with 2 soft rotis.'
    ],
    hostelHack: 'Gives nearly 30g of protein for just ₹36, keeping student muscle gain on track.'
  }
];

window.RECIPES_DATA = RECIPES_DATA;
