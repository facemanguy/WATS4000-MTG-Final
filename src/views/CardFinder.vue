<template>
    <div class="finder">
        <h1>Magic: The Gathering Card Finder</h1>
        <form>
            <p>Look for a card by filling out the form below</p>
            <ul>
                <li><label>Name <input type="text" placeholder="Nissa"></label></li>
                <li><label>Color <input type="text" placeholder="Green"></label></li>
                <li><label>Type <input type="text" placeholder="Creature"></label></li>
            </ul>
            <p>{{}}</p>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "CardFinder",
        data () {
            return {

            }
        },
        methods: {
            findCards: function () {
                this.results = null;
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
                })

            }
        }
    }
</script>

<style scoped>

ul {
  list-style-type: none;
}

</style>