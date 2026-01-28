import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import FormModal from './FormModal';

const HomePage = ({ formData, setFormData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSituation, setSelectedSituation] = useState('');
  const navigate = useNavigate();

  const handleSituationSelect = (situation) => {
    setSelectedSituation(situation);
    setFormData(prev => ({ ...prev, situation }));
    setIsModalOpen(true);
  };

  const situations = [
    {
      id: 'waiting',
      title: '🕐 Compte Uber Eats en Liste d\'Attente',
      description: 'Votre compte est en attente de validation ou de vérification',
      features: [
        'Temps d\'attente prolongé',
        'Validation en cours',
        'Documents en attente'
      ],
      color: 'border-blue-500 hover:bg-blue-50'
    },
    {
      id: 'blocked',
      title: '🚫 Compte Uber Eats Bloqué',
      description: 'Votre compte a été suspendu ou restreint',
      features: [
        'Accès impossible',
        'Transactions bloquées',
        'Suspension active'
      ],
      color: 'border-red-500 hover:bg-red-50'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-3 group">
                {/* Logo animé */}
                <div className="relative w-14 h-14">
                {/* Cercle externe animé */}
                <div className="absolute inset-0 border-2 border-green-400/30 rounded-full animate-ping"></div>
                
                {/* Logo principal */}
                <div className="relative w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-green-500/20 transition-shadow duration-300">
                    {/* U animé */}
                    <div className="relative w-10 h-10">
                    <div className="absolute inset-0 border-3 border-white rounded-full group-hover:border-green-400 transition-colors duration-300"></div>
                    <div className="absolute inset-3 bg-green-500 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-white rounded-full group-hover:h-4 transition-all duration-300"></div>
                    </div>
                    
                    {/* Points lumineux */}
                    <div className="absolute top-2 left-2 w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-2 right-2 w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                </div>
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 group-hover:text-black transition-colors">
                Uber Eats <span className="text-green-500 group-hover:text-green-600 transition-colors">Assistance</span>
                </h1>
            </div>
        </div>
        
        <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
          Service d'assistance technique dédié aux partenaires Uber Eats
        </p>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-xl p-6 max-w-2xl mx-auto mb-8 shadow-sm">
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
        <span className="text-white text-xl">⚡</span>
      </div>
    </div>
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        Activation et déblocage de votre compte Uber
      </h3>
      <div className="space-y-2">
        <div className="flex items-center text-green-800">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold">Durée :</span>
          <span className="ml-1">2 heures</span>
        </div>
        <div className="flex items-center text-green-800">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold">Prise en charge :</span>
          <span className="ml-1">100% assurée par l'assistance Uber</span>
        </div>
      </div>
      <p className="text-sm text-green-700 mt-3">
        Notre équipe technique intervient rapidement pour résoudre votre problème de compte.
      </p>
    </div>
  </div>
</div>
      </div>

        {/* Situation Selection - VERSION DÉGRADÉ UBER */}
      <div className="mb-16">
        
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Bouton avec dégradé bleu */}
          <button
            onClick={() => handleSituationSelect('waiting')}
            className="relative bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-6 text-left transition-all duration-300 hover:shadow-lg hover:border-blue-300 group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500 opacity-5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white text-xl">🕐</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Compte en attente
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Votre compte Uber Eats est en liste d'attente pour validation.
              </p>
              
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <span>Sélectionner</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          {/* Bouton avec dégradé rouge */}
          <button
            onClick={() => handleSituationSelect('blocked')}
            className="relative bg-gradient-to-br from-red-50 to-white border border-red-200 rounded-xl p-6 text-left transition-all duration-300 hover:shadow-lg hover:border-red-300 group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-500 opacity-5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white text-xl">🚫</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Compte bloqué
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Votre compte Uber Eats a été suspendu ou restreint.
              </p>
              
              <div className="flex items-center text-red-600 text-sm font-medium">
                <span>Sélectionner</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-gray-800 text-white rounded-2xl p-8 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-center">
          ⚡ Processus Rapide & Sécurisé
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">1</span>
            </div>
            <h4 className="font-bold text-lg mb-2">Sélection</h4>
            <p className="text-gray-300">Choisissez votre type de problème</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">2</span>
            </div>
            <h4 className="font-bold text-lg mb-2">Formulaire</h4>
            <p className="text-gray-300">Remplissez vos informations</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">3</span>
            </div>
            <h4 className="font-bold text-lg mb-2">Envoi</h4>
            <p className="text-gray-300">Envoyez vos informations</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <FormModal
            situation={selectedSituation}
            formData={formData}
            setFormData={setFormData}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default HomePage;