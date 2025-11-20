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

      // const arm1 = new KinematicArm(width / 2, height / 2, 120, 0);
      // const arm2 = new KinematicArm(arm1.getEndX(), arm1.getEndY(), 90, 0);
      // const arm3 = new KinematicArm(arm2.getEndX(), arm2.getEndY(), 70, 0);

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

      // arm2.parent = arm1;
      // arm3.parent = arm2;

      updateArm();

      function updateArm() {
        if (!context) return;
        context.clearRect(0, 0, width, height);
        // arm1.angle = Math.sin(angle * 1.0) * 1.1;
        // arm2.angle = Math.cos(angle * 1.333) * 0.95;
        // arm3.angle = Math.sin(angle * 1.997) * 0.82;

        // arm2.x = arm1.getEndX();
        // arm2.y = arm1.getEndY();
        // arm3.y = arm2.getEndY();
        // arm3.x = arm2.getEndX();

        arms.forEach((arm, index) => {
          arm.angle = Math.sin(angle * 2) * 4;
          if (index !== 0) {
            arm.x = arms[index - 1].getEndX();
            arm.y = arms[index - 1].getEndY();
          }
        });
        // angle += 0.04;
        angle += generalValues.incrementAngle;

        if (arms.length === 0) return;
        const endX = arms[arms.length - 1].getEndX();
        const endY = arms[arms.length - 1].getEndY();
        path.push({ x: endX, y: endY });
        if (path.length > 10000) path.shift();

        drawPath(context, path);

        arms.forEach((arm) => {
          arm.renderArm(context as CanvasRenderingContext2D);
        });

        // arm1.renderArm(context as CanvasRenderingContext2D);
        // arm2.renderArm(context as CanvasRenderingContext2D);
        // arm3.renderArm(context as CanvasRenderingContext2D);

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
