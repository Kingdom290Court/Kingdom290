<template>
  <section id="calculator" class="max-w-5xl mx-auto">
    <div class="glass-card rounded-xl overflow-hidden relative">
      <div class="bg-gradient-to-r from-kingdom-black via-kingdom-dark to-kingdom-black p-6 border-b border-kingdom-gold/30 flex justify-between items-center">
        <h2 class="font-display text-2xl text-kingdom-gold">
          <i class="fa-solid fa-scale-balanced mr-2"></i> Juiz de Compensação
        </h2>
        <span class="text-xs text-gray-500 uppercase tracking-widest border border-gray-700 px-2 py-1 rounded">Sistema V.6.0 (Regra 25/75)</span>
      </div>

      <div class="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- ESQUERDA: Controles de Seleção -->
        <div class="space-y-6">
          <div class="bg-white/5 p-4 rounded border border-white/10">
            <h3 class="font-display text-kingdom-gold text-sm mb-4 uppercase border-b border-gray-700 pb-2">
              <i class="fa-solid fa-plus-circle mr-1"></i> Configurar Infração
            </h3>

            <!-- 1. Categoria Principal -->
            <div class="mb-4">
              <label class="block font-display text-xs text-gray-400 mb-2 uppercase tracking-wide">Categoria</label>
              <div class="relative">
                <select v-model="selectedCategoryKey" class="input-medieval w-full p-3 rounded appearance-none cursor-pointer text-sm">
                  <option value="general">Infrações Gerais / Recursos</option>
                  <optgroup label="Unidades de Batalha">
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

            <!-- CAMINHO A: Unidades (Baseadas no JSON) -->
            <div v-if="selectedCategoryKey !== 'general'" class="animate-fade-in space-y-4">
              
              <!-- 2. Seleção de Tier -->
              <div>
                <label class="block font-display text-xs text-gray-400 mb-2 uppercase tracking-wide">Tier (Nível)</label>
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

              <!-- 3. Seleção de Unidade Específica -->
              <div>
                <label class="block font-display text-xs text-gray-400 mb-2 uppercase tracking-wide">Unidade</label>
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

              <!-- 4. Display dos Custos Base (Informativo) -->
              <div class="bg-kingdom-black/40 p-3 rounded border border-white/5 text-xs text-gray-400 flex justify-between items-center" v-if="currentUnit">
                <div>
                   <div class="mb-1">Custo Produção: <span class="text-gray-200">{{ currentUnit.cost ? formatCurrency(currentUnit.cost) : 'N/A' }}</span></div>
                   <div>Custo Ressurreição: <span class="text-gray-200">{{ currentUnit.rez_cost ? formatCurrency(currentUnit.rez_cost) : 'N/A' }}</span></div>
                </div>
                <div class="text-right">
                   <div class="text-[10px] uppercase tracking-wide text-kingdom-gold mb-1">Regra Ativa</div>
                   <div class="font-bold text-white">25% Prod / 75% Rez</div>
                </div>
              </div>

            </div>

            <!-- CAMINHO B: Infrações Gerais/Recursos -->
            <div v-else class="mb-4 animate-fade-in">
              <label class="block font-display text-xs text-gray-400 mb-2 uppercase tracking-wide">Tipo de Infração</label>
              <div class="relative">
                <select v-model="selectedGeneralIndex" class="input-medieval w-full p-3 rounded appearance-none cursor-pointer text-sm">
                  <optgroup label="Infrações Gerais">
                    <option v-for="(inf, index) in generalInfractions" :key="inf.id" :value="index">
                      {{ inf.label }}
                    </option>
                  </optgroup>
                  <optgroup label="Recursos">
                    <option v-for="(inf, index) in resourceInfractions" :key="inf.id" :value="index + generalInfractions.length">
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
            <div class="mb-6 mt-4">
              <label class="block font-display text-xs text-gray-400 mb-2 uppercase tracking-wide">
                Quantidade (Tropas Mortas)
              </label>
              <div class="flex items-center">
                <button @click="qty > 1 ? qty-- : null" class="w-10 h-10 bg-kingdom-dark border border-kingdom-gold text-kingdom-gold rounded-l hover:bg-kingdom-gold hover:text-black transition">-</button>
                <input type="number" v-model="qty" min="1" class="input-medieval w-full p-2 text-center border-l-0 border-r-0 h-10 font-bold">
                <button @click="qty++" class="w-10 h-10 bg-kingdom-dark border border-kingdom-gold text-kingdom-gold rounded-r hover:bg-kingdom-gold hover:text-black transition">+</button>
              </div>
              
              <!-- Preview de Valor Total Calculado -->
              <p class="text-xs text-gray-500 mt-2 text-right flex justify-between items-center border-t border-gray-800 pt-2">
                 <span>Valor Calculado p/ item:</span>
                 <strong class="text-kingdom-gold">
                    {{ formatCompact(previewCalculatedValue) }}
                 </strong>
              </p>
            </div>

            <button @click="addToCart" :disabled="previewCalculatedValue === 0" class="w-full bg-kingdom-gold hover:bg-white text-black font-display font-bold uppercase py-3 rounded transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-kingdom-gold/20 disabled:opacity-50 disabled:cursor-not-allowed">
              <i class="fa-solid fa-plus"></i> Adicionar à Lista
            </button>
          </div>

          <!-- Agravantes Globais -->
          <div class="p-4 border-t border-gray-800">
            <label class="checkbox-wrapper flex items-center gap-3 cursor-pointer group mb-3">
              <input type="checkbox" v-model="isTop100" class="hidden">
              <div class="w-5 h-5 border border-gray-600 rounded bg-kingdom-dark flex items-center justify-center transition-colors duration-200">
                <i class="fa-solid fa-check text-[10px] text-black" v-show="isTop100"></i>
              </div>
              <span class="text-sm text-gray-400 group-hover:text-kingdom-gold transition">Top 100 (x2)</span>
            </label>
            <label class="checkbox-wrapper flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" v-model="isTribunal" class="hidden">
              <div class="w-5 h-5 border border-gray-600 rounded bg-kingdom-dark flex items-center justify-center transition-colors duration-200">
                <i class="fa-solid fa-check text-[10px] text-black" v-show="isTribunal"></i>
              </div>
              <span class="text-sm text-gray-400 group-hover:text-kingdom-blood transition">Tribunal (x2)</span>
            </label>
          </div>
        </div>

        <!-- DIREITA: Lista -->
        <div class="flex flex-col bg-black/40 rounded border border-white/5 relative h-full min-h-[400px]">
          <div class="flex-1 p-4 overflow-y-auto max-h-[400px]">
             <!-- Lista vazia -->
             <div v-if="cart.length === 0" class="h-40 flex flex-col items-center justify-center text-gray-600 italic text-sm">
                <i class="fa-solid fa-scale-unbalanced text-3xl mb-2 opacity-30"></i>
                Nenhuma infração adicionada.
             </div>
             <!-- Itens do Carrinho -->
             <transition-group name="list" tag="ul" class="space-y-2">
                <li v-for="(item, index) in cart" :key="item.id" class="bg-white/5 hover:bg-white/10 p-2 rounded flex justify-between items-center border-l-2 border-kingdom-gold group">
                  <div class="text-sm">
                    <div class="text-gray-200 font-bold">
                      <span class="text-kingdom-gold">{{ item.qty }}x</span> {{ item.name }}
                    </div>
                    <div class="text-xs text-gray-500 mt-1">
                      <div v-if="item.isMixed">
                         <span class="text-kingdom-bloodLight">{{ item.breakdown.prod }} Refs</span> + 
                         <span class="text-blue-400">{{ item.breakdown.rez }} Ress</span>
                      </div>
                      <div v-else class="text-[10px] uppercase text-gray-600">
                        Custo Fixo / Geral
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-gray-300 font-mono text-sm">{{ formatCompact(item.totalValue) }}</span>
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
                <div class="text-xs text-kingdom-gold uppercase tracking-widest mb-1">Total Final</div>
                <div class="text-3xl lg:text-4xl font-bold text-white tracking-tight gold-glow">
                  {{ formatCurrency(finalTotal) }}
                </div>
                <div class="text-[10px] text-gray-500 mt-1 uppercase">Prata</div>
             </div>
             <button @click="copyReport" v-if="cart.length > 0"
                    class="mt-4 w-full bg-kingdom-blood hover:bg-kingdom-bloodLight text-white font-display uppercase text-sm tracking-widest py-3 rounded border border-transparent hover:border-kingdom-gold transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
                <span v-if="!showCopied">Copiar Sentença</span>
                <span v-else>Copiado!</span>
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
            <span class="font-bold">Relatório copiado para a área de transferência</span>
        </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { unitsDB, categoryLabels, generalInfractions, resourceInfractions } from '../data/dataCompensation';

