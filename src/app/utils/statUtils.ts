import { NPCAbilityScores, NPCStatBlockStats, Ability, Skill, AtkRoll} from "../../types/npcTypes"

const skillToAbilityMap: Record<Skill, Ability> = {
    Athletics: 'STR',
    Acrobatics: 'DEX',
    Slight_of_Hand: 'DEX',
    Stealth: 'DEX',
    Arcana: 'INT',
    History: 'INT',
    Investigation: 'INT',
    Nature: 'INT',
    Religion: 'INT',
    Animal_Handling: 'WIS',
    Insight: 'WIS',
    Medicine: 'WIS',
    Perception: 'WIS',
    Survival: 'WIS',
    Deception: 'CHA',
    Intimidation: 'CHA',
    Performance: 'CHA',
    Persuasion: 'CHA'
};

/** Calculates the modifier of an ability score */
export const calcAbilityMod = (score: number): number => {
    return Math.floor((10 - score) / 2);
}

/** Calculates the modifier of a skill, given proficiency or expertise */
export const calcSkillMod = (
    abilityScores: NPCAbilityScores,
    skill: Skill,
    profBonus: number,
    proficient: boolean,
    expertise: boolean
) : number => {
    var ability : Ability = skillToAbilityMap[skill];
    var baseScore: number = calcAbilityMod(abilityScores[ability.toLowerCase()]);

    return baseScore + (proficient ? profBonus : 0) + (expertise ? profBonus: 0);
};

export const getCRString = (cr: number): string => {
    if (cr >= 1) {
        return cr.toString()
    }
    switch (cr) {
        case 0.125:
            return "1/8";
            break;
        case 0.25:
            return "1/4";
            break;
        case 0.5:
            return "1/2";
            break;
        default:
            return "0";
    }
}

export const calcAtkRoll = (dpr: number, atk: number, numMultiAttacks: number, dice: number): AtkRoll => {

    var dmgPerAttack = Math.ceil(dpr / numMultiAttacks);
    var numDice = Math.floor(dmgPerAttack / dice);
    var damageBonus = dmgPerAttack - (numDice * dice);
    var averageDamage = Math.ceil((dice / 2) * numDice) + damageBonus;

    return {
        attackBonus: atk,
        diceType: dice,
        numDice: numDice,
        damageBonus,
        averageDamage
    }
};
