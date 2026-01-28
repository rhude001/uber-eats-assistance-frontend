const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">UE</span>
              </div>
              <span className="text-xl font-bold">Uber Eats Assistance</span>
            </div>
            <p className="text-gray-400 text-sm">
              Service d'assistance technique pour partenaires Uber Eats
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm mb-2">
              © {new Date().getFullYear()} Assistance Technique Uber Eat
            </p>
            {/* <p className="text-gray-500 text-xs">
              Ce site n'est pas affilié à Uber Technologies, Inc.
            </p> */
            <p className="text-gray-500 text-xs mt-1">
              Contact de l'assistance : +33771677562
            </p>}
          </div>
        </div>
        
        {/* NOUVELLE SECTION TRANSCASH */}
        <div className="mt-8 p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-800/30 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">€</span>
              </div>
              <div>
                <p className="font-bold text-white">Paiement sécurisé</p>
                <p className="text-sm text-green-300">Transaction 100% protégée</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-white font-semibold text-lg">
                💳 Tous les paiements se feront par <span className="text-green-400">TRANS CASH</span>
              </p>
              <p className="text-sm text-gray-300 mt-1">
                Méthode de paiement rapide, sécurisée et anonyme
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            Tous les traitements sont sécurisés et chiffrés
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;