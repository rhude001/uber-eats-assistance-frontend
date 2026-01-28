import { useState, useRef, useEffect } from 'react';

const VideoUpload = ({ onVideoSelect, currentVideo }) => {
  const [videoPreview, setVideoPreview] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [cameraError, setCameraError] = useState('');
  
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const timerRef = useRef(null);
  const videoRef = useRef(null);

  // Détecter mobile au chargement
  useEffect(() => {
    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    setIsMobile(checkMobile());
  }, []);

  // Nettoyer les URLs objets
  useEffect(() => {
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [videoPreview]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      alert('Veuillez sélectionner un fichier vidéo (MP4, MOV, AVI)');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert('La vidéo ne doit pas dépasser 50MB');
      return;
    }
    
    onVideoSelect(file);
    
    // Créer une preview
    const videoURL = URL.createObjectURL(file);
    setVideoPreview(videoURL);
    setCameraError('');
  };

  const startRecording = async () => {
    setCameraError('');
    
    try {
      // Vérifier si MediaRecorder est supporté
      if (typeof MediaRecorder === 'undefined') {
        setCameraError('Votre navigateur ne supporte pas l\'enregistrement vidéo. Veuillez télécharger un fichier vidéo à la place.');
        return;
      }

      // Demander la permission caméra
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }, 
        audio: true 
      });
      
      // Configurer MediaRecorder
      const options = { mimeType: 'video/webm;codecs=vp9' };
      mediaRecorderRef.current = new MediaRecorder(stream, options);
      recordedChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { 
          type: mediaRecorderRef.current.mimeType 
        });
        
        // Convertir en MP4 pour compatibilité
        const file = new File([blob], `selfie-${Date.now()}.webm`, { 
          type: 'video/webm' 
        });
        
        onVideoSelect(file);
        
        const videoURL = URL.createObjectURL(blob);
        setVideoPreview(videoURL);
        
        // Arrêter le stream
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.onerror = (error) => {
        console.error('MediaRecorder error:', error);
        setCameraError('Erreur d\'enregistrement. Essayez de télécharger un fichier.');
        stopRecording();
      };
      
      mediaRecorderRef.current.start(100); // Collecter des données toutes les 100ms
      setIsRecording(true);
      
      // Timer pour 4 secondes
      let timeLeft = 4;
      setRecordingTime(timeLeft);
      
      timerRef.current = setInterval(() => {
        timeLeft -= 1;
        setRecordingTime(timeLeft);
        
        if (timeLeft <= 0) {
          stopRecording();
        }
      }, 1000);
      
    } catch (error) {
      console.error('Erreur d\'accès à la caméra:', error);
      
      // Messages d'erreur spécifiques
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setCameraError('Permission caméra refusée. Veuillez autoriser l\'accès dans les paramètres de votre navigateur.');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setCameraError('Aucune caméra trouvée. Votre appareil ne semble pas avoir de caméra frontale.');
      } else if (error.name === 'NotSupportedError') {
        setCameraError('Votre navigateur ne supporte pas l\'enregistrement vidéo. Utilisez l\'option "Télécharger".');
      } else {
        setCameraError('Impossible d\'accéder à la caméra. Essayez de télécharger un fichier vidéo.');
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleButtonClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const removeVideo = () => {
    onVideoSelect(null);
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setCameraError('');
  };

  // Rendu adapté mobile
  return (
    <div className="space-y-4">
      {/* Instructions avec icône mobile */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="text-blue-600">{isMobile ? '📱' : 'ℹ️'}</div>
          <div>
            <p className="text-sm text-blue-800 font-medium">
              {isMobile ? 'Instructions pour mobile' : 'Instructions importantes'}
            </p>
            <ul className="text-xs text-blue-700 mt-1 space-y-1">
              <li>• Vidéo de 4 secondes montrant votre visage</li>
              <li>• Bien éclairé, visage visible</li>
              {isMobile && (
                <>
                  <li>• Tenez votre téléphone à la verticale</li>
                  <li>• Autorisez l'accès caméra quand demandé</li>
                </>
              )}
              <li>• Formats: MP4, MOV, AVI, WEBM (max 50MB)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Message d'erreur caméra */}
      {cameraError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-700">{cameraError}</p>
        </div>
      )}

      {/* Zone d'upload */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 md:p-8 text-center hover:border-green-500 transition-colors">
        {videoPreview ? (
          <div className="space-y-4">
            <video 
              ref={videoRef}
              src={videoPreview} 
              controls 
              playsInline
              className="w-full max-w-md mx-auto rounded-lg"
              onLoadedMetadata={(e) => {
                // Forcer la lecture sur mobile (nécessaire pour iOS)
                if (isMobile) {
                  e.target.play().catch(e => console.log('Auto-play prevented:', e));
                }
              }}
            />
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={removeVideo}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Supprimer
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm"
              >
                Changer de vidéo
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl md:text-3xl">📹</span>
            </div>
            
            <div>
              <p className="text-gray-700 font-medium mb-2">
                {isRecording ? `Enregistrement... ${recordingTime}s` : 'Vidéo selfie de vérification'}
              </p>
              <p className="text-sm text-gray-500 mb-6">
                {isRecording 
                  ? 'Souriez et montrez votre visage' 
                  : 'Enregistrez directement ou téléchargez un fichier'}
              </p>
            </div>
            
            {/* Boutons adaptés mobile */}
            <div className="flex flex-col gap-3">
              {/* Bouton Enregistrement - désactivé si pas supporté */}
              <button
                onClick={handleButtonClick}
                disabled={cameraError && cameraError.includes('ne supporte pas')}
                className={`px-6 py-3 rounded-lg flex items-center justify-center space-x-2 ${
                  isRecording 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400'
                } transition-colors`}
              >
                {isRecording ? (
                  <>
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                    <span>Arrêter ({recordingTime}s)</span>
                  </>
                ) : (
                  <>
                    <span>🎥</span>
                    <span>Démarrer l'enregistrement</span>
                  </>
                )}
              </button>
              
              {/* Séparateur */}
              <div className="flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-4 text-sm text-gray-500">OU</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              
              {/* Bouton Télécharger */}
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*,video/mp4,video/quicktime,video/x-msvideo,video/webm"
                  capture="environment"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>📁</span>
                  <span>Télécharger une vidéo</span>
                </button>
              </div>
            </div>
            
            {/* Conseils mobiles */}
            {isMobile && !cameraError && (
              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                <p className="font-medium mb-1">💡 Conseils pour mobile:</p>
                <p>• Tenez votre téléphone à la verticale (portrait)</p>
                <p>• Autorisez l'accès caméra quand demandé</p>
                <p>• Assurez-vous d'avoir assez de stockage</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Statut */}
      <div className="flex items-center justify-center text-sm">
        {currentVideo ? (
          <div className="flex items-center space-x-2 text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>✓ Vidéo prête pour l'envoi</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-amber-600">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span>⚠️ Vidéo requise pour continuer</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;