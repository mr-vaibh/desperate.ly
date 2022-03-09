import './App.css';
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from './components/Navbar';
import Success from './components/Success';
import Home from './components/Home';
import Game from './components/Game';
import NotFound404 from './components/NotFound404';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path=":gameSlug" element={<Game />} />
        <Route path="/404" element={<NotFound404 />} />
      </Routes>
    </>
  );
}

export default App;
