"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import ProductCard from "./_components/ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  flag: string;
  origin: string;
  organic: boolean;
  stockStatus: boolean;
  image: string;
  category: "fruits" | "vegetables";
}

const Home = () => {
  const [fruits, setFruits] = useState<Product[]>([]);
  const [vegetables, setVegetables] = useState<Product[]>([]);
  const [fruitIndex, setFruitIndex] = useState(0);
  const [vegetableIndex, setVegetableIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data/shop-stock.json");
      const data: Product[] = await res.json();

      setFruits(data.filter((item) => item.category === "fruits"));
      setVegetables(data.filter((item) => item.category === "vegetables"));
    };
    fetchData();
  }, []);

  const handleScroll = (category: "fruits" | "vegetables", direction: "left" | "right") => {
    if (category === "fruits") {
      setFruitIndex((prevIndex) => {
        const maxIndex = fruits.length - 5;
        if (direction === "left") return Math.max(prevIndex - 1, 0);
        return Math.min(prevIndex + 1, maxIndex);
      });
    } else {
      setVegetableIndex((prevIndex) => {
        const maxIndex = vegetables.length - 5;
        if (direction === "left") return Math.max(prevIndex - 1, 0);
        return Math.min(prevIndex + 1, maxIndex);
      });
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      <Header />

      <section className="max-w-7xl mx-auto py-16 px-8 lg:px-4">
        {/* Fruits Section */}
        <h2 className="text-4xl font-bold text-green-800 mb-6">Découvrez nos Fruits</h2>
        <div className="relative flex items-center space-x-4">
          <button
            onClick={() => handleScroll("fruits", "left")}
            className="absolute left-0 p-3 bg-green-600 text-white rounded-full hover:bg-green-700 z-10 transform -translate-x-6 shadow-lg transition ease-in-out duration-150"
          >
            &lt;
          </button>
          <div className="flex overflow-hidden space-x-4 ml-12 mr-12">
            {fruits.slice(fruitIndex, fruitIndex + 5).map((fruit) => (
              <ProductCard key={fruit.id} product={fruit} />
            ))}
          </div>
          <button
            onClick={() => handleScroll("fruits", "right")}
            className="absolute right-0 p-3 bg-green-600 text-white rounded-full hover:bg-green-700 z-10 transform translate-x-6 shadow-lg transition ease-in-out duration-150"
          >
            &gt;
          </button>
        </div>
        <div className="mt-6 text-right">
          <Link href="/fruits" className="text-green-600 font-semibold text-lg hover:underline">
            Voir tous les fruits &rarr;
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-16 px-8 lg:px-4">
        {/* Vegetables Section */}
        <h2 className="text-4xl font-bold text-green-800 mb-6">Découvrez nos Légumes</h2>
        <div className="relative flex items-center space-x-4">
          <button
            onClick={() => handleScroll("vegetables", "left")}
            className="absolute left-0 p-3 bg-green-600 text-white rounded-full hover:bg-green-700 z-10 transform -translate-x-6 shadow-lg transition ease-in-out duration-150"
          >
            &lt;
          </button>
          <div className="flex overflow-hidden space-x-4 ml-12 mr-12">
            {vegetables.slice(vegetableIndex, vegetableIndex + 5).map((vegetable) => (
              <ProductCard key={vegetable.id} product={vegetable} />
            ))}
          </div>
          <button
            onClick={() => handleScroll("vegetables", "right")}
            className="absolute right-0 p-3 bg-green-600 text-white rounded-full hover:bg-green-700 z-10 transform translate-x-6 shadow-lg transition ease-in-out duration-150"
          >
            &gt;
          </button>
        </div>
        <div className="mt-6 text-right">
          <Link href="/vegetables" className="text-green-600 font-semibold text-lg hover:underline">
            Voir tous les légumes &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
