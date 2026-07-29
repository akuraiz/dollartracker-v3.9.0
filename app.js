
"use strict";

const APP_VERSION = "3.8.1";
const RECORD_KEY = "dollarTracker.records.v3";
const SETTINGS_KEY = "dollarTracker.settings.v3";
const STATE_KEY = "dollarTracker.state.v3";

const LEGACY_RECORD_KEYS = [
  "wifeyMoneyRecords.liquid.v1",
  "wifeyMoneyRecords",
  "dollarTrackerRecords.v1"
];

const LEGACY_SETTINGS_KEYS = [
  "dollarTrackerSettings.v1",
  "wifeyMoneySettings.liquid.v1",
  "wifeyMoneySettings.liquid.v2"
];

const DEFAULT_CATEGORY_DEFS = [
  { id: "food", nameKey: "catFood", fallback: "Food" },
  { id: "transfer", nameKey: "catTransfer", fallback: "Transfer" },
  { id: "shopping", nameKey: "catShopping", fallback: "Shopping" },
  { id: "transport", nameKey: "catTransport", fallback: "Transport" },
  { id: "savings", nameKey: "catSavings", fallback: "Savings" },
  { id: "other", nameKey: "catOther", fallback: "Other" }
];

const CATEGORY_KEYS = DEFAULT_CATEGORY_DEFS.map(category => category.id);

const defaultSettings = {
  appName: "DollarTracker",
  language: "en",
  theme: "dark",
  themeTemplate: "mono",
  displayCurrency: "USD",
  exchangeRate: 4000,
  lastBackupAt: "",
  backupReminderDismissedAt: "",
  categories: [],
  categoryBudgets: {},
  lastBackupRecordCount: 0
};

const currencyPresets = {
  USD: { symbol: "$", decimals: 2, step: "0.01", placeholder: "8.60", chips: [1, 5, 10, 50] },
  KHR: { symbol: "៛", decimals: 0, step: "1", placeholder: "8600", chips: [1000, 5000, 10000, 50000] }
};

const QUICK_DESCRIPTION_KEYS = ["AC", "Food", "Coffee", "Transfer", "Shopping", "Transport"];
const HISTORY_PAGE_SIZE = 50;

const I18N = {
  en: {
    eyebrow:"Private local ledger", home:"Home", add:"Add", addRecord:"Add Record", history:"History", backup:"Backup", settings:"Settings",
    localOnly:"Local only", balanceLeft:"Balance Left", copy:"Copy", addOut:"Add Out", addIn:"Add In", moneyUsed:"Amount used", moneyAdded:"Amount added",
    amountUsed:"Amount Used", totalIn:"Total In", totalOut:"Total Out", recent:"Recent", latestMovement:"Latest transaction", viewAll:"View all",
    newTransaction:"New Transaction", positiveOnly:"Enter positive numbers only. Type decides in or out.", type:"Type", out:"Out", in:"In", amount:"Amount",
    whatFor:"Description", whatForPlaceholder:"Food, AC transfer, coffee...", date:"Date", note:"Note", optionalNote:"Optional note", saveRecord:"Save Record",
    remember:"Remember", rememberText:"<strong>Money received = In.</strong><br><strong>Money used or sent = Out.</strong><br>Never type minus signs.",
    allRecords:"All Records", historyHint:"Search, filter, and review your records.", summary:"Summary", all:"All", searchRecords:"Search records...",
    fromDate:"From", toDate:"To", newest:"Newest first", oldest:"Oldest first", highest:"Highest amount", lowest:"Lowest amount", clearFilters:"Clear Filters", filter:"Filter", filterRecords:"Filter Records", filterHint:"Narrow records by date or sorting.", sortBy:"Sort by", applyFilters:"Apply Filters",
    backupExport:"Backup & Export", backupHint:"Your records stay in this browser. Export backup regularly.", lastBackup:"Last backup", never:"Never",
    backupReminderTitle:"Backup Reminder", backupReminderText:"It has been a while since your last backup. Export one now so your records stay safe.", backupReminderNeverText:"You have records but no backup yet. Export one now so you can restore later.", dismiss:"Dismiss",
    exportBackup:"Export Backup JSON", exportCsv:"Export CSV", importBackup:"Import Backup JSON", safetyHabit:"Safety habit",
    safetyHint:"After adding records, export a backup and save it to iCloud Drive or Google Drive.", appearance:"Appearance", displayMode:"Display Mode",
    dark:"Dark", light:"Light", themeTemplate:"Theme Template", coreThemes:"Core", signatureThemes:"Signature", monoTheme:"Silver", pinkTheme:"Pink", goldTheme:"Gold", skyTheme:"Sky", matchaTheme:"Matcha", sunsetTheme:"Sunset", lavenderTheme:"Lavender", christmasTheme:"Frost Pine", webTheme:"Web", symbioteTheme:"Symbiote", blushTheme:"Blush Pop", oceanTheme:"Ocean", pearlTheme:"Pearl", moneySettings:"Money Settings",
    exchangeRate:"Exchange Rate", exchangeRateHint:"Default: 1 USD = 4000៛", appName:"App Name", appNameHint:"Shown inside the app",
    saveSettings:"Save Settings", dangerZone:"Danger Zone", dangerHint:"Tap twice to clear all records.", clearAll:"Clear All Records",
    tapAgainClear:"Tap again to clear", record:"record", records:"records", noRecords:"No records here yet.", delete:"Delete",
    usedProgress:"{percent}% of received amount used", summaryTitle:"Summary", summaryHint:"Based on current History filters.", close:"Close",
    enterValidAmount:"Enter a valid amount", recordSaved:"Record saved", recordDeleted:"Record deleted", noUndo:"No record to undo", balanceCopied:"Balance copied",
    copyManual:"Copy manually:", backupExported:"Backup exported", csvExported:"CSV exported", backupImported:"Backup imported", settingsSaved:"Settings saved",
    cleared:"All records cleared", deleteConfirm:"Delete this record?", noDescription:"No description",
    importConfirm:"Import backup? This will replace current records in this browser.", importError:"Could not import backup. Make sure it is the correct JSON file.",
    addedFallback:"Amount added", usedFallback:"Amount used", changedToEnglish:"Changed to English", changedToKhmer:"Changed to Khmer",
    edit:"Edit", editRecord:"Edit Record",
    editHint:"History amounts stay locked unless you edit this record.", currency:"Currency", saveChanges:"Save Changes", recordUpdated:"Record updated", category:"Category", thisMonth:"This Month", monthlyHint:"Quick monthly view", balance:"Balance", topCategory:"Top category: {category}", none:"None",
    monthlyBudgets:"Monthly Budgets", monthlyBudgetsHint:"Track spending caps for this month.", categoryChart:"Category Breakdown", categoryChartHint:"This month’s spending by category.", noCategorySpending:"No category spending this month.", categoryManager:"Manage Categories", categoryManagerHint:"Add, rename, remove, or reset categories.", newCategoryPlaceholder:"New category name", addCategory:"Add", save:"Save", remove:"Remove", resetCategories:"Reset to Default", categoryExists:"Category already exists", categoryAdded:"Category added", categoryRenamed:"Category renamed", categoryRemoved:"Category removed", categoriesReset:"Categories reset", cannotRemoveOther:"Other cannot be removed", removeCategoryConfirm:"Remove this category? Existing records will move to Other.", resetCategoriesConfirm:"Reset categories to default? Custom categories will move to Other.", categoryBudgets:"Category Budgets", categoryBudgetsHint:"Monthly caps per category. Stored internally in USD.", budgetCurrencyNote:"Shown in current display currency.", saveBudgets:"Save Budgets", budgetsSaved:"Budgets saved", noBudgetsSet:"No budgets set yet. Add caps in Settings.", budgetSpentLine:"{spent} of {budget}", budgetInputHint:"Leave 0 for no cap.", quickAC:"AC", quickAC:"AC", quickFood:"Food", quickCoffee:"Coffee", quickTransfer:"Transfer", quickShopping:"Shopping", catFood:"Food", catTransfer:"Transfer", catShopping:"Shopping", catTransport:"Transport", catSavings:"Savings", catOther:"Other", calculator:"Calculator", calculatorHint:"Calculate and use as amount.", useAmount:"Use Amount", khrWholeOnly:"KHR uses whole Riel only", quickTransport:"Transport", showMore:"Show more", showingRecords:"Showing {shown} of {total}", editHistory:"Edit History", noEdits:"No edits yet.", editedOn:"Edited {date}", editChangeLine:"{field}: {from} → {to}", fieldType:"Type", fieldAmount:"Amount", fieldCategory:"Category", fieldDescription:"Description", fieldDate:"Date", fieldNote:"Note", selectedRecords:"{count} selected", selectedTotal:"Selected total", clearSelection:"Clear", selectRecord:"Select record", selectHistory:"Select", doneSelection:"Done", selectAllVisible:"Select visible", quickAdd:"Quick Add", quickAddHint:"Fast entry with clean presets.", quickAddAmount:"Amount", saveQuickAdd:"Save Quick Add", openFullAdd:"Open full Add", importPreview:"Import backup?\n\nBackup records: {count}\nExported: {date}\nVersion: {version}\n\nThis will replace current records in this browser.", backupReminderNewRecordsText:"You added 10+ records since your last backup. Export one now so your records stay safe.", newVersionAvailable:"New version available. Reopen app."
  },
  km: {
    eyebrow:"បញ្ជីទឹកប្រាក់ឯកជន", home:"ទំព័រដើម", add:"បញ្ចូល", addRecord:"បញ្ចូលកំណត់ត្រា", history:"ប្រវត្តិ", backup:"បម្រុងទុក", settings:"ការកំណត់",
    localOnly:"រក្សាទុកក្នុងម៉ាស៊ីននេះ", balanceLeft:"ទឹកប្រាក់នៅសល់", copy:"ចម្លង", addOut:"បញ្ចូលចំណាយ", addIn:"បញ្ចូលចំណូល",
    moneyUsed:"ទឹកប្រាក់បានប្រើ", moneyAdded:"ទឹកប្រាក់បានបន្ថែម", amountUsed:"ទឹកប្រាក់បានប្រើ", totalIn:"ចំណូលសរុប", totalOut:"ចំណាយសរុប",
    recent:"ថ្មីៗនេះ", latestMovement:"កំណត់ត្រាចុងក្រោយ", viewAll:"មើលទាំងអស់", newTransaction:"កំណត់ត្រាថ្មី",
    positiveOnly:"បញ្ចូលតែលេខវិជ្ជមាន។ ប្រភេទនឹងកំណត់ថា ចូល ឬ ចេញ។", type:"ប្រភេទ", out:"ចេញ", in:"ចូល", amount:"ចំនួនទឹកប្រាក់",
    whatFor:"ការពិពណ៌នា", whatForPlaceholder:"អាហារ, ផ្ទេរ AC, កាហ្វេ...", date:"កាលបរិច្ឆេទ", note:"ចំណាំ", optionalNote:"ចំណាំបន្ថែម",
    saveRecord:"រក្សាទុក", remember:"ចងចាំ",
    rememberText:"<strong>ទឹកប្រាក់បានទទួល = ចូល</strong><br><strong>ទឹកប្រាក់បានប្រើ ឬ ផ្ញើចេញ = ចេញ</strong><br>កុំវាយសញ្ញាដក (-)។",
    allRecords:"កំណត់ត្រាទាំងអស់", historyHint:"ស្វែងរក តម្រៀប និងពិនិត្យកំណត់ត្រារបស់អ្នក។", summary:"សង្ខេប", all:"ទាំងអស់",
    searchRecords:"ស្វែងរកកំណត់ត្រា...", fromDate:"ពីថ្ងៃ", toDate:"ដល់ថ្ងៃ", newest:"ថ្មីបំផុត", oldest:"ចាស់បំផុត",
    highest:"ចំនួនច្រើនបំផុត", lowest:"ចំនួនតិចបំផុត", clearFilters:"លុបតម្រង", filter:"តម្រង", filterRecords:"តម្រងកំណត់ត្រា", filterHint:"កំណត់តាមកាលបរិច្ឆេទ ឬការតម្រៀប។", sortBy:"តម្រៀបតាម", applyFilters:"អនុវត្តតម្រង", backupExport:"បម្រុងទុក និងនាំចេញ",
    backupHint:"កំណត់ត្រាត្រូវបានរក្សាទុកក្នុង Browser នេះ។ សូមនាំចេញ Backup ជាប្រចាំ។", lastBackup:"បម្រុងទុកចុងក្រោយ",
    never:"មិនទាន់មាន", backupReminderTitle:"រំលឹក Backup", backupReminderText:"បានយូរហើយតាំងពី Backup ចុងក្រោយ។ សូមនាំចេញ Backup ដើម្បីរក្សាកំណត់ត្រាឱ្យមានសុវត្ថិភាព។", backupReminderNeverText:"អ្នកមានកំណត់ត្រា ប៉ុន្តែមិនទាន់មាន Backup ទេ។ សូមនាំចេញ Backup ដើម្បីអាចស្ដារវិញពេលក្រោយ។", dismiss:"បិទ",
    exportBackup:"នាំចេញ Backup JSON", exportCsv:"នាំចេញ CSV", importBackup:"នាំចូល Backup JSON",
    safetyHabit:"ទម្លាប់សុវត្ថិភាព", safetyHint:"បន្ទាប់ពីបញ្ចូលកំណត់ត្រា សូមនាំចេញ Backup ហើយរក្សាទុកក្នុង iCloud Drive ឬ Google Drive។",
    appearance:"រូបរាង", displayMode:"របៀបបង្ហាញ", dark:"ងងឹត", light:"ភ្លឺ", themeTemplate:"គំរូពណ៌", coreThemes:"មូលដ្ឋាន", signatureThemes:"ពិសេស", monoTheme:"Silver",
    pinkTheme:"Pink", goldTheme:"Gold", skyTheme:"Sky", matchaTheme:"Matcha", sunsetTheme:"Sunset", lavenderTheme:"Lavender", christmasTheme:"Frost Pine", webTheme:"Web", symbioteTheme:"Symbiote", blushTheme:"Blush Pop", oceanTheme:"Ocean", pearlTheme:"Pearl", moneySettings:"ការកំណត់ទឹកប្រាក់", exchangeRate:"អត្រាប្តូរប្រាក់", exchangeRateHint:"លំនាំដើម៖ 1 USD = 4000៛",
    appName:"ឈ្មោះកម្មវិធី", appNameHint:"បង្ហាញនៅក្នុងកម្មវិធី", saveSettings:"រក្សាទុកការកំណត់", dangerZone:"តំបន់ប្រុងប្រយ័ត្ន",
    dangerHint:"ចុចពីរដងដើម្បីលុបកំណត់ត្រាទាំងអស់។", clearAll:"លុបកំណត់ត្រាទាំងអស់", tapAgainClear:"ចុចម្ដងទៀតដើម្បីលុប",
    record:"កំណត់ត្រា", records:"កំណត់ត្រា", noRecords:"មិនទាន់មានកំណត់ត្រា។", delete:"លុប",
    usedProgress:"បានប្រើ {percent}% នៃទឹកប្រាក់ចូលសរុប", summaryTitle:"សង្ខេប", summaryHint:"ផ្អែកលើតម្រងក្នុងទំព័រប្រវត្តិ។", close:"បិទ",
    enterValidAmount:"សូមបញ្ចូលចំនួនទឹកប្រាក់ឱ្យត្រឹមត្រូវ", recordSaved:"បានរក្សាទុក", recordDeleted:"បានលុបកំណត់ត្រា", noUndo:"មិនមានកំណត់ត្រាឱ្យត្រឡប់ក្រោយទេ",
    balanceCopied:"បានចម្លងទឹកប្រាក់នៅសល់", copyManual:"ចម្លងដោយដៃ:", backupExported:"បាននាំចេញ Backup", csvExported:"បាននាំចេញ CSV", backupImported:"បាននាំចូល Backup",
    settingsSaved:"បានរក្សាទុកការកំណត់", cleared:"បានលុបកំណត់ត្រាទាំងអស់", deleteConfirm:"តើចង់លុបកំណត់ត្រានេះមែនទេ?", noDescription:"គ្មានការពិពណ៌នា",
    importConfirm:"នាំចូល Backup? វានឹងជំនួសកំណត់ត្រាបច្ចុប្បន្នក្នុង Browser នេះ។", importError:"មិនអាចនាំចូល Backup បានទេ។ សូមពិនិត្យថា វាជាឯកសារ JSON ត្រឹមត្រូវ។",
    addedFallback:"ទឹកប្រាក់បានបន្ថែម", usedFallback:"ទឹកប្រាក់បានប្រើ", changedToEnglish:"បានប្តូរទៅភាសាអង់គ្លេស", changedToKhmer:"បានប្តូរទៅភាសាខ្មែរ",
    edit:"កែ", editRecord:"កែប្រែកំណត់ត្រា",
    editHint:"ចំនួនទឹកប្រាក់ក្នុងប្រវត្តិនឹងនៅដដែល លុះត្រាតែអ្នកកែប្រែកំណត់ត្រានេះ។", currency:"រូបិយប័ណ្ណ", saveChanges:"រក្សាទុកការកែប្រែ", recordUpdated:"បានកែប្រែកំណត់ត្រា", category:"ប្រភេទ", thisMonth:"ខែនេះ", monthlyHint:"សង្ខេបប្រចាំខែ", balance:"សមតុល្យ", topCategory:"ប្រភេទប្រើច្រើនបំផុត៖ {category}", monthlyBudgets:"ថវិកាប្រចាំខែ", monthlyBudgetsHint:"តាមដានកម្រិតចំណាយសម្រាប់ខែនេះ។", categoryChart:"បំបែកតាមប្រភេទ", categoryChartHint:"ចំណាយខែនេះតាមប្រភេទ។", noCategorySpending:"មិនទាន់មានចំណាយតាមប្រភេទសម្រាប់ខែនេះ។", categoryManager:"គ្រប់គ្រងប្រភេទ", categoryManagerHint:"បន្ថែម ប្តូរឈ្មោះ លុប ឬកំណត់ប្រភេទឡើងវិញ។", newCategoryPlaceholder:"ឈ្មោះប្រភេទថ្មី", addCategory:"បន្ថែម", save:"រក្សាទុក", remove:"លុប", resetCategories:"កំណត់លំនាំដើម", categoryExists:"ប្រភេទនេះមានរួចហើយ", categoryAdded:"បានបន្ថែមប្រភេទ", categoryRenamed:"បានប្តូរឈ្មោះប្រភេទ", categoryRemoved:"បានលុបប្រភេទ", categoriesReset:"បានកំណត់ប្រភេទឡើងវិញ", cannotRemoveOther:"មិនអាចលុប ផ្សេងៗ បានទេ", removeCategoryConfirm:"លុបប្រភេទនេះ? កំណត់ត្រាដែលមានស្រាប់នឹងផ្លាស់ទៅ ផ្សេងៗ។", resetCategoriesConfirm:"កំណត់ប្រភេទទៅលំនាំដើមវិញ? ប្រភេទផ្ទាល់ខ្លួននឹងផ្លាស់ទៅ ផ្សេងៗ។", categoryBudgets:"ថវិកាតាមប្រភេទ", categoryBudgetsHint:"កម្រិតប្រចាំខែតាមប្រភេទ។ រក្សាទុកជាប្រាក់ដុល្លារខាងក្នុង។", budgetCurrencyNote:"បង្ហាញជារូបិយប័ណ្ណបច្ចុប្បន្ន។", saveBudgets:"រក្សាទុកថវិកា", budgetsSaved:"បានរក្សាទុកថវិកា", noBudgetsSet:"មិនទាន់កំណត់ថវិកា។ បន្ថែមកម្រិតក្នុងការកំណត់។", budgetSpentLine:"{spent} នៃ {budget}", budgetInputHint:"ទុក 0 ប្រសិនបើគ្មានកម្រិត។", editHistory:"ប្រវត្តិកែប្រែ", noEdits:"មិនទាន់មានការកែប្រែ។", editedOn:"បានកែ {date}", editChangeLine:"{field}: {from} → {to}", fieldType:"ប្រភេទ", fieldAmount:"ចំនួនទឹកប្រាក់", fieldCategory:"ប្រភេទ", fieldDescription:"ការពិពណ៌នា", fieldDate:"កាលបរិច្ឆេទ", fieldNote:"ចំណាំ", selectedRecords:"បានជ្រើស {count}", selectedTotal:"សរុបដែលបានជ្រើស", clearSelection:"លុបជម្រើស", selectRecord:"ជ្រើសកំណត់ត្រា", selectHistory:"ជ្រើស", doneSelection:"រួចរាល់", selectAllVisible:"ជ្រើសដែលមើលឃើញ", quickAdd:"បញ្ចូលលឿន", quickAddHint:"បញ្ចូលរហ័សដោយប្រើជម្រើសស្អាតៗ។", quickAddAmount:"ចំនួនទឹកប្រាក់", saveQuickAdd:"រក្សាទុកលឿន", openFullAdd:"បើកទំព័របញ្ចូលពេញ", importPreview:"នាំចូល Backup?\n\nកំណត់ត្រា Backup: {count}\nបាននាំចេញ: {date}\nកំណែ: {version}\n\nវានឹងជំនួសកំណត់ត្រាបច្ចុប្បន្នក្នុង Browser នេះ។", backupReminderNewRecordsText:"អ្នកបានបញ្ចូលកំណត់ត្រា 10+ ចាប់តាំងពី Backup ចុងក្រោយ។ សូមនាំចេញ Backup ដើម្បីរក្សាកំណត់ត្រាឱ្យមានសុវត្ថិភាព។", none:"គ្មាន", quickAC:"AC", quickAC:"AC", quickFood:"អាហារ", quickCoffee:"កាហ្វេ", quickTransfer:"ផ្ទេរ", quickShopping:"ទិញឥវ៉ាន់", catFood:"អាហារ", catTransfer:"ផ្ទេរ", catShopping:"ទិញឥវ៉ាន់", catTransport:"ធ្វើដំណើរ", catSavings:"សន្សំ", catOther:"ផ្សេងៗ", calculator:"ម៉ាស៊ីនគិតលេខ", calculatorHint:"គណនា ហើយយកទៅប្រើជាចំនួនទឹកប្រាក់។", useAmount:"ប្រើចំនួននេះ", khrWholeOnly:"KHR ប្រើតែចំនួនរៀលពេញ", quickTransport:"ធ្វើដំណើរ", showMore:"មើលបន្ថែម", showingRecords:"បង្ហាញ {shown} ក្នុងចំណោម {total}", newVersionAvailable:"មានកំណែថ្មី។ សូមបើកកម្មវិធីឡើងវិញ។"
  }
};

