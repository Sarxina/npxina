// Credit: Blog of Holding
// https://www.blogofholding.com/?p=8593

import { CoreStats } from "@/types/npcTypes";

const low_crs: Record<number, CoreStats> = {
    0: {
        cr: 0,
        ac: 13,
        hp: 3,
        atk: 2,
        dpr: 1,
        dc: 9,
        prof: 2
    },
    0.125: {
        cr: 0.125,
        ac: 13,
        hp: 9,
        atk: 3,
        dpr: 3,
        dc: 10,
        prof: 2
    },
    0.25: {
        cr: 0.25,
        ac: 13,
        hp: 15,
        atk: 3,
        dpr: 6,
        dc: 10,
        prof: 2
    },
    0.5: {
        cr: 0.5,
        ac: 14,
        hp: 24,
        atk: 4,
        dpr: 9,
        dc: 11,
        prof: 2
    },
    1: {
        cr: 1,
        ac: 14,
        hp: 30 ,
        atk: 4,
        dpr: 12,
        dc: 11,
        prof: 2
    }
}

function calculateRegular(cr: number): CoreStats {
    return {
        cr: cr,
        ac: 14 + (0.3 * cr),
        hp: 15 + (15 * cr),
        atk: 4 + (0.5 * cr),
        dpr: 6 + (6 * cr),
        dc: 11 + (9.5 * cr),
        prof: cr <=4 ? 2 : 3 + Math.ceil((cr - 5) / 4)
    }
};
export const calculateStats = (cr: number): CoreStats => {
    if (cr < 2) return low_crs[cr];
    var stats = calculateRegular(cr);
    if (cr > 20) stats.hp += (35 * stats.cr) - 700;
    return stats
};
