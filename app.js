// 🌙 Theme Toggle
const themeSwitch = document.getElementById("themeSwitch");
const body = document.body;
themeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
});

// 🛍️ Fake API URL
const API_URL = " https://api.npoint.io/1d846daf5d9bdd0f8401";

const productContainer = document.getElementById("productContainer");
const categorySelect = document.getElementById("categorySelect");
const searchInput = document.getElementById("searchInput");
const applyBtn = document.getElementById("applyBtn");

// Fetch products from Fake API
async function fetchProducts() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("API fetch error:", err);
        productContainer.innerHTML = "<p style='color:red;'>Failed to load products.</p>";
        return [];
    }
}

// Render Products
function renderProducts(list) {
    productContainer.innerHTML = "";
    if (!list.length) {
        productContainer.innerHTML = "<p>No products found.</p>";
        return;
    }
    list.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${p.image}" alt="${p.name}">
          <div class="card-content">
            <h3>${p.name}</h3>
            <p>${p.category} • ${p.type}</p>
            <p class="price">Rs ${p.price}</p>
            <p>${p.desc || ""}</p>
          </div>
        `;
        productContainer.appendChild(card);
    });
}

// Filter Products
function filterProducts(products, category, query) {
    const cat = category.trim().toLowerCase();
    const q = query.trim().toLowerCase();
    return products.filter(p => {
        const matchCat = !cat || p.category.toLowerCase() === cat;
        const matchQuery = !q || (
            (p.name && p.name.toLowerCase().includes(q)) ||
            (p.type && p.type.toLowerCase().includes(q)) ||
            (p.desc && p.desc.toLowerCase().includes(q))
        );
        return matchCat && matchQuery;
    });
}

// Main
async function init() {
    const all = await fetchProducts();
    renderProducts(all);

    applyBtn.addEventListener("click", () => {
        const cat = categorySelect.value;
        const q = searchInput.value;
        const filtered = filterProducts(all, cat, q);
        renderProducts(filtered);
    });
}

init();