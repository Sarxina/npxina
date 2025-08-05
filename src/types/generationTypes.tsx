import { Ability, DescBlockType, NPCStats } from "./npcTypes"

/**Represents the top-3, and lowest ability score of a class */
export type AbilityScoreProfile = {
    major: Ability;
    minor1: Ability;
    minor2: Ability;
    dump: Ability
}

/**Represents a buff or nerf to core stats
 * Numbers represent one "basis point"
 * For AC, DC, and ATK thats 2
 * For HP and DPR thats 10%
 */
export type CoreBuffNerf = {
    ac: number;
    hp: number;
    atk: number;
    dpr: number;
    dc: number;
}
/** An action mod adds a new trait or action to the monster
 * compensating by nerfing a core stat
 * These are calculated after core buffs and nerfs
 */
export type ActionMod = {
    // Which type of action
    type: DescBlockType;
    // The action's keyword
    keyword: string;
    // The balancing modification the ability performs
    mod: CoreBuffNerf;
    // Callback function for generating the action's text
    generateText: (npcStats: NPCStats) => string;
}

export type ClassMod = {
    coreStatMods: CoreBuffNerf;
    actionMods: ActionMod[];
}

/** Defines all information needed to a apply a class to a generation */
export type ClassProfile = {
    key: string;
    abilityProfile: AbilityScoreProfile;
    classMod: ClassMod
}

export type NPCGenerationSelections = {
    cr: number;
    class: ClassProfile;
}


export type NPCGenerationProfile = {
    cr: number;
    abilityScoreProfile: AbilityScoreProfile
}