let records = [];
let settings = { ...defaultSettings };
let activeFilter = "All";
let searchTerm = "";
let fromDate = "";
let toDate = "";
let sortMode = "newest";
let historyVisibleCount = HISTORY_PAGE_SIZE;
let clearArmedUntil = 0;
let previousPageIndex = 0;
let balanceAnimationFrame = null;
let calcState = { currency: "USD", current: "0", stored: null, operator: null, fresh: true };
let selectedRecordIds = new Set();
let selectionMode = false;
let activeSwipeCard = null;
let quickAddState = { description: "Food", category: "food" };

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function safeParse(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function tr(key, vars = {}) {
  let value = I18N[settings.language]?.[key] || I18N.en[key] || key;
  for (const [name, replacement] of Object.entries(vars)) value = value.replace(`{${name}}`, replacement);
  return value;
}

function todayISO(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizeCurrencyCode(value, fallback = "USD") {
  const raw = String(value || "").trim().toUpperCase();
  if (raw === "KHR" || raw === "៛" || raw === "RIEL") return "KHR";
  if (raw === "USD" || raw === "$") return "USD";
  return fallback === "KHR" ? "KHR" : "USD";
}

function uid() {
  return crypto?.randomUUID ? crypto.randomUUID() : `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}


function defaultCategoryList() {
  return DEFAULT_CATEGORY_DEFS.map(category => ({
    id: category.id,
    name: category.fallback,
    nameKey: category.nameKey,
    isDefault: true
  }));
}

function makeCategoryId(name) {
  const base = String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 24) || `category-${Date.now()}`;
  const taken = new Set(categoryKeys());
  if (!taken.has(base)) return base;
  let index = 2;
  while (taken.has(`${base}-${index}`)) index += 1;
  return `${base}-${index}`;
}

function normalizeCategoryList(input = []) {
  const source = Array.isArray(input) && input.length ? input : defaultCategoryList();
  const seen = new Set();
  const output = [];

  source.forEach(category => {
    const id = String(category?.id || "").trim() || makeCategoryId(category?.name || "");
    if (!id || seen.has(id)) return;
    const defaultDef = DEFAULT_CATEGORY_DEFS.find(item => item.id === id);
    const name = String(category?.name || defaultDef?.fallback || "").trim().slice(0, 28);
    if (!name) return;
    seen.add(id);
    output.push({
      id,
      name,
      nameKey: defaultDef && name === defaultDef.fallback ? defaultDef.nameKey : "",
      isDefault: Boolean(defaultDef)
    });
  });

  if (!output.some(category => category.id === "other")) {
    const other = DEFAULT_CATEGORY_DEFS.find(category => category.id === "other");
    output.push({ id: "other", name: other.fallback, nameKey: other.nameKey, isDefault: true });
  }

  return output.slice(0, 20);
}

function categoryDefs() {
  return normalizeCategoryList(settings.categories);
}

function categoryKeys() {
  return categoryDefs().map(category => category.id);
}

function categoryKey(category) {
  return categoryKeys().includes(category) ? category : "other";
}

function resetCategoryRelatedData(allowedKeys = categoryKeys()) {
  const allowed = new Set(allowedKeys);
  records.forEach(record => {
    if (!allowed.has(record.category)) record.category = "other";
  });
  const nextBudgets = {};
  allowedKeys.forEach(key => {
    const value = Number(settings.categoryBudgets?.[key] || 0);
    nextBudgets[key] = Number.isFinite(value) && value > 0 ? Math.round(value * 100) / 100 : 0;
  });
  settings.categoryBudgets = nextBudgets;
}

function sanitizeSettings(input = {}) {
  const source = input && typeof input === "object" ? input : {};
  const merged = { ...defaultSettings, ...source };

  if (!source.displayCurrency && source.currencyMode) merged.displayCurrency = normalizeCurrencyCode(source.currencyMode, merged.displayCurrency);
  if (!source.displayCurrency && source.currency) merged.displayCurrency = normalizeCurrencyCode(source.currency, merged.displayCurrency);
  merged.displayCurrency = normalizeCurrencyCode(merged.displayCurrency, "USD");

  if (!["USD", "KHR"].includes(merged.displayCurrency)) merged.displayCurrency = "USD";
  if (!Number.isFinite(Number(merged.exchangeRate)) || Number(merged.exchangeRate) <= 0) merged.exchangeRate = 4000;

  merged.exchangeRate = Number(merged.exchangeRate);
  if (!["en", "km"].includes(merged.language)) merged.language = "en";
  if (!["dark", "light"].includes(merged.theme)) merged.theme = "dark";
  if (!["mono", "gold", "sky", "matcha", "sunset", "lavender", "christmas", "pink", "web", "symbiote", "blush", "ocean", "pearl"].includes(merged.themeTemplate)) merged.themeTemplate = "mono";
  if (!merged.appName || merged.appName === "Wifey Money") merged.appName = "DollarTracker";

  merged.categories = normalizeCategoryList(merged.categories);
  const rawBudgets = merged.categoryBudgets && typeof merged.categoryBudgets === "object" ? merged.categoryBudgets : {};
  merged.categoryBudgets = {};
  merged.categories.map(category => category.id).forEach(key => {
    const value = Number(rawBudgets[key] || 0);
    merged.categoryBudgets[key] = Number.isFinite(value) && value > 0 ? Math.round(value * 100) / 100 : 0;
  });

  const backupRecordCount = Number(merged.lastBackupRecordCount || 0);
  merged.lastBackupRecordCount = Number.isFinite(backupRecordCount) && backupRecordCount > 0 ? Math.floor(backupRecordCount) : 0;

  return merged;
}

function currencyInfo(currency = settings.displayCurrency) {
  return currencyPresets[currency] || currencyPresets.USD;
}

function usdToDisplay(amountUSD, currency = settings.displayCurrency) {
  return currency === "KHR" ? Number(amountUSD || 0) * Number(settings.exchangeRate || 4000) : Number(amountUSD || 0);
}

function displayToUsd(amount, currency = settings.displayCurrency) {
  const value = currency === "KHR" ? Math.round(Number(amount || 0)) : Number(amount || 0);
  return currency === "KHR" ? value / Number(settings.exchangeRate || 4000) : value;
}

function formatRawMoney(value, currency) {
  const info = currencyInfo(currency);
  const numericValue = currency === "KHR" ? Math.round(Number(value || 0)) : Number(value || 0);
  const formatted = numericValue.toLocaleString(settings.language === "km" ? "km-KH" : undefined, {
    minimumFractionDigits: info.decimals,
    maximumFractionDigits: info.decimals
  });
  return `${info.symbol}${formatted}`;
}

function formatMoneyFromUSD(amountUSD, currency = settings.displayCurrency) {
  return formatRawMoney(usdToDisplay(amountUSD, currency), currency);
}

function formatRecordOriginalMoney(record) {
  const currency = record.originalCurrency === "KHR" ? "KHR" : "USD";
  const entryRate = Number(record.exchangeRateAtEntry || settings.exchangeRate || 4000);
  let amount = Number(record.originalAmount || 0);

  if (!amount || amount <= 0) {
    amount = currency === "KHR"
      ? Number(record.amountUSD || 0) * entryRate
      : Number(record.amountUSD || 0);
  }

  if (currency === "KHR") amount = Math.round(amount);
  return `${record.type === "In" ? "" : "-"}${formatRawMoney(amount, currency)}`;
}





































function categoryLabel(category) {
  const key = categoryKey(category);
  const def = categoryDefs().find(item => item.id === key);
  if (!def) return tr("catOther");
  return def.nameKey ? tr(def.nameKey) : def.name;
}

function quickDescriptionLabel(value) {
  return tr(`quick${value}`) || value;
}

function renderCategoryOptions(select, selected = "other") {
  if (!select) return;
  const keys = categoryKeys();
  select.innerHTML = categoryDefs().map(category => `<option value="${category.id}">${escapeHTML(categoryLabel(category.id))}</option>`).join("");
  select.value = keys.includes(selected) ? selected : "other";
}

function renderQuickDescriptionChips() {
  const container = $("#quickDescChips");
  if (!container) return;
  container.innerHTML = QUICK_DESCRIPTION_KEYS.map(value => `<button type="button" data-quick-desc="${value}">${quickDescriptionLabel(value)}</button>`).join("");
  $$('[data-quick-desc]').forEach(button => button.addEventListener('click', () => {
    $("#descriptionInput").value = button.dataset.quickDesc;
    $("#descriptionInput").focus();
    debouncedStateSave();
  }));
}

function currentMonthRecords() {
  const month = todayISO().slice(0, 7);
  return records.filter(record => (record.date || "").slice(0, 7) === month);
}


function budgetForCategoryUSD(category) {
  const key = categoryKey(category);
  return Number(settings.categoryBudgets?.[key] || 0);
}

function monthlySpendingByCategory() {
  const spending = {};
  categoryKeys().forEach(key => { spending[key] = 0; });
  currentMonthRecords().filter(record => record.type === "Out").forEach(record => {
    const key = categoryKey(record.category);
    spending[key] += Number(record.amountUSD || 0);
  });
  return spending;
}

function budgetDisplayInputValue(amountUSD) {
  if (!amountUSD) return "";
  const display = usdToDisplay(amountUSD, settings.displayCurrency);
  return settings.displayCurrency === "KHR" ? String(Math.round(display)) : String(Math.round(display * 100) / 100);
}

function renderBudgetSettings() {
  const container = $("#budgetInputList");
  if (!container) return;
  const info = currencyInfo(settings.displayCurrency);
  container.innerHTML = categoryKeys().map(key => {
    const value = budgetDisplayInputValue(budgetForCategoryUSD(key));
    return `
      <label class="budget-input-row">
        <div>
          <strong>${escapeHTML(categoryLabel(key))}</strong>
          <small>${tr("budgetInputHint")}</small>
        </div>
        <input type="number" inputmode="${settings.displayCurrency === "KHR" ? "numeric" : "decimal"}" min="0" step="${info.step}" placeholder="0" value="${escapeHTML(value)}" data-budget-input="${key}" />
      </label>
    `;
  }).join("");
}

function saveCategoryBudgets() {
  const next = {};
  $$("[data-budget-input]").forEach(input => {
    const key = input.dataset.budgetInput;
    let value = Number(input.value || 0);
    if (!Number.isFinite(value) || value <= 0) {
      next[key] = 0;
      return;
    }
    if (settings.displayCurrency === "KHR") value = Math.round(value);
    next[key] = Math.round(displayToUsd(value, settings.displayCurrency) * 100) / 100;
  });
  settings.categoryBudgets = next;
  saveSettings();
  saveState();
  render();
  showToast(tr("budgetsSaved"));
}

function renderBudgetProgress() {
  const container = $("#budgetProgressList");
  const panel = $("#budgetPanel");
  if (!container) return;
  const budgets = settings.categoryBudgets || {};
  const activeKeys = categoryKeys().filter(key => Number(budgets[key] || 0) > 0);
  if (!activeKeys.length) {
    if (panel) panel.classList.add("hidden");
    container.innerHTML = `<div class="empty-state">${tr("noBudgetsSet")}</div>`;
    return;
  }
  if (panel) panel.classList.remove("hidden");

  const spending = monthlySpendingByCategory();
  container.innerHTML = activeKeys.map(key => {
    const spent = Number(spending[key] || 0);
    const budget = Number(budgets[key] || 0);
    const percent = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0;
    const over = spent > budget;
    const line = tr("budgetSpentLine", {
      spent: formatMoneyFromUSD(spent),
      budget: formatMoneyFromUSD(budget)
    });
    return `
      <article class="budget-progress-card ${over ? "over-budget" : ""}">
        <div class="budget-progress-head">
          <strong>${escapeHTML(categoryLabel(key))}</strong>
          <span>${line}</span>
        </div>
        <div class="budget-bar-track"><i class="budget-bar-fill" style="width:${percent}%"></i></div>
      </article>
    `;
  }).join("");
}


function renderCategoryManager() {
  const container = $("#categoryManagerList");
  if (!container) return;
  container.innerHTML = categoryDefs().map(category => {
    const locked = category.id === "other";
    return `
      <article class="category-manager-row ${locked ? "locked-other" : ""}">
        <input type="text" maxlength="28" value="${escapeHTML(categoryLabel(category.id))}" data-category-name="${category.id}" aria-label="${escapeHTML(categoryLabel(category.id))}" ${locked ? "disabled" : ""} />
        <button class="secondary-button compact-button" type="button" data-save-category="${category.id}" ${locked ? "disabled" : ""}>${tr("save")}</button>
        <button class="ghost-button" type="button" data-remove-category="${category.id}" ${locked ? "disabled" : ""}>${tr("remove")}</button>
      </article>
    `;
  }).join("");
}

function categoryNameExists(name, exceptId = "") {
  const target = String(name || "").trim().toLowerCase();
  if (!target) return false;
  return categoryDefs().some(category => category.id !== exceptId && categoryLabel(category.id).trim().toLowerCase() === target);
}

function addCategory() {
  const input = $("#newCategoryInput");
  const name = String(input?.value || "").trim().slice(0, 28);
  if (!name) return;
  if (categoryNameExists(name)) {
    showToast(tr("categoryExists"));
    return;
  }
  const next = [...categoryDefs(), { id: makeCategoryId(name), name, nameKey: "", isDefault: false }];
  settings.categories = normalizeCategoryList(next);
  resetCategoryRelatedData(settings.categories.map(category => category.id));
  saveSettings();
  saveState();
  if (input) input.value = "";
  render({ translate: true });
  showToast(tr("categoryAdded"));
}

function renameCategory(id) {
  if (id === "other") {
    showToast(tr("cannotRemoveOther"));
    return;
  }
  const input = document.querySelector(`[data-category-name="${CSS.escape(id)}"]`);
  const name = String(input?.value || "").trim().slice(0, 28);
  if (!name) return;
  if (categoryNameExists(name, id)) {
    showToast(tr("categoryExists"));
    return;
  }
  settings.categories = categoryDefs().map(category => category.id === id ? { ...category, name, nameKey: "" } : category);
  saveSettings();
  saveState();
  render({ translate: true });
  showToast(tr("categoryRenamed"));
}

function removeCategory(id) {
  if (id === "other") {
    showToast(tr("cannotRemoveOther"));
    return;
  }
  if (!categoryKeys().includes(id)) return;
  if (!confirm(tr("removeCategoryConfirm"))) return;
  settings.categories = categoryDefs().filter(category => category.id !== id);
  records.forEach(record => {
    if (record.category === id) record.category = "other";
  });
  delete settings.categoryBudgets[id];
  resetCategoryRelatedData(settings.categories.map(category => category.id));
  saveRecords();
  saveSettings();
  saveState();
  render({ translate: true });
  showToast(tr("categoryRemoved"));
}

function resetCategories() {
  if (!confirm(tr("resetCategoriesConfirm"))) return;
  const defaults = defaultCategoryList();
  const defaultKeys = defaults.map(category => category.id);
  settings.categories = defaults;
  records.forEach(record => {
    if (!defaultKeys.includes(record.category)) record.category = "other";
  });
  const nextBudgets = {};
  defaultKeys.forEach(key => {
    const value = Number(settings.categoryBudgets?.[key] || 0);
    nextBudgets[key] = Number.isFinite(value) && value > 0 ? value : 0;
  });
  settings.categoryBudgets = nextBudgets;
  saveRecords();
  saveSettings();
  saveState();
  render({ translate: true });
  showToast(tr("categoriesReset"));
}

function categoryChartData() {
  const spending = monthlySpendingByCategory();
  return categoryKeys()
    .map(key => ({ key, amount: Number(spending[key] || 0) }))
    .filter(item => item.amount > 0)
    .sort((a, b) => b.amount - a.amount);
}

function renderCategoryChart() {
  const container = $("#categoryChartList");
  const panel = $("#categoryChartPanel");
  if (!container) return;
  const data = categoryChartData();
  if (!data.length) {
    if (panel) panel.classList.add("hidden");
    container.innerHTML = `<div class="empty-state">${tr("noCategorySpending")}</div>`;
    return;
  }
  if (panel) panel.classList.remove("hidden");
  const max = Math.max(...data.map(item => item.amount), 1);
  container.innerHTML = data.map(item => {
    const percent = Math.max(4, Math.round((item.amount / max) * 100));
    return `
      <article class="category-chart-card">
        <div class="category-chart-head">
          <strong>${escapeHTML(categoryLabel(item.key))}</strong>
          <span>${formatMoneyFromUSD(item.amount)}</span>
        </div>
        <div class="category-chart-track"><i class="category-chart-fill" style="width:${percent}%"></i></div>
      </article>
    `;
  }).join("");
}

function topCategoryFor(list) {
  const spending = new Map();
  list.filter(record => record.type === "Out").forEach(record => {
    const category = categoryKey(record.category);
    spending.set(category, (spending.get(category) || 0) + Number(record.amountUSD || 0));
  });
  if (!spending.size) return tr("none");
  const [category] = [...spending.entries()].sort((a, b) => b[1] - a[1])[0];
  return categoryLabel(category);
}

function displayChangeValue(field, value) {
  if (field === "type") return value === "In" ? tr("in") : tr("out");
  if (field === "category") return categoryLabel(value);
  return value || "—";
}

function renderEditHistory(record) {
  const target = $("#editHistoryList");
  if (!target) return;
  const logs = Array.isArray(record?.editHistory) ? [...record.editHistory].reverse() : [];
  if (!logs.length) {
    target.innerHTML = `<div class="empty-state">${tr("noEdits")}</div>`;
    return;
  }
  target.innerHTML = logs.slice(0, 8).map(log => {
    const lines = (log.changes || []).map(change => {
      const fieldName = tr(`field${change.field.charAt(0).toUpperCase()}${change.field.slice(1)}`);
      return tr("editChangeLine", {
        field: fieldName,
        from: escapeHTML(displayChangeValue(change.field, change.from)),
        to: escapeHTML(displayChangeValue(change.field, change.to))
      });
    }).join("<br>");
    return `<article class="edit-history-item"><strong>${tr("editedOn", { date: displayDateTime(log.editedAt) })}</strong><p>${lines}</p></article>`;
  }).join("");
}

function normalizeRecord(input) {
  if (!input || typeof input !== "object") return null;

  const type = input.type === "In" ? "In" : "Out";
  const originalCurrency = normalizeCurrencyCode(input.originalCurrency || input.currency || input.currencyMode || input.currencySymbol, "USD");
  const rate = Number(input.exchangeRateAtEntry || input.exchangeRate || settings.exchangeRate || 4000);
  const safeRate = Number.isFinite(rate) && rate > 0 ? rate : 4000;
  const numeric = (value) => Number.isFinite(Number(value)) ? Number(value) : 0;

  let amountUSD = numeric(input.amountUSD);

  if (amountUSD <= 0) {
    const originalAmount = numeric(input.originalAmount);
    const amount = numeric(input.amount);

    if (originalCurrency === "KHR" && originalAmount > 0) amountUSD = originalAmount / safeRate;
    else if (originalCurrency === "KHR" && amount > 0) amountUSD = amount / safeRate;
    else if (amount > 0) amountUSD = amount;
    else if (originalAmount > 0) amountUSD = originalCurrency === "KHR" ? originalAmount / safeRate : originalAmount;
  }

  if (!Number.isFinite(amountUSD) || amountUSD <= 0) return null;

  const normalizedOriginalCurrency = originalCurrency;
  const originalAmount = numeric(input.originalAmount) > 0
    ? numeric(input.originalAmount)
    : (normalizedOriginalCurrency === "KHR" ? amountUSD * safeRate : amountUSD);

  return {
    id: input.id || uid(),
    type,
    amountUSD: Math.round(amountUSD * 10000) / 10000,
    originalAmount,
    originalCurrency: normalizedOriginalCurrency,
    exchangeRateAtEntry: Number(input.exchangeRateAtEntry || input.exchangeRate || safeRate || 4000),
    category: categoryKey(input.category),
    editHistory: Array.isArray(input.editHistory) ? input.editHistory : [],
    description: input.description || input.what || "",
    date: input.date || todayISO(),
    note: input.note || "",
    createdAt: input.createdAt || input.created_at || Date.now()
  };
}

function extractRecordsFromValue(value) {
  if (Array.isArray(value)) return value;
  if (value && Array.isArray(value.records)) return value.records;
  if (value && value.data && Array.isArray(value.data.records)) return value.data.records;
  return [];
}

function hasImportableRecordsContainer(value) {
  return Array.isArray(value)
    || Boolean(value && Array.isArray(value.records))
    || Boolean(value && value.data && Array.isArray(value.data.records));
}

function loadSettings() {
  const found = {};
  for (const key of [...LEGACY_SETTINGS_KEYS, SETTINGS_KEY]) {
    const value = safeParse(key, null);
    if (value && typeof value === "object" && !Array.isArray(value)) Object.assign(found, value);
  }
  settings = sanitizeSettings(found);

  const state = safeParse(STATE_KEY, null);
  if (state && ["USD", "KHR"].includes(state.displayCurrency)) settings.displayCurrency = state.displayCurrency;
  settings = sanitizeSettings(settings);
}

function loadRecords() {
  let sources = [];

  const primary = safeParse(RECORD_KEY, null);
  sources = sources.concat(extractRecordsFromValue(primary));

  // If the new store is empty, scan legacy keys and any obvious DollarTracker/Wifey keys.
  const keys = new Set([...LEGACY_RECORD_KEYS]);
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (/wifey|dollartracker|money/i.test(key || "")) keys.add(key);
  }

  for (const key of keys) {
    if (key === RECORD_KEY || key === SETTINGS_KEY || key === STATE_KEY) continue;
    sources = sources.concat(extractRecordsFromValue(safeParse(key, null)));
  }

  const map = new Map();
  for (const item of sources) {
    const record = normalizeRecord(item);
    if (!record) continue;
    const hadStableId = Boolean(item && typeof item === "object" && item.id);
    const signature = hadStableId
      ? `id:${record.id}`
      : `legacy:${record.type}|${record.date}|${record.amountUSD}|${record.originalAmount}|${record.originalCurrency}|${record.description}|${record.note}|${record.createdAt}`;
    map.set(signature, record);
  }

  records = Array.from(map.values());
  saveRecords();
}

function loadState() {
  const state = safeParse(STATE_KEY, null);
  if (!state || typeof state !== "object") return;

  activeFilter = state.activeFilter || "All";
  searchTerm = state.searchTerm || "";
  fromDate = state.fromDate || "";
  toDate = state.toDate || "";
  sortMode = state.sortMode || "newest";
}

function loadData() {
  loadSettings();
  loadState();
  loadRecords();
  saveSettings();
  applyDocumentSettings();
}

function saveRecords() {
  safeSet(RECORD_KEY, records);
  // Legacy mirror keeps old imports safer, but clearEverything removes it too.
  safeSet("wifeyMoneyRecords.liquid.v1", records.map(r => ({
    id: r.id,
    type: r.type,
    amount: r.amountUSD,
    amountUSD: r.amountUSD,
    originalAmount: r.originalAmount,
    originalCurrency: r.originalCurrency,
    exchangeRateAtEntry: r.exchangeRateAtEntry || settings.exchangeRate,
    category: r.category || "other",
    editHistory: r.editHistory || [],
    description: r.description,
    date: r.date,
    note: r.note,
    createdAt: r.createdAt
  })));
}

function saveSettings() {
  settings = sanitizeSettings(settings);
  safeSet(SETTINGS_KEY, settings);
  applyDocumentSettings();
}

function saveState() {
  const state = {
    displayCurrency: settings.displayCurrency,
    activeFilter,
    searchTerm,
    fromDate,
    toDate,
    sortMode,
    activePage: $(".page.active")?.id?.replace("page-", "") || "home",
    draft: {
      type: document.querySelector('input[name="type"]:checked')?.value || "Out",
      amount: $("#amountInput")?.value || "",
      description: $("#descriptionInput")?.value || "",
      date: $("#dateInput")?.value || todayISO(),
      note: $("#noteInput")?.value || "",
      category: $("#categoryInput")?.value || "other"
    },
    savedAt: new Date().toISOString()
  };
  safeSet(STATE_KEY, state);
}

function persistAll() {
  debouncedStateSave.flush?.();
  saveRecords();
  saveSettings();
  saveState();
}

const THEME_BG_COLORS = {
  mono: { dark: "#0a0a0c", light: "#f5f5f3" },
  gold: { dark: "#0d0a06", light: "#faf3e4" },
  sky: { dark: "#070d16", light: "#eef6ff" },
  matcha: { dark: "#090f09", light: "#f3f8ec" },
  sunset: { dark: "#150a11", light: "#fff1ec" },
  lavender: { dark: "#0e0b18", light: "#f6f2ff" },
  christmas: { dark: "#07100a", light: "#f1f8f2" },
  pink: { dark: "#130a0f", light: "#fff3f8" },
  web: { dark: "#090305", light: "#fff0f2" },
  symbiote: { dark: "#050506", light: "#f2f3f5" },
  blush: { dark: "#170912", light: "#fff2f8" },
  ocean: { dark: "#051113", light: "#eefbfb" },
  pearl: { dark: "#0d0e12", light: "#f7f8fb" }
};

function applyDocumentSettings() {
  document.documentElement.dataset.theme = settings.theme;
  document.documentElement.dataset.template = settings.themeTemplate;
  document.documentElement.lang = settings.language;
  document.title = settings.appName || "DollarTracker";

  const palette = THEME_BG_COLORS[settings.themeTemplate] || THEME_BG_COLORS.mono;
  const themeColor = palette[settings.theme] || palette.dark;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", themeColor);
}

function signedMoney(record) {
  return `${record.type === "In" ? "+" : "-"}${formatMoneyFromUSD(record.amountUSD)}`;
}

function totals(list = records) {
  const totalInUSD = list.filter(r => r.type === "In").reduce((sum, r) => sum + Number(r.amountUSD || 0), 0);
  const totalOutUSD = list.filter(r => r.type === "Out").reduce((sum, r) => sum + Number(r.amountUSD || 0), 0);
  return {
    totalInUSD,
    totalOutUSD,
    balanceUSD: totalInUSD - totalOutUSD,
    count: list.length,
    usedPercent: totalInUSD > 0 ? Math.min(100, Math.round((totalOutUSD / totalInUSD) * 100)) : 0
  };
}

function sortedRecords(list = records) {
  return [...list].sort((a, b) => {
    if (sortMode === "oldest") return (new Date(a.date || 0) - new Date(b.date || 0)) || ((a.createdAt || 0) - (b.createdAt || 0));
    if (sortMode === "high") return Number(b.amountUSD || 0) - Number(a.amountUSD || 0);
    if (sortMode === "low") return Number(a.amountUSD || 0) - Number(b.amountUSD || 0);
    return (new Date(b.date || 0) - new Date(a.date || 0)) || ((b.createdAt || 0) - (a.createdAt || 0));
  });
}

function filteredRecords() {
  let list = [...records];
  if (activeFilter !== "All") list = list.filter(r => r.type === activeFilter);
  if (fromDate) list = list.filter(r => (r.date || "") >= fromDate);
  if (toDate) list = list.filter(r => (r.date || "") <= toDate);
  if (searchTerm.trim()) {
    const q = searchTerm.toLowerCase();
    list = list.filter(r => {
      const originalAmount = String(r.originalAmount || "");
      const usdAmount = String(r.amountUSD || "");
      const category = categoryLabel(r.category).toLowerCase();
      return (r.description || "").toLowerCase().includes(q)
        || (r.note || "").toLowerCase().includes(q)
        || (r.date || "").toLowerCase().includes(q)
        || (r.type || "").toLowerCase().includes(q)
        || category.includes(q)
        || originalAmount.includes(q)
        || usdAmount.includes(q);
    });
  }
  return sortedRecords(list);
}

function pruneSelectedRecords() {
  const existing = new Set(records.map(record => record.id));
  selectedRecordIds = new Set([...selectedRecordIds].filter(id => existing.has(id)));
}

function selectionUIActive() {
  pruneSelectedRecords();
  return selectionMode || selectedRecordIds.size > 0;
}

function selectedHistoryRecords() {
  pruneSelectedRecords();
  return records.filter(record => selectedRecordIds.has(record.id));
}

function selectedHistoryNetUSD() {
  return selectedHistoryRecords().reduce((sum, record) => {
    const sign = record.type === "In" ? 1 : -1;
    return sum + sign * Number(record.amountUSD || 0);
  }, 0);
}

function resetHistorySelectionState() {
  selectedRecordIds.clear();
  selectionMode = false;
  closeOtherSwipeCards(null);
}

function clearSelectedRecords() {
  resetHistorySelectionState();
  renderHistoryPage();
}

function enterSelectionMode(id = "") {
  clearNativeTextSelection();
  selectionMode = true;
  closeOtherSwipeCards(null);
  if (id) selectedRecordIds.add(id);
  renderHistoryPage();
  hapticTick([8, 24, 8]);
}

function toggleSelectionMode() {
  clearNativeTextSelection();
  if (selectionMode || selectedRecordIds.size) clearSelectedRecords();
  else {
    selectionMode = true;
    closeOtherSwipeCards(null);
    renderHistoryPage();
    hapticTick(8);
  }
}

function toggleRecordSelection(id) {
  clearNativeTextSelection();
  if (!id) return;
  closeOtherSwipeCards(null);
  selectionMode = true;
  if (selectedRecordIds.has(id)) selectedRecordIds.delete(id);
  else selectedRecordIds.add(id);
  if (!selectedRecordIds.size) selectionMode = true;
  renderHistoryPage();
  hapticTick(6);
}

function selectVisibleHistoryRecords() {
  const visibleIds = filteredRecords().slice(0, historyVisibleCount).map(record => record.id);
  if (!visibleIds.length) return;
  closeOtherSwipeCards(null);
  selectionMode = true;
  selectedRecordIds = new Set(visibleIds);
  renderHistoryPage();
  closeHistoryFilter();
  hapticTick([8, 20, 8]);
}

function renderSelectionControls() {
  const button = $("#selectModeBtn");
  if (button) {
    button.textContent = selectionUIActive() ? tr("doneSelection") : tr("selectHistory");
    button.classList.toggle("active", selectionUIActive());
  }
  const selectVisible = $("#selectVisibleBtn");
  if (selectVisible) selectVisible.textContent = tr("selectAllVisible");
  document.body.classList.toggle("history-selection-active", selectionUIActive() && activePageName() === "history");
}

function renderSelectionSummary() {
  const panel = $("#selectionFloat");
  if (!panel) return;
  const selected = selectedHistoryRecords();
  panel.classList.toggle("hidden", !selected.length || activePageName() !== "history");
  renderSelectionControls();
  if (!selected.length) return;

  const countText = tr("selectedRecords", { count: selected.length });
  const net = selectedHistoryNetUSD();
  const absText = formatMoneyFromUSD(Math.abs(net));
  const signedText = `${net < 0 ? "−" : "+"}${absText}`;
  setText("selectionCount", countText);
  setText("selectionTotalLabel", tr("selectedTotal"));
  setText("selectionTotal", signedText);
  const totalEl = $("#selectionTotal");
  if (totalEl) {
    totalEl.classList.toggle("amount-out", net < 0);
    totalEl.classList.toggle("amount-in", net >= 0);
  }
}

function displayDate(iso) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString(settings.language === "km" ? "km-KH" : undefined, { month: "short", day: "numeric", year: "numeric" });
}

function displayDateTime(iso) {
  if (!iso) return tr("never");
  const d = new Date(iso);
  return d.toLocaleString(settings.language === "km" ? "km-KH" : undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function escapeHTML(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function setText(id, value, html = false) {
  const el = document.getElementById(id);
  if (!el) return;
  if (html) el.innerHTML = value;
  else el.textContent = value;
}

function debounce(fn, delay = 180) {
  let timer = 0;
  let lastArgs = [];
  const debounced = (...args) => {
    lastArgs = args;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      timer = 0;
      fn(...lastArgs);
    }, delay);
  };
  debounced.flush = () => {
    if (!timer) return;
    window.clearTimeout(timer);
    timer = 0;
    fn(...lastArgs);
  };
  debounced.cancel = () => {
    window.clearTimeout(timer);
    timer = 0;
  };
  return debounced;
}

const debouncedStateSave = debounce(saveState, 260);

const debouncedHistorySearchRender = debounce(() => {
  resetHistoryVisibleCount();
  saveState();
  render();
}, 180);

function translateUI() {
  const activeKey = $(".page.active")?.dataset.titleKey || "home";
  setText("pageTitle", tr(activeKey));
  setText("eyebrow", tr("eyebrow"));
  setText("navHome", tr("home")); setText("navAdd", tr("add")); setText("navHistory", tr("history")); setText("navBackup", tr("backup")); setText("navSettings", tr("settings"));
  setText("localOnlyText", tr("localOnly")); setText("balanceLeftLabel", tr("balanceLeft")); setText("copyBalanceBtn", tr("copy"));
  setText("addOutText", tr("addOut")); setText("addInText", tr("addIn")); setText("moneyUsedText", tr("moneyUsed")); setText("moneyAddedText", tr("moneyAdded"));
  setText("totalInLabel", tr("totalIn")); setText("totalOutLabel", tr("totalOut")); setText("amountUsedLabel", tr("amountUsed"));
  setText("monthlyTitle", tr("thisMonth")); setText("monthlyHint", tr("monthlyHint")); setText("monthlyInLabel", tr("in")); setText("monthlyOutLabel", tr("out")); setText("monthlyBalanceLabel", tr("balance")); setText("monthlyBudgetsTitle", tr("monthlyBudgets")); setText("monthlyBudgetsHint", tr("monthlyBudgetsHint")); setText("categoryChartTitle", tr("categoryChart")); setText("categoryChartHint", tr("categoryChartHint"));
  setText("recentTitle", tr("recent")); setText("latestMovementText", tr("latestMovement")); setText("viewAllBtn", tr("viewAll"));
  setText("newTransactionTitle", tr("newTransaction")); setText("positiveOnlyText", tr("positiveOnly")); setText("openQuickAddBtn", tr("quickAdd")); setText("typeLabel", tr("type")); setText("outLabel", tr("out")); setText("inLabel", tr("in")); setText("amountLabel", tr("amount")); setText("categoryLabel", tr("category")); setText("whatForLabel", tr("whatFor")); setText("dateLabel", tr("date")); setText("noteLabel", tr("note")); setText("saveRecordBtn", tr("saveRecord")); setText("floatingSaveRecordBtn", tr("saveRecord")); setText("rememberTitle", tr("remember")); setText("rememberText", tr("rememberText"), true);
  $("#descriptionInput").placeholder = tr("whatForPlaceholder"); $("#noteInput").placeholder = tr("optionalNote");
  setText("allRecordsTitle", tr("allRecords")); setText("historyHintText", tr("historyHint")); setText("summaryBtn", tr("summary")); setText("selectModeBtn", selectionUIActive() ? tr("doneSelection") : tr("selectHistory")); setText("openFilterText", tr("filter")); setText("filterAll", tr("all")); setText("filterIn", tr("in")); setText("filterOut", tr("out")); setText("historyFilterTitle", tr("filterRecords")); setText("historyFilterHint", tr("filterHint")); setText("closeHistoryFilterBtn", tr("close")); setText("fromDateLabel", tr("fromDate")); setText("toDateLabel", tr("toDate")); setText("sortByLabel", tr("sortBy")); setText("clearFiltersBtn", tr("clearFilters")); setText("selectVisibleBtn", tr("selectAllVisible")); setText("applyHistoryFilterBtn", tr("applyFilters"));
  $("#searchInput").placeholder = tr("searchRecords");
  const sort = $("#sortSelect"); if (sort) { sort.options[0].text = tr("newest"); sort.options[1].text = tr("oldest"); sort.options[2].text = tr("highest"); sort.options[3].text = tr("lowest"); }
  setText("backupReminderTitle", tr("backupReminderTitle")); setText("backupReminderExportBtn", tr("exportBackup")); setText("backupReminderDismissBtn", tr("dismiss"));
  setText("backupExportTitle", tr("backupExport")); setText("backupHintText", tr("backupHint")); setText("lastBackupLabel", tr("lastBackup")); setText("exportBackupBtn", tr("exportBackup")); setText("exportCsvBtn", tr("exportCsv")); setText("importBackupText", tr("importBackup")); setText("safetyHabitTitle", tr("safetyHabit")); setText("safetyHintText", tr("safetyHint"));
  setText("appearanceTitle", tr("appearance")); setText("displayModeLabel", tr("displayMode")); setText("darkLabel", tr("dark")); setText("lightLabel", tr("light")); setText("themeTemplateLabel", tr("themeTemplate")); setText("coreThemesText", tr("coreThemes")); setText("signatureThemesText", tr("signatureThemes")); setText("monoThemeText", tr("monoTheme")); setText("goldThemeText", tr("goldTheme")); setText("skyThemeText", tr("skyTheme")); setText("matchaThemeText", tr("matchaTheme")); setText("sunsetThemeText", tr("sunsetTheme")); setText("lavenderThemeText", tr("lavenderTheme")); setText("christmasThemeText", tr("christmasTheme")); setText("pinkThemeText", tr("pinkTheme")); setText("webThemeText", tr("webTheme")); setText("symbioteThemeText", tr("symbioteTheme")); setText("blushThemeText", tr("blushTheme")); setText("oceanThemeText", tr("oceanTheme")); setText("pearlThemeText", tr("pearlTheme"));
  setText("moneySettingsTitle", tr("moneySettings")); setText("exchangeRateTitle", tr("exchangeRate")); setText("exchangeRateHint", tr("exchangeRateHint")); setText("appNameTitle", tr("appName")); setText("appNameHint", tr("appNameHint")); setText("saveSettingsBtn", tr("saveSettings"));
  setText("categoryManagerTitle", tr("categoryManager")); setText("categoryManagerHint", tr("categoryManagerHint")); $("#newCategoryInput").placeholder = tr("newCategoryPlaceholder"); setText("addCategoryBtn", tr("addCategory")); setText("resetCategoriesBtn", tr("resetCategories")); setText("categoryBudgetsTitle", tr("categoryBudgets")); setText("categoryBudgetsHint", tr("categoryBudgetsHint")); setText("budgetCurrencyNote", tr("budgetCurrencyNote")); setText("saveBudgetsBtn", tr("saveBudgets"));
  setText("dangerZoneTitle", tr("dangerZone")); setText("dangerHintText", tr("dangerHint")); setText("clearDataBtn", Date.now() < clearArmedUntil ? tr("tapAgainClear") : tr("clearAll"));
  setText("editTitle", tr("editRecord")); setText("editHint", tr("editHint")); setText("closeEditBtn", tr("close"));
  setText("editTypeLabel", tr("type")); setText("editOutLabel", tr("out")); setText("editInLabel", tr("in"));
  setText("editCurrencyLabel", tr("currency")); setText("editAmountLabel", tr("amount")); setText("editCategoryLabel", tr("category"));
  setText("editDescriptionLabel", tr("whatFor")); setText("editDateLabel", tr("date")); setText("editNoteLabel", tr("note")); setText("saveEditBtn", tr("saveChanges")); setText("editHistoryTitle", tr("editHistory"));
  setText("calculatorTitle", tr("calculator")); setText("calculatorHint", tr("calculatorHint")); setText("useCalcAmountBtn", tr("useAmount")); setText("quickAddTitle", tr("quickAdd")); setText("quickAddHint", tr("quickAddHint")); setText("quickAddTypeLabel", tr("type")); setText("quickAddOutLabel", tr("out")); setText("quickAddInLabel", tr("in")); setText("quickAddAmountLabel", tr("quickAddAmount")); setText("saveQuickAddBtn", tr("saveQuickAdd")); setText("openFullAddFromQuickBtn", tr("openFullAdd")); setText("closeQuickAddBtn", tr("close"));
  setText("summaryTitle", tr("summaryTitle")); setText("summaryHint", tr("summaryHint")); setText("closeSummaryBtn", tr("close")); setText("summaryInLabel", tr("totalIn")); setText("summaryOutLabel", tr("totalOut")); setText("summaryBalanceLabel", tr("balanceLeft")); setText("summaryInGraphLabel", tr("totalIn")); setText("summaryOutGraphLabel", tr("totalOut"));
  setText("clearSelectionBtn", tr("clearSelection"));
}

function renderLanguageButton() {
  const isKhmer = settings.language === "km";
  $("#languageCode").textContent = isKhmer ? "KH" : "EN";
  $("#languageFlag").src = isKhmer ? "flag-kh.png" : "flag-en.png";
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function pageIndex(page) {
  const pages = ["home", "add", "history", "backup", "settings"];
  return Math.max(0, pages.indexOf(page));
}

function updateNavPill() {
  const nav = $(".bottom-nav");
  const active = $(".nav-item.active");
  if (!nav || !active) return;
  nav.style.setProperty("--pill-x", `${active.offsetLeft}px`);
  nav.style.setProperty("--pill-w", `${active.offsetWidth}px`);
}

function setPage(page, options = {}) {
  const nextIndex = pageIndex(page);
  document.documentElement.style.setProperty("--page-slide", `${nextIndex >= previousPageIndex ? 16 : -16}px`);
  previousPageIndex = nextIndex;

  $$(".page").forEach(section => section.classList.remove("active"));
  const next = $(`#page-${page}`);
  if (next) next.classList.add("active");
  $$(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.page === page));
  translateUI();
  saveState();
  if (options.render !== false) render();
  updateFloatingSaveButton();
  window.requestAnimationFrame(updateNavPill);
  window.scrollTo({ top: 0, behavior: isReducedMotion() ? "auto" : "smooth" });
}

function renderAmountChips() {
  const container = $("#amountChips");
  const info = currencyInfo(settings.displayCurrency);
  container.innerHTML = info.chips.map(value => `<button type="button" data-amount="${value}">${formatRawMoney(value, settings.displayCurrency)}</button>`).join("");
  $$('[data-amount]').forEach(button => button.addEventListener('click', () => {
    $("#amountInput").value = button.dataset.amount;
    $("#amountInput").focus();
    updateFloatingSaveButton();
    debouncedStateSave();
  }));
  const input = $("#amountInput");
  input.step = info.step;
  input.placeholder = info.placeholder;
  input.inputMode = settings.displayCurrency === "KHR" ? "numeric" : "decimal";
  $("#amountCurrency").textContent = info.symbol;
}

function renderRecordList(target, list, compact = false) {
  if (!target) return;
  if (!list.length) {
    target.innerHTML = `<div class="empty-state"><span class="empty-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h9l3 3v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"/><path d="M9 12h6"/><path d="M9 16h6"/><path d="M9 8h3"/></svg></span><p>${tr("noRecords")}</p></div>`;
    return;
  }

  target.innerHTML = list.map(record => {
    const lockedAmount = formatRecordOriginalMoney(record);
    const entryRate = record.exchangeRateAtEntry ? ` • 1 USD = ${Number(record.exchangeRateAtEntry).toLocaleString()}៛` : "";
    const category = `<span class="category-pill">${escapeHTML(categoryLabel(record.category))}</span>`;
    const recordMeta = `${category} • ${displayDate(record.date)} • ${escapeHTML(record.note || (record.type === "In" ? tr("in") : tr("out")))}${entryRate}`;
    const recordId = escapeHTML(record.id);
    const selected = selectedRecordIds.has(record.id);
    const showSelector = selectionUIActive();

    if (compact) {
      return `
        <article class="record-card">
          <div class="record-card-body">
            <div>
              <h4>${escapeHTML(record.description || (record.type === "In" ? tr("addedFallback") : tr("usedFallback")))}</h4>
              <p>${recordMeta}</p>
            </div>
            <strong class="${record.type === "In" ? "amount-in" : "amount-out"}">${lockedAmount}</strong>
          </div>
        </article>
      `;
    }

    return `
      <article class="record-card ${selected ? "record-selected" : ""} ${showSelector ? "selection-mode" : ""}" data-record-card-id="${recordId}" aria-selected="${selected ? "true" : "false"}">
        <div class="record-swipe-actions" aria-hidden="true">
          <button class="swipe-edit-btn" type="button" data-edit="${recordId}"><svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>${tr("edit")}</button>
          <button class="swipe-delete-btn" type="button" data-delete="${recordId}"><svg viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>${tr("delete")}</button>
        </div>
        <div class="record-card-body selectable-record-body">
          <button class="record-select-btn ${selected ? "active" : ""}" type="button" data-select-record="${recordId}" aria-label="${tr("selectRecord")}" tabindex="${showSelector ? "0" : "-1"}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4 4L19 7.5"/></svg></button>
          <div>
            <h4>${escapeHTML(record.description || (record.type === "In" ? tr("addedFallback") : tr("usedFallback")))}</h4>
            <p>${recordMeta}</p>
          </div>
          <strong class="${record.type === "In" ? "amount-in" : "amount-out"}">${lockedAmount}</strong>
          <button class="record-more-btn" type="button" data-more="${recordId}" aria-label="${tr("edit")} / ${tr("delete")}"><svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="19" r="1.6"/></svg></button>
        </div>
      </article>
    `;
  }).join("");

  if (!compact) target.querySelectorAll(".record-card").forEach(setupSwipeableRecordCard);
}
function hapticTick(ms = 8) {
  if (navigator.vibrate) { try { navigator.vibrate(ms); } catch (e) {} }
}

function clearNativeTextSelection() {
  const active = document.activeElement;
  if (active && ["INPUT", "TEXTAREA"].includes(active.tagName)) return;
  try {
    const selection = window.getSelection?.();
    if (selection && selection.rangeCount) selection.removeAllRanges();
  } catch (e) {}
}

function preventRecordNativeSelection(target, event) {
  const element = target?.closest?.(".record-card, .nav-item, .quick-card, .chip, .history-filter-btn");
  if (!element) return;
  if (target.closest?.("input, textarea, select")) return;
  if (event?.cancelable) event.preventDefault();
  clearNativeTextSelection();
}

function closeOtherSwipeCards(exceptCard) {
  document.querySelectorAll(".record-card").forEach(card => {
    if (card !== exceptCard && card._closeSwipe) card._closeSwipe({ immediate: false });
  });
}

function setupSwipeableRecordCard(card) {
  const body = card.querySelector(".record-card-body");
  const actions = card.querySelector(".record-swipe-actions");
  if (!body || !actions) return;

  const REVEAL = 148;
  const OPEN_THRESHOLD = REVEAL * 0.38;
  let startX = 0;
  let startY = 0;
  let baseX = 0;
  let currentX = 0;
  let dragging = false;
  let axis = null;
  let opened = false;
  let rafId = null;
  let pendingX = null;
  let startTime = 0;

  function paint() {
    rafId = null;
    if (pendingX === null) return;
    body.style.transform = `translate3d(${pendingX}px,0,0)`;
    pendingX = null;
  }

  function setX(x, animate) {
    currentX = Math.max(-REVEAL, Math.min(0, x));
    body.style.transition = animate ? "transform .34s cubic-bezier(.22,1,.36,1)" : "none";
    if (animate) {
      body.style.transform = `translate3d(${currentX}px,0,0)`;
    } else {
      pendingX = currentX;
      if (rafId === null) rafId = requestAnimationFrame(paint);
    }
  }

  function open() {
    if (selectionUIActive() || card.classList.contains("record-selected")) {
      close({ immediate: true });
      return;
    }
    closeOtherSwipeCards(card);
    setX(-REVEAL, true);
    if (!opened) hapticTick(10);
    opened = true;
    activeSwipeCard = card;
    card.classList.remove("swipe-dragging");
    card.classList.add("swipe-open");
    actions.setAttribute("aria-hidden", "false");
  }

  function close(options = {}) {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
      pendingX = null;
    }
    body.style.transition = options.immediate ? "none" : "transform .30s cubic-bezier(.22,1,.36,1)";
    currentX = 0;
    body.style.transform = "translate3d(0,0,0)";
    opened = false;
    dragging = false;
    axis = null;
    card.classList.remove("swipe-open", "swipe-dragging");
    actions.setAttribute("aria-hidden", "true");
    if (activeSwipeCard === card) activeSwipeCard = null;
  }

  card._closeSwipe = close;
  card._openSwipe = open;

  body.addEventListener("contextmenu", event => preventRecordNativeSelection(event.target, event));
  body.addEventListener("selectstart", event => preventRecordNativeSelection(event.target, event));
  body.addEventListener("dragstart", event => preventRecordNativeSelection(event.target, event));

  let longPressTimer = 0;
  let longPressFired = false;

  function clearLongPressTimer() {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = 0;
    }
  }

  body.addEventListener("pointerdown", event => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (event.target.closest("button, a, input, textarea, select")) return;
    if (selectionUIActive()) return;
    dragging = true;
    axis = null;
    longPressFired = false;
    startX = event.clientX;
    startY = event.clientY;
    startTime = performance.now();
    baseX = currentX;
    const recordId = card.dataset.recordCardId || "";
    clearLongPressTimer();
    longPressTimer = setTimeout(() => {
      longPressFired = true;
      dragging = false;
      axis = null;
      clearNativeTextSelection();
      close({ immediate: true });
      if (recordId) enterSelectionMode(recordId);
    }, 520);
    try { body.setPointerCapture(event.pointerId); } catch (e) {}
  });

  body.addEventListener("pointermove", event => {
    if (!dragging) return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (axis === null) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) clearLongPressTimer();
      axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (axis === "x") {
        closeOtherSwipeCards(card);
        card.classList.add("swipe-dragging");
        actions.setAttribute("aria-hidden", "false");
      }
    }
    if (axis !== "x") return;
    event.preventDefault();
    setX(baseX + dx, false);
  });

  function endDrag(event) {
    clearLongPressTimer();
    if (!dragging) return;
    dragging = false;
    if (axis !== "x") {
      card.classList.remove("swipe-dragging");
      return;
    }

    const dx = event ? event.clientX - startX : currentX - baseX;
    const elapsed = Math.max(1, performance.now() - startTime);
    const velocity = dx / elapsed;

    if (currentX < -OPEN_THRESHOLD || velocity < -0.45) open();
    else close();
  }

  body.addEventListener("pointerup", endDrag);
  body.addEventListener("pointercancel", () => { clearLongPressTimer(); close(); });
  body.addEventListener("lostpointercapture", event => {
    if (dragging) endDrag(event);
  });

  body.addEventListener("click", event => {
    if (longPressFired) {
      event.preventDefault();
      event.stopPropagation();
      longPressFired = false;
      return;
    }
    if (opened) {
      event.preventDefault();
      event.stopPropagation();
      close();
    }
  });

  const moreButton = body.querySelector("[data-more]");
  if (moreButton) {
    moreButton.addEventListener("click", event => {
      event.stopPropagation();
      if (opened) close();
      else open();
    });
  }
}
function renderSummary() {
  const list = filteredRecords();
  const summary = totals(list);
  $("#summaryIn").textContent = formatMoneyFromUSD(summary.totalInUSD);
  $("#summaryOut").textContent = formatMoneyFromUSD(summary.totalOutUSD);
  $("#summaryBalance").textContent = formatMoneyFromUSD(summary.balanceUSD);
  const max = Math.max(summary.totalInUSD, summary.totalOutUSD, 1);
  $("#summaryInBar").style.width = `${Math.round((summary.totalInUSD / max) * 100)}%`;
  $("#summaryOutBar").style.width = `${Math.round((summary.totalOutUSD / max) * 100)}%`;
}

