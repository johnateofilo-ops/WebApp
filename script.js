import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
import { getDatabase, ref, set, get } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js';

let products = [];

const cart = new Map();
const taxRate = 0;

const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const itemCount = document.getElementById('item-count');
const subtotalEl = document.getElementById('subtotal');
const taxEl = document.getElementById('tax');
const totalEl = document.getElementById('total');
const clearCartButton = document.getElementById('clear-cart');
const payButton = document.getElementById('pay-button');
const navTabs = document.querySelectorAll('.nav-tab');
const viewPanels = document.querySelectorAll('.view-panel');
const ordersTableBody = document.getElementById('orders-table-body');
const orderItemsTableBody = document.getElementById('order-items-table-body');
const orderItemsTitle = document.getElementById('order-items-title');
const ingredientsTableBody = document.getElementById('ingredients-table-body');
const ingredientsFilterBar = document.getElementById('ingredients-filter-bar');
const recipesList = document.getElementById('recipes-list');
const paymentModal = document.getElementById('payment-modal');
const adminSectionButtons = document.querySelectorAll('.admin-section-btn');
const adminSections = document.querySelectorAll('.admin-section');
const ingredientForm = document.getElementById('ingredient-form');
const ingredientIdInput = document.getElementById('ingredient-id');
const ingredientNameInput = document.getElementById('ingredient-name');
const ingredientCategoryInput = document.getElementById('ingredient-category');
const ingredientStockInput = document.getElementById('ingredient-stock');
const ingredientUnitInput = document.getElementById('ingredient-unit');
const ingredientBaseQtyInput = document.getElementById('ingredient-base-qty');
const ingredientBaseCostInput = document.getElementById('ingredient-base-cost');
const addIngredientButton = document.getElementById('add-ingredient-btn');
const ingredientModal = document.getElementById('ingredient-modal');
const closeIngredientModalButton = document.getElementById('close-ingredient-modal');
const cancelIngredientModalButton = document.getElementById('cancel-ingredient-modal');
const ingredientModalTitle = document.getElementById('ingredient-modal-title');
const ingredientCategoryOptions = document.getElementById('ingredient-category-options');
const ingredientUnitOptions = document.getElementById('ingredient-unit-options');
const restockIngredientButton = document.getElementById('restock-ingredient-btn');
const updateIngredientButton = document.getElementById('update-ingredient-btn');
const adminIngredientsList = document.getElementById('admin-ingredients-list');
const adminIngredientsEmpty = document.getElementById('admin-ingredients-empty');
const restockModal = document.getElementById('restock-modal');
const closeRestockModalButton = document.getElementById('close-restock-modal');
const cancelRestockModalButton = document.getElementById('cancel-restock-modal');
const restockForm = document.getElementById('restock-form');
const restockIngredientSelect = document.getElementById('restock-ingredient-select');
const restockCurrentStockInput = document.getElementById('restock-current-stock');
const restockQtyInput = document.getElementById('restock-qty');
const updateIngredientModal = document.getElementById('update-ingredient-modal');
const closeUpdateIngredientModalButton = document.getElementById('close-update-ingredient-modal');
const cancelUpdateIngredientModalButton = document.getElementById('cancel-update-ingredient-modal');
const updateIngredientForm = document.getElementById('update-ingredient-form');
const updateIngredientSelect = document.getElementById('update-ingredient-select');
const updateIngredientNameInput = document.getElementById('update-ingredient-name');
const updateIngredientCategoryInput = document.getElementById('update-ingredient-category');
const updateIngredientUnitInput = document.getElementById('update-ingredient-unit');
const updateIngredientBaseQtyInput = document.getElementById('update-ingredient-base-qty');
const updateIngredientBaseCostInput = document.getElementById('update-ingredient-base-cost');
const updateIngredientActiveInput = document.getElementById('update-ingredient-active');
const adminRecipesList = document.getElementById('admin-recipes-list');
const adminProductsTableBody = document.getElementById('admin-products-table-body');
const reportStartDateInput = document.getElementById('report-start-date');
const reportEndDateInput = document.getElementById('report-end-date');
const generateReportButton = document.getElementById('generate-report');
const seedDatabaseButton = document.getElementById('seed-default-db');
const seedProgressLabel = document.getElementById('seed-progress-label');
const seedProgressCount = document.getElementById('seed-progress-count');
const seedProgressBar = document.getElementById('seed-progress-bar');
const seedProgressLog = document.getElementById('seed-progress-log');
const saveAccountSettingsButton = document.getElementById('save-account-settings');
const reloadAccountSettingsButton = document.getElementById('reload-account-settings');
const accountEmailInput = document.getElementById('account-email');
const accountCurrentPasswordInput = document.getElementById('account-current-password');
const accountNewPasswordInput = document.getElementById('account-new-password');
const accountSettingsStatus = document.getElementById('account-settings-status');
const firebaseConfigJsonInput = document.getElementById('firebase-config-json');
const firebaseDatabaseUrlInput = document.getElementById('firebase-database-url');
const applyFirebaseConnectionButton = document.getElementById('apply-firebase-connection');
const firebaseConnectionStatus = document.getElementById('firebase-connection-status');
const reportSummary = document.getElementById('report-summary');
const addProductButton = document.getElementById('add-product-btn');
const productModal = document.getElementById('product-modal');
const closeProductModalButton = document.getElementById('close-product-modal');
const cancelProductModalButton = document.getElementById('cancel-product-modal');
const productModalForm = document.getElementById('product-modal-form');
const productModalIdInput = document.getElementById('product-modal-id');
const productModalNameInput = document.getElementById('product-modal-name');
const productModalPriceInput = document.getElementById('product-modal-price');
const productModalTitle = document.getElementById('product-modal-title');
const productModalCategoryInput = document.getElementById('product-modal-category');
const productCategoryTabs = document.getElementById('product-category-tabs');
const productModalActiveInput = document.getElementById('product-modal-active');
const recipeModalActiveInput = document.getElementById('recipe-modal-active');
const ingredientActiveInput = document.getElementById('ingredient-active');
const dashboardMonthSelect = document.getElementById('dashboard-month-select');
const ingredientDashboardSummary = document.getElementById('ingredient-dashboard-summary');
const ingredientDashboardChart = document.getElementById('ingredient-dashboard-chart');
const ingredientDashboardTableBody = document.getElementById('ingredient-dashboard-table-body');
const ingredientDashboardEntriesBody = document.getElementById('ingredient-dashboard-entries-body');
const salesDashboardSummary = document.getElementById('sales-dashboard-summary');
const salesDashboardChart = document.getElementById('sales-dashboard-chart');
const salesDashboardTableBody = document.getElementById('sales-dashboard-table-body');
const pinScreen = document.getElementById('pin-screen');
const appHeader = document.getElementById('app-header');
const appMain = document.getElementById('app-main');
const authEmailInput = document.getElementById('auth-email');
const authPasswordInput = document.getElementById('auth-password');
const authStatus = document.getElementById('auth-status');
const lockButton = document.getElementById('lock-button');
const confirmPinModalButton = document.getElementById('confirm-pin-modal');
const orderItemsModal = document.getElementById('order-items-modal');
const closeOrderItemsModalButton = document.getElementById('close-order-items-modal');
const orderItemsModalTitle = document.getElementById('order-items-modal-title');
const orderItemsModalBody = document.getElementById('order-items-modal-body');
const addRecipeButton = document.getElementById('add-recipe-btn');
const recipeModal = document.getElementById('recipe-modal');
const closeRecipeModalButton = document.getElementById('close-recipe-modal');
const cancelRecipeModalButton = document.getElementById('cancel-recipe-modal');
const recipeModalForm = document.getElementById('recipe-modal-form');
const recipeModalProductSelect = document.getElementById('recipe-modal-product');
const recipeRowsContainer = document.getElementById('recipe-rows');
const addRecipeRowButton = document.getElementById('add-recipe-row-btn');
const recipeModalTitle = document.getElementById('recipe-modal-title');
const recipeIngredientOptions = document.getElementById('recipe-ingredient-options');
const recipeUnitOptions = document.getElementById('recipe-unit-options');
const closePaymentModalButton = document.getElementById('close-payment-modal');
const cancelPaymentButton = document.getElementById('cancel-payment');
const confirmPaymentButton = document.getElementById('confirm-payment');
const paymentMethodButtons = document.querySelectorAll('.payment-method');
const cashFields = document.getElementById('cash-fields');
const gcashFields = document.getElementById('gcash-fields');
const cashAmountInput = document.getElementById('cash-amount');
const gcashReferenceInput = document.getElementById('gcash-reference');
const cashWarning = document.getElementById('cash-warning');
const changeSummary = document.getElementById('change-summary');
let selectedOrderId = null;
let orders = [];
let orderItems = [];
let ingredients = [];
let ingredientCostEntries = [];
let recipes = [];
let ingredientFilter = 'All';
let pendingOrder = null;
let selectedPaymentMethod = 'Cash';
let editingIngredientId = null;
let editingRecipeProduct = null;
let editingProductId = null;
let currentRecipeEditTarget = null;
let selectedRecipeProduct = null;
let selectedOrderItems = [];
let isLocked = true;
let pendingViewName = 'pos';
let selectedProductCategory = 'Coffee';
const ordersStorageKey = 'coffee-pos-orders';
const orderItemsStorageKey = 'coffee-pos-order-items';
const ingredientsStorageKey = 'coffee-pos-ingredients';
const ingredientCostEntriesStorageKey = 'coffee-pos-ingredient-cost-entries';
const recipesStorageKey = 'coffee-pos-recipes';
const productsStorageKey = 'coffee-pos-products';
const firebaseRuntimeConfigKey = 'coffee-pos-firebase-runtime-config';
const firebaseCollectionByStorageKey = {
  [ordersStorageKey]: 'orders',
  [orderItemsStorageKey]: 'orderItems',
  [ingredientsStorageKey]: 'ingredients',
  [ingredientCostEntriesStorageKey]: 'ingredientCostEntries',
  [recipesStorageKey]: 'recipes',
  [productsStorageKey]: 'products'
};
const ingredientCostResetVersionKey = 'coffee-pos-ingredient-cost-reset-v1';
const defaultSeedSources = [
  {
    storageKey: productsStorageKey,
    seedPath: 'data/products.json',
    getEntryKey: item => String(item?.productId || item?.id || '').trim()
  },
  {
    storageKey: ingredientsStorageKey,
    seedPath: 'data/ingredients.json',
    getEntryKey: item => String(item?.ingredientId || item?.id || '').trim()
  },
  {
    storageKey: ingredientCostEntriesStorageKey,
    seedPath: 'data/ingredient-cost-entries.json',
    getEntryKey: item => String(item?.entryId || item?.id || '').trim()
  },
  {
    storageKey: recipesStorageKey,
    seedPath: 'data/recipes.json',
    getEntryKey: item => String(item?.productName || item?.productId || item?.product || '').trim().toLowerCase()
  },
  {
    storageKey: ordersStorageKey,
    seedPath: 'data/orders.json',
    getEntryKey: item => String(item?.orderId || '').trim()
  },
  {
    storageKey: orderItemsStorageKey,
    seedPath: 'data/order-items.json',
    getEntryKey: item => [item?.orderId, item?.product, item?.quantity, item?.price]
      .map(value => String(value ?? '').trim().toLowerCase())
      .join('::')
  }
];

