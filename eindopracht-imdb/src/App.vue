<template>
  <div>
    <Header></Header>
    <div class="container">
      <SearchComponent @save="saveFav"></SearchComponent>
      <div class="row mt-5">
      <FavoriteFilmComponent
              v-for="(film, index) in films"
              v-bind:index="index"
              v-bind:film="film"
              v-bind:key="index"
      />
      </div>
    </div>

  </div>
</template>

<script>
import Header from './components/AppHeader.vue'
import SearchComponent from "./components/SearchComponent";
import FavoriteFilmComponent from "./components/FavoriteFilmComponent";


export default {
  name: 'app',
  components: {
    Header,
    SearchComponent,
    FavoriteFilmComponent
  },
  data() {
    return {
      films: [],
    }

  },
  methods: {
    saveFav(data){
      window.console.log(data);

      if (localStorage.getItem('films')){
            var storage = JSON.parse(localStorage.getItem('films'));

            this.films = storage;
      }
      this.films.push(data);
      let stringFilms = JSON.stringify(this.films);
      localStorage.setItem('films', stringFilms);

    },

    saveLocalStorage(){
      window.console.log('Opgeslagen!');
      if (localStorage.getItem('films')) this.films =
              JSON.parse(localStorage.getItem('films'));
    },
  },
  mounted() {
    if (localStorage.getItem("films")){
      this.films = JSON.parse(localStorage.getItem("films"));
    } else {
      this.films = [];
    }
  },
}
</script>

<style>


</style>
