import NavBar from './components/NavBar/navbar.jsx';
import Home from './components/Home/home.jsx';
import About from './components/Home/about.jsx';
import AllRecipes from './components/Recipe/recipesAll.jsx';
import RecipeDetails from './components/Recipe/recipeDetails.jsx';
import { Route, Routes } from 'react-router-dom';
import { AppContainer } from './css/Body/Containers.js';

function App() {
  return (
    <AppContainer>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route exact path="/recipes" element={<AllRecipes />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
