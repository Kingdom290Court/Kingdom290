<template>
  <section id="calculator" class="max-w-5xl mx-auto">
    <div class="glass-card rounded-xl overflow-hidden relative">
      <div class="bg-gradient-to-r from-kingdom-black via-kingdom-dark to-kingdom-black p-6 border-b border-kingdom-gold/30 flex justify-between items-center">
        <h2 class="font-display text-2xl text-kingdom-gold">
          <i class="fa-solid fa-scale-balanced mr-2"></i> Compensation Judge
        </h2>
        <span class="text-xs text-gray-500 uppercase tracking-widest border border-gray-700 px-2 py-1 rounded">System V.13.0 (Standalone)</span>
      </div>

      <div class="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- ESQUERDA: Controles de Seleção -->
        <div class="space-y-6">
          <div class="bg-white/5 p-4 rounded border border-white/10">
            <h3 class="font-display text-kingdom-gold text-sm mb-4 uppercase border-b border-gray-700 pb-2">
              <i class="fa-solid fa-plus-circle mr-1"></i> Configure Violation
            </h3>

            <!-- 1. Categoria Principal -->
            <div class="mb-4">
              <label class="block font-display text-xs text-gray-400 mb-2 uppercase tracking-wide">Category</label>
              <div class="relative">
                <select v-model="selectedCategoryKey" class="input-medieval w-full p-3 rounded appearance-none cursor-pointer text-sm">
                  <option value="general">General Violations / Resources</option>
                  <optgroup label="Battle Units">
                    <option v-for="(label, key) in categoryLabels" :key="key" :value="key">
                      {{ label }}
                    </option>
                  </optgroup>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-kingdom-gold">
                  <i class="fa-solid fa-chevron-down"></i>
                </div>
              </div>
            </div>

            <!-- CAMINHO A: Unidades -->
            <div v-if="selectedCategoryKey !== 'general'" class="animate-fade-in space-y-4">
              
              <!-- 2. Seleção de Tier -->
              <div>
                <label class="block font-display text-xs text-gray-400 mb-2 uppercase tracking-wide">Tier (Level)</label>
                <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="(tierGroup, index) in availableTiers" 
                    :key="index"
                    @click="selectedTierIndex = index; selectedUnitIndex = 0"
                    :class="selectedTierIndex === index ? 'bg-kingdom-gold text-black border-kingdom-gold' : 'bg-black/40 text-gray-400 border-gray-700 hover:border-gray-500'"
                    class="px-3 py-1.5 rounded border text-xs font-bold transition-all"
                  >
                    {{ tierGroup.tier }}
                  </button>
                </div>
              </div>

              <!-- 3. Seleção de Unidade -->
              <div>
                <label class="block font-display text-xs text-gray-400 mb-2 uppercase tracking-wide">Unit</label>
                <div class="relative">
                  <select v-model="selectedUnitIndex" class="input-medieval w-full p-3 rounded appearance-none cursor-pointer text-sm">
                    <option v-for="(u, index) in availableUnits" :key="index" :value="index">
                      {{ u.unit }}
                    </option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-kingdom-gold">
                    <i class="fa-solid fa-chevron-down"></i>
                  </div>
                </div>
              </div>

              <!-- 4. Display dos Custos Base -->
              <div class="bg-kingdom-black/40 p-3 rounded border border-white/5 text-xs text-gray-400 flex justify-between items-center" v-if="currentUnit">
                <div>
                   <div class="mb-1">Prod: <span class="text-gray-200">{{ currentUnit.cost ? formatCompact(currentUnit.cost) : 'N/A' }}</span></div>
                   <div>Rez: <span class="text-gray-200">{{ currentUnit.rez_cost ? formatCompact(currentUnit.rez_cost) : 'N/A' }}</span></div>
                </div>
                <div class="text-right">
                   <div class="text-[10px] uppercase tracking-wide text-kingdom-gold mb-1">Rule</div>
                   
                   <div v-if="isLevelBasedCalculation" class="font-bold text-white text-[10px]">
                     Rez Cost x Level
                   </div>
                   <div v-else class="font-bold text-white text-[10px]">
                     25% Prod / 75% Rez
                   </div>
                </div>
              </div>

            </div>

            <!-- CAMINHO B: Infrações Gerais -->
            <div v-else class="mb-4 animate-fade-in">
              <label class="block font-display text-xs text-gray-400 mb-2 uppercase tracking-wide">Violation Type</label>
              <div class="relative">
                <select v-model="selectedGeneralIndex" class="input-medieval w-full p-3 rounded appearance-none cursor-pointer text-sm">
                  <optgroup label="General Violations">
                    <option v-for="(inf, index) in generalInfractions" :key="inf.id" :value="index">
                      {{ inf.label }}
                    </option>
                  </optgroup>
                  <optgroup label="Others / Mercenaries">
                     <option v-for="(inf, index) in extraInfractions" :key="inf.id" :value="index + generalInfractions.length">
                      {{ inf.label }}
                    </option>
                  </optgroup>
                  <optgroup label="Resources">
                    <option v-for="(inf, index) in resourceInfractions" :key="inf.id" :value="index + generalInfractions.length + extraInfractions.length">
                      {{ inf.label }}
                    </option>
                  </optgroup>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-kingdom-gold">
                  <i class="fa-solid fa-chevron-down"></i>
                </div>
              </div>
            </div>

            <!-- Quantidade -->
            <div class="mb-4 mt-4">
              <label class="block font-display text-xs text-gray-400 mb-2 uppercase tracking-wide">
                {{ quantityLabel }}
              </label>
              <div class="flex items-center">
                <button @click="qty > 1 ? qty-- : null" class="w-10 h-10 bg-kingdom-dark border border-kingdom-gold text-kingdom-gold rounded-l hover:bg-kingdom-gold hover:text-black transition">-</button>
                <input type="number" v-model="qty" min="1" class="input-medieval w-full p-2 text-center border-l-0 border-r-0 h-10 font-bold">
                <button @click="qty++" class="w-10 h-10 bg-kingdom-dark border border-kingdom-gold text-kingdom-gold rounded-r hover:bg-kingdom-gold hover:text-black transition">+</button>
              </div>
              <p v-if="isLevelBasedCalculation" class="text-[10px] text-gray-500 mt-1 text-right">
                 Level entered above will be used in the calculation.
              </p>
            </div>

            <!-- CHECKBOX DE MULTA ADICIONAL -->
            <div v-if="selectedCategoryKey !== 'general'" class="mb-6 p-3 bg-kingdom-blood/10 border border-kingdom-blood/30 rounded">
                <label class="checkbox-wrapper flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" v-model="applyBaseFine" class="hidden">
                  <div class="w-5 h-5 border border-kingdom-blood rounded bg-kingdom-dark flex items-center justify-center transition-colors duration-200">
                    <i class="fa-solid fa-check text-[10px] text-white" v-show="applyBaseFine"></i>
                  </div>
                  <div class="flex flex-col">
                      <span class="text-sm font-bold text-gray-200 group-hover:text-kingdom-gold transition">Add Base Fine</span>
                      <span class="text-[10px] text-gray-400">
                          {{ calculatedFineDescription }}
                      </span>
                  </div>
                </label>
            </div>

            
            <!-- Preview -->
            <p class="text-xs text-gray-500 mb-4 text-right flex justify-between items-center border-t border-gray-800 pt-2">
                <span>Item Total:</span>
                <strong class="text-kingdom-gold text-lg">
                {{ formatCompact(previewCalculatedValue) }}
                </strong>
            </p>

            <button @click="addToCart" :disabled="previewCalculatedValue === 0" class="w-full bg-kingdom-gold hover:bg-white text-black font-display font-bold uppercase py-3 rounded transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-kingdom-gold/20 disabled:opacity-50 disabled:cursor-not-allowed">
              <i class="fa-solid fa-plus"></i> Add to List
            </button>
          </div>

          <!-- Agravantes Globais -->
          <div class="p-4 border-t border-gray-800">
            <label class="block font-display text-xs text-gray-500 mb-3 uppercase tracking-wide">Aggravating Factors / Fines</label>
            
            <label class="checkbox-wrapper flex items-center gap-3 cursor-pointer group mb-3">
              <input type="checkbox" v-model="isTop100" class="hidden">
              <div class="w-5 h-5 border border-gray-600 rounded bg-kingdom-dark flex items-center justify-center transition-colors duration-200">
                <i class="fa-solid fa-check text-[10px] text-black" v-show="isTop100"></i>
              </div>
              <span class="text-sm text-gray-400 group-hover:text-kingdom-gold transition">Top 100 (x2)</span>
            </label>

            <label class="checkbox-wrapper flex items-center gap-3 cursor-pointer group mb-3">
              <input type="checkbox" v-model="isTribunal" class="hidden">
              <div class="w-5 h-5 border border-gray-600 rounded bg-kingdom-dark flex items-center justify-center transition-colors duration-200">
                <i class="fa-solid fa-check text-[10px] text-black" v-show="isTribunal"></i>
              </div>
              <span class="text-sm text-gray-400 group-hover:text-kingdom-blood transition">Court Litigation (x2)</span>
            </label>

            <!-- Multa de Primeira Infração -->
            <label class="checkbox-wrapper flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" v-model="isFirstOffense" class="hidden">
              <div class="w-5 h-5 border border-gray-600 rounded bg-kingdom-dark flex items-center justify-center transition-colors duration-200">
                <i class="fa-solid fa-check text-[10px] text-black" v-show="isFirstOffense"></i>
              </div>
              <span class="text-sm text-white font-bold group-hover:text-kingdom-gold transition">First Offense Fine (+5M)</span>
            </label>
          </div>
        </div>

        <!-- DIREITA: Lista e Totais -->
        <div class="flex flex-col bg-black/40 rounded border border-white/5 relative h-full min-h-[400px]">
          <div class="flex-1 p-4 overflow-y-auto max-h-[400px]">
             <div v-if="cart.length === 0" class="h-40 flex flex-col items-center justify-center text-gray-600 italic text-sm">
                <i class="fa-solid fa-scale-unbalanced text-3xl mb-2 opacity-30"></i>
                No infractions added.
             </div>
             <transition-group name="list" tag="ul" class="space-y-2">
                <li v-for="(item, index) in cart" :key="item.id" class="bg-white/5 hover:bg-white/10 p-2 rounded flex justify-between items-center border-l-2 border-kingdom-gold group">
                  <div class="text-sm w-full">
                    <div class="flex justify-between items-start">
                        <div class="text-gray-200 font-bold">
                            <span class="text-kingdom-gold">{{ item.qty }}x</span> {{ item.name }}
                        </div>
                        <div v-if="item.fineAmount > 0" class="text-[10px] bg-kingdom-blood/20 text-kingdom-blood border border-kingdom-blood/50 px-1 rounded ml-2 whitespace-nowrap" title="Multa Base Aplicada">
                            +{{ formatCompact(item.fineAmount) }} Fine
                        </div>
                    </div>
                    <div class="text-xs text-gray-500 mt-1 flex justify-between">
                      <div>
                        <span v-if="item.isMixed">CT (25/75)</span>
                        <span v-else-if="item.isLevelBased">Rez Cost x Level {{ item.levelValue }}</span>
                        <span v-else>Fixed Cost</span>
                      </div>
                      <div class="font-mono text-gray-400">
                          {{ formatCompact(item.itemCostWithoutFine) }} (CT)
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center gap-3 pl-4 border-l border-gray-700 ml-2">
                    <span class="text-white font-bold font-mono text-sm">{{ formatCompact(item.totalValue) }}</span>
                    <button @click="removeFromCart(index)" class="text-gray-600 hover:text-kingdom-blood transition">
                      <i class="fa-solid fa-times"></i>
                    </button>
                  </div>
                </li>
             </transition-group>
          </div>

          <!-- Rodapé de Totais -->
          <div class="p-6 bg-kingdom-dark/80 border-t border-kingdom-gold/20 backdrop-blur-sm mt-auto relative z-10">
             <div class="text-center mt-2">
                <div class="text-xs text-kingdom-gold uppercase tracking-widest mb-1">Final Total</div>
                <div class="text-3xl lg:text-4xl font-bold text-white tracking-tight gold-glow">
                  {{ formatCurrency(finalTotal) }}
                </div>
                <div class="text-[10px] text-gray-500 mt-1 uppercase">Silver</div>
             </div>

             <button @click="copyReport" v-if="cart.length > 0"
                    class="mt-4 w-full bg-kingdom-blood hover:bg-kingdom-bloodLight text-white font-display uppercase text-sm tracking-widest py-3 rounded border border-transparent hover:border-kingdom-gold transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
                <span v-if="!showCopied">Copy Debit Memo</span>
                <span v-else>Copied!</span>
                <i class="fa-solid" :class="showCopied ? 'fa-check' : 'fa-scroll'"></i>
             </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <transition name="fade">
        <div v-if="showCopied" class="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-kingdom-gold text-kingdom-black px-6 py-3 rounded shadow-xl border border-white z-50 flex items-center gap-3 pointer-events-none">
            <i class="fa-solid fa-circle-check"></i>
            <span class="font-bold">Report copied to clipboard</span>
        </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { unitsDB, categoryLabels, generalInfractions, resourceInfractions, extraInfractions } from '../data/dataCompensation';

