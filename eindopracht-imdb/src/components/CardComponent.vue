<template>
    <div class="card mb-3" style="max-width: 660px;">
        <div class="row no-gutters">
            <div class="col-md-4">
            <img :src="film.poster" alt="" class="card-img">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">{{ film.title }} ({{ film.year }})</h5>
                <p class="card-text">{{ film.length}}</p>
                <p class="card-text">{{ film.plot }}</p>
                <p class="card-text">{{ film.rating}}/10</p>
                <button class="btn btn-success btn-lg"  @click="$emit('addToFav')">Add to favorites</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    props: {
        film: Object,
    },
}
</script>
