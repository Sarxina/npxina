import { NPCGenerationProfile } from "@/types/generationTypes";
import { Ability, NPCAbilityScores } from "@/types/npcTypes";
import { defaultNPCAbilityScores } from "./produceNPC";

const rollAbilityScore = (): number => {
    const rolls = Array.from({length: 4}, () => Math.floor(Math.random() * 6) + 1);
    rolls.sort((a, b) => b - a);
    return rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0);
};

const generateASArray = (): number[] => {
    return Array.from({length: 6}, () => rollAbilityScore());
}

const getASArray = (cr: number): number[] => {
    var baseArray: number[] = generateASArray();

    //**Simple formula for generating NPC stats:
    // Roll a simple array, then add half the CR to everything */
    var mod = 0;
    if (cr === 0) mod = -2;
    else if (cr === 0.125) mod = -1;
    else mod = Math.floor(cr / 2);

    return baseArray.map(x => x + mod).sort((a, b) => a - b);
}

export const generateAbilityScores = (generationProfile: NPCGenerationProfile): NPCAbilityScores => {

    const abilityArray: number[] = getASArray(generationProfile.cr);
    const returnStats: NPCAbilityScores = {...defaultNPCAbilityScores}

    /** Randomy choose which order to assign the remaining ability scores for variety */
    const allAbilities: Ability[] = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
    const remainingAbilities = allAbilities.filter(ability => !Object.values(generationProfile.abilityScoreProfile).includes(ability));


    const {
        major,
        minor1,
        minor2,
        dump
    } = generationProfile.abilityScoreProfile;

    returnStats[major] = abilityArray.pop()!;
    returnStats[minor1] = abilityArray.pop()!;
    returnStats[minor2] = abilityArray.pop()!;
    returnStats[dump] = abilityArray.shift()!;

    let randomInt = Math.floor(Math.random() * 2);
    returnStats[randomInt === 1 ? remainingAbilities.pop()! : remainingAbilities.shift()!] = abilityArray.pop()!;
    returnStats[remainingAbilities.pop()!] = abilityArray.pop()!;
    return returnStats;
}
