class Movie {
    id: string;
    title: string;
    director: string;
    description: string;
    year: number;
    coverImage: string;

    constructor(id: string, title: string, director: string, description: string, year: number, coverImage: string){
        this.id = id,
        this.title = title,
        this.director = director,
        this.description = description,
        this.year = year,
        this.coverImage = coverImage
    }
}

export default Movie