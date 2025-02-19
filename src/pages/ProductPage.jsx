import { useParams, Link } from "react-router-dom";
import "../css/productpage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/productcard.css";

function ProductPage({ products }) {
  const { id } = useParams(); // Get product ID from URL
  const product = products.find((p) => p.id === id);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="productPage">
      <h1>{product.title}</h1>
      <br></br>
      <div className="imageGallery">
        <Slider {...settings} className="singleProductSlider">
          {product.images.map((img, index) => (
            <img key={index} src={img} alt={`${product.title} ${index + 1}`} />
          ))}
        </Slider>
      </div>
      <br></br>
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