function activePageName() {
  return $(".page.active")?.id?.replace("page-", "") || "home";
}

function amountInputReady() {
  const input = $("#amountInput");
  if (!input) return false;
  let value = Number(input.value || 0);
  if (settings.displayCurrency === "KHR") value = Math.round(value);
  return Number.isFinite(value) && value > 0;
}

function updateFloatingSaveButton() {
  const ready = activePageName() === "add" && amountInputReady();
  document.body.classList.toggle("floating-save-ready", ready);
  const button = $("#floatingSaveRecordBtn");
  if (button) button.setAttribute("aria-hidden", ready ? "false" : "true");
}

function isReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || false;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function animateMoneyText(element, fromUSD, toUSD, duration = 720) {
  if (!element) return;

  if (isReducedMotion()) {
    element.textContent = formatMoneyFromUSD(toUSD);
    return;
  }

  if (balanceAnimationFrame) cancelAnimationFrame(balanceAnimationFrame);

  const start = performance.now();
  const currency = settings.displayCurrency;

  element.classList.remove("balance-bump");
  void element.offsetWidth;
  element.classList.add("balance-bump");

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = easeOutCubic(progress);
    const current = fromUSD + (toUSD - fromUSD) * eased;
    element.textContent = formatMoneyFromUSD(current, currency);

    if (progress < 1) {
      balanceAnimationFrame = requestAnimationFrame(frame);
    } else {
      element.textContent = formatMoneyFromUSD(toUSD, currency);
      balanceAnimationFrame = null;
    }
  }

  balanceAnimationFrame = requestAnimationFrame(frame);
}

