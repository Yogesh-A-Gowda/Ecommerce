import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "https://res.cloudinary.com/dwoosdotj/image/upload/v1737018439/21_awzpic.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "https://res.cloudinary.com/dwoosdotj/image/upload/v1737018439/Gucci_f2d7hw.webp" },
  { href: "/shoes", name: "Shoes", imageUrl: "https://res.cloudinary.com/dwoosdotj/image/upload/v1737018440/Jimmy-Choo_vnpry7.webp" },
  { href: "/glasses", name: "Glasses", imageUrl: "https://res.cloudinary.com/dwoosdotj/image/upload/v1737018440/glasses_s6fo0m.webp" },
  { href: "/jackets", name: "Jackets", imageUrl: "https://res.cloudinary.com/dwoosdotj/image/upload/v1737018439/2_ljakz0.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "https://res.cloudinary.com/dwoosdotj/image/upload/v1737018440/Louis-Vuitton_nw1dmq.avif" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Featured Products slider with full width */}
      {!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}

      <div className="w-full">
      </div>

      {/* Categories Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-blue-400 mb-4">CATEGORIES</h1>
        <p className="text-center text-xl text-gray-300 mb-12">Experience the latest styles</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default HomePage;
