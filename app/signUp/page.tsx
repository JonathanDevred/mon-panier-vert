"use client";

import { useState } from "react";
import { registerUser } from "../utils/localStorageUtils";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import Image from "next/image";


export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter(); 

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const checkPasswordLength = password.length >= 8;
  const checkPasswordLowercase = /[a-z]/.test(password);
  const checkPasswordUppercase = /[A-Z]/.test(password);
  const checkPasswordNumber = /\d/.test(password);
  const checkPasswordSpecial = /[@$!%*?&]/.test(password);
  const checkPasswordValid = passwordRegex.test(password); 

  const checkConfirmPassword = password && confirmPassword ? password === confirmPassword : true;

  const handleSignUp = () => {
    if (!checkPasswordValid) {
      setMessage("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
      setIsSuccess(false);
      return;
    }

    if (!checkConfirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      setIsSuccess(false);
      return;
    }

    const success = registerUser(username, password);
    if (success) {
      setMessage("Inscription réussie ! Redirection à connexion..");
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/login"); 
      }, 2000);
    } else {
      setMessage("Cet utilisateur existe déjà.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <Link href={"/"}>
        <div className="flex flex-col mb-8 items-center">
          <Image src={"../logo-panier.svg"} alt="Logo mon panier vert" width={150} height={100} />
          <p className="text-2xl font-bold text-green-600 ">Mon panier vert </p>
        </div>
      </Link>
  
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Créer un compte</h2>
  
        <input
          type="email"
          placeholder="Adresse E-mail"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-green-500"
          required
        />
  
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-green-500"
        />
  
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-green-500"
        />
  
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isPasswordVisible}
            onChange={() => setIsPasswordVisible(!isPasswordVisible)}
            className="mr-2"
          />
          <span className="text-sm text-gray-600">Afficher le mot de passe</span>
        </div>
  
        <div className="mt-4 mb-6">
          <div className="flex items-center">
            <span
              className={`mr-2 text-xl ${checkPasswordLength ? "text-green-500" : "text-gray-400"}`}
            >
              {checkPasswordLength ? "✓" : ""}
            </span>
            <span className={`text-sm ${checkPasswordLength ? "text-green-600" : "text-gray-600"}`}>
              Doit contenir au moins 8 caractères
            </span>
          </div>
  
          <div className="flex items-center mt-2">
            <span
              className={`mr-2 text-xl ${checkPasswordLowercase ? "text-green-500" : "text-gray-400"}`}
            >
              {checkPasswordLowercase ? "✓" : ""}
            </span>
            <span className={`text-sm ${checkPasswordLowercase ? "text-green-600" : "text-gray-600"}`}>
              Doit contenir au moins une lettre minuscule
            </span>
          </div>
  
          <div className="flex items-center mt-2">
            <span
              className={`mr-2 text-xl ${checkPasswordUppercase ? "text-green-500" : "text-gray-400"}`}
            >
              {checkPasswordUppercase ? "✓" : ""}
            </span>
            <span className={`text-sm ${checkPasswordUppercase ? "text-green-600" : "text-gray-600"}`}>
              Doit contenir au moins une lettre majuscule
            </span>
          </div>
  
          <div className="flex items-center mt-2">
            <span
              className={`mr-2 text-xl ${checkPasswordNumber ? "text-green-500" : "text-gray-400"}`}
            >
              {checkPasswordNumber ? "✓" : ""}
            </span>
            <span className={`text-sm ${checkPasswordNumber ? "text-green-600" : "text-gray-600"}`}>
              Doit contenir au moins un chiffre
            </span>
          </div>
  
          <div className="flex items-center mt-2">
            <span
              className={`mr-2 text-xl ${checkPasswordSpecial ? "text-green-500" : "text-gray-400"}`}
            >
              {checkPasswordSpecial ? "✓" : ""}
            </span>
            <span className={`text-sm ${checkPasswordSpecial ? "text-green-600" : "text-gray-600"}`}>
              Doit contenir un caractère spécial (@$!%*?&)
            </span>
          </div>
        </div>
  
        <button
          onClick={handleSignUp}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
        >
          S&apos;inscrire
        </button>
  
        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
  
        <p className="mt-4 text-center text-gray-700 text-sm">
          Vous avez déjà un compte ?{" "}
          <Link href="/login" className="text-green-600 hover:underline">
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  );
  
}
