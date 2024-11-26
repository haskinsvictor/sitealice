import { useState } from 'react';

function Character() {
  const [showBubble, setShowBubble] = useState(false);

  const handleHelp = () => {
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 3000); // Disparition après 3 secondes
  };

  return (
    <div className="character">
      <img 
        src="/assets/character.png" 
        alt="Character" 
        onClick={handleHelp} 
        style={{ cursor: 'pointer' }}
      />
      {showBubble && <div className="bubble">Besoin d'un indice ?</div>}
    </div>
  );
}

export default Character;
