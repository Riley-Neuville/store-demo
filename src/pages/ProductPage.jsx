import { useParams, Link } from "react-router-dom";

function ProductPage({ products }) {
  const { id } = useParams(); // Get product ID from URL
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="productPage">
      <h1>{product.title}</h1>
      <div className="imageGallery">
        {product.images.map((img, index) => (
          <img key={index} src={img} alt={`${product.title} ${index + 1}`} />
        ))}
      </div>
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
