import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pick.css';

function Pick() {
  const navigate = useNavigate();

  // Paramètres du jeu
  const totalVagues = 5; // Nombre total de vagues
  const maxTimePerWave = 5; // Temps maximum par vague en secondes

  // États du jeu
  const [currentWave, setCurrentWave] = useState(0); // Indice de la vague actuelle
  const [buttons, setButtons] = useState([]); // Boutons de la vague en cours
  const [clickedButtons, setClickedButtons] = useState(0); // Nombre de boutons cliqués dans la vague actuelle
  const [timeLeft, setTimeLeft] = useState(maxTimePerWave); // Temps restant pour la vague actuelle
  const [showPopup, setShowPopup] = useState(false); // Affichage du popup en cas de timeout

  // Son pour le clic sur un bouton
  const splashSound = new Audio('../src/assets/sounds/splash.mp3');

  // Fonction pour générer des boutons pour une vague
  const generateButtonsForWave = () => {
    const numberOfButtons = currentWave + 1; // Nombre de boutons pour la vague (1 à 5)
    const newButtons = [];
    for (let i = 0; i < numberOfButtons; i++) {
      const randomX = Math.random() * 80 + '%'; // Position X aléatoire (entre 0 et 80%)
      const randomY = Math.random() * 80 + '%'; // Position Y aléatoire (entre 0 et 80%)
      newButtons.push({
        id: i,
        x: randomX,
        y: randomY,
        clicked: false, // Marque si un bouton a été cliqué
        scale: 1, // Taille initiale du bouton
      });
    }
    setButtons(newButtons);
    setTimeLeft(maxTimePerWave); // Réinitialiser le timer
    setShowPopup(false); // Masquer le popup s'il était affiché
  };

  // Fonction pour gérer le clic sur un bouton
  const handleButtonClick = (id) => {
    if (buttons[id].clicked) return; // Si le bouton est déjà cliqué, on ne fait rien

    splashSound.play(); // Jouer le son de splash

    // Mettre à jour l'état du bouton comme cliqué
    const updatedButtons = buttons.map((button) =>
      button.id === id ? { ...button, clicked: true, scale: button.scale + 0.5 } : button
    );
    setButtons(updatedButtons);
    setClickedButtons((prev) => prev + 1); // Incrémenter le nombre de boutons cliqués

    // Vérifier si tous les boutons ont été cliqués
    if (clickedButtons + 1 === buttons.length) {
      if (currentWave === totalVagues - 1) {
        // Jeu gagné, rediriger vers la page suivante
        setTimeout(() => navigate('/caractere4'), 1000);
      } else {
        // Passer à la vague suivante
        setCurrentWave((prevWave) => prevWave + 1);
      }
    }
  };

  // Gestion du timer
  useEffect(() => {
    if (timeLeft <= 0) {
      // Temps écoulé, afficher le popup
      setShowPopup(true);
      return;
    }

    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);

    return () => clearTimeout(timer); // Nettoyer le timer pour éviter les conflits
  }, [timeLeft]);

  // Initialiser les boutons au démarrage du jeu ou après chaque vague
  useEffect(() => {
    if (currentWave < totalVagues) {
      generateButtonsForWave();
      setClickedButtons(0); // Réinitialiser le nombre de boutons cliqués
    }
  }, [currentWave]);

  // Fonction pour recommencer la vague actuelle
  const restartWave = () => {
    generateButtonsForWave();
    setShowPopup(false); // Masquer le popup
  };

  return (
    <div className="pick-game">
      {/* Boutons */}
      {buttons.map((button) => (
        !button.clicked && (
          <div
            key={button.id}
            className="button"
            style={{
              top: button.y,
              left: button.x,
              transform: `scale(${button.scale})`,
              transition: 'transform 0.3s ease-in-out',
            }}
            onClick={() => handleButtonClick(button.id)}
          >
            <img src="./src/assets/img/button.jpg" alt="Button" />
          </div>
        )
      ))}

      {/* Informations de vague et de timer */}
      <div className="wave-info">
        <p>Vague {currentWave + 1} sur {totalVagues}</p>
        <p>{timeLeft}s</p>
      </div>

      {/* Popup en cas de timeout */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Le temps est écoulé ! Voulez-vous recommencer cette vague ?</p>
            <button onClick={restartWave}>Recommencer</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pick;
