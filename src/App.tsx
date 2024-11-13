import { useEffect, useState } from "react";
import PWABadge from "./PWABadge.tsx";
import "./App.css";
import DirectionButton from "./ui/direction-and-speed-controller/DirectionAndSpeedController.tsx";
import Hero from "./ui/hero/Hero.tsx";
import WheelOfAbility from "./ui/wheel-of-ability/WheelOfAbility.tsx";

function App() {
  const [cw, setCW] = useState(window.innerWidth); //cw -canvas width
  const [ch, setCH] = useState(window.innerHeight); //ch -canvas height

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener(
      "resize",
      async () => {
        const windowY = window.innerHeight;
        const windowX = window.innerWidth;
        setCW(windowX);
        setCH(windowY);
      },
      { signal: controller.signal }
    );

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className='app'>
      <canvas height={ch} width={cw} />
      <Hero />
      <DirectionButton />
      <WheelOfAbility />
      <PWABadge />
    </div>
  );
}

export default App;
