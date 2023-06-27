<template>
  <main class="container mx-auto my-8 px-4 lg:px-0">
    <!-- Search movies -->
    <div class="mb-4 flex items-center justify-between">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search movies..."
        class="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring"
      />
      <div>
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
      </div>
    </div>
    <!-- Popular Movies -->
    <h2 class="mb-4 text-2xl font-bold">Popular Movies</h2>
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
