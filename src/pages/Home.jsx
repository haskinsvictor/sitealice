import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import characterImg from '/src/assets/character.png'; // Corrigé pour une importation correcte

function Home() {
  const navigate = useNavigate();

  const messages = [
    "Salut Alice ! Content de te revoir !",
    "Un fan souhaite t'offrir quelque chose !",
    "Mais il est plutôt joueur, alors pour obtenir ton cadeau tu dois résoudre 3 énigmes !",
    "Tu veux tenter ta chance ?"
  ];

  const sounds = [
    new Audio('./src/assets/sounds/typewriter1.mp3'),
    new Audio('./src/assets/sounds/typewriter2.mp3'),
    new Audio('./src/assets/sounds/typewriter3.mp3'),
    new Audio('./src/assets/sounds/typewriter4.mp3')
  ];

  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
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

  const handleStartGame = () => {
    setFadeOutButtons(true);
    setTimeout(() => setGameStarted(true), 1000);
    sounds[0].play();
  };

  const handleNextBubble = () => {
    if (isTyping) return;

    sounds[currentMessage].play();

    if (currentMessage < messages.length - 1) {
      setCurrentMessage((prev) => prev + 1);
    } else {
      document.querySelector('.home').classList.add('fade-out');
      setTimeout(() => {
        navigate('/caractere1');
      }, 1000);
    }
  };

  return (
    <div className="home">
      {!gameStarted ? (
        <div className={`button-container ${fadeOutButtons ? 'fade-out' : ''}`}>
          <button onClick={handleStartGame}>Démarrer</button>
          <button onClick={() => navigate('/comics')}>Lire une BD</button>
        </div>
      ) : (
        <div className="character-container fade-in">
          <div className="character" onClick={handleNextBubble}>
            <img src={characterImg} alt="Personnage" className="character-image" />
            <div className="bubble">{displayedText}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
