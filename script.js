const products = [
  
  { id: 1, name: "Białko WPC 900 g", price: 129.99, image: "https://sklep.kfd.pl/9607-large_default/kfd-premium-xxl-09-kg-wpc-80-900-g.jpg" },
  { id: 2, name: "Kreatyna 500 g", price: 89.99, image: "https://eko-familia.pl/userdata/public/gfx/30122/KFD‑Premium‑Creatine‑Kreatyna%2C‑smak‑jablko‑gruszka%2C‑500‑g‑eko‑familia.jpg"
 },
  { id: 3, name: "Omega 3 90 kaps.", price: 59.99, image: "https://sklep.kfd.pl/18220-large_default/kfd-omega-3-90-kaps-najmocniejsza.jpg" },
  { id: 4, name: "Witaminy dla sportowców", price: 49.99, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRlYzB-Q_Bo4zKz3yHZN2ll30S-e‑Zfk4eJfbfQr9cGow00RN‑F s_euHqfPWScNlHEMbzEoKPbcTBIUFUoWGI5SI12VYU‑PUk_4V1w4zyqQTxgjQCbC3QJrSMQdELDvR5NDfB3wog&usqp=CAc" },
  { id: 5, name: "BCAA 300 g", price: 79.99, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTCXCq79KXyavu6tcGV4b0Q9LlABNL5pSh‑PCIvTtOoGbyf1yZ9s‑9b6J_iTsydZNFSIB8kiJWbu6Ses_HZmrgAzAY5BFFLRcdEPb_dC4lKwSdrgKoqVS5_6w5ZQwFpTl_wcOsjQQ&usqp=CAc" },
  { id: 6, name: "Glutamina 500 g", price: 69.99, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQmeUduq3mWCnp3CUnnRXSNE8‑LoUCt9KL6PJjQrRLN10NFr8j5Hi3xGEbzbNBwQwe0zOw8IRaS‑IETGFatw2Q1ipw8FjYvKR25obiPaHbSQacEouRFN9rOhoswZU24FP1JlVR‑8w&usqp=CAc" }
];

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
    </div>
  `;
  productList.appendChild(col);
});

document.addEventListener("click", e => {
  if (e.target.classList.contains("add-to-cart")) {
    const id = parseInt(e.target.getAttribute("data-id"));
    const product = products.find(p => p.id === id);
    const item = cart.find(i => i.id === id);

    if (item) {
      item.qty++;
    } else {
      cart.push({ ...product, qty: 1 });
    }

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
      <td><button class="btn btn-danger btn-sm remove-item" data-id="${item.id}">X</button></td>
    `;
    cartItems.appendChild(tr);
  });

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  document.getElementById("cart-total").textContent = total.toFixed(2);
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Koszyk jest pusty!");
    return;
  }

  alert("Dziękujemy za zakupy! (Symulacja zamówienia)");
  cart = [];
  updateCart();
});
