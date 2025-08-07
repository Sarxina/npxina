"use client"
import { useState } from "react"
import StatBlock from "../components/StatBlock";
import { classProfiles, warrior } from "@/data/classData";
import { useGeneratedNPC } from "@/hooks/useGeneratedNPC";
import { useGenerateASArray } from "@/hooks/useGenerateASArray";
import { useGenerateSkills } from "@/hooks/useGenerateSkills";

export default function Home() {
  const [selectedCR, setSelectedCR] = useState(0)
  const [selectedClass, setSelectedClass] = useState(warrior)
  const generatedSkills = useGenerateSkills();
  const generatedASArray = useGenerateASArray();
  const generatedNPC = useGeneratedNPC(
    selectedCR,
    selectedClass,
    generatedASArray,
    generatedSkills
  )

  //** Because we memoize the generated NPC server side, we have to
  // do any random rolls client side with useEffect hooks
  // otherwise we break hydration*/

  return (
    <div className="max-w-4xl mx-auto p-8">
      <main className="space-y-12">
        {/* Header*/}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-black text-pal-federal-blue tracking-tight">NPX<span className="text-pal-honolulu-blue">ina</span></h1>
          <p className="text-xl text-pal-marian-blue font-medium">D&D 2024 NPC Generator</p>
        </div>

        {/* Controls */}
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/50 ring-1 ring-pal-non-photo-blue/20">
          <div className="space-y-6">
            <div className="space-y-2">
              {/* CR Selector */}
              <select
                value={selectedCR}
                onChange={(e) => setSelectedCR(Number(e.target.value))}
                className="w-full p-4 text-lg border-2 border-pal-non-photo-blue-2 rounded-xl bg-white text-pal-federal-blue focus:border-pal-honolulu-blue focus:ring-4 focus:ring-pal-honolulu-blue/20 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <option value={0}>My NPC is about as strong as...</option>
                <option value={0}>An untrained, everyperson</option>
                <option value={0.125}>Someone with basic training, a grunt</option>
                <option value={2}>Someone with a few years until their belt</option>
                <option value={3}>A veteran, someone whose seen a real battle or two</option>
                <option value={4}>The captain of the guard, or boss of a gang</option>
                <option value={6}>A mage, or feared pirate captain</option>
                <option value={8}>An infamous assassin or a faction&#39;s most skilled</option>
                <option value={10}>An army&#39;s commander or a cult&#39;s leader</option>
                <option value={12}>An archmage, or hero of the realm</option>
              </select>
            </div>
            {/* Class Selector */}
            <div className="space-y-2">
              <select
                className="w-full p-4 text-lg border-2 border-pal-non-photo-blue-2 rounded-xl bg-white text-pal-federal-blue focus:border-pal-honolulu-blue focus:ring-4 focus:ring-pal-honolulu-blue/20 transition-all duration-200 shadow-sm hover:shadow-md"
                value={selectedClass.key}
                onChange={(e) => {
                  const key = e.target.value;
                  const profile = classProfiles.find(p => p.key === key)!;
                  setSelectedClass(profile);
                }}>
                    <option value="warrior">And they fight like a...</option>
                  {classProfiles.map(p => (
                    <option key={p.key} value={p.key}>
                      {p.selectionText}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        {/* Resultant Statblock */}
        <div className="bg-white/98 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/50 ring-1 ring-pal-non-photo-blue/20">
          <StatBlock npcStats={generatedNPC}/>
        </div>
      </main>
    </div>
  );
}
