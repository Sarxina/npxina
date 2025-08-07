import { useEffect, useState } from "react"

const rollAbilityScore = (): number => {
    const rolls = Array.from({length: 4}, () => Math.floor(Math.random() * 6) + 1);
    rolls.sort((a, b) => b - a);
    return rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0);
};

export const useGenerateASArray = (): number[] => {
    const [generatedASArray, setGeneratedAS] = useState<number[]>([12, 12, 12, 12, 12, 12]);
    useEffect(() => {
        const array =  Array.from({length: 6}, () => rollAbilityScore());
        setGeneratedAS(array);
    }, [])
    return generatedASArray;
}
