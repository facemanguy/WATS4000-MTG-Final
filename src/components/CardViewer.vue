<template>
    <div class="card">
        <img v-if="image !== undefined" :src="image">
        <div v-else>Not Available</div>
        <h4> {{name}} </h4>
    </div>
</template>

<script>
export default {
    name: 'card',
    props: ["name", "image"],
    data () {
        return {
        }
    }
}
</script>

<style>
.h4 {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
}
img.card {
    width: 200px;
}
.card {
    display: inline-block;
    margin: 4px;
}
</style>