<template>
  <div class="rounded-lg bg-white p-4 shadow-md">
    <router-link
      :to="{
        name: 'movies-id-title',
        params: { id: movie.id, title: formatMovieTitle(movie.title) },
      }"
      @click="updateRouteParams(movie.id, movie.title)"
    >
      <!-- Image -->
      <div class="group relative overflow-hidden">
        <img
          :src="getImageUrl(movie.poster_path)"
          :alt="movie.title"
          class="w-full rounded-lg"
        />
        <p
          class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-br-md bg-orange-700 font-medium text-white"
        >
          {{ movie.vote_average }}
        </p>
        <p
          class="absolute bottom-0 hidden h-auto w-full rounded-b-lg bg-orange-700 bg-opacity-80 px-2 py-4 text-center text-white group-hover:block"
        >
          {{ movie.overview.slice(0, 150) }}
          <span v-if="movie.overview.length > 150" class="bottom-0">...</span>
        </p>
      </div>
    </router-link>
    <!-- Title -->
    <h3 class="mb-1 mt-2 text-lg font-semibold">
      {{ movie.title.slice(0, 23) }}
      <span v-if="movie.title.length > 23">...</span>
    </h3>
    <!-- Released Date -->
    <p class="text-gray-600">
      <span class="font-medium">Released:</span>
      {{
        new Date(movie.release_date).toLocaleString('en-us', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      }}
    </p>
  </div>
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
