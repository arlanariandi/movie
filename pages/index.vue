<template>
  <div>
    <header class="bg-gray-800 text-white p-4">
      <h1 class="text-2xl font-bold">Web Movie</h1>
    </header>

    <main class="container mx-auto my-8">
      <div class="flex justify-between items-center mb-4">
        <input type="text" placeholder="Search movies..."
          class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300">
        <button class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2">Search</button>
      </div>

      <h2 class="text-2xl font-bold mb-4">Featured Movies</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <!-- Movie Card -->
        <div v-for="movie in movies.slice(0, limit)" :key="movie.id" class="bg-white shadow-md rounded-lg p-4">
          <img :src="getImageUrl(movie.poster_path)" alt="Movie Poster" class="w-full rounded-lg mb-2">
          <h3 class="text-lg font-semibold mb-1">{{ movie.title }}</h3>
          <p class="text-gray-600">{{ movie.release_date }}</p>
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
      limit: 10,
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
