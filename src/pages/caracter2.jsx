import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
//import './Caractere2.css';

function Caractere2() {
  const navigate = useNavigate(); // Hook pour la navigation

  const messages = [
    "Pas mal, pas mal..",
    "Prêt pour le prochain ?"
  ];

  const sounds = [
    new Audio('./src/assets/sounds/typewriter1.mp3'),
    new Audio('./src/assets/sounds/typewriter2.mp3')
  ];

  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [fadeOut, setFadeOut] = useState(false); // Pour gérer l'effet de transition de disparition

  // Fonction pour afficher le texte lettre par lettre
  useEffect(() => {
    const text = messages[currentMessage];
    let i = 0;
    setDisplayedText('');
    setIsTyping(true);

    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text[i]);
        i++;
      } else {
        setIsTyping(false); // Lorsque le texte est entièrement affiché
        clearInterval(interval);
      }
    }, 50); // Vous pouvez ajuster cette valeur pour contrôler la vitesse de l'affichage

    return () => clearInterval(interval);
  }, [currentMessage]);

  // Fonction qui gère le passage à la bulle suivante après un clic
  const handleNextBubble = () => {
    if (isTyping) return; // Empêcher de passer à la prochaine bulle pendant que le texte est encore en train de s'afficher

    sounds[currentMessage].play();

    if (currentMessage < messages.length - 1) {
      setCurrentMessage((prev) => prev + 1); // Passer à la bulle suivante
    } else {
      // Une fois que le texte est complet, on applique un fade-out avant de rediriger
      setFadeOut(true);
      setTimeout(() => {
        navigate('/wordle'); // Rediriger vers la page WordleGame après la fin de l'animation
      }, 1000); // Délai pour laisser le temps de l'effet de fade-out
    }
  };

  return (
    <div className={`caractere2 ${fadeOut ? 'fade-out' : ''}`} onClick={handleNextBubble}>
      <div className="character-container">
        <div className="character">
          <img src="./src/assets/character.png" alt="Personnage" className="character-image" />
          <div className="bubble">{displayedText}</div>
        </div>
      </div>
    </div>
  );
}

export default Caractere2;
