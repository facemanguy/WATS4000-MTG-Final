<template>
    <div class="card">
        <img v-if="image !== undefined" :src="image">
        <div v-else><img src="../../card-back.jpg"></div>
        <h4> {{name}} </h4>
        <h5> {{blockName}} </h5>
    </div>
</template>

<script>
export default {
    name: 'card',
    props: ["name", "image", "blockName"],
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