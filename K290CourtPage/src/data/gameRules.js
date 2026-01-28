// Regras Visuais (Usadas no Grid de exibição)
export const rules = [
    { 
      title: 'First Offense', 
      value: '5M', 
      desc: 'Fixed fine for the first illegal attack (Warning).', 
      icon: 'fa-solid fa-hand-paper' 
    },
    { 
      title: 'Illegal Attack', 
      value: '500K Silver + CT', 
      desc: 'Production cost (25%) + 75% of revival cost.', 
      icon: 'fa-solid fa-helmet-safety' 
    },
    { 
      title: 'Monsters', 
      value: '1M (per level) + CT', 
      desc: '1M Silver per max unit level + revival cost.', 
      icon: 'fa-solid fa-dragon' 
    },
    { 
      title: 'Captains', 
      value: 'Rez Cost x Level', 
      desc: 'Revival cost (50) multiplied by captain level.', 
      icon: 'fa-solid fa-chess-king' 
    },
    { 
      title: 'Heroes', 
      value: 'Rez Cost x Level', 
      desc: 'Revival cost (50) multiplied by hero level.', 
      icon: 'fa-solid fa-mask'  
    },
    { 
      title: 'Mercenaries', 
      value: '500k + CT', 
      desc: 'Fixed value per incident/stack + revival cost.', 
      icon: 'fa-brands fa-wolf-pack-battalion' 
    },
    { 
      title: 'Clan Capital', 
      value: '10M', 
      desc: 'Attack on Central Capital.', 
      icon: 'fa-solid fa-chess-rook' 
    },
    { 
      title: 'Clan Fort', 
      value: '5M', 
      desc: 'Attack or destruction of Fort.', 
      icon: 'fa-brands fa-fort-awesome' 
    },
    { 
      title: 'Portals', 
      value: '1M', 
      desc: 'Value per destroyed unit.', 
      icon: 'fa-solid fa-dungeon' 
    },
  ];
  
  // Troop and Monster Infractions (Leveled)
  export const troopInfractions = [
    { label: 'Troops', hasQty: true, qtyLabel: 'Unit/Stack Qty', hasLevel: true, levelType: 'troop', type: 'leveled' },
    { label: 'Monsters', hasQty: true, qtyLabel: 'Unit/Stack Qty', hasLevel: true, levelType: 'monster', type: 'leveled' },
    { label: 'Mercenaries', base: 500000, hasQty: true, qtyLabel: 'Mercenary Qty', type: 'basic' }
  ];
  
  // General Infractions (Fixed Values)
  export const generalInfractions = [
    { label: 'Illegal Attack (>1M Power)', base: 500000, hasQty: false, type: 'basic' },
    { label: 'Dragon Mound Theft', base: 500000, hasQty: false, type: 'basic' },
    { label: 'Destruction: Portals', base: 1000000, hasQty: true, qtyLabel: 'Portal Qty', type: 'basic' },
    { label: 'Destruction: Clan Fort', base: 5000000, hasQty: false, type: 'basic' },
    { label: 'Destruction: Clan Capital', base: 10000000, hasQty: false, type: 'basic' },
  ];
  
  // Resource Infractions (Multipliers)
  export const resourceInfractions = [
    { label: 'Debt: Gold', hasQty: true, qtyLabel: 'Gold Amount', multiplier: 10000, type: 'resource' },
    { label: 'Debt: Tar', hasQty: true, qtyLabel: 'Tar Amount', multiplier: 1000, type: 'resource' },
    { label: 'Debt: Stone', hasQty: true, qtyLabel: 'Stone Amount', multiplier: 0.1, type: 'resource' },
    { label: 'Debt: Wood', hasQty: true, qtyLabel: 'Wood Amount', multiplier: 0.1, type: 'resource' },
    { label: 'Debt: Food', hasQty: true, qtyLabel: 'Food Amount', multiplier: 0.1, type: 'resource' }
  ];