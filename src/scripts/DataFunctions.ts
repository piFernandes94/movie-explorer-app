export const fetchMovies = async (searchTerm?: string) => {
    try {
        const response = await fetch('http://localhost:8080/movies' + (searchTerm ? "?q=" + encodeURIComponent(searchTerm) : ""));
        if (!response.ok) {
            throw Error(response.statusText);
        }
        let data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}