let firebaseDb = null;
let activeFirebaseConfig = null;
let firebaseAuth = null;
let authObserverUnsubscribe = null;

function readStoredObject(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function getFirebaseConfig() {
  const runtimeConfig = readStoredObject(firebaseRuntimeConfigKey);
  return runtimeConfig || window.firebaseConfig || null;
}

function canUseFirebase(config = getFirebaseConfig()) {
  return Boolean(config && config.apiKey && config.projectId && config.databaseURL);
}

function setFirebaseConnectionStatus(message, type = 'muted') {
  if (!firebaseConnectionStatus) return;
  firebaseConnectionStatus.textContent = message;
  firebaseConnectionStatus.className = `small text-${type}`;
}

function setAccountSettingsStatus(message, type = 'muted') {
  if (!accountSettingsStatus) return;
  accountSettingsStatus.textContent = message;
  accountSettingsStatus.className = `small text-${type}`;
}

function setAuthStatus(message, type = 'muted') {
  if (!authStatus) return;
  authStatus.textContent = message;
  authStatus.className = `small text-${type} mb-3`;
}

function normalizeDatabaseUrl(url = '') {
  return String(url).trim().replace(/\/+$/, '');
}

function getFirebaseProjectLabel(config) {
  if (!config) return 'N/A';
  return config.projectId || config.databaseURL || 'N/A';
}

function initFirebase(configOverride = null) {
  const config = configOverride || getFirebaseConfig();
  if (!canUseFirebase(config)) {
    setFirebaseConnectionStatus('Firebase is not fully configured. Enter config JSON or URL to connect.', 'warning');
    return null;
  }

  try {
    const app = initializeApp(config, `coffee-pos-runtime-${Date.now()}`);
    firebaseAuth = getAuth(app);
    activeFirebaseConfig = config;
    setFirebaseConnectionStatus(`Connected to Firebase project: ${getFirebaseProjectLabel(config)}`, 'success');
    attachAuthObserver();
    return getDatabase(app);
  } catch (error) {
    console.error('Firebase initialization failed. Falling back to local storage.', error);
    setFirebaseConnectionStatus(`Firebase connection failed: ${error.message || 'Unknown error'}`, 'danger');
    return null;
  }
}

function attachAuthObserver() {
  if (!firebaseAuth) return;
  if (authObserverUnsubscribe) {
    authObserverUnsubscribe();
  }

  authObserverUnsubscribe = onAuthStateChanged(firebaseAuth, user => {
    if (user) {
      isLocked = false;
      closePinScreen();
      renderView(pendingViewName || 'pos');
      lockButton.textContent = 'Sign Out';
      if (accountEmailInput) accountEmailInput.value = user.email || '';
      if (accountCurrentPasswordInput) accountCurrentPasswordInput.value = '';
      if (accountNewPasswordInput) accountNewPasswordInput.value = '';
      setAuthStatus(`Signed in as ${user.email || 'current user'}.`, 'success');
      setAccountSettingsStatus('Account is ready.', 'success');
      return;
    }

    isLocked = true;
    lockButton.textContent = 'Sign In';
    if (accountEmailInput) accountEmailInput.value = '';
    setAuthStatus('Not signed in.', 'muted');
    setAccountSettingsStatus('Waiting for sign-in.', 'muted');
    openPinScreen('pos');
  });
}

firebaseDb = initFirebase();

function bootstrapStaticDemoData() {
  const initializedKey = 'coffee-pos-demo-initialized';
  if (localStorage.getItem(initializedKey) === 'true') {
    return;
  }

  localStorage.removeItem(ordersStorageKey);
  localStorage.removeItem(orderItemsStorageKey);
  localStorage.setItem(initializedKey, 'true');
}

bootstrapStaticDemoData();

function readStoredArray(key, fallback = []) {
  try {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) {
      return fallback;
    }
    const parsed = JSON.parse(storedValue);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    console.error(error);
    return fallback;
  }
}

function cacheStoredArray(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
}

function syncFirebaseCollection(key, value) {
  if (!firebaseDb) return;
  const collection = firebaseCollectionByStorageKey[key];
  if (!collection) return;

  set(ref(firebaseDb, collection), value).catch(error => {
    console.error(`Failed to sync ${collection} to Firebase.`, error);
  });
}

function saveStoredArray(key, value) {
  cacheStoredArray(key, value);
  syncFirebaseCollection(key, value);
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(value);
}

function saveJsonData(key, value) {
  saveStoredArray(key, value);
}

function loadJsonData(key, fallback) {
  return readStoredArray(key, fallback);
}

async function fetchSeedArray(seedPath) {
  try {
    const response = await fetch(seedPath);
    if (!response.ok) {
      throw new Error(`Failed to load ${seedPath}: ${response.status}`);
    }
    const payload = await response.json();
    return Array.isArray(payload) ? payload : [];
  } catch (error) {
    console.warn(`Unable to fetch seed data from ${seedPath}.`, error);
    return [];
  }
}

async function loadDataCollection(storageKey, seedPath) {
  const seedData = await fetchSeedArray(seedPath);

  if (firebaseDb) {
    try {
      const collection = firebaseCollectionByStorageKey[storageKey];
      const snapshot = await get(ref(firebaseDb, collection));

      if (!snapshot.exists()) {
        if (seedData.length) {
          await set(ref(firebaseDb, collection), seedData);
        }
        cacheStoredArray(storageKey, seedData);
        return seedData;
      }

      const value = snapshot.val();
      const records = Array.isArray(value)
        ? value
        : Object.values(value || {});
      cacheStoredArray(storageKey, records);
      return records;
    } catch (error) {
      console.error(`Unable to read ${storageKey} from Firebase.`, error);
    }
  }

  const storedData = readStoredArray(storageKey, []);
  const data = storedData.length ? storedData : seedData;
  cacheStoredArray(storageKey, data);
  return data;
}

function normalizeCollectionRecords(value) {
  if (Array.isArray(value)) {
    return value.filter(item => item !== null && item !== undefined);
  }
  if (value && typeof value === 'object') {
    return Object.values(value).filter(item => item !== null && item !== undefined);
  }
  return [];
}

function mergeSeedEntries(existingEntries, seedEntries, getEntryKey) {
  const seen = new Set();
  const merged = [];

  existingEntries.forEach(entry => {
    const key = getEntryKey(entry);
    if (!key) {
      merged.push(entry);
      return;
    }
    if (seen.has(key)) return;
    seen.add(key);
    merged.push(entry);
  });

  let addedCount = 0;
  seedEntries.forEach(entry => {
    const key = getEntryKey(entry);
    if (!key || seen.has(key)) {
      return;
    }
    seen.add(key);
    merged.push(entry);
    addedCount += 1;
  });

  return { merged, addedCount };
}

function setSeedProgress(current, total, label, variant = 'primary') {
  if (!seedProgressLabel || !seedProgressCount || !seedProgressBar) return;
  const safeTotal = Math.max(total, 1);
  const percent = Math.max(0, Math.min(100, Math.round((current / safeTotal) * 100)));
  seedProgressLabel.textContent = label;
  seedProgressCount.textContent = `${Math.min(current, total)} / ${total}`;
  seedProgressBar.style.width = `${percent}%`;
  seedProgressBar.className = `progress-bar bg-${variant}`;
  const progress = seedProgressBar.closest('.progress');
  if (progress) {
    progress.setAttribute('aria-valuenow', String(percent));
  }
}

function appendSeedLog(message, type = 'info') {
  if (!seedProgressLog) return;
  const item = document.createElement('li');
  item.textContent = message;
  if (type === 'error') {
    item.className = 'text-danger';
  } else if (type === 'success') {
    item.className = 'text-success';
  } else if (type === 'warning') {
    item.className = 'text-warning';
  } else {
    item.className = 'text-muted';
  }
  seedProgressLog.appendChild(item);
}

function resetSeedProgress(totalSteps) {
  if (seedProgressLog) {
    seedProgressLog.innerHTML = '';
  }
  setSeedProgress(0, totalSteps, 'Starting seed process...', 'primary');
}

function hydrateFirebaseConnectionInputs() {
  const config = getFirebaseConfig();
  if (!config) return;

  if (firebaseDatabaseUrlInput && config.databaseURL) {
    firebaseDatabaseUrlInput.value = normalizeDatabaseUrl(config.databaseURL);
  }

  if (firebaseConfigJsonInput) {
    firebaseConfigJsonInput.value = JSON.stringify(config, null, 2);
  }
}

function refreshAccountSettings() {
  if (!firebaseAuth?.currentUser) {
    setAccountSettingsStatus('Sign in first to manage the account password.', 'warning');
    return;
  }

  if (accountEmailInput) accountEmailInput.value = firebaseAuth.currentUser.email || '';
  if (accountCurrentPasswordInput) accountCurrentPasswordInput.value = '';
  if (accountNewPasswordInput) accountNewPasswordInput.value = '';
  setAccountSettingsStatus('Account loaded.', 'success');
}