// --- Estado ---
const selectedCategoryKey = ref('guardsmen'); 
const selectedTierIndex = ref(0);
const selectedUnitIndex = ref(0);
const selectedGeneralIndex = ref(0);
const qty = ref(1);
const isTop100 = ref(false);
const isTribunal = ref(false);
const cart = ref([]);
const cartIdCounter = ref(1);
const showCopied = ref(false);

const allGeneralInfractions = [...generalInfractions, ...resourceInfractions];

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

// Lógica de Cálculo Centralizada (Preview)
const previewCalculatedValue = computed(() => {
    // 1. Caso Infrações Gerais
    if (selectedCategoryKey.value === 'general') {
        const inf = currentGeneralInfraction.value;
        let base = (inf.type === 'basic') ? inf.base : inf.multiplier;
        return base * qty.value;
    } 

    // 2. Caso Unidades (Regra 25/75)
    if (!currentUnit.value) return 0;
    
    const prodCost = currentUnit.value.cost;     // Custo produção
    const rezCost = currentUnit.value.rez_cost;  // Custo ressurreição
    const totalQty = qty.value;

    // Proteção para unidades que não tem preço (ex: Mercenários com null)
    if (prodCost === null && rezCost !== null) return rezCost * totalQty;
    if (rezCost === null && prodCost !== null) return prodCost * totalQty;
    if (prodCost === null && rezCost === null) return 0;

    // Regra Padrão: 25% refaz (caro) + 75% revive (barato)
    const qtyProd = totalQty * 0.25;
    const qtyRez = totalQty * 0.75;

    return (qtyProd * prodCost) + (qtyRez * rezCost);
});

