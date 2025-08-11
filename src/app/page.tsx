"use client"
import { useState } from "react"
import StatBlock from "../components/StatBlock";
import { classProfiles, warrior } from "@/data/classData";
import { useGeneratedNPC } from "@/hooks/useGeneratedNPC";
import { useGenerateASArray } from "@/hooks/useGenerateASArray";
import { useGenerateSkills } from "@/hooks/useGenerateSkills";
import { crProfiles } from "@/data/crData";
import { SelectionBox } from "@/components/SelectionBlock";

export default function Home() {
  const [selectedCR, setSelectedCR] = useState(crProfiles[0])
  const [selectedClass, setSelectedClass] = useState(warrior)
  const generatedSkills = useGenerateSkills();
  const generatedASArray = useGenerateASArray();
  const generatedNPC = useGeneratedNPC(
    selectedCR.cr,
    selectedClass,
    generatedASArray,
    generatedSkills
  )

  //** Because we memoize the generated NPC server side, we have to
  // do any random rolls client side with useEffect hooks
  // otherwise we break hydration*/

  return (
    <div className="max-w-3x1 mx-auto p-6 dm:p-8">
      <main className="space-y-12">
        {/* Header*/}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-black text-pal-federal-blue tracking-tight">NPX<span className="text-pal-honolulu-blue">ina</span></h1>
          <p className="text-xl text-pal-marian-blue font-medium">D&D 2024 NPC Generator</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[auto_auto] md:justify-center md:items-start md:gap-12">
          {/* Controls */}
          <SelectionBox
            selectedCR={selectedCR}
            crProfiles={crProfiles}
            setSelectedCR={setSelectedCR}
            selectedClass={selectedClass}
            classProfiles={classProfiles}
            setSelectedClass={setSelectedClass}
          />
          {/* Resultant Statblock */}
          <div className="w-max bg-backgrounds1 rounded-2xl shadow-sm p-6 border ring-1 ring-borders1/70 ring-offset-2 ring-offset-backgrounds1">
          <StatBlock npcStats={generatedNPC}/>
        </div>
        </div>
      </main>
    </div>
  );
}
