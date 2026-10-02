import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function App() {
  const [products, setProducts] = useState([]);

  const [newProductInfo, setNewProductInfo] = useState({
    id: "",
    name: "",
    price: "",
    desc: "",
    imageurl: "",
  });

  const [editingProduct, setEditingProduct] = useState(null);

  const navigate = useNavigate();

  async function fetchProducts() {
    try {
      const response = await axios.get(
        "https://scarlet-ridge-1070.de.deplexo.com/products"
      );

      console.log("All API Products:", response.data);

      setProducts([]);
    } catch (err) {
      console.log("GET Error:", err);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductInfoChange = (e) => {
    setNewProductInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function addProduct(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://scarlet-ridge-1070.de.deplexo.com/products",
        {
          ...newProductInfo,
          id: Number(newProductInfo.id),
          price: Number(newProductInfo.price),
        }
      );

      const addedProduct = response.data.product || response.data;

      console.log("New Product Added:", addedProduct);

      setProducts((prev) => [...prev, addedProduct]);

      setNewProductInfo({
        id: "",
        name: "",
        price: "",
        desc: "",
        imageurl: "",
      });

      alert("Product Added Successfully");
    } catch (err) {
      console.log("POST Error:", err);
    }
  }

  function editProduct(product) {
    setEditingProduct(product.id);

    setNewProductInfo({
      id: product.id,
      name: product.name,
      price: product.price,
      desc: product.desc,
      imageurl: product.imageurl,
    });
  }

  async function updateProduct() {
    if (editingProduct === null) {
      return;
    }

    try {
      const updatedData = {
        id: Number(editingProduct),
        name: newProductInfo.name,
        price: Number(newProductInfo.price),
        desc: newProductInfo.desc,
        imageurl: newProductInfo.imageurl,
      };

      const response = await axios.put(
        `https://scarlet-ridge-1070.de.deplexo.com/products/${editingProduct}`,
        updatedData
      );

      console.log("PUT Response:", response.data);

      const updatedProduct =
        response.data.product ||
        response.data.updatedProduct ||
        response.data;

      setProducts((prev) =>
        prev.map((product) =>
          Number(product.id) === Number(editingProduct)
            ? {
                ...product,
                ...updatedProduct,
                id: Number(editingProduct),
                name: newProductInfo.name,
                price: Number(newProductInfo.price),
                desc: newProductInfo.desc,
                imageurl: newProductInfo.imageurl,
              }
            : product
        )
      );

      setNewProductInfo({
        id: "",
        name: "",
        price: "",
        desc: "",
        imageurl: "",
      });

      setEditingProduct(null);

      alert("Product Updated Successfully");
    } catch (err) {
      console.log("PUT Error:", err);
      console.log("Server Error:", err.response?.data);
    }
  }

  async function deleteProduct(id) {
    try {
      const response = await axios.delete(
        `https://scarlet-ridge-1070.de.deplexo.com/products/${id}`
      );

      console.log("Deleted Product:", response.data.product);

      setProducts((prev) =>
        prev.filter(
          (product) => Number(product.id) !== Number(id)
        )
      );

      alert("Product Deleted Successfully");
    } catch (err) {
      console.log("DELETE Error:", err);
    }
  }

  // Logout
  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Top Navbar */}

        <div className="mb-10 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 shadow-lg sm:px-6">

          <div>
            <h1 className="text-lg font-bold text-white sm:text-xl">
              Product Manager
            </h1>

            <p className="text-xs text-slate-500 sm:text-sm">
              Manage your products
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition duration-200 hover:border-red-500/50 hover:bg-red-500 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 15l3-3m0 0l-3-3m3 3H9"
              />
            </svg>

            <span>Logout</span>
          </button>

        </div>

        {/* Add / Edit Product */}

        <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl sm:p-8">

          <div className="mb-7 text-center">

            <h1 className="text-2xl font-bold text-white">
              {editingProduct !== null
                ? "Edit Product"
                : "Add Product"}
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              {editingProduct !== null
                ? "Edit product information"
                : "Enter product information"}
            </p>

          </div>

          <div className="flex w-full flex-col gap-3">

            <input
              type="number"
              name="id"
              placeholder="Enter product ID"
              value={newProductInfo.id}
              onChange={handleProductInfoChange}
              required
              disabled={editingProduct !== null}
              className="rounded-md border border-slate-800 bg-slate-950 p-2 text-white outline-none placeholder:text-slate-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
            />

            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={newProductInfo.name}
              onChange={handleProductInfoChange}
              required
              className="rounded-md border border-slate-800 bg-slate-950 p-2 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />

            <input
              type="number"
              name="price"
              placeholder="Enter product price"
              value={newProductInfo.price}
              onChange={handleProductInfoChange}
              required
              className="rounded-md border border-slate-800 bg-slate-950 p-2 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />

            <input
              type="text"
              name="desc"
              placeholder="Enter product description"
              value={newProductInfo.desc}
              onChange={handleProductInfoChange}
              required
              className="rounded-md border border-slate-800 bg-slate-950 p-2 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />

            <input
              type="url"
              name="imageurl"
              placeholder="Enter product image URL"
              value={newProductInfo.imageurl}
              onChange={handleProductInfoChange}
              required
              className="rounded-md border border-slate-800 bg-slate-950 p-2 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />

            <button
              type="button"
              onClick={(e) => {
                if (editingProduct === null) {
                  addProduct(e);
                }
              }}
              disabled={editingProduct !== null}
              className="mt-3 w-full rounded-md bg-green-600 p-2 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add Product
            </button>

          </div>

          <button
            type="button"
            onClick={updateProduct}
            disabled={editingProduct === null}
            className="mt-3 w-full rounded-md bg-red-500 p-2 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Update Product
          </button>

          {editingProduct !== null && (
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);

                setNewProductInfo({
                  id: "",
                  name: "",
                  price: "",
                  desc: "",
                  imageurl: "",
                });
              }}
              className="mt-3 w-full rounded-md bg-slate-700 p-2 font-semibold text-white transition hover:bg-slate-600"
            >
              Cancel Edit
            </button>
          )}

        </div>

        {/* Products */}

        <div className="mt-12">

          <h2 className="mb-3 text-center text-3xl font-bold text-white">
            Added Products
          </h2>

          {products.length === 0 ? (
            <p className="text-center text-slate-400">
              No products added yet.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {products.map((product, index) => (
                <div
                  key={`${product.id}-${product.name}-${index}`}
                  className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  <img
                    src={product.imageurl}
                    alt={product.name}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-5">

                    <p className="mb-1 text-xs text-slate-500">
                      ID: {product.id}
                    </p>

                    <h3 className="text-xl font-bold text-white">
                      {product.name}
                    </h3>

                    <p className="mt-2 min-h-[40px] text-sm text-slate-400">
                      {product.desc}
                    </p>

                    <p className="text-lg font-bold text-blue-500">
                      Rs. {product.price}
                    </p>

                    <button
                      onClick={() => editProduct(product)}
                      className="mt-3 w-full rounded-md bg-yellow-500 p-2 font-semibold text-white transition hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="mt-3 w-full rounded-md bg-red-500 p-2 font-semibold text-white transition hover:bg-red-600"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}