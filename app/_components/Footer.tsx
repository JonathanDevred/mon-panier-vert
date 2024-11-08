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
              <Link href="/contact" className="text-lg text-gray-400 hover:text-green-400 transition duration-200">Contact</Link>
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 2h-3a4 4 0 00-4 4v3H7v4h4v10h4V13h4l1-4h-5V6a1 1 0 011-1h3z"></path>
                </svg>
              </Link>
              <Link href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-green-400 transition duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 4.01c-.77.34-1.6.57-2.46.67A4.48 4.48 0 0021.37 3c-.88.52-1.87.89-2.91 1.09a4.52 4.52 0 00-7.73 4.13A12.86 12.86 0 011.64 3.15a4.52 4.52 0 001.4 6.04A4.46 4.46 0 012 8.44c-.02 1.6.86 3.12 2.16 3.94a4.49 4.49 0 01-2.04-.57v.06a4.5 4.5 0 003.62 4.41A4.46 4.46 0 012 18.1c-.74 0-1.48-.07-2.2-.21a12.9 12.9 0 007 2.04c8.36 0 12.94-6.93 12.94-12.94 0-.2-.01-.39-.03-.58A9.15 9.15 0 0022 4.01z"></path>
                </svg>
              </Link>
              <Link href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-green-400 transition duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8a6 6 0 10-8 0 6 6 0 008 0zM12 2c2.2 0 4.2.9 5.6 2.4C18.1 5.8 18 7.9 18 10c0 1.5-.3 3-1 4.4-.7 1.3-1.6 2.4-2.9 3.3-1.3.9-2.7 1.6-4.1 2.1-1.4.5-2.8.8-4.2 1-.7.1-1.4-.1-2-.5-.5-.4-.8-.9-.8-1.4v-3c0-.5.2-1 .7-1.3.5-.3 1-.4 1.5-.4 1.6 0 3.2-.4 4.5-1.3 1.3-.9 2.2-2.1 2.8-3.6.5-1.5.7-3.1.4-4.7-.3-1.6-1.1-3-2.2-4-1.1-1.1-2.6-1.7-4.2-1.7-3.7 0-6.8 2.9-6.8 6.7 0 2.5 1.4 4.8 3.5 6.1 2.2 1.3 4.9 2.1 7.6 2.1s5.4-.8 7.6-2.1c2.1-1.3 3.5-3.6 3.5-6.1 0-3.8-3.1-6.7-6.8-6.7z"></path>
                </svg>
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
