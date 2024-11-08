"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";

import productsData from "../../../public/data/shop-stock.json";

interface Product {
  name: string;
  price: number;
  description?: string;
  image: string | undefined;
  specifications?: Record<string, string>;
  category: string;
  unit: string;
  origin: string;
  organic: boolean;
  stockStatus: boolean;
  flag: string;
}

const removeAccents = (str: string) => {
  const noAccents = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return noAccents.replace(/\s+/g, "-").toLowerCase();
};

const ProductPage = () => {
  const { name } = useParams<{ name: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedWeight, setSelectedWeight] = useState<number>(100);
  useEffect(() => {
    if (name) {
      const normalizedProductName = removeAccents(name);

      const product = productsData.find((p) =>
        removeAccents(p.name) === normalizedProductName
      );

      setProduct(product || null);
    }
  }, [name]);

  if (!product) return <div className="text-center py-20">Chargement...</div>;

  const imageSrc = product.image ? product.image : "/default-image.jpg";
  const description = product.description || "Pas de description disponible.";

  const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWeight(Number(event.target.value));
  };

  const totalPrice =
    product.unit === "kg" ? (product.price / 1000) * selectedWeight : product.price * quantity;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="product-page flex-grow container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-lg shadow-lg">
          <div className="relative image-section mb-8 lg:mb-0">
            {product.flag && (
              <div className="absolute top-4 left-4 text-3xl font-bold text-white bg-black px-2 py-1 rounded-full shadow-md">
                {product.flag}
              </div>
            )}

            {product.organic && (
              <div className="absolute top-4 right-4 bg-green-500 text-white py-1 px-3 rounded-full text-sm shadow-md">
                Bio
              </div>
            )}

            <Image
              src={imageSrc}
              alt={product.name}
              width={600}
              height={600}
              className="rounded-lg shadow-xl transform hover:scale-105 transition duration-500"
            />
          </div>

          <div className="info-section">
            <h1 className="text-4xl font-semibold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-2xl text-gray-700 font-semibold mb-6">{product.price} €</p>
            <p className="text-lg text-gray-600 mb-6">{description}</p>

            <div className="quantity-selector flex flex-col space-y-6 mb-6">
              {product.unit === "kg" ? (
                <div>
                  <label htmlFor="weight" className="text-lg text-gray-700">Poids (en g)</label>
                  <select
                    id="weight"
                    className="border p-3 text-lg text-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                    value={selectedWeight}
                    onChange={handleWeightChange}
                  >
                    {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map((weight) => (
                      <option key={weight} value={weight}>
                        {weight}g
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label htmlFor="quantity" className="text-lg text-gray-700">Quantité</label>
                  <select
                    id="quantity"
                    className="border p-3 text-lg text-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                    value={quantity}
                    onChange={handleQuantityChange}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="total-price text-2xl font-semibold text-gray-800 mb-6">
              {`Prix total: ${totalPrice.toFixed(2)} €`}
            </div>

            <div className="cta-buttons mt-6">
              <button
                className={`w-full py-3 px-6 rounded-lg text-white text-lg ${
                  product.stockStatus
                    ? "bg-green-600 hover:bg-green-700 transition-all"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
                disabled={!product.stockStatus}
              >
                {product.stockStatus ? "Ajouter au panier" : "En rupture de stock"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
