"use client";

import { useState } from "react";
import { loginUser } from "../utils/localStorageUtils";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Header from "../_components/Header";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleLogin = () => {
    const success = loginUser(username, password);
    setMessage(success ? "Connexion réussie ! Redirection..." : "Échec de connexion. Vérifiez vos informations.");
    
    if (success) {
      setTimeout(() => {
        router.push("/Dashboard"); 
      }, 2000);
    }
  };
  
  return (
  <div>
    <Header />
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Se connecter</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-semibold text-gray-600 mb-2">
            Nom d&apos;utilisateur
          </label>
          <input
            id="username"
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-600 mb-2">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-200"
        >
          Se connecter
        </button>
        {message && (
          <p className={`mt-4 text-center text-lg ${message.includes("réussie") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
          
        )}
         <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Vous n&apos;avez pas de compte ?{" "}
            <Link href="/signUp" className="text-green-600 hover:underline">
              S&apos;inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
   </div>  

  );
};

export default Login;
