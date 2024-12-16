import { useEffect, useState } from "react";
import ColorButtons from "./components/ColorButtons";
import Modal from "./components/Modal";
import Quantity from "./components/Quantity";
import ReviewIcons from "./components/ReviewIcons";
import SizeButtons from "./components/SizeButtons";

type CardData = {
  image: string;
  title: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
};

function App() {
  const [quantity, setQuantity] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedColor, setSelectTedColor] = useState<string>("PURPLE");
  const [selectedSizePrice, setSelectedSizePrice] = useState<{ size: string; price: number }>({
    size: "S",
    price: 69,
  });
  const [cardData, setCardData] = useState<CardData[]>([]);

  const productImages = [
    { color: "PURPLE", image: "./images/lg-a.png" },
    { color: "AQUA", image: "./images/lg-a4.png" },
    { color: "BLUE", image: "./images/lg-a3.png" },
    { color: "BLACK", image: "./images/lg-a2.png" },
  ];

  const activeProductImage = productImages?.find((i) => i?.color === selectedColor);

  const addToCardData = () => {
    const singleProduct: CardData = {
      image: activeProductImage?.image ?? "./images/lg-a.png",
      title: `Classy Modern Smart watch - ${selectedColor}`,
      color: selectedColor,
      size: selectedSizePrice.size,
      quantity: quantity,
      price: selectedSizePrice.price * quantity,
    };

    setCardData((prev) => {
      const existingProductIndex = prev.findIndex(
        (item) => item.color === singleProduct.color && item.size === singleProduct.size
      );

      if (existingProductIndex !== -1) {
        const updatedCardData = [...prev];
        const existingProduct = updatedCardData[existingProductIndex];
        updatedCardData[existingProductIndex] = {
          ...existingProduct,
          quantity: singleProduct.quantity,
          price: singleProduct.price,
        };

        window.localStorage.setItem("card_data", JSON.stringify(updatedCardData));
        return updatedCardData;
      } else {
        const newCardData = [...prev, singleProduct];

        window.localStorage.setItem("card_data", JSON.stringify(newCardData));
        return newCardData;
      }
    });

    setShowModal(true);
  };

  const handelCheckout = () => {
    setCardData([]);
    window.localStorage.removeItem("card_data");
    window.alert("Your Checkout Successful");
    setShowModal(false);
  };

  useEffect(() => {
    const storedCardData = window.localStorage.getItem("card_data");
    if (storedCardData) {
      setCardData(JSON.parse(storedCardData));
    }
  }, []);

  return (
    <div className="font-primary-font min-h-[100vh] flex">
      <div className="max-w-[1320px] w-full mx-auto my-auto pb-4 lg:pb-0">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-[60px] w-full">
          <div className="w-full lg:w-[50%] h-auto">
            <img
              className="w-full h-auto object-cover"
              src={activeProductImage?.image ?? "./images/lg-a.png"}
              alt="watch image"
            />
          </div>

          <div className="w-full lg:w-[50%] space-y-5 px-4 lg:px-0">
            <div>
              <h1 className="font-bold text-primary-text text-2xl lg:text-[40px] leading-[44px] -tracking-[1.2px] mb-3">
                Classy Modern Smart watch
              </h1>
              <p className="text-secondary-text font-normal text-sm leading-[23px] flex items-center gap-2">
                {" "}
                <ReviewIcons /> <span>(2 review)</span>
              </p>
            </div>

            <h4 className="space-x-1">
              <span className="text-[20px] font-normal text-secondary-text leading-[30px]">
                ${(selectedSizePrice?.price * quantity + 20).toFixed(2)}
              </span>
              <span className="font-bold text-[24px] text-primary">
                ${(selectedSizePrice?.price * quantity).toFixed(2)}
              </span>
            </h4>

            <p className="text-secondary-text font-normal text-lg leading-[30px]">
              I must explain to you how all this mistaken idea of denoun cing ple praising pain was
              born and I will give you a complete account of the system, and expound the actual
              teaching.
            </p>

            <div className="flex gap-11">
              <div className="flex flex-col">
                <span className="text-secondary-text font-normal text-sm leading-[23px]">Type</span>
                <span className="text-primary-text font-bold leading-[23px]">Watch</span>
              </div>
              <div className="flex flex-col">
                <span className="text-secondary-text font-normal text-sm leading-[23px]">
                  Model Number
                </span>
                <span className="text-primary-text font-bold leading-[23px]">Forerunner 290XT</span>
              </div>
            </div>

            <div>
              <h4 className="text-primary-text font-bold text-lg leading-5">Band Color</h4>

              <ColorButtons selectedColor={selectedColor} setSelectTedColor={setSelectTedColor} />
            </div>

            <div>
              <h4 className="text-primary-text font-bold text-lg leading-5">Wrist Size</h4>

              <SizeButtons
                setQuantity={setQuantity}
                selectedSizePrice={selectedSizePrice}
                setSelectedSizePrice={setSelectedSizePrice}
              />
            </div>

            <div className="flex items-center gap-3">
              <Quantity quantity={quantity} setQuantity={setQuantity} />

              <button
                onClick={addToCardData}
                className="text-sm font-bold text-[#fff] py-2 px-[18px] rounded bg-primary hover:bg-primary-hover ease-in duration-200 "
                type="button"
              >
                Add to Cart
              </button>

              <button type="button" className="flex h-9 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  className="text-primary w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        handelCheckout={handelCheckout}
        cardData={cardData}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}

export default App;