// REMOVIDO: const emit = defineEmits(['update:total']);

// --- Estado ---
const selectedCategoryKey = ref('guardsmen'); 
const selectedTierIndex = ref(0);
const selectedUnitIndex = ref(0);
const selectedGeneralIndex = ref(0);
const qty = ref(1);
const applyBaseFine = ref(false); 
const isTop100 = ref(false);
const isTribunal = ref(false);
const isFirstOffense = ref(false);
const cart = ref([]);
const cartIdCounter = ref(1);
const showCopied = ref(false);

const allGeneralInfractions = [...generalInfractions, ...extraInfractions, ...resourceInfractions];

// --- Computados ---
const availableTiers = computed(() => {
    if (selectedCategoryKey.value === 'general') return [];
    return unitsDB[selectedCategoryKey.value] || [];
});

const availableUnits = computed(() => {
    if (availableTiers.value.length === 0) return [];
    const tierGroup = availableTiers.value[selectedTierIndex.value];
    return tierGroup ? tierGroup.units : [];
});

const currentUnit = computed(() => {
    if (availableUnits.value.length === 0) return null;
    return availableUnits.value[selectedUnitIndex.value];
});

const currentGeneralInfraction = computed(() => {
    return allGeneralInfractions[selectedGeneralIndex.value];
});

