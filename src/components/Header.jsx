import UberEatsLogo from './UberEatsLogo';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo avec composant SVG */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <UberEatsLogo size={44} />
            
            <div>
              <div className="flex items-baseline space-x-1">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                  Uber
                </h1>
                <span className="text-2xl font-black text-green-500">Eats</span>
              </div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Support Technique
              </p>
            </div>
          </div>
          
          {/* Badge */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-gray-700">Service actif</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;