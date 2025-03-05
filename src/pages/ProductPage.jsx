import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/productpage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/productcard.css";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Get product ID from URL

  const images = [
    "http://dummyimage.com/112x148.png/ff4444/ffffff",
    "http://dummyimage.com/177x112.png/ff4444/ffffff",
    "http://dummyimage.com/201x147.png/5fa2dd/ffffff",
  ];

  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);

        // Convert id to a number before comparing
        const selectedProduct = response.data.find((p) => p.id === Number(id));
        setProduct(selectedProduct);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadAllProducts();
  }, [id]); // Run effect when id changes

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found.</p>;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="productPage">
      <h1>{product.name}</h1>
      <br />
      <div className="imageGallery">
        <Slider {...settings} className="singleProductSlider">
          {images.map((img, index) => (
            <img key={index} src={img} alt={`${product.name} ${index + 1}`} />
          ))}
        </Slider>
      </div>
      <br />
      <p>
        <strong>Price:</strong> ${product.price.toFixed(2)}
      </p>
      <p>
        <strong>Color:</strong> {product.color}
      </p>
      <p>
        <strong>Department:</strong> {product.department}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {product.description || "No description available"}
      </p>
      <Link to="/">← Back to Products</Link>
    </div>
  );
}

export default ProductPage;