async function saveAccountSettings() {
  const user = firebaseAuth?.currentUser;
  const currentPassword = accountCurrentPasswordInput?.value || '';
  const newPassword = accountNewPasswordInput?.value || '';

  if (!user || !user.email) {
    setAccountSettingsStatus('Sign in first to change the password.', 'warning');
    return;
  }

  if (!currentPassword || !newPassword) {
    alert('Enter the current password and a new password.');
    return;
  }

  if (newPassword.length < 6) {
    alert('New password must be at least 6 characters.');
    return;
  }

  if (saveAccountSettingsButton) {
    saveAccountSettingsButton.disabled = true;
  }

  setAccountSettingsStatus('Updating password...', 'muted');
  try {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    if (accountCurrentPasswordInput) accountCurrentPasswordInput.value = '';
    if (accountNewPasswordInput) accountNewPasswordInput.value = '';
    setAccountSettingsStatus('Password updated successfully.', 'success');
  } catch (error) {
    console.error(error);
    setAccountSettingsStatus(error.message || 'Unable to update password.', 'danger');
  } finally {
    if (saveAccountSettingsButton) {
      saveAccountSettingsButton.disabled = false;
    }
  }
}

async function applyFirebaseConnection() {
  try {
    const rawJson = firebaseConfigJsonInput?.value?.trim() || '';
    const urlOverride = normalizeDatabaseUrl(firebaseDatabaseUrlInput?.value || '');
    const baseConfig = window.firebaseConfig || {};

    let jsonConfig = {};
    if (rawJson) {
      const parsed = JSON.parse(rawJson);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('Firebase config JSON must be an object.');
      }
      jsonConfig = parsed;
    }

    const nextConfig = {
      ...baseConfig,
      ...jsonConfig
    };

    if (urlOverride) {
      nextConfig.databaseURL = urlOverride;
    }

    const missingFields = ['apiKey', 'projectId', 'databaseURL'].filter(field => !nextConfig[field]);
    if (missingFields.length) {
      throw new Error(`Missing required config field(s): ${missingFields.join(', ')}`);
    }

    localStorage.setItem(firebaseRuntimeConfigKey, JSON.stringify(nextConfig));
    window.firebaseConfig = nextConfig;
    firebaseDb = initFirebase(nextConfig);

    if (!firebaseDb) {
      throw new Error('Unable to initialize Firebase with the provided configuration.');
    }

    appendSeedLog(`Firebase connection updated: ${getFirebaseProjectLabel(nextConfig)}`, 'success');
    await Promise.all([loadProducts(), loadOrders(), loadOrderItems(), loadIngredients(), loadIngredientCostEntries(), loadRecipes()]);
    renderReports();
    appendSeedLog('Data reloaded from the selected Firebase database.', 'info');
  } catch (error) {
    console.error(error);
    setFirebaseConnectionStatus(`Connection error: ${error.message || 'Unknown error'}`, 'danger');
    appendSeedLog(`Connection error: ${error.message || 'Unknown error'}`, 'error');
  }
}

async function seedDefaultDatabase() {
  if (!window.confirm('Seed default database entries that are missing only? Existing entries will not be duplicated.')) {
    return;
  }

  const totalSteps = defaultSeedSources.length;
  resetSeedProgress(totalSteps);
  appendSeedLog('Preparing default seed files...');

  if (seedDatabaseButton) {
    seedDatabaseButton.disabled = true;
    seedDatabaseButton.textContent = 'Seeding...';
  }

  try {
    const resultSummary = [];
    const errorSummary = [];
    let completedSteps = 0;

    for (const source of defaultSeedSources) {
      setSeedProgress(completedSteps, totalSteps, `Processing ${source.storageKey}...`, 'primary');

      try {
        const seedEntries = await fetchSeedArray(source.seedPath);
        if (!seedEntries.length) {
          const message = `${source.storageKey}: no seed file entries found`;
          resultSummary.push(message);
          appendSeedLog(message, 'warning');
          completedSteps += 1;
          setSeedProgress(completedSteps, totalSteps, `Processed ${source.storageKey}`, 'primary');
          continue;
        }

        let existingEntries = [];
        if (firebaseDb) {
          const collection = firebaseCollectionByStorageKey[source.storageKey];
          const snapshot = await get(ref(firebaseDb, collection));
          existingEntries = normalizeCollectionRecords(snapshot.val());
        } else {
          existingEntries = readStoredArray(source.storageKey, []);
        }

        const { merged, addedCount } = mergeSeedEntries(existingEntries, seedEntries, source.getEntryKey);
        if (addedCount > 0 || existingEntries.length === 0) {
          saveStoredArray(source.storageKey, merged);
        }

        const message = `${source.storageKey}: ${addedCount} added, ${existingEntries.length} existing`;
        resultSummary.push(message);
        appendSeedLog(message, addedCount > 0 ? 'success' : 'info');
      } catch (error) {
        console.error(error);
        const message = `${source.storageKey}: error while seeding (${error.message || 'unknown error'})`;
        errorSummary.push(message);
        appendSeedLog(message, 'error');
      }

      completedSteps += 1;
      setSeedProgress(completedSteps, totalSteps, `Processed ${source.storageKey}`, errorSummary.length ? 'warning' : 'primary');
    }

    await Promise.all([loadProducts(), loadOrders(), loadOrderItems(), loadIngredients(), loadIngredientCostEntries(), loadRecipes()]);
    renderReports();

    if (errorSummary.length) {
      setSeedProgress(totalSteps, totalSteps, `Completed with ${errorSummary.length} error(s)`, 'danger');
      appendSeedLog('Seed completed with errors. Review the error lines above.', 'error');
    } else {
      setSeedProgress(totalSteps, totalSteps, 'Seed completed successfully.', 'success');
      appendSeedLog('Seed completed successfully.', 'success');
    }
  } catch (error) {
    console.error(error);
    setSeedProgress(0, defaultSeedSources.length, 'Seed failed before completion.', 'danger');
    appendSeedLog(`Process failed: ${error.message || 'unknown error'}`, 'error');
  } finally {
    if (seedDatabaseButton) {
      seedDatabaseButton.disabled = false;
      seedDatabaseButton.textContent = 'Seed Default DB';
    }
  }
}

function inferProductCategory(productName = '') {
  const name = String(productName).toLowerCase();
  if (/(pasta|ramen|noodle|spaghetti|linguini)/.test(name)) return 'Pasta';
  if (/(pastry|cake|cookie|bread|croissant|dessert|bakery)/.test(name)) return 'Pastry';
  if (/(coffee|mocha|cafe|espresso|latte|americano)/.test(name)) return 'Coffee';
  return 'Non-Coffee';
}

function renderProductCategoryTabs() {
  const categories = ['Coffee', 'Non-Coffee', 'Pastry', 'Pasta'];
  productCategoryTabs.innerHTML = categories.map(category => `
    <button class="product-category-tab ${selectedProductCategory === category ? 'active' : ''}" data-category="${category}" type="button">${category}</button>
  `).join('');

  productCategoryTabs.querySelectorAll('.product-category-tab').forEach(button => {
    button.addEventListener('click', () => {
      selectedProductCategory = button.dataset.category;
      renderProductCategoryTabs();
      renderProducts();
    });
  });
}

function openProductModal(product = null) {
  editingProductId = product ? product.id : null;
  productModalTitle.textContent = product ? 'Edit Product' : 'Add Product';
  productModalIdInput.value = product ? product.id : generateNextProductId();
  productModalNameInput.value = product ? product.name : '';
  productModalPriceInput.value = product ? product.price : '';
  productModalCategoryInput.value = product ? (product.category || 'Coffee') : selectedProductCategory;
  productModalActiveInput.value = product && product.isActive === false ? 'false' : 'true';
  productModal.classList.remove('d-none');
  productModal.setAttribute('aria-hidden', 'false');
}

function closeProductModal() {
  productModal.classList.add('d-none');
  productModal.setAttribute('aria-hidden', 'true');
  productModalForm.reset();
  productModalCategoryInput.value = selectedProductCategory;
  productModalActiveInput.value = 'true';
  editingProductId = null;
}

function openIngredientModal() {
  editingIngredientId = null;
  ingredientModalTitle.textContent = 'Add New Ingredient';
  ingredientIdInput.value = generateNextIngredientId();
  ingredientNameInput.value = '';
  ingredientCategoryInput.value = '';
  ingredientStockInput.value = '';
  ingredientUnitInput.value = '';
  ingredientBaseQtyInput.value = '';
  ingredientBaseCostInput.value = '';
  ingredientActiveInput.value = 'true';
  ingredientModal.classList.remove('d-none');
  ingredientModal.setAttribute('aria-hidden', 'false');
}

function closeIngredientModal() {
  ingredientModal.classList.add('d-none');
  ingredientModal.setAttribute('aria-hidden', 'true');
  ingredientForm.reset();
  ingredientIdInput.value = '';
  ingredientActiveInput.value = 'true';
  editingIngredientId = null;
}

function formatStockText(item) {
  return `${Number(item.currentStock || 0).toLocaleString('en-PH', { maximumFractionDigits: 2 })} ${item.unit || ''}`.trim();
}

function getIngredientById(ingredientId) {
  return ingredients.find(item => item.ingredientId === ingredientId) || null;
}

function populateIngredientActionSelects() {
  const options = ingredients
    .map(item => `<option value="${item.ingredientId}">${item.name} (${item.ingredientId})</option>`)
    .join('');

  if (restockIngredientSelect) {
    restockIngredientSelect.innerHTML = options;
  }

  if (updateIngredientSelect) {
    updateIngredientSelect.innerHTML = options;
  }
}

function closeRestockModal() {
  if (!restockModal) return;
  restockModal.classList.add('d-none');
  restockModal.setAttribute('aria-hidden', 'true');
  if (restockForm) restockForm.reset();
  if (restockCurrentStockInput) restockCurrentStockInput.value = '';
}

function refreshRestockPreview() {
  if (!restockIngredientSelect || !restockCurrentStockInput) return;
  const ingredient = getIngredientById(restockIngredientSelect.value);
  restockCurrentStockInput.value = ingredient ? formatStockText(ingredient) : '';
}

function openRestockModal() {
  if (!ingredients.length) {
    alert('Add at least one ingredient first.');
    return;
  }

  populateIngredientActionSelects();
  restockModal.classList.remove('d-none');
  restockModal.setAttribute('aria-hidden', 'false');
  refreshRestockPreview();
  if (restockQtyInput) restockQtyInput.focus();
}

function closeUpdateIngredientModal() {
  if (!updateIngredientModal) return;
  updateIngredientModal.classList.add('d-none');
  updateIngredientModal.setAttribute('aria-hidden', 'true');
  if (updateIngredientForm) updateIngredientForm.reset();
}

