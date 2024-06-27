import { movies } from '$lib/data/movies';
import type { PageServerLoad } from './$types';

////////////////////////////////////////////////////

//load function for loading the data 
//we can load here movies from TMDb API 
export const load: PageServerLoad = async () => {
    return { movies };
};

//Action for searching the movie
export const actions = {
    search: async ({ request }) => {
        const formData = await request.formData();
        const query = formData.get('query')?.toString() || '';

        const filteredMovies = movies.filter(movie =>
            movie.title.toLowerCase().includes(query.toLowerCase())
        );

        return { movies: filteredMovies };
    }
};
