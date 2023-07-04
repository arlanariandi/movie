<template>
  <!-- Image -->
  <router-link
    :to="{
      name: 'movies-id-title',
      params: { id: movie.id, title: formatMovieTitle(movie.title) },
    }"
    @click="updateRouteParams(movie.id, movie.title)"
  >
    <div
      class="flex w-full rounded-lg border border-gray-300 hover:bg-gray-100"
    >
      <img
        :src="getImageUrl(movie.poster_path)"
        :alt="movie.title"
        class="mr-4 h-36 w-24 rounded-l-lg object-cover"
      />
      <div class="mt-2 lg:mt-4">
        <h2 class="text-lg font-bold">
          {{ movie.title }}
        </h2>
        <!-- Released Date -->
        <p class="text-gray-400">
          {{
            new Date(movie.release_date).toLocaleString('en-us', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          }}
        </p>
        <p class="mb-2 mt-4 text-gray-600">
          {{ movie.overview.slice(0, 300) }}
          <span v-if="movie.overview.length > 300">...</span>
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getImageUrl(posterPath) {
      if (!posterPath) {
        return 'https://via.placeholder.com/300x450?text=No+Poster'
      }
      return `https://image.tmdb.org/t/p/w300${posterPath}`
    },
    // Fungsi untuk memformat judul film ke dalam bentuk yang valid untuk URL
    formatMovieTitle(title) {
      // Mengubah judul menjadi huruf kecil dan mengganti spasi dengan tanda strip
      const formattedTitle = title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-')
      // Mengkodekan judul film menggunakan encodeURIComponent agar aman untuk digunakan dalam URL
      return encodeURIComponent(formattedTitle)
    },
    // Fungsi untuk memperbarui parameter rute dan URL saat sebuah film dipilih
    updateRouteParams(id, title) {
      // Mengformat judul film menjadi bentuk yang valid untuk URL
      const formattedTitle = this.formatMovieTitle(title)
      // Menggunakan $router.replace untuk mengganti URL dengan parameter baru
      this.$router.replace({
        name: 'movie-detail',
        params: { id, title: formattedTitle },
        query: this.$route.query,
      })
    },
  },
}
</script>
