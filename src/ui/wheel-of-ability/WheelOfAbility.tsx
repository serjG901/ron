import React, { useEffect, useState } from "react";
import "./style.css";
import { useGameStore } from "../../store/game";
import { useShallow } from "zustand/shallow";
import { useSettingsStore } from "../../store/settings";

const wheelOffset = 0;

export default function WheelOfAbility() {
  const [
    wheelOfAbilityWidth,
    wheelOfAbilityHeight,
    wheelOfAbilityNoSensetiveZone,
  ] = useSettingsStore(
    useShallow((state) => [
      state.wheelOfAbilityWidth,
      state.wheelOfAbilityHeight,
      state.wheelOfAbilityNoSensetiveZone,
    ])
  );

  const [wheelAbilityAngle, setWheelAbilityAngle] = useGameStore(
    useShallow((state) => [state.wheelAbilityAngle, state.setWheelAbilityAngle])
  );

  const [isShow, setIsShow] = useState(false);
  const [startPositionX, setStartPositionX] = useState(0);
  const [startPositionY, setStartPositionY] = useState(0);
  const [positionX, setPositionX] = useState(window.innerWidth - wheelOffset);
  const [positionY, setPositionY] = useState(window.innerHeight - wheelOffset);

  useEffect(() => {
    const controller = new AbortController();
    const area = document.getElementById("wheel-of-ability-appear-area")!;
    area.addEventListener(
      "touchstart",
      async (ev: TouchEvent) => {
        const { clientX, clientY } = ev.targetTouches[0];

        setStartPositionX(clientX);
        setStartPositionY(clientY);
      },
      { signal: controller.signal }
    );
    window.addEventListener(
      "resize",
      async () => {
        setPositionX(window.innerWidth - wheelOffset);
        setPositionY(window.innerHeight - wheelOffset);
      },
      { signal: controller.signal }
    );
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const area = document.getElementById("wheel-of-ability-appear-area")!;
    area.addEventListener(
      "touchmove",
      async (ev: TouchEvent) => {
        const { clientX, clientY } = ev.targetTouches[0];
        const dX = startPositionX - clientX;
        const dY = startPositionY - clientY;

        const hipot = Math.sqrt(dX ** 2 + dY ** 2);
        const lengthWheel = wheelOfAbilityWidth * Math.PI * 2;
        const angle = (360 * hipot) / lengthWheel;
        const sin = hipot ? -dX / hipot : hipot;
        const cos = hipot ? dY / hipot : hipot;

        const allowAreaX = wheelOfAbilityWidth * Math.abs(sin);
        const allowAreaY = wheelOfAbilityHeight * Math.abs(cos);

        if (
          Math.abs(dX) < (wheelOfAbilityNoSensetiveZone * allowAreaX) / 100 &&
          Math.abs(dY) < (wheelOfAbilityNoSensetiveZone * allowAreaY) / 100
        ) {
          return;
        }
        setWheelAbilityAngle(
          wheelAbilityAngle - (sin < 0 && cos < 0 ? -1 : 1) * Math.round(angle)
        );
      },
      { signal: controller.signal }
    );
    return () => {
      controller.abort();
    };
  }, [startPositionX, startPositionY]);

  useEffect(() => setIsShow(true), []);

  return (
    <div
      className='wheel-of-ability-appear-area'
      id='wheel-of-ability-appear-area'
      style={
        {
          "--self-width": wheelOfAbilityWidth * 2 + "px",
          "--self-height": wheelOfAbilityHeight * 2 + "px",
          "--x-position": positionX + "px",
          "--y-position": positionY + "px",
        } as React.CSSProperties
      }
    >
      <div
        className='wheel-of-ability-zone'
        style={
          {
            visibility: isShow ? "visible" : "hidden",
            "--self-width": wheelOfAbilityWidth + "px",
            "--self-height": wheelOfAbilityHeight + "px",
            "--x-position": positionX + "px",
            "--y-position": positionY + "px",
            "--angle": wheelAbilityAngle,
            "--rotate": -wheelAbilityAngle + "deg",
          } as React.CSSProperties
        }
      >
        <div>
          <div>a{wheelAbilityAngle}</div>
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, i, arr) => {
          return (
            <div
              key={item}
              className='wheel-of-ability'
              style={
                {
                  "--self-width": wheelOfAbilityWidth / 2 + "px",
                  "--self-height": wheelOfAbilityHeight / 2 + "px",
                  "--x-position-center": 50 + "%",
                  "--y-position-center": 50 + "%",
                  "--rotate": 75 - i * (360 / arr.length) + "deg",
                } as React.CSSProperties
              }
            >
              <div
                className='ability'
                style={
                  {
                    "--rotate": -90 + "deg",
                  } as React.CSSProperties
                }
              >
                {item}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
