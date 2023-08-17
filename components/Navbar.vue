<template>
  <nav class="bg-gray-800 p-4">
    <div class="flex items-center justify-between px-2 lg:px-8">
      <!-- Logo atau Judul -->
      <div class="text-lg font-semibold text-white">
        <img class="h-10 w-auto" src="/images/logo.png" alt="Movie Nuxt" />
      </div>

      <!-- Menu Toggle untuk Tampilan Mobile -->
      <div class="md:hidden">
        <button @click="toggleMenu" class="text-white">
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Menu untuk Tampilan Desktop -->
      <div class="hidden md:flex md:items-center md:space-x-4">
        <NuxtLink
          :to="{ name: 'index' }"
          class="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          Home
        </NuxtLink>
        <NuxtLink
          :to="{ name: 'movies' }"
          class="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          Popular
        </NuxtLink>
        <NuxtLink
          :to="{ name: 'movies-now-playing' }"
          class="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          Now Playing
        </NuxtLink>
        <NuxtLink
          :to="{ name: 'movies-up-coming' }"
          class="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          Upcoming
        </NuxtLink>
        <NuxtLink
          :to="{ name: 'movies-top-rated' }"
          class="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          Top Rated
        </NuxtLink>
      </div>
    </div>

    <!-- Menu untuk Tampilan Mobile -->
    <ul v-if="menuOpen" class="mt-4 md:hidden">
      <li class="flex">
        <NuxtLink
          :to="{ name: 'index' }"
          class="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          Home
        </NuxtLink>
      </li>
      <li class="flex">
        <NuxtLink
          :to="{ name: 'movies' }"
          class="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          Popular
        </NuxtLink>
      </li>
      <li class="flex">
        <NuxtLink
          :to="{ name: 'movies-now-playing' }"
          class="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          Now Playing
        </NuxtLink>
      </li>
      <li class="flex">
        <NuxtLink
          :to="{ name: 'movies-up-coming' }"
          class="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          Upcoming
        </NuxtLink>
      </li>
      <li class="flex">
        <NuxtLink
          :to="{ name: 'movies-top-rated' }"
          class="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          Top Rated
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
  },
}
</script>

<style scoped>
/* Gaya lainnya */
</style>
