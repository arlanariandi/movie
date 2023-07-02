<template>
  <div>
    <h1>Movie Detail</h1>
    <div v-if="movie">
      <h2>{{ movie.title }}</h2>
      <p>{{ movie.overview }}</p>
      <!-- Tampilkan informasi lainnya tentang film -->
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    try {
      const response = await $axios.get(`/movie/${params.id}`, {
        params: {
          api_key: `${process.env.TMDB_API_KEY}`,
        },
      })

      return {
        movie: response.data,
      }
    } catch (error) {
      console.error('Error:', error)
      return {
        movie: null,
      }
    }
  },
}
</script>