const isLevelBasedCalculation = computed(() => {
    return selectedCategoryKey.value === 'captains' || selectedCategoryKey.value === 'heroes';
});

const quantityLabel = computed(() => {
    if (selectedCategoryKey.value === 'captains') return 'Captain Level';
    if (selectedCategoryKey.value === 'heroes') return 'Hero Level';
    return 'Quantity';
});

const currentFineAmount = computed(() => {
    if (selectedCategoryKey.value === 'general') return 0;
    
    if (selectedCategoryKey.value === 'monsters') {
        const tierStr = availableTiers.value[selectedTierIndex.value].tier; 
        const tierNum = parseInt(tierStr.replace(/\D/g, '')) || 1; 
        return 1000000 * tierNum;
    }
    
    return 500000;
});

const calculatedFineDescription = computed(() => {
    if (selectedCategoryKey.value === 'monsters') {
        return `+${formatCompact(currentFineAmount.value)} (1M x Tier)`;
    }
    return `+${formatCompact(currentFineAmount.value)} (Fixed)`;
});

const previewCalculatedValue = computed(() => {
    let total = 0;

    if (selectedCategoryKey.value === 'general') {
        const inf = currentGeneralInfraction.value;
        let base = (inf.type === 'basic') ? inf.base : inf.multiplier;
        total = base * qty.value;
    } else {
        if (!currentUnit.value) return 0;
        
        if (isLevelBasedCalculation.value) {
             const rezCost = currentUnit.value.rez_cost || 0;
             total = rezCost * qty.value;
        } 
        else {
            const prodCost = currentUnit.value.cost;
            const rezCost = currentUnit.value.rez_cost;
            const totalQty = qty.value;

            if (prodCost === null && rezCost !== null) total += rezCost * totalQty;
            else if (rezCost === null && prodCost !== null) total += prodCost * totalQty;
            else if (prodCost !== null && rezCost !== null) {
                const qtyProd = totalQty * 0.25;
                const qtyRez = totalQty * 0.75;
                total += (qtyProd * prodCost) + (qtyRez * rezCost);
            }
        }
    }

    if (applyBaseFine.value && selectedCategoryKey.value !== 'general') {
        total += currentFineAmount.value;
    }

    return total;
});

