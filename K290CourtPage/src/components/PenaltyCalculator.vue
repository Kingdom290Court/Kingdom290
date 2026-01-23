<template>
  <section id="calculator" class="max-w-5xl mx-auto">
    <div class="glass-card rounded-xl overflow-hidden relative">
      <!-- Header Calculadora -->
      <div class="bg-gradient-to-r from-kingdom-black via-kingdom-dark to-kingdom-black p-6 border-b border-kingdom-gold/30 flex justify-between items-center">
        <h2 class="font-display text-2xl text-kingdom-gold">
          <i class="fa-solid fa-scale-balanced mr-2"></i> Juiz de Compensação
        </h2>
        <span class="text-xs text-gray-500 uppercase tracking-widest border border-gray-700 px-2 py-1 rounded">Sistema V.3.1</span>
      </div>

      <div class="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Coluna da Esquerda: Inputs -->
        <div class="space-y-6">
          <div class="bg-white/5 p-4 rounded border border-white/10">
            <h3 class="font-display text-kingdom-gold text-sm mb-4 uppercase border-b border-gray-700 pb-2">
              <i class="fa-solid fa-plus-circle mr-1"></i> Adicionar Item
            </h3>

            <!-- Tipo de Infração -->
            <div class="mb-4">
              <label class="block font-display text-xs text-gray-400 mb-2 uppercase tracking-wide">Tipo</label>
              <div class="relative">
                <!-- Select Dinâmico usando os grupos importados -->
                <select v-model="selectedInfractionIndex" class="input-medieval w-full p-3 rounded appearance-none cursor-pointer text-sm">
                  <optgroup label="Unidades de Batalha">
                    <option v-for="(type, index) in troopInfractions" :key="'trp'+index" :value="index">
                      {{ type.label }}
                    </option>
                  </optgroup>
                  <optgroup label="Infrações Gerais">
                    <!-- O value soma o length do array anterior para manter o índice global correto -->
                    <option v-for="(type, index) in generalInfractions" :key="'gen'+index" :value="index + troopInfractions.length">
                      {{ type.label }}
                    </option>
                  </optgroup>
                  <optgroup label="Recursos e Dívidas">
                    <option v-for="(type, index) in resourceInfractions" :key="'res'+index" :value="index + troopInfractions.length + generalInfractions.length">
                      {{ type.label }}
                    </option>
                  </optgroup>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-kingdom-gold">
                  <i class="fa-solid fa-chevron-down"></i>
                </div>
              </div>
            </div>

            <!-- Seletor de Nível (Condicional) -->
            <div v-if="currentInfraction.hasLevel" class="mb-4 bg-kingdom-black/40 p-3 rounded border border-white/5">
              <label class="block font-display text-xs text-kingdom-gold mb-2 uppercase tracking-wide flex justify-between">
                <span>Nível (Tier)</span>
                <span class="text-white font-bold">Tier {{ selectedLevel }}</span>
              </label>
              <input type="range" v-model.number="selectedLevel" min="1" max="10" step="1" 
                     class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-kingdom-gold">
              <div class="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
                <span>I</span><span>II</span><span>III</span><span>IV</span><span>V</span><span>VI</span><span>VII</span><span>VIII</span><span>IX</span><span>X</span>
              </div>
            </div>

            <!-- Quantidade -->
            <div class="mb-6">
              <label class="block font-display text-xs text-gray-400 mb-2 uppercase tracking-wide">
                {{ currentInfraction.qtyLabel || 'Quantidade' }}
              </label>
              <div class="flex items-center">
                <button @click="qty > 1 ? qty-- : null" class="w-10 h-10 bg-kingdom-dark border border-kingdom-gold text-kingdom-gold rounded-l hover:bg-kingdom-gold hover:text-black transition">-</button>
                <input type="number" v-model="qty" min="1" class="input-medieval w-full p-2 text-center border-l-0 border-r-0 h-10 font-bold">
                <button @click="qty++" class="w-10 h-10 bg-kingdom-dark border border-kingdom-gold text-kingdom-gold rounded-r hover:bg-kingdom-gold hover:text-black transition">+</button>
              </div>
              <p class="text-xs text-gray-500 mt-1 text-right">
                Valor Unitário: <span class="text-kingdom-gold">{{ formatCurrency(currentUnitValue) }}</span>
              </p>
            </div>

            <!-- Botão Adicionar -->
            <button @click="addToCart" class="w-full bg-kingdom-gold hover:bg-white text-black font-display font-bold uppercase py-3 rounded transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-kingdom-gold/20">
              <i class="fa-solid fa-plus"></i> Adicionar à Lista
            </button>
          </div>

          <!-- Agravantes Globais -->
          <div class="p-4 border-t border-gray-800">
            <label class="block font-display text-xs text-gray-500 mb-3 uppercase tracking-wide">Agravantes (Aplicado ao Total)</label>
            
            <label class="checkbox-wrapper flex items-center gap-3 cursor-pointer group mb-3">
              <input type="checkbox" v-model="isTop100" class="hidden">
              <div class="w-5 h-5 border border-gray-600 rounded bg-kingdom-dark flex items-center justify-center transition-colors duration-200">
                <i class="fa-solid fa-check text-[10px] text-black" v-show="isTop100"></i>
              </div>
              <span class="text-sm text-gray-400 group-hover:text-kingdom-gold transition">Infrator Top 100 (x2)</span>
            </label>

            <label class="checkbox-wrapper flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" v-model="isTribunal" class="hidden">
              <div class="w-5 h-5 border border-gray-600 rounded bg-kingdom-dark flex items-center justify-center transition-colors duration-200">
                <i class="fa-solid fa-check text-[10px] text-black" v-show="isTribunal"></i>
              </div>
              <span class="text-sm text-gray-400 group-hover:text-kingdom-blood transition">Litígio / Tribunal (x2)</span>
            </label>
          </div>
        </div>

        <!-- Coluna da Direita: Lista e Resultado -->
        <div class="flex flex-col bg-black/40 rounded border border-white/5 relative h-full min-h-[400px]">
          
          <!-- Lista de Itens -->
          <div class="flex-1 p-4 overflow-y-auto max-h-[400px]">
            <h3 class="font-display text-gray-400 text-xs uppercase mb-3 flex justify-between items-center">
              <span>Lista de Infrações</span>
              <span v-if="cart.length > 0" @click="cart = []" class="cursor-pointer text-kingdom-blood hover:text-red-400 text-[10px]">
                <i class="fa-solid fa-trash"></i> Limpar
              </span>
            </h3>

            <div v-if="cart.length === 0" class="h-40 flex flex-col items-center justify-center text-gray-600 italic text-sm">
              <i class="fa-solid fa-scale-unbalanced text-3xl mb-2 opacity-30"></i>
              Nenhuma infração adicionada.
            </div>

            <transition-group name="list" tag="ul" class="space-y-2">
              <li v-for="(item, index) in cart" :key="item.id" class="bg-white/5 hover:bg-white/10 p-2 rounded flex justify-between items-center border-l-2 border-kingdom-gold group">
                <div class="text-sm">
                  <div class="text-gray-200 font-bold">
                    <span class="text-kingdom-gold">{{ item.qty }}x</span> {{ item.name }}
                  </div>
                  <div class="text-xs text-gray-500" v-if="item.tier">
                    Nível (Tier): {{ item.tierRoman }}
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

          <!-- Área de Totais -->
          <div class="p-6 bg-kingdom-dark/80 border-t border-kingdom-gold/20 backdrop-blur-sm mt-auto relative z-10">
            <!-- Ornamento -->
            <div class="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-kingdom-gold opacity-50"></div>
            <div class="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-kingdom-gold opacity-50"></div>

            <div class="flex justify-between items-end mb-2">
              <span class="text-sm text-gray-400 uppercase">Subtotal</span>
              <span class="text-gray-300 font-mono">{{ formatCurrency(totalBase) }}</span>
            </div>

            <div v-if="isTop100 || isTribunal" class="space-y-1 mb-3 text-xs border-b border-gray-700 pb-2">
              <div v-if="isTop100" class="flex justify-between text-kingdom-gold">
                <span>Agravante Top 100</span>
                <span>x2</span>
              </div>
              <div v-if="isTribunal" class="flex justify-between text-kingdom-blood">
                <span>Agravante Tribunal</span>
                <span>x2</span>
              </div>
            </div>

            <div class="text-center mt-2">
              <div class="text-xs text-kingdom-gold uppercase tracking-widest mb-1">Total Final</div>
              <div class="text-3xl lg:text-4xl font-bold text-white tracking-tight gold-glow">
                {{ formatCurrency(finalTotal) }}
              </div>
              <div class="text-[10px] text-gray-500 mt-1 uppercase">Prata</div>
            </div>

            <!-- Botão de Ação -->
            <button @click="copyReport" v-if="cart.length > 0"
                    class="mt-4 w-full bg-kingdom-blood hover:bg-kingdom-bloodLight text-white font-display uppercase text-sm tracking-widest py-3 rounded border border-transparent hover:border-kingdom-gold transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
              <span v-if="!showCopied">Copiar Sentença Completa</span>
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

