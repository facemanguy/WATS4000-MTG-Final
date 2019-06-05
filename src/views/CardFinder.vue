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
        <!-- <ul  class="results">
            <li v-for="(card, index) in results.list" :key="index">
            <p>{{results.name}}</p>
            </li>
        </ul> -->

        <!-- <li v-for="item in results.cards" :key="item.id">{{item.name}}<img :src="item.imageUrl"></li> -->
        <CardViewer v-for="item in results.cards" :key="item.id" :name="item.name" :image="item.imageUrl"></CardViewer>
    </div>
</template>

<script>
    import axios from 'axios';
    import CardViewer from '@/components/CardViewer'
    const mtg = require('mtgsdk')

    export default {
        name: "finder",
        components: {
            CardViewer
        },
        data () {
            return {
                results: [],
                errors: [],
                cardName: ''
            }
        },
        methods: {
            findCards: function () {
                axios.get('https://api.magicthegathering.io/v1/cards/',{
                    params: {
                        name: this.cardName
                    }
                })
                .then(response =>{
                    this.results = response.data
                    console.log(response)
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