import { classProfiles } from "@/data/classData";
import { produceNPC } from "@/lib/produceNPC";
import { ClassProfile, NPCGenerationSelections } from "@/types/generationTypes";
import { NPCStats, Skill } from "@/types/npcTypes";
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
    }, [cr, npcClass, asArray])
}
