"use client";

import { useEffect, useRef } from "react";

import { drawPath, KinematicArm } from "@/lib/kinamatic-arm";
import { ArmValueInterface, GeneralValueInterface } from "@/lib/types";

interface KinematicCanvasProps {
  generalValues: GeneralValueInterface;
  armsValue: ArmValueInterface[];
}

const KinematicCanvas = ({
  generalValues,
  armsValue,
}: KinematicCanvasProps) => {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const path: { x: number; y: number }[] = [];
    if (canvas && context) {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const width = canvas.width;
      const height = canvas.height;

      const arms: KinematicArm[] = [];

      armsValue.forEach((armValue, index) => {
        const arm = new KinematicArm(
          index === 0 ? width / 2 : arms[index - 1].getEndX(),
          index === 0 ? height / 2 : arms[index - 1].getEndY(),
          armValue.length,
          armValue.initialAngle
        );
        arm.parent = index === 0 ? null : arms[index - 1];
        arms.push(arm);
      });

      let angle = generalValues.initialAngle;

      updateArm();

      function updateArm() {
        if (!context) return;
        context.clearRect(0, 0, width, height);
        context.rect(0, 0, width, height);
        context.fillStyle = generalValues.bgColor || "red";
        context.fill();

        arms.forEach((arm, index) => {
          arm.angle = Math.sin(angle * 2) * 4;
          if (index !== 0) {
            arm.x = arms[index - 1].getEndX();
            arm.y = arms[index - 1].getEndY();
          }
        });
        angle += generalValues.incrementAngle;

        if (arms.length === 0) return;
        const endX = arms[arms.length - 1].getEndX();
        const endY = arms[arms.length - 1].getEndY();
        path.push({ x: endX, y: endY });
        if (path.length > 10000) path.shift();

        drawPath(
          context,
          path,
          generalValues.pathColor,
          generalValues.pathThickness
        );

        arms.forEach((arm, index) => {
          arm.renderArm(
            context as CanvasRenderingContext2D,
            armsValue[index].armColor
          );
        });

        requestAnimationFrame(updateArm);
      }
    }
  }, [generalValues, armsValue]);

  return (
    <div className="h-full flex-6">
      <canvas
        ref={canvasRef}
        className="w-full h-full bg-neutral-50 dark:bg-neutral-800 rounded-lg"
      />
    </div>
  );
};

export default KinematicCanvas;
