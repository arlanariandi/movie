<template>
  <div>
    <main class="container mx-auto my-8 px-4 lg:px-0">
      <!-- Search movies -->
      <div class="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search movies..."
          class="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring"
        />
        <div>
          <button
            class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Search
          </button>
          <button
            class="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </div>

      <h2 class="mb-4 text-2xl font-bold">Popular Movies</h2>

      <div class="mb-10 flex flex-nowrap overflow-x-auto">
        <div
          v-for="popularMovie in popularMovies"
          :key="popularMovie.id"
          class="flex-none bg-white p-4"
        >
          <!-- Image -->
          <div class="group relative overflow-hidden">
            <img
              :src="getImageUrl(popularMovie.poster_path)"
              alt="Movie Poster"
              class="w-60 rounded-lg"
            />
            <p
              class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-br-md bg-orange-700 font-medium text-white"
            >
              {{ popularMovie.vote_average }}
            </p>
            <p
              class="absolute bottom-0 hidden h-auto w-full rounded-b-lg bg-orange-700 bg-opacity-80 px-2 py-4 text-center text-white group-hover:block"
            >
              {{ popularMovie.overview.slice(0, 150) }}
              <span v-if="popularMovie.overview.length > 150" class="bottom-0"
                >...</span
              >
            </p>
          </div>

          <!-- Title -->
          <h3 class="mb-1 mt-2 text-lg font-semibold">
            {{ popularMovie.title.slice(0, 23) }}
            <span v-if="popularMovie.title.length > 23">...</span>
          </h3>

          <!-- Released Date -->
          <p class="text-gray-600">
            <span class="font-medium">Released:</span>
            {{
              new Date(popularMovie.release_date).toLocaleString('en-us', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            }}
          </p>
        </div>
      </div>

      <h2 class="mb-4 text-2xl font-bold">Top Rated Movies</h2>

      <div class="flex flex-nowrap overflow-x-auto">
        <div
          v-for="topRatedMovie in topRatedMovies"
          :key="topRatedMovie.id"
          class="flex-none bg-white p-4"
        >
          <!-- Image -->
          <div class="group relative overflow-hidden">
            <img
              :src="getImageUrl(topRatedMovie.poster_path)"
              alt="Movie Poster"
              class="w-60 rounded-lg"
            />
            <p
              class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-br-md bg-orange-700 font-medium text-white"
            >
              {{ topRatedMovie.vote_average }}
            </p>
            <p
              class="absolute bottom-0 hidden h-auto w-full rounded-b-lg bg-orange-700 bg-opacity-80 px-2 py-4 text-center text-white group-hover:block"
            >
              {{ topRatedMovie.overview.slice(0, 150) }}
              <span v-if="topRatedMovie.overview.length > 150" class="bottom-0"
                >...</span
              >
            </p>
          </div>

          <!-- Title -->
          <h3 class="mb-1 mt-2 text-lg font-semibold">
            {{ topRatedMovie.title.slice(0, 23) }}
            <span v-if="topRatedMovie.title.length > 23">...</span>
          </h3>

          <!-- Released Date -->
          <p class="text-gray-600">
            <span class="font-medium">Released:</span>
            {{
              new Date(topRatedMovie.release_date).toLocaleString('en-us', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      popularMovies: [],
      topRatedMovies: [],
    }
  },
  async mounted() {
    try {
      // Fetch popular movies
      const popularResponse = await fetch(
        `${process.env.TMDB_API_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}`
      )
      const popularData = await popularResponse.json()
      this.popularMovies = popularData.results

      // Fetch top rated movies
      const topRatedResponse = await fetch(
        `${process.env.TMDB_API_URL}/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`
      )
      const topRatedData = await topRatedResponse.json()
      this.topRatedMovies = topRatedData.results
    } catch (error) {
      console.error('Error fetching movie data:', error)
    }
  },
  methods: {
    // getImageUrl(posterPath) {
    //   if (!posterPath) {
    //     return 'https://via.placeholder.com/300x450?text=No+Poster'
    //   }
    //   return `https://image.tmdb.org/t/p/w300${posterPath}`
    // },
  },
  // ...
}
</script>
