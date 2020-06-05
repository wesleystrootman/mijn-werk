<template>
        <div class="col-6 col-md-4 mb-4">
            <div class="card cardstyle">
                <img :src="film.poster" class="card-img-top image" alt="...">
                    <div class="card-body" style="text-align: center">
                        <p class="card-text">{{ film.title }}</p>
                    </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "FavoriteFilmComponent",
        props: ['film']
    }
</script>

<style scoped>

    .cardstyle img{
        height: 16rem;

    }

    @media (min-width: 768px){
        .cardstyle img{
            height: 32rem;

        }
    }





</style>
