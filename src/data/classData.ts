import { ClassProfile } from "@/types/generationTypes";


export const warrior: ClassProfile = {
    key: "warrior",
    selectionText: "armored warrior",
    classMod: {
        coreStatMods: {
            ac: 1,
            hp: 0,
            atk: 0,
            dpr: -1,
            dc: 0,
        },
        actionMods: []
    },
    abilityProfile: {
        major: 'STR',
        minor1: 'CON',
        minor2: 'WIS',
        dump: 'DEX'
    }
}

export const archer: ClassProfile = {
    key: "archer",
    selectionText: "nimble archer",
    classMod: {
        coreStatMods: {
            ac: -1,
            hp: 0,
            atk: 1,
            dpr: 0,
            dc: 0,
        },
        actionMods: []
    },
    abilityProfile: {
        major: 'DEX',
        minor1: 'WIS',
        minor2: 'CON',
        dump: 'CHA'
    }
}

export const rogue: ClassProfile = {
    key: "rogue",
    selectionText: "a skulking rogue",
    classMod: {
        coreStatMods: {
            ac: 0,
            hp: 0,
            atk: 1,
            dpr: -1,
            dc: 0,
        },
        actionMods: []
    },
    abilityProfile: {
        major: 'DEX',
        minor1: 'CHA',
        minor2: 'CON',
        dump: 'WIS'
    }
}

export const classProfiles: ClassProfile[] = [
    warrior,
    archer,
    rogue
]
