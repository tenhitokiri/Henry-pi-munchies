import React, { useState, useEffect } from 'react'
import { MainContainer, BoxContainer, HeaderContainer } from '../../css/Body/Containers.js'
import { PaginationNumbers } from '../../css/Body/Common.js'
import { FullBgImage } from '../../css/Body/Images.js';
import { SearchForm } from '../../css/Common/Search.js'
import RecipesList from './recipeList.jsx'
import { orderBy } from '../../utils/'
import { deleteRecipe, fetchDiets } from '../../redux'

//redux
import { connect } from 'react-redux'

const TittleContainer = BoxContainer;
const SearchContainer = BoxContainer;
const PaginationContainer = BoxContainer;



const AllRecipes = ({ recipeList, dietList, fetchDiets }) => {
    useEffect(() => {
        fetchDiets()
        console.log("lista de dietas");
        console.log(dietList)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const [search, setSearch] = useState('')
    const [order, setOrder] = useState('')
    //const [diets, setDiets] = useState(dietList)
    const [filterbyDiet, setFilterByDiet] = useState('')

    const handleDelete = (recipe) => {
        if (window.confirm(`Delete ${recipe.name}`)) {
            deleteRecipe(recipe)
        }
    }

    let orderedRecipes = search.length === 0 ? recipeList :
        recipeList.filter(recipe => recipe.name.toLowerCase().includes(search.toLowerCase()))

    switch (order) {
        case 'nameAsc':
            orderedRecipes = orderedRecipes.sort((a, b) => orderBy(a.name.toLowerCase(), b.name.toLowerCase()))
            break;
        case 'nameDesc':
            orderedRecipes = orderedRecipes.sort((a, b) => orderBy(b.name.toLowerCase(), a.name.toLowerCase()))
            break;
        case 'scoreAsc':
            orderedRecipes = orderedRecipes.sort((a, b) => orderBy(a.healthScore, b.healthScore))
            break;
        case 'scoreDesc':
            orderedRecipes = orderedRecipes.sort((a, b) => orderBy(b.healthScore, a.healthScore))
            break;
        default:
            break;
    }

    //Pagination stuff
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 9;
    const pageNumberLimit = 5
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(1)

    let pages = [];
    const totalPages = Math.ceil(orderedRecipes.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const renderPageNumbers = pages.map(number => {
        //if (number <= maxPageNumberLimit && number > minPageNumberLimit) {
        if (number >= minPageNumberLimit && number <= maxPageNumberLimit) {
            if (number === currentPage) {
                return (
                    <li
                        key={number}
                        id={number}
                    >
                        <span>{number}</span>
                    </li>)
            } else {
                return (
                    <li
                        key={number}
                        id={number}
                        onClick={() => setCurrentPage(number)}
                    >
                        {number}
                    </li>)
            }
        }
        else return null
    })

    const indexOfLastRecipe = currentPage * itemsPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
    const currentRecipes = orderedRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const prevHandler = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            //currentPage - 1 < totalPages - 5 ? setMinPageNumberLimit(totalPages - 5) : setMinPageNumberLimit(currentPage - 1)
            setMinPageNumberLimit(currentPage - 1)
            setMaxPageNumberLimit(currentPage + pageNumberLimit - 1)
        }
    }
    const nextHandler = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
            if (currentPage === maxPageNumberLimit) {
                setMinPageNumberLimit(minPageNumberLimit + 1)
                setMaxPageNumberLimit(maxPageNumberLimit + 1)
            }
        }
    }
    /*
    const prevHandler = () => {
        if (currentPage >= 1) {
            setCurrentPage(currentPage - 1)
            if (currentPage - 1 < minPageNumberLimit) {
                setMinPageNumberLimit(currentPage - 1)
                setMaxPageNumberLimit(currentPage + pageNumberLimit - 1)
            }
        }
    }
    const nextHandler = () => {
        if (currentPage >= 1) {
            setCurrentPage(currentPage + 1)
            if (currentPage === maxPageNumberLimit) {
                setMinPageNumberLimit(minPageNumberLimit + 1)
                setMaxPageNumberLimit(maxPageNumberLimit + 1)
            }
        }
    }
    */
    //End of pagination stuff

    let currentFilteredRecipes = filterbyDiet === "" ? currentRecipes : currentRecipes.filter(recipe => recipe.diets.includes(filterbyDiet))

    return (
        <>
            <FullBgImage />
            <MainContainer justify="flex-start" align="center" height="100%" shadow="color-1">
                <HeaderContainer height="2vh" fontColor="color-7" justify="space-between" bg="color-1" direction="row">
                    <TittleContainer justify="center" align="center" bg="color-40">
                        <h2>Recipes</h2>
                    </TittleContainer>
                    <SearchContainer justify="flex-end" align="flex-end" bg="color-30" >
                        <SearchForm>
                            <input
                                name="search"
                                type="text"
                                placeholder="Search by name"
                                value={search}
                                onChange={(e) => setSearch(e.target.value.trim())}
                            />
                        </SearchForm>
                        <select name="order" onChange={(e) => setOrder(e.target.value)}>
                            <option value="">Order by...</option>
                            <option value="nameAsc">Name Ascending</option>
                            <option value="nameDesc">Name Descending</option>
                            <option value="scoreAsc">Score Ascending</option>
                            <option value="scoreDesc">Score Descending</option>
                        </select>
                        <select name="dietFilter" id="dietFilter" onChange={(e) => setFilterByDiet(e.target.value)}>
                            <option value="">Filter by diet...</option>
                            {dietList.map(diet => <option key={diet.id} value={diet.name}>{diet.name}</option>)}
                        </select>
                    </SearchContainer>
                    <PaginationContainer justify="space-around" align="center" bg="color-50">
                        <PaginationNumbers>
                            <li onClick={() => setCurrentPage(1)}>{"|<"}</li>
                            <li onClick={prevHandler}>{"<<"}</li>
                            {renderPageNumbers}
                            <li onClick={nextHandler}>{">>"}</li>
                            <li onClick={() => setCurrentPage(totalPages)}>{">|"}</li>
                            Page {currentPage} of {totalPages} ({orderedRecipes.length} recipes)
                        </PaginationNumbers>
                    </PaginationContainer>
                </HeaderContainer>
                <RecipesList recipeList={currentFilteredRecipes} handleDelete={handleDelete} />

                {/* 
                    <RecipesList recipeList={currentRecipes, currentFilteredRecipes} handleDelete={handleDelete} />
                     */}
            </MainContainer>
        </>
    )
}

const mapStateToProps = state => ({
    recipeList: state.recipe.recipes,
    loading: state.recipe.loading,
    error: state.recipe.error,
    dietList: state.diet.dietItems,
    dietItems: state.diet.numberOfItems,
})

const mapDispatchToProps = dispatch => ({
    fetchDiets: () => dispatch(fetchDiets())
})


export default connect(mapStateToProps, mapDispatchToProps)(AllRecipes)