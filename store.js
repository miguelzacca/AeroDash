
const products = document.querySelectorAll(".container div");
const products_btn = document.querySelectorAll(".container div button");
const products_img = document.querySelectorAll(".container div img.hover");
let storeMoney = localStorage.getItem("money") || 0;

localStorage.setItem(0, true);

const updateMoney = () => {
  document.querySelector("header").innerHTML = `
    <span>${storeMoney.toString().padStart(5, "0")}</span>
    <img src="./assets/screen.webp" />
  `;
}

const checkMoney = () => {
  for (const [index, product] of products.entries()) {
    if (planes[index].price > localStorage.getItem("money") && !localStorage.getItem(index)) {
      product.style.filter = 'brightness(.7) grayscale(1)';
      products_btn[index].disabled = true;
      products_btn[index].style.cursor = 'not-allowed';
      products_img[index].removeAttribute("class");
    }
  }
}

for (const [index] of products.entries()) {
  if (localStorage.getItem(index)) {
    products_btn[index].innerHTML = 'Select';
  }
}

for (const [index, btn] of products_btn.entries()) {
  const src = products_img[index].src;

  btn.addEventListener("click", () => {
    const check = () => {
      for (const btn of products_btn) {
        if (btn.innerHTML === '✓') {
          if (localStorage.getItem(index)) {
            btn.innerHTML = 'Select';
          }
        }
      }

      if (btn.innerHTML === 'Select') {
        for (const btn of products_btn) {
          if (btn.innerHTML === '✓') {
            btn.innerHTML = 'Select';
          }
        }
        btn.innerHTML = '✓';
        localStorage.removeItem("plane");
      }

      if (localStorage.getItem(index) && localStorage.getItem("plane") === src) {
        btn.innerHTML = 'Select';
        localStorage.removeItem("plane");
      } else if (localStorage.getItem(index)) {
        localStorage.setItem("plane", src);
        btn.innerHTML = '✓';
      }
    }

    if (planes[index].price <= localStorage.getItem("money") && !localStorage.getItem(index)) {
      localStorage.setItem(index, true);
      localStorage.setItem("money", Number(localStorage.getItem("money") - planes[index].price));
      storeMoney = localStorage.getItem("money");
    }

    check();
    checkMoney();
    updateMoney();
  });

  if (localStorage.getItem("plane") === src) {
    btn.innerHTML = '✓';
  }
}

updateMoney();
checkMoney();

if (!localStorage.getItem("plane")) {
  products_btn[0].click();
}