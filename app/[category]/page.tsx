"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { use } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import ProductCard from "../_components/ProductCard";  

interface Product {
  id: number;
  name: string;
  pricePerKg: number;
  isUnitBased: boolean;
  image: string;
  stockStatus: boolean;
  category: "fruits" | "vegetables";
}

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const CategoryPage = ({ params }: CategoryPageProps) => {
  const { category } = use(params);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data/shop-stock.json");
      const data: Product[] = await res.json();
      
      const filteredData = data.filter((item) => item.category === category);
      setProducts(filteredData);
    };

    if (category) fetchData();
  }, [category]);

  if (!category) return (<p>Chargement...</p>);

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      <Header />

      <section className="max-w-7xl mx-auto py-10 px-4">
        <h2 className="text-4xl font-bold text-green-800 mb-4">
          Nos {category === "fruits" ? "Fruits" : "Légumes"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />  
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/" className="text-green-600 font-semibold">
            Retour à l&apos;accueil
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
