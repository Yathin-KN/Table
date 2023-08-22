import React from "react";
import { Badge } from "./../src/components/ui/badge"; // Replace with the actual path to your Badge component

interface TypeBadgeProps {
  statusCode: string;
  onClick: (type: string) => void;
  selected: boolean;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({
  statusCode,
  onClick,
  selected,
}) => {
  const statusInfo: Record<string, { label: string; color: string }> = {
    "0": { label: "veg", color: "#42c244" },
    "1": { label: "non veg", color: "#cf3d29" },
    "2": { label: "egg", color: "#a3572e" },
  };

  const status = statusCode;
  const { label, color } = statusInfo[status] || {
    label: "rejected",
    color: "#000000",
  };
  const def = "#c2c0c0";

  return (
    <Badge
      style={{
        backgroundColor: "white",
        border: selected ? `1.2px solid ${color}` : `1.2px solid ${def}`,
        boxShadow: selected
          ? `${color} 0px 0px 0px 1px;`
          : `rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;`,
      }}
      className="rounded-md mx-1 py-1 text-gray-800"
      onClick={() => {
        onClick(statusCode);
      }}
    >
      <span
        className="p-1 border-[1.2px] mr-1 rounded-sm flex justify-center items-center"
        style={{
          height: "1.2rem",
          width: "1.2rem",
          borderColor: selected ? color : def,
          color: selected ? color : def,
        }}
      >
        <span
          className="p-[0.3rem] rounded-full"
          style={{ backgroundColor: selected ? color : def }}
        ></span>
      </span>
      {label}
    </Badge>
  );
};

export default TypeBadge;
