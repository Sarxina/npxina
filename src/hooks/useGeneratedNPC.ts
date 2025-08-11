import { produceNPC } from "@/lib/produceNPC";
import { NPCGenerationSelections } from "@/types/generationTypes";
import { NPCStats, Skill } from "@/types/npcTypes";
import { ClassProfile } from "@/types/selectionTypes";
import { useMemo } from "react";

export const useGeneratedNPC = (
    cr: number,
    npcClass: ClassProfile,
    asArray: number[],
    skills: Skill[],
): NPCStats => {
    return useMemo(() => {
        const selections: NPCGenerationSelections = {
            cr,
            class: npcClass,
            asArray: asArray,
            skills: skills
        };
        return produceNPC(selections)
    }, [cr, npcClass, asArray, skills])
}
