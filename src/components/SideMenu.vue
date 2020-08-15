<template>
    <v-navigation-drawer v-model="drawer"  align-center="align-center" right fixed app clipped class="drawer-style pad-10 white--text" color="primary"  id="style-1">
        <v-input message="Digita una Località" background-color="white" hint="Inserire una località" color="primary" v-model="citta"></v-input>
        <div class="">
            <h2>{{meteo.name}}</h2>
            <h4>{{meteo.main.temp}}°</h4>
            <h5>{{meteo.weather[0].description}}</h5>
            <img :src="meteo.iconPrefix + meteo.weather[0].icon + meteo.iconSuffix" alt="">
        </div>

  </v-navigation-drawer>
</template>


<script>
import axios from 'axios'

export default {

   props: {
      meteo: Object,
      drawer: Boolean
    },

  data: () => ({
    errors: [],
    citta: 'Digita una Localita'
  }),

  mounted () {

  },

  methods: {

  }

}
</script>

<style>
 #style-1 {
     text-transform: capitalize;
     padding-top: 100px;
 }

 .pad-10 {
     padding-left: 20px;
 }
</style>
