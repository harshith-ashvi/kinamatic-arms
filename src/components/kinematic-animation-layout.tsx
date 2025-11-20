"use client";

import { useState } from "react";
import KinematicCanvas from "./kinamatic-canvas";
import KinematicControl from "./kinamatic-control";

import { ArmValueInterface, GeneralValueInterface } from "@/lib/types";

const KinematicAnimationLayout = () => {
  const [generalValues, setGeneralValues] = useState<GeneralValueInterface>({
    initialAngle: 0,
    incrementAngle: 0,
    bgColor: "#000000",
    pathColor: "#ff0000",
  });
  const [armsValue, setArmsValue] = useState<ArmValueInterface[]>([]);

  const handleGeneralValueUpdate = (key: string, value: string | number) => {
    setGeneralValues((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleArmsValueUpdate = (arms: ArmValueInterface[]) =>
    setArmsValue(arms);

  return (
    <div className="flex items-start w-full gap-4 mt-4 h-[calc(100vh-130px)]">
      <KinematicCanvas generalValues={generalValues} armsValue={armsValue} />
      <KinematicControl
        generalValues={generalValues}
        armsValue={armsValue}
        handleGeneralValueUpdate={handleGeneralValueUpdate}
        handleArmsValueUpdate={handleArmsValueUpdate}
      />
    </div>
  );
};

export default KinematicAnimationLayout;