function resetHistoryVisibleCount() {
  historyVisibleCount = HISTORY_PAGE_SIZE;
}

function updateSegmentedPills() {
  $$(".segmented").forEach(control => {
    const inputs = Array.from(control.querySelectorAll('input[type="radio"]'));
    if (!inputs.length) return;
    const checkedIndex = Math.max(0, inputs.findIndex(input => input.checked));
    const checked = inputs[checkedIndex];
    control.style.setProperty("--seg-index", String(Math.min(checkedIndex, 1)));
    control.classList.toggle("is-in", checked?.value === "In");
    control.classList.toggle("is-out", checked?.value === "Out");
  });
}

function updateCurrencySwitchPill() {
  const homeSwitch = $(".currency-switch");
  if (homeSwitch) homeSwitch.style.setProperty("--currency-index", settings.displayCurrency === "KHR" ? "1" : "0");

  const calcSwitch = $(".calc-currency-switch");
  if (calcSwitch) calcSwitch.style.setProperty("--currency-index", calcState.currency === "KHR" ? "1" : "0");
}

function renderHome(options = {}) {
  const total = totals(records);
  const homeBalanceEl = $("#homeBalance");

  if (typeof options.animateBalanceFrom === "number" && options.animateBalanceFrom !== total.balanceUSD) {
    animateMoneyText(homeBalanceEl, options.animateBalanceFrom, total.balanceUSD);
  } else if (homeBalanceEl) {
    homeBalanceEl.textContent = formatMoneyFromUSD(total.balanceUSD);
  }

  setText("homeTotalIn", formatMoneyFromUSD(total.totalInUSD));
  setText("homeTotalOut", formatMoneyFromUSD(total.totalOutUSD));
  setText("homeRecordCountSmall", `${total.count} ${tr(total.count === 1 ? "record" : "records")}`);

  const monthly = totals(currentMonthRecords());
  setText("monthlyIn", formatMoneyFromUSD(monthly.totalInUSD));
  setText("monthlyOut", formatMoneyFromUSD(monthly.totalOutUSD));
  setText("monthlyBalance", formatMoneyFromUSD(monthly.balanceUSD));
  setText("monthlyTopCategory", tr("topCategory", { category: topCategoryFor(currentMonthRecords()) }));

  const usedProgress = $("#usedProgress");
  if (usedProgress) usedProgress.style.width = `${total.usedPercent}%`;
  setText("usedProgressText", tr("usedProgress", { percent: total.usedPercent }));
  setText("rateNote", `1 USD = ${Number(settings.exchangeRate || 4000).toLocaleString()}៛`);

  renderBudgetProgress();
  renderCategoryChart();
  renderRecordList($("#recentList"), sortedRecords(records).slice(0, 4), true);
  renderBackupReminder();
}

