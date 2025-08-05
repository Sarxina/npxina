"use client"
import Image from "next/image";
import { useMemo, useState } from "react"
import StatBlock from "../components/StatBlock";
import { produceNPC } from "@/lib/produceNPC";


export default function Home() {
  const [selectedCR, setSelectedCR] = useState(0)
  const [selectedClass, setSelectedClass] = useState("warrior")

  const generatedNPC = useMemo(() => {
    return produceNPC({selectedCR, selectedClass});
  }, [selectedCR, selectedClass]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* Dropdown Options */}
      <div>
        <select value={selectedCR} onChange={(e) => setSelectedCR(Number(e.target.value))}>
          <option value={0}>My NPC is about as strong as...</option>
          <option value={0}>An untrained, everyperson</option>
          <option value={0.125}>Someone with basic training, a grunt</option>
          <option value={2}>Someone with a few years until their belt</option>
          <option value={3}>A veteran, someone whose seen a real battle or two</option>
          <option value={4}>The captain of the guard, or boss of a gang</option>
          <option value={6}>A mage, or feared pirate captain</option>
          <option value={8}>An infamous assassin or a faction's most skilled</option>
          <option value={10}>An army's commander or a cult's leader</option>
          <option value={12}>An archmage, or hero of the realm</option>
        </select>
      </div>
      <div>
        <select>
          <option>And they fight like a...</option>
          <option>Armored warrior</option>
          <option>Hawkeyed archer</option>
          <option>Dasterdly rogue</option>
          <option>Duplicitous trickster</option>
          <option>Pious priest</option>
          <option>Dark conjurer</option>
          <option>Skilled spellcaster</option>
        </select>
      </div>
        {/* Resultant Statblock */}
      <div>
        <StatBlock npcStats={generatedNPC}/>
      </div>
      </main>
    </div>
  );
}
