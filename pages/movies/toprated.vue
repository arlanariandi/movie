<template>
  <div>
    <main class="container mx-auto my-8 p-4 lg:p-0">
      <h2 class="mb-4 text-2xl font-bold">Top Rated Movies</h2>
      <div
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      >
        <MovieGrid
          v-for="movie in topRatedMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      topRatedMovies: [],
    }
  },
  async mounted() {
    // Fetch top rated movies
    try {
      const response = await fetch(
        `${process.env.TMDB_API_URL}/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`
      )
      const data = await response.json()
      this.topRatedMovies = data.results
    } catch (error) {
      console.error('Error fetching popular movies data:', error)
    }
  },
  methods: {},
}
</script>
