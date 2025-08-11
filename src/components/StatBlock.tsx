import { NPCStats, NPCStatBlockStats, NPCAbilityScores, Skill } from "../types/npcTypes"
import { calcAbilityMod, calcSkillMod, getCRString} from "../utils/statUtils";
import { CR_TO_XP } from "../data/crData";
import { BasicAttackEntry, MultiAttackEntry } from "./Entries";
import { modSign } from "@/utils/stringUtils";

type StatBlockHeaderProps = {
    name : string,
    size: string,
    creatType: string,
    allignment: string
}
function StatBlockHeader({name, size, creatType, allignment} : StatBlockHeaderProps) {
    return (
        <div className="leading-tight">
            <div className="statblock-header-name">{name}</div>
            <div className="text-gray-500 mb-4 mt-1 italic">{size} {creatType}, {allignment}</div>
        </div>
    )
}

const StatBlockAttribute = ({attrLabel, attrValue}:{attrLabel: string, attrValue: string}) => {
    return (
        <div className="text-statblock-brown ml-1 leading-tight">
            <span className="font-bold">{attrLabel} </span>
            <span>{attrValue}</span>
        </div>
    )
};

const StatBlockAttributeACInit = ({ac, init}: {ac: string, init: number}) => {

    const initSign: string = modSign(init);
    const initString: string = `${initSign}${init} (${10 + init})`;

    return (
        <div className="flex ">
            <StatBlockAttribute attrLabel="AC" attrValue={ac}/>{"\u00A0\u00A0\u00A0\u00A0"}
            <StatBlockAttribute attrLabel="Initiative" attrValue={initString}/>
        </div>
    )
}

const StatBlockAttributes = ({ac, hp, dexMod}: {ac: number, hp: number, dexMod: number}) => {

    return (
        <div>
            <StatBlockAttributeACInit ac={`${ac}`} init={dexMod}/>
            <StatBlockAttribute attrLabel="HP" attrValue={`${hp}`}/>
            <StatBlockAttribute attrLabel="Speed" attrValue="30 ft."/>
        </div>
    )
};


type StatTableRowProps = {
    type: string,
    statName: string,
    statValue: number,
    statProf: boolean,
    profBonus: number
}
const StatTableRow = ({type, statName, statValue, statProf, profBonus}: StatTableRowProps) => {

    const statMod = calcAbilityMod(statValue)
    const statModSign = modSign(statMod);
    const saveMod = statMod + (statProf ? profBonus : 0);
    const saveModSign = modSign(saveMod);
    return (
        <tr>
            <th className={`statblock-stat-table-${type}-val p-0 border-0`}>{statName}</th>
            <td className={`statblock-stat-table-${type}-val px-2 py-0.5 border-0 allign-top`}>{statValue}</td>
            <td className={`statblock-stat-table-${type}-mod px-2 py-0.5 border-0 allign-top`}>{statModSign}{statMod}</td>
            <td className={`statblock-stat-table-${type}-mod px-2 py-0.5 border-0 allign-top`}>{saveModSign}{saveMod}</td>
        </tr>
    )
}

type StatTableProps = {
    type: string;
    stats: {
        stat1: number;
        stat2: number;
        stat3: number;
    };
    saveProf: string[];
    prof: number
}

const StatTable = ({type, stats, saveProf, prof}: StatTableProps) => {

    const statConfig = type === "phy" ?
        [
            { name: 'STR', value: stats.stat1 },
            { name: 'DEX', value: stats.stat2 },
            { name: 'CON', value: stats.stat3 },
        ] :
        [
            { name: 'INT', value: stats.stat1 },
            { name: 'WIS', value: stats.stat2 },
            { name: 'CHA', value: stats.stat3 },
        ];

    const rowProps = statConfig.map(stat => ({
        type,
        statName: stat.name,
        statValue: stat.value,
        statProf: saveProf.includes(stat.name),
        profBonus: prof
    }));

    return (
        <table className="statblock-stat-table flex-1 w-auto diborder-0 mb-2 border-collapse border-spacing-0 indent-0">
            <thead className="border-0">
                <tr className="border-0">
                    <th></th>
                    <th></th>
                    <th>Mod</th>
                    <th>Save</th>
                </tr>
            </thead>
            <tbody className="border-0">
                {rowProps.map(props => (
                    <StatTableRow
                        key={props.statName}
                        {...props}/>
                ))}
            </tbody>
        </table>
    )
}

const StatBlockStats = ({statBlock, prof}: {statBlock: NPCStatBlockStats, prof: number}) => {
    const {
        abilityScores,
        saveProf
    } = statBlock

    const physicalStats = {
        stat1: abilityScores.STR,
        stat2: abilityScores.DEX,
        stat3: abilityScores.CON
    };

    const mentalStats = {
        stat1: abilityScores.INT,
        stat2: abilityScores.WIS,
        stat3: abilityScores.CHA
    }
    return (
        <div className="flex flex-nowrap gap-2.5">
            <StatTable type="phy" stats={physicalStats} saveProf={saveProf} prof={prof}/>
            <StatTable type="men" stats={mentalStats} saveProf={saveProf} prof={prof}/>
        </div>
    )
}


