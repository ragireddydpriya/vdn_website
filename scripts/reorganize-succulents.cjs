#!/usr/bin/env node
/**
 * Reorganize Succulents into Separate Category
 * Extracts succulents from Plants and creates a new top-level category
 */

const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, '../src/data/products.json');

// Read the products file
const data = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));

// Find the Plants category
const plantsIndex = data.categories.findIndex(cat => cat.name === 'Plants');
if (plantsIndex === -1) {
  console.error('❌ Plants category not found');
  process.exit(1);
}

const plantsCategory = data.categories[plantsIndex];

// Separate succulents from other plants
const succulentsProducts = plantsCategory.products.filter(p => p.category === 'Succulents');
const otherPlants = plantsCategory.products.filter(p => p.category !== 'Succulents');

if (succulentsProducts.length === 0) {
  console.warn('⚠️  No succulents found in Plants category');
  process.exit(0);
}

console.log(`Found ${succulentsProducts.length} succulents`);
console.log(`Remaining plants: ${otherPlants.length}`);

// Update Plants category with remaining products
plantsCategory.products = otherPlants;

// Create new Succulents category
const succulentsCategory = {
  name: 'Succulents',
  slug: 'succulents',
  products: succulentsProducts
};

// Insert Succulents category after Plants (or wherever appropriate)
data.categories.splice(plantsIndex + 1, 0, succulentsCategory);

// Write back to file
fs.writeFileSync(productsFile, JSON.stringify(data, null, 2), 'utf-8');

console.log('✅ Successfully reorganized categories');
console.log(data.categories.map(c => `${c.name} (${c.products.length} products)`).join('\n'));
