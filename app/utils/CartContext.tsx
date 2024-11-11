import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  price: number; // Prix par unité ou par kilogramme
  quantity: number; // Quantité en grammes ou nombre d’unités
  unitType: 'quantity' | 'weight'; // "quantity" pour les articles à la pièce, "weight" pour les articles au poids
}

interface CartItemDisplay {
  name: string;
  displayQuantity: string;
  totalPrice: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  totalItems: number;
  getTotalPrice: () => number;
  displayCartItems: () => CartItemDisplay[]; // Affichage formaté des items du panier
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode; 
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: (item.quantity ?? 0) + (product.quantity ?? 1), // Si quantity est undefined, utiliser 0 ou 1 par défaut
              }
            : item
        );
      } else {
        // Si le produit n'existe pas encore, l'ajouter avec la quantity fournie
        return [...prevCart, { ...product, quantity: product.quantity ?? 1 }];
      }
    });
  };

  const totalItems = cart.reduce((total, product) => {
    if (product.unitType === 'quantity') {
      return total + product.quantity;
    } else {
      return total + 1;
    }
  }, 0);

  const getTotalPrice = () => {
    return cart.reduce((total, product) => {
      if (product.unitType === 'quantity') {
        return total + product.price * product.quantity;
      } else {
        // Conversion pour les articles au poids (grammes -> kilogrammes)
        return total + (product.price * product.quantity) / 1000;
      }
    }, 0);
  };

  // Génère un tableau formaté pour l'affichage
  const displayCartItems = (): CartItemDisplay[] => {
    return cart.map((product) => {
      const displayQuantity =
        product.unitType === 'quantity'
          ? `${product.quantity} unit(s)` // Affichage des unités (pièce)
          : `${product.quantity / 1000} kg`; // Conversion en kg pour les articles vendus au poids

      const totalPrice =
        product.unitType === 'quantity'
          ? product.price * product.quantity
          : (product.price * product.quantity) / 1000; // Prix en fonction de l'unité (poids ou quantité)

      return {
        name: product.name,
        displayQuantity,
        totalPrice,
      };
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, totalItems, getTotalPrice, displayCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
