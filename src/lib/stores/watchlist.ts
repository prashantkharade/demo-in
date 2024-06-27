// src/lib/stores/watchlist.ts
import { writable } from 'svelte/store';
import type { Movie } from '$lib/data/movies';

export const watchlist = writable<{ [userId: number]: any[] }>({});

export const addToWatchlist = (userId: number, movie: Movie) => {
    watchlist.update((currentWatchlist) => {
        const userWatchlist = currentWatchlist[userId] || [];
        return { ...currentWatchlist, [userId]: [...userWatchlist, movie] };
    });
};

export const removeFromWatchlist = (userId: number, movieId: number) => {
    watchlist.update((currentWatchlist) => {
        const userWatchlist = currentWatchlist[userId] || [];
        return { ...currentWatchlist, [userId]: userWatchlist.filter(movie => movie.id !== movieId) };
    });
};
