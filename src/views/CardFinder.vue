<template>
    <div class="finder">
        <h1>Magic: The Gathering Card Finder</h1>
        <form v-on:submit.prevent="findCards">
            <p>Look for a card by filling out the form below</p>
            <ul>
                <li><label>Name <input v-model="cardName" type="text" placeholder="Nissa"></label></li>
                <li><label>CMC <input v-model="cardCMC" type="number" placeholder="5"></label></li>
                <li><label>Type <input v-model="cardType" type="text" placeholder="Creature"></label></li>
            </ul>
            <button type="submit">Go</button>
        </form>

        <router-link to="/boosterSim">Try the Booster Pack Simulator</router-link>

        <div class="results-message">
            <loader v-if="showLoader === true"></loader>
            <div v-else-if="searches !==0 && results.cards.length === 0" class="no-results">
                <h2>No Cards Found</h2>
                <p>Please adjust your search and try again</p>
            </div>
        </div>
        <div class="messages">
            <message-container v-bind:messages="messages"></message-container>
        </div>
        
        <transition-group name="fade" tag="div" appear>
        <CardViewer v-for="item in results.cards" :key="item.id" :name="item.name" :image="item.imageUrl" :cmc="item.cmc" :type="item.types"></CardViewer>
        </transition-group>
    </div>
</template>

<script>
    import axios from 'axios';
    import CardViewer from '@/components/CardViewer'
    //Note: SDK is not currently utilized
    const mtg = require('mtgsdk')
    // Note: vue2-animate is added using the require statement because it is a CSS file
    require('vue2-animate/dist/vue2-animate.min.css');
    import MessageContainer from '@/components/MessageContainer';
    import CircleLoader from '@/components/CircleLoader';

    export default {
        name: "finder",
        components: {
            CardViewer,
            'message-container': MessageContainer,
            loader: CircleLoader
        },
        data () {
            return {
                results: [],
                messages: [],
                cardName: '',
                cardCMC: null,
                searches: 0,
                showLoader: false,
                cardType: ''
            }
        },
        methods: {
            findCards: function () {
                this.showLoader = true;
                axios.get('https://api.magicthegathering.io/v1/cards/',{
                    params: {
                        name: this.cardName,
                        cmc: this.cardCMC,
                        type: this.cardType
                    }
                })
                .then(response =>{
                    this.results = response.data
                    console.log(response)
                    this.showLoader = false;
                })
                .catch(error =>{
                    this.showLoader = false;
                    this.messages.push({
                        type: 'error',
                        text: error.message
                    });
                })
                //hides inital no cards message
                this.searches++;

            }
        }
    }
</script>

<style scoped>

ul {
  list-style-type: none;
}

.no-results {
    clear: none;
    display: inline-block;
}

.results-message {
    clear: both;
}

</style>