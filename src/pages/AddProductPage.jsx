import { useState } from "react";
import axios from "axios";
import "../App.css";

function AddProductPage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    color: "",
    department: "",
  });

  const [message, setMessage] = useState(null); // Message state for success/error feedback
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const handleAddProduct = async () => {
    try {
      console.log("Sending product data:", newProduct);

      const response = await axios.post(
        "http://localhost:8080/api/createResource",
        newProduct,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Response received:", response.data);

      // Show success message and clear input fields
      setMessage("Product added successfully!");
      setMessageType("success");
      setNewProduct({ name: "", price: "", color: "", department: "" });
    } catch (error) {
      console.error("Error adding product:", error);

      // Show error message
      setMessage("Failed to add product. Please try again.");
      setMessageType("error");
    }

    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <div className="AddProductPage">
      {message && <p className={`message ${messageType}`}>{message}</p>}

      <input
        type="text"
        placeholder="Add Product Name"
        style={{ width: "75%", marginRight: "10px" }}
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />

      <input
        type="number"
        placeholder="Add Product Price"
        style={{ width: "75%", marginRight: "10px" }}
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Add Product Color"
        style={{ width: "75%", marginRight: "10px" }}
        value={newProduct.color}
        onChange={(e) =>
          setNewProduct({ ...newProduct, color: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Add Product Department"
        style={{ width: "75%", marginRight: "10px" }}
        value={newProduct.department}
        onChange={(e) =>
          setNewProduct({ ...newProduct, department: e.target.value })
        }
      />

      <button onClick={handleAddProduct}>Add Product</button>

      {/* Inline CSS for success/error message */}
      <style>
        {`
          .message {
            font-size: 1rem;
            padding: 10px;
            margin-top: 10px;
            border-radius: 5px;
            text-align: center;
            width: 75%;
          }
          .success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
          }
          .error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
          }
        `}
      </style>
    </div>
  );
}

export default AddProductPage;