function refreshUpdateIngredientForm() {
  if (!updateIngredientSelect) return;
  const ingredient = getIngredientById(updateIngredientSelect.value);
  if (!ingredient) return;

  updateIngredientNameInput.value = ingredient.name || '';
  updateIngredientCategoryInput.value = ingredient.category || '';
  updateIngredientUnitInput.value = ingredient.unit || '';
  updateIngredientBaseQtyInput.value = Number(ingredient.baseQuantity || 0);
  updateIngredientBaseCostInput.value = Number(ingredient.baseCost || 0);
  updateIngredientActiveInput.value = ingredient.isActive === false ? 'false' : 'true';
}

function openUpdateIngredientModal() {
  if (!ingredients.length) {
    alert('Add at least one ingredient first.');
    return;
  }

  populateIngredientActionSelects();
  updateIngredientModal.classList.remove('d-none');
  updateIngredientModal.setAttribute('aria-hidden', 'false');
  refreshUpdateIngredientForm();
}

function generateNextIngredientId() {
  const ids = ingredients.map(item => item.ingredientId).filter(Boolean);
  const numericIds = ids.map(id => Number(String(id).replace(/\D/g, ''))).filter(Number.isFinite);
  const next = numericIds.length ? Math.max(...numericIds) + 1 : 1;
  return `I${String(next).padStart(3, '0')}`;
}

function populateIngredientOptionLists() {
  const categories = [...new Set(ingredients.map(item => item.category).filter(Boolean))].sort();
  const units = [...new Set([...ingredients.map(item => item.unit).filter(Boolean), ...getUnitOptions()])].sort();
  ingredientCategoryOptions.innerHTML = categories.map(category => `<option value="${category}"></option>`).join('');
  ingredientUnitOptions.innerHTML = units.map(unit => `<option value="${unit}"></option>`).join('');
}

function updateRecipeButtonLabel() {
  addRecipeButton.textContent = selectedRecipeProduct ? 'Edit Recipe' : 'Add Recipe';
}

function selectRecipeForEditing(productName) {
  selectedRecipeProduct = productName || null;
  updateRecipeButtonLabel();
}

function clearRecipeSelection() {
  selectedRecipeProduct = null;
  updateRecipeButtonLabel();
}

function populateRecipeOptionLists() {
  const ingredientNames = [...new Set(ingredients.map(item => item.name).filter(Boolean))].sort();
  const units = [...new Set([...ingredients.map(item => item.unit).filter(Boolean), ...getUnitOptions()])].sort();
  recipeIngredientOptions.innerHTML = ingredientNames.map(name => `<option value="${name}"></option>`).join('');
  recipeUnitOptions.innerHTML = units.map(unit => `<option value="${unit}"></option>`).join('');
}

function fillRecipeRowsForSelection(productName = recipeModalProductSelect.value) {
  recipeRowsContainer.innerHTML = '';
  const recipe = recipes.find(item => (item.productName || item.productId || item.product) === productName);
  if (recipe && recipe.ingredients?.length) {
    recipe.ingredients.forEach(entry => addRecipeRow(entry));
  } else {
    addRecipeRow();
  }
}

function openRecipeModal(recipe = null) {
  currentRecipeEditTarget = recipe ? (recipe.productName || recipe.productId || recipe.product) : null;
  recipeModalTitle.textContent = recipe ? 'Edit Recipe' : 'Add Recipe';
  populateRecipeProductSelect();
  populateRecipeOptionLists();

  if (recipe) {
    recipeModalProductSelect.value = recipe.productName || recipe.productId || recipe.product;
    recipeModalActiveInput.value = recipe.isActive === false ? 'false' : 'true';
    selectRecipeForEditing(recipe.productName || recipe.productId || recipe.product);
  } else {
    clearRecipeSelection();
    recipeModalProductSelect.value = recipeModalProductSelect.options[0]?.value || '';
    recipeModalActiveInput.value = 'true';
  }

  fillRecipeRowsForSelection(recipeModalProductSelect.value);
  recipeModal.classList.remove('d-none');
  recipeModal.setAttribute('aria-hidden', 'false');
}

function closeRecipeModal() {
  recipeModal.classList.add('d-none');
  recipeModal.setAttribute('aria-hidden', 'true');
  recipeModalForm.reset();
  recipeModalActiveInput.value = 'true';
  recipeRowsContainer.innerHTML = '';
  currentRecipeEditTarget = null;
  clearRecipeSelection();
}

function generateNextProductId() {
  const ids = products.map(item => item.id).filter(Boolean);
  const numericIds = ids.map(id => Number(String(id).replace(/\D/g, ''))).filter(Number.isFinite);
  const next = numericIds.length ? Math.max(...numericIds) + 1 : 1;
  return `P${String(next).padStart(3, '0')}`;
}

function addRecipeRow(entry = {}) {
  const row = document.createElement('div');
  row.className = 'row g-2 recipe-row mb-2';
  row.innerHTML = `
    <div class="col-md-4">
      <input class="form-control form-control-sm recipe-ingredient-input" list="recipe-ingredient-options" placeholder="Ingredient" value="${entry.ingredient || ''}" />
    </div>
    <div class="col-md-3">
      <input class="form-control form-control-sm recipe-qty-input" type="number" step="0.01" placeholder="Amount" value="${entry.qty || ''}" />
    </div>
    <div class="col-md-3">
      <input class="form-control form-control-sm recipe-unit-input" list="recipe-unit-options" placeholder="Unit" value="${entry.unit || ''}" />
    </div>
    <div class="col-md-2">
      <button class="btn btn-outline-danger btn-sm w-100 remove-recipe-row-btn" type="button">Remove</button>
    </div>
  `;
  recipeRowsContainer.appendChild(row);
  row.querySelector('.remove-recipe-row-btn').addEventListener('click', () => {
    if (!window.confirm('Remove this ingredient?')) return;
    row.remove();
  });
}

function populateRecipeProductSelect() {
  const productNames = products.map(item => item.name);
  recipeModalProductSelect.innerHTML = productNames.map(name => `<option value="${name}">${name}</option>`).join('');
}

function getRecipeEntries() {
  return Array.from(recipeRowsContainer.querySelectorAll('.recipe-row')).map(row => ({
    ingredient: row.querySelector('.recipe-ingredient-input').value.trim(),
    qty: Number(row.querySelector('.recipe-qty-input').value || 0),
    unit: row.querySelector('.recipe-unit-input').value.trim()
  })).filter(entry => entry.ingredient);
}

function deductIngredientsForOrder(orderItemsList) {
  const ingredientInventory = [...ingredients];
  orderItemsList.forEach(item => {
    const recipe = recipes.find(entry => (entry.productName || entry.productId || entry.product) === item.product);
    if (!recipe) return;
    recipe.ingredients.forEach(component => {
      const target = ingredientInventory.find(ingredient => ingredient.name.toLowerCase() === component.ingredient.toLowerCase());
      if (!target) return;
      target.currentStock = Number(target.currentStock || 0) - Number(component.qty || 0) * Number(item.quantity || 0);
    });
  });
  ingredients.splice(0, ingredients.length, ...ingredientInventory);
  saveJsonData(ingredientsStorageKey, ingredients);
  renderIngredientFilters();
  renderIngredients();
  renderAdminIngredients();
}

function toggleOrderStatus(orderId) {
  const order = orders.find(item => item.orderId === orderId);
  if (!order) return;

  order.paidStatus = order.paidStatus === 'Paid' ? 'Pending' : 'Paid';
  saveStoredArray(ordersStorageKey, orders);
  loadOrders();
}

function normalizeProduct(product) {
  return {
    ...product,
    id: product.productId,
    price: Number(product.price),
    category: product.category || inferProductCategory(product.name || product.productId),
    isActive: product.isActive !== false
  };
}

function normalizeIngredient(ingredient) {
  const restockHistory = Array.isArray(ingredient.restockHistory)
    ? ingredient.restockHistory
      .map(entry => ({
        timestamp: entry.timestamp || entry.date || '',
        quantityAdded: Number(entry.quantityAdded || entry.quantity || 0),
        unitCostSnapshot: Number(entry.unitCostSnapshot || entry.unitCost || ingredient.unitCost || 0),
        costAdded: Number(entry.costAdded || 0)
      }))
      .filter(entry => entry.timestamp && Number(entry.quantityAdded || 0) > 0)
    : [];

  return {
    ...ingredient,
    ingredientId: ingredient.ingredientId || ingredient.id,
    currentStock: Number(ingredient.currentStock || 0),
    unitCost: Number(ingredient.unitCost || 0),
    baseQuantity: Number(ingredient.baseQuantity || 0),
    baseCost: Number(ingredient.baseCost || 0),
    isActive: ingredient.isActive !== false,
    createdAt: ingredient.createdAt || '',
    lastRestockedAt: ingredient.lastRestockedAt || '',
    restockHistory
  };
}

