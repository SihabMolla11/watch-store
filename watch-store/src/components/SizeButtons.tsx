import React from "react";

type SizeComponentProps = {
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
};

type SizesType = {
  size: string;
  price: number;
};

const sizes: SizesType[] = [
  { size: "S", price: 69 },
  { size: "M", price: 79 },
  { size: "L", price: 89 },
  { size: "XL", price: 99 },
];

const SizeButtons: React.FC<SizeComponentProps> = ({ selectedSize, setSelectedSize }) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-[10px]">
        {sizes?.map((size: SizesType) => (
          <button
            onClick={() => setSelectedSize(size.size)}
            key={size?.size}
            className={`py-2 px-[18px] rounded-[4px] border ${
              selectedSize === size.size ? "border-primary" : "border-border-lite"
            }`}
            type="button"
          >
            <span
              className={` font-bold leading-5 text-sm mr-2 ${
                selectedSize === size.size ? "text-primary" : "text-primary-text"
              }`}
            >
              {size.size}
            </span>
            <span className="text-secondary-text font-normal leading-5 text-sm">${size.price}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default SizeButtons;
