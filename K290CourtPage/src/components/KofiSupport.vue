<template>
  <section class="mt-16 flex flex-col items-center justify-center text-center px-4">
    <div class="glass-card p-8 rounded-xl border border-[#FF5E5B]/30 max-w-md w-full relative overflow-hidden group transition-all hover:border-[#FF5E5B]/60 shadow-lg hover:shadow-[#FF5E5B]/10">
      
      <!-- Efeito de brilho de fundo -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#FF5E5B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <!-- Ícone -->
      <div class="w-16 h-16 mx-auto bg-[#FF5E5B]/10 rounded-full flex items-center justify-center border border-[#FF5E5B]/20 mb-4 relative z-10">
        <i class="fa-solid fa-mug-hot text-2xl text-[#FF5E5B]"></i>
      </div>
      
      <!-- Texto -->
      <h3 class="font-display text-xl text-white mb-2 relative z-10">Buy me a coffee</h3>
      <p class="text-sm text-gray-400 mb-6 leading-relaxed relative z-10">
        If this tool saved you time and helped maintain order in our Kingdom, consider supporting the developer!
      </p>
      
      <!-- Botão Ko-fi -->
      <a href="https://ko-fi.com/jramso" target="_blank" rel="noopener noreferrer" 
         class="relative z-10 inline-flex items-center justify-center gap-3 bg-[#FF5E5B] hover:bg-[#FF5E5B]/90 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(255,94,91,0.4)] hover:shadow-[0_0_25px_rgba(255,94,91,0.6)] transform hover:-translate-y-1">
        <img src="https://storage.ko-fi.com/cdn/cup-border.png" class="w-5 h-5 drop-shadow-md" alt="Ko-fi Cup" />
        <span>Support JRamso | BR Odin Hakon</span>
      </a>
      
    </div>
  </section>
</template>

<script setup>
// O componente é puramente visual, não precisa de lógica adicional por enquanto.
</script>