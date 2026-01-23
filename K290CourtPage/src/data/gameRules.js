// Regras Visuais (Usadas no Grid de exibição)
export const rules = [
    { 
      title: 'Tropas', 
      value: '500k+', 
      desc: 'Base 500k (L1) + 500k por nível.', 
      icon: 'fa-solid fa-helmet-safety' 
    },
    { 
      title: 'Monstros', 
      value: '1M+', 
      desc: 'Base 1M (L1) + 500k por nível.', 
      icon: 'fa-solid fa-dragon' 
    },
    { 
      title: 'Mercenários', 
      value: '500k', 
      desc: 'Valor fixo por incidente/stack.', 
      icon: 'fa-brands fa-wolf-pack-battalion' 
    },
    { 
      title: 'Capital de Clã', 
      value: '10M', 
      desc: 'Ataque à Capital Central.', 
      icon: 'fa-solid fa-chess-rook' 
    },
    { 
      title: 'Forte de Clã', 
      value: '5M', 
      desc: 'Ataque ou destruição de Forte.', 
      icon: 'fa-brands fa-fort-awesome' 
    },
    { 
      title: 'Portais', 
      value: '1M', 
      desc: 'Valor por unidade destruída.', 
      icon: 'fa-solid fa-dungeon' 
    },
  ];
  
  // Infrações de Tropas e Monstros (Com Nível)
  export const troopInfractions = [
    { label: 'Tropas', hasQty: true, qtyLabel: 'Qtd. Unidades/Stacks', hasLevel: true, levelType: 'troop', type: 'leveled' },
    { label: 'Monstros', hasQty: true, qtyLabel: 'Qtd. Unidades/Stacks', hasLevel: true, levelType: 'monster', type: 'leveled' },
    { label: 'Mercenários', base: 500000, hasQty: true, qtyLabel: 'Qtd. Mercenários', type: 'basic' }
  ];
  
  // Infrações Gerais (Valores Fixos)
  export const generalInfractions = [
    { label: 'Ataque Ilegal (>1M Poder)', base: 500000, hasQty: false, type: 'basic' },
    { label: 'Roubo de Dragon Mound', base: 500000, hasQty: false, type: 'basic' },
    { label: 'Destruição: Portais', base: 1000000, hasQty: true, qtyLabel: 'Qtd Portais', type: 'basic' },
    { label: 'Destruição: Forte de Clã', base: 5000000, hasQty: false, type: 'basic' },
    { label: 'Destruição: Capital de Clã', base: 10000000, hasQty: false, type: 'basic' },
  ];
  
  // Infrações de Recursos (Multiplicadores)
  export const resourceInfractions = [
    { label: 'Dívida: Ouro (Gold)', hasQty: true, qtyLabel: 'Qtd de Ouro', multiplier: 10000, type: 'resource' },
    { label: 'Dívida: Alcatrão (Tar)', hasQty: true, qtyLabel: 'Qtd de Alcatrão', multiplier: 1000, type: 'resource' }
  ];