<template>
  <main class="container mx-auto my-8 px-4 lg:px-0">
    <!-- Search movies -->
    <div class="mb-8 flex items-center justify-center">
      <input
        v-model="query"
        type="text"
        placeholder="Search movies..."
        class="mr-2 w-1/2 rounded-lg border border-gray-300 p-2"
        @keydown.enter="searchMovies"
      />
      <button
        @click="searchMovies"
        class="mr-2 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-800"
      >
        Search
      </button>
      <button
        @click="resetSearch"
        class="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-800"
      >
        Reset
      </button>
    </div>

    <!-- List results movie search -->
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="movies.length === 0 && searchPerformed" class="text-center">
      There are no movies that matched your query.
    </div>
    <div v-else>
      <div class="grid gap-4">
        <MovieSearch v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
    </div>

    <div v-if="!searchPerformed">
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
    </div>
  </main>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      query: '',
      movies: [],
      popularMovies: [],
      topRatedMovies: [],
      loading: false,
      searchPerformed: false,
      searchQuery: '',
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
    // Search Movies
    searchMovies() {
      this.loading = true
      this.searchPerformed = true
      this.searchQuery = this.query
      this.movies = []

      this.$axios
        .get('/search/movie', {
          params: {
            api_key: `${process.env.TMDB_API_KEY}`,
            query: this.query,
          },
        })
        .then((response) => {
          this.loading = false
          this.movies = response.data.results
          this.$router.push({
            query: { search: this.searchQuery },
          })
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    // Button reset search movies
    resetSearch() {
      this.query = ''
      this.movies = []
      this.searchPerformed = false
      this.searchQuery = ''
      this.$router.push({ query: {} })
    },
  },
}
</script>
