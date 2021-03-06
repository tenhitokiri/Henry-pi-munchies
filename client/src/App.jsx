import NavBar from './components/NavBar/navbar.jsx';
import Home from './components/Home/home.jsx';
import About from './components/Home/about.jsx';
import AllRecipes from './components/Recipe/recipesAll.jsx';
import AllDiets from './components/Diet/dietsAll.jsx';
import RecipeDetails from './components/Recipe/recipeDetails.jsx';
import RecipeForm from './components/Recipe/recipeForm.jsx';
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
        <Route exact path="/diets" element={<AllDiets />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/recipes/edit/:id" element={<RecipeForm />} />
        <Route path="/recipes/add/" element={<RecipeForm />} />
        <Route path="*" element={<Home />} />

      </Routes>
    </AppContainer>
  );
}

export default App;
