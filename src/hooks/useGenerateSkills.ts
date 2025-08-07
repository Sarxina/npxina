import { Skill } from "@/types/npcTypes"
import { genRandomSkills } from "@/utils/genUtils";
import { useEffect, useState } from "react"

//** Hook for random skills generation
// Temporary until we implement actual traits and personaltiy
// traits for skills selection */
export const useGenerateSkills = (): Skill[] => {
    const [skillsArray, setSkillsArray] = useState<Skill[]>(['Acrobatics', 'Animal_Handling', 'Arcana']);
    useEffect(() => {
        const generated = genRandomSkills();
        setSkillsArray(generated);
    }, []);
    return skillsArray;
}
