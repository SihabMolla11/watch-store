const productData = [
  { color: "PURPLE", image: "./images/lg-a.png" },
  { color: "AQUA", image: "./images/lg-a4.png" },
  { color: "BLUE", image: "./images/lg-a3.png" },
  { color: "BLACK", image: "./images/lg-a2.png" },
];

let singleProduct = {
  image: "./images/lg-a.png",
  title: "Classy Modern Smart watch",
  color: "PURPLE",
  size: "S",
  quantity: 1,
  price: 69,
};

let selectedSize = "S";
let selectedImage = "./images/lg-a.png";
let selectedColor = "BLUE";

const addToCardButton = document.getElementById("add-to-card");
const modalRootContainer = document.getElementById("modal-background");
const modalContainer = document.getElementById("modal-container");
const modalBody = document.getElementById("modal-body");
const quantityCount = document?.getElementById("quantity-count");
let quantityConvertNumber = parseInt(quantityCount?.innerHTML) || 1;

const productCardBody = document.getElementById("product-card-body");
const quantityElement = document.getElementById("total-quantity");
const priceElement = document.getElementById("total-price");
let totalPrice = 0;
let totalQuantity = 0;

const showModal = () => {
  modalRootContainer.classList.remove("hidden");
  modalRootContainer.classList.add("fixed", "bg-[#11121B8C]", "bg-opacity-50");
  modalContainer.classList.remove("-translate-y-[100%]");
  modalContainer.classList.add("translate-y-0");
};

const closeModal = () => {
  modalContainer.classList.remove("translate-y-0");
  modalContainer.classList.add("-translate-y-[100%]");

  setTimeout(() => {
    modalRootContainer.classList.remove("fixed", "bg-[#11121B8C]", "bg-opacity-50");
    modalRootContainer.classList.add("hidden");
  }, 100);
};

addToCardButton.addEventListener("click", () => {
  let cardData = JSON.parse(localStorage.getItem("card_data")) || [];
  singleProduct.image = selectedImage;
  singleProduct.color = selectedColor;
  singleProduct.size = selectedSize.split(" ")[0];
  singleProduct.price =
    selectedSize === "S"
      ? 69
      : selectedSize === "M"
      ? 79
      : selectedSize === "L"
      ? 89
      : selectedSize === "XL" && 99;
  singleProduct.quantity = quantityConvertNumber;
  const existingProductIndex = cardData.findIndex(
    (product) => product.color === singleProduct.color && product.size === singleProduct.size
  );

  if (existingProductIndex > -1) {
    cardData[existingProductIndex].quantity = singleProduct.quantity;
    cardData[existingProductIndex].price = singleProduct.price;
  } else {
    cardData.push(singleProduct);
  }

  localStorage.setItem("card_data", JSON.stringify(cardData));
  renderCartItems();
  showModal();
});

modalContainer.addEventListener("click", () => {
  closeModal();
});

modalBody.addEventListener("click", (e) => {
  e.stopPropagation();
});

const showImageFunction = (selectedColor) => {
  const product = productData.find((item) => item.color === selectedColor);
  if (product) {
    const imageElement = document.getElementById("carousel-image");
    imageElement.src = product.image;
    selectedImage = product?.image;
    selectedColor = product?.color;
  }

  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.classList.remove("border-2");
    if (button.getAttribute("onclick") === `showImageFunction('${selectedColor}')`) {
      button.classList.add("border-2");
    }
  });
};

const updateSizeSelection = (selectedButton) => {
  const sizeContainer = document.getElementById("size-container");
  const sizeButtons = sizeContainer.querySelectorAll("button");
  sizeButtons.forEach((button) => {
    button.classList.remove("border-primary");
    button.classList.add("border-border-lite");
    const firstSpan = button.querySelector("span:first-child");
    if (firstSpan) {
      firstSpan.classList.remove("text-primary");
      firstSpan.classList.add("text-primary-text");
    }
  });

  selectedButton.classList.remove("border-border-lite");
  selectedButton.classList.add("border-primary");
  const selectedSpan = selectedButton.querySelector("span:first-child");
  if (selectedSpan) {
    selectedSpan.classList.remove("text-primary-text");
    selectedSpan.classList.add("text-primary");
  }
  selectedSize = selectedButton?.innerText.split(" ")[0];
};

const updateQuantity = (count) => {
  quantityConvertNumber =
    count === "reduce" && quantityConvertNumber > 1
      ? quantityConvertNumber - 1
      : count === "add" && quantityConvertNumber + 1;

  quantityCount.innerHTML = quantityConvertNumber ? quantityConvertNumber : 1;
};

function getCartData() {
  return JSON.parse(localStorage.getItem("card_data")) || [];
}

function renderCartItems() {
  const products = getCartData();

  productCardBody.innerHTML = "";

  totalPrice = 0;
  totalQuantity = 0;

  products.forEach((item) => {
    const row = `
      <tr id="card-item" class="border-b border-border-lite">
        <td class="pb-4 flex flex-col items-start md:flex-row md:items-center space-x-2 mt-4">
          <img src="${item.image}" alt="Product" class="w-[36px] h-[36px] rounded" />
          <span class="text-secondary-text text-sm leading-6">${item.title}</span>
        </td>
        <td class="">
          <p class="text-center text-secondary-text text-sm leading-6">${item.color}</p>
        </td>
        <td class="">
          <p class="text-center text-primary-text font-bold text-sm leading-6">${item.size}</p>
        </td>
        <td class="">
          <p class="text-primary-text font-bold text-sm leading-6 text-center">${item.quantity}</p>
        </td>
        <td class="">
          <p class="text-end text-primary-text font-bold text-sm leading-6">$${(
            item.price * item?.quantity
          ).toFixed(2)}</p>
        </td>
      </tr>
    `;
    productCardBody.innerHTML += row;
    totalPrice += item?.price * item?.quantity;
    totalQuantity += item?.quantity;
  });

  quantityElement.innerText = totalQuantity;
  priceElement.innerText = totalPrice.toFixed(2);
}

document.getElementById("continue-scoping").addEventListener("click", () => {
  closeModal();
});

document.getElementById("checkout").addEventListener("click", () => {
  localStorage.removeItem("card_data");
  window.alert("Your checkout success full");
  location.reload();
});

renderCartItems();
