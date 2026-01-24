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
      <p class="font-display text-kingdom-goldDim mb-2">Kingdom #290 &bull; Total Battle</p>
      <p>Tool developed for maintaining order and justice.</p>
      <p>Created by Josué R Souza. | BR Hakon | <a href="https://github.com/jramso">@jramso</a></p>
      <p>Support website ScoreWarrior: <a href="https://scorewarrior.helpshift.com">scorewarrior.helpshift.com</a></p>
    </footer>
  </div>
</template>