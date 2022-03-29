import React, { useState, useEffect } from 'react'
import { MainContainer, BoxContainer, HeaderContainer } from '../../css/Body/Containers.js'
import { PaginationNumbers } from '../../css/Body/Common.js'
import { FullBgImage } from '../../css/Body/Images.js';
import { SearchForm } from '../../css/Common/Search.js'
import DietsList from './dietList.jsx'
import { trimInput, orderBy } from '../../utils/'
import { deleteDiet, fetchDiets } from '../../redux'

//redux
import { connect } from 'react-redux'

const TittleContainer = BoxContainer;
const SearchContainer = BoxContainer;
const PaginationContainer = BoxContainer;

const AllDiets = ({ dietList, fetchDiets, deleteDiet }) => {
    const handleDelete = (diet) => {
        if (window.confirm(`Delete ${diet.name}`)) {
            deleteDiet(diet)
        }

    }
    useEffect(() => {
        //fetchDiets()
        /*         return () => {
                    console.log(`unmounting`)
                } */
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const [search, setSearch] = useState('')
    const [order, setOrder] = useState('')

    let orderedDiets = search.length === 0 ? dietList :
        dietList.filter(diet => diet.name.toLowerCase().includes(search.toLowerCase()))

    switch (order) {
        case 'nameAsc':
            orderedDiets = orderedDiets.sort((a, b) => orderBy(a.name.toLowerCase(), b.name.toLowerCase()))
            break;
        case 'nameDesc':
            orderedDiets = orderedDiets.sort((a, b) => orderBy(b.name.toLowerCase(), a.name.toLowerCase()))
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
    const totalPages = Math.ceil(orderedDiets.length / itemsPerPage);

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

    const indexOfLastDiet = currentPage * itemsPerPage;
    const indexOfFirstDiet = indexOfLastDiet - itemsPerPage;
    const currentDiets = orderedDiets.slice(indexOfFirstDiet, indexOfLastDiet);

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
    //End of pagination stuff

    return (
        <>
            <FullBgImage />
            <MainContainer justify="flex-start" align="center" height="90%" shadow="color-1">
                <HeaderContainer height="2vh" fontColor="color-7" justify="space-between" bg="color-1" direction="row">
                    <TittleContainer justify="center" align="center" bg="color-40">
                        <h2>Diets</h2>
                    </TittleContainer>
                    <SearchContainer justify="flex-end" align="flex-end" bg="color-3" >
                        <SearchForm>
                            <input
                                name="search"
                                type="text"
                                placeholder="Search by name"
                                value={search}
                                onChange={(e) => setSearch(e.target.value.trim())}
                            />
                        </SearchForm>
                        <select name="order" onChange={(e) => setOrder(trimInput(e.target.value))}>
                            <option value="">Order by...</option>
                            <option value="nameAsc">Name Ascending</option>
                            <option value="nameDesc">Name Descending</option>
                        </select>
                    </SearchContainer>
                    <PaginationContainer justify="space-around" align="center" bg="color-50">
                        <PaginationNumbers>
                            <li onClick={() => setCurrentPage(1)}>{"|<"}</li>
                            <li onClick={prevHandler}>{"<<"}</li>
                            {renderPageNumbers}
                            <li onClick={nextHandler}>{">>"}</li>
                            <li onClick={() => setCurrentPage(totalPages)}>{">|"}</li>
                            <div>
                                Page {currentPage} / {totalPages} ({orderedDiets.length} results)
                            </div>

                        </PaginationNumbers>
                    </PaginationContainer>
                </HeaderContainer>
                <DietsList dietList={currentDiets} handleDelete={handleDelete} />
            </MainContainer>
        </>
    )
}

const mapStateToProps = state => ({
    dietList: state.diet.dietItems,
    dietItems: state.diet.numberOfItems,
})
const mapDispatchToProps = dispatch => ({
    fetchDiets: () => dispatch(fetchDiets()),
    deleteDiet: (diet) => dispatch(deleteDiet(diet)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllDiets)