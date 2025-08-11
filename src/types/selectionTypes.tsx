import { AbilityScoreProfile, ClassMod } from "./generationTypes";

//* Generates the the props for a selection menu/
export const makeSelectionProps = <T extends SelectionProfile,>(
    selected: T,
    options: T[],
    setSelected: (p: T) => void,
    headerText: string,
    promptText: string
): SelectionProps<T> => {
    return {
        value: selected.key,
        options: options,
        getKey: (opt: T) => opt.key,
        getSelectionText: (opt: T) => opt.selectionText,
        onChange: (p: T) => setSelected(p),
        headerText: headerText,
        placeholder: {value: options[0], label: promptText}
    } as const
}

//* Defines the props sent to a selection meny/
export type SelectionProps<T extends SelectionProfile> = {
    value: string;
    options: T[];
    getKey: (opt: T) => string;
    getSelectionText: (opt: T) => string;
    onChange: (opt: T) => void;
    headerText: string;
    placeholder: {value: T, label: string};
}

/** Defines the base information needed for a selection menu profile */
export type SelectionProfile = {
    key: string;
    selectionText: string
}

/** Defines all information needed to a apply a class to a generation */
export type ClassProfile = SelectionProfile & {
    abilityProfile: AbilityScoreProfile;
    classMod: ClassMod;
}

/**Defines all the information needed to apply a CR to a generation */
export type CRProfile = SelectionProfile & {
    cr: number;
}
