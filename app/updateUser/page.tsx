"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../_components/Header";
import { User, getCurrentUser, updateUserEmail, updateUserPassword } from '../utils/localStorageUtils';

export default function UpdateUser() {
  const router = useRouter();

  const currentUser: User | null = getCurrentUser();

  if (!currentUser) {
    router.push("/login");
  }

  const [, setEmail] = useState(currentUser?.email || ""); 
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleUpdateEmail = () => {
    if (newEmail === "") {
      setEmailError("Veuillez entrer un nouvel e-mail.");
      return;
    }

    updateUserEmail(newEmail);
    setEmail(newEmail); 
    setEmailError(""); 
  };

  const handleUpdatePassword = () => {
    if (password !== currentUser?.password) {
      setPasswordError("L'ancien mot de passe est incorrect.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (newPassword === "") {
      setPasswordError("Veuillez entrer un nouveau mot de passe.");
      return;
    }

    updateUserPassword(newPassword);
    setPassword(""); 
    setNewPassword(""); 
    setConfirmPassword(""); 
    setPasswordError(""); 
    setConfirmPasswordError(""); 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-6">
          Modifier vos informations
        </h1>

        <div className="bg-blue-100 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Modifier votre adresse e-mail</h2>
          <input
            type="email"
            placeholder="Nouvelle adresse e-mail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="py-2 px-6 border border-gray-300 rounded-lg mb-2 mr-4"
          />
          {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
          <button
            onClick={handleUpdateEmail}
            className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 mt-4"
          >
            Mettre à jour l&apos;adresse e-mail
          </button>
        </div>

        <div className="bg-green-100 flex flex-col p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Modifier votre mot de passe</h2>
          <input
            type="password"
            placeholder="Ancien mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-2 px-6 border border-gray-300 rounded-lg mb-2"
          />
          {passwordError && <p className="text-red-600 text-sm">{passwordError}</p>}
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="py-2 px-6 border border-gray-300 rounded-lg mb-2"
          />
          <input
            type="password"
            placeholder="Retapez le nouveau mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="py-2 px-6 border border-gray-300 rounded-lg mb-2"
          />
          {confirmPasswordError && <p className="text-red-600 text-sm">{confirmPasswordError}</p>}
          <button
            onClick={handleUpdatePassword}
            className="py-2 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 mt-4"
          >
            Mettre à jour le mot de passe
          </button>
        </div>

        <button 
        onClick={() => router.push("/Dashboard")}
        className="py-2 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 mt-4"
        >
        Retour au Dashboard
        </button>

      </div>
    </div>
  );
}
