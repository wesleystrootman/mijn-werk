<template>
    <div class="row">
    <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
        <button @click="showFavMovie" type="button" class="btn btn-success">Favorites</button>
        <div class="films row">

            <FavoriteFilmComponent
                    v-for="(film, index) in filmData"
                    v-bind:index="index"
                    v-bind:film="film"
                    v-bind:key="index"
            />
        </div>
    </div>
    </div>
</template>

<script>
    import FavoriteFilmComponent from "./FavoriteFilmComponent";
    export default {
        name: "FavoriteComponent",
        components: {FavoriteFilmComponent},
        data(){
            return {
                key: 'value',
                favFilms: [],
            }
        },
        methods: {
            showFavMovie(ev){
                ev.preventDefault();

                if (localStorage.getItem('films')){
                    var storage = JSON.parse(localStorage.getItem('films'));
                    this.favFilms = storage;
                }
            }
        }
    }
</script>

<style scoped>



</style>