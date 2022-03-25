import React, { useState } from 'react'
import { MainContainer, BoxContainer, HeaderContainer } from '../../css/Body/Containers.js'
import { PaginationNumbers } from '../../css/Body/Common.js'
import { FullBgImage } from '../../css/Body/Images.js';
import { SearchForm } from '../../css/Common/Search.js'
import RecipesPaging from './recipePaging.jsx'

//redux
import { connect } from 'react-redux'

const TittleContainer = BoxContainer;
const SearchContainer = BoxContainer;
const PaginationContainer = BoxContainer;


const Recipes = ({ recipeList, recipeItems }) => {
    const [search, setSearch] = useState('')
    const [order, setOrder] = useState('')

    const orderBy = (a, b) => {
        return a < b ? -1 : a > b ? 1 : 0
    }

    let orderedRecipes = search.length === 0 ? recipeList :
        recipeList.filter(recipe => recipe.name.toLowerCase().includes(search.toLowerCase()))
    /* 
        let orderOptions = {
            'nameAsc': orderedRecipes.sort((a, b) => orderBy(a.name.toLowerCase(), b.name.toLowerCase())),
            'nameDesc': orderedRecipes.sort((a, b) => orderBy(b.name.toLowerCase(), a.name.toLowerCase())),
            'scoreAsc': orderedRecipes.sort((a, b) => orderBy(a.score, b.score)),
            'scoreDesc': orderedRecipes.sort((a, b) => orderBy(b.score, a.score)),
        }
        orderedRecipes = orderOptions[order] || orderedRecipes;
        console.log(orderOptions[order])
         */
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
                        <span>{(number)}</span>
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
        if (currentPage >= minPageNumberLimit && currentPage > 1) {
            setCurrentPage(currentPage - 1)
            //currentPage - 1 < totalPages - 5 ? setMinPageNumberLimit(totalPages - 5) : setMinPageNumberLimit(currentPage - 1)
            setMinPageNumberLimit(currentPage - 1)
            setMaxPageNumberLimit(currentPage + pageNumberLimit - 1)
        }
    }
    const nextHandler = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
            setMinPageNumberLimit(minPageNumberLimit + 1)
            /*             if (currentPage + 1 <= maxPageNumberLimit) {
                            minPageNumberLimit + pageNumberLimit < totalPages ? setMaxPageNumberLimit(maxPageNumberLimit + 1) : setMaxPageNumberLimit(totalPages)
                        }
             */
            setMaxPageNumberLimit(maxPageNumberLimit + 1)
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

    return (
        <>
            <FullBgImage />
            <MainContainer justify="flex-start" align="center" height="100%" shadow="color-1">
                <HeaderContainer height="2vh" fontColor="color-7" justify="space-between" bg="color-1" direction="row">
                    <TittleContainer justify="center" align="center" bg="color-40">
                        <h2>Recipes</h2>
                    </TittleContainer>
                    <SearchContainer justify="center" align="center" bg="color-30">
                        <SearchForm>
                            <input
                                name="search"
                                type="text"
                                placeholder="Buscar Nombre"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </SearchForm>
                        <select name="order" onChange={(e) => setOrder(e.target.value)}>
                            <option value="">Order by...</option>
                            <option value="nameAsc">Name Ascending</option>
                            <option value="nameDesc">Name Descending</option>
                            <option value="scoreAsc">Score Ascending</option>
                            <option value="scoreDesc">Score Descending</option>
                        </select>

                        {order}
                    </SearchContainer>
                    <PaginationContainer justify="space-around" align="center" bg="color-50">
                        <PaginationNumbers>
                            <li onClick={() => setCurrentPage(1)}>{"|<"}</li>
                            <li onClick={prevHandler}>{"<<"}</li>
                            {renderPageNumbers}
                            <li onClick={nextHandler}>{">>"}</li>
                            <li onClick={() => setCurrentPage(totalPages)}>{">|"}</li>
                            Page {currentPage} of {totalPages} (min: {minPageNumberLimit} max:{maxPageNumberLimit})
                        </PaginationNumbers>
                    </PaginationContainer>
                </HeaderContainer>
                <RecipesPaging recipeList={currentRecipes} />
            </MainContainer>
        </>
    )
}

const mapStateToProps = state => ({
    recipeItems: state.recipe.numberOfRecipes,
    recipeList: state.recipe.recipes,
    loading: state.recipe.loading,
    error: state.recipe.error
})
/* 
const mapDispatchToProps = dispatch => ({
    //fetchRecipes: () => dispatch(fetchRecipes())
})
export default connect(mapStateToProps, mapDispatchToProps)(Recipes)
 */
export default connect(mapStateToProps)(Recipes)