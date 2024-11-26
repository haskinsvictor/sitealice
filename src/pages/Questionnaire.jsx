import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import './Questionnaire.css';

function Questionnaire() {
  const navigate = useNavigate(); // Hook pour la navigation

  const questions = [
    {
      question: "Sur quoi préférez-vous voler ?",
      answers: ["Tapis-volant", "Dragon"],
      correctAnswer: "Dragon",
    },
    {
      question: "Que préférez-vous sur votre pizza ?",
      answers: ["Olive noire", "Anchois ;)", "Fromage"],
      correctAnswer: "Fromage",
    },
    {
      question: "À Saint-Malo, quel était le poisson que Victor a dégusté sur la plage ?",
      answers: ["Une sardine", "Une sèche", "Du merlu"],
      correctAnswer: "Une sèche",
    },
    {
      question: "Quel est le personnage préféré de Victor dans la série 'Prison Break' ?",
      answers: ["T-bag", "Sucré", "Michael", "Sara", "Kellerman"],
      correctAnswer: "Kellerman",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answersRecap, setAnswersRecap] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [characterAppeared, setCharacterAppeared] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Définir les messages à afficher en fonction du score
  const messages = [
    "Tu as un score de {score}%. Oups, il te reste encore beaucoup à apprendre !",
    "Tu as un score de {score}%. Pas mal, mais tu peux mieux faire !",
    "Tu as un score de {score}%. Génial, tu es un expert !"
  ];

  const handleAnswer = (answer) => {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const newAnswersRecap = [...answersRecap];

    if (answer === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    newAnswersRecap.push({
      question: questions[currentQuestionIndex].question,
      correctAnswer,
    });

    setAnswersRecap(newAnswersRecap);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowResults(true);
      setTimeout(() => setCharacterAppeared(true), 2000); // Apparition du personnage après un délai
    }
  };

  const startTypingMessage = () => {
    const percentage = Math.round((score / questions.length) * 100);
    let messageIndex;

    if (percentage < 30) {
      messageIndex = 0;
    } else if (percentage >= 30 && percentage < 70) {
      messageIndex = 1;
    } else {
      messageIndex = 2;
    }

    const message = messages[messageIndex].replace('{score}', percentage);
    let i = 0;
    setDisplayedText('');
    setIsTyping(true);

    const interval = setInterval(() => {
      if (i < message.length) {
        setDisplayedText((prev) => prev + message[i]);
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (characterAppeared) {
      startTypingMessage();
    }
  }, [characterAppeared]);

  const handleScreenClick = () => {
    if (!isTyping && characterAppeared) {
      // Naviguer vers la page Caractere2 après que le personnage ait fini de parler
      navigate('/caractere2'); // Rediriger vers Caractere2
    }
  };

  return (
    <div className="questionnaire" onClick={handleScreenClick}>
      {!showResults ? (
        <div>
          <h2 className="fade-in">Test d'amitié !</h2>
          <div className="question fade-in">
            <p>{questions[currentQuestionIndex].question}</p>
          </div>
          <div className="answers fade-in">
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <button key={index} onClick={() => handleAnswer(answer)}>
                {answer}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {!characterAppeared && (
            <div className="results fade-in">
              <h2>Résultats</h2>
              <ul>
                {answersRecap.map((item, index) => (
                  <li key={index}>
                    <strong>Question :</strong> {item.question} <br />
                    <strong>Bonne réponse :</strong> {item.correctAnswer}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {characterAppeared && (
            <div className="character-container fade-in">
              <div className="character">
                <img src="./src/assets/character.png" alt="Personnage" className="character-image" />
                <div className="bubble">{displayedText}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Questionnaire;