function renderAddPage() {
  renderCategoryOptions($("#categoryInput"), $("#categoryInput")?.value || "other");
  renderQuickDescriptionChips();
  renderAmountChips();
}

function renderHistoryList() {
  const target = $("#historyList");
  if (!target) return;
  const list = filteredRecords();
  const visible = list.slice(0, historyVisibleCount);
  renderRecordList(target, visible, false);

  if (list.length > visible.length) {
    target.insertAdjacentHTML("beforeend", `
      <button class="show-more-history glass-lite" type="button" data-show-more-history>
        <strong>${tr("showMore")}</strong>
        <small>${tr("showingRecords", { shown: visible.length, total: list.length })}</small>
      </button>
    `);
  }
  renderSelectionSummary();
}

function renderHistoryPage() {
  const sortSelect = $("#sortSelect");
  const fromInput = $("#fromDateInput");
  const toInput = $("#toDateInput");
  const searchInput = $("#searchInput");

  if (sortSelect) sortSelect.value = sortMode;
  if (fromInput) fromInput.value = fromDate;
  if (toInput) toInput.value = toDate;
  if (searchInput) searchInput.value = searchTerm;

  updateHistoryFilterButton();
  renderSelectionControls();
  $$(".chip").forEach(button => button.classList.toggle("active", button.dataset.filter === activeFilter));
  renderHistoryList();
}

