<template>
  <div>
    <header class="bg-gray-800 text-white p-4">
      <h1 class="text-2xl font-bold">Web Movie</h1>
    </header>

    <main class="container mx-auto my-8 px-4 lg:px-0">
      <!-- Search movies -->
      <div class="flex justify-between items-center mb-4">
        <input type="text" placeholder="Search movies..."
          class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300">
        <button class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2">Search</button>
      </div>

      <h2 class="text-2xl font-bold mb-4">Featured Movies</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <!-- Movie Card -->
        <div v-for="movie in movies.slice(0, limit)" :key="movie.id" class="bg-white shadow-md rounded-lg p-4">
          <div class="group relative overflow-hidden">
            <img :src="getImageUrl(movie.poster_path)" alt="Movie Poster" class="w-full rounded-lg">
            <p
              class="flex absolute top-0 left-0 justify-center bg-orange-700 font-medium rounded-br-md w-10 h-10 items-center text-white">
              {{ movie.vote_average }}
            </p>
            <p
              class="hidden group-hover:block absolute bottom-0 bg-orange-700 bg-opacity-80 rounded-b-lg w-full h-auto md:h-3/3 text-white px-2 py-8 md:py-4 text-center">
              {{ movie.overview.slice(0, 150) }}
              <span v-if="movie.overview.length > 150" class="bottom-0">...</span>
            </p>
          </div>



          <h3 class="text-lg font-semibold mt-2 mb-1">{{ movie.title.slice(0, 20) }}
            <span v-if="movie.title.length > 20">...</span>
          </h3>

          <p class="text-gray-600">
            <span class="font-medium">Released:</span>
            {{ new Date(movie.release_date).toLocaleString('en-us', {
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
import axios from 'axios';

export default {
  data() {
    return {
      movies: [],
      limit: 8,
    };
  },
  mounted() {
    this.fetchMovies();
  },

  methods: {
    async fetchMovies() {
      try {
        const response = await axios.get(`${process.env.TMDB_API_URL}/movie/popular`, {
          params: {
            api_key: process.env.TMDB_API_KEY
          }
        });
        this.movies = response.data.results;
      } catch (error) {
        console.error(error);
      }
    },

    getImageUrl(posterPath) {
      if (!posterPath) {
        return '/assets/images/com.jpg';
      }
      return `https://image.tmdb.org/t/p/w500/${posterPath}`;
    }
  },
};
</script>
