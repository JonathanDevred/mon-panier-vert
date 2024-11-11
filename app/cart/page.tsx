"use client";

import { useState, useEffect } from "react";
import Header from "../_components/Header";

type Product = {
  id: number;
  name: string;
  price: number;
  quantity?: number; // Quantité en pièces
  selectedWeight?: number; // Quantité en grammes
  soldIn: "g" | "piece"; // Unité de vente
};

const CartPage = () => {
  const [cart, setCart] = useState<Product[]>([]);

  // Charger le panier depuis localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, []);

  // Supprimer un produit du panier
  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter(product => product.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Mettre à jour la quantité d'un produit (en grammes ou pièces)
  const updateQuantity = (id: number, quantity: number, isPiece: boolean) => {
    const updatedCart = cart.map(product => {
      if (product.id === id) {
        if (isPiece) {
          return { ...product, quantity }; // Mise à jour pour les produits à l'unité
        } else {
          return { ...product, selectedWeight: quantity }; // Mise à jour pour les produits en grammes
        }
      }
      return product;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calcul du total en fonction du prix et de la quantité
  const total = cart.reduce((acc, product) => {
    let totalPrice = 0;
    if (product.soldIn === "g" && product.selectedWeight) {
      totalPrice = product.price * product.selectedWeight / 1000; // produit en grammes, conversion en kg si nécessaire
    } else if (product.soldIn === "piece" && product.quantity) {
      totalPrice = product.price * product.quantity; // produit en pièce
    }
    return acc + totalPrice;
  }, 0);

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Mon Panier</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500">Votre panier est vide.</p>
        ) : (
          <div>
            <div className="space-y-4">
              {cart.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center space-x-4">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-gray-500">
                      {product.soldIn === "g"
                        ? `${(product.price / 1000).toFixed(2)}€/g`
                        : `${product.price}€/pièce`}
                    </p>

                    <div>
                      {product.soldIn === "g" ? (
                        <div>
                          <p>Quantité:</p>
                          <select
                            value={product.selectedWeight || 100} 
                            onChange={(e) =>
                              updateQuantity(product.id, Number(e.target.value), false)
                            }
                            className="w-32 p-2 border rounded-md"
                          >
                            {Array.from({ length: 10 }, (_, index) => 100 * (index + 1)).map(weight => (
                              <option key={weight} value={weight}>{weight} g</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div>
                          <p>Quantité:</p>
                          <input
                            type="number"
                            value={product.quantity || 1} // Valeur par défaut si undefined
                            onChange={(e) =>
                              updateQuantity(product.id, Number(e.target.value), true)
                            }
                            className="w-16 p-2 border rounded-md"
                            min="1"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-500">
  Total: €
  {product.soldIn === "g" && product.selectedWeight
    ? (product.price * product.selectedWeight / 1000).toFixed(2) // Pour les produits en grammes
    : product.soldIn === "piece" && (product.quantity ?? 0) > 0
    ? (product.price * (product.quantity ?? 0)).toFixed(2) // Pour les produits en pièces
    : "0.00"}
</p>


                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <p className="font-semibold">Total du panier: €{total.toFixed(2)}</p>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                Passer à la caisse
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
