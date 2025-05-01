const socket = io();

const addForm = document.getElementById("add-form");
const deleteForm = document.getElementById("delete-form");

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(addForm);
  const product = {
    title: formData.get("title"),
    price: formData.get("price"),
    code: formData.get("code"),
    stock: formData.get("stock"),
    category: formData.get("category"),
  };
  socket.emit("addProduct", product);
  addForm.reset();
});

deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(deleteForm);
  const code = formData.get("code");
  socket.emit("deleteProduct", code);
  deleteForm.reset();
});
