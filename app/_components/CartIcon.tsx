import React from 'react';
import { useCart } from '../utils/CartContext';
import Image from 'next/image';
import Link from 'next/link';

const CartIcon = () => {
  const { cart } = useCart();

  const totalItems = [...new Set(cart.map((product) => product.id))].length;

  return (
    <div className="items-center">
      <Link href="/cart">
        <div className="relative">
          <Image src="/shopping-basket.svg" alt="Mon panier" height={20} width={20} />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1">
              {totalItems}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CartIcon;