function normalizeIngredientCostEntry(entry) {
  const timestamp = String(entry.timestamp || entry.dateTime || entry.date || '').trim();
  const quantityAdded = Number(entry.quantityAdded || entry.quantity || 0);
  const unitCost = Number(entry.unitCostSnapshot || entry.unitCost || 0);
  const costAdded = Number(entry.costAdded || quantityAdded * unitCost);

  return {
    entryId: String(entry.entryId || entry.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`),
    ingredientId: String(entry.ingredientId || '').trim(),
    ingredientName: String(entry.ingredientName || entry.name || '').trim(),
    eventType: String(entry.eventType || entry.source || 'restock').trim(),
    unit: String(entry.unit || '').trim(),
    quantityAdded,
    unitCostSnapshot: unitCost,
    costAdded,
    timestamp
  };
}

function resetIngredientCostTrackingIfNeeded() {
  if (localStorage.getItem(ingredientCostResetVersionKey) === 'true') {
    return false;
  }

  let hasChanges = false;
  ingredients = ingredients.map(item => {
    const hadHistory = Array.isArray(item.restockHistory) && item.restockHistory.length > 0;
    const hadLastRestockedAt = Boolean(item.lastRestockedAt);
    if (hadHistory || hadLastRestockedAt) {
      hasChanges = true;
    }

    return {
      ...item,
      restockHistory: [],
      lastRestockedAt: ''
    };
  });

  localStorage.setItem(ingredientCostResetVersionKey, 'true');
  return hasChanges;
}

function toStartOfDay(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatMonthDay(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '--/--';
  }

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}/${day}`;
}

function formatDateTime(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'N/A';
  }
  return new Intl.DateTimeFormat('en-PH', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date);
}

function buildWeekLabelFromAnchor(timestamp, anchorDay) {
  const eventDay = toStartOfDay(timestamp);
  if (!eventDay || !anchorDay) return 'N/A';
  const msPerDay = 24 * 60 * 60 * 1000;
  const dayOffset = Math.floor((eventDay - anchorDay) / msPerDay);
  const bucketIndex = Math.max(0, Math.floor(dayOffset / 7));
  const bucketStart = new Date(anchorDay);
  bucketStart.setDate(bucketStart.getDate() + (bucketIndex * 7));
  const bucketEnd = new Date(bucketStart);
  bucketEnd.setDate(bucketEnd.getDate() + 6);
  return `${formatMonthDay(bucketStart)} - ${formatMonthDay(bucketEnd)}`;
}

function addIngredientCostEntry({ ingredient, quantityAdded, unitCostSnapshot, eventType }) {
  const safeQuantity = Number(quantityAdded || 0);
  const safeUnitCost = Number(unitCostSnapshot || 0);
  const safeCost = safeQuantity * safeUnitCost;
  if (safeQuantity <= 0 || safeUnitCost < 0 || safeCost <= 0) {
    return null;
  }

  const entry = {
    entryId: `ICE-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    ingredientId: ingredient.ingredientId,
    ingredientName: ingredient.name,
    eventType,
    unit: ingredient.unit || '',
    quantityAdded: safeQuantity,
    unitCostSnapshot: safeUnitCost,
    costAdded: safeCost,
    timestamp: new Date().toISOString()
  };

  ingredientCostEntries = [entry, ...ingredientCostEntries];
  saveJsonData(ingredientCostEntriesStorageKey, ingredientCostEntries);
  return entry;
}

function getIngredientCostEvents(monthKey = '') {
  return ingredientCostEntries
    .filter(entry => entry.timestamp && (!monthKey || entry.timestamp.slice(0, 7) === monthKey))
    .map(entry => ({
      timestamp: entry.timestamp,
      costAdded: Number(entry.costAdded || 0),
      ingredientId: entry.ingredientId,
      ingredientName: entry.ingredientName,
      eventType: entry.eventType,
      quantityAdded: Number(entry.quantityAdded || 0),
      unit: entry.unit || ''
    }))
    .filter(entry => entry.costAdded > 0);
}

function normalizeRecipe(recipe) {
  return {
    ...recipe,
    isActive: recipe.isActive !== false
  };
}

function getUnitOptions() {
  return ['g', 'ml/cc', 'tbsp', 'pc/s'];
}

async function loadProducts() {
  try {
    const productData = await loadDataCollection(productsStorageKey, 'data/products.json');
    products = productData.map(normalizeProduct);
    saveJsonData(productsStorageKey, products.map(item => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      category: item.category || inferProductCategory(item.name),
      isActive: item.isActive !== false
    })));
    renderProductCategoryTabs();
    renderProducts();
    renderCart();
    renderAdminProducts();
  } catch (error) {
    console.error(error);
    productList.innerHTML = '<div class="col-12"><div class="alert alert-danger mb-0">Unable to load the menu data.</div></div>';
  }
}

function renderProducts() {
  const activeProducts = products.filter(product => product.isActive !== false && (selectedProductCategory === 'All' || product.category === selectedProductCategory));

  if (!activeProducts.length) {
    productList.innerHTML = '<div class="col-12"><div class="alert alert-info mb-0">No products in this category yet.</div></div>';
    return;
  }

  productList.innerHTML = activeProducts.map(product => `
    <div class="col-md-6 col-xl-4">
      <div class="card product-card h-100 shadow-sm">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h3 class="product-name h6 mb-0">${product.name}</h3>
          </div>
          <button class="btn btn-sm product-add-btn w-100" onclick="addToCart('${product.id}')">Add · ${formatCurrency(product.price)}</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderCart() {
  const entries = Array.from(cart.values());
  cartItems.innerHTML = entries.length ? entries.map(item => `
    <div class="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <div class="fw-semibold cart-item-title">${item.name}</div>
        <div class="text-muted small">${item.quantity} × ${formatCurrency(item.price)}</div>
      </div>
      <div class="text-muted small">Qty ${item.quantity}</div>
    </div>
  `).join('') : '<div class="text-center text-muted">No items added yet.</div>';

  const subtotal = entries.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const totalItems = entries.reduce((sum, item) => sum + item.quantity, 0);
  itemCount.textContent = '';
  payButton.textContent = `Place Order (${totalItems})`;
  subtotalEl.textContent = formatCurrency(subtotal);
  taxEl.textContent = formatCurrency(tax);
  totalEl.textContent = formatCurrency(total);
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const existing = cart.get(productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.set(productId, { ...product, quantity: 1 });
  }

  renderCart();
}

window.addToCart = addToCart;

function changeQuantity(productId, amount) {
  const item = cart.get(productId);
  if (!item) return;
  item.quantity += amount;

  if (item.quantity <= 0) {
    cart.delete(productId);
  }

  renderCart();
}

function clearCart() {
  cart.clear();
  renderCart();
}

function openPaymentModal() {
  const entries = Array.from(cart.values());
  const subtotal = entries.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal * (1 + taxRate);

  if (!entries.length) {
    alert('Please add items to the order before placing it.');
    return;
  }

  pendingOrder = {
    total,
    entries
  };

  selectedPaymentMethod = 'Cash';
  paymentMethodButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.method === selectedPaymentMethod);
    button.classList.toggle('btn-outline-primary', button.dataset.method === selectedPaymentMethod);
    button.classList.toggle('btn-outline-secondary', button.dataset.method !== selectedPaymentMethod);
  });
  cashFields.classList.remove('d-none');
  gcashFields.classList.add('d-none');
  cashAmountInput.value = '';
  gcashReferenceInput.value = '';
  cashWarning.classList.add('d-none');
  changeSummary.textContent = '';
  paymentModal.classList.remove('d-none');
  paymentModal.setAttribute('aria-hidden', 'false');
}

function closePaymentModal() {
  paymentModal.classList.add('d-none');
  paymentModal.setAttribute('aria-hidden', 'true');
  pendingOrder = null;
}

function updateCashChange() {
  if (!pendingOrder) return;
  const amount = Number(cashAmountInput.value);
  if (!Number.isFinite(amount) || amount < 0) {
    cashWarning.classList.add('d-none');
    changeSummary.textContent = '';
    return;
  }

  const isShort = amount < pendingOrder.total;
  cashWarning.classList.toggle('d-none', !isShort);

  const change = amount - pendingOrder.total;
  changeSummary.textContent = change >= 0
    ? `Change: ${formatCurrency(change)}`
    : `Short by: ${formatCurrency(Math.abs(change))}`;
}

async function confirmOrder() {
  if (!pendingOrder) return;

  const total = pendingOrder.total;
  let paymentNote = selectedPaymentMethod;

  if (selectedPaymentMethod === 'Cash') {
    const paidAmount = Number(cashAmountInput.value);
    if (!Number.isFinite(paidAmount) || paidAmount < total) {
      alert('Please enter a cash amount equal to or greater than the total.');
      return;
    }
    paymentNote = `Cash (${formatCurrency(paidAmount)})`;
  }

  const paidStatus = selectedPaymentMethod === 'Pending' ? 'Pending' : 'Paid';
  const paymentDetails = selectedPaymentMethod === 'GCash'
    ? `${paymentNote} - Ref: ${gcashReferenceInput.value.trim() || 'N/A'}`
    : paymentNote;
  const newOrder = {
    orderId: `ORD-${String(orders.length + 1001).slice(-4)}`,
    date: new Date().toISOString().slice(0, 10),
    totalAmount: total,
    paidStatus,
    paymentMethod: paymentDetails
  };

  const newOrderItems = pendingOrder.entries.map(item => ({
    orderId: newOrder.orderId,
    product: item.name,
    quantity: item.quantity,
    price: item.price * item.quantity
  }));

  orders = [newOrder, ...orders];
  orderItems = [...newOrderItems, ...orderItems];

  saveStoredArray(ordersStorageKey, orders);
  saveStoredArray(orderItemsStorageKey, orderItems);
  deductIngredientsForOrder(newOrderItems);

  clearCart();
  selectedOrderId = newOrder.orderId;
  await loadOrders();
  switchView('orders');
  closePaymentModal();
  alert(`Order placed successfully! ${newOrder.orderId}\nPayment: ${newOrder.paymentMethod}`);
}

