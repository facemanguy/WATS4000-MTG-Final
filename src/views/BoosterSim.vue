<template>
    <div class="simulator">
        <h1>Magic: The Gathering Booster Pack Simulator</h1>
        <form v-on:submit.prevent="getPack">
            <p>Pick a set to generate a random Booster Pack</p>
            <em>Not all sets are currently supported, You may recieve an error</em>
            <br>
            <select v-model.trim="setName">
                <option v-for="option in setOptions" :key="option.id" v-bind:value="option.value">
                    {{ option.text }}
                </option>
            </select>
            <span>SetCode: {{setName}}</span>
            <button type="submit">Go</button>
        </form>

        <router-link to="/">Go back to Card Search</router-link>

        <div class="results-message">
            <loader v-if="showLoader === true"></loader>
            <div v-else-if="searches !==0 && results.cards && results.cards.length === 0" class="no-results">
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
                showLoader: false,
                selected: 'none',
                setOptions: [
                { text: 'Aether Revolt', value: 'AER'},
                { text: 'Amonkhet', value:'AKH'},
                { text: 'Battle for Zendikar', value: 'BFZ'},
                { text: 'Coldsnap', value: 'CSP'},
                { text: 'Conspiracy', value: 'CNS'},
                { text: 'Dominaria', value: 'DOM'},
                { text: 'Guildpact', value: 'GPT'},
                { text: 'Ixalan', value: 'XLN'},
                { text: 'Kaladesh', value: 'KLD'},
                { text: 'Khans of Tarkir', value: 'KTK' },
                { text: 'Mirrodin Besieged', value: 'MBS'},
                { text: 'Ravnica: City of Guilds', value: 'RAV'},
                { text: 'Return to Ravnica', value: 'RTR'},
                { text: 'Rise of the Eldrazi', value: 'ROE'},
                { text: 'Saviors of Kamigawa', value: 'SOK'},
                { text: 'Scars of Mirrodin', value: 'SOM'},
                { text: 'Theros', value: 'THS'},
                { text: 'Time Spiral', value: 'TSP'},
                { text: 'Unglued', value: 'UGL'},
                { text: 'Unhinged', value: 'UNH'}
                ]
            }
        },
        methods: {
            getPack: function () {
                this.showLoader = true;
                console.log('set test begin')
                //Note: Backticks are needed to make variable call
                axios.get(`https://api.magicthegathering.io/v1/sets/${this.setName}/booster`)
                .then(response =>{
                    this.results = response.data
                    console.log(response)
                    this.showLoader = false;
                    this.setName = '';
                })
                .catch(error =>{
                    this.showLoader = false;
                    this.messages.push({
                        type: 'error',
                        text: error.message
                    });
                    this.setName = '';
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