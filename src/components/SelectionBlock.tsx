import { ClassProfile, CRProfile, makeSelectionProps } from "@/types/selectionTypes"
import { SelectionMenu } from "./SelectionMenu"


interface SelectionBoxProps {
    selectedCR: CRProfile;
    crProfiles: CRProfile[];
    setSelectedCR: (p: CRProfile) => void;
    selectedClass: ClassProfile;
    classProfiles: ClassProfile[];
    setSelectedClass: (p: ClassProfile) => void;
}
export const SelectionBox = ({
    selectedCR,
    crProfiles,
    setSelectedCR,
    selectedClass,
    classProfiles,
    setSelectedClass
}: SelectionBoxProps) => {
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-300 overflow-hidden font-roboto">
          <div className="px-6 py-4 border-b-2 border-amber-600 bg-gradient-to-r from-amber-100 to-amber-50 text-xl font-bold text-gray-800 tracking-wide">
            <h1>My NPC...</h1>
          </div>
          <div className="space-y-4">
            {/* CR Selector */}
            <SelectionMenu {...makeSelectionProps<CRProfile>(
              selectedCR,
              crProfiles,
              setSelectedCR,
              "Power Level",
              "They are about as strong as...",
            )}>

            </SelectionMenu>
            {/* Class Selector */}
            <SelectionMenu {...makeSelectionProps<ClassProfile>(
              selectedClass,
              classProfiles,
              setSelectedClass,
              "Combat Style",
              "They fight like a...",
              )}/>
          </div>
        </div>
    )
}