// Importa os dados do arquivo externo
import { troopInfractions, generalInfractions, resourceInfractions } from '../data/gameRules';

// Combina os dados para facilitar a busca pelo índice
const allInfractions = [...troopInfractions, ...generalInfractions, ...resourceInfractions];

// --- Estados Reativos ---
const selectedInfractionIndex = ref(0);
const qty = ref(1);
const selectedLevel = ref(1);
const isTop100 = ref(false);
const isTribunal = ref(false);
const cart = ref([]);
const cartIdCounter = ref(1);
const showCopied = ref(false);

// --- Computeds ---
const currentInfraction = computed(() => allInfractions[selectedInfractionIndex.value] || allInfractions[0]);

const currentUnitValue = computed(() => {
  const inf = currentInfraction.value;
  let val = 0;
  if (inf.type === 'basic') val = inf.base;
  else if (inf.type === 'resource') val = inf.multiplier;
  else if (inf.type === 'leveled') {
    if (inf.levelType === 'troop') val = 500000 * selectedLevel.value;
    else if (inf.levelType === 'monster') val = 1000000 + ((selectedLevel.value - 1) * 500000);
  }
  return val;
});

const totalBase = computed(() => cart.value.reduce((acc, item) => acc + item.totalValue, 0));

const finalTotal = computed(() => {
  let total = totalBase.value;
  if (isTop100.value) total *= 2;
  if (isTribunal.value) total *= 2;
  return total;
});

