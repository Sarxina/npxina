import { CR_TO_MULTIATTACK } from "../data/crData";
import { ToWords } from 'to-words';
import { AtkRoll } from "../types/npcTypes"
import { calcAtkRoll } from "../utils/statUtils";


const StatBlockEntry = ({keyword, textDOM}: {keyword: string, textDOM: React.ReactNode}) => {
    return (
        <p className="mb-2.5 ">
            <em><strong>{keyword}. </strong></em>
            {textDOM}
        </p>
    )
}
const StatBlockBasicEntry = ({keyword, keywordText}: {keyword: string, keywordText: string}) => {
    return (<StatBlockEntry keyword={keyword} textDOM={keywordText}/>)
}

export const MultiAttackEntry = ({cr}: {cr: number}) => {
    const numMultiAttacks = CR_TO_MULTIATTACK[cr];
    const toWords = new ToWords()
    const numMultiAttackStr = toWords.convert(numMultiAttacks).toLowerCase()

    const keywordText = `The creature makes ${numMultiAttackStr} attacks, using Melee or Ranged in any combination.`;
    return (
        <div>
            {numMultiAttacks > 1 ? <StatBlockBasicEntry keyword="Multiattack." keywordText={keywordText}/> : null}
        </div>
    )
};

export const BasicAttackEntry = ({dpr, atk, cr, atkType} : {dpr: number, atk: number, cr: number, atkType: string}) => {
    const numMultiAttacks: number = CR_TO_MULTIATTACK[cr];
    /** For simplicity, we'll just always have them roll a d6 */
    const attackRoll: AtkRoll = calcAtkRoll(dpr, atk, numMultiAttacks, 6, 8);

    const subtitle = `${atkType} Attack Roll: +${atk}, `;
    const range = `${atkType === 'Melee' ? 'reach 5ft. ' : 'range 30/120 ft '}`;
    const damage = `Hit: ${attackRoll.averageDamage} (${attackRoll.numDice}d${attackRoll.diceType})+${attackRoll.damageBonus} damage`;

    const subTitleNode = <em>{subtitle}</em>
    const fullTextNode = (<>{subTitleNode}{range}{damage}</>)
    return (
        <StatBlockEntry keyword={atkType} textDOM={fullTextNode}/>
    )
};
