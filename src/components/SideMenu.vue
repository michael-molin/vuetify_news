<template>
    <v-navigation-drawer v-model="drawer" light align-center="align-center" right fixed app clipped class="drawer-style px-3 white--text" color="primary"  id="style-1">
        <v-text-field class="text--white" color="white" light v-model="citta" solo placeholder="Cerca una località" @keypress.13="getDataMeteo(citta)"></v-text-field>
        <div v-if="dataMeteo.length!=0">
            <div class="overlay-loading" v-if="loading">
                <v-progress-circular class="text--white" indeterminate></v-progress-circular>
            </div>
            <div v-else v-for="(datoMeteo, index) in dataMeteo" :key="index" class="d-flex dati-meteo">
                <div>
                    <h4>{{datoMeteo.giorno}}</h4>
                    <h5>{{datoMeteo.temp}}°</h5>
                    <h5>{{datoMeteo.weather[0].description}}</h5>
                </div>
                <div>
                    <img :src="datoMeteo.iconPrefix + datoMeteo.weather[0].icon + datoMeteo.iconSuffix" alt="">
                </div>
            </div>
        </div>

  </v-navigation-drawer>
</template>


<script>
import axios from 'axios'

export default {

   props: {
      drawer: Boolean
    },

  data: () => ({
    errors: [],
    citta: '',
    dataMeteo: [],
    loading: false
  }),

  mounted () {
  },

  methods: {
      getDataMeteo(localita) {
          this.loading = true;
          this.dataMeteo= [];
          var rawWeeklyMeteo = [];
          axios({
            "method": "GET",
              "url":"https://community-open-weather-map.p.rapidapi.com/forecast",
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
                  "q": localita
            },
            contentType: 'application/json',
            dataType: "jsonp",
            responseType: 'application/json'
            }).then((response) => { // LA RISPOSTA DALL API
               rawWeeklyMeteo = response.data.list
               var ora;
               for (var i = 0; i < rawWeeklyMeteo.length; i++) {
                  var x = i-1;
                  var giornoMeteo= rawWeeklyMeteo[i];
                  var datiGiorno= giornoMeteo.dt_txt.split(' ');
                  giornoMeteo.giorno = datiGiorno[0].split('-').reverse().join('-');
                  if (i == 0) {
                      ora = datiGiorno[1];
                  }

                  if (datiGiorno[1] == ora) {
                      giornoMeteo.temp = Math.round(giornoMeteo.main.temp);
                      giornoMeteo.iconPrefix = "http://openweathermap.org/img/wn/";
                      giornoMeteo.iconSuffix= "@2x.png"
                      this.dataMeteo.push(giornoMeteo);
                  }
               }
               console.log(this.dataMeteo);
               this.loading= false;
            }).catch((error) => {
               console.log(error);
                this.loading= false;
           })
      }

  }

}
</script>

<style>
 #style-1 {
     text-transform: capitalize;
     padding-top: 75px;
 }

 .dati-meteo {
     align-items: center;
     justify-content: space-between;
 }

 .overlay-loading {
     width: 100%;
     height: 100%;
     text-align: center;
 }

 v-progress-circular {
     margin: auto;
 }

</style>
