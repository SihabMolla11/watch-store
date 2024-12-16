import React from "react";

type ColorComponentProps = {
  selectedColor: string;
  setSelectTedColor: React.Dispatch<React.SetStateAction<string>>;
};

type Color = {
  color: string;
  name: string;
};

const colors: Color[] = [
  {
    color: "#816BFF",
    name: "PURPLE",
  },
  {
    color: "#1FCEC9",
    name: "AQUA",
  },
  {
    color: "#4B97D3",
    name: "BLUE",
  },
  {
    color: "#3B4747",
    name: "BLACK",
  },
];

const ColorButtons: React.FC<ColorComponentProps> = ({ selectedColor, setSelectTedColor }) => {
  return (
    <div className="flex items-center gap-4 mt-[10px]">
      {colors.map((color: Color) => (
        <button
          onClick={() => setSelectTedColor(color.name)}
          key={color.name}
          className={`w-6 h-6 rounded-full p-[2px] bg-white flex items-center justify-center ${
            selectedColor === color.name ? "border-2 " : "border-0"
          }`}
          style={{
            borderColor: selectedColor === color.name ? color.color : "#fff",
          }}
        >
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: color.color }}></span>
        </button>
      ))}
    </div>
  );
};

export default ColorButtons;
