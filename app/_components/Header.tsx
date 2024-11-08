"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <div className="flex items-center space-x-2">
              <Image src="/logo-panier.svg" alt="Logo Mon Panier Vert" width={60    } height={42} />
              <h1 className="text-2xl font-bold text-green-600">Mon Panier Vert</h1>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-6">
            <Link href="/fruits" className="text-lg text-gray-800 hover:text-green-600 transition duration-200">Fruits</Link>
            <Link href="/vegetables" className="text-lg text-gray-800 hover:text-green-600 transition duration-200">Légumes</Link>
            <Link href="/contact" className="text-lg text-gray-800 hover:text-green-600 transition duration-200">Contact</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/login" className="text-lg text-gray-800 hover:text-green-600 transition duration-200">Se connecter</Link>
            <Link href="/register" className="text-lg text-gray-800 hover:text-green-600 transition duration-200">S&apos;inscrire</Link>
          </div>

          <div className="hidden md:flex items-center">
            <Link href="/cart">
              <svg className="w-6 h-6 text-gray-800 hover:text-green-600 transition duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l3.6 7.2 1.3-2.4m5.1-3.8H7l4.6 7.8 4.4-7.8h2.4a1 1 0 011 .8l1.2 5.6M9 14h6"></path>
              </svg>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link href="/fruits" className="block text-lg text-gray-800 hover:text-green-600 transition duration-200">Fruits</Link>
            <Link href="/vegetables" className="block text-lg text-gray-800 hover:text-green-600 transition duration-200">Légumes</Link>
            <Link href="/contact" className="block text-lg text-gray-800 hover:text-green-600 transition duration-200">Contact</Link>
            <Link href="/login" className="block text-lg text-gray-800 hover:text-green-600 transition duration-200">Se connecter</Link>
            <Link href="/register" className="block text-lg text-gray-800 hover:text-green-600 transition duration-200">S&apos;inscrire</Link>
            <Link href="/cart" className="block text-lg text-gray-800 hover:text-green-600 transition duration-200">
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l3.6 7.2 1.3-2.4m5.1-3.8H7l4.6 7.8 4.4-7.8h2.4a1 1 0 011 .8l1.2 5.6M9 14h6"></path>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