const totalBase = computed(() => cart.value.reduce((acc, item) => acc + item.totalValue, 0));

const finalTotal = computed(() => {
    let total = totalBase.value;
    if (isTop100.value) total *= 2;
    if (isTribunal.value) total *= 2;
    return total;
});

// --- Watchers ---
watch(selectedCategoryKey, () => {
    selectedTierIndex.value = 0;
    selectedUnitIndex.value = 0;
    qty.value = 1;
});
watch(selectedTierIndex, () => {
    selectedUnitIndex.value = 0;
});

// --- Métodos ---
const formatCurrency = (val) => new Intl.NumberFormat('pt-BR').format(val);
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
    let breakdown = { prod: 0, rez: 0 };

    if (selectedCategoryKey.value === 'general') {
        name = currentGeneralInfraction.value.label;
    } else {
        name = currentUnit.value.unit;
        // Se tiver ambos os custos, é misto
        if (currentUnit.value.cost !== null && currentUnit.value.rez_cost !== null) {
            isMixed = true;
            breakdown.prod = qty.value * 0.25;
            breakdown.rez = qty.value * 0.75;
        }
    }

    cart.value.push({
        id: cartIdCounter.value++,
        name: name,
        qty: qty.value,
        totalValue: previewCalculatedValue.value,
        isMixed: isMixed,
        breakdown: breakdown
    });
};

const removeFromCart = (index) => cart.value.splice(index, 1);

const copyReport = () => {
  const date = new Date().toLocaleDateString('pt-BR');
  const totalFormatted = formatCurrency(finalTotal.value);
  
  let itemsList = cart.value.map(item => {
    let desc = `- ${item.qty}x ${item.name}`;
    
    if (item.isMixed) {
        // Adiciona detalhes do cálculo misto
        desc += ` (75% Rez + 25% Prod)`;
    }
    desc += ` = ${formatCompact(item.totalValue)}`;
    return desc;
  }).join('\n');

  let details = '';
  if(isTop100.value) details += `\n\n⚠️ **Agravante Top 100:** x2`;
  if(isTribunal.value) details += `\n⚖️ **Agravante Tribunal:** x2`;

  const report = `📜 **SENTENÇA REAL - REINO #290** 📜\nData: ${date}\n\n**DETALHAMENTO:**\n${itemsList}\n-------------------------\n**Subtotal:** ${formatCompact(totalBase.value)}${details}\n\n💰 **VALOR TOTAL:**\n👉 ${totalFormatted} PRATA\n\n_O não pagamento resultará em execução pela Guarda Real._`;

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