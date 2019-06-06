<template>
  <transition name="fadeDown" appear tag="div">
    <li v-bind:class="[message.type, 'message']" v-show="showMessage">
      {{ message.text }}
      <button v-on:click="close">close</button>
    </li>
  </transition>
</template>

<script>
require('vue2-animate/dist/vue2-animate.min.css');
// Each Message Item expects a `message` object.
// Each message should have the following properties:
// message.type - A string indicating the type. Either "info", "success", or "error"
// message.text - The text of the message. Text only, no HTML formatting.
export default {
  name: 'MessageContainer',
  props: {
    message: Object
  },
  data () {
    return {
      showMessage: true
    }
  },
  methods: {
    close: function () {
      this.showMessage = false;
    }
  }
}
</script>

<style scoped>
.message {
  margin: 1rem;
  padding: 1rem;
  font-size: 1rem;
}
.error {
    width: 300px;
    margin: 0 auto;
    background: lightgrey;
    color: red;
    font-weight: 600;
}
/* .success {
  background: green;
  color: white;
}
.info {
  background: blue;
  color: white;
} */
</style>