function renderBackupPage() {
  setText("lastBackupText", displayDateTime(settings.lastBackupAt));
}

function renderSettingsPage() {
  const exchangeRateInput = $("#exchangeRateInput");
  const appNameInput = $("#appNameInput");
  const modeDark = $("#modeDark");
  const modeLight = $("#modeLight");

  if (exchangeRateInput) exchangeRateInput.value = Number(settings.exchangeRate || 4000);
  if (appNameInput) appNameInput.value = settings.appName || "DollarTracker";
  if (modeDark) modeDark.checked = settings.theme === "dark";
  if (modeLight) modeLight.checked = settings.theme === "light";

  $$("[data-template-choice]").forEach(button => button.classList.toggle("active", button.dataset.templateChoice === settings.themeTemplate));
  renderCategoryManager();
  renderBudgetSettings();
}

function renderSharedPolish() {
  renderLanguageButton();
  $$(".currency-card-btn").forEach(button => button.classList.toggle("active", button.dataset.currency === settings.displayCurrency));
  updateSegmentedPills();
  updateCurrencySwitchPill();
  updateFloatingSaveButton();
  window.requestAnimationFrame(updateNavPill);
}

function render(options = {}) {
  const shouldTranslate = Boolean(options.translate);
  applyDocumentSettings();
  if (shouldTranslate) translateUI();

  const page = activePageName();
  if (page === "home") renderHome(options);
  if (page === "add") renderAddPage();
  if (page === "history") renderHistoryPage();
  if (page === "backup") renderBackupPage();
  if (page === "settings") renderSettingsPage();

  if ($("#summaryBackdrop")?.classList.contains("show")) renderSummary();
  renderSelectionSummary();
  renderSharedPolish();
}

function addRecord(event) {
  event.preventDefault();
  let rawAmount = Number($("#amountInput").value);
  if (settings.displayCurrency === "KHR") rawAmount = Math.round(rawAmount);
  else rawAmount = Number(rawAmount.toFixed(2));
  if (!rawAmount || rawAmount <= 0) {
    showToast(tr("enterValidAmount"));
    return;
  }

  const previousBalanceUSD = totals(records).balanceUSD;
  const type = new FormData(event.currentTarget).get("type");
  const amountUSD = displayToUsd(rawAmount, settings.displayCurrency);

  records.push({
    id: uid(),
    type,
    amountUSD: Math.round(amountUSD * 10000) / 10000,
    originalAmount: rawAmount,
    originalCurrency: settings.displayCurrency,
    exchangeRateAtEntry: Number(settings.exchangeRate || 4000),
    category: $("#categoryInput").value || "other",
    editHistory: [],
    description: $("#descriptionInput").value.trim(),
    date: $("#dateInput").value || todayISO(),
    note: $("#noteInput").value.trim(),
    createdAt: Date.now()
  });

  event.currentTarget.reset();
  $("#typeOut").checked = true;
  $("#dateInput").value = todayISO();
  updateFloatingSaveButton();
  saveRecords();
  saveState();
  setPage("home", { render: false });
  render({ animateBalanceFrom: previousBalanceUSD });
  showToast(tr("recordSaved"));
  hapticTick(12);
}







function deleteRecord(id) {
  const record = records.find(r => r.id === id);
    if (!record) return;
    const amountText = formatRecordOriginalMoney(record).replace("-", "");
    if (!confirm(`${tr("deleteConfirm")}\n\n${record.type === "In" ? tr("in") : tr("out")} ${amountText} — ${record.description || tr("noDescription")}`)) return;
    records = records.filter(r => r.id !== id);
    selectedRecordIds.delete(id);
    saveRecords();
    resetHistoryVisibleCount();
    render();
    showToast(tr("recordDeleted"));
    hapticTick(14);
}

function copyTextFallback(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "0";
  textarea.style.top = "0";
  textarea.style.width = "2px";
  textarea.style.height = "2px";
  textarea.style.opacity = "0";
  textarea.setAttribute("readonly", "");
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, text.length);

  let copied = false;
  try { copied = document.execCommand("copy"); }
  catch { copied = false; }

  textarea.remove();
  return copied;
}

async function copyBalance() {
  const balance = $("#homeBalance").textContent.trim();
  let copied = false;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(balance);
      copied = true;
    }
  } catch {
    copied = false;
  }

  if (!copied) copied = copyTextFallback(balance);

  if (copied) {
    showToast(tr("balanceCopied"));
  } else {
    window.prompt(tr("copyManual"), balance);
  }
}

function resetCalc() {
  calcState.current = "0";
  calcState.stored = null;
  calcState.operator = null;
  calcState.fresh = true;
  updateCalcDisplay();
}

function openCalculator() {
  calcState.currency = settings.displayCurrency;
  calcState.current = $("#amountInput").value || "0";
  calcState.stored = null;
  calcState.operator = null;
  calcState.fresh = true;
  $("#calculatorBackdrop").classList.add("show");
  document.body.classList.add("modal-open");
  updateCalcDisplay();
}

function closeCalculator() {
  $("#calculatorBackdrop").classList.remove("show");
  document.body.classList.remove("modal-open");
}

function calcNumber() {
  const value = Number(calcState.current || 0);
  return Number.isFinite(value) ? value : 0;
}

function updateCalcDisplay() {
  const currency = calcState.currency;
  $$("[data-calc-currency]").forEach(button => button.classList.toggle("active", button.dataset.calcCurrency === currency));
  const dot = $("#calcDotBtn");
  if (dot) dot.disabled = currency === "KHR";
  const value = currency === "KHR" ? Math.round(calcNumber()) : calcNumber();
  $("#calcDisplay").textContent = formatRawMoney(value, currency);
}

function inputCalcDigit(digit) {
  if (calcState.fresh || calcState.current === "0") {
    calcState.current = String(digit);
    calcState.fresh = false;
  } else {
    calcState.current += String(digit);
  }
  updateCalcDisplay();
}

function inputCalcDot() {
  if (calcState.currency === "KHR") return;
  if (calcState.fresh) {
    calcState.current = "0.";
    calcState.fresh = false;
  } else if (!calcState.current.includes(".")) {
    calcState.current += ".";
  }
  updateCalcDisplay();
}

function applyCalcOperation() {
  const current = calcNumber();
  if (calcState.stored === null || !calcState.operator) return current;
  if (calcState.operator === "+") return calcState.stored + current;
  if (calcState.operator === "-") return calcState.stored - current;
  if (calcState.operator === "×") return calcState.stored * current;
  if (calcState.operator === "÷") return current === 0 ? calcState.stored : calcState.stored / current;
  return current;
}

