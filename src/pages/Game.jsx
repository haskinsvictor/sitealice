import React, { useState } from 'react';
import Questionnaire from '../components/Questionnaire'; // Assurez-vous que Questionnaire est bien importé

function Game() {
  const [gameStep, setGameStep] = useState(0); // 0: affichage de la bulle, 1: questionnaire
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isBubbleClicked, setIsBubbleClicked] = useState(false); // Etat pour gérer le clic sur la bulle
  const [hasTextDisplayed, setHasTextDisplayed] = useState(false); // Etat pour vérifier si le texte a été complètement affiché

  const message = "Prêt pour le prochain jeu ?";

  const startTypingMessage = () => {
    let i = 0;
    setDisplayedText('');
    setIsTyping(true);

    const interval = setInterval(() => {
      if (i < message.length) {
        setDisplayedText((prev) => prev + message[i]);
        i++;
      } else {
        setIsTyping(false);
        setHasTextDisplayed(true); // Le texte est maintenant affiché
        clearInterval(interval);
      }
    }, 50);
  };

  const handleBubbleClick = () => {
    if (!isTyping && hasTextDisplayed) {
      setIsBubbleClicked(true); // Marque que la bulle a été cliquée
      setGameStep(1); // Passe à l'étape 1 : afficher le questionnaire
    }
  };

  return (
    <div className="game" onClick={() => { if (!hasTextDisplayed) startTypingMessage(); }}>
      {!isBubbleClicked ? (
        <div className="character-container fade-in">
          <div className="character">
            <img src="./src/assets/character.png" alt="Personnage" className="character-image" />
            <div className="bubble" onClick={handleBubbleClick}>
              {displayedText}
            </div>
          </div>
        </div>
      ) : (
        gameStep === 1 && <Questionnaire /> // Affichage du questionnaire après avoir cliqué sur la bulle
      )}
    </div>
  );
}

export default Game;
