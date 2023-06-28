<template>
  <main class="container mx-auto my-8 px-4 lg:px-0">
    <!-- Search movies -->
    <form>
      <label
        for="default-search"
        class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Search
      </label>
      <div class="relative">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <svg
            aria-hidden="true"
            class="h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Search movies..."
          required
        />
        <button
          type="submit"
          class="absolute bottom-2.5 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Search
        </button>
      </div>
    </form>

    <!-- <div class="mb-4 flex items-center justify-between">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search movies..."
        class="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring"
      />
      <button
        class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Search
      </button>
      <button
        @click="resetSearch"
        class="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Reset
      </button>
    </div> -->
    <!-- Popular Movies -->
    <h2 class="mb-4 mt-6 text-2xl font-bold">Popular Movies</h2>
    <div class="mb-10 flex flex-nowrap overflow-x-auto">
      <MovieCard
        v-for="movie in popularMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    <!-- Top Rated Movies -->
    <h2 class="mb-4 text-2xl font-bold">Top Rated Movies</h2>
    <div class="mb-10 flex flex-nowrap overflow-x-auto">
      <MovieCard
        v-for="movie in topRatedMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </main>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      searchQuery: '',
      popularMovies: [],
      topRatedMovies: [],
    }
  },
  async mounted() {
    // Fetch popular movies
    try {
      const response = await fetch(
        `${process.env.TMDB_API_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}`
      )
      const data = await response.json()
      this.popularMovies = data.results
    } catch (error) {
      console.error('Error fetching popular movies data:', error)
    }
    // Fetch top rated movies
    try {
      const response = await fetch(
        `${process.env.TMDB_API_URL}/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`
      )
      const data = await response.json()
      this.topRatedMovies = data.results
    } catch (error) {
      console.error('Error fetching top rated movies data:', error)
    }
  },
  methods: {
    // Fetch popular movies
    // async fetchPopular() {
    //   try {
    //     const response = await fetch(
    //       `${process.env.TMDB_API_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}`
    //     )
    //     const data = await response.json()
    //     this.popularMovies = data.results
    //   } catch (error) {
    //     console.error('Error fetching popular movies:', error)
    //   }
    // },
    resetSearch() {
      this.searchQuery = ''
      // this.fetchMovies()
    },
  },
}
</script>
