"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  origin: string;
  organic: boolean;
  stockStatus: boolean;
  category: "fruits" | "vegetables";
}

const Home = () => {
  const [fruits, setFruits] = useState<Product[]>([]);
  const [vegetables, setVegetables] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data/shop-stock.json");
      const data: Product[] = await res.json(); 

      const fruitsData = data.filter((item) => item.category === "fruits");
      const vegetablesData = data.filter((item) => item.category === "vegetables");

      console.log("Fruits data:", fruitsData);
      console.log("Vegetables data:", vegetablesData); 

      setFruits(fruitsData);
      setVegetables(vegetablesData);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      <section className="max-w-7xl mx-auto py-10 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800">Bienvenue sur Mon Panier Vert</h1>
          <p className="text-lg text-gray-700 mt-4">
            Découvrez nos fruits et légumes frais, soigneusement sélectionnés pour votre bien-être.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-semibold text-green-800 mb-4">Nos Fruits</h2>
        <div className="flex overflow-x-auto space-x-4">
          {fruits.slice(0, 5).map((fruit) => (
            <div key={fruit.id} className="w-60 bg-white shadow-lg rounded-lg p-4">
              <Image
                src={`/images/fruits/${fruit.name.toLowerCase().replace(" ", "-")}.jpg`} 
                alt={fruit.name}
                width={240}
                height={240}
                className="object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold text-green-600 mt-4">{fruit.name}</h3>
              <p className="text-gray-600">{fruit.origin}</p>
              <p className="text-gray-600">{fruit.price}€/{fruit.unit}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-right">
          <Link href="/fruits" className="text-green-600 font-semibold">Voir tous les fruits</Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-semibold text-green-800 mb-4">Nos Légumes</h2>
        <div className="flex overflow-x-auto space-x-4">
          {vegetables.slice(0, 5).map((vegetable) => (
            <div key={vegetable.id} className="w-60 bg-white shadow-lg rounded-lg p-4">
              <Image
                src={`/images/vegetables/${vegetable.name.toLowerCase().replace(" ", "-")}.jpg`} 
                alt={vegetable.name}
                width={240}
                height={240}
                className="object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold text-green-600 mt-4">{vegetable.name}</h3>
              <p className="text-gray-600">{vegetable.origin}</p>
              <p className="text-gray-600">{vegetable.price}€/{vegetable.unit}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-right">
          <Link href="/vegetables" className="text-green-600 font-semibold">Voir tous les légumes</Link>
        </div>
      </section>

      <section className="bg-green-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-semibold">Pourquoi choisir Mon Panier Vert ?</h3>
          <p className="text-lg mt-4">
            Nous sélectionnons nos produits avec soin, en privilégiant des méthodes de culture durables et respectueuses de l&apos;environnement. Chaque produit est choisi pour sa fraîcheur, sa qualité et sa saveur.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-10 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-green-600">Contactez-Nous</h2>
          <p className="text-lg text-gray-700 mt-4">
            Vous avez des questions ? N&apos;hésitez pas à nous contacter, nous serons ravis de vous aider !
          </p>
          <Link href="/contact" className="mt-6 inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700">
              Nous contacter
          </Link>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Mon Panier Vert. Tous droits réservés.</p>
          <div className="mt-4">
            <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white mx-2">
              Politique de confidentialité
            </Link>
            <Link href="/terms-of-service" className="text-sm text-gray-400 hover:text-white mx-2">
              Conditions d&apos;utilisation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
