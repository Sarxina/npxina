import { ClassProfile } from "@/types/generationTypes";

export const warrior: ClassProfile = {
    key: "warrior",
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