const StatBlockTidbit = ({label, tidbitText}: {label: string, tidbitText: string}) => {
    return (
        <div className="text-statblock-brown">
            <span className="font-bold">{label} </span>
            <span>{tidbitText}</span>
        </div>
    );
};

const StatBlockTiditContainer = ({cr, profBonus}: {cr: number, profBonus: number}) => {

    const crString: string = getCRString(cr);
    const xp: number = CR_TO_XP[cr];
    return (
        <div className="flex">
            <StatBlockTidbit label="CR" tidbitText={`${crString} (XP ${xp}; PB +${profBonus})`}/>
        </div>
    )
};

type StatBlockTidbitsType = {
    abilityScores: NPCAbilityScores,
    skills: Skill[],
    cr: number,
    profBonus: number
}

//** Tidbits refer to data below Ability Score block
// ie: Skills, senses, languages, and CR information */
function StatBlockTidbits({abilityScores, skills, cr, profBonus}: StatBlockTidbitsType) {

    const passivePerception = 10 +
    calcAbilityMod(abilityScores.WIS) +
    (skills.includes("Perception") ? profBonus : 0);

    const skillsToDisplay: string[] = [];
    skills.forEach((skill) => {
        const skillMod: number = calcSkillMod(abilityScores, skill, profBonus, true, false)

        // There should basically never be a reason for this to be negative,
        // but its technically possible
        const sign: string = modSign(skillMod)
        skillsToDisplay.push(`${skill.replaceAll('_', ' ')} ${sign}${skillMod}`)
    });

    const skillString: string = skillsToDisplay.join(", ");
    return (
        <div>
            <StatBlockTidbit label="Skills" tidbitText={skillString}/>
            <StatBlockTidbit label="Senses" tidbitText={`Passive Perception ${passivePerception}`}/>
            <StatBlockTidbit label="Languages" tidbitText="Common"/>
            <StatBlockTiditContainer cr={cr} profBonus={profBonus}/>
        </div>
    )
}

const StatBlockDescriptionBlock = ({blockTitle, entries}: {blockTitle: string, entries: React.ReactNode}) => {
    return (
        <div>
            <div className="statblock-desc-block-header">
                {blockTitle}
            </div>
            <div>
                {entries}
            </div>
        </div>
    )
}

const ActionBlock = ({actions, dpr, atk, cr}: {actions: string[], dpr: number, atk: number, cr: number}) => {
    const entries: React.ReactNode[] = [];
    entries.push(<MultiAttackEntry key="Multiattack" cr={cr} />)
    entries.push(<BasicAttackEntry key="Melee" dpr={dpr} atk={atk} cr={cr} atkType="Melee" />)
    entries.push(<BasicAttackEntry key="Ranged" dpr={dpr} atk={atk} cr={cr} atkType="Ranged" />)

    /**Placeholder while we work to implement actions */
    actions.forEach((action) => {
        entries.push(<BasicAttackEntry key={action} dpr={dpr} atk={atk} cr={cr} atkType="Melee" />)
    })
    /**TODO: Parse actions */
    return (
        <StatBlockDescriptionBlock blockTitle="Actions" entries={entries}/>
    )
};

type DescriptionBlockDataType = {
    traits: string[];
    actions: string[];
    bonusActions: string[];
    reactions: string[];
    dpr: number;
    atk: number;
    cr: number;
}
const StatBlockDescriptionBlocks = ({traits, actions, bonusActions, reactions, dpr, atk, cr}: DescriptionBlockDataType) => {

    return (
        <div className="mt5">
            {traits.length > 0 ? <StatBlockDescriptionBlock blockTitle="Traits" entries={[]}/> : null}
            <ActionBlock actions={actions} dpr={dpr} atk={atk} cr={cr}/>
            {bonusActions.length > 0 ? <StatBlockDescriptionBlock blockTitle="Bonus Actions" entries={[]}/> : null }
            {reactions.length > 0 ? <StatBlockDescriptionBlock blockTitle="Reactions" entries={[]}/> : null}
        </div>
    )
}

export default function StatBlock({npcStats}: {npcStats: NPCStats}) {
    const {
        name,
        coreStats,
        statBlock,
        skills,
        traits,
        actions,
        bonusActions,
        reactions
    } = npcStats;


    const abilityScores = statBlock.abilityScores;
    const {
        cr,
        ac,
        hp,
        atk,
        dpr,
        prof
    } = coreStats;

    // Need for initiative
    const dexMod = calcAbilityMod(statBlock.abilityScores.DEX);
    return (
        <div className="statblock @md:columns-2 bg-[url('/paper-texture.png')] bg-cover">
            <StatBlockHeader name={name} size="Medium" creatType="Humanoid" allignment="Neutral"/>
            <StatBlockAttributes ac={ac} hp={hp} dexMod={dexMod}/>
            <StatBlockStats statBlock={statBlock} prof={prof}/>
            <StatBlockTidbits abilityScores={abilityScores} skills={skills} cr={cr} profBonus={prof}/>
            <StatBlockDescriptionBlocks traits={traits} actions={actions} bonusActions={bonusActions} reactions={reactions} cr={cr} dpr={dpr} atk={atk}/>
        </div>
    );
}
