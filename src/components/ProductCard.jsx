import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/productcard.css";

const ProductCard = ({ id, images, title, price }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Link to={`/product/${id}`} className="product-card-link">
      <div className="product-card">
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
        <div className="product-info">
          <h3 className="product-title">{title}</h3>
          <p className="product-price">${price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
