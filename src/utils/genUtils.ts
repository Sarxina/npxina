import { Skill } from "@/types/npcTypes";

const skillOptions = [
    'Athletics',
    'Acrobatics',
    'Slight_of_Hand',
    'Stealth',
    'Arcana',
    'History',
    'Investigation',
    'Nature',
    'Religion',
    'Animal_Handling',
    'Insight',
    'Medicine',
    'Perception',
    'Survival',
    'Deception',
    'Intimidation',
    'Performance',
    'Persuasion'
]

export const genRandomSkills = (nSkills: number = 3): Skill[] => {
    const shuffled = skillOptions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, nSkills) as Skill[];
}
