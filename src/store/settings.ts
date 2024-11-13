import { create } from "zustand";
import { persist } from "zustand/middleware";
import { name as appName } from "../../package.json";

interface SettingsStore {
  directionAndSpeedControllerWidth: number; //controller width
  setDirectionAndSpeedControllerWidth: (
    directionAndSpeedControllerWidth: number
  ) => void;
  directionAndSpeedControllerHeight: number; //same height
  setDirectionAndSpeedControllerHeight: (
    directionAndSpeedControllerHeight: number
  ) => void;
  directionAndSpeedControllerOverflowZone: number; // percent of overflow controller from zone
  setDirectionAndSpeedControllerOverflowZone: (
    directionAndSpeedControllerOverflowZone: number
  ) => void;
  directionAndSpeedControllerNoSensetiveZone: number; //percent of controller size for no sensetive zone
  setDirectionAndSpeedControllerNoSensetiveZone: (
    directionAndSpeedControllerNoSensetiveZone: number
  ) => void;
  directionAndSpeedControllerAreaPercent: number; //  percent from screen width what area placed
  setDirectionAndSpeedControllerAreaPercent: (
    directionAndSpeedControllerAreaPercent: number
  ) => void;

  heroWidth: number;
  setHeroWidth: (heroWidth: number) => void;
  heroHeight: number;
  setHeroHeight: (heroHeight: number) => void;

  wheelOfAbilityWidth: number;
  setWheelOfAbilityWidth: (wheelOfAbilityWidth: number) => void;
  wheelOfAbilityHeight: number;
  setWheelOfAbilityHeight: (wheelOfAbilityHeight: number) => void;
  wheelOfAbilityOverflowZone: number;
  setWheelOfAbilityOverflowZone: (wheelOfAbilityOverflowZone: number) => void;
  wheelOfAbilityNoSensetiveZone: number;
  setWheelOfAbilityNoSensetiveZone: (
    wheelOfAbilityNoSensetiveZone: number
  ) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => {
      return {
        directionAndSpeedControllerWidth: 48,
        setDirectionAndSpeedControllerWidth: (
          directionAndSpeedControllerWidth
        ) => set({ directionAndSpeedControllerWidth }),
        directionAndSpeedControllerHeight: 48,
        setDirectionAndSpeedControllerHeight: (
          directionAndSpeedControllerHeight
        ) => set({ directionAndSpeedControllerHeight }),
        directionAndSpeedControllerOverflowZone: 15,
        setDirectionAndSpeedControllerOverflowZone: (
          directionAndSpeedControllerOverflowZone
        ) => set({ directionAndSpeedControllerOverflowZone }),
        directionAndSpeedControllerNoSensetiveZone: 30,
        setDirectionAndSpeedControllerNoSensetiveZone: (
          directionAndSpeedControllerNoSensetiveZone
        ) => set({ directionAndSpeedControllerNoSensetiveZone }),
        directionAndSpeedControllerAreaPercent: 40,
        setDirectionAndSpeedControllerAreaPercent: (
          directionAndSpeedControllerAreaPercent
        ) => set({ directionAndSpeedControllerAreaPercent }),

        heroWidth: 48,
        setHeroWidth: (heroWidth) => set({ heroWidth }),
        heroHeight: 96,
        setHeroHeight: (heroHeight) => set({ heroHeight }),

        wheelOfAbilityWidth: Math.round(window.innerWidth * 0.2),
        setWheelOfAbilityWidth: (wheelOfAbilityWidth) =>
          set({ wheelOfAbilityWidth }),
        wheelOfAbilityHeight: Math.round(window.innerWidth * 0.2),
        setWheelOfAbilityHeight: (wheelOfAbilityHeight) =>
          set({ wheelOfAbilityHeight }),
        wheelOfAbilityOverflowZone: 50,
        setWheelOfAbilityOverflowZone: (wheelOfAbilityOverflowZone) =>
          set({ wheelOfAbilityOverflowZone }),
        wheelOfAbilityNoSensetiveZone: 20,
        setWheelOfAbilityNoSensetiveZone: (wheelOfAbilityNoSensetiveZone) =>
          set({ wheelOfAbilityNoSensetiveZone }),
      };
    },
    {
      name: `${appName}-game-settings`,
      version: 1,
    }
  )
);
