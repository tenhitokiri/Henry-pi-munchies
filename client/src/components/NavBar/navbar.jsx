import React, { useState, useRef, useEffect } from 'react'
import cooking from '../../images/cooking.png'
import { Link } from 'react-router-dom';
import { NavContainer, LeftContainer, RightContainer, BurgerNav } from '../../css/Header/Header.js'
import { Button } from '../../css/Common/Buttons.js'
//import useClickOutside from '../../hooks/UseClickOutside.jsx';
import SearchFoodName from "../Search/SearchFoodName.jsx"
import { fetchRecipes, fetchDiets } from '../../redux'
import { connect } from 'react-redux'


const NavBar = ({ fetchRecipes, fetchDiets, recipeList }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const handleClickMenu = () => setOpenMenu(!openMenu);
    const ref = useRef(null);
    //useClickOutside(ref, () => setOpenMenu(false));
    useEffect(() => {
        fetchRecipes()
        fetchDiets()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <NavContainer>
            <LeftContainer>
                <Link to="/">
                    <img src={cooking} alt="Dog" />
                </Link>
                <h1>Food 4 All </h1>
            </LeftContainer>
            <SearchFoodName />
            <RightContainer ref={ref}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/proyect">Proyect</Link></li>
                    <li><Link to="/about">Contacts</Link></li>
                    <li><Button onClick={() => handleClickMenu()}>Menu</Button></li>
                </ul>
            </RightContainer>
            <BurgerNav show={openMenu} onFocusOut={() => alert('bye')}>
                <div>
                    <Button type="button" onClick={() => handleClickMenu()}>Close (X)</Button>
                </div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/recipes">Recipes</Link></li>
                    <li><Link to="/recipes/add/">Add Recipe</Link></li>
                    <li><Link to="/diets">Diets</Link></li>
                    <li><Link to="/add-diet">Add a Diet</Link></li>
                    <li><Link to="/proyect">Proyect</Link></li>
                    <li><Link to="/about">Contacts</Link></li>
                </ul>
            </BurgerNav>

        </NavContainer>
    )
}

//export default NavBar


const mapStateToProps = state => ({
    recipeItems: state.recipe.numberOfRecipes,
    recipeList: state.recipe.recipes,
    recipeLoading: state.recipe.loading,
    recipeError: state.recipe.error,
    diets: state.diet.dietItems,
    dietItems: state.diet.numberOfItems,
    dietList: state.diet.recipes,
    dietLoading: state.diet.loading,
    dietError: state.diet.error,
})

const mapDispatchToProps = dispatch => ({
    fetchRecipes: () => dispatch(fetchRecipes()),
    fetchDiets: () => dispatch(fetchDiets())
})
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)