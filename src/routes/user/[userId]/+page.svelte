<script lang="ts">
	import { watchlist } from '$lib/stores/watchlist';
	import { get } from 'svelte/store';
	import { users } from '$lib/stores/users';

	export let data;

	let view = 'movies';
	let currentUserId: number;
	let searchQuery = '';
	let filteredMovies = data.movies;
	let genreFilter = '';
	let yearFilter: number | '' = '';
	let ratingFilter: number | '' = '';

	$: currentUserId = get(users).id;

	// Add movie in watchlist
	function addToWatchlist(movie) {
		watchlist.update((current) => {
			const userWatchlist = current[currentUserId] || [];
			if (!userWatchlist.find((m) => m.id === movie.id)) {
				userWatchlist.push(movie);
			}
			return { ...current, [currentUserId]: userWatchlist };
		});
		filteredMovies = [...filteredMovies];
	}

	// remove movies from watchlist
	function removeFromWatchlist(movie) {
		watchlist.update((current) => {
			const userWatchlist = current[currentUserId] || [];
			return {
				...current,
				[currentUserId]: userWatchlist.filter((m) => m.id !== movie.id)
			};
		});
		filteredMovies = [...filteredMovies];
	}

	// check movie is in watchlist and show
	function isInWatchlist(movie) {
		const userWatchlist = get(watchlist)[currentUserId] || [];
		return userWatchlist.find((m) => m.id === movie.id);
	}

	// function for search the movie
	function handleSearch() {
		filteredMovies = data.movies.filter((movie) =>
			movie.title.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}

	function filterByGenre(genre: string) {
		genreFilter = genre;
		applyFilters();
	}

	function filterByYear(year: number | '') {
		yearFilter = year;
		applyFilters();
	}
	function filterByRating(rating: number | '') {
		ratingFilter = rating;
		applyFilters();
	}
	// function for filters
	function applyFilters() {
		filteredMovies = data.movies.filter((movie) => {
			const matchesGenre = genreFilter ? movie.genre.includes(genreFilter) : true;
			const matchesYear = yearFilter ? movie.year === yearFilter : true;
			const matchesRating = ratingFilter ? movie.rating >= ratingFilter : true;
			return matchesGenre && matchesYear && matchesRating;
		});
	}

	$: userWatchlist = get(watchlist)[currentUserId] || [];
</script>

<div class="flex pt-16">
	<div class="w-2/12 bg-gray-200 h-screen p-4 fixed">
		<button
			on:click={() => (view = 'movies')}
			class="w-full py-2 px-4 text-left {view === 'movies' ? 'bg-gray-400' : ''}">Movies</button
		>
		<button
			on:click={() => (view = 'watchlist')}
			class="w-full py-2 px-4 text-left {view === 'watchlist' ? 'bg-gray-400' : ''}"
			>Watchlist</button
		>
	</div>

	<div class="ml-[280px] w-10/12 p-5">
		{#if view === 'movies'}
			<h1 class="text-3xl font-bold mb-6">Popular Movies</h1>
			<!-- Search button -->
			<div class="mb-4">
				<input
					type="text"
					placeholder="Search movies..."
					bind:value={searchQuery}
					class="border border-gray-300 rounded py-2 px-4 w-full mb-2"
				/>
				<button
					on:click={handleSearch}
					class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4">Search</button
				>
				<!-- filtering buttons -->
				<div>
					<button on:click={() => filterByGenre('Action')} class="bg-gray-300 py-2 px-4 rounded-md"
						>Action</button
					>
					<button on:click={() => filterByGenre('Comedy')} class="bg-gray-300 py-2 px-4 rounded-md"
						>Comedy</button
					>
					<button on:click={() => filterByGenre('Drama')} class="bg-gray-300 py-2 px-4 rounded-md"
						>Drama</button
					>
					<button on:click={() => filterByGenre('')} class="bg-gray-300 py-2 px-4 rounded-md"
						>All Genres</button
					>
				</div>
				<div class="mt-2">
					<button on:click={() => filterByYear(2022)} class="bg-gray-300 py-2 px-4 rounded-md"
						>2022</button
					>
					<button on:click={() => filterByYear(2023)} class="bg-gray-300 py-2 px-4 rounded-md"
						>2023</button
					>
					<button on:click={() => filterByYear('')} class="bg-gray-300 py-2 px-4 rounded-md"
						>All Years</button
					>
				</div>
				<div class="mt-2">
					<button on:click={() => filterByRating(7)} class="bg-gray-300 py-2 px-4 rounded-md"
						>Rating 7+</button
					>
					<button on:click={() => filterByRating(8)} class="bg-gray-300 py-2 px-4 rounded-md"
						>Rating 8+</button
					>
					<button on:click={() => filterByRating('')} class="bg-gray-300 py-2 px-4 rounded-md"
						>All Ratings</button
					>
				</div>
			</div>

			<!-- All movie list -->
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{#each filteredMovies as movie}
					<div class="max-w-sm rounded overflow-hidden shadow-lg bg-blue-50 p-4">
						<div class="flex justify-between items-center mb-2">
							<h2 class="text-xl font-bold">{movie.title}</h2>
							<span class="text-gray-600">{movie.year}</span>
						</div>
						<div class="mb-4">
							<img class="w-full h-48 object-cover" src={movie.image} alt={movie.title} />
						</div>
						<div class="flex justify-between items-center mb-4">
							<span class="text-sm font-medium text-gray-800 bg-gray-200 px-2 py-1 rounded"
								>{movie.genre.join(', ')}</span
							>
							<span class="text-sm font-medium text-gray-800 bg-gray-200 px-2 py-1 rounded"
								>{movie.rating}</span
							>
						</div>
						<p class="text-gray-700 text-base mb-4">{movie.overview}</p>
						<div class="flex justify-center">
							{#if isInWatchlist(movie)}
								<button
									class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
									on:click={() => removeFromWatchlist(movie)}>Remove from Watchlist</button
								>
							{:else}
								<button
									class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
									on:click={() => addToWatchlist(movie)}>Add to Watchlist</button
								>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<!-- this is for watchlist -->
		{#if view === 'watchlist'}
			<h1 class="text-3xl font-bold mb-6">Your Watchlist</h1>
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{#each userWatchlist as movie (movie.id)}
					<div class="bg-white shadow-md rounded-md p-4 flex flex-col">
						<div class="flex justify-between items-center mb-2">
							<h2 class="text-xl font-bold">{movie.title}</h2>
							<span class="text-gray-600">{movie.year}</span>
						</div>
						<div class="mb-4">
							<img class="w-full h-48 object-cover" src={movie.image} alt={movie.title} />
						</div>
						<div class="flex justify-between items-center mb-4">
							<span class="text-sm font-medium text-gray-800 bg-gray-200 px-2 py-1 rounded"
								>{movie.genre.join(', ')}</span
							>
							<span class="text-sm font-medium text-gray-800 bg-gray-200 px-2 py-1 rounded"
								>{movie.rating}</span
							>
						</div>
						<p class="text-gray-700 text-base mb-4">{movie.overview}</p>

						<div class="mt-auto flex justify-between">
							<button
								on:click={() => removeFromWatchlist(movie)}
								class="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
								>Remove from Watchlist</button
							>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
