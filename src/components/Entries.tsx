import { CR_TO_MULTIATTACK } from "../constants/crData";
import { ToWords } from 'to-words';
import { AtkRoll } from "../types/npcTypes"
import { calcAtkRoll } from "../app/utils/statUtils";

const StatBlockBasicEntry = ({keyword, keywordText}: {keyword: string, keywordText: string}) => {
    return (
        <p className="mb-2.5 ">
            <em><strong>{keyword}. </strong></em>
            {keywordText}
        </p>
    )
}

export const MultiAttackEntry = ({cr}: {cr: number}) => {
    let numMultiAttacks = CR_TO_MULTIATTACK[cr];
    const toWords = new ToWords()
    let numMultiAttackStr = toWords.convert(numMultiAttacks).toLowerCase()

    let keywordText = `The creature makes ${numMultiAttackStr} attacks, using Melee or Ranged in any combination.`;
    return (
        <div>
            {numMultiAttacks > 1 ? <StatBlockBasicEntry keyword="Multiattack." keywordText={keywordText}/> : null}
        </div>
    )
};

export const BasicAttackEntry = ({dpr, atk, cr, atkType} : {dpr: number, atk: number, cr: number, atkType: string}) => {
    var numMultiAttacks: number = CR_TO_MULTIATTACK[cr];
    /** For simplicity, we'll just always have them roll a d6 */
    var attackRoll: AtkRoll = calcAtkRoll(dpr, atk, numMultiAttacks, 6);

    var subtitle = `${atkType} Attack Roll: `;
    var range = `${atkType === 'Melee' ? 'reach 5ft. ' : 'range 30/120 ft '}`;
    var damage = `Hit: ${attackRoll.averageDamage} (${attackRoll.numDice}d${attackRoll.diceType})+${attackRoll.damageBonus} damage`;

    var fullText = `${subtitle}${range}${damage}`
    return (
        <StatBlockBasicEntry keyword={atkType} keywordText={fullText}/>
    )
};
