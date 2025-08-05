import { Ability } from "./npcTypes"

export type NPCGenerationSelections = {
    cr: number,
    class: string
}

type AbilityScoreProfile = {
    major: Ability,
    minor1: Ability,
    minor2: Ability,
    dump: Ability
}

export type NPCGenerationProfile = {
    cr: number,
    abilityScoreProfile: AbilityScoreProfile
}
