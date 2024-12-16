import React from "react";

type QuantityProps = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

const Quantity: React.FC<QuantityProps> = ({ quantity, setQuantity }) => {
  return (
    <>
      <div className="flex items-center border rounded-lg border-border-lite w-[136px] justify-between">
        <button
          disabled={quantity <= 1}
          onClick={() => setQuantity(quantity - 1)}
          className="flex items-center justify-center py-2 px-2 text-secondary-text border-r border-border-lite"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
          </svg>
        </button>

        <span className="text-primary-text text-sm">{quantity}</span>

        <button
          onClick={() => setQuantity(quantity + 1)}
          className="flex items-center justify-center py-2 px-2 text-secondary-text border-l border-border-lite"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Quantity;
