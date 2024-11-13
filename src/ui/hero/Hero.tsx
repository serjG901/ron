import "./style.css";
import { useGameStore } from "../../store/game";
import { useShallow } from "zustand/shallow";
import { useEffect, useState } from "react";
import { useSettingsStore } from "../../store/settings";

const areaWidth = window.innerWidth;
const heroCenterX = 50;
const heroCenterY = 50;

export default function Hero() {
  const [heroWidth, heroHeight] = useSettingsStore(
    useShallow((state) => [state.heroWidth, state.heroHeight])
  );

  const [angle, speed] = useGameStore(
    useShallow((state) => [state.moveAngle, state.moveSpeed])
  );

  const [isShow, setIsShow] = useState(false);
  const [startPositionX, setStartPositionX] = useState(window.innerWidth / 2);
  const [startPositionY, setStartPositionY] = useState(window.innerHeight / 2);

  useEffect(() => {
    setIsShow(true);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener(
      "resize",
      async () => {
        setStartPositionX(window.innerWidth / 2);
        setStartPositionY(window.innerHeight / 2);
      },
      { signal: controller.signal }
    );
    return () => {
      controller.abort();
    };
  }, [startPositionX, startPositionY]);

  return (
    <div
      className='hero-appear-area'
      id='hero-appear-area'
      style={
        {
          "--self-width": areaWidth + "px",
        } as React.CSSProperties
      }
    >
      <div
        className='hero-zone'
        style={
          {
            visibility: isShow ? "visible" : "hidden",
            "--self-width": Math.min(heroWidth, heroHeight) * 2 + "px",
            "--self-height": Math.min(heroWidth, heroHeight) * 2 + "px",
            "--x-position": startPositionX + "px",
            "--y-position": startPositionY + "px",
            "--speed": speed,
            "--shadow-alfa": speed + "%",
            "--angle": angle,
          } as React.CSSProperties
        }
      >
        <div
          className='hero'
          style={
            {
              "--self-width": heroWidth + "px",
              "--self-height": heroHeight + "px",
              "--x-position-center": heroCenterX + "%",
              "--y-position-center": heroCenterY + "%",
              "--rotate": -angle + 90 + "deg",
            } as React.CSSProperties
          }
        >
          head
        </div>
      </div>
    </div>
  );
}
