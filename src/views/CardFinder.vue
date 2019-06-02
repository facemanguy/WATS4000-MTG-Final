<template>
    <div class="finder">
        <h1>Magic: The Gathering Card Finder</h1>
        <form v-on:submit.prevent="findCards">
            <p>Look for a card by filling out the form below</p>
            <ul>
                <li><label>Name <input v-model="cardName" placeholder="Nissa"></label><button type="submit">Go</button></li>
                <li><label>Color <input type="text" placeholder="Green"></label></li>
                <li><label>Type <input type="text" placeholder="Creature"></label></li>
            </ul>
            
        </form>
        <ul v-if="results.length > 0" class="results">
            <li v-for="(card, index) in results.list" :key="index">
            <p>{{results.name}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "finder",
        data () {
            return {
                results: [],
                errors: [],
                cardName: ''
            }
        },
        methods: {
            findCards: function () {
                //this.results = null;
                axios.get('https://api.magicthegathering.io/',{
                    params: {
                        name: this.cardName
                    }
                })
                .then(response =>{
                    this.results = response.data
                })
                .catch(error =>{
                    this.errors.push(error)
                });

            }
        }
    }
</script>

<style scoped>

ul {
  list-style-type: none;
}

</style>