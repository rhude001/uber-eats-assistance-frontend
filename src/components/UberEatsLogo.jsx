const UberEatsLogo = ({ size = 40 }) => {
  return (
    <div className="relative">
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:scale-105 transition-transform duration-300"
      >
        {/* Fond noir Uber */}
        <rect width="40" height="40" rx="8" fill="#000000"/>
        
        {/* Cercle blanc */}
        <circle cx="20" cy="20" r="12" fill="white"/>
        
        {/* Point vert Uber Eats */}
        <circle cx="20" cy="20" r="6" fill="#06C167"/>
        
        {/* Barre du U */}
        <rect x="18" y="25" width="4" height="8" rx="2" fill="white"/>
      </svg>
      
      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-green-500/0 group-hover:from-green-500/10 group-hover:to-emerald-500/10 rounded-lg transition-all duration-500"></div>
    </div>
  );
};

export default UberEatsLogo;