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
        dump: 'INT'
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

export const trickster: ClassProfile = {
    key: "trickster",
    selectionText: "a duplicitous trickster",
    classMod: {
        coreStatMods: {
            ac: -1,
            hp: 0,
            atk: 0,
            dpr: 0,
            dc: 1,
        },
        actionMods: []
    },
    abilityProfile: {
        major: 'CHA',
        minor1: 'DEX',
        minor2: 'CON',
        dump: 'STR'
    }
}

export const dualist: ClassProfile = {
    key: "dualist",
    selectionText: "a adept dualist",
    classMod: {
        coreStatMods: {
            ac: 0,
            hp: -1,
            atk: 1,
            dpr: 0,
            dc: 0,
        },
        actionMods: []
    },
    abilityProfile: {
        major: 'STR',
        minor1: 'DEX',
        minor2: 'WIS',
        dump: 'CHA'
    }
}

export const priest: ClassProfile = {
    key: "priest",
    selectionText: "a pious priest",
    classMod: {
        coreStatMods: {
            ac: 0,
            hp: 0,
            atk: 0,
            dpr: 0,
            dc: 0,
        },
        actionMods: []
    },
    abilityProfile: {
        major: 'WIS',
        minor1: 'CON',
        minor2: 'INT',
        dump: 'STR'
    }
}

export const mage: ClassProfile = {
    key: "mage",
    selectionText: "a learned spellcaster",
    classMod: {
        coreStatMods: {
            ac: -1,
            hp: 0,
            atk: 0,
            dpr: 0,
            dc: 1,
        },
        actionMods: []
    },
    abilityProfile: {
        major: 'INT',
        minor1: 'CON',
        minor2: 'WIS',
        dump: 'STR'
    }
}

export const classProfiles: ClassProfile[] = [
    warrior,
    archer,
    rogue,
    trickster,
    dualist,
    priest,
    mage
]
