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
        <CardViewer v-for="item in results.cards" :key="item.id" :name="item.name" :image="item.imageUrl"></CardViewer>
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
                searches: 0,
                showLoader: false
            }
        },
        methods: {
            findCards: function () {
                this.showLoader = true;
                axios.get('https://api.magicthegathering.io/v1/cards/',{
                    params: {
                        name: this.cardName
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