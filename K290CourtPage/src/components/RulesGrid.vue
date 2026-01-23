<template>
  <section class="mb-16">
    <div class="flex items-center gap-3 mb-6">
      <div class="h-px bg-kingdom-gold flex-1 opacity-50"></div>
      <h2 class="font-display text-2xl text-kingdom-silver text-center uppercase border-2 border-kingdom-gold px-6 py-2 rounded-sm bg-kingdom-black bg-opacity-50">
        <i class="fa-solid fa-scroll mr-2 text-kingdom-gold"></i> Tabela de Multas (RoE)
      </h2>
      <div class="h-px bg-kingdom-gold flex-1 opacity-50"></div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(rule, index) in rules" :key="index" 
           class="glass-card p-6 rounded-lg hover:bg-white/5 transition duration-300 group relative overflow-hidden">
        <div class="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition">
          <i :class="rule.icon" class="text-6xl text-kingdom-gold"></i>
        </div>
        <h3 class="font-display text-lg text-kingdom-gold mb-2 border-b border-white/10 pb-2">{{ rule.title }}</h3>
        <p class="text-2xl font-bold text-white mb-1">{{ rule.value }}</p>
        <p class="text-xs text-gray-400 mt-2 italic border-l-2 border-kingdom-blood pl-2">{{ rule.desc }}</p>
      </div>
    </div>
    
    <!-- Regras Especiais Texto -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="glass-card p-4 flex items-start gap-4 border-l-4 border-l-kingdom-blood">
        <i class="fa-solid fa-gavel text-kingdom-blood text-2xl mt-1"></i>
        <div>
          <h4 class="font-display text-kingdom-gold">Fator de Reincidência & Status</h4>
          <p class="text-sm text-gray-300">Jogadores <strong class="text-white">Top 100</strong> pagam o dobro. Casos levados a tribunal/litígio sofrem dobra da indenização final.</p>
        </div>
      </div>
      <div class="glass-card p-4 flex items-start gap-4 border-l-4 border-l-kingdom-gold">
        <i class="fa-solid fa-coins text-kingdom-gold text-2xl mt-1"></i>
        <div>
          <h4 class="font-display text-kingdom-gold">Câmbio Real</h4>
          <p class="text-sm text-gray-300">1 Ouro = <strong>10k Prata</strong>. 1 Alcatrão = <strong>1k Prata</strong>. Pagamento via minas de ouro possível sob acordo.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Importando os dados do arquivo separado
import { rules } from '../data/gameRules';
</script>