import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/pages/Home';
import Questionnaire from '../src/pages/Questionnaire';
import WordleGame from '../src/pages/WordleGame';
import Pick from './pages/Pick';
import Caractere1 from './pages/caracter1';
import Caractere2 from './pages/caracter2';
import Caractere3 from './pages/caracter3';
import Caractere4 from './pages/caracter4';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/wordle" element={<WordleGame />} /> {/* Ajoutez la route pour le jeu Wordle */}
        <Route path="/pick" element={<Pick />} />
        <Route path="/caractere1" element={<Caractere1 />} />
        <Route path="/caractere2" element={<Caractere2 />} />
        <Route path="/caractere3" element={<Caractere3 />} />\
        <Route path="/caractere4" element={<Caractere4 />} />
      </Routes>
    </Router>
  );
}

export default App;
