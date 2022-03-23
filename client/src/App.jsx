import NavBar from './components/NavBar/navbar.jsx';
import Home from './components/Home/home.jsx';
import About from './components/Home/about.jsx';
import Recipes from './components/Recipe/recipes.jsx';
import { Route, Routes } from 'react-router-dom';
import { BgImage } from './css/Body/Images.js';
import { AppContainer } from './css/Body/Containers.js';

function App() {
  return (
    <AppContainer>
      <BgImage />
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
