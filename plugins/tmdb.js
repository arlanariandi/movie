import axios from 'axios'

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '97067610ff9fe6871aae38f7d7d1fa4f'
  }
})

export default ({ app }, inject) => {
  inject('tmdb', tmdb)
}
