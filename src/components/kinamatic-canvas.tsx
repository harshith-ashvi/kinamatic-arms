"use client";

import { useEffect, useRef } from "react";
import { drawPath, KinematicArm } from "@/lib/kinamatic-arm";

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

      const arm1 = new KinematicArm(width / 2, height / 2, 120, 0);
      const arm2 = new KinematicArm(arm1.getEndX(), arm1.getEndY(), 90, 0);
      const arm3 = new KinematicArm(arm2.getEndX(), arm2.getEndY(), 70, 0);

      let angle = 0;

      arm2.parent = arm1;
      arm3.parent = arm2;

      updateArm();

      function updateArm() {
        if (!context) return;
        context.clearRect(0, 0, width, height);
        arm1.angle = Math.sin(angle * 1.0) * 1.1;
        arm2.angle = Math.cos(angle * 1.333) * 0.95;
        arm3.angle = Math.sin(angle * 1.997) * 0.82;

        arm2.x = arm1.getEndX();
        arm2.y = arm1.getEndY();
        arm3.y = arm2.getEndY();
        arm3.x = arm2.getEndX();
        angle += 0.04;

        const endX = arm3.getEndX();
        const endY = arm3.getEndY();
        path.push({ x: endX, y: endY });
        if (path.length > 10000) path.shift();

        drawPath(context, path);

        arm1.renderArm(context as CanvasRenderingContext2D);
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
