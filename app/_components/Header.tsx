"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { logoutUser } from "../utils/localStorageUtils";
import { useRouter } from "next/navigation";
import CartIcon from "./CartIcon";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const checkUserLoginStatus = () => {
    const currentUser = localStorage.getItem("currentUser"); 
    setIsUserLoggedIn(!!currentUser);
  };

  useEffect(() => {
    checkUserLoginStatus();

    const handleStorageChange = () => {
      checkUserLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    logoutUser(); 
    setIsUserLoggedIn(false); 
    router.push("/login"); 
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <Image src="/logo-panier.svg" alt="Logo Mon Panier Vert" width={60} height={42} />
                <h1 className="text-2xl font-bold text-green-600">Mon Panier Vert</h1>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-6">
            <Link href="/fruits" className="text-lg text-gray-800 hover:text-green-600 transition duration-200">Fruits</Link>
            <Link href="/vegetables" className="text-lg text-gray-800 hover:text-green-600 transition duration-200">Légumes</Link>
            {isUserLoggedIn && (
              <Link href="/Dashboard" className="text-lg text-gray-800 hover:text-green-600 transition duration-200">Mon Compte</Link>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            {isUserLoggedIn ? (
              <button onClick={handleLogout} className="text-lg text-gray-800 hover:text-green-600 transition duration-200">
                Se déconnecter
              </button>
            ) : (
              <>
                <Link href="/login" className="text-lg text-gray-800 hover:text-green-600 transition duration-200">Se connecter</Link>
                <Link href="/signUp" className="text-lg text-gray-800 hover:text-green-600 transition duration-200">S&apos;inscrire</Link>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center">
            <Link href="/cart">
            <Image src={"/shopping-basket.svg"} alt="Mon panier" height={20} width={20} />
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
            {isUserLoggedIn && (
              <Link href="/Dashboard" className="block text-lg text-gray-800 hover:text-green-600 transition duration-200">Mon compte</Link>
            )}
            {isUserLoggedIn ? (
              <button onClick={handleLogout} className="block text-lg text-gray-800 hover:text-green-600 transition duration-200">
                Se déconnecter
              </button>
            ) : (
              <>
                <Link href="/login" className="block text-lg text-gray-800 hover:text-green-600 transition duration-200">Se connecter</Link>
                <Link href="/signUp" className="block text-lg text-gray-800 hover:text-green-600 transition duration-200">S&apos;inscrire</Link>
              </>
            )}
            <CartIcon />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
