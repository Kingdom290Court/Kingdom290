<template>
  <section class="max-w-5xl mx-auto mt-8 mb-16">
    <div class="glass-card rounded-xl overflow-hidden relative border-kingdom-gold/30">
      
      <div class="bg-gradient-to-r from-kingdom-dark via-kingdom-black to-kingdom-dark p-4 border-b border-kingdom-gold/30 flex items-center justify-between">
        <h2 class="font-display text-xl text-kingdom-gold">
          <i class="fa-solid fa-gavel mr-2"></i> Official Court Notice
        </h2>
        <span class="text-[10px] text-gray-500 uppercase tracking-widest">Judicial Order Generator</span>
      </div>

      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <!-- Coluna Esquerda: Formulário -->
        <div class="space-y-4">
          <div>
            <label class="block font-display text-xs text-gray-400 mb-1 uppercase tracking-wide">Claimant (Victim)</label>
            <div class="relative">
              <input type="text" v-model="claimant" placeholder="Name of the victim" 
                     class="input-medieval w-full p-3 rounded border border-gray-700 bg-black/50 text-white placeholder-gray-600 focus:border-kingdom-gold transition-colors">
              <i class="fa-solid fa-user-shield absolute right-3 top-3.5 text-gray-500"></i>
            </div>
          </div>

          <div>
            <label class="block font-display text-xs text-gray-400 mb-1 uppercase tracking-wide">Defendant (Attacker)</label>
            <div class="relative">
              <input type="text" v-model="defendant" placeholder="Name of the attacker" 
                     class="input-medieval w-full p-3 rounded border border-gray-700 bg-black/50 text-white placeholder-gray-600 focus:border-kingdom-blood transition-colors">
              <i class="fa-solid fa-user-ninja absolute right-3 top-3.5 text-gray-500"></i>
            </div>
          </div>

          <div>
            <label class="block font-display text-xs text-gray-400 mb-1 uppercase tracking-wide">Restitution Amount (Silver)</label>
            <div class="relative">
              <!-- Campo totalmente manual -->
              <input type="text" v-model="manualAmountStr" placeholder="0" 
                     class="input-medieval w-full p-3 rounded border border-kingdom-gold/50 bg-kingdom-gold/5 text-kingdom-gold font-bold font-mono focus:bg-black transition-colors">
              <i class="fa-solid fa-coins absolute right-3 top-3.5 text-kingdom-gold"></i>
            </div>
            <p class="text-[10px] text-gray-500 mt-1">* Enter value manually</p>
          </div>
        </div>

        <!-- Coluna Direita: Preview e Ação -->
        <div class="flex flex-col h-full">
          <label class="block font-display text-xs text-gray-400 mb-2 uppercase tracking-wide">Message Preview</label>
          
          <div class="flex-1 bg-black/40 border border-white/10 rounded p-4 text-sm text-gray-300 font-serif leading-relaxed italic relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none"></div>
            
            <p class="mb-2"><strong class="text-white not-italic">On behalf of the Kingdom Administration</strong></p>
            <p class="mb-2"><strong class="text-white not-italic">Legal Notice: Restitution Case</strong></p>
            <p class="mb-4 text-kingdom-gold">Case: {{ claimant || '[Claimant]' }} vs {{ defendant || '[Defendant]' }}</p>
            
            <p class="mb-2">In accordance with the law, the defendant ({{ defendant || '[Defendant]' }}) is ordered to pay the sum of <strong class="text-white not-italic">{{ manualAmountStr }} silver</strong> to the claimant ({{ claimant || '[Claimant]' }}).</p>
            
            <p class="mb-2">The defendant has <strong class="text-white not-italic">24 hours</strong> from the date of this notification to make the payment.</p>
            
            <p>In the event of non-payment, the Court reserves the right to issue an order to the Royal Guard to collect said amount or to declare the individual an outlaw.</p>
          </div>

          <button @click="copyNotice" 
                  :disabled="!isValid"
                  class="mt-4 w-full bg-kingdom-gold hover:bg-white text-black font-display font-bold uppercase py-3 rounded transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-kingdom-gold/20 disabled:opacity-50 disabled:cursor-not-allowed group">
            <span v-if="!showCopied">Copy Official Notice</span>
            <span v-else>Copied to Clipboard!</span>
            <i class="fa-solid" :class="showCopied ? 'fa-check' : 'fa-scroll'"></i>
          </button>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

// Nenhuma prop necessária
const claimant = ref('');
const defendant = ref('');
const showCopied = ref(false);
const manualAmountStr = ref('');

const isValid = computed(() => {
  return claimant.value.trim() !== '' && defendant.value.trim() !== '';
});

const copyNotice = () => {
  if (!isValid.value) return;

  const text = `****On behalf of the Kingdom Administration****

**Legal Notice: Restitution Case
**Case: ${claimant.value} vs ${defendant.value}**

In accordance with the law, the defendant (${defendant.value}) is ordered to pay the sum of ${manualAmountStr.value} silver to the claimant (${claimant.value}).

The defendant has 24 hours from the date of this notification to make the payment.


In the event of non-payment, the Court reserves the right to issue an order to the Royal Guard to collect the said amount or to declare the individual an outlaw.`;

  navigator.clipboard.writeText(text).then(() => {
    showCopied.value = true;
    setTimeout(() => showCopied.value = false, 3000);
  });
};
</script>