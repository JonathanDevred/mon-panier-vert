"use client";

import { useRouter } from "next/navigation";
import { getCurrentUser, logoutUser, deleteUserAccount } from "../utils/localStorageUtils"; 
import Header from "../_components/Header";

export default function DashboardPage() {
  const currentUser = getCurrentUser(); 
  const router = useRouter();

  if (!currentUser) {
    router.push("/login");
  }

  const handleLogout = () => {
    logoutUser(); 
    router.push("/login"); 
  };

  const handleDeleteAccount = () => {
    deleteUserAccount();
    router.push("/login");
  };

  const handleUpdateEmailOrPassword = () => {
    router.push("/updateUser"); 
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
        <Header />
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-6">Bienvenue, {currentUser?.email}!</h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Voici votre tableau de bord. Vous pouvez gérer votre compte, consulter votre panier, ou vous déconnecter.
        </p>

        <div className="bg-green-100 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Votre Panier</h2>
          <p className="text-gray-600 mb-6">
            Il semble que vous n&apos;ayez encore rien ajouté à votre panier. Commencez à acheter des fruits et légumes !
          </p>
          <button 
            onClick={() => router.push("/cart")} 
            className="w-full sm:w-auto py-2 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300">
            Aller au panier
          </button>
        </div>

        <div className="bg-blue-100 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Modifier votre compte</h2>
          <p className="text-gray-600 mb-6">
            Vous pouvez modifier votre adresse e-mail ou changer votre mot de passe.
          </p>
          <button 
            onClick={handleUpdateEmailOrPassword} 
            className="w-full sm:w-auto py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            Modifier vos informations
          </button>
        </div>

        <div className="bg-red-100 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">Supprimer votre compte</h2>
          <p className="text-gray-600 mb-6">
            Si vous souhaitez supprimer définitivement votre compte, vous pouvez le faire ici. Cette action est irréversible.
          </p>
          <button 
            onClick={handleDeleteAccount} 
            className="w-full sm:w-auto py-2 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300">
            Supprimer mon compte
          </button>
        </div>

        <div className="text-center">
          <button 
            onClick={handleLogout} 
            className="py-2 px-6 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300">
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}
