"use client";

import { drawPath, KinematicArm } from "@/lib/kinamatic-arm";
import { useEffect, useRef } from "react";

const KinematicCanvas = () => {
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

      const arm = new KinematicArm(width / 2, height / 2, 200, 0);
      const arm2 = new KinematicArm(arm.getEndX(), arm.getEndY(), 200, 1.3);
      const arm3 = new KinematicArm(arm2.getEndX(), arm2.getEndY(), 200, 1.3);

      let angle = 0;

      arm2.parent = arm;
      arm3.parent = arm2;

      updateArm();

      function updateArm() {
        if (!context) return;
        context.clearRect(0, 0, width, height);
        arm.angle = Math.sin(angle) * 1.2;
        arm2.angle = arm.angle * 4;
        arm3.angle = arm2.angle * 4;

        arm2.x = arm.getEndX();
        arm2.y = arm.getEndY();
        arm3.y = arm2.getEndY();
        arm3.x = arm2.getEndX();
        angle += 0.001;

        const endX = arm3.getEndX();
        const endY = arm3.getEndY();
        path.push({ x: endX, y: endY });
        if (path.length > 10000) path.shift();

        drawPath(context, path);

        arm.renderArm(context as CanvasRenderingContext2D);
        arm2.renderArm(context as CanvasRenderingContext2D);
        arm3.renderArm(context as CanvasRenderingContext2D);

        requestAnimationFrame(updateArm);
      }
    }
  }, []);

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
