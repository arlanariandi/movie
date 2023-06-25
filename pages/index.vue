<template>
  <div>
    <h2>Daftar Film</h2>
    <div class="movie-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" class="poster" />
        <h3>{{ movie.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: []
    };
  },
  async mounted() {
    try {
      const response = await fetch(`${process.env.TMDB_API_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}`);
      const data = await response.json();
      this.movies = data.results;
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
.movie-list {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.movie-card {
  flex: 0 0 auto;
  width: 300px;
  margin-right: 20px;
}

.poster {
  width: 100%;
  height: auto;
}
</style>
