<template>
  <!-- Image -->
  <div class="flex w-full rounded-lg border border-gray-300 hover:bg-gray-100">
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
        {{ movie.overview.slice(0, 350) }}
        <span v-if="movie.overview.length > 350">...</span>
      </p>
    </div>
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
  },
}
</script>
