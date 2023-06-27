<template>
  <div class="flex-none bg-white p-4">
    <!-- Image -->
    <div class="group relative overflow-hidden">
      <img
        :src="getImageUrl(movie.poster_path)"
        :alt="movie.title"
        class="w-60 rounded-lg"
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
  },
}
</script>
