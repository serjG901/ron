import { create } from "zustand";
import { persist } from "zustand/middleware";
import { name as appName } from "../../package.json";

interface GameStore {
  moveAngle: number;
  setMoveAngle: (moveAngle: number) => void;
  moveSpeed: number;
  setMoveSpeed: (moveSpeed: number) => void;
  wheelAbilityAngle: number;
  setWheelAbilityAngle: (wheelAbilityAngle: number) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => {
      return {
        moveAngle: 0,
        setMoveAngle: (moveAngle) => set({ moveAngle }),
        moveSpeed: 0,
        setMoveSpeed: (moveSpeed) => set({ moveSpeed }),
        wheelAbilityAngle: 0,
        setWheelAbilityAngle: (wheelAbilityAngle) => set({ wheelAbilityAngle }),
      };
    },
    {
      name: `${appName}-game-store`,
      version: 1,
    }
  )
);