const totalBase = computed(() => cart.value.reduce((acc, item) => acc + item.totalValue, 0));

const finalTotal = computed(() => {
    let total = totalBase.value;
    if (isTop100.value) total *= 2;
    if (isTribunal.value) total *= 2;
    if (isFirstOffense.value) total += 5000000;
    
    return total;
});

// --- WATCHERS ---
watch(selectedCategoryKey, () => {
    selectedTierIndex.value = 0;
    selectedUnitIndex.value = 0;
    qty.value = 1;
    applyBaseFine.value = false;
});
watch(selectedTierIndex, () => {
    selectedUnitIndex.value = 0;
});

// --- Métodos ---
const formatCurrency = (val) => new Intl.NumberFormat('en-US').format(val);
const formatCompact = (num) => {
    if (num === null) return 'N/A';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num;
};

const addToCart = () => {
    if (previewCalculatedValue.value === 0) return;

    let name = '';
    let isMixed = false;
    let isLevelBased = false;
    let fineApplied = 0;
    let costWithoutFine = 0;
    let itemQty = qty.value;
    let levelValue = 1;

    if (selectedCategoryKey.value === 'general') {
        name = currentGeneralInfraction.value.label;
        costWithoutFine = previewCalculatedValue.value;
    } else {
        name = currentUnit.value.unit;
        
        if (isLevelBasedCalculation.value) {
            isLevelBased = true;
            levelValue = qty.value;
            itemQty = 1;
        } else if (currentUnit.value.cost !== null && currentUnit.value.rez_cost !== null) {
            isMixed = true;
        }
        
        fineApplied = applyBaseFine.value ? currentFineAmount.value : 0;
        costWithoutFine = previewCalculatedValue.value - fineApplied;
    }

    cart.value.push({
        id: cartIdCounter.value++,
        name: name,
        qty: itemQty, 
        totalValue: previewCalculatedValue.value,
        itemCostWithoutFine: costWithoutFine,
        fineAmount: fineApplied,
        isMixed: isMixed,
        isLevelBased: isLevelBased,
        levelValue: levelValue 
    });
};

