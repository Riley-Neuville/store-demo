import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
  const sampleProduct = {
    images: [
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300/0000FF",
      "https://via.placeholder.com/300/FF0000",
    ],
    title: "Awesome Product",
    price: 29.99,
  };

  return (
    <>
      <Navbar />
      <div className="filterArea">
        <p>add filter stuff here</p>
        <div className="productArea">
          <ProductCard
            images={sampleProduct.images}
            title={sampleProduct.title}
            price={sampleProduct.price}
          />
          <ProductCard
            images={sampleProduct.images}
            title={sampleProduct.title}
            price={sampleProduct.price}
          />
          <ProductCard
            images={sampleProduct.images}
            title={sampleProduct.title}
            price={sampleProduct.price}
          />
          <ProductCard
            images={sampleProduct.images}
            title={sampleProduct.title}
            price={sampleProduct.price}
          />
          <ProductCard
            images={sampleProduct.images}
            title={sampleProduct.title}
            price={sampleProduct.price}
          />
          <ProductCard
            images={sampleProduct.images}
            title={sampleProduct.title}
            price={sampleProduct.price}
          />
          <ProductCard
            images={sampleProduct.images}
            title={sampleProduct.title}
            price={sampleProduct.price}
          />
          <ProductCard
            images={sampleProduct.images}
            title={sampleProduct.title}
            price={sampleProduct.price}
          />
          <ProductCard
            images={sampleProduct.images}
            title={sampleProduct.title}
            price={sampleProduct.price}
          />
        </div>
      </div>
    </>
  );
}

export default App;
