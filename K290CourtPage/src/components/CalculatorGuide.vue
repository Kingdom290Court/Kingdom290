<template>
  <section class="max-w-5xl mx-auto mt-16 mb-8 px-4">
    <div class="glass-card rounded-xl overflow-hidden border border-kingdom-gold/20">
      
      <!-- Header do Guia -->
      <div class="bg-kingdom-dark p-6 border-b border-kingdom-gold/10">
        <h2 class="font-display text-2xl text-kingdom-gold text-center uppercase tracking-widest">
          <i class="fa-solid fa-book-open mr-2"></i> Official Guide: Justice Tool
        </h2>
        <p class="text-center text-gray-500 text-xs mt-2 uppercase tracking-wide">
          Protocol for Governance & Compensation | Kingdom #290
        </p>
      </div>

      <div class="p-8 text-gray-300 space-y-12">

        <!-- 1. Compensation Judge -->
        <div class="flex flex-col md:flex-row gap-6">
          <div class="md:w-1/3 flex flex-col items-center text-center">
            <div class="w-16 h-16 rounded-full bg-kingdom-gold/10 flex items-center justify-center border border-kingdom-gold mb-4">
              <i class="fa-solid fa-scale-balanced text-3xl text-kingdom-gold"></i>
            </div>
            <h3 class="font-display text-lg text-white mb-2">1. Compensation Judge</h3>
            <p class="text-xs text-gray-500">The core calculation engine.</p>
          </div>
          <div class="md:w-2/3 space-y-4 text-sm">
            <!-- GENERAL VIOLATIONS NOTE -->
            <div class="bg-black/30 p-4 rounded border-l-2 border-kingdom-gold">
              <h4 class="text-kingdom-gold font-bold mb-1">General Violations & Fines Table</h4>
              <p>All violations explicitly listed in the <strong>Fines Table (RoE)</strong> — such as Illegal Attacks (500k), Portals (1M), or Forts — are located under the <strong>'General Violations'</strong> category dropdown.</p>
            </div>

            <!-- ADD BASE FINE NOTE -->
            <div class="bg-black/30 p-4 rounded border-l-2 border-kingdom-gold">
              <h4 class="text-kingdom-gold font-bold mb-1">Add Base Fine Usage</h4>
              <p>The <strong class="text-white">"Add Base Fine"</strong> checkbox should <strong>ONLY</strong> be used when calculating costs for <strong>Heroes and Captains</strong>.</p>
            </div>

            <div class="bg-black/30 p-4 rounded border-l-2 border-kingdom-gold">
              <h4 class="text-kingdom-gold font-bold mb-1">Automatic 25/75 Rule</h4>
              <p>For standard troops and monsters, the system automatically calculates the mixed loss cost: <strong class="text-white">25% Production</strong> (Permanent loss) + <strong class="text-white">75% Resurrection</strong> (Revivable).</p>
            </div>
            
            <div class="bg-black/30 p-4 rounded border-l-2 border-kingdom-gold">
              <h4 class="text-kingdom-gold font-bold mb-1">Captains & Heroes Logic</h4>
              <p>When selecting <strong>Captains</strong> or <strong>Heroes</strong>, the "Quantity" field becomes "Level". Calculation: <code class="bg-black px-1 rounded text-kingdom-gold">Base Rez Cost (50) x Level</code>.</p>
            </div>

            <div class="bg-black/30 p-4 rounded border-l-2 border-kingdom-blood">
              <h4 class="text-kingdom-blood font-bold mb-1">Aggravating Factors</h4>
              <ul class="list-disc list-inside space-y-1 text-gray-400">
                <li><strong>Top 100 Offender:</strong> Multiplies total by <strong class="text-white">2x</strong>.</li>
                <li><strong>Court Litigation:</strong> Multiplies total by <strong class="text-white">2x</strong>.</li>
                <li>
                  <strong>First Offense Fine:</strong> Adds a fixed <strong class="text-white">5M Silver</strong> fine.
                  <p class="text-xs text-gray-500 ml-5 mt-1 italic">
                    * This factor applies <strong>ONLY</strong> to the first incident of <strong>Player Gold Mine</strong> theft or <strong>Dragon Mound (DM)</strong> theft.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="w-full h-px bg-gradient-to-r from-transparent via-kingdom-gold/30 to-transparent"></div>

        <!-- 2. Court Notice -->
        <div class="flex flex-col md:flex-row gap-6">
          <div class="md:w-1/3 flex flex-col items-center text-center">
            <div class="w-16 h-16 rounded-full bg-kingdom-blood/10 flex items-center justify-center border border-kingdom-blood mb-4">
              <i class="fa-solid fa-gavel text-3xl text-kingdom-blood"></i>
            </div>
            <h3 class="font-display text-lg text-white mb-2">2. Official Court Notice</h3>
            <p class="text-xs text-gray-500">Formalizing the sentence.</p>
          </div>
          <div class="md:w-2/3 space-y-4 text-sm">
            <p>A manual module for generating official orders. It is completely decoupled from the calculator to allow judicial discretion.</p>
            <ol class="list-decimal list-inside space-y-2 text-gray-400">
              <li>Enter <strong>Claimant</strong> (Victim) and <strong>Defendant</strong> (Attacker) names.</li>
              <li>Manually enter the final <strong>Restitution Amount</strong>.</li>
              <li>Click <strong class="text-white">Copy Official Notice</strong> to generate the legal text.</li>
            </ol>
            <p class="text-xs italic text-gray-500 mt-2">
              * The notice grants a 24-hour deadline before Royal Guard intervention.
            </p>
          </div>
        </div>

        <div class="w-full h-px bg-gradient-to-r from-transparent via-kingdom-gold/30 to-transparent"></div>

        <!-- 3. Quick Workflow -->
        <div class="bg-kingdom-gold/5 border border-kingdom-gold/20 rounded p-6">
          <h3 class="font-display text-center text-kingdom-gold mb-6 uppercase tracking-wide">Quick Application Workflow</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center text-xs">
            <div class="p-3 bg-black/40 rounded">
              <div class="font-bold text-white text-lg mb-1">1</div>
              <p>Select Category, Tier & Unit</p>
            </div>
            <div class="p-3 bg-black/40 rounded">
              <div class="font-bold text-white text-lg mb-1">2</div>
              <p>Apply Aggravators (Top 100 / Fines)</p>
            </div>
            <div class="p-3 bg-black/40 rounded">
              <div class="font-bold text-white text-lg mb-1">3</div>
              <p>Copy <strong>Debit Memo</strong> & Paste in Chat</p>
            </div>
            <div class="p-3 bg-black/40 rounded">
              <div class="font-bold text-kingdom-blood text-lg mb-1">4</div>
              <p>Send <strong>Official Notice</strong> via Mail</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>