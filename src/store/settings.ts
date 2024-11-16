import { create } from "zustand";
import { persist } from "zustand/middleware";
import { name as appName } from "../../package.json";

interface SettingsStore {
  deviceWidth: number;
  setDeviceWidth: (deviceWidth: number) => void;
  deviceHeight: number;
  setDeviceHeight: (deviceHeight: number) => void;

  directionAndSpeedControllerWidthPercent: number; //controller width
  setDirectionAndSpeedControllerWidthPercent: (
    directionAndSpeedControllerWidthPercent: number
  ) => void;
  directionAndSpeedControllerHeightPercent: number; //same height
  setDirectionAndSpeedControllerHeightPercent: (
    directionAndSpeedControllerHeightPercent: number
  ) => void;
  directionAndSpeedControllerOverflowZonePercent: number; // percent of overflow controller from zone
  setDirectionAndSpeedControllerOverflowZonePercent: (
    directionAndSpeedControllerOverflowZonePercent: number
  ) => void;
  directionAndSpeedControllerNoSensetiveZonePercent: number; //percent of controller size for no sensetive zone
  setDirectionAndSpeedControllerNoSensetiveZonePercent: (
    directionAndSpeedControllerNoSensetiveZonePercent: number
  ) => void;
  directionAndSpeedControllerAreaPercent: number; //  percent from screen width what area placed
  setDirectionAndSpeedControllerAreaPercent: (
    directionAndSpeedControllerAreaPercent: number
  ) => void;

  heroWidth: number;
  setHeroWidth: (heroWidth: number) => void;
  heroHeight: number;
  setHeroHeight: (heroHeight: number) => void;

  wheelOfAbilityWidthPercent: number;
  setWheelOfAbilityWidthPercent: (wheelOfAbilityWidthPercent: number) => void;
  wheelOfAbilityHeightPercent: number;
  setWheelOfAbilityHeightPercent: (wheelOfAbilityHeightPercent: number) => void;
  wheelOfAbilityOverflowZonePercent: number;
  setWheelOfAbilityOverflowZonePercent: (
    wheelOfAbilityOverflowZonePercent: number
  ) => void;
  wheelOfAbilityNoSensetiveZonePercent: number;
  setWheelOfAbilityNoSensetiveZonePercent: (
    wheelOfAbilityNoSensetiveZonePercent: number
  ) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => {
      return {
        deviceWidth: 0,
        setDeviceWidth: (deviceWidth) => set({ deviceWidth }),
        deviceHeight: 0,
        setDeviceHeight: (deviceHeight) => set({ deviceHeight }),

        directionAndSpeedControllerWidthPercent: 20,
        setDirectionAndSpeedControllerWidthPercent: (
          directionAndSpeedControllerWidthPercent
        ) => set({ directionAndSpeedControllerWidthPercent }),
        directionAndSpeedControllerHeightPercent: 20,
        setDirectionAndSpeedControllerHeightPercent: (
          directionAndSpeedControllerHeightPercent
        ) => set({ directionAndSpeedControllerHeightPercent }),
        directionAndSpeedControllerOverflowZonePercent: 15,
        setDirectionAndSpeedControllerOverflowZonePercent: (
          directionAndSpeedControllerOverflowZonePercent
        ) => set({ directionAndSpeedControllerOverflowZonePercent }),
        directionAndSpeedControllerNoSensetiveZonePercent: 30,
        setDirectionAndSpeedControllerNoSensetiveZonePercent: (
          directionAndSpeedControllerNoSensetiveZonePercent
        ) => set({ directionAndSpeedControllerNoSensetiveZonePercent }),
        directionAndSpeedControllerAreaPercent: 40,
        setDirectionAndSpeedControllerAreaPercent: (
          directionAndSpeedControllerAreaPercent
        ) => set({ directionAndSpeedControllerAreaPercent }),

        heroWidth: 48,
        setHeroWidth: (heroWidth) => set({ heroWidth }),
        heroHeight: 96,
        setHeroHeight: (heroHeight) => set({ heroHeight }),

        wheelOfAbilityWidthPercent: 40,
        setWheelOfAbilityWidthPercent: (wheelOfAbilityWidthPercent) =>
          set({ wheelOfAbilityWidthPercent }),
        wheelOfAbilityHeightPercent: 40,
        setWheelOfAbilityHeightPercent: (wheelOfAbilityHeightPercent) =>
          set({ wheelOfAbilityHeightPercent }),
        wheelOfAbilityOverflowZonePercent: 50,
        setWheelOfAbilityOverflowZonePercent: (
          wheelOfAbilityOverflowZonePercent
        ) => set({ wheelOfAbilityOverflowZonePercent }),
        wheelOfAbilityNoSensetiveZonePercent: 20,
        setWheelOfAbilityNoSensetiveZonePercent: (
          wheelOfAbilityNoSensetiveZonePercent
        ) => set({ wheelOfAbilityNoSensetiveZonePercent }),
      };
    },
    {
      name: `${appName}-game-settings`,
      version: 8,
    }
  )
);
