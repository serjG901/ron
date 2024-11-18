import { useEffect, useState } from "react";
import PWABadge from "./PWABadge.tsx";
import "./App.css";
import DirectionButton from "./ui/direction-and-speed-controller/DirectionAndSpeedController.tsx";
import Hero from "./ui/hero/Hero.tsx";
import WheelOfAbility from "./ui/wheel-of-ability/WheelOfAbility.tsx";
import { useSettingsStore } from "./store/settings.ts";
import { useShallow } from "zustand/shallow";
import { useGameStore } from "./store/game.ts";
import CanvasComponent from "./Canvas.tsx";

function App() {
  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia("(orientation: landscape)").matches
  );

  const [deviceWidth, setDeviceWidth, deviceHeight, setDeviceHeight] =
    useSettingsStore(
      useShallow((state) => [
        state.deviceWidth,
        state.setDeviceWidth,
        state.deviceHeight,
        state.setDeviceHeight,
      ])
    );

  const [moveAngle, moveSpeed] = useGameStore(
    useShallow((state) => [state.moveAngle, state.moveSpeed])
  );

  useEffect(() => {
    const controller = new AbortController();
    if (isLandscape) {
      const windowX = window.innerWidth;
      const windowY = window.innerHeight;

      setDeviceWidth(windowX);
      setDeviceHeight(windowY);
    }
    window.addEventListener(
      "resize",
      async () => {
        const windowX = window.innerWidth;
        const windowY = window.innerHeight;

        setDeviceWidth(windowX);
        setDeviceHeight(windowY);
      },
      { signal: controller.signal }
    );
    window.matchMedia("(orientation: landscape)").addEventListener(
      "change",
      (e) => {
        const isLandscape = e.matches;

        if (isLandscape) {
          setIsLandscape(true);
          const windowX = window.innerWidth;
          const windowY = window.innerHeight;

          setDeviceWidth(windowX);
          setDeviceHeight(windowY);
        } else {
          setIsLandscape(false);
        }
      },
      { signal: controller.signal }
    );

    return () => {
      controller.abort();
    };
  }, []);

  return isLandscape ? (
    <div className='app'>
      <CanvasComponent
        deviceHeight={deviceHeight}
        deviceWidth={deviceWidth}
        moveAngle={moveAngle}
        moveSpeed={moveSpeed}
      />
      <Hero />
      <DirectionButton />
      <WheelOfAbility />
      <PWABadge />
    </div>
  ) : (
    <div className='app-need-to-landscape'>
      <div>Turn Your device to landscape orintation</div>

      <div className='device-concept'>&#11118;</div>
    </div>
  );
}

export default App;
