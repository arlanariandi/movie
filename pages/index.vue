<template>
  <div>
    <main class="container mx-auto my-8 px-4 lg:px-0">
      <!-- Search movies -->
      <div class="flex justify-between items-center mb-4">
        <input type="text" placeholder="Search movies..."
          class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300">
        <button class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2">Search</button>
      </div>

      <h2 class="text-2xl font-bold mb-4">Popular Movies</h2>

      <div class="flex flex-nowrap overflow-x-auto mb-10">
        <div v-for="popularMovie in popularMovies" :key="popularMovie.id" class="flex-none bg-white p-4">
          <!-- Image -->
          <div class="group relative overflow-hidden">
            <img :src="getImageUrl(popularMovie.poster_path)" alt="Movie Poster" class="w-60 rounded-lg">
            <p
              class="flex absolute top-0 left-0 justify-center bg-orange-700 font-medium rounded-br-md w-10 h-10 items-center text-white">
              {{ popularMovie.vote_average }}
            </p>
            <p
              class="hidden group-hover:block absolute bottom-0 bg-orange-700 bg-opacity-80 rounded-b-lg w-full h-auto text-white px-2 py-4 text-center">
              {{ popularMovie.overview.slice(0, 150) }}
              <span v-if="popularMovie.overview.length > 150" class="bottom-0">...</span>
            </p>
          </div>

          <!-- Title -->
          <h3 class="text-lg font-semibold mt-2 mb-1">{{ popularMovie.title.slice(0, 23) }}
            <span v-if="popularMovie.title.length > 23">...</span>
          </h3>

          <!-- Released Date -->
          <p class="text-gray-600">
            <span class="font-medium">Released:</span>
            {{ new Date(popularMovie.release_date).toLocaleString('en-us', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
            }}
          </p>
        </div>
      </div>

      <h2 class="text-2xl font-bold mb-4">Top Rated Movies</h2>

      <div class="flex flex-nowrap overflow-x-auto">
        <div v-for="topRatedMovie in topRatedMovies" :key="topRatedMovie.id" class="flex-none bg-white p-4">
          <!-- Image -->
          <div class="group relative overflow-hidden">
            <img :src="getImageUrl(topRatedMovie.poster_path)" alt="Movie Poster" class="w-60 rounded-lg">
            <p
              class="flex absolute top-0 left-0 justify-center bg-orange-700 font-medium rounded-br-md w-10 h-10 items-center text-white">
              {{ topRatedMovie.vote_average }}
            </p>
            <p
              class="hidden group-hover:block absolute bottom-0 bg-orange-700 bg-opacity-80 rounded-b-lg w-full h-auto text-white px-2 py-4 text-center">
              {{ topRatedMovie.overview.slice(0, 150) }}
              <span v-if="topRatedMovie.overview.length > 150" class="bottom-0">...</span>
            </p>
          </div>

          <!-- Title -->
          <h3 class="text-lg font-semibold mt-2 mb-1">{{ topRatedMovie.title.slice(0, 23) }}
            <span v-if="topRatedMovie.title.length > 23">...</span>
          </h3>

          <!-- Released Date -->
          <p class="text-gray-600">
            <span class="font-medium">Released:</span>
            {{ new Date(topRatedMovie.release_date).toLocaleString('en-us', {
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
    };
  },
  async mounted() {
    try {
      // Fetch popular movies
      const popularResponse = await fetch(`${process.env.TMDB_API_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}`);
      const popularData = await popularResponse.json();
      this.popularMovies = popularData.results;

      // Fetch top rated movies
      const topRatedResponse = await fetch(`${process.env.TMDB_API_URL}/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`);
      const topRatedData = await topRatedResponse.json();
      this.topRatedMovies = topRatedData.results;
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  },
  methods: {
    getImageUrl(posterPath) {
      if (!posterPath) {
        return 'https://via.placeholder.com/300x450?text=No+Poster';
      }
      return `https://image.tmdb.org/t/p/w300${posterPath}`;
    }
  },
  // ...
};
</script>

<style scoped>
.header {
  background-color: #f2f2f2;
}

ul {
  display: flex;
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  cursor: pointer;
}

li.active {
  background-color: #ddd;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}

.movie-card {
  width: calc(25% - 20px);
  margin-bottom: 20px;
}

.poster {
  width: 100%;
  height: auto;
}
</style>
