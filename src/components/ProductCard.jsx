import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/productcard.css"; // Custom styles

const ProductCard = ({ images, title, price }) => {
  // Slick carousel settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="product-card">
      {/* Image Carousel */}
      <Slider {...settings} className="product-carousel">
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`${title} ${index + 1}`}
              className="product-image"
            />
          </div>
        ))}
      </Slider>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-price">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
