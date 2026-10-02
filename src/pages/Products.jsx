import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Products = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const loginToken = localStorage.getItem("loginToken");

        if (!loginToken) {
          alert("You must be logged in to view products.");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `http://localhost:5050/user/products?token=${loginToken}`
        );

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products.");
      }
    };

    fetchProducts();
  }, [navigate]);

  // Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("loginToken");

      if (!token) {
        alert("You must be logged in to add a product.");
        navigate("/login");
        return;
      }

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5050/user/addproduct",
        {
          title,
          price,
          imageURL,
          description,
          token,
        }
      );

      alert("Product added successfully!");

      setTitle("");
      setPrice("");
      setImageURL("");
      setDescription("");

      setProducts((prevProducts) => [
        ...prevProducts,
        response.data,
      ]);
    } catch (error) {
      console.error("Error adding product:", error);

      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950">

      {/* Navbar */}

      <nav className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <div>
            <h1 className="text-xl font-bold text-white">
              Product Store
            </h1>

            <p className="text-xs text-slate-500">
              Manage your products
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
          >
            Logout
          </button>

        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-5 py-8">

        {/* Add Product */}

        <section className="mx-auto mb-10 max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              Add New Product
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Enter the product information below.
            </p>
          </div>

          <form onSubmit={handleAddProduct}>

            {/* Title */}

            <div className="mb-4">
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Product Title
              </label>

              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter product title"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Price */}

            <div className="mb-4">
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Price
              </label>

              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter product price"
                min="0"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Image URL */}

            <div className="mb-4">
              <label
                htmlFor="imageURL"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Image URL
              </label>

              <input
                type="text"
                id="imageURL"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                placeholder="https://example.com/image.jpg"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Description */}

            <div className="mb-5">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Description
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write product description..."
                rows="4"
                required
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>

          </form>
        </section>

        {/* Product List */}

        <section>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              Product List
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Available products
            </p>
          </div>

          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center">
              <p className="text-slate-400">
                No products available.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {products.map((product, index) => (
                <div
                  key={product._id || product.id || index}
                  className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition duration-300 hover:-translate-y-1 hover:border-slate-700"
                >

                  {/* Image */}

                  <div className="h-52 overflow-hidden bg-slate-800">
                    <img
                      src={product.imageURL}
                      alt={product.title}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Details */}

                  <div className="p-5">

                    <h3 className="mb-2 truncate text-lg font-semibold text-white">
                      {product.title}
                    </h3>

                    <p className="mb-3 text-lg font-bold text-blue-400">
                      Rs.{" "}
                      {Number(product.price).toLocaleString()}
                    </p>

                    <p className="line-clamp-3 text-sm leading-6 text-slate-400">
                      {product.description}
                    </p>

                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

      </main>
    </div>
  );
};

export default Products;