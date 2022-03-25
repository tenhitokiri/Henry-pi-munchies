import React, { useState } from 'react'
import { MainContainer, BoxContainer, HeaderContainer } from '../../css/Body/Containers.js'
import { FullBgImage } from '../../css/Body/Images.js';
import { SearchForm } from '../../css/Common/Search.js'

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
            orderedRecipes = orderedRecipes.sort((a, b) => orderBy(a.score, b.score))
            break;
        case 'scoreDesc':
            orderedRecipes = orderedRecipes.sort((a, b) => orderBy(b.score, a.score))
            break;
        default:
            break;
    }

    return (
        <>
            <FullBgImage />
            <MainContainer justify="flex-start" align="center" height="100%" shadow="color-1" bg="color-2">
                <HeaderContainer height="2vh" fontColor="color-7" justify="space-between" bg="color-5" direction="row">
                    <TittleContainer justify="center" align="center" bg="color-4">
                        <h2>Recipes</h2>
                    </TittleContainer>
                    <SearchContainer justify="center" align="center" bg="color-3">
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
                    <PaginationContainer justify="center" align="center" bg="color-5">
                        found {orderedRecipes.length} recipes
                    </PaginationContainer>
                </HeaderContainer>
                <BoxContainer width="100%" height="100%" bg="color-1" justify="center" align="center">
                    {
                        orderedRecipes.map(recipe => (
                            <div key={recipe.id}>
                                <h3>{recipe.name}</h3>
                                <p>{recipe.description}</p>
                            </div>
                        ))

                    }
                </BoxContainer>

            </MainContainer>
        </>
    )
}

//export default Recipes


const mapStateToProps = state => ({
    recipeItems: state.recipe.numberOfRecipes,
    recipeList: state.recipe.recipes,
    loading: state.recipe.loading,
    error: state.recipe.error
})

const mapDispatchToProps = dispatch => ({
    //fetchRecipes: () => dispatch(fetchRecipes())
})
export default connect(mapStateToProps, mapDispatchToProps)(Recipes)