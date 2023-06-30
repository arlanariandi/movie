<template>
  <div>
    <main class="container mx-auto my-8 p-4 lg:p-0">
      <h2 class="mb-4 text-2xl font-bold">Upcoming Movies</h2>
      <div
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      >
        <MovieGrid v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      movies: [],
    }
  },
  async mounted() {
    // Fetch top rated movies
    try {
      const response = await fetch(
        `${process.env.TMDB_API_URL}/movie/upcoming?api_key=${process.env.TMDB_API_KEY}`
      )
      const data = await response.json()
      this.movies = data.results
    } catch (error) {
      console.error('Error fetching popular movies data:', error)
    }
  },
  methods: {},
}
</script>
