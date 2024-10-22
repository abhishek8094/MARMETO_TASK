window.onload = () => {
  const cartProductsContainer = document.getElementById("cartProducts");
  const subtotalMoneyElement = document.getElementById("subtotal-money");
  const totalMoneyElement = document.getElementById("total-money");

  let cartData;

  const handleQuantityChange = (e, index) => {
    const quantity = e.target.value;
    cartData.items[index].quantity = quantity;
    cartData.items[index].final_price = quantity * cartData.items[index].price;
    calculatePrices();
    renderData();
  };

  const handleDelete = (index) => {
    cartData.items.splice(index, 1); 
    calculatePrices();
    renderData();
  };

  const calculatePrices = () => {
    let subtotal = 0;
    cartData.items.forEach((item) => {
      subtotal += item.final_price;
    });
    cartData.items_subtotal_price = subtotal;
    cartData.original_total_price = subtotal; 

    // Updating subtotal and total
    subtotalMoneyElement.textContent = cartData.items_subtotal_price.toFixed(2);
    totalMoneyElement.textContent = cartData.original_total_price.toFixed(2);
  };

  const renderData = () => {
    cartProductsContainer.innerHTML = ""; 

    cartData.items.forEach((item, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items-center; width:750px;">
                <img src="${item.image}" alt="Product Image" style="width: 60px; height:60px; border-radius: 10px;">
                <p style="position:relative; right:56px; color:#9F9F9F;">${item.product_title}</p>
                <p style="position:relative; right:32px; color:#9F9F9F;">Rs. ${item.price}</p>
                <input class="quantity-input" type="number" value="${item.quantity}" min="1"  style="width:40px; height:20px; position:relative; top:15px; right:22px" />
                <p style="position:relative; left:22px">Rs. ${item.final_price}</p>
                <i class="fa-solid fa-trash delete-btn" style="color: #B88E2F; position:relative; top:18px;"></i>
            </div>
            `;

      cartProductsContainer.appendChild(row);

      row
        .querySelector(".quantity-input")
        .addEventListener("change", (e) => handleQuantityChange(e, index));
      row
        .querySelector(".delete-btn")
        .addEventListener("click", () => handleDelete(index));
    });
  };

  // Fetching the data
  fetch(
    "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889"
  )
    .then((response) => response.json())
    .then((data) => {
      cartData = data;
      calculatePrices(); 
      renderData(); 
    })
    .catch((error) => console.error("Error fetching cart data:", error));
};
