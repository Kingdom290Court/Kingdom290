import unitData from './units.json';

// Mapeamento para nomes bonitos na UI
export const categoryLabels = {
    guardsmen: 'Guardsmen',
    specialists: 'Specialists',
    engineer_corps: 'Engineer Corps',
    monsters: 'Monsters',
    mercenaries: 'Mercenaries',
    captains: 'Capitains'
};

// Exporta o JSON bruto
export const unitsDB = unitData;

export const extraInfractions = [
  { id: 'merc_generic', label: 'Mercenaries (Genérico/Stack)', base: 500000, hasQty: true, type: 'basic' },
];
// Infrações Gerais (Mantidas pois não estão no JSON de unidades)
export const generalInfractions = [
    { id: 'gen_illegal', label: 'Illegal attack (>1M Poder)', base: 500000, hasQty: false, type: 'basic' },
    { id: 'gen_dm',      label: 'Dragon Mound Theft', base: 500000, hasQty: false, type: 'basic' },
    { id: 'gen_portal',  label: 'Destruction: Portals', base: 1000000, hasQty: true, qtyLabel: 'Qtd Portais', type: 'basic' },
    { id: 'gen_fort',    label: 'Destruction: Clan fort', base: 5000000, hasQty: false, type: 'basic' },
    { id: 'gen_cap',     label: 'Destruction: Clan Capital', base: 10000000, hasQty: false, type: 'basic' }
];

export const resourceInfractions = [
    { id: 'res_gold', label: 'Debt: Gold', hasQty: true, qtyLabel: 'Qt of Gold', multiplier: 10000, type: 'resource' },
    { id: 'res_tar',  label: 'Debt: Tar', hasQty: true, qtyLabel: 'Qt of Tar', multiplier: 1000, type: 'resource' }
];