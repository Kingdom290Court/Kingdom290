import unitData from './units.json';

// Mapeamento para nomes bonitos na UI
export const categoryLabels = {
    guardsmen: 'Guardsmen',
    specialists: 'Specialists',
    engineer_corps: 'Engineer Corps',
    monsters: 'Monsters',
    mercenaries: 'Mercenaries'
};

// Exporta o JSON bruto
export const unitsDB = unitData;

// Infrações Gerais (Mantidas pois não estão no JSON de unidades)
export const generalInfractions = [
    { id: 'gen_illegal', label: 'Ataque Ilegal (>1M Poder)', base: 500000, hasQty: false, type: 'basic' },
    { id: 'gen_dm',      label: 'Roubo de Dragon Mound', base: 500000, hasQty: false, type: 'basic' },
    { id: 'gen_portal',  label: 'Destruição: Portais', base: 1000000, hasQty: true, qtyLabel: 'Qtd Portais', type: 'basic' },
    { id: 'gen_fort',    label: 'Destruição: Forte de Clã', base: 5000000, hasQty: false, type: 'basic' },
    { id: 'gen_cap',     label: 'Destruição: Capital de Clã', base: 10000000, hasQty: false, type: 'basic' }
];

export const resourceInfractions = [
    { id: 'res_gold', label: 'Dívida: Ouro (Gold)', hasQty: true, qtyLabel: 'Qtd de Ouro', multiplier: 10000, type: 'resource' },
    { id: 'res_tar',  label: 'Dívida: Alcatrão (Tar)', hasQty: true, qtyLabel: 'Qtd de Alcatrão', multiplier: 1000, type: 'resource' }
];