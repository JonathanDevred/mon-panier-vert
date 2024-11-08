"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  origin: string;
  flag: string;
  organic: boolean;
  stockStatus: boolean;
  image: string;
  category: "fruits" | "vegetables";
}

function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const ProductCard = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState<number>(product.unit === "kg" ? 100 : 1); 
  const [selectedWeight, setSelectedWeight] = useState<number>(100);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWeight(Number(event.target.value));
  };

  const productNameSlug = removeAccents(product.name)
    .toLowerCase()
    .replace(/\s+/g, '-'); 

  return (
    <div className="product-card bg-white shadow-lg rounded-lg p-4 relative flex flex-col justify-between min-h-[380px]">
      <div className="absolute top-2 left-2 text-3xl">
        {product.flag || "🌍"} 
      </div>
      
      {product.organic && (
        <div className="absolute top-2 right-2 bg-green-500 text-white py-1 px-3 rounded-full text-sm">
          Bio
        </div>
      )}

      <Link href={`/product/${productNameSlug}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={240}
          height={240}
          className="object-cover rounded-md"
        />
      </Link>

      <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
      <p className="text-lg text-gray-500">{`Origine: ${product.origin}`}</p>
      <p className="text-lg text-gray-500">{`Prix: ${product.price} €/${product.unit}`}</p>
      
      <div className="quantity-selector flex flex-col space-y-4 mt-4">
        {product.unit === "kg" ? (
          <div>
            <label htmlFor="weight" className="text-lg">Poids (en g)</label>
            <select
              id="weight"
              className="border p-2 text-lg"
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
            <label htmlFor="quantity" className="text-lg">Quantité</label>
            <select
              id="quantity"
              className="border p-2 text-lg"
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

        <div className="total-price text-lg font-semibold">
          {`Prix total: ${(
            product.unit === "kg" 
            ? (product.price / 1000) * selectedWeight 
            : product.price * quantity
          ).toFixed(2)}€`}
        </div>
      </div>

      <button
        className={`mt-4 px-6 py-2 rounded-md transition duration-200 ${
          product.stockStatus 
            ? "bg-green-400 text-white hover:bg-green-500"
            : "bg-gray-400 text-gray-700 "
        }`}
        disabled={!product.stockStatus} 
      >
        {product.stockStatus ? "Ajouter au panier" : "En rupture de stock"}
      </button>
    </div>
  );
};

export default ProductCard;
