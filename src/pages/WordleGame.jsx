import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importer useNavigate
import './WordleGame.css';

function WordleGame() {
  const navigate = useNavigate(); // Hook de navigation

  const targetWord = "PIGEON";
  const maxAttempts = 5;
  const [currentAttempt, setCurrentAttempt] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Fonction pour déterminer l'état d'une lettre
  const getLetterStatus = (letter, index) => {
    if (letter === targetWord[index]) {
      return 'correct';  // La lettre est à la bonne position
    }
    if (targetWord.includes(letter)) {
      return 'present';  // La lettre est dans le mot mais à une autre position
    }
    return 'absent';  // La lettre n'est pas dans le mot
  };

  const handleInputChange = (e) => {
    setCurrentAttempt(e.target.value.toUpperCase());
  };

  const handleSubmitAttempt = () => {
    if (currentAttempt.length !== targetWord.length || gameOver) return;

    const newAttempts = [...attempts, currentAttempt];
    setAttempts(newAttempts);

    if (currentAttempt === targetWord) {
      setGameOver(true);
      setGameWon(true);
    } else if (newAttempts.length >= maxAttempts) {
      setGameOver(true);
    }

    setCurrentAttempt('');
  };

  // Fonction pour gérer le clic une fois le jeu terminé
  const handleGameOverClick = () => {
    if (gameOver) {
      // Rediriger vers Caractere3 après un clic
      navigate('/caractere3');  // Changez la route pour correspondre à votre page Caractere3
    }
  };

  return (
    <div className="wordle-game" onClick={handleGameOverClick}>
      <h2>Wordle : Trouve le mot en {maxAttempts} essais ! ( 6 lettres )</h2>

      <div className="game-container fade-in">
        <div className="attempts">
          {attempts.map((attempt, attemptIndex) => (
            <div key={attemptIndex} className="attempt">
              {attempt.split('').map((letter, letterIndex) => (
                <span
                  key={letterIndex}
                  className={`letter ${getLetterStatus(letter, letterIndex)}`}
                >
                  {letter}
                </span>
              ))}
            </div>
          ))}
          {!gameOver && (
            <div className="current-attempt">
              {currentAttempt.split('').map((letter, index) => (
                <span key={index} className="letter">
                  {letter}
                </span>
              ))}
            </div>
          )}
        </div>

        {!gameOver && (
          <div className="input-container">
            <input
              type="text"
              maxLength={targetWord.length}
              value={currentAttempt}
              onChange={handleInputChange}
              placeholder="Tape ton essai"
            />
            <button onClick={handleSubmitAttempt}>Valider</button>
          </div>
        )}

        {gameOver && (
          <div className="game-result">
            {gameWon ? (
              <p>Bravo ! Tu as trouvé le mot !</p>
            ) : (
              <p>Oh non ! Le mot était : {targetWord}</p>
            )}
            <p>Clique n'importe où pour continuer...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WordleGame;