async function loadOrders() {
  try {
    orders = await loadDataCollection(ordersStorageKey, 'data/orders.json');
    cacheStoredArray(ordersStorageKey, orders);

    ordersTableBody.innerHTML = orders.map(order => `
      <tr class="order-row" data-order-id="${order.orderId}" style="cursor: pointer;">
        <td>${order.orderId}</td>
        <td>${order.date}</td>
        <td>${formatCurrency(order.totalAmount)}</td>
        <td>${order.paidStatus}</td>
        <td>${order.paymentMethod || 'N/A'}</td>
        <td>
          <button class="btn btn-sm btn-outline-secondary toggle-status-btn" data-order-id="${order.orderId}" type="button" aria-pressed="${order.paidStatus === 'Paid'}">
            ${order.paidStatus === 'Paid' ? 'Pending' : 'Paid'}
          </button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error(error);
    ordersTableBody.innerHTML = '<tr><td colspan="4" class="text-danger">Unable to load orders.</td></tr>';
  }
}

async function loadOrderItems(orderId = null) {
  try {
    orderItems = await loadDataCollection(orderItemsStorageKey, 'data/order-items.json');
    cacheStoredArray(orderItemsStorageKey, orderItems);

    const filteredItems = orderId ? orderItems.filter(item => item.orderId === orderId) : orderItems;

    if (filteredItems.length) {
      orderItemsTableBody.innerHTML = filteredItems.map(item => `
        <tr>
          <td>${item.orderId}</td>
          <td>${item.product}</td>
          <td>${item.quantity}</td>
          <td>${formatCurrency(item.price)}</td>
        </tr>
      `).join('');
    } else {
      orderItemsTableBody.innerHTML = '<tr><td colspan="4" class="text-muted">No items found for this order.</td></tr>';
    }

    orderItemsTitle.textContent = orderId ? `Order Items - ${orderId}` : 'Order Items';
  } catch (error) {
    console.error(error);
    orderItemsTableBody.innerHTML = '<tr><td colspan="4" class="text-danger">Unable to load order items.</td></tr>';
  }
}

async function loadIngredients() {
  try {
    const ingredientData = await loadDataCollection(ingredientsStorageKey, 'data/ingredients.json');
    ingredients = ingredientData.map(normalizeIngredient);
    const didResetCostTracking = resetIngredientCostTrackingIfNeeded();
    saveJsonData(ingredientsStorageKey, ingredients);
    if (didResetCostTracking) {
      console.info('Ingredient cost tracking was reset. New cost-added values will start from fresh restocks.');
    }
    populateIngredientOptionLists();
    populateIngredientActionSelects();
    populateRecipeOptionLists();
    renderIngredientFilters();
    renderIngredients();
    renderAdminIngredients();
  } catch (error) {
    console.error(error);
    ingredientsTableBody.innerHTML = '<tr><td colspan="7" class="text-danger">Unable to load ingredients.</td></tr>';
  }
}

async function loadIngredientCostEntries() {
  try {
    const entryData = await loadDataCollection(ingredientCostEntriesStorageKey, 'data/ingredient-cost-entries.json');
    ingredientCostEntries = entryData
      .map(normalizeIngredientCostEntry)
      .filter(item => item.timestamp && Number(item.costAdded || 0) > 0);
    saveJsonData(ingredientCostEntriesStorageKey, ingredientCostEntries);
  } catch (error) {
    console.error(error);
    ingredientCostEntries = [];
  }

  renderDashboard();
}

function renderIngredientFilters() {
  const categories = ['All', ...new Set(ingredients.map(item => item.category).filter(Boolean))];
  ingredientsFilterBar.innerHTML = categories.map(category => `
    <button class="btn btn-sm ${ingredientFilter === category ? 'btn-success' : 'btn-outline-secondary'} ingredient-filter-btn" data-category="${category}" type="button">${category}</button>
  `).join('');

  ingredientsFilterBar.querySelectorAll('.ingredient-filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      ingredientFilter = button.dataset.category;
      renderIngredientFilters();
      renderIngredients();
    });
  });
}

function renderIngredients() {
  const filteredIngredients = ingredientFilter === 'All'
    ? ingredients
    : ingredients.filter(item => item.category === ingredientFilter);
  const lowStockItems = filteredIngredients.filter(item => Number(item.currentStock || 0) <= 50);
  const lowStockSummary = document.getElementById('low-stock-summary');
  if (lowStockItems.length) {
    lowStockSummary.innerHTML = `<strong>Low stock:</strong> ${lowStockItems.map(item => `${item.name} (${Number(item.currentStock || 0)} ${item.unit || ''})`).join(', ')}`;
    lowStockSummary.classList.remove('d-none');
  } else {
    lowStockSummary.textContent = '';
    lowStockSummary.classList.add('d-none');
  }

  if (!filteredIngredients.length) {
    ingredientsTableBody.innerHTML = '<tr><td colspan="7" class="text-muted">No ingredients match this category.</td></tr>';
    return;
  }

  ingredientsTableBody.innerHTML = filteredIngredients.map(item => {
    const stockValue = Number(item.currentStock);
    const stockClass = stockValue < 0 ? 'text-danger' : stockValue <= 50 ? 'text-warning' : '';

    return `
      <tr>
        <td>${item.ingredientId}</td>
        <td>${item.name}</td>
        <td>${item.category || 'N/A'}</td>
        <td class="${stockClass}">${stockValue.toLocaleString('en-PH', { maximumFractionDigits: 1 })} ${item.unit || ''}</td>
        <td>${formatCurrency(Number(item.unitCost) || 0)}</td>
        <td>${Number(item.baseQuantity || 0).toLocaleString('en-PH', { maximumFractionDigits: 0 })} ${item.unit || ''}</td>
        <td>${formatCurrency(Number(item.baseCost) || 0)}</td>
      </tr>
    `;
  }).join('');
}

async function loadRecipes() {
  try {
    const recipeData = await loadDataCollection(recipesStorageKey, 'data/recipes.json');
    recipes = recipeData.map(normalizeRecipe);
    saveJsonData(recipesStorageKey, recipes);
    recipesList.innerHTML = recipes.map(recipe => `
      <div class="col-md-6 col-xl-4">
        <div class="card recipe-card h-100 shadow-sm">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
              <h3 class="h6 mb-0">${recipe.productName || recipe.productId || recipe.product}</h3>
              <span class="badge ${recipe.isActive === false ? 'bg-secondary-subtle text-secondary' : 'bg-success-subtle text-success'}">${recipe.isActive === false ? 'Inactive' : 'Active'}</span>
            </div>
            <div class="recipe-ingredients">
              ${recipe.ingredients.length ? recipe.ingredients.map(entry => `<span class="recipe-ingredient-pill">${entry.ingredient} (${entry.qty}${entry.unit})</span>`).join('') : '<span class="text-muted small">No ingredients listed</span>'}
            </div>
            <div class="text-muted small">Ingredients: ${recipe.ingredients.length}</div>
          </div>
        </div>
      </div>
    `).join('');
    renderAdminRecipes();
  } catch (error) {
    console.error(error);
    recipesList.innerHTML = '<div class="col-12"><div class="alert alert-danger mb-0">Unable to load recipes.</div></div>';
  }
}

function renderAdminIngredients() {
  if (!adminIngredientsList || !adminIngredientsEmpty) return;

  if (!ingredients.length) {
    adminIngredientsList.innerHTML = '';
    adminIngredientsEmpty.classList.remove('d-none');
    return;
  }

  adminIngredientsEmpty.classList.add('d-none');
  adminIngredientsList.innerHTML = ingredients.map(item => `
    <div class="col-md-6 col-xl-4">
      <div class="card h-100 border-0 bg-light-subtle">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
            <div>
              <div class="small text-muted">${item.ingredientId}</div>
              <div class="fw-semibold">${item.name}</div>
            </div>
            <span class="badge ${item.isActive === false ? 'bg-secondary-subtle text-secondary' : 'bg-success-subtle text-success'}">${item.isActive === false ? 'Inactive' : 'Active'}</span>
          </div>
          <div class="small text-muted">Category: ${item.category || 'N/A'}</div>
          <div class="small text-muted">Stock: ${formatStockText(item)}</div>
          <div class="small text-muted">Base: ${Number(item.baseQuantity || 0).toLocaleString('en-PH', { maximumFractionDigits: 2 })} ${item.unit || ''} · ${formatCurrency(Number(item.baseCost || 0))}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderAdminRecipes() {
  adminRecipesList.innerHTML = recipes.map(recipe => `
    <div class="col-md-6 col-xl-4">
      <div class="card admin-recipe-card h-100 shadow-sm" data-product="${recipe.productName || recipe.productId || recipe.product}" role="button" tabindex="0">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
            <h4 class="h6 mb-0">${recipe.productName || recipe.productId || recipe.product}</h4>
            <span class="badge ${recipe.isActive === false ? 'bg-secondary-subtle text-secondary' : 'bg-success-subtle text-success'}">${recipe.isActive === false ? 'Inactive' : 'Active'}</span>
          </div>
          <div class="recipe-ingredients">
            ${recipe.ingredients.length ? recipe.ingredients.map(entry => `<span class="recipe-ingredient-pill">${entry.ingredient}</span>`).join('') : '<span class="text-muted small">No ingredients listed</span>'}
          </div>
          <div class="text-muted small">${recipe.ingredients.length} ingredient${recipe.ingredients.length === 1 ? '' : 's'}</div>
        </div>
      </div>
    </div>
  `).join('');

  adminRecipesList.querySelectorAll('.admin-recipe-card').forEach(card => {
    card.addEventListener('click', () => {
      const recipe = recipes.find(item => (item.productName || item.productId || item.product) === card.dataset.product);
      if (!recipe) return;
      selectRecipeForEditing(card.dataset.product);
      openRecipeModal(recipe);
    });

    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.click();
      }
    });
  });
}

function renderAdminProducts() {
  adminProductsTableBody.innerHTML = products.map(product => `
    <tr>
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${formatCurrency(product.price)}</td>
      <td>
        <span class="badge ${product.isActive === false ? 'bg-secondary-subtle text-secondary' : 'bg-success-subtle text-success'} me-2">${product.isActive === false ? 'Inactive' : 'Active'}</span>
        <button class="btn btn-sm btn-outline-secondary me-2 edit-product-btn" data-id="${product.id}" type="button">Edit</button>
        <button class="btn btn-sm btn-outline-warning toggle-product-status-btn" data-id="${product.id}" type="button">${product.isActive === false ? 'Activate' : 'Deactivate'}</button>
      </td>
    </tr>
  `).join('');

  adminProductsTableBody.querySelectorAll('.edit-product-btn').forEach(button => {
    button.addEventListener('click', () => {
      const product = products.find(item => item.id === button.dataset.id);
      if (!product) return;
      openProductModal(product);
    });
  });

  adminProductsTableBody.querySelectorAll('.toggle-product-status-btn').forEach(button => {
    button.addEventListener('click', () => {
      const product = products.find(item => item.id === button.dataset.id);
      if (!product) return;
      product.isActive = product.isActive === false;
      saveJsonData(productsStorageKey, products.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        category: item.category || inferProductCategory(item.name),
        isActive: item.isActive !== false
      })));
      renderAdminProducts();
      renderProducts();
      renderCart();
    });
  });
}

function getMonthOptions() {
  const months = new Set();
  orders.forEach(order => {
    if (order.date) {
      months.add(order.date.slice(0, 7));
    }
  });
  getIngredientCostEvents().forEach(event => {
    if (event.timestamp) {
      months.add(event.timestamp.slice(0, 7));
    }
  });
  return [...months].sort().reverse();
}