const removeFromCart = (index) => cart.value.splice(index, 1);

const copyReport = () => {
  const date = new Date().toLocaleDateString('en-US');
  const totalFormatted = formatCurrency(finalTotal.value);
  
  let itemsList = cart.value.map(item => {
    let detail = '';
    
    if (item.isLevelBased) {
        detail += ` (Lv.${item.levelValue})`;
    }
    
    if (item.fineAmount > 0) {
        detail += ` [+Fine ${formatCompact(item.fineAmount)}]`;
    }
    
    return `[${item.qty}] ${item.name} ${detail}\n    Value: ${formatCompact(item.totalValue)}`;
  }).join('\n');

  const statusTop100 = isTop100.value ? "YES (+100%)" : "NO";
  const statusTribunal = isTribunal.value ? "YES (+100%)" : "NO";
  const statusFirstOffense = isFirstOffense.value ? "YES (+5M Fixed)" : "NO";

  const report = `
========================================
      KINGDOM #290 - DEBIT MEMO
========================================
DATE: ${date}

ITEMIZED BREAKDOWN:
----------------------------------------
${itemsList}
----------------------------------------
SUBTOTAL: ${formatCompact(totalBase.value)}

AGGRAVATING FACTORS / FEES:
> Top 100 Offender: ${statusTop100}
> Court Litigation: ${statusTribunal}
> First Offense Fine: ${statusFirstOffense}

========================================
TOTAL DUE:  ${totalFormatted} SILVER
========================================
NOTE: Immediate payment requested to
avoid sanctions from the Royal Guard.
`.trim();

  navigator.clipboard.writeText(report).then(() => {
    showCopied.value = true;
    setTimeout(() => showCopied.value = false, 3000);
  });
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>