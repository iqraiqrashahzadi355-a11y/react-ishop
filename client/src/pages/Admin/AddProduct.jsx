import React, { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // Basic validation
    if (!product.name || !product.price || !product.image || !product.category) {
      setMessage("⚠️ Please fill all required fields!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Product added successfully!");
        setProduct({
          name: "",
          price: "",
          description: "",
          image: "",
          category: "",
        });
      } else {
        setMessage(`❌ Failed to add product: ${data.message || "Try again!"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Server error. Please check the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          ➕ Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            rows={4}
          ></textarea>

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          >
            <option value="">-- Select Category --</option>
            <option value="iphone">iPhone</option>
            <option value="ipad">iPad</option>
            <option value="imac">iMac</option>
            <option value="macbook">MacBook</option>
            <option value="airpods">AirPods</option>
            <option value="applewatch">Apple Watch</option>
            <option value="appletv">Apple TV</option>
            <option value="accessories">Accessories</option>
            <option value="entertainment">Entertainment</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white px-6 py-3 rounded-lg transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>

        {message && (
          <p
            className={`text-center text-lg font-semibold mt-4 ${
              message.includes("✅")
                ? "text-blue-600"
                : message.includes("⚠️")
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
};

export default AddProduct;
