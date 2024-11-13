import React, { useEffect, useState } from "react";
import "./style.css";
import { useGameStore } from "../../store/game";
import { useShallow } from "zustand/shallow";
import { useSettingsStore } from "../../store/settings";

export default function DirectionAndSpeedController() {
  const [
    directionAndSpeedControllerWidth,
    directionAndSpeedControllerHeight,
    directionAndSpeedControllerOverflowZone,
    directionAndSpeedControllerNoSensetiveZone,
    directionAndSpeedControllerAreaPercent,
  ] = useSettingsStore(
    useShallow((state) => [
      state.directionAndSpeedControllerWidth,
      state.directionAndSpeedControllerHeight,
      state.directionAndSpeedControllerOverflowZone,
      state.directionAndSpeedControllerNoSensetiveZone,
      state.directionAndSpeedControllerAreaPercent,
    ])
  );

  const [moveAngle, setMoveAngle, moveSpeed, setMoveSpeed] = useGameStore(
    useShallow((state) => [
      state.moveAngle,
      state.setMoveAngle,
      state.moveSpeed,
      state.setMoveSpeed,
    ])
  );

  const [isShow, setIsShow] = useState(false);
  const [startPositionX, setStartPositionX] = useState(0);
  const [startPositionY, setStartPositionY] = useState(0);
  const [
    directionAndSpeedControllerCenterX,
    setDirectionAndSpeedControllerCenterX,
  ] = useState(50);
  const [
    directionAndSpeedControllerCenterY,
    setDirectionAndSpeedControllerCenterY,
  ] = useState(50);
  const [areaWidth, setAreaWidth] = useState(
    Math.round(
      window.innerWidth * (directionAndSpeedControllerAreaPercent / 100)
    )
  );

  useEffect(() => {
    const controller = new AbortController();
    const area = document.getElementById(
      "direction-and-speed-controller-appear-area"
    )!;
    area.addEventListener(
      "touchstart",
      async (ev: TouchEvent) => {
        setIsShow(true);
        const { clientX, clientY } = ev.targetTouches[0];

        setStartPositionX(clientX);
        setStartPositionY(clientY);
      },
      { signal: controller.signal }
    );
    area.addEventListener(
      "touchend",
      async () => {
        setIsShow(false);
        setMoveSpeed(0);
        setDirectionAndSpeedControllerCenterX(50);
        setDirectionAndSpeedControllerCenterY(50);
      },
      { signal: controller.signal }
    );
    window.addEventListener(
      "resize",
      async () => {
        const areaWidth = Math.round(
          window.innerWidth * (directionAndSpeedControllerAreaPercent / 100)
        );
        setAreaWidth(areaWidth);
      },
      { signal: controller.signal }
    );
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const area = document.getElementById(
      "direction-and-speed-controller-appear-area"
    )!;
    area.addEventListener(
      "touchmove",
      async (ev: TouchEvent) => {
        const { clientX, clientY } = ev.targetTouches[0];
        const dX = startPositionX - clientX;
        const dY = startPositionY - clientY;

        const hipot = Math.sqrt(dX ** 2 + dY ** 2);
        const sin = hipot ? -dX / hipot : hipot;
        const cos = hipot ? dY / hipot : hipot;
        const pureAngle = (Math.acos(sin) * 180) / Math.PI;
        const angle = cos < 0 ? 360 - pureAngle : pureAngle;

        const allowAreaX = directionAndSpeedControllerWidth * Math.abs(sin);
        const allowAreaY = directionAndSpeedControllerHeight * Math.abs(cos);
        const calcDX =
          dX < -allowAreaX ? -allowAreaX : dX > allowAreaX ? allowAreaX : dX;
        const calcDY =
          dY < -allowAreaY ? -allowAreaY : dY > allowAreaY ? allowAreaY : dY;
        if (
          Math.abs(dX) <
            (directionAndSpeedControllerNoSensetiveZone * allowAreaX) / 100 &&
          Math.abs(dY) <
            (directionAndSpeedControllerNoSensetiveZone * allowAreaY) / 100
        ) {
          setMoveSpeed(0);
          setDirectionAndSpeedControllerCenterX(50);
          setDirectionAndSpeedControllerCenterY(50);
          return;
        }
        setMoveAngle(Math.round(angle));
        setMoveSpeed(
          Math.round(
            ((Math.abs(allowAreaX ? calcDX / allowAreaX : allowAreaX) +
              Math.abs(allowAreaY ? calcDY / allowAreaY : allowAreaY)) /
              2) **
              2 *
              100
          )
        );
        setDirectionAndSpeedControllerCenterX(
          Math.round(
            50 -
              (calcDX / directionAndSpeedControllerWidth) *
                (50 + directionAndSpeedControllerOverflowZone)
          )
        );
        setDirectionAndSpeedControllerCenterY(
          Math.round(
            50 -
              (calcDY / directionAndSpeedControllerHeight) *
                (50 + directionAndSpeedControllerOverflowZone)
          )
        );
      },
      { signal: controller.signal }
    );
    return () => {
      controller.abort();
    };
  }, [startPositionX, startPositionY]);

  return (
    <div
      className='direction-and-speed-controller-appear-area'
      id='direction-and-speed-controller-appear-area'
      style={
        {
          "--self-width": areaWidth + "px",
        } as React.CSSProperties
      }
    >
      <div
        className='direction-and-speed-controller-zone'
        style={
          {
            visibility: isShow ? "visible" : "hidden",
            "--self-width": directionAndSpeedControllerWidth * 2 + "px",
            "--self-height": directionAndSpeedControllerHeight * 2 + "px",
            "--x-position": startPositionX + "px",
            "--y-position": startPositionY + "px",
            "--speed": moveSpeed,
            "--shadow-alfa": moveSpeed + "%",
            "--angle": moveAngle,
          } as React.CSSProperties
        }
      >
        <div>
          <div>a{moveAngle}</div>
          <div>s{moveSpeed}</div>
        </div>
        <div
          className='direction-and-speed-controller'
          style={
            {
              "--self-width": directionAndSpeedControllerWidth + "px",
              "--self-height": directionAndSpeedControllerHeight + "px",
              "--x-position-center": directionAndSpeedControllerCenterX + "%",
              "--y-position-center": directionAndSpeedControllerCenterY + "%",
            } as React.CSSProperties
          }
        ></div>
      </div>
    </div>
  );
}
