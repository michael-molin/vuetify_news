<template>
    <v-app>
        <SideMenu :drawer="drawer" :meteo="dataMeteo" ></SideMenu>
        <v-app-bar fixed clipped-left color="primary" class="elevation-2">
            <div class="div-nav">
                <v-app-bar-nav-icon @click="drawer = !drawer" class="float-right" ><v-icon class="fas fa-cloud-sun white--text"></v-icon></v-app-bar-nav-icon>
                <span class="white--text float-left">Vuetify News</span>
            </div>

        </v-app-bar>


        <v-main class="margin-top">
            <v-container fluid>
                <MainContent :articles="articles"></MainContent> <!-- Add the component in the template -->
            </v-container>
        </v-main>

        <v-footer class="secondary" app>
            <v-layout row wrap align-center>
                <v-flex xs12>
                    <div class="white--text ml-3">
                        Realizzato con
                        <v-icon class="red--text">favorite</v-icon>
                        e <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>. Basato sul progetto di <a class="white--text" href="https://github.com/rachidsakara"
                        target="_blank">Rachid Sakara</a>
                    </div>
                </v-flex>
            </v-layout>
        </v-footer>
    </v-app>
</template>

<script>

import axios from 'axios' // importing the axios (a HTTP library) to connects the app with the News API
import MainContent from './components/MainContent.vue' // import the Main Content component
import SideMenu from './components/SideMenu.vue'
export default {

  components: {
        MainContent, // Register the component
        SideMenu
  },

  data() {
    return {
      drawer: false, // false = Vuetify automatically "do the right thing" to show/hide the drawer
      api_key:'9919924d5249414fb13e3a0e20ee893b', // Your API Key go here
      articles: [],
      dataMeteo: {},
      errors: [],
    }
  },
  created () {
    axios.get('https://newsapi.org/v2/top-headlines?country=it&apiKey='+this.api_key)
      .then(response => {
        //this.articles = response.data.articles
        this.articles = response.data.articles
        console.log('data:')
        console.log(response.data.articles) // This will give you access to the full object
      })
      .catch(e => {
        this.errors.push(e)
      })
      axios({
        "method": "GET",
        "url": "https://community-open-weather-map.p.rapidapi.com/weather",
        "headers": {
              "content-type": "application/octet-stream",
              "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
              "x-rapidapi-key": "c8b7cc50c3msh9fe9e3f2a455018p1ec642jsnbd51f6bc37d2",
              "useQueryString": true,
              'Access-Control-Allow-Headers': 'application/json'
        },
        "params": {
              "units": "Metric",
              "lang": 'it',
              "q": 'Venezia'
        },
        contentType: 'application/json',
        dataType: "jsonp",
        responseType: 'application/json'
        }).then((response) => { // LA RISPOSTA DALL API
           console.log(response.data);
           response.data.iconPrefix = "http://openweathermap.org/img/wn/"; // AGGIUNGO PREFIX
           response.data.iconSuffix= "@2x.png" // AGGIUNGO SUFFIX
           this.dataMeteo = response.data;
        }).catch((error) => {
           console.log(error);
       })
  },
  methods: {

         }
  }
</script>

<style>
    .margin-top {
        margin-top: 50px;
    }
    .div-nav {
        width: 100vw;
        line-height: 50px;
    }
</style>
