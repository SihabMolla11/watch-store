type CardData = {
  image: string;
  title: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
};

type ModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  cardData: CardData[];
  handelCheckout: () => void;
};

const Modal: React.FC<ModalProps> = ({ showModal, setShowModal, cardData, handelCheckout }) => {
  const totalPrice = cardData?.reduce((a: number, b: CardData) => a + b?.price, 0);

  return (
    <>
      <div
        className={` inset-0 transition duration-700 ease-in-out ${
          showModal ? "fixed bg-[#11121B8C] bg-opacity-50" : "hidden"
        }`}
      ></div>
      <div
        onClick={() => setShowModal(false)}
        className={`absolute inset-0 flex items-center justify-center transition duration-700 ease-in-out ${
          showModal ? "translate-y-0 " : "-translate-y-[200%] "
        }`}
      >
        <div className="h-[100vh] flex items-center justify-center w-full">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#fff] rounded-lg shadow-lg max-w-2xl w-full p-4 md:p-8 lg:p-11 overflow-y-auto max-h-[600] my-auto overflow-auto"
          >
            <h2 className="text-[22px] leading-6 font-bold text-primary-text mb-5">Your Cart</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="">
                  <tr className="border-b border-border-lite">
                    <th className="pb-2">
                      <p className="text-start font-normal text-secondary-text text-sm">Item</p>
                    </th>
                    <th className="pb-2">
                      <p className="text-center font-normal text-secondary-text text-sm">Color</p>
                    </th>
                    <th className="pb-2">
                      <p className="text-center font-normal text-secondary-text text-sm">Size</p>
                    </th>
                    <th className="pb-2">
                      <p className="font-normal text-secondary-text text-sm text-center">Qnt</p>
                    </th>
                    <th className="pb-2">
                      <p className="font-normal text-secondary-text text-sm text-end">Price</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cardData?.map((item: CardData, idx: number) => (
                    <tr key={idx}>
                      <td className="pb-4 flex flex-col items-start md:flex-row md:items-center space-x-2 mt-4">
                        <img
                          src={item?.image ?? "./images/lg-a.png"}
                          alt="Product"
                          className="w-[36px] h-[36px] rounded"
                        />
                        <span className="text-secondary-text text-sm leading-6">{item?.title}</span>
                      </td>
                      <td className="">
                        <p className="text-center text-secondary-text text-sm leading-6">
                          {item.color.toLocaleLowerCase()}
                        </p>
                      </td>
                      <td className="">
                        <p className="text-center text-primary-text font-bold text-sm leading-6">
                          {item.size}
                        </p>
                      </td>
                      <td className="">
                        <p className="text-primary-text font-bold text-sm leading-6 text-center">
                          {item.quantity}
                        </p>
                      </td>
                      <td className="">
                        <p className="text-end text-primary-text font-bold text-sm leading-6">
                          ${item.price.toFixed(2)}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="mt-4">
                    <td className="pt-4" colSpan={3}>
                      <p className="font-bold leading-[22px] text-[#373737] tracking-[-0.2px]">
                        Total
                      </p>
                    </td>
                    <td className="pt-4">
                      <p className="font-bold leading-[34px] text-primary-text tracking-[-0.2px] text-center">
                        {cardData?.length}
                      </p>
                    </td>
                    <td className="pt-4">
                      <p className="font-bold leading-[34px] text-primary-text tracking-[-0.2px] text-end">
                        $<span>{totalPrice.toFixed(2)}</span>
                      </p>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-4 flex justify-end items-center gap-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-[18px] py-[8px] rounded text-primary-text border border-border-lite font-bold leading-5 tracking-[0.26px] text-sm"
              >
                Continue Shopping
              </button>
              <button
                onClick={handelCheckout}
                className="px-[18px] py-[8px] bg-primary rounded text-[#fff] font-bold leading-5 tracking-[0.26px] text-sm hover:bg-primary-hover ease-in duration-200"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
