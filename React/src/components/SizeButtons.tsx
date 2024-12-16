import React from "react";

type SizesPriceType = {
  size: string;
  price: number;
};
type SizeComponentProps = {
  selectedSizePrice: SizesPriceType;
  setSelectedSizePrice: React.Dispatch<React.SetStateAction<SizesPriceType>>;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

const sizes: SizesPriceType[] = [
  { size: "S", price: 69 },
  { size: "M", price: 79 },
  { size: "L", price: 89 },
  { size: "XL", price: 99 },
];

const SizeButtons: React.FC<SizeComponentProps> = ({
  selectedSizePrice,
  setSelectedSizePrice,
  setQuantity,
}) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-[10px]">
        {sizes?.map((size: SizesPriceType) => (
          <button
            onClick={() => {
              setQuantity(1), setSelectedSizePrice(size);
            }}
            key={size?.size}
            className={`py-2 px-[18px] rounded-[4px] border ${
              selectedSizePrice.size === size.size ? "border-primary" : "border-border-lite"
            }`}
            type="button"
          >
            <span
              className={` font-bold leading-5 text-sm mr-2 ${
                selectedSizePrice.size === size.size ? "text-primary" : "text-primary-text"
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