function getWeeklyBreakdown(monthKey, type) {
  const records = type === 'ingredient'
    ? getIngredientCostEvents(monthKey)
    : orders.filter(order => order.date && order.date.slice(0, 7) === monthKey);

  if (!records.length) {
    return [];
  }

  const entries = records.map(record => ({
    dateValue: type === 'ingredient' ? record.timestamp : record.date,
    value: type === 'ingredient' ? Number(record.costAdded || 0) : Number(record.totalAmount || 0)
  })).filter(entry => entry.value > 0);

  if (!entries.length) {
    return [];
  }

  const datedEntries = entries.map(entry => ({
    ...entry,
    dayStart: toStartOfDay(entry.dateValue)
  })).filter(entry => Boolean(entry.dayStart));

  if (!datedEntries.length) {
    return [];
  }

  datedEntries.sort((a, b) => a.dayStart - b.dayStart);
  const anchorDay = datedEntries[0].dayStart;
  const msPerDay = 24 * 60 * 60 * 1000;
  const bucketMap = new Map();

  datedEntries.forEach(entry => {
    const dayOffset = Math.floor((entry.dayStart - anchorDay) / msPerDay);
    const bucketIndex = Math.max(0, Math.floor(dayOffset / 7));
    const bucketStart = new Date(anchorDay);
    bucketStart.setDate(bucketStart.getDate() + (bucketIndex * 7));
    const bucketEnd = new Date(bucketStart);
    bucketEnd.setDate(bucketEnd.getDate() + 6);
    const label = `${formatMonthDay(bucketStart)} - ${formatMonthDay(bucketEnd)}`;
    const key = bucketStart.toISOString().slice(0, 10);
    const existing = bucketMap.get(key) || { label, value: 0, sortDate: key };
    existing.value += entry.value;
    bucketMap.set(key, existing);
  });

  return [...bucketMap.values()]
    .sort((a, b) => a.sortDate.localeCompare(b.sortDate))
    .map(entry => ({ label: entry.label, value: entry.value }));
}

function renderDashboard() {
  const monthOptions = getMonthOptions();
  dashboardMonthSelect.innerHTML = monthOptions.length
    ? monthOptions.map(month => `<option value="${month}">${month}</option>`).join('')
    : '<option value="">No data</option>';

  if (!monthOptions.length) {
    return;
  }

  if (!dashboardMonthSelect.value) {
    dashboardMonthSelect.value = monthOptions[0];
  }

  const selectedMonth = dashboardMonthSelect.value || monthOptions[0];
  const monthIngredientEvents = getIngredientCostEvents(selectedMonth);
  const ingredientWeeks = getWeeklyBreakdown(selectedMonth, 'ingredient');
  const salesWeeks = getWeeklyBreakdown(selectedMonth, 'sales');

  const ingredientTotal = ingredientWeeks.reduce((sum, entry) => sum + entry.value, 0);
  const salesTotal = salesWeeks.reduce((sum, entry) => sum + entry.value, 0);

  ingredientDashboardSummary.textContent = formatCurrency(ingredientTotal);
  salesDashboardSummary.textContent = formatCurrency(salesTotal);

  ingredientDashboardChart.innerHTML = ingredientWeeks.length
    ? ingredientWeeks.map(entry => `<div class="mb-2"><div class="small text-muted">${entry.label}</div><div class="progress" style="height: 8px;"><div class="progress-bar bg-success" style="width: ${Math.max(12, (entry.value / Math.max(...ingredientWeeks.map(item => item.value), 1)) * 100)}%"></div></div><div class="small mt-1">${formatCurrency(entry.value)}</div></div>`).join('')
    : '<div class="text-muted small">No ingredient cost data for this month.</div>';

  salesDashboardChart.innerHTML = salesWeeks.length
    ? salesWeeks.map(entry => `<div class="mb-2"><div class="small text-muted">${entry.label}</div><div class="progress" style="height: 8px;"><div class="progress-bar bg-primary" style="width: ${Math.max(12, (entry.value / Math.max(...salesWeeks.map(item => item.value), 1)) * 100)}%"></div></div><div class="small mt-1">${formatCurrency(entry.value)}</div></div>`).join('')
    : '<div class="text-muted small">No sales data for this month.</div>';

  ingredientDashboardTableBody.innerHTML = ingredientWeeks.length
    ? ingredientWeeks.map(entry => `<tr><td>${entry.label}</td><td>${formatCurrency(entry.value)}</td></tr>`).join('')
    : '<tr><td colspan="2" class="text-muted">No data</td></tr>';

  if (ingredientDashboardEntriesBody) {
    if (!monthIngredientEvents.length) {
      ingredientDashboardEntriesBody.innerHTML = '<tr><td colspan="5" class="text-muted">No entries</td></tr>';
    } else {
      const dated = monthIngredientEvents
        .map(entry => ({
          ...entry,
          dayStart: toStartOfDay(entry.timestamp)
        }))
        .filter(entry => Boolean(entry.dayStart))
        .sort((a, b) => a.dayStart - b.dayStart);

      const anchorDay = dated[0]?.dayStart || null;
      ingredientDashboardEntriesBody.innerHTML = [...monthIngredientEvents]
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 40)
        .map(entry => {
          const typeLabel = entry.eventType === 'new_item' ? 'New Item' : 'Restock';
          const weekLabel = buildWeekLabelFromAnchor(entry.timestamp, anchorDay);
          return `<tr><td>${formatDateTime(entry.timestamp)}<div class="small text-muted">${weekLabel}</div></td><td>${entry.ingredientName || entry.ingredientId}</td><td>${typeLabel}</td><td>${Number(entry.quantityAdded || 0).toLocaleString('en-PH', { maximumFractionDigits: 2 })} ${entry.unit || ''}</td><td>${formatCurrency(Number(entry.costAdded || 0))}</td></tr>`;
        })
        .join('');
    }
  }

  salesDashboardTableBody.innerHTML = salesWeeks.length
    ? salesWeeks.map(entry => `<tr><td>${entry.label}</td><td>${formatCurrency(entry.value)}</td></tr>`).join('')
    : '<tr><td colspan="2" class="text-muted">No data</td></tr>';
}

function renderReports() {
  const startDate = reportStartDateInput.value;
  const endDate = reportEndDateInput.value;
  const filteredOrders = orders.filter(order => {
    if (startDate && order.date < startDate) return false;
    if (endDate && order.date > endDate) return false;
    return true;
  });

  const filteredOrderIds = new Set(filteredOrders.map(order => order.orderId));
  const filteredOrderItems = orderItems.filter(item => filteredOrderIds.has(item.orderId));

  const totalSales = filteredOrders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);
  const salesCount = filteredOrders.length;
  const bestSeller = filteredOrderItems.reduce((acc, item) => {
    const current = acc.get(item.product) || 0;
    acc.set(item.product, current + Number(item.quantity || 0));
    return acc;
  }, new Map());
  const bestSellerEntry = [...bestSeller.entries()].sort((a, b) => b[1] - a[1])[0];

  renderDashboard();

  reportSummary.innerHTML = `
    <div class="row g-3">
      <div class="col-md-4">
        <div class="border rounded p-3">
          <div class="text-muted small">Total Sales</div>
          <div class="fw-semibold">${formatCurrency(totalSales)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3">
          <div class="text-muted small">Orders</div>
          <div class="fw-semibold">${salesCount}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3">
          <div class="text-muted small">Best Seller</div>
          <div class="fw-semibold">${bestSellerEntry ? bestSellerEntry[0] : 'N/A'}</div>
        </div>
      </div>
    </div>
  `;
}

function openOrderItemsModal(orderId) {
  const filteredItems = orderItems.filter(item => item.orderId === orderId);
  orderItemsModalTitle.textContent = `Order Items - ${orderId}`;
  orderItemsModalBody.innerHTML = filteredItems.length
    ? filteredItems.map(item => `
        <tr>
          <td>${item.product}</td>
          <td>${item.quantity}</td>
          <td>${formatCurrency(item.price)}</td>
        </tr>
      `).join('')
    : '<tr><td colspan="3" class="text-muted">No items found.</td></tr>';
  orderItemsModal.classList.remove('d-none');
  orderItemsModal.setAttribute('aria-hidden', 'false');
}

function closeOrderItemsModal() {
  orderItemsModal.classList.add('d-none');
  orderItemsModal.setAttribute('aria-hidden', 'true');
}

function openPinScreen(viewName = 'pos') {
  pendingViewName = viewName;
  if (authPasswordInput) authPasswordInput.value = '';
  pinScreen.classList.remove('d-none');
  appHeader.classList.add('d-none');
  appMain.classList.add('d-none');
  authEmailInput?.focus();
}

function closePinScreen() {
  pinScreen.classList.add('d-none');
  appHeader.classList.remove('d-none');
  appMain.classList.remove('d-none');
}

function renderView(viewName) {
  navTabs.forEach(tab => {
    const isActive = tab.dataset.view === viewName;
    tab.classList.toggle('active', isActive);
    tab.classList.toggle('btn-primary', isActive);
    tab.classList.toggle('btn-outline-primary', !isActive);
    tab.classList.toggle('btn-outline-secondary', !isActive && viewName !== 'pos');
  });

  viewPanels.forEach(panel => {
    panel.classList.toggle('d-none', panel.id !== `view-${viewName}`);
  });

  if (viewName === 'order-items') {
    loadOrderItems(selectedOrderId);
  } else if (viewName === 'orders') {
    loadOrders();
  } else if (viewName === 'ingredients') {
    loadIngredients();
  } else if (viewName === 'recipes') {
    loadRecipes();
  } else if (viewName === 'admin-panel') {
    renderAdminIngredients();
    renderAdminRecipes();
    renderAdminProducts();
    renderReports();
  }
}

function switchView(viewName) {
  if (isLocked) {
    openPinScreen(viewName);
    return;
  }

  renderView(viewName);
}

async function unlockApp() {
  const email = authEmailInput?.value.trim() || '';
  const password = authPasswordInput?.value || '';
  if (!email || !password) {
    alert('Enter your email and password.');
    return;
  }

  if (!firebaseAuth) {
    alert('Firebase Authentication is unavailable. Check the Firebase config.');
    return;
  }

  setAuthStatus('Signing in...', 'muted');
  try {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    console.error('Authentication failed.', error);
    setAuthStatus(error.message || 'Unable to sign in.', 'danger');
  }
}

