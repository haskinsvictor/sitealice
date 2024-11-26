import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook de navigation
import './caracter1.css'; // Assurez-vous d'inclure le CSS si nécessaire

function Caractere1() {
  const navigate = useNavigate(); // Hook de navigation

  const messages = [
    "Premier jeu ? Le test d'amitié.",
    "Essaie de t'aligner avec les réponses de Victor Baha."
  ];

  const sounds = [
    new Audio('./src/assets/sounds/typewriter1.mp3'),
    new Audio('./src/assets/sounds/typewriter2.mp3')
  ];

  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [gameStarted, setGameStarted] = useState(true); // Le jeu commence immédiatement
  const [fadeOutButtons, setFadeOutButtons] = useState(false);

  useEffect(() => {
    if (!gameStarted) return;

    const text = messages[currentMessage];
    let i = 0;
    setDisplayedText('');
    setIsTyping(true);

    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text[i]);
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentMessage, gameStarted]);

  const handleNextBubble = () => {
    if (isTyping) return;

    sounds[currentMessage].play();

    if (currentMessage < messages.length - 1) {
      setCurrentMessage((prev) => prev + 1);
    } else {
      document.querySelector('.caractere1').classList.add('fade-out');
      setTimeout(() => {
        navigate('/questionnaire'); // Rediriger vers le questionnaire après la dernière bulle
      }, 1000);
    }
  };

  return (
    <div className="caractere1">
      {/* Le jeu commence immédiatement, sans bouton */}
      <div className="character-container fade-in">
        <div className="character" onClick={handleNextBubble}>
          <img src="./src/assets/character.png" alt="Personnage" className="character-image" />
          <div className="bubble">{displayedText}</div>
        </div>
      </div>
    </div>
  );
}

export default Caractere1;
