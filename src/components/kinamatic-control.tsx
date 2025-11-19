import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArmValueInterface, GeneralValueInterface } from "@/lib/types";
import { SyntheticEvent } from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

interface KinematicControlProps {
  generalValues: GeneralValueInterface;
  armsValue: ArmValueInterface[];
  handleGeneralValueUpdate: (key: string, value: string | number) => void;
  handleArmsValueUpdate: (arms: ArmValueInterface[]) => void;
}

interface InputGroupProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (e: SyntheticEvent) => void;
}

interface ArmGroupProps {
  arm: ArmValueInterface;
  index: number;
  onDeleteArm: (index: number) => void;
  onChangeArmsValue: (
    key: string,
    value: string | number,
    index: number
  ) => void;
}

const InputGroup = ({
  label,
  name,
  type,
  value,
  onChange,
}: InputGroupProps) => {
  return (
    <div className="flex flex-col gap-1 mt-2">
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} type={type} value={value} onChange={onChange} />
    </div>
  );
};

const ArmGroup = ({
  arm,
  index,
  onDeleteArm,
  onChangeArmsValue,
}: ArmGroupProps) => {
  return (
    <div className="p-2 py-4 border border-neutral-400 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="font-bold text-lg">Arm {index + 1}</p>
        <Trash
          className="size-4 cursor-pointer"
          onClick={() => onDeleteArm(index)}
        />
      </div>

      <InputGroup
        label="Length"
        name={`length${index}`}
        type="number"
        value={arm.length}
        onChange={(e) =>
          onChangeArmsValue(
            "length",
            Number((e.target as HTMLInputElement).value),
            index
          )
        }
      />

      <InputGroup
        label="Initial Angle"
        name={`initialAngle${index}`}
        type="number"
        value={arm.initialAngle}
        onChange={(e) =>
          onChangeArmsValue(
            "initialAngle",
            Number((e.target as HTMLInputElement).value),
            index
          )
        }
      />

      <InputGroup
        label="Increment Angle"
        name={`incrementAngle${index}`}
        type="number"
        value={arm.incrementAngle}
        onChange={(e) =>
          onChangeArmsValue(
            "incrementAngle",
            Number((e.target as HTMLInputElement).value),
            index
          )
        }
      />
    </div>
  );
};

const KinematicControl = ({
  generalValues,
  armsValue,
  handleGeneralValueUpdate,
  handleArmsValueUpdate,
}: KinematicControlProps) => {
  const onChangeArmsValue = (
    key: string,
    value: string | number,
    index: number
  ) => {
    const armsClone = armsValue.map((arm, i) => {
      if (i === index) {
        return { ...arm, [key]: value };
      }
      return arm;
    });
    handleArmsValueUpdate(armsClone);
  };

  const onAddArm = () => {
    const newArm = { length: 80, initialAngle: 0, incrementAngle: 8 };
    handleArmsValueUpdate([...armsValue, newArm]);
  };

  const onDeleteArm = (index: number) => {
    const updatedArms = armsValue.filter((_, i) => index !== i);
    handleArmsValueUpdate(updatedArms);
  };

  return (
    <div className="h-full flex-2 w-full bg-neutral-50 dark:bg-neutral-800 rounded-lg p-2 overflow-y-auto">
      <div className="p-2 py-4 border border-neutral-400 rounded-lg">
        <p className="font-bold text-lg">General Control</p>
        <InputGroup
          label="Initial Angle"
          name="initialAngle"
          type="number"
          value={generalValues.initialAngle}
          onChange={(e) =>
            handleGeneralValueUpdate(
              "initialAngle",
              Number((e.target as HTMLInputElement).value)
            )
          }
        />
        <InputGroup
          label="Increment Angle"
          name="incrementAngle"
          type="number"
          value={generalValues.incrementAngle}
          onChange={(e) =>
            handleGeneralValueUpdate(
              "incrementAngle",
              Number((e.target as HTMLInputElement).value)
            )
          }
        />
        <InputGroup
          label="Background Color"
          name="bgColor"
          type="color"
          value={generalValues.bgColor}
          onChange={(e) =>
            handleGeneralValueUpdate(
              "bgColor",
              (e.target as HTMLInputElement).value
            )
          }
        />
        <InputGroup
          label="Path Color"
          name="pathColor"
          type="color"
          value={generalValues.pathColor}
          onChange={(e) =>
            handleGeneralValueUpdate(
              "pathColor",
              (e.target as HTMLInputElement).value
            )
          }
        />
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {armsValue.map((arm, index) => (
          <ArmGroup
            key={index}
            arm={arm}
            onDeleteArm={onDeleteArm}
            index={index}
            onChangeArmsValue={onChangeArmsValue}
          />
        ))}
      </div>

      <Button className="w-full m-2 p-2 mx-auto" onClick={onAddArm}>
        Add Arm
      </Button>
    </div>
  );
};

export default KinematicControl;
