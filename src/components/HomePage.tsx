import { useAppSelector } from "../state/hooks";
import { Pagination } from "@mui/material"; //MaterialUI for the pagination module and searchIcon
import { ChangeEvent } from "react";
import { paginate } from "../scripts/HelperFunctions";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Movie from "../models/Movie";
import MovieList from "./MovieList";
import SearchIcon from '@mui/icons-material/Search';
import { fetchMovies } from "../scripts/DataFunctions";
import Loader from "./Loader";


const HomePage = () => {
    let history = useNavigate();
    let inputEl = useRef<any>();
    const params = new URLSearchParams(window.location.search)
    const initialPage = Number(params.get("page")) ? Number(params.get("page")) : 1; //get query string page parameter if it exits, else initialPage is 1
    const initialTerm = params.get("term") ?? ""; //get query string page parameter if it exits, else initialPage is 1
    const movies = useAppSelector((state) => state.movies.value);
    const [loading, setLoading] = useState(true);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies) //filteredMovies default value will be equal to "movies", all filtering will occur on this state leaving "movies" always with the full list in case we want to reset the search.
    const itemsPerPage = 6;
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [currentPageItems, setCurrentPageItems] = useState<Movie[]>([])
    const [searchTerm, setSearchTerm] = useState(initialTerm);


    const changePage = (event: ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
        setCurrentPageItems(paginate(filteredMovies, itemsPerPage, page));
        if (inputEl.current && inputEl.current.value) {
            history({ search: "page=" + page + "&term=" + searchTerm });
        } else {
            history({ search: "page=" + page });
        }
    }

    const searchBtnClick = () => {
        setLoading(true);
        setCurrentPage(1);
        if (inputEl.current && inputEl.current.value) {
            setSearchTerm(encodeURIComponent(inputEl.current.value));
            searchMovies(encodeURIComponent(inputEl.current.value));
        } else if (inputEl.current && inputEl.current.value == "") {//if input is empty when searchBtn is clicked, reset search
            setContent(movies);
            history({ search: "" });
            setLoading(false);
        }
    }

    const searchMovies = (term: string) => {
        fetchMovies(term).then((response) => {
            setFilteredMovies(response);
        });
    }

    const setContent = (array: Movie[]) => {
        setCurrentPageItems(paginate(array, itemsPerPage, currentPage));
        setNumberOfPages(Math.round(array.length / itemsPerPage)); //length of the array divided by number of items per page gives us total number of pages for the pagination module
    }

    useEffect(() => {
        if (movies.length > 0) {
            if (searchTerm) { //if query string parameter term is defined, search by it, else set filteredMovies equal to the movie list
                searchMovies(searchTerm);
            } else {
                setContent(movies);
                setFilteredMovies(movies);
                setLoading(false);
            }
        }
    }, [movies]);

    useEffect(() => {
        if (filteredMovies.length != movies.length) { //in case filtering has occured render the content again and update history
            setContent(filteredMovies);
            history({ search: "page=" + currentPage + "&term=" + searchTerm });
            setLoading(false);
        }

    }, [filteredMovies]);

    if (loading) {// if loading state is true show loader component
        return (
            <Loader />
        )
    }
    else {
        return (
            <article className="homepage">
                <div className="search-row">
                    <input type={"text"} ref={inputEl} defaultValue={searchTerm} />
                    <a className="search-btn" onClick={() => searchBtnClick()}><SearchIcon></SearchIcon></a>
                </div>
                <MovieList currentPageItems={currentPageItems} />
                {!loading && filteredMovies.length === 0 &&
                    <div className="no-items">No items match your search</div>
                }
                <Pagination count={numberOfPages} onChange={(event, page) => changePage(event, page)} page={currentPage}></Pagination>
            </article>
        )
    }
}

export default HomePage