function chooseCalcOperator(operator) {
  calcState.stored = applyCalcOperation();
  calcState.current = String(calcState.stored);
  calcState.operator = operator;
  calcState.fresh = true;
  updateCalcDisplay();
}

function calcEquals() {
  const result = applyCalcOperation();
  calcState.current = String(result);
  calcState.stored = null;
  calcState.operator = null;
  calcState.fresh = true;
  updateCalcDisplay();
}

function calcBackspace() {
  if (calcState.fresh || calcState.current.length <= 1) {
    calcState.current = "0";
    calcState.fresh = true;
  } else {
    calcState.current = calcState.current.slice(0, -1);
  }
  updateCalcDisplay();
}

function useCalculatorAmount() {
  calcEquals();
  const amount = calcState.currency === "KHR" ? Math.max(0, Math.round(calcNumber())) : Math.max(0, Number(calcNumber().toFixed(2)));
  settings.displayCurrency = calcState.currency;
  saveSettings();
  $("#amountInput").value = amount ? String(amount) : "";
  render();
  saveState();
  closeCalculator();
}



function quickAddPresets() {
  return [
    { description: "Food", category: "food", label: quickDescriptionLabel("Food") },
    { description: "Coffee", category: "food", label: quickDescriptionLabel("Coffee") },
    { description: "Transfer", category: "transfer", label: quickDescriptionLabel("Transfer") },
    { description: "Transport", category: "transport", label: quickDescriptionLabel("Transport") },
    { description: "Shopping", category: "shopping", label: quickDescriptionLabel("Shopping") },
    { description: "AC", category: "transfer", label: quickDescriptionLabel("AC") }
  ];
}

function renderQuickAddSheet() {
  const container = $("#quickAddPresetList");
  if (container) {
    container.innerHTML = quickAddPresets().map(preset => `
      <button class="quick-add-preset ${preset.description === quickAddState.description ? "active" : ""}" type="button" data-quick-add-desc="${escapeHTML(preset.description)}" data-quick-add-category="${escapeHTML(preset.category)}">${escapeHTML(preset.label)}</button>
    `).join("");
  }
  const amount = $("#quickAddAmountInput");
  const symbol = $("#quickAddCurrency");
  const info = currencyInfo(settings.displayCurrency);
  if (amount) {
    amount.step = info.step;
    amount.placeholder = info.placeholder;
    amount.inputMode = settings.displayCurrency === "KHR" ? "numeric" : "decimal";
  }
  if (symbol) symbol.textContent = info.symbol;
  updateSegmentedPills();
}

function openQuickAdd(type = "Out") {
  quickAddState = { description: "Food", category: "food" };
  const out = $("#quickAddTypeOut");
  const input = type === "In" ? $("#quickAddTypeIn") : out;
  if (input) input.checked = true;
  if ($("#quickAddAmountInput")) $("#quickAddAmountInput").value = "";
  renderQuickAddSheet();
  $("#quickAddBackdrop")?.classList.add("show");
  document.body.classList.add("modal-open");
  setTimeout(() => $("#quickAddAmountInput")?.focus(), 180);
}

function closeQuickAdd() {
  $("#quickAddBackdrop")?.classList.remove("show");
  document.body.classList.remove("modal-open");
}

function saveQuickAddRecord(event) {
  event.preventDefault();
  let rawAmount = Number($("#quickAddAmountInput")?.value || 0);
  if (settings.displayCurrency === "KHR") rawAmount = Math.round(rawAmount);
  else rawAmount = Number(rawAmount.toFixed(2));
  if (!rawAmount || rawAmount <= 0) {
    showToast(tr("enterValidAmount"));
    return;
  }

  const previousBalanceUSD = totals(records).balanceUSD;
  const type = new FormData(event.currentTarget).get("quickAddType") === "In" ? "In" : "Out";
  const amountUSD = displayToUsd(rawAmount, settings.displayCurrency);

  records.push({
    id: uid(),
    type,
    amountUSD: Math.round(amountUSD * 10000) / 10000,
    originalAmount: rawAmount,
    originalCurrency: settings.displayCurrency,
    exchangeRateAtEntry: Number(settings.exchangeRate || 4000),
    category: quickAddState.category || "other",
    editHistory: [],
    description: quickAddState.description || (type === "In" ? tr("addedFallback") : tr("usedFallback")),
    date: todayISO(),
    note: "",
    createdAt: Date.now()
  });

  saveRecords();
  saveState();
  closeQuickAdd();
  setPage("home", { render: false });
  render({ animateBalanceFrom: previousBalanceUSD });
  showToast(tr("recordSaved"));
  hapticTick(12);
}

function daysSinceISO(iso) {
  if (!iso) return Infinity;
  const time = new Date(iso).getTime();
  if (!Number.isFinite(time)) return Infinity;
  return Math.floor((Date.now() - time) / 86400000);
}

function recordsSinceLastBackup() {
  return Math.max(0, records.length - Number(settings.lastBackupRecordCount || 0));
}

function backupReminderDue() {
  if (!records.length) return false;
  const dismissedToday = settings.backupReminderDismissedAt === todayISO();
  if (dismissedToday) return false;
  if (!settings.lastBackupAt) return true;
  if (recordsSinceLastBackup() >= 10) return true;
  return daysSinceISO(settings.lastBackupAt) >= 7;
}

function renderBackupReminder() {
  const banner = $("#backupReminder");
  if (!banner) return;
  const due = backupReminderDue();
  banner.classList.toggle("hidden", !due);
  if (!due) return;
  const textKey = !settings.lastBackupAt ? "backupReminderNeverText" : (recordsSinceLastBackup() >= 10 ? "backupReminderNewRecordsText" : "backupReminderText");
  setText("backupReminderText", tr(textKey));
}

function dismissBackupReminder() {
  settings.backupReminderDismissedAt = todayISO();
  saveSettings();
  render();
}

function exportBackup() {
  const data = { app: "DollarTracker", version: APP_VERSION, exportedAt: new Date().toISOString(), settings, records };
  downloadFile(`dollartracker-backup-${todayISO()}.json`, JSON.stringify(data, null, 2), "application/json");
  settings.lastBackupAt = new Date().toISOString();
  settings.lastBackupRecordCount = records.length;
  settings.backupReminderDismissedAt = "";
  saveSettings();
  render();
  showToast(tr("backupExported"));
}

function exportCSV() {
  const header = ["Date","Description","Category","Type","Amount USD","Amount KHR","Net USD","Net KHR","Original Amount","Original Currency","Rate At Entry","Note"];
  const rows = sortedRecords(records).map(r => {
    const sign = r.type === "In" ? 1 : -1;
    const amountKHR = usdToDisplay(r.amountUSD, "KHR");
    return [r.date || "", r.description || "", categoryLabel(r.category), r.type, Number(r.amountUSD || 0).toFixed(2), Math.round(amountKHR), (sign * Number(r.amountUSD || 0)).toFixed(2), Math.round(sign * amountKHR), r.originalAmount ?? "", r.originalCurrency ?? "", r.exchangeRateAtEntry ?? "", r.note || ""];
  });
  const csv = [header, ...rows].map(row => row.map(cell => `"${String(cell).replaceAll('"','""')}"`).join(",")).join("\n");
  downloadFile(`dollartracker-records-${todayISO()}.csv`, csv, "text/csv");
  showToast(tr("csvExported"));
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}














function openEditRecord(id) {
  const record = records.find(r => r.id === id);
    if (!record) return;
  
    $("#editRecordId").value = record.id;
    $("#editTypeOut").checked = record.type === "Out";
    $("#editTypeIn").checked = record.type === "In";
    $("#editCurrencyInput").value = record.originalCurrency === "KHR" ? "KHR" : "USD";
  
    const entryRate = Number(record.exchangeRateAtEntry || settings.exchangeRate || 4000);
    const originalCurrency = record.originalCurrency === "KHR" ? "KHR" : "USD";
    const amount = Number(record.originalAmount || 0) || (originalCurrency === "KHR" ? record.amountUSD * entryRate : record.amountUSD);
  
    $("#editAmountInput").value = originalCurrency === "KHR" ? Math.round(amount) : Number(amount).toFixed(2);
    updateEditAmountInputMode();
    renderCategoryOptions($("#editCategoryInput"), record.category || "other");
    $("#editDescriptionInput").value = record.description || "";
    $("#editDateInput").value = record.date || todayISO();
    $("#editNoteInput").value = record.note || "";
    renderEditHistory(record);
    $("#editBackdrop").classList.add("show");
    updateSegmentedPills();
}

function closeEditRecord() {
  $("#editBackdrop").classList.remove("show");
  $("#editRecordForm").reset();
  $("#editRecordId").value = "";
}

function updateEditAmountInputMode() {
  const currency = $("#editCurrencyInput")?.value === "KHR" ? "KHR" : "USD";
  const input = $("#editAmountInput");
  if (!input) return;
  input.step = currency === "KHR" ? "1" : "0.01";
  input.inputMode = currency === "KHR" ? "numeric" : "decimal";
}

function saveEditedRecord(event) {
  event.preventDefault();

  const id = $("#editRecordId").value;
  const record = records.find(r => r.id === id);
  if (!record) return;

  const previousCurrency = record.originalCurrency === "KHR" ? "KHR" : "USD";
  const previousRate = Number(record.exchangeRateAtEntry || settings.exchangeRate || 4000);
  const previousAmount = Number(record.originalAmount || 0) || (previousCurrency === "KHR" ? Number(record.amountUSD || 0) * previousRate : Number(record.amountUSD || 0));
  const previous = {
    type: record.type,
    amount: `${previousCurrency} ${previousCurrency === "KHR" ? Math.round(previousAmount) : Number(previousAmount).toFixed(2)}`,
    category: record.category || "other",
    description: record.description || "",
    date: record.date || "",
    note: record.note || ""
  };

  const currency = $("#editCurrencyInput").value === "KHR" ? "KHR" : "USD";
  let amount = Number($("#editAmountInput").value);
  if (currency === "KHR") amount = Math.round(amount);
  else amount = Number(amount.toFixed(2));

  if (!amount || amount <= 0) {
    showToast(tr("enterValidAmount"));
    return;
  }

  const currentRate = Number(settings.exchangeRate || 4000);
  const nextType = new FormData(event.currentTarget).get("editType") === "In" ? "In" : "Out";
  const nextCategory = $("#editCategoryInput").value || "other";
  const nextDescription = $("#editDescriptionInput").value.trim();
  const nextDate = $("#editDateInput").value || todayISO();
  const nextNote = $("#editNoteInput").value.trim();

  const next = {
    type: nextType,
    amount: `${currency} ${currency === "KHR" ? Math.round(amount) : Number(amount).toFixed(2)}`,
    category: nextCategory,
    description: nextDescription,
    date: nextDate,
    note: nextNote
  };

  const changes = Object.keys(previous)
    .filter(field => String(previous[field]) !== String(next[field]))
    .map(field => ({ field, from: previous[field], to: next[field] }));

  const amountChanged = String(previous.amount) !== String(next.amount);
  const editRate = amountChanged ? currentRate : previousRate;

  record.type = nextType;
  record.originalCurrency = currency;
  record.originalAmount = amount;
  record.exchangeRateAtEntry = editRate;
  record.amountUSD = amountChanged
    ? (currency === "KHR" ? Math.round((amount / editRate) * 10000) / 10000 : Math.round(amount * 10000) / 10000)
    : record.amountUSD;
  record.category = nextCategory;
  record.description = nextDescription;
  record.date = nextDate;
  record.note = nextNote;
  record.updatedAt = Date.now();

  if (changes.length) {
    record.editHistory = Array.isArray(record.editHistory) ? record.editHistory : [];
    record.editHistory.push({ editedAt: new Date().toISOString(), changes });
  }

  saveRecords();
  resetHistoryVisibleCount();
  render();
  closeEditRecord();
  showToast(tr("recordUpdated"));
}







function backupPreviewText(data, normalizedRecords) {
  const exportedAt = data?.exportedAt ? displayDateTime(data.exportedAt) : tr("never");
  const version = data?.version || "Unknown";
  return tr("importPreview", {
    count: normalizedRecords.length,
    date: exportedAt,
    version
  });
}

function importBackup(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!hasImportableRecordsContainer(data)) throw new Error("Invalid backup");
      const importedRecords = extractRecordsFromValue(data);
      const previewRecords = importedRecords.map(item => item && typeof item === "object" ? item : null).filter(Boolean);
      if (!confirm(backupPreviewText(data, previewRecords))) return;

      if (data.settings) settings = sanitizeSettings({ ...settings, ...data.settings });
      records = importedRecords.map(normalizeRecord).filter(Boolean);
      resetHistorySelectionState();
      settings.lastBackupRecordCount = records.length;
      saveRecords();
      saveSettings();
      resetHistoryVisibleCount();
      saveState();
      setPage("home", { render: false });
      render();
      showToast(tr("backupImported"));
    } catch {
      alert(tr("importError"));
    } finally {
      const input = $("#importBackupInput");
      if (input) input.value = "";
    }
  };
  reader.readAsText(file);
}

function historyAdvancedFiltersActive() {
  return Boolean(fromDate || toDate || sortMode !== "newest");
}

function updateHistoryFilterButton() {
  const button = $("#openHistoryFilterBtn");
  if (!button) return;
  button.classList.toggle("active", historyAdvancedFiltersActive());
}

function openHistoryFilter() {
  $("#historyFilterBackdrop").classList.add("show");
  document.body.classList.add("modal-open");
}

function closeHistoryFilter() {
  $("#historyFilterBackdrop").classList.remove("show");
  document.body.classList.remove("modal-open");
}

function applyHistoryFilter() {
  resetHistorySelectionState();
  resetHistoryVisibleCount();
  saveState();
  render();
  closeHistoryFilter();
}

function clearFilters() {
  resetHistorySelectionState();
  activeFilter = "All";
  searchTerm = "";
  fromDate = "";
  toDate = "";
  sortMode = "newest";
  resetHistoryVisibleCount();
  saveState();
  render();
  closeHistoryFilter();
}

function clearEverything() {
  const now = Date.now();

  if (now > clearArmedUntil) {
    clearArmedUntil = now + 4000;
    translateUI();
    showToast(tr("tapAgainClear"));
    hapticTick(10);
    setTimeout(() => {
      if (Date.now() > clearArmedUntil) {
        clearArmedUntil = 0;
        translateUI();
      }
    }, 4200);
    return;
  }

  hapticTick([12, 30, 12]);
  finishClearEverything();
}

