import Movie from "../models/Movie";

const MovieList = (props:{currentPageItems: Movie[]}) => {

    const renderMovies = () => {
        const result = props.currentPageItems.map((item, index) => {
            return (
                <li key={index} className="movie">
                    <div className="bg-image" style={{ backgroundImage: "url(" + item.coverImage + ")" }} />
                    <div className="text-content">
                        <div className="title-wrapper">
                            <span className="title">{item.title}</span>
                            <span className="year">{item.year}</span>
                        </div>
                        <p className="desc">{item.description}</p>
                    </div>
                </li>
            )
        });

        return result;
    }

    return (
        <ul className="movie-list">
            {renderMovies()}
        </ul>
    )
}

export default MovieList