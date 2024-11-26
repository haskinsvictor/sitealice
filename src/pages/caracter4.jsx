import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Caractere4() {
  const navigate = useNavigate(); // Hook de navigation

  // Messages affichés dans les bulles
  const messages = [
    "C'est fini !",
    "Je suis impressionné par ta vivacité d'esprit HAHA !",
    "Victor t'apportera ton cadeau dès qu'il te voit ! À très vite et repose-toi bien !"
  ];

  // Sons associés à chaque bulle
  const sounds = [
    new Audio('./src/assets/sounds/typewriter1.mp3'),
    new Audio('./src/assets/sounds/typewriter2.mp3'),
    new Audio('./src/assets/sounds/typewriter3.mp3')
  ];

  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [gameStarted, setGameStarted] = useState(true); // Le jeu commence immédiatement

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
    if (isTyping) return; // Ignorer les clics pendant la frappe

    sounds[currentMessage].play();

    if (currentMessage < messages.length - 1) {
      setCurrentMessage((prev) => prev + 1);
    } else {
      document.querySelector('.caractere1').classList.add('fade-out');
      setTimeout(() => {
        navigate('/end'); // Rediriger vers la page finale après la dernière bulle
      }, 1000);
    }
  };

  return (
    <div className="caractere1">
      <div className="character-container fade-in">
        <div className="character" onClick={handleNextBubble}>
          <img src="./src/assets/character.png" alt="Personnage" className="character-image" />
          <div className="bubble">{displayedText}</div>
        </div>
      </div>
    </div>
  );
}

export default Caractere4;
