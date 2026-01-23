<script setup>
import HeaderHero from './components/HeaderHero.vue';
import RulesGrid from './components/RulesGrid.vue';
import PenaltyCalculator from './components/PenaltyCalculator.vue';
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <HeaderHero />
    <RulesGrid />
    <PenaltyCalculator />
    
    <footer class="mt-20 text-center text-gray-600 text-xs border-t border-gray-900 pt-8 pb-8">
      <p class="font-display text-kingdom-goldDim mb-2">Reino #290 &bull; Total Battle</p>
      <p>Ferramenta desenvolvida para manutenção da ordem e justiça.</p>
    </footer>
  </div>
</template>