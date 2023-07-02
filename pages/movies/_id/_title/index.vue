<template>
  <div>
    <div v-if="movie">
      <div class="mx-auto max-w-screen-lg px-4 py-8">
        <div class="flex-none lg:flex">
          <img
            :src="getImageUrl(movie.poster_path)"
            alt="Movie Poster"
            class="mb-4 mr-6 w-80 rounded-lg shadow-md lg:mb-0"
          />
          <div>
            <h1 class="mb-2 text-3xl font-bold">
              {{ movie.title }}
              <span class="font-light">
                ({{
                  new Date(movie.release_date).toLocaleString('en-us', {
                    year: 'numeric',
                  })
                }})
              </span>
            </h1>
            <p class="mb-2 font-semibold text-gray-500">
              Released:
              <span class="font-light">
                {{
                  new Date(movie.release_date).toLocaleString('en-us', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                }}
              </span>
            </p>
            <p class="mb-6 text-gray-500">
              <span class="font-semibold">Vote Average:</span>
              {{ movie.vote_average }}
            </p>
            <p class="mb-2 text-xl font-semibold text-gray-700">Overview</p>
            <p class="text-gray-700">{{ movie.overview }}</p>
          </div>
        </div>
      </div>
      <!-- <div class="mx-auto max-w-screen-lg px-4 py-8">
        <h1 class="mb-4 text-2xl font-semibold">{{ movie.title }}</h1>
        <div class="flex">
          <img
            :src="getImageUrl(movie.poster_path)"
            alt="Movie Poster"
            class="mr-4 w-48"
          />
          <div>
            <p class="mb-2">
              <span class="font-semibold">Release Date:</span>
              {{ movie.release_date }}
            </p>
            <p class="mb-2">
              <span class="font-semibold">Vote Average:</span>
              {{ movie.vote_average }}
            </p>
            <p class="mb-2">
              <span class="font-semibold">Overview:</span> {{ movie.overview }}
            </p>
          </div>
        </div>
      </div> -->
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
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
