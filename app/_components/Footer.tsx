import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center space-x-3 mb-6">
            <Image src="/logo-panier.svg" alt="Logo Mon Panier Vert" width={100} height={42} />
            <h1 className="text-3xl font-bold text-green-400">Mon Panier Vert</h1>
            </Link>
            <p className="text-lg text-gray-400">
              Découvrez une sélection de fruits et légumes frais, directement chez vous. Nous nous engageons à vous offrir la meilleure qualité pour une alimentation saine et savoureuse.
            </p>
          </div>

          <div className="flex flex-col space-y-4 md:grid md:grid-cols-2 md:gap-6">
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-green-400">Navigation</h2>
              <Link href="/fruits" className="text-lg text-gray-400 hover:text-green-400 transition duration-200">Fruits</Link>
              <Link href="/vegetables" className="text-lg text-gray-400 hover:text-green-400 transition duration-200">Légumes</Link>
              <Link href="/about" className="text-lg text-gray-400 hover:text-green-400 transition duration-200">À propos</Link>
              <Link href="/Dashboard" className="text-lg text-gray-400 hover:text-green-400 transition duration-200">Mon Compte</Link>
              <Link href="/faq" className="text-lg text-gray-400 hover:text-green-400 transition duration-200">FAQ</Link>
              <Link href="/privacy-policy" className="text-lg text-gray-400 hover:text-green-400 transition duration-200">Politique de confidentialité</Link>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold text-green-400">Informations</h2>
            <Link href="/privacy-policy" className="text-lg text-gray-400 hover:text-green-400 transition duration-200">Politique de confidentialité</Link>
            <Link href="/terms-of-service" className="text-lg text-gray-400 hover:text-green-400 transition duration-200">Conditions d&apos;utilisation</Link>
            <Link href="/returns" className="text-lg text-gray-400 hover:text-green-400 transition duration-200">Retours</Link>

            <div className="flex space-x-6 mt-4">
              <Link href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-green-400 transition duration-200">
              <Image src={"/facebook.svg"} alt="facebook logo" height={20} width={20}/>
              </Link>
              <Link href="https://whatsapp.com" target="_blank" className="text-gray-400 hover:text-green-400 transition duration-200">
              <Image src={"/whatsapplogo.svg"} alt="whatsapp logo" height={20} width={20}/>
              </Link>
              <Link href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-green-400 transition duration-200">
              <Image src={"/instagram.svg"} alt="whatsapp logo" height={20} width={20}/>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
          <p className="text-sm">© {new Date().getFullYear()} Mon Panier Vert. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
