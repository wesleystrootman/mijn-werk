<template>
    <div class="row">
        <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
            <form class="justify-content-center">
                <div class="form-group">
                    <label for="movie-title" class="display-4 py-2 text-white">Movie Title</label>
                    <input type="text" class="form-control align-center" v-model="movieTitle" id="movie-title" placeholder="Movie Title" />
                </div><br>
                    <button type="submit" class="btn btn-danger btn-lg" @click="handleClick">Search</button>
            </form>
        </div>

        <CardComponent
            v-for="(film, index) in filmData" 
            v-bind:index="index"
            v-bind:film="film"
            v-bind:key="index"
            v-on:addToFav="$emit('save', film)"
        />
    </div>
</template>

<script>
    import CardComponent from "./CardComponent"
    export default {
        name: "SearchComponent",
        components: {
            CardComponent
        },
        props: {
            msg: String
        },
        data() {
            return {
                key: 'value',
                movieTitle: '',
                filmData: [],
            }

        },
        methods: {
            handleClick(ev) {
                ev.preventDefault();

                let movie = {
                    movieTitle: this.movieTitle,
                };

                this.getMovie(movie);

                window.console.log(movie);
            },

            getMovieInfo(value) {
                fetch("https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/" + value.movieTitle, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
                        "x-rapidapi-key": "ad0208d137msh61f916aa9e5e823p16c9aajsn1f8853ab566e"
                    }
                })
                    .then(response => {
                        response.json().then(data => {this.filmData = [data]; });
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },

            getMovie(value) {
                window.console.log('FilmComponent', value);
                this.getMovieInfo(value);
            }
        },
    }
</script>

<style scoped>

    form:before {
        content: '';
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        background-color: rgba(0,0,0,0.3);
        z-index: -1;
        border-radius: 10px;
    }

</style>