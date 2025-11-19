const API_URL = "http://localhost:5000/api/products";

// 📜 Get all products
export const getProducts = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

// ➕ Add a product
export const addProduct = async (product) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return await res.json();
};

// ✏️ Update a product
export const updateProduct = async (id, product) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return await res.json();
};

// ❌ Delete a product
export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
