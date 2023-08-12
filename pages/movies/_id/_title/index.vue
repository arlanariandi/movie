<template>
  <div>
    <div v-if="movie">
      <div
        class="bg-slate-600 bg-cover bg-center bg-no-repeat p-8 bg-blend-multiply"
        :style="{
          backgroundImage: getBackdropUrl(movie.backdrop_path),
        }"
      >
        <div class="mx-auto max-w-screen-lg px-4 py-8">
          <div class="flex-none lg:flex">
            <img
              :src="getImageUrl(movie.poster_path)"
              alt="Movie Poster"
              class="mb-4 mr-6 w-80 rounded-lg shadow-md lg:mb-0"
            />
            <div>
              <h1 class="mb-2 text-3xl font-bold text-slate-200">
                {{ movie.title }}
                <span class="font-light">
                  ({{
                    new Date(movie.release_date).toLocaleString('en-us', {
                      year: 'numeric',
                    })
                  }})
                </span>
              </h1>

              <div class="mb-2 flex-none lg:flex">
                <p class="mr-1 font-light text-slate-200">
                  {{ formatDate(movie.release_date) }}
                </p>
                <p class="mr-1 font-light text-slate-200">
                  <span class="hidden font-semibold lg:inline">| </span
                  >{{ movieGenres }}
                </p>
                <p class="font-light text-slate-200">
                  <span class="hidden font-semibold lg:inline">| </span
                  >{{ formatDuration(movie.runtime) }}
                </p>
              </div>

              <p class="mb-6 text-slate-200">
                <span class="font-semibold">Vote Average:</span>
                {{ getVotePercentage(movie.vote_average) }}
              </p>
              <p class="mb-2 font-light italic text-slate-200">
                {{ movie.tagline }}
              </p>
              <p class="mb-2 text-xl font-semibold text-slate-200">Overview</p>
              <p class="text-slate-200">{{ movie.overview }}</p>
            </div>
          </div>
        </div>
      </div>
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
    getBackdropUrl(backdropPath) {
      if (!backdropPath) {
        return 'https://via.placeholder.com/1080x500?text=No+Poster'
      }
      return `url('https://image.tmdb.org/t/p/original${backdropPath}')`
    },
    getVotePercentage(voteAverage) {
      return (voteAverage * 10).toFixed(0) + '%'
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      const date = new Date(dateString)
      // format indonesia
      // return date.toLocaleDateString('id-ID', options)
      // format english
      return date.toLocaleDateString('en-us', options)
    },
    formatDuration(minutes) {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      return `${hours}h ${remainingMinutes}m`
    },
  },
  computed: {
    movieGenres() {
      if (this.movie.genres) {
        return this.movie.genres.map((genre) => genre.name).join(', ')
      }
      return 'Genre tidak tersedia'
    },
  },
}
</script>