function finishClearEverything() {
  records = [];
  activeFilter = "All";
  searchTerm = "";
  fromDate = "";
  toDate = "";
  sortMode = "newest";
  clearArmedUntil = 0;
  selectedRecordIds.clear();
  selectionMode = false;

  const keysToRemove = new Set([RECORD_KEY, STATE_KEY, ...LEGACY_RECORD_KEYS, "wifeyMoneyRecords.liquid.v1"]);
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (/wifey.*record|dollartracker.*record|money.*record/i.test(key || "")) keysToRemove.add(key);
  }
  keysToRemove.forEach(key => localStorage.removeItem(key));

  $("#transactionForm").reset();
  $("#typeOut").checked = true;
  $("#dateInput").value = todayISO();
  renderCategoryOptions($("#categoryInput"), "other");

  saveRecords();
  resetHistoryVisibleCount();
  saveState();
  setPage("home", { render: false });
  render();
  showToast(tr("cleared"));
}

function restoreDraft() {
  const state = safeParse(STATE_KEY, null);
  const draft = state?.draft;

  if (!draft) {
    $("#dateInput").value = todayISO();
    updateFloatingSaveButton();
    return;
  }

  $("#amountInput").value = draft.amount || "";
  $("#descriptionInput").value = draft.description || "";
  $("#dateInput").value = draft.date || todayISO();
  $("#noteInput").value = draft.note || "";
  renderCategoryOptions($("#categoryInput"), draft.category || "other");
  const typeInput = draft.type === "In" ? $("#typeIn") : $("#typeOut");
  if (typeInput) typeInput.checked = true;
  updateFloatingSaveButton();
}

async function switchLanguageSmooth() {
  const nextLanguage = settings.language === "km" ? "en" : "km";

  if (isReducedMotion()) {
    settings.language = nextLanguage;
    saveSettings();
    saveState();
    render({ translate: true });
    showToast(settings.language === "km" ? tr("changedToKhmer") : tr("changedToEnglish"));
    return;
  }

  document.body.classList.add("language-switching");
  await new Promise(resolve => setTimeout(resolve, 115));

  settings.language = nextLanguage;
  saveSettings();
  saveState();
  render({ translate: true });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.remove("language-switching");
      showToast(settings.language === "km" ? tr("changedToKhmer") : tr("changedToEnglish"));
    });
  });
}

function initEvents() {
  document.addEventListener("selectionchange", () => {
    const selection = window.getSelection?.();
    if (!selection || !selection.rangeCount || selection.isCollapsed) return;
    const node = selection.anchorNode;
    const element = node?.nodeType === 1 ? node : node?.parentElement;
    if (element?.closest?.(".record-card, .nav-item, .quick-card, .chip, .history-filter-btn")) {
      clearNativeTextSelection();
    }
  });

  document.addEventListener("pointerdown", event => {
    const card = event.target.closest(".record-card");
    if (activeSwipeCard && card !== activeSwipeCard) closeOtherSwipeCards(null);
  }, true);

  window.addEventListener("scroll", () => closeOtherSwipeCards(null), { passive: true });

  const addNavItem = document.querySelector('.nav-item[data-page="add"]');
  if (addNavItem) {
    let quickAddTimer = 0;
    const clearQuickAddTimer = () => { if (quickAddTimer) { clearTimeout(quickAddTimer); quickAddTimer = 0; } };
    addNavItem.addEventListener("pointerdown", () => {
      clearQuickAddTimer();
      addNavItem._quickAddOpened = false;
      quickAddTimer = setTimeout(() => {
        addNavItem._quickAddOpened = true;
        openQuickAdd("Out");
        hapticTick([8, 22, 8]);
      }, 520);
    });
    ["pointerup", "pointercancel", "pointerleave"].forEach(name => addNavItem.addEventListener(name, clearQuickAddTimer));
  }

  $$(".nav-item").forEach(item => item.addEventListener("click", event => {
    if (item._quickAddOpened) {
      item._quickAddOpened = false;
      event.preventDefault();
      return;
    }
    resetHistorySelectionState();
    setPage(item.dataset.page);
  }));

  $$("[data-go]").forEach(button => button.addEventListener("click", () => {
    setPage(button.dataset.go);
    if (button.dataset.prefill) {
      const input = button.dataset.prefill === "In" ? $("#typeIn") : $("#typeOut");
      if (input) input.checked = true;
      updateSegmentedPills();
      debouncedStateSave();
      setTimeout(() => $("#amountInput")?.focus(), 200);
    }
  }));

  $$(".currency-card-btn").forEach(button => button.addEventListener("click", () => {
    settings.displayCurrency = button.dataset.currency;
    saveSettings();
    saveState();
    render();
  }));

  $("#languageToggle").addEventListener("click", switchLanguageSmooth);

  $("#transactionForm").addEventListener("submit", addRecord);
  $("#openQuickAddBtn")?.addEventListener("click", () => openQuickAdd(document.querySelector('input[name="type"]:checked')?.value || "Out"));
  $("#quickAddForm")?.addEventListener("submit", saveQuickAddRecord);
  $("#closeQuickAddBtn")?.addEventListener("click", closeQuickAdd);
  $("#openFullAddFromQuickBtn")?.addEventListener("click", () => { closeQuickAdd(); setPage("add"); });
  $("#quickAddBackdrop")?.addEventListener("click", event => { if (event.target.id === "quickAddBackdrop") closeQuickAdd(); });
  $("#quickAddPresetList")?.addEventListener("click", event => {
    const button = event.target.closest("[data-quick-add-desc]");
    if (!button) return;
    quickAddState = { description: button.dataset.quickAddDesc, category: button.dataset.quickAddCategory || "other" };
    renderQuickAddSheet();
    hapticTick(6);
  });
  $$('input[name="quickAddType"]').forEach(input => input.addEventListener("change", updateSegmentedPills));

  $("#historyList").addEventListener("click", event => {
    const showMoreButton = event.target.closest("[data-show-more-history]");
    if (showMoreButton) {
      historyVisibleCount += HISTORY_PAGE_SIZE;
      renderHistoryList();
      return;
    }

    const selectButton = event.target.closest("[data-select-record]");
    if (selectButton) {
      event.preventDefault();
      event.stopPropagation();
      closeOtherSwipeCards(null);
      toggleRecordSelection(selectButton.dataset.selectRecord);
      return;
    }

    const card = event.target.closest(".record-card[data-record-card-id]");
    if (card && selectionUIActive() && !event.target.closest("button, a, input, textarea, select")) {
      event.preventDefault();
      event.stopPropagation();
      toggleRecordSelection(card.dataset.recordCardId);
      return;
    }

    const editButton = event.target.closest("[data-edit]");
    if (editButton) {
      closeOtherSwipeCards(null);
      openEditRecord(editButton.dataset.edit);
      return;
    }

    const deleteButton = event.target.closest("[data-delete]");
    if (deleteButton) {
      closeOtherSwipeCards(null);
      deleteRecord(deleteButton.dataset.delete);
    }
  });

  $$(".chip").forEach(chip => chip.addEventListener("click", () => {
    activeFilter = chip.dataset.filter;
    resetHistorySelectionState();
    resetHistoryVisibleCount();
    saveState();
    render();
  }));

  $("#searchInput").addEventListener("input", event => {
    searchTerm = event.target.value;
    resetHistorySelectionState();
    debouncedHistorySearchRender();
  });
  $("#fromDateInput").addEventListener("change", event => { fromDate = event.target.value; resetHistorySelectionState(); resetHistoryVisibleCount(); saveState(); render(); });
  $("#toDateInput").addEventListener("change", event => { toDate = event.target.value; resetHistorySelectionState(); resetHistoryVisibleCount(); saveState(); render(); });
  $("#sortSelect").addEventListener("change", event => { sortMode = event.target.value; resetHistorySelectionState(); resetHistoryVisibleCount(); saveState(); render(); });
  $("#clearFiltersBtn").addEventListener("click", clearFilters);
  $("#openHistoryFilterBtn").addEventListener("click", openHistoryFilter);
  $("#closeHistoryFilterBtn").addEventListener("click", closeHistoryFilter);
  $("#selectVisibleBtn")?.addEventListener("click", selectVisibleHistoryRecords);
  $("#applyHistoryFilterBtn").addEventListener("click", applyHistoryFilter);
  $("#historyFilterBackdrop").addEventListener("click", event => {
    if (event.target.id === "historyFilterBackdrop") closeHistoryFilter();
  });

  $("#summaryBtn").addEventListener("click", () => { renderSummary(); $("#summaryBackdrop").classList.add("show"); });
  $("#selectModeBtn")?.addEventListener("click", toggleSelectionMode);
  $("#closeSummaryBtn").addEventListener("click", () => $("#summaryBackdrop").classList.remove("show"));
  $("#summaryBackdrop").addEventListener("click", event => { if (event.target.id === "summaryBackdrop") $("#summaryBackdrop").classList.remove("show"); });
  $("#clearSelectionBtn")?.addEventListener("click", clearSelectedRecords);

  $$("[data-template-choice]").forEach(button => button.addEventListener("click", () => {
    settings.themeTemplate = button.dataset.templateChoice;
    saveSettings();
    saveState();
    render();
    hapticTick(8);
  }));

  $$('input[name="displayMode"]').forEach(input => input.addEventListener("change", () => {
    settings.theme = input.value;
    saveSettings();
    saveState();
    render();
  }));

  ["amountInput", "descriptionInput", "dateInput", "noteInput", "categoryInput"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    ["input", "change"].forEach(eventName => {
      el.addEventListener(eventName, () => {
        if (id === "amountInput") updateFloatingSaveButton();
        debouncedStateSave();
      });
    });
    el.addEventListener("blur", () => {
      if (id === "amountInput") updateFloatingSaveButton();
      debouncedStateSave.flush?.();
      saveState();
    });
  });

  $$('input[name="type"]').forEach(input => input.addEventListener("change", () => {
    updateSegmentedPills();
    updateFloatingSaveButton();
    debouncedStateSave();
  }));
  $$('input[name="editType"]').forEach(input => input.addEventListener("change", updateSegmentedPills));

  $("#editRecordForm").addEventListener("submit", saveEditedRecord);
  $("#closeEditBtn").addEventListener("click", closeEditRecord);
  $("#editBackdrop").addEventListener("click", event => {
    if (event.target.id === "editBackdrop") closeEditRecord();
  });


  $("#openCalcBtn").addEventListener("click", openCalculator);
  $("#closeCalcBtn").addEventListener("click", closeCalculator);
  $("#calculatorBackdrop").addEventListener("click", event => {
    if (event.target.id === "calculatorBackdrop") closeCalculator();
  });
  $$("[data-calc-currency]").forEach(button => button.addEventListener("click", () => {
    calcState.currency = button.dataset.calcCurrency === "KHR" ? "KHR" : "USD";
    if (calcState.currency === "KHR") calcState.current = String(Math.round(calcNumber()));
    updateCalcDisplay();
    updateCurrencySwitchPill();
  }));
  $$("[data-calc-num]").forEach(button => button.addEventListener("click", () => inputCalcDigit(button.dataset.calcNum)));
  $$("[data-calc-op]").forEach(button => button.addEventListener("click", () => chooseCalcOperator(button.dataset.calcOp)));
  $("[data-calc-dot]").addEventListener("click", inputCalcDot);
  $("[data-calc-clear]").addEventListener("click", resetCalc);
  $("[data-calc-back]").addEventListener("click", calcBackspace);
  $("[data-calc-equals]").addEventListener("click", calcEquals);
  $("#useCalcAmountBtn").addEventListener("click", useCalculatorAmount);
  $("#editCurrencyInput").addEventListener("change", updateEditAmountInputMode);

  $("#copyBalanceBtn").addEventListener("click", copyBalance);
  $("#backupReminderExportBtn").addEventListener("click", exportBackup);
  $("#backupReminderDismissBtn").addEventListener("click", dismissBackupReminder);
  $("#exportBackupBtn").addEventListener("click", exportBackup);
  $("#exportCsvBtn").addEventListener("click", exportCSV);
  $("#importBackupInput").addEventListener("change", event => importBackup(event.target.files[0]));
  $("#saveSettingsBtn").addEventListener("click", () => {
    const rate = Number($("#exchangeRateInput").value);
    settings.exchangeRate = rate > 0 ? rate : 4000;
    settings.appName = $("#appNameInput").value.trim() || "DollarTracker";
    saveSettings();
    saveState();
    render();
    showToast(tr("settingsSaved"));
  });
  $("#saveBudgetsBtn").addEventListener("click", saveCategoryBudgets);
  $("#addCategoryBtn").addEventListener("click", addCategory);
  $("#newCategoryInput").addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCategory();
    }
  });
  $("#categoryManagerList").addEventListener("click", event => {
    const saveButton = event.target.closest("[data-save-category]");
    if (saveButton) {
      renameCategory(saveButton.dataset.saveCategory);
      return;
    }
    const removeButton = event.target.closest("[data-remove-category]");
    if (removeButton) removeCategory(removeButton.dataset.removeCategory);
  });
  $("#resetCategoriesBtn").addEventListener("click", resetCategories);
  $("#clearDataBtn").addEventListener("click", clearEverything);

  window.addEventListener("pagehide", persistAll);
  window.addEventListener("beforeunload", persistAll);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") persistAll();
  });
  window.addEventListener("resize", updateNavPill);
}

function notifyAppUpdateReady() {
  if (notifyAppUpdateReady.shown) return;
  notifyAppUpdateReady.shown = true;
  showToast(tr("newVersionAvailable"));
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  navigator.serviceWorker.register(`./service-worker.js?v=${APP_VERSION}`).then(reg => {
    if (reg.waiting && navigator.serviceWorker.controller) notifyAppUpdateReady();

    reg.addEventListener("updatefound", () => {
      const worker = reg.installing;
      if (!worker) return;
      worker.addEventListener("statechange", () => {
        if (worker.state === "installed" && navigator.serviceWorker.controller) notifyAppUpdateReady();
      });
    });

    reg.update().catch(() => {});
  }).catch(() => {});
}

function boot() {
  loadData();
  restoreDraft();
  initEvents();

  const state = safeParse(STATE_KEY, null);
  if (state?.activePage && document.getElementById(`page-${state.activePage}`)) {
    setPage(state.activePage);
  }

  render({ translate: true });
  registerServiceWorker();
  console.log(`DollarTracker ${APP_VERSION} loaded`, { records: records.length, settings });
}

boot();