// --- Watchers ---
watch(selectedInfractionIndex, () => {
  const inf = currentInfraction.value;
  if (!inf.hasQty) qty.value = 1;
  if (!inf.hasLevel) selectedLevel.value = 1;
  else selectedLevel.value = 1; 
});

// --- Métodos Auxiliares ---
const formatCurrency = (val) => new Intl.NumberFormat('pt-BR').format(val);

const formatCompact = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num;
};

const toRoman = (num) => {
  const roman = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
  let str = '';
  for (let i of Object.keys(roman)) {
    let q = Math.floor(num / roman[i]);
    num -= q * roman[i];
    str += i.repeat(q);
  }
  return str;
};

// --- Ações ---
const addToCart = () => {
  const inf = currentInfraction.value;
  const unitPrice = currentUnitValue.value;
  const multiplier = inf.hasQty ? qty.value : 1;
  
  cart.value.push({
    id: cartIdCounter.value++,
    name: inf.label,
    qty: inf.hasQty ? qty.value : 1,
    unitValue: unitPrice,
    totalValue: unitPrice * multiplier,
    tier: inf.hasLevel ? selectedLevel.value : null,
    tierRoman: inf.hasLevel ? toRoman(selectedLevel.value) : null
  });
};

const removeFromCart = (index) => {
  cart.value.splice(index, 1);
};

const copyReport = () => {
  const date = new Date().toLocaleDateString('pt-BR');
  const totalFormatted = formatCurrency(finalTotal.value);
  
  let itemsList = cart.value.map(item => {
    let line = `- ${item.qty}x ${item.name}`;
    if(item.tier) line += ` (Tier ${item.tierRoman})`;
    line += ` = ${formatCompact(item.totalValue)}`;
    return line;
  }).join('\n');

  let details = '';
  if(isTop100.value) details += `\n\n *Agravante Top 100: x2`;
  if(isTribunal.value) details += `\n *Agravante Tribunal: x2`;

  const report = `SENTENÇA REAL - REINO #290 \nData: ${date}\n\n*DETALHAMENTO DA INFRAÇÃO:\n${itemsList}\n-------------------------\n**Subtotal:** ${formatCompact(totalBase.value)}${details}\n\n*VALOR TOTAL DA MULTA:\n ${totalFormatted} PRATA\n\n_O não pagamento resultará em execução pela Guarda Real.`;

  navigator.clipboard.writeText(report).then(() => {
    showCopied.value = true;
    setTimeout(() => showCopied.value = false, 3000);
  });
};
</script>