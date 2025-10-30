const products = [
  { id: 1, name: "Białko Whey 1kg", price: 129.99, image: "https://via.placeholder.com/300x200?text=Białko" },
  { id: 2, name: "Kreatyna 500g", price: 89.99, image: "https://via.placeholder.com/300x200?text=Kreatyna" },
  { id: 3, name: "Omega 3 100 kaps.", price: 59.99, image: "https://via.placeholder.com/300x200?text=Omega+3" },
  { id: 4, name: "Witaminy dla sportowców", price: 49.99, image: "https://via.placeholder.com/300x200?text=Witaminy" }
];

let cart = [];

const productList = document.getElementById("product-list");
products.forEach(prod => {
  const col = document.createElement("div");
  col.className = "col-md-3 mb-4";
  col.innerHTML = `
    <div class="card h-100">
      <img src="${prod.image}" class="card-img-top" alt="${prod.name}">
      <div class="card-body text-center">
        <h5 class="card-title">${prod.name}</h5>
        <p class="card-text">${prod.price.toFixed(2)} zł</p>
        <button class="btn btn-success add-to-cart" data-id="${prod.id}">Dodaj do koszyka</button>
      </div>
    </div>`;
  productList.appendChild(col);
});

document.addEventListener("click", e => {
  if (e.target.classList.contains("add-to-cart")) {
    const id = parseInt(e.target.getAttribute("data-id"));
    const product = products.find(p => p.id === id);
    const item = cart.find(i => i.id === id);
    if (item) item.qty++; else cart.push({ ...product, qty: 1 });
    updateCart();
  }
  if (e.target.classList.contains("remove-item")) {
    const id = parseInt(e.target.getAttribute("data-id"));
    cart = cart.filter(i => i.id !== id);
    updateCart();
  }
});

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  cart.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price.toFixed(2)} zł</td>
      <td>${item.qty}</td>
      <td><button class="btn btn-danger btn-sm remove-item" data-id="${item.id}">X</button></td>`;
    cartItems.appendChild(tr);
  });
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  document.getElementById("cart-total").textContent = total.toFixed(2);
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) return alert("Koszyk jest pusty!");
  alert("Dziękujemy za zakupy! (Symulacja zamówienia)");
  cart = [];
  updateCart();
});
