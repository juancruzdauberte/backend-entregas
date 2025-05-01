const productList = document.getElementById("product-list");

socket.on("updateProducts", (products) => {
  productList.innerHTML = "";
  products.forEach((product) => {
    const tr = document.createElement("tr");
    tr.id = `product-${product.id}`;
    tr.innerHTML = `
      <td>${product.title}</td>
      <td>${product.price}</td>
      <td>${product.code}</td>
      <td>${product.stock}</td>
    `;
    productList.appendChild(tr);
  });
});
