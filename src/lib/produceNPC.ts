import { NPCStats, CoreStats, NPCStatBlockStats, NPCAbilityScores } from "@/types/npcTypes";
import { calculateStats } from "./generateBaseStats";
import { generateAbilityScores } from "./generateAbilityScores";
import { NPCGenerationSelections } from "@/types/generationTypes";

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

const defaultNPC: NPCStats = {
  name: "Commoner",
  allignment: "Neutral",
  coreStats: defaultNPCCoreStats,
  statBlock: defaultNPCStats,
  skills: ["History"],
  traits: [],
  actions: [],
  bonusActions: [],
  reactions: []
};

export const produceNPC = (generationSelections: NPCGenerationSelections): NPCStats => {
    var retNPC = defaultNPC;
    retNPC.coreStats = calculateStats(generationSelections.cr);
    retNPC.statBlock.abilityScores = generateAbilityScores()
    return defaultNPC;
};
