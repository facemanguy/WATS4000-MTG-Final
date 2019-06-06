<template>
    <div class="simulator">
        <h1>Magic: The Gathering Booster Pack Simulator</h1>
        <form v-on:submit.prevent="getPack">
            <p>Pick a set to generate a random Booster Pack</p>
            <ul>
                <li><label>Name <input v-model="setName" type="text" placeholder="Core2015"></label></li>
            </ul>
            <button type="submit">Go</button>
        </form>

        <router-link to="/">Go back to Card Search</router-link>

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
        name: "simulator",
        components: {
            CardViewer,
            'message-container': MessageContainer,
            loader: CircleLoader
        },
        data () {
            return {
                results: [],
                messages: [],
                setName: '',
                searches: 0,
                showLoader: false
            }
        },
        methods: {
            getPack: function () {
                this.showLoader = true;
                //Note: Backticks are needed to make variable call
                axios.get('https://api.magicthegathering.io/v1/sets/'+`${this.setName}`+'/booster')
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