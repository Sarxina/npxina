import { NPCStats, CoreStats, NPCStatBlockStats, NPCAbilityScores, Ability } from "@/types/npcTypes";
import { calculateStats } from "./generateBaseStats";
import { generateAbilityScores } from "./generateAbilityScores";
import { AbilityScoreProfile, ClassProfile, CoreBuffNerf, NPCGenerationProfile, NPCGenerationSelections } from "@/types/generationTypes";
import { profile } from "console";
import { stat } from "fs";

export const defaultNPCAbilityScores: NPCAbilityScores = {
  STR: 10,
  DEX: 10,
  CON: 10,
  INT: 10,
  WIS: 10,
  CHA: 10,
}

const defaultNPCStats: NPCStatBlockStats = {
  abilityScores: defaultNPCAbilityScores,
  saveProf: []
}

const defaultNPCCoreStats: CoreStats = {
  cr: 0,
  ac: 10,
  hp: 4,
  atk: 2,
  dpr: 1,
  dc: 9,
  prof: 2
};

const defaultBuffNerf: CoreBuffNerf = {
  ac: 0,
  hp: 0,
  atk: 0,
  dpr: 0,
  dc: 0
};

const defaultNPC: NPCStats = {
  name: "Commoner",
  allignment: "Neutral",
  coreStats: defaultNPCCoreStats,
  statBlock: defaultNPCStats,
  coreModProfle: defaultBuffNerf,
  skills: ["History"],
  traits: [],
  actions: [],
  bonusActions: [],
  reactions: []
};

//** Apply the buffs and nerfs to the stats */
const calcNewStats = (npcStats: CoreStats, buffNerfProfile: CoreBuffNerf) => {
  return {
    cr: npcStats.cr,
    ac: npcStats.ac + (2 * buffNerfProfile.ac),
    hp: npcStats.hp * (1 + (0.1 * buffNerfProfile.hp)),
    atk: npcStats.atk + (2 * buffNerfProfile.atk),
    dpr: npcStats.dpr * (1 + (0.1 * buffNerfProfile.dpr)),
    dc: npcStats.dc + (2 * buffNerfProfile.dc),
    prof: npcStats.prof
  }
};

const getUnmoddedStats = (currentProfile: CoreBuffNerf): string[] => {
  const stats = Object.keys(currentProfile) as (keyof CoreBuffNerf)[];
  var ret: string[] = [];
  stats.forEach(stat => {
    if (currentProfile[stat] === 0) {
      ret.push(stat);
    }
  });
  return ret;
}

const balanceBuffNerfs = (currentProfile: CoreBuffNerf) : CoreBuffNerf => {
  const stats = Object.keys(currentProfile) as (keyof CoreBuffNerf)[];
  var numBuffs = 0;
  var numNerfs = 0;
  stats.forEach(stat => {
    if (currentProfile[stat] > 0) numBuffs++;
    else if (currentProfile[stat] < 0) numNerfs++;
  })

  while (numBuffs >= 2 && numNerfs < numBuffs - 1) {
    // Add a nerf

    let unmoddedStats = getUnmoddedStats(currentProfile);
    let randIdx = Math.floor(Math.random() * unmoddedStats.length);
    var chosenStat = unmoddedStats[randIdx] as keyof CoreBuffNerf;
    currentProfile[chosenStat] = -1;
    numNerfs++;
    // TODO: If there are no remaining unmodded stats, we have to
    // just choose a buff to remove
  }
  while (numNerfs >= 2 && numBuffs < numNerfs - 1) {
    // Add a buff
    let unmoddedStats = getUnmoddedStats(currentProfile);
    let randIdx = Math.floor(Math.random() * unmoddedStats.length);
    var chosenStat = unmoddedStats[randIdx] as keyof CoreBuffNerf;
    currentProfile[chosenStat];
    numBuffs++;

    // TODO: If there are no remaining unmodded stats, we have to
    // just choose a nerf to remove
  }
  return currentProfile;
}


const applyNerfBuff = (currentProfile: CoreBuffNerf, profileToApply: CoreBuffNerf): CoreBuffNerf => {
  const stats = Object.keys(profileToApply) as (keyof CoreBuffNerf)[];
  stats.forEach(stat => {

    /**Core mods should not vary stats by one basis point, so we clamp */
    let newVal = currentProfile[stat] + profileToApply[stat];
    currentProfile[stat] = Math.min(1, Math.max(-1, newVal))
  });
  return currentProfile
}

//**Applys all modifications
// One of the core principles of 5e 2024 balance is we only vary the core stats
// slightly before abilities and traits
// For HP and DPR thats +-10%
// For AC, ATK, and DC, that's +- 2
// We refer to each of these as basis points.
// For this reason class/trait buffs/nerfs do not stack */
const applyMods = (npc: NPCStats, selections: NPCGenerationSelections): NPCStats => {

  var modProfile = npc.coreModProfle;

  // Apply class mods
  modProfile = applyNerfBuff(modProfile, selections.class.classMod.coreStatMods);

  // Balance
  modProfile = balanceBuffNerfs(modProfile);

  // Handle Actions and Traits
  // TODO: Add Actions and trait support

  npc.coreModProfle = modProfile;
  // Calculate new stats
  npc.coreStats = calcNewStats(npc.coreStats, modProfile);
  return npc

}

/**Sets the saving throw proficiencies
 * See https://www.blogofholding.com/?p=8548 for rationale
 * tl;dr: CR 0-4: 0, CR5-8: 1, CR9-11 2, CR 12+ 3
 * For now, we just use the best class ability scores
 */
const applySaveProf = (npc: NPCStats, selections: NPCGenerationSelections): NPCStats => {
  if (selections.cr >= 5) npc.statBlock.saveProf.push(selections.class.abilityProfile.major);
  if (selections.cr >= 9) npc.statBlock.saveProf.push(selections.class.abilityProfile.minor1);
  if (selections.cr >= 12) npc.statBlock.saveProf.push(selections.class.abilityProfile.minor2);
  return npc;
};

export const produceNPC = (generationSelections: NPCGenerationSelections): NPCStats => {
  var retNPC: NPCStats = structuredClone(defaultNPC);
  retNPC.coreStats = calculateStats(generationSelections.cr);
  retNPC = applyMods(retNPC, generationSelections)

  retNPC.statBlock.abilityScores = generateAbilityScores(
    generationSelections.class.abilityProfile,
    generationSelections.asArray,
    generationSelections.cr
  )
  retNPC = applySaveProf(retNPC, generationSelections);
  retNPC.skills = generationSelections.skills;
  return retNPC;
};