clearCartButton.addEventListener('click', clearCart);
payButton.addEventListener('click', openPaymentModal);
lockButton.addEventListener('click', () => {
  if (isLocked) {
    openPinScreen('pos');
  } else {
    signOut(firebaseAuth).catch(error => {
      console.error(error);
      alert('Unable to sign out.');
    });
  }
});
confirmPinModalButton.addEventListener('click', unlockApp);
authPasswordInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    unlockApp();
  }
});
navTabs.forEach(tab => tab.addEventListener('click', () => switchView(tab.dataset.view)));
closePaymentModalButton.addEventListener('click', closePaymentModal);
cancelPaymentButton.addEventListener('click', closePaymentModal);
confirmPaymentButton.addEventListener('click', confirmOrder);
closeOrderItemsModalButton.addEventListener('click', closeOrderItemsModal);
paymentMethodButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedPaymentMethod = button.dataset.method;
    paymentMethodButtons.forEach(item => {
      item.classList.toggle('active', item.dataset.method === selectedPaymentMethod);
      item.classList.toggle('btn-outline-primary', item.dataset.method === selectedPaymentMethod);
      item.classList.toggle('btn-outline-secondary', item.dataset.method !== selectedPaymentMethod);
    });
    cashFields.classList.toggle('d-none', selectedPaymentMethod !== 'Cash');
    gcashFields.classList.toggle('d-none', selectedPaymentMethod !== 'GCash');
    if (selectedPaymentMethod !== 'Cash') {
      cashWarning.classList.add('d-none');
      changeSummary.textContent = '';
    }
  });
});
cashAmountInput.addEventListener('input', updateCashChange);
adminSectionButtons.forEach(button => {
  button.addEventListener('click', () => {
    adminSectionButtons.forEach(item => {
      item.classList.toggle('active', item === button);
      item.classList.toggle('btn-outline-primary', item === button);
      item.classList.toggle('btn-outline-secondary', item !== button);
    });
    adminSections.forEach(section => {
      section.classList.toggle('d-none', section.id !== `admin-${button.dataset.section}-section`);
    });
  });
});

dashboardMonthSelect.addEventListener('change', renderDashboard);

ingredientForm.addEventListener('submit', event => {
  event.preventDefault();
  const ingredientId = ingredientIdInput.value.trim() || generateNextIngredientId();
  const existingIngredient = ingredients.find(item => item.ingredientId === ingredientId);
  if (existingIngredient) {
    alert('Ingredient ID already exists. Please try again.');
    return;
  }

  const baseQuantity = Number(ingredientBaseQtyInput.value || 0);
  const baseCost = Number(ingredientBaseCostInput.value || 0);
  const initialStock = Number(ingredientStockInput.value || 0);

  if (baseQuantity <= 0 || baseCost < 0 || initialStock < 0) {
    alert('Enter valid values for base quantity, base cost, and stock.');
    return;
  }

  const unitCost = baseQuantity > 0 ? baseCost / baseQuantity : 0;
  const quantityAdded = Math.max(0, initialStock);
  const nowIso = new Date().toISOString();
  const restockHistory = [];

  const ingredient = {
    ingredientId,
    name: ingredientNameInput.value.trim(),
    category: ingredientCategoryInput.value.trim(),
    currentStock: initialStock,
    unit: ingredientUnitInput.value.trim(),
    unitCost,
    baseQuantity,
    baseCost,
    createdAt: nowIso.slice(0, 10),
    lastRestockedAt: quantityAdded > 0 && unitCost > 0 ? nowIso : '',
    restockHistory,
    isActive: ingredientActiveInput.value === 'true'
  };

  ingredients.push(ingredient);
  addIngredientCostEntry({
    ingredient,
    quantityAdded,
    unitCostSnapshot: unitCost,
    eventType: 'new_item'
  });

  saveJsonData(ingredientsStorageKey, ingredients);
  closeIngredientModal();
  populateIngredientOptionLists();
  populateIngredientActionSelects();
  populateRecipeOptionLists();
  renderAdminIngredients();
  renderIngredientFilters();
  renderIngredients();
  renderDashboard();
});

if (restockForm) {
  restockForm.addEventListener('submit', event => {
    event.preventDefault();
    const ingredient = getIngredientById(restockIngredientSelect.value);
    const additionalQty = Number(restockQtyInput.value || 0);

    if (!ingredient || additionalQty <= 0) {
      alert('Select an ingredient and enter a valid additional quantity.');
      return;
    }

    const unitCost = Number(ingredient.baseQuantity || 0) > 0
      ? Number(ingredient.baseCost || 0) / Number(ingredient.baseQuantity || 1)
      : Number(ingredient.unitCost || 0);
    const nowIso = new Date().toISOString();

    ingredient.currentStock = Number(ingredient.currentStock || 0) + additionalQty;
    ingredient.unitCost = unitCost;
    ingredient.lastRestockedAt = nowIso;
    ingredient.restockHistory = Array.isArray(ingredient.restockHistory) ? ingredient.restockHistory : [];

    addIngredientCostEntry({
      ingredient,
      quantityAdded: additionalQty,
      unitCostSnapshot: unitCost,
      eventType: 'restock'
    });

    saveJsonData(ingredientsStorageKey, ingredients);
    closeRestockModal();
    populateIngredientActionSelects();
    renderAdminIngredients();
    renderIngredientFilters();
    renderIngredients();
    renderDashboard();
  });
}

if (updateIngredientForm) {
  updateIngredientForm.addEventListener('submit', event => {
    event.preventDefault();
    const ingredient = getIngredientById(updateIngredientSelect.value);
    if (!ingredient) {
      alert('Select an ingredient to update.');
      return;
    }

    const baseQuantity = Number(updateIngredientBaseQtyInput.value || 0);
    const baseCost = Number(updateIngredientBaseCostInput.value || 0);
    if (baseQuantity <= 0 || baseCost < 0) {
      alert('Enter valid base quantity and base cost.');
      return;
    }

    ingredient.name = updateIngredientNameInput.value.trim();
    ingredient.category = updateIngredientCategoryInput.value.trim();
    ingredient.unit = updateIngredientUnitInput.value.trim();
    ingredient.baseQuantity = baseQuantity;
    ingredient.baseCost = baseCost;
    ingredient.unitCost = baseCost / baseQuantity;
    ingredient.isActive = updateIngredientActiveInput.value === 'true';

    saveJsonData(ingredientsStorageKey, ingredients);
    closeUpdateIngredientModal();
    populateIngredientOptionLists();
    populateIngredientActionSelects();
    populateRecipeOptionLists();
    renderAdminIngredients();
    renderIngredientFilters();
    renderIngredients();
  });
}

addProductButton.addEventListener('click', () => openProductModal());
closeProductModalButton.addEventListener('click', closeProductModal);
cancelProductModalButton.addEventListener('click', closeProductModal);
addIngredientButton.addEventListener('click', () => openIngredientModal());
closeIngredientModalButton.addEventListener('click', closeIngredientModal);
cancelIngredientModalButton.addEventListener('click', closeIngredientModal);
if (restockIngredientButton) {
  restockIngredientButton.addEventListener('click', openRestockModal);
}
if (updateIngredientButton) {
  updateIngredientButton.addEventListener('click', openUpdateIngredientModal);
}
if (closeRestockModalButton) {
  closeRestockModalButton.addEventListener('click', closeRestockModal);
}
if (cancelRestockModalButton) {
  cancelRestockModalButton.addEventListener('click', closeRestockModal);
}
if (restockIngredientSelect) {
  restockIngredientSelect.addEventListener('change', refreshRestockPreview);
}
if (closeUpdateIngredientModalButton) {
  closeUpdateIngredientModalButton.addEventListener('click', closeUpdateIngredientModal);
}
if (cancelUpdateIngredientModalButton) {
  cancelUpdateIngredientModalButton.addEventListener('click', closeUpdateIngredientModal);
}
if (updateIngredientSelect) {
  updateIngredientSelect.addEventListener('change', refreshUpdateIngredientForm);
}

productModalForm.addEventListener('submit', event => {
  event.preventDefault();
  const product = {
    id: productModalIdInput.value.trim() || generateNextProductId(),
    name: productModalNameInput.value.trim(),
    price: Number(productModalPriceInput.value || 0),
    category: productModalCategoryInput.value || inferProductCategory(productModalNameInput.value),
    isActive: productModalActiveInput.value === 'true'
  };

  if (!product.name) return;
  const existingIndex = products.findIndex(item => item.id === product.id);
  if (existingIndex >= 0) {
    products[existingIndex] = { ...products[existingIndex], ...product };
  } else {
    products.push(product);
  }

  saveJsonData(productsStorageKey, products.map(item => ({
    productId: item.id,
    name: item.name,
    price: item.price,
    category: item.category || inferProductCategory(item.name),
    isActive: item.isActive !== false
  })));
  closeProductModal();
  renderAdminProducts();
  renderProducts();
  renderCart();
});

addRecipeButton.addEventListener('click', () => {
  clearRecipeSelection();
  openRecipeModal();
});
closeRecipeModalButton.addEventListener('click', closeRecipeModal);
cancelRecipeModalButton.addEventListener('click', closeRecipeModal);
recipeModalProductSelect.addEventListener('change', () => fillRecipeRowsForSelection(recipeModalProductSelect.value));
addRecipeRowButton.addEventListener('click', () => addRecipeRow());
recipeModalForm.addEventListener('submit', event => {
  event.preventDefault();
  const recipe = {
    productName: recipeModalProductSelect.value,
    ingredients: getRecipeEntries(),
    isActive: recipeModalActiveInput.value === 'true'
  };

  if (!recipe.productName || !recipe.ingredients.length) return;
  const existingIndex = recipes.findIndex(item => (item.productName || item.productId || item.product) === recipe.productName);
  if (existingIndex >= 0) {
    recipes[existingIndex] = recipe;
  } else {
    recipes.push(recipe);
  }

  saveJsonData(recipesStorageKey, recipes);
  closeRecipeModal();
  renderAdminRecipes();
  loadRecipes();
});

generateReportButton.addEventListener('click', renderReports);
if (applyFirebaseConnectionButton) {
  applyFirebaseConnectionButton.addEventListener('click', applyFirebaseConnection);
}
if (saveAccountSettingsButton) {
  saveAccountSettingsButton.addEventListener('click', saveAccountSettings);
}
if (reloadAccountSettingsButton) {
  reloadAccountSettingsButton.addEventListener('click', refreshAccountSettings);
}
if (seedDatabaseButton) {
  seedDatabaseButton.addEventListener('click', seedDefaultDatabase);
}
ordersTableBody.addEventListener('click', event => {
  const toggleButton = event.target.closest('.toggle-status-btn');
  if (toggleButton) {
    event.stopPropagation();
    toggleOrderStatus(toggleButton.dataset.orderId);
    return;
  }

  const row = event.target.closest('.order-row');
  if (!row) return;

  selectedOrderId = row.dataset.orderId;
  openOrderItemsModal(selectedOrderId);
});

loadProducts();
loadOrders();
loadOrderItems();
loadIngredients();
loadIngredientCostEntries();
loadRecipes();
renderCart();
hydrateFirebaseConnectionInputs();
isLocked = true;
lockButton.textContent = 'Sign In';
renderView('pos');
openPinScreen('pos');
