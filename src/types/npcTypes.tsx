type BuffNerfNeutral = "buff" | "nerf" | "nuetral"

export type Ability = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';
export type Skill =
    | 'Athletics'
    | 'Acrobatics'
    | 'Slight_of_Hand'
    | 'Stealth'
    | 'Arcana'
    | 'History'
    | 'Investigation'
    | 'Nature'
    | 'Religion'
    | 'Animal_Handling'
    | 'Insight'
    | 'Medicine'
    | 'Perception'
    | 'Survival'
    | 'Deception'
    | 'Intimidation'
    | 'Performance'
    | 'Persuasion';

type StatModifier = {
    ac: BuffNerfNeutral
    attackBonus: BuffNerfNeutral;
    hp: BuffNerfNeutral;
    dpr: BuffNerfNeutral;
}

export type NPCAbilityScores = {
    STR: number;
    DEX: number;
    CON: number;
    INT: number;
    WIS: number;
    CHA: number;
}
export type NPCStatBlockStats = {
    abilityScores: NPCAbilityScores;
    saveProf: string[];
}

export type CoreStats = {
    cr: number;
    ac: number;
    hp: number;
    atk: number;
    dpr: number;
    dc: number;
    prof: number;
}

export type NPCStats = {
    name: string;
    allignment: string;
    coreStats: CoreStats;
    statBlock: NPCStatBlockStats;
    skills: Skill[];
    traits: string[];
    actions: string[];
    bonusActions: string[]
    reactions: string[]
}

export type AtkRoll = {
    attackBonus: number;
    diceType: number;
    numDice: number;
    damageBonus: number;
    averageDamage: number;
}
