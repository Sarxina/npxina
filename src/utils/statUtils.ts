import { NPCAbilityScores, NPCStatBlockStats, Ability, Skill, AtkRoll} from "../types/npcTypes"

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
/** Returns the statistical average of a dice roll */
export const calcSingleDiceAvg = (dice: number): number => {
    return (1 + dice) / 2
}
/**Calculates the expected value of dice roll with bonuses */
export const calcDiceAvg = (dice: number, nDice: number, bonus: number, raw: boolean = false): number => {
    var rawValue: number = (calcSingleDiceAvg(dice) * nDice) + bonus;
    return raw ? rawValue : Math.round(rawValue);
}
/** Calculates the modifier of an ability score */
export const calcAbilityMod = (score: number): number => {
    return Math.floor((score - 10) / 2);
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
    var baseScore: number = calcAbilityMod(abilityScores[ability]);

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

export const calcNumDice = (total: number, dice: number): number => {
    return Math.floor(total / calcSingleDiceAvg(dice));
}

export const calcNumAtkDice = (dpr: number, nAtks: number, dice: number): number => {
    return calcNumDice(dpr / nAtks, dice);
}
export const calcAtkBonus = (dpr: number, nAtks: number, dice: number): number => {
    var nDice = calcNumAtkDice(dpr, nAtks, dice)
    var avgDiceDmg = calcDiceAvg(dice, nDice, 0, true);
    var targetDPR = dpr / nAtks;
    return Math.round(targetDPR - avgDiceDmg);
}
export const calcAtkRoll = (
    dpr: number,
    atk: number,
    numMultiAttacks: number,
    dice: number,
    maxDice: number
): AtkRoll => {

    var numDice = calcNumAtkDice(dpr, numMultiAttacks, dice);
    var damageBonus = calcAtkBonus(dpr, numMultiAttacks, dice)
    var averageDamage = calcDiceAvg(dice, numDice, damageBonus);
    return {
        attackBonus: atk,
        diceType: dice,
        numDice: numDice,
        damageBonus,
        averageDamage
    }
};
