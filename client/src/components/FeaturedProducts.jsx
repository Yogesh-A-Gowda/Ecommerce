import { useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import PropTypes from "prop-types";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { addToCart } = useCartStore();

  FeaturedProducts.propTypes = {
    featuredProducts: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length); // Loop to the first slide
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + featuredProducts.length) % featuredProducts.length); // Loop to the last slide
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
      <h2 className="text-center text-5xl sm:text-6xl font-bold text-blue-700 mb-4 p-2 rounded-lg">
  Trendz Products at your Pick!
</h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`, // Move slides based on the current index
              }}
            >
              {featuredProducts?.map((product) => (
                <div
                  key={product._id}
                  className="w-full flex-shrink-0" // Each image takes full width
                >
                  <div
                    className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl border border-blue-500/30"
                  >
                    {/* Aspect ratio box for the image */}
                    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute top-0 left-0 w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
  <h3 className="text-lg font-semibold mb-2 text-white text-center"> {/* Center title */}
    {product.name}
  </h3>
  <p className="text-blue-900 font-medium mb-4 text-center"> {/* Center price */}
   
  </p>
  <button
  onClick={() => addToCart(product)}
  className="w-full bg-blue-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-between"
>
  <span>Check out the Featured {product.name}</span>
  <div className="flex items-center space-x-2">
    <ShoppingCart className="w-5 h-5" />
    <span>Shop Now!</span>
  </div>
</button>

</div>

                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 bg-blue-600 hover:bg-blue-500"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 bg-blue-600 hover:bg-blue-500